import { getPublicSiteUrl } from "@/lib/publicSiteUrl";

const DEVICE_ID_KEY = "aj_web_lead_device_id";
const LIFETIME_OPENS_KEY = "aj_web_lead_lifetime_open_count";
/** Avoid double bump when React Strict Mode runs effects twice in dev */
const SESSION_BUMP_KEY = "aj_web_lead_session_open_bumped";

/** In-memory fallback when localStorage is unavailable (same tab session). */
let memoryDeviceId: string | null = null;

function generateUniqueDeviceId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  if (typeof crypto !== "undefined" && typeof crypto.getRandomValues === "function") {
    const bytes = new Uint8Array(16);
    crypto.getRandomValues(bytes);
    bytes[6] = (bytes[6] & 0x0f) | 0x40;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;
    const h = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
    return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`;
  }
  const t = typeof performance !== "undefined" ? performance.now() : Date.now();
  return `aj-${Date.now()}-${t}-${Math.random().toString(36).slice(2, 12)}`;
}

/**
 * Stable unique id per browser profile: one value in localStorage, never replaced unless cleared.
 */
export function getOrCreateDeviceId(): string {
  if (typeof window === "undefined") return "";

  try {
    const existing = window.localStorage.getItem(DEVICE_ID_KEY)?.trim();
    if (existing && existing.length >= 8) {
      return existing;
    }
    const id = generateUniqueDeviceId();
    window.localStorage.setItem(DEVICE_ID_KEY, id);
    memoryDeviceId = id;
    return id;
  } catch {
    if (!memoryDeviceId) {
      memoryDeviceId = generateUniqueDeviceId();
    }
    return memoryDeviceId;
  }
}

export type WebLeadCollectBody = {
  deviceId: string;
  latitude?: number;
  longitude?: number;
  locationAccuracy?: number;
  language: string;
  languages: string[];
  timezone: string;
  screenWidth: number;
  screenHeight: number;
  colorDepth: number;
  pixelRatio: number;
  viewportWidth: number;
  viewportHeight: number;
  referrer: string;
  pageUrl: string;
  fcmToken?: string;
  fcmPermissionGranted: boolean;
  lifetimeOpenCount: number;
  userAgent: string;
  extra: Record<string, unknown>;
};

function bumpLifetimeOpenCount(): number {
  if (typeof window === "undefined") return 1;
  try {
    const prev = Number.parseInt(window.localStorage.getItem(LIFETIME_OPENS_KEY) ?? "0", 10);
    const next = Number.isFinite(prev) ? prev + 1 : 1;
    window.localStorage.setItem(LIFETIME_OPENS_KEY, String(next));
    return next;
  } catch {
    return 1;
  }
}

function getLifetimeOpenCountForPayload(): number {
  if (typeof window === "undefined") return 1;
  try {
    if (!window.sessionStorage.getItem(SESSION_BUMP_KEY)) {
      window.sessionStorage.setItem(SESSION_BUMP_KEY, "1");
      return bumpLifetimeOpenCount();
    }
    const n = Number.parseInt(window.localStorage.getItem(LIFETIME_OPENS_KEY) ?? "1", 10);
    return Number.isFinite(n) && n > 0 ? n : 1;
  } catch {
    return bumpLifetimeOpenCount();
  }
}

function tryGeolocation(timeoutMs: number): Promise<Pick<WebLeadCollectBody, "latitude" | "longitude" | "locationAccuracy"> | null> {
  if (typeof navigator === "undefined" || !navigator.geolocation) {
    return Promise.resolve(null);
  }
  return new Promise((resolve) => {
    const t = window.setTimeout(() => resolve(null), timeoutMs);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        window.clearTimeout(t);
        resolve({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          locationAccuracy: pos.coords.accuracy,
        });
      },
      () => {
        window.clearTimeout(t);
        resolve(null);
      },
      { enableHighAccuracy: false, maximumAge: 300_000, timeout: timeoutMs }
    );
  });
}

export function getLeadsCollectUrl(): string | null {
  const explicit = process.env.NEXT_PUBLIC_LEADS_COLLECT_URL?.trim();
  if (explicit) return explicit;
  const base = getPublicSiteUrl().replace(/\/$/, "");
  return `${base}/api/aj-web/leads/collect`;
}

export async function buildWebLeadPayload(): Promise<WebLeadCollectBody> {
  const deviceId = getOrCreateDeviceId();
  const lifetimeOpenCount = getLifetimeOpenCountForPayload();
  const geo = await tryGeolocation(1200);
  let tz = "";
  try {
    tz = Intl.DateTimeFormat().resolvedOptions().timeZone ?? "";
  } catch {
    /* ignore */
  }

  return {
    deviceId,
    ...geo,
    language: typeof navigator !== "undefined" ? navigator.language : "",
    languages:
      typeof navigator !== "undefined" && navigator.languages?.length
        ? Array.from(navigator.languages)
        : [],
    timezone: tz,
    screenWidth: typeof screen !== "undefined" ? screen.width : 0,
    screenHeight: typeof screen !== "undefined" ? screen.height : 0,
    colorDepth: typeof screen !== "undefined" ? screen.colorDepth : 0,
    pixelRatio: typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1,
    viewportWidth: typeof window !== "undefined" ? window.innerWidth : 0,
    viewportHeight: typeof window !== "undefined" ? window.innerHeight : 0,
    referrer: typeof document !== "undefined" ? document.referrer : "",
    pageUrl: typeof window !== "undefined" ? window.location.href : "",
    fcmPermissionGranted: false,
    lifetimeOpenCount,
    userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
    extra: {},
  };
}

export async function postWebLeadCollect(): Promise<void> {
  try {
    const url = getLeadsCollectUrl();
    if (!url) return;

    const body = await buildWebLeadPayload();
    if (!body.deviceId) return;

    let json: string;
    try {
      json = JSON.stringify(body);
    } catch {
      return;
    }

    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: json,
      keepalive: true,
    }).catch(() => {});
  } catch {
    /* storage / Intl / serialization — never break the app */
  }
}
