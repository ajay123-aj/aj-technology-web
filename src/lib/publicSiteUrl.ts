const FALLBACK = "https://www.ajtechhub.com";

/**
 * Canonical public site origin for metadata, JSON-LD, and API base fallbacks.
 * Invalid or missing NEXT_PUBLIC_SITE_URL no longer crashes `new URL()`.
 */
export function getPublicSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return FALLBACK;
  try {
    const href = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
    const u = new URL(href);
    return `${u.protocol}//${u.host}`;
  } catch {
    return FALLBACK;
  }
}

export function getMetadataBase(): URL {
  return new URL(getPublicSiteUrl());
}
