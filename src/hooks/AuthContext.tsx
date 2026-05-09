/**
 * AuthContext.tsx — SkillQuest Global Auth State
 * ─────────────────────────────────────────────────────────────
 * Provides auth state (isLoggedIn, user, isLoading) to the
 * entire app via React context so any component instantly
 * reflects login/logout without needing to re-read sessionStorage.
 *
 * ⚠️ DEV STUB: Replace sessionStorage logic with your real
 * backend auth (JWT, Supabase, etc.) when ready.
 * ─────────────────────────────────────────────────────────────
 *
 * SETUP — wrap your app in App.tsx:
 *
 *   import { AuthProvider } from "./context/AuthContext";
 *
 *   function App() {
 *     return (
 *       <AuthProvider>
 *         <RouterProvider router={router} />   ← or <BrowserRouter>
 *       </AuthProvider>
 *     );
 *   }
 *
 * USAGE — in any component (replaces useAuth import from useAuth.ts):
 *
 *   import { useAuth } from "../context/AuthContext";
 *   const { isLoggedIn, user, isLoading } = useAuth();
 */

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";

// ── TYPES ────────────────────────────────────────────────────

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

interface AuthContextValue extends AuthState {
  // Call these instead of stubLogin / stubLogout directly
  login: (user: AuthUser) => void;
  logout: () => void;
}

// ── STORAGE KEY ──────────────────────────────────────────────

const AUTH_KEY = "skillquest_auth_user";

// ── HELPERS ──────────────────────────────────────────────────

// ⚠️ DEV STUB — reads the mock user from sessionStorage.
// Replace with a real token/session check in production.
function readStubUser(): AuthUser | null {
  try {
    const raw = sessionStorage.getItem(AUTH_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

// ── CONTEXT ──────────────────────────────────────────────────

const AuthContext = createContext<AuthContextValue | null>(null);

// ── PROVIDER ─────────────────────────────────────────────────

/**
 * Wrap your entire app with this so every component can read
 * auth state and react to login/logout instantly.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    isLoggedIn: false,
    user: null,
    isLoading: true, // true until we've read sessionStorage on mount
  });

  // Read auth state once on mount
  useEffect(() => {
    const user = readStubUser();
    setAuthState({ isLoggedIn: !!user, user, isLoading: false });
  }, []);

  // ── login — saves to sessionStorage AND updates React state immediately
  const login = useCallback((user: AuthUser) => {
    // ⚠️ DEV STUB — replace sessionStorage.setItem with your real
    // token storage (e.g. store a JWT in an HttpOnly cookie via your API)
    sessionStorage.setItem(AUTH_KEY, JSON.stringify(user));
    setAuthState({ isLoggedIn: true, user, isLoading: false });
  }, []);

  // ── logout — clears sessionStorage AND updates React state immediately
  const logout = useCallback(() => {
    // ⚠️ DEV STUB — also call your backend to invalidate the session/token
    sessionStorage.removeItem(AUTH_KEY);
    setAuthState({ isLoggedIn: false, user: null, isLoading: false });
  }, []);

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// ── HOOK ─────────────────────────────────────────────────────

/**
 * useAuth — use this in any component instead of the old useAuth.ts hook.
 * Must be used inside <AuthProvider>.
 */
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside <AuthProvider>");
  }
  return ctx;
}

// ── LEGACY STUBS (still exported so old imports don't break) ─
// ⚠️ These are kept for backwards compatibility only.
// Prefer calling login() / logout() from useAuth() instead.

export function stubLogin(user: AuthUser): void {
  sessionStorage.setItem(AUTH_KEY, JSON.stringify(user));
}

export function stubLogout(): void {
  sessionStorage.removeItem(AUTH_KEY);
}
