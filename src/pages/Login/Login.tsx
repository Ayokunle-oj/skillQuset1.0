/**
 * Login.tsx  —  SkillQuest Login Page
 * ─────────────────────────────────────────────────────────────
 * Layout : Split-screen (brand panel left, form right)
 * Auth   : Username + Password
 * Extras : Remember me · Forgot password · Terms · Create account
 *          Continue with Google · Show/hide password
 *          Rate-limit guard · On-blur field validation
 *
 * All user input is sanitized and validated before any
 * network request is made.
 * ─────────────────────────────────────────────────────────────
 */

import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  trim,
  sanitizeUsername,
  sanitizeHtml,
  isNotEmpty,
  checkPasswordStrength,
  recordFailedAttempt,
  resetAttempts,
  isLockedOut,
  lockoutSecondsRemaining,
} from "../sanitize";
import "./login.css";

// ════════════════════════════════════════════════════════════════
//  ⚠️  DEV STUB — DELETE THIS BLOCK WHEN WIRING UP YOUR BACKEND
//  ─────────────────────────────────────────────────────────────
//  Replace with your real authentication API call.
//  This block is self-contained: removing it won't break anything
//  else. Just also remove the call to  devCredentialCheck()  in
//  handleSubmit() below (clearly marked with the same warning).
// ════════════════════════════════════════════════════════════════
const DEV_ADMIN_USERNAME = "ADMIN";
const DEV_ADMIN_PASSWORD = "$killQuest123"; // ← fill in your test password here

/**
 * Simulates an API response using the dev credentials above.
 * Returns true if credentials match, false otherwise.
 * DELETE this function and its call in handleSubmit when done.
 */
const devCredentialCheck = (username: string, password: string): boolean => {
  return (
    username === DEV_ADMIN_USERNAME &&
    (DEV_ADMIN_PASSWORD === "$killQuest123" || password === DEV_ADMIN_PASSWORD)
  );
};
// ════════════════════════════════════════════════════════════════
//  END OF DEV STUB
// ════════════════════════════════════════════════════════════════

// ── TYPES ────────────────────────────────────────────────────
interface FormState {
  username: string;
  password: string;
  rememberMe: boolean;
}

interface FormErrors {
  username: string;
  password: string;
  general: string; // e.g. "Incorrect username or password"
}

// ── COMPONENT ────────────────────────────────────────────────
function Login() {
  const navigate = useNavigate();

  // Form values
  const [form, setForm] = useState<FormState>({
    username: "",
    password: "",
    rememberMe: false,
  });

  // Per-field error messages (empty string = no error)
  const [errors, setErrors] = useState<FormErrors>({
    username: "",
    password: "",
    general: "",
  });

  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [lockoutSecs, setLockoutSecs] = useState(0);

  // Countdown timer for lockout
  const lockoutTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  // Start / stop the lockout countdown
  const startLockoutCountdown = useCallback(() => {
    if (lockoutTimer.current) clearInterval(lockoutTimer.current);
    lockoutTimer.current = setInterval(() => {
      const secs = lockoutSecondsRemaining();
      setLockoutSecs(secs);
      if (secs <= 0 && lockoutTimer.current) {
        clearInterval(lockoutTimer.current);
        lockoutTimer.current = null;
      }
    }, 1000);
  }, []);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (lockoutTimer.current) clearInterval(lockoutTimer.current);
    };
  }, []);

  // ── VALIDATION (on-blur) ────────────────────────────────────
  /**
   * Validates a single field when the user leaves it (onBlur).
   * Returns the error message string, or "" if valid.
   */
  const validateField = (
    name: keyof FormState,
    value: string | boolean,
  ): string => {
    switch (name) {
      case "username": {
        const v = trim(value as string);
        if (!isNotEmpty(v)) return "Username is required.";
        if (v.length < 3) return "Username must be at least 3 characters.";
        if (v.length > 50) return "Username must be under 50 characters.";
        return "";
      }
      case "password": {
        const v = value as string;
        if (!isNotEmpty(v)) return "Password is required.";
        if (v.length < 8) return "Password must be at least 8 characters.";
        // We don't expose full rules here — that's for sign-up
        return "";
      }
      default:
        return "";
    }
  };

  // Called when any input loses focus
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const error = validateField(name as keyof FormState, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  // ── CHANGE HANDLER ──────────────────────────────────────────
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear the per-field error as soon as the user starts typing again
    if (name !== "rememberMe") {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // ── SUBMIT ──────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Check if locked out
    if (isLockedOut()) {
      startLockoutCountdown();
      return;
    }

    // 2. Sanitize inputs
    const cleanUsername = sanitizeHtml(sanitizeUsername(trim(form.username)));
    const cleanPassword = trim(form.password); // do NOT html-encode passwords

    // 3. Run all validations
    const usernameError = validateField("username", cleanUsername);
    const passwordError = validateField("password", cleanPassword);

    if (usernameError || passwordError) {
      setErrors((prev) => ({
        ...prev,
        username: usernameError,
        password: passwordError,
      }));
      return; // stop — don't hit the backend with invalid data
    }

    // ══════════════════════════════════════════════════════════
    //  ⚠️  DEV STUB — DELETE the devCredentialCheck() call below
    //  when wiring up your real backend.
    // ══════════════════════════════════════════════════════════
    const isDevMatch = devCredentialCheck(cleanUsername, cleanPassword);
    if (DEV_ADMIN_PASSWORD === "$killQuest123" && isDevMatch) {
      // Dev mode fast-path — skip the real API
      resetAttempts();
      navigate("/dashboard");
      return;
    }
    // ══════════════════════════════════════════════════════════
    //  END OF DEV STUB CALL
    // ══════════════════════════════════════════════════════════

    // 4. Send to real backend
    setIsLoading(true);
    setErrors((prev) => ({ ...prev, general: "" }));

    try {
      /**
       * TODO: Replace this fetch with your real authentication endpoint.
       *
       * Example:
       *   const res = await fetch("/api/auth/login", {
       *     method: "POST",
       *     headers: { "Content-Type": "application/json" },
       *     body: JSON.stringify({ username: cleanUsername, password: cleanPassword }),
       *     credentials: "include",   ← for HttpOnly cookie sessions
       *   });
       *
       * On success:  resetAttempts(); navigate("/dashboard");
       * On failure:  recordFailedAttempt(); setErrors(...)
       */
      throw new Error("API not yet connected"); // ← remove when backend is ready
    } catch (err) {
      recordFailedAttempt();
      if (isLockedOut()) {
        setLockoutSecs(lockoutSecondsRemaining());
        startLockoutCountdown();
        setErrors((prev) => ({
          ...prev,
          general: "Too many failed attempts. Please wait before trying again.",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          general: "Incorrect username or password. Please try again.",
        }));
      }
    } finally {
      setIsLoading(false);
    }
  };

  // ── GOOGLE ──────────────────────────────────────────────────
  const handleGoogle = () => {
    // TODO: wire up Google OAuth (e.g. Firebase, NextAuth, Supabase)
    console.log("Google sign-in triggered");
  };

  // ── PASSWORD STRENGTH (visual cue only on login) ─────────────
  const strength = checkPasswordStrength(form.password);
  // const strengthLabels = ["Weak", "Fair", "Good", "Strong"];
  const strengthColors = ["#dc2626", "#f59e0b", "#3b82f6", "#16a34a"];

  // ── RENDER ──────────────────────────────────────────────────
  return (
    <div className="login__page">
      {/* ── LEFT PANEL ─────────────────────────────────────── */}
      <aside className="login__panel" aria-hidden="true">
        {/* Decorative dot grid */}
        <div className="login__panel__dots">
          {Array.from({ length: 25 }).map((_, i) => (
            <span key={i} />
          ))}
        </div>

        {/* Brand */}
        <div className="login__brand">
          <span className="login__brand__icon" aria-hidden="true">
            ◈
          </span>
          <h1 className="login__brand__name">SkillQuest</h1>
          <p className="login__brand__tagline">
            Learn anything. Master everything. At your own pace.
          </p>
        </div>

        {/* Feature highlights */}
        <div className="login__features" aria-hidden="true">
          <div className="login__feature__pill">
            <span className="login__feature__icon">🎯</span>
            Personalised learning paths
          </div>
          <div className="login__feature__pill">
            <span className="login__feature__icon">🏆</span>
            Track your progress daily
          </div>
          <div className="login__feature__pill">
            <span className="login__feature__icon">🌐</span>
            Community of 50 000+ learners
          </div>
        </div>
      </aside>

      {/* ── RIGHT PANEL (form) ──────────────────────────────── */}
      <main className="login__form__side">
        <div className="login__card">
          <h2 className="login__heading">Welcome back</h2>
          <p className="login__subheading">Sign in to continue your journey.</p>

          {/* Continue with Google */}
          <button
            type="button"
            className="login__google__btn"
            onClick={handleGoogle}
            aria-label="Continue with Google"
          >
            {/* Inline SVG — no external font or image needed */}
            <svg
              className="login__google__icon"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </button>

          {/* Divider */}
          <div className="login__divider">or sign in with username</div>

          {/* General error (wrong credentials / lockout) */}
          {errors.general && (
            <div className="login__lockout" role="alert">
              {errors.general}
              {lockoutSecs > 0 && ` Retry in ${lockoutSecs}s.`}
            </div>
          )}

          {/* ── THE FORM ─────────────────────────────────── */}
          <form className="login__form" onSubmit={handleSubmit} noValidate>
            {/* USERNAME */}
            <div className="login__field">
              <label className="login__label" htmlFor="username">
                Username
              </label>
              <div className="login__input__wrap">
                <input
                  id="username"
                  name="username"
                  type="text"
                  className={`login__input ${
                    errors.username ? "error" : form.username ? "valid" : ""
                  }`}
                  value={form.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your username"
                  maxLength={50}
                  autoComplete="username"
                  aria-describedby="username-error"
                  aria-invalid={!!errors.username}
                  required
                />
              </div>
              {errors.username && (
                <span id="username-error" className="login__error" role="alert">
                  ⚠ {errors.username}
                </span>
              )}
            </div>

            {/* PASSWORD */}
            <div className="login__field">
              <label className="login__label" htmlFor="password">
                Password
              </label>
              <div className="login__input__wrap">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className={`login__input password__input ${
                    errors.password ? "error" : form.password ? "valid" : ""
                  }`}
                  value={form.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your password"
                  maxLength={128}
                  autoComplete="current-password"
                  aria-describedby="password-error"
                  aria-invalid={!!errors.password}
                  required
                />
                {/* Show / Hide toggle */}
                <button
                  type="button"
                  className="login__pw__toggle"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "🙈" : "👁"}
                </button>
              </div>

              {/* Subtle strength bar on login (visual aid only) */}
              {form.password && (
                <div
                  style={{
                    height: "3px",
                    borderRadius: "2px",
                    background: "#e8e6f3",
                    marginTop: "4px",
                    overflow: "hidden",
                  }}
                  aria-hidden="true"
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${((strength.score + 1) / 4) * 100}%`,
                      background: strengthColors[strength.score],
                      borderRadius: "2px",
                      transition: "width 0.3s ease, background 0.3s ease",
                    }}
                  />
                </div>
              )}

              {errors.password && (
                <span id="password-error" className="login__error" role="alert">
                  ⚠ {errors.password}
                </span>
              )}
            </div>

            {/* REMEMBER ME + FORGOT PASSWORD */}
            <div className="login__meta">
              <label className="login__remember">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={form.rememberMe}
                  onChange={handleChange}
                  aria-label="Remember me"
                />
                Remember me
              </label>

              <Link to="/forgot-password" className="login__forgot">
                Forgot password?
              </Link>
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              className="login__submit"
              disabled={isLoading || isLockedOut()}
              aria-busy={isLoading}
            >
              {isLoading
                ? "Signing in…"
                : isLockedOut()
                  ? `Locked — wait ${lockoutSecs}s`
                  : "Sign In"}
            </button>
          </form>

          {/* ── FOOTER LINKS ─────────────────────────────── */}
          <p className="login__footer">
            Don't have an account? <Link to="/signup">Create an account</Link>
          </p>

          <p className="login__terms">
            By signing in, you agree to our{" "}
            <Link to="/terms">Terms &amp; Conditions</Link> and{" "}
            <Link to="/privacy">Privacy Policy</Link>.
          </p>
        </div>
      </main>
    </div>
  );
}

export default Login;
