// ============================================================
// getSafeRedirect — validates a redirect path before navigation.
//
// Security rules:
//   - Must be a non-empty string
//   - Must start with "/" (relative path, no external URLs)
//   - Must NOT start with "//" (protocol-relative URL exploit)
//   - The resolved origin must match window.location.origin
//
// Falls back to /discover on any failure.
// ============================================================

export const REDIRECT_KEY = "skillquest_redirect_after_login";

/**
 * Validates a potential redirect path.
 * Only allows same-origin relative paths that begin with "/".
 */
// export const getSafeRedirect = (path: string | null): string => {
//   if (!path || !path.startsWith("/") || path.startsWith("//")) {
//     return "/discover";
//   }
//   try {
//     const url = new URL(path, window.location.origin);
//     if (url.origin !== window.location.origin) return "/discover";
//   } catch {
//     return "/discover";
//   }
//   return path;
// };

/**
 * Saves the intended destination to sessionStorage before redirecting to login.
 * Uses sessionStorage so the value is cleared when the tab closes.
 */
// export const saveRedirectPath = (path: string): void => {
// sessionStorage.setItem(REDIRECT_KEY, path);
// };

/**
 * Reads the saved redirect path, validates it, then IMMEDIATELY clears it
 * from sessionStorage so it is never re-used.
 */
// export const consumeRedirectPath = (): string => {
// const raw = sessionStorage.getItem(REDIRECT_KEY);
// sessionStorage.removeItem(REDIRECT_KEY); // clear immediately after reading
// return getSafeRedirect(raw);
// };

export const getSafeRedirect = (path: string | null): string => {
  if (!path || !path.startsWith("/") || path.startsWith("//")) {
    return "/dashboard"; // default when no saved redirect (e.g. came from navbar login)
  }
  try {
    const url = new URL(path, window.location.origin);
    if (url.origin !== window.location.origin) return "/dashboard";
  } catch {
    return "/dashboard";
  }
  return path;
};

export const saveRedirectPath = (path: string): void => {
  sessionStorage.setItem(REDIRECT_KEY, path);
};

export const consumeRedirectPath = (): string => {
  const raw = sessionStorage.getItem(REDIRECT_KEY);
  sessionStorage.removeItem(REDIRECT_KEY);
  return getSafeRedirect(raw); // if raw is null → returns "/dashboard"
};
