export const REDIRECT_KEY = "skillquest_redirect_after_login";

export const getSafeRedirect = (path: string | null): string => {
  if (!path || !path.startsWith("/") || path.startsWith("//")) {
    return "/dashboard/Home";
  }
  try {
    const url = new URL(path, window.location.origin);
    if (url.origin !== window.location.origin) return "/dashboard/Home";
  } catch {
    return "/dashboard/Home";
  }
  return path;
};

export const saveRedirectPath = (path: string): void => {
  sessionStorage.setItem(REDIRECT_KEY, path);
};

export const consumeRedirectPath = (): string => {
  const raw = sessionStorage.getItem(REDIRECT_KEY);
  sessionStorage.removeItem(REDIRECT_KEY);
  return getSafeRedirect(raw);
};
