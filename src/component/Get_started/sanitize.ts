// ─────────────────────────────────────────────────────────────────────────────
//  sanitize.ts  —  SkillQuest shared input sanitization utility
//  Use this before sending ANY user data to the backend.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Strips HTML tags and trims whitespace from a string.
 * Use on all free-text inputs before storing or sending.
 */
export function sanitizeText(value: string): string {
  return value
    .replace(/<[^>]*>/g, "")   // remove HTML tags
    .replace(/[<>"'`]/g, "")   // remove dangerous characters
    .trim()
    .slice(0, 500);             // hard cap at 500 chars
}

/**
 * Sanitizes a username: alphanumeric, underscores, hyphens only.
 * Max 30 characters.
 */
export function sanitizeUsername(value: string): string {
  return value
    .replace(/[^a-zA-Z0-9_-]/g, "") // only safe chars
    .trim()
    .slice(0, 30);
}

/**
 * Sanitizes an array of string selections (e.g. multi-select answers).
 * Removes empty strings and limits to 20 items max.
 */
export function sanitizeSelections(values: string[]): string[] {
  return values
    .map((v) => sanitizeText(v))
    .filter((v) => v.length > 0)
    .slice(0, 20);
}

/**
 * Sanitizes the full onboarding payload before sending to backend.
 * Returns a clean copy — never mutates the original.
 */
export function sanitizeOnboardingPayload(data: Record<string, unknown>): Record<string, unknown> {
  const clean: Record<string, unknown> = {};

  for (const key in data) {
    const value = data[key];

    if (typeof value === "string") {
      // username gets stricter rules
      clean[key] = key === "username"
        ? sanitizeUsername(value)
        : sanitizeText(value);

    } else if (Array.isArray(value)) {
      clean[key] = sanitizeSelections(value as string[]);

    } else if (typeof value === "number" || typeof value === "boolean") {
      clean[key] = value; // safe primitives pass through

    } else {
      clean[key] = null; // reject anything else (objects, functions, etc.)
    }
  }

  return clean;
}
