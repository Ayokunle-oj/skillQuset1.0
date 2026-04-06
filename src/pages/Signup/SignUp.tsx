/**
 * SignUp.tsx  —  SkillQuest Registration Page
 * ─────────────────────────────────────────────────────────────
 * Layout  : Split-screen (brand panel left, scrollable form right)
 * Fields  : Name · Surname (optional) · Email · Password ·
 *           Confirm Password · Gender · Date of Birth · Terms
 * Extras  : Sign up with Google · Password strength meter ·
 *           Per-rule checklist · On-blur validation ·
 *           Red highlight + error text under bad fields
 *
 * All user input is sanitized and validated client-side before
 * any network request is fired.
 * ─────────────────────────────────────────────────────────────
 */

import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  trim,
  sanitizeHtml,
  isNotEmpty,
  isValidEmail,
  checkPasswordStrength,
  isStrongPassword,
  isOldEnough,
  isNotFutureDate,
} from "../sanitize";
import "./signup.css";

// ════════════════════════════════════════════════════════════════
//  ⚠️  DEV STUB — DELETE THIS BLOCK WHEN WIRING UP YOUR BACKEND
//  ─────────────────────────────────────────────────────────────
//  This is self-contained: removing it won't break anything else.
//  Also remove the devLog() call inside handleSubmit() below
//  (clearly marked with the same warning).
// ════════════════════════════════════════════════════════════════
const DEV_ADMIN_USERNAME = "ADMIN";
const DEV_ADMIN_PASSWORD = ""; // ← fill in a test value if you want

/**
 * Logs the sanitized form payload to the browser console so you
 * can verify the data shape before hooking up a real API.
 * DELETE this function and its call in handleSubmit when done.
 */
const devLog = (payload: Record<string, string | boolean>) => {
  console.log("[DEV STUB] Registration payload:", payload);
  console.log(
    "[DEV STUB] Admin credentials — username:",
    DEV_ADMIN_USERNAME,
    " | password:",
    DEV_ADMIN_PASSWORD || "(not set)",
  );
};
// ════════════════════════════════════════════════════════════════
//  END OF DEV STUB
// ════════════════════════════════════════════════════════════════

// ── TYPES ────────────────────────────────────────────────────
interface FormState {
  firstName: string;
  surname: string; // optional
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  dob: string;
  agreeTerms: boolean;
}

// All fields that can have an error message
type ErrorKeys = keyof Omit<FormState, "agreeTerms"> | "agreeTerms" | "general";
type FormErrors = Record<ErrorKeys, string>;

// ── INITIAL STATE ────────────────────────────────────────────
const INITIAL_FORM: FormState = {
  firstName: "",
  surname: "",
  email: "",
  password: "",
  confirmPassword: "",
  gender: "",
  dob: "",
  agreeTerms: false,
};

const INITIAL_ERRORS: FormErrors = {
  firstName: "",
  surname: "",
  email: "",
  password: "",
  confirmPassword: "",
  gender: "",
  dob: "",
  agreeTerms: "",
  general: "",
};

// ── COMPONENT ────────────────────────────────────────────────
function SignUp() {
  // const navigate = useNavigate();

  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>(INITIAL_ERRORS);
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false); // success state

  // ── PASSWORD STRENGTH ──────────────────────────────────────
  const strength = checkPasswordStrength(form.password);

  // Label and colour for each strength level (0–3)
  const strengthMeta = [
    { label: "Weak", color: "#dc2626" },
    { label: "Fair", color: "#f59e0b" },
    { label: "Good", color: "#3b82f6" },
    { label: "Strong", color: "#16a34a" },
  ];

  // ── VALIDATE SINGLE FIELD (on-blur) ───────────────────────
  /**
   * Returns an error string or "" if the field is valid.
   * Called when the user leaves each field.
   */
  const validateField = useCallback(
    (name: keyof FormState, value: string | boolean): string => {
      switch (name) {
        case "firstName": {
          const v = trim(value as string);
          if (!isNotEmpty(v)) return "First name is required.";
          if (v.length < 2) return "First name must be at least 2 characters.";
          if (v.length > 50) return "First name must be under 50 characters.";
          // Only letters, spaces, hyphens, apostrophes
          if (!/^[a-zA-Z\s'-]+$/.test(v))
            return "First name can only contain letters, spaces, hyphens, or apostrophes.";
          return "";
        }

        case "surname": {
          // Surname is optional — only validate if something was typed
          const v = trim(value as string);
          if (v.length === 0) return ""; // optional
          if (v.length < 2) return "Surname must be at least 2 characters.";
          if (v.length > 60) return "Surname must be under 60 characters.";
          if (!/^[a-zA-Z\s'-]+$/.test(v))
            return "Surname can only contain letters, spaces, hyphens, or apostrophes.";
          return "";
        }

        case "email": {
          const v = trim(value as string);
          if (!isNotEmpty(v)) return "Email address is required.";
          if (!isValidEmail(v))
            return "Please enter a valid email address (e.g. user@example.com).";
          if (v.length > 254) return "Email address is too long.";
          return "";
        }

        case "password": {
          const v = value as string;
          if (!isNotEmpty(v)) return "Password is required.";
          if (!isStrongPassword(v))
            return "Password does not meet all the requirements below.";
          return "";
        }

        case "confirmPassword": {
          const v = value as string;
          if (!isNotEmpty(v)) return "Please confirm your password.";
          // Compare against the current form state
          if (v !== form.password) return "Passwords do not match.";
          return "";
        }

        case "gender": {
          if (!isNotEmpty(value as string)) return "Please select your gender.";
          return "";
        }

        case "dob": {
          const v = value as string;
          if (!isNotEmpty(v)) return "Date of birth is required.";
          if (!isNotFutureDate(v))
            return "Date of birth cannot be in the future.";
          if (!isOldEnough(v, 13))
            return "You must be at least 13 years old to register.";
          if (!isOldEnough(v, 0)) return "Please enter a valid date of birth.";
          return "";
        }

        case "agreeTerms": {
          if (value === false)
            return "You must agree to the Terms & Conditions to continue.";
          return "";
        }

        default:
          return "";
      }
    },
    [form.password], // confirmPassword validation depends on current password
  );

  // ── BLUR HANDLER ──────────────────────────────────────────
  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    const fieldValue =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    const error = validateField(name as keyof FormState, fieldValue);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  // ── CHANGE HANDLER ─────────────────────────────────────────
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    const fieldValue =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

    setForm((prev) => ({ ...prev, [name]: fieldValue }));

    // Clear error as user types — re-validates only on next blur
    setErrors((prev) => ({ ...prev, [name]: "" }));

    // Special case: if the user edits the password field after
    // confirmPassword has been touched, re-validate confirmPassword live
    // so the mismatch error appears immediately.
    if (name === "password" && form.confirmPassword) {
      const confirmError =
        form.confirmPassword !== value ? "Passwords do not match." : "";
      setErrors((prev) => ({ ...prev, confirmPassword: confirmError }));
    }
  };

  // ── FULL FORM VALIDATION (called on submit) ────────────────
  /**
   * Runs validateField() for every field.
   * Returns true if there are NO errors, false otherwise.
   * Also updates the errors state so all invalid fields light up at once.
   */
  const validateAll = (): boolean => {
    const newErrors: FormErrors = { ...INITIAL_ERRORS };
    let valid = true;

    (Object.keys(INITIAL_FORM) as Array<keyof FormState>).forEach((key) => {
      const error = validateField(key, form[key]);
      newErrors[key] = error;
      if (error) valid = false;
    });

    setErrors(newErrors);
    return valid;
  };

  // ── SUBMIT ─────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Run all validations before touching the network
    if (!validateAll()) return;

    // 2. Sanitize every text field
    const payload = {
      firstName: sanitizeHtml(trim(form.firstName)),
      surname: sanitizeHtml(trim(form.surname)),
      email: trim(form.email).toLowerCase(), // normalise email
      password: form.password, // never HTML-encode passwords
      gender: sanitizeHtml(form.gender),
      dob: form.dob,
      agreeTerms: form.agreeTerms,
    };

    // ══════════════════════════════════════════════════════════
    //  ⚠️  DEV STUB CALL — delete this line when done
    devLog(payload);
    // ══════════════════════════════════════════════════════════

    setIsLoading(true);
    setErrors((prev) => ({ ...prev, general: "" }));

    try {
      /**
       * TODO: Replace with your real registration endpoint.
       *
       * Example:
       *   const res = await fetch("/api/auth/register", {
       *     method:  "POST",
       *     headers: { "Content-Type": "application/json" },
       *     body:    JSON.stringify(payload),
       *   });
       *   if (!res.ok) throw new Error(await res.text());
       *   navigate("/login");
       */
      throw new Error("API not yet connected"); // ← remove when backend is ready
    } catch (err) {
      // Show a generic error — never expose internal server messages to users
      setErrors((prev) => ({
        ...prev,
        general: "Something went wrong. Please try again later.",
      }));
    } finally {
      setIsLoading(false);
    }
  };

  // ── GOOGLE ─────────────────────────────────────────────────
  const handleGoogle = () => {
    // TODO: wire up Google OAuth (Firebase / NextAuth / Supabase etc.)
    console.log("Google sign-up triggered");
  };

  // ── SUCCESS STATE ──────────────────────────────────────────
  if (submitted) {
    return (
      <div className="signup__page">
        <aside className="signup__panel" aria-hidden="true" />
        <main className="signup__form__side">
          <div className="signup__success">
            <span className="signup__success__icon">🎉</span>
            <h2>You're all set!</h2>
            <p>
              Your account has been created. Check your email to verify your
              address, then{" "}
              <Link to="/login" style={{ color: "#170b48", fontWeight: 700 }}>
                sign in
              </Link>
              .
            </p>
          </div>
        </main>
      </div>
    );
  }

  // ── RENDER ─────────────────────────────────────────────────
  return (
    <div className="signup__page">
      {/* ── LEFT PANEL ───────────────────────────────────── */}
      <aside className="signup__panel" aria-hidden="true">
        <div className="signup__panel__dots">
          {Array.from({ length: 25 }).map((_, i) => (
            <span key={i} />
          ))}
        </div>

        <div className="signup__brand">
          <span className="signup__brand__icon">◈</span>
          <h1 className="signup__brand__name">SkillQuest</h1>
          <p className="signup__brand__tagline">
            Start your learning journey today — it only takes a minute.
          </p>
        </div>

        {/* Visual step hints */}
        <div className="signup__steps">
          <div className="signup__step done">
            <div className="signup__step__num">1</div>
            <span className="signup__step__label">Create your account</span>
          </div>
          <div className="signup__step">
            <div className="signup__step__num">2</div>
            <span className="signup__step__label">Verify your email</span>
          </div>
          <div className="signup__step">
            <div className="signup__step__num">3</div>
            <span className="signup__step__label">Start learning</span>
          </div>
        </div>
      </aside>

      {/* ── RIGHT PANEL (form) ──────────────────────────── */}
      <main className="signup__form__side">
        <div className="signup__card">
          <h2 className="signup__heading">Create your account</h2>
          <p className="signup__subheading">
            Join thousands of learners on SkillQuest.
          </p>

          {/* Sign up with Google */}
          <button
            type="button"
            className="signup__google__btn"
            onClick={handleGoogle}
            aria-label="Sign up with Google"
          >
            <svg
              className="signup__google__icon"
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
            Sign up with Google
          </button>

          <div className="signup__divider">or fill in your details</div>

          {/* General server error */}
          {errors.general && (
            <div
              style={{
                fontSize: "0.83rem",
                color: "#dc2626",
                background: "rgba(220,38,38,0.06)",
                border: "1px solid rgba(220,38,38,0.15)",
                borderRadius: "8px",
                padding: "0.6rem 0.8rem",
                marginBottom: "0.75rem",
                fontWeight: 500,
              }}
              role="alert"
            >
              {errors.general}
            </div>
          )}

          {/* ── FORM ───────────────────────────────────── */}
          <form className="signup__form" onSubmit={handleSubmit} noValidate>
            {/* NAME ROW (First name + Surname) */}
            <div className="signup__row">
              {/* First Name */}
              <div className="signup__field">
                <label className="signup__label" htmlFor="firstName">
                  First Name
                </label>
                <div className="signup__input__wrap">
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    className={`signup__input ${
                      errors.firstName ? "error" : form.firstName ? "valid" : ""
                    }`}
                    value={form.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Jane"
                    maxLength={50}
                    autoComplete="given-name"
                    aria-describedby="firstName-error"
                    aria-invalid={!!errors.firstName}
                    aria-required="true"
                  />
                </div>
                {errors.firstName && (
                  <span
                    id="firstName-error"
                    className="signup__error"
                    role="alert"
                  >
                    ⚠ {errors.firstName}
                  </span>
                )}
              </div>

              {/* Surname (optional) */}
              <div className="signup__field">
                <label className="signup__label" htmlFor="surname">
                  Surname
                  <span className="signup__optional">Optional</span>
                </label>
                <div className="signup__input__wrap">
                  <input
                    id="surname"
                    name="surname"
                    type="text"
                    className={`signup__input ${
                      errors.surname ? "error" : form.surname ? "valid" : ""
                    }`}
                    value={form.surname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Doe"
                    maxLength={60}
                    autoComplete="family-name"
                    aria-describedby="surname-error"
                    aria-invalid={!!errors.surname}
                  />
                </div>
                {errors.surname && (
                  <span
                    id="surname-error"
                    className="signup__error"
                    role="alert"
                  >
                    ⚠ {errors.surname}
                  </span>
                )}
              </div>
            </div>

            {/* EMAIL */}
            <div className="signup__field">
              <label className="signup__label" htmlFor="email">
                Email Address
              </label>
              <div className="signup__input__wrap">
                <input
                  id="email"
                  name="email"
                  type="email"
                  className={`signup__input ${
                    errors.email ? "error" : form.email ? "valid" : ""
                  }`}
                  value={form.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="jane@example.com"
                  maxLength={254}
                  autoComplete="email"
                  inputMode="email"
                  aria-describedby="email-error"
                  aria-invalid={!!errors.email}
                  aria-required="true"
                />
              </div>
              {errors.email && (
                <span id="email-error" className="signup__error" role="alert">
                  ⚠ {errors.email}
                </span>
              )}
            </div>

            {/* PASSWORD */}
            <div className="signup__field">
              <label className="signup__label" htmlFor="password">
                Password
              </label>
              <div className="signup__input__wrap">
                <input
                  id="password"
                  name="password"
                  type={showPw ? "text" : "password"}
                  className={`signup__input pw__input ${
                    errors.password
                      ? "error"
                      : form.password && isStrongPassword(form.password)
                        ? "valid"
                        : ""
                  }`}
                  value={form.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Create a strong password"
                  maxLength={128}
                  autoComplete="new-password"
                  aria-describedby="password-error password-rules"
                  aria-invalid={!!errors.password}
                  aria-required="true"
                />
                <button
                  type="button"
                  className="signup__pw__toggle"
                  onClick={() => setShowPw((v) => !v)}
                  aria-label={showPw ? "Hide password" : "Show password"}
                >
                  {showPw ? "🙈" : "👁"}
                </button>
              </div>

              {/* Strength meter — visible as soon as user starts typing */}
              {form.password && (
                <div className="signup__strength" aria-hidden="true">
                  {/* 4-segment bar */}
                  <div className="signup__strength__bar">
                    {[0, 1, 2, 3].map((seg) => (
                      <div
                        key={seg}
                        className="signup__strength__segment"
                        style={{
                          background:
                            seg <= strength.score
                              ? strengthMeta[strength.score].color
                              : "#e8e6f3",
                        }}
                      />
                    ))}
                  </div>
                  <span
                    className="signup__strength__label"
                    style={{ color: strengthMeta[strength.score].color }}
                  >
                    {strengthMeta[strength.score].label}
                  </span>
                </div>
              )}

              {/* Per-rule checklist */}
              <div
                id="password-rules"
                className="signup__rules"
                aria-live="polite"
              >
                <div
                  className={`signup__rule ${strength.minLength ? "met" : ""}`}
                >
                  <span className="signup__rule__dot" />
                  At least 8 characters
                </div>
                <div
                  className={`signup__rule ${strength.hasUpper ? "met" : ""}`}
                >
                  <span className="signup__rule__dot" />
                  One uppercase letter (A–Z)
                </div>
                <div
                  className={`signup__rule ${strength.hasLower ? "met" : ""}`}
                >
                  <span className="signup__rule__dot" />
                  One lowercase letter (a–z)
                </div>
                <div
                  className={`signup__rule ${strength.hasDigit ? "met" : ""}`}
                >
                  <span className="signup__rule__dot" />
                  One number (0–9)
                </div>
                <div
                  className={`signup__rule ${strength.hasSpecial ? "met" : ""}`}
                >
                  <span className="signup__rule__dot" />
                  One special character (!@#$%…)
                </div>
              </div>

              {errors.password && (
                <span
                  id="password-error"
                  className="signup__error"
                  role="alert"
                >
                  ⚠ {errors.password}
                </span>
              )}
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="signup__field">
              <label className="signup__label" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <div className="signup__input__wrap">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  className={`signup__input pw__input ${
                    errors.confirmPassword
                      ? "error"
                      : form.confirmPassword &&
                          form.confirmPassword === form.password
                        ? "valid"
                        : ""
                  }`}
                  value={form.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Re-enter your password"
                  maxLength={128}
                  autoComplete="new-password"
                  aria-describedby="confirm-error"
                  aria-invalid={!!errors.confirmPassword}
                  aria-required="true"
                />
                <button
                  type="button"
                  className="signup__pw__toggle"
                  onClick={() => setShowConfirm((v) => !v)}
                  aria-label={showConfirm ? "Hide password" : "Show password"}
                >
                  {showConfirm ? "🙈" : "👁"}
                </button>
              </div>
              {errors.confirmPassword && (
                <span id="confirm-error" className="signup__error" role="alert">
                  ⚠ {errors.confirmPassword}
                </span>
              )}
            </div>

            {/* GENDER + DOB ROW */}
            <div className="signup__row">
              {/* Gender */}
              <div className="signup__field">
                <label className="signup__label" htmlFor="gender">
                  Gender
                </label>
                <div className="signup__select__wrap">
                  <select
                    id="gender"
                    name="gender"
                    className={`signup__select ${
                      errors.gender ? "error" : form.gender ? "valid" : ""
                    }`}
                    value={form.gender}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-describedby="gender-error"
                    aria-invalid={!!errors.gender}
                    aria-required="true"
                  >
                    <option value="">Select…</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="non-binary">Non-binary</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div>
                {errors.gender && (
                  <span
                    id="gender-error"
                    className="signup__error"
                    role="alert"
                  >
                    ⚠ {errors.gender}
                  </span>
                )}
              </div>

              {/* Date of Birth */}
              <div className="signup__field">
                <label className="signup__label" htmlFor="dob">
                  Date of Birth
                </label>
                <div className="signup__input__wrap">
                  <input
                    id="dob"
                    name="dob"
                    type="date"
                    className={`signup__input ${
                      errors.dob ? "error" : form.dob ? "valid" : ""
                    }`}
                    value={form.dob}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    /* Prevent future dates at browser level */
                    max={new Date().toISOString().split("T")[0]}
                    /* Minimum age 13 — at browser level */
                    min="1900-01-01"
                    autoComplete="bday"
                    aria-describedby="dob-error"
                    aria-invalid={!!errors.dob}
                    aria-required="true"
                  />
                </div>
                {errors.dob && (
                  <span id="dob-error" className="signup__error" role="alert">
                    ⚠ {errors.dob}
                  </span>
                )}
              </div>
            </div>

            {/* TERMS & CONDITIONS */}
            <div className="signup__field">
              <label className="signup__terms__row">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={form.agreeTerms}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.agreeTerms ? "error" : ""}
                  aria-describedby="terms-error"
                  aria-invalid={!!errors.agreeTerms}
                  aria-required="true"
                />
                <span>
                  I agree to the{" "}
                  <Link
                    to="/terms"
                    className="signup__terms__link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Terms &amp; Conditions
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/privacy"
                    className="signup__terms__link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Privacy Policy
                  </Link>
                  . This field is required.
                </span>
              </label>
              {errors.agreeTerms && (
                <span id="terms-error" className="signup__error" role="alert">
                  ⚠ {errors.agreeTerms}
                </span>
              )}
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              className="signup__submit"
              disabled={isLoading}
              aria-busy={isLoading}
              onClick={() => setSubmitted(true)}
            >
              {isLoading ? "Creating account…" : "Create Account"}
            </button>
          </form>

          {/* Footer */}
          <p className="signup__footer">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </main>
    </div>
  );
}

export default SignUp;
