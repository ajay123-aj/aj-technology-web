/** Shared contact form validation (client + API route). */

const EMAIL_MAX = 254;

/**
 * Practical email check: length, single @, domain with TLD-style segment.
 */
export function isValidEmail(email: string): boolean {
  const t = email.trim();
  if (t.length < 5 || t.length > EMAIL_MAX) return false;
  if (t.includes(" ") || t.split("@").length !== 2) return false;
  const [local, domain] = t.split("@");
  if (!local || local.length > 64 || !domain || !domain.includes(".")) return false;
  const domainParts = domain.split(".");
  if (domainParts.some((p) => !p || p.length > 63)) return false;
  const last = domainParts[domainParts.length - 1];
  if (!last || last.length < 2) return false;
  const re =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return re.test(t);
}

/**
 * Optional phone: empty is valid. Otherwise require 7–15 digits (E.164-style), common formatting chars only.
 */
export function isValidPhoneOptional(phone: string): boolean {
  const t = phone.trim();
  if (!t) return true;
  if (t.length > 32) return false;
  const allowed = /^[\d\s\-+().]+$/;
  if (!allowed.test(t)) return false;
  const digits = t.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15;
}

export type ContactFieldErrors = {
  email?: string;
  phone?: string;
};

export function validateContactInput(input: {
  email: string;
  phone: string;
}): { ok: true } | { ok: false; errors: ContactFieldErrors } {
  const errors: ContactFieldErrors = {};
  if (!isValidEmail(input.email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!isValidPhoneOptional(input.phone)) {
    errors.phone = "Enter a valid phone number (7–15 digits), or leave blank.";
  }
  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }
  return { ok: true };
}
