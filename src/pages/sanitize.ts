/**
 * sanitize.ts
 * ─────────────────────────────────────────────────────────────
 * Shared input-sanitization and validation utilities.
 * Import these into Login.tsx and SignUp.tsx.
 *
 * Every function is pure (no side effects) so they are easy
 * to unit-test and safe to delete individually if you outgrow them.
 * ─────────────────────────────────────────────────────────────
 */

// ── 1. STRIP ────────────────────────────────────────────────
/**
 * Trims whitespace from both ends of a string.
 * Use on every text field before validation or sending.
 */
export const trim = (value: string): string => value.trim();

/**
 * Escapes HTML special characters to prevent XSS injection.
 * Always call this before displaying any user-supplied value in the DOM
 * or before sending it as a query parameter.
 *
 * e.g.  sanitizeHtml('<script>alert(1)</script>')
 *       → '&lt;script&gt;alert(1)&lt;/script&gt;'
 */
export const sanitizeHtml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

/**
 * Removes characters that are never valid in a plain-text username
 * (angle brackets, quotes, backticks, semicolons).
 * Does NOT strip spaces — usernames with spaces are allowed.
 */
export const sanitizeUsername = (value: string): string =>
  value.replace(/[<>"'`;]/g, "");

// ── 2. VALIDATE ─────────────────────────────────────────────

/**
 * Returns true if the string is not empty after trimming.
 */
export const isNotEmpty = (value: string): boolean => value.trim().length > 0;

/**
 * RFC-5321 / RFC-5322 inspired email regex.
 * Catches the most common invalid formats without being
 * unnecessarily strict (e.g. allows + and . in local part).
 */
export const isValidEmail = (value: string): boolean =>
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value.trim());

/**
 * Password strength rules:
 *   • At least 8 characters
 *   • At least one uppercase letter  (A-Z)
 *   • At least one lowercase letter  (a-z)
 *   • At least one digit             (0-9)
 *   • At least one special character (!@#$%^&*…)
 *
 * Returns an object so you can show per-rule feedback.
 */
export interface PasswordStrength {
  minLength: boolean; // ≥ 8 characters
  hasUpper: boolean; // A-Z
  hasLower: boolean; // a-z
  hasDigit: boolean; // 0-9
  hasSpecial: boolean; // special character
  score: 0 | 1 | 2 | 3; // 0=weak, 1=fair, 2=good, 3=strong
}

export const checkPasswordStrength = (password: string): PasswordStrength => {
  const minLength = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasDigit = /[0-9]/.test(password);
  const hasSpecial = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]/.test(password);

  const passed = [minLength, hasUpper, hasLower, hasDigit, hasSpecial].filter(
    Boolean,
  ).length;

  // score: 0 = weak (0-2 rules), 1 = fair (3), 2 = good (4), 3 = strong (5)
  const score = (passed <= 2 ? 0 : passed === 3 ? 1 : passed === 4 ? 2 : 3) as
    | 0
    | 1
    | 2
    | 3;

  return { minLength, hasUpper, hasLower, hasDigit, hasSpecial, score };
};

/**
 * Returns true only when ALL five password rules pass.
 */
export const isStrongPassword = (password: string): boolean => {
  const { minLength, hasUpper, hasLower, hasDigit, hasSpecial } =
    checkPasswordStrength(password);
  return minLength && hasUpper && hasLower && hasDigit && hasSpecial;
};

/**
 * Returns true when the user is at least `minAge` years old.
 * Default minimum age is 13 (COPPA).
 */
export const isOldEnough = (dob: string, minAge = 13): boolean => {
  if (!dob) return false;
  const birth = new Date(dob);
  if (isNaN(birth.getTime())) return false;
  const today = new Date();
  const age = today.getFullYear() - birth.getFullYear();
  const notYetHadBirthday =
    today.getMonth() < birth.getMonth() ||
    (today.getMonth() === birth.getMonth() &&
      today.getDate() < birth.getDate());
  return age - (notYetHadBirthday ? 1 : 0) >= minAge;
};

/**
 * Returns true when dob is not in the future.
 */
export const isNotFutureDate = (dob: string): boolean => {
  if (!dob) return false;
  return new Date(dob) <= new Date();
};

// ── 3. RATE LIMITER ─────────────────────────────────────────
/**
 * Simple in-memory attempt counter.
 * Call recordFailedAttempt() on every failed login.
 * Call isLockedOut() before allowing a submit.
 * Call resetAttempts() on successful login.
 *
 * This is a frontend guard only — always enforce rate limiting
 * server-side as well.
 */
const MAX_ATTEMPTS = 5;
const LOCK_DURATION_MS = 30_000; // 30 seconds

let failedAttempts = 0;
let lockUntil: number | null = null;

export const recordFailedAttempt = (): void => {
  failedAttempts += 1;
  if (failedAttempts >= MAX_ATTEMPTS) {
    lockUntil = Date.now() + LOCK_DURATION_MS;
  }
};

export const resetAttempts = (): void => {
  failedAttempts = 0;
  lockUntil = null;
};

/**
 * Returns the number of seconds remaining in the lockout,
 * or 0 if not locked out.
 */
export const lockoutSecondsRemaining = (): number => {
  if (lockUntil === null) return 0;
  const remaining = Math.ceil((lockUntil - Date.now()) / 1000);
  if (remaining <= 0) {
    lockUntil = null;
    failedAttempts = 0;
    return 0;
  }
  return remaining;
};

export const isLockedOut = (): boolean => lockoutSecondsRemaining() > 0;
