/** Returns the URL when it is a plausible http(s) link, otherwise null. */
export function safeUrl(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (trimmed.length > 2000) return null;
  if (!/^https?:\/\/[^\s]+$/i.test(trimmed)) return null;
  return trimmed;
}

/** Strips CR/LF so user input cannot inject extra email headers. */
export function stripCRLF(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

/**
 * Removes ASCII control characters (0x00-0x1F except tab/LF/CR, plus DEL)
 * from user input so junk bytes never reach logs, email or the database.
 * Multi-line body text keeps its newlines.
 */
export function stripControlChars(value: string): string {
  // eslint-disable-next-line no-control-regex
  return value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "");
}

/**
 * Blog post slugs must be lowercase kebab-case (letters, digits, hyphens),
 * 1-120 chars. Used as a first-line guard on /blog/[slug] before any query
 * runs; the value is still passed as a bound PostgREST parameter.
 */
const SLUG_PATTERN = /^[a-z0-9][a-z0-9-]{0,119}$/;

export function isValidSlug(value: string | null | undefined): boolean {
  return typeof value === "string" && SLUG_PATTERN.test(value);
}