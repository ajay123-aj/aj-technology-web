const DEVICE_KEY = "aj_device_id";
const LIFETIME_OPENS_KEY = "aj_lifetime_open_count";
const DEDUPE_MS = 4000;
const DEDUPE_KEY = "aj_lead_collect_ts";

export function getOrCreateDeviceId(): string {
  try {
    let id = localStorage.getItem(DEVICE_KEY);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(DEVICE_KEY, id);
    }
    return id;
  } catch {
    return crypto.randomUUID();
  }
}

/** Increments and returns lifetime open count (persisted). */
export function bumpLifetimeOpenCount(): number {
  try {
    const prev = parseInt(localStorage.getItem(LIFETIME_OPENS_KEY) ?? "0", 10);
    const next = Number.isFinite(prev) ? prev + 1 : 1;
    localStorage.setItem(LIFETIME_OPENS_KEY, String(next));
    return next;
  } catch {
    return 1;
  }
}

/** Avoid duplicate POST when React Strict Mode runs the effect twice. */
export function shouldDedupeLeadCollect(): boolean {
  try {
    const now = Date.now();
    const prev = parseInt(sessionStorage.getItem(DEDUPE_KEY) ?? "0", 10);
    if (now - prev < DEDUPE_MS) return true;
    sessionStorage.setItem(DEDUPE_KEY, String(now));
    return false;
  } catch {
    return false;
  }
}

export function getLeadsCollectUrl(): string | null {
  const base = process.env.NEXT_PUBLIC_AJ_API_URL?.trim();
  if (!base) return null;
  return `${base.replace(/\/$/, "")}/api/aj-web/leads/collect`;
}
