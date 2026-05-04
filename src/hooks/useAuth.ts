import { useState, useEffect } from "react";

// ============================================================
// ⚠️ DEV STUB — Replace this entire hook with real backend auth
// when your auth system is ready (e.g. JWT decode, Supabase session,
// API call to /api/me, etc.)
// ============================================================

export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  isLoggedIn: boolean;
  user: AuthUser | null;
  isLoading: boolean;
}

const AUTH_KEY = "skillquest_auth_user"; // sessionStorage key for mock auth

// ⚠️ DEV STUB — Simulates reading a logged-in user from sessionStorage.
// In production, replace with a real token check / API call.
function readStubUser(): AuthUser | null {
  try {
    const raw = sessionStorage.getItem(AUTH_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

/**
 * useAuth — central hook for all auth state across SkillQuest.
 *
 * Returns:
 *   isLoggedIn  — boolean, whether the user is currently authenticated
 *   user        — AuthUser | null, the current user's data
 *   isLoading   — boolean, true while auth state is being resolved
 *
 * ⚠️ DEV STUB: auth state is stored in sessionStorage under "skillquest_auth_user".
 * Replace readStubUser() with your real backend call to make this production-ready.
 */
export function useAuth(): AuthState {
  const [authState, setAuthState] = useState<AuthState>({
    isLoggedIn: false,
    user: null,
    isLoading: true,
  });

  useEffect(() => {
    // ⚠️ DEV STUB — Simulate an async auth check (e.g. verifying a token).
    // Replace with: const user = await fetchCurrentUser();
    const user = readStubUser();

    setAuthState({
      isLoggedIn: !!user,
      user,
      isLoading: false,
    });

    // ⚠️ DEV STUB — Listen for storage changes so login/logout in another
    // tab (same session) is reflected. In production, use a global auth
    // context / event bus instead.
    const handleStorageChange = () => {
      const updatedUser = readStubUser();
      setAuthState({
        isLoggedIn: !!updatedUser,
        user: updatedUser,
        isLoading: false,
      });
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return authState;
}

// ============================================================
// Exported helper — call this in Login.tsx after successful auth
// ⚠️ DEV STUB: In production, the backend will return a token/session.
// Store that instead of a plain user object.
// ============================================================
export function stubLogin(user: AuthUser): void {
  sessionStorage.setItem(AUTH_KEY, JSON.stringify(user));
}

// ============================================================
// Exported helper — call this to log out.
// ⚠️ DEV STUB: In production, also invalidate the server-side session/token.
// ============================================================
export function stubLogout(): void {
  sessionStorage.removeItem(AUTH_KEY);
}
