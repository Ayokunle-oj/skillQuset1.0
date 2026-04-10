import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./GetStarted.css";
import { sanitizeOnboardingPayload } from "./sanitize";

// ─────────────────────────────────────────────────────────────────────────────
//  TYPES
// ─────────────────────────────────────────────────────────────────────────────

type UserPath = "university" | "school" | "home" | "";

interface OnboardingData {
  purpose: string;
  purposeCustom: string; // ← NEW: user's custom "something else" answer
  userPath: UserPath;

  // University path
  universityName: string;
  uniLevel: string;
  department: string;
  courses: string;

  // School path
  schoolName: string;
  schoolClass: string;
  schoolYear: string;

  // Home/self-learning path
  learningGoals: string[];

  // Shared
  studyStyle: string[];
  learnerType: string;
  aiPersonality: string;
  username: string;
}

const EMPTY_DATA: OnboardingData = {
  purpose: "",
  purposeCustom: "",
  userPath: "",
  universityName: "",
  uniLevel: "",
  department: "",
  courses: "",
  schoolName: "",
  schoolClass: "",
  schoolYear: "",
  learningGoals: [],
  studyStyle: [],
  learnerType: "",
  aiPersonality: "",
  username: "",
};

// ─────────────────────────────────────────────────────────────────────────────
//  TYPING ANIMATION HOOK
// ─────────────────────────────────────────────────────────────────────────────

function useTypingAnimation(text: string, speed: number = 38) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        setDone(true);
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return { displayed, done };
}

// ─────────────────────────────────────────────────────────────────────────────
//  OPTION BUTTON COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

interface OptionBtnProps {
  label: string;
  emoji?: string;
  selected: boolean;
  onClick: () => void;
  size?: "sm" | "md" | "lg";
}

function OptionBtn({
  label,
  emoji,
  selected,
  onClick,
  size = "md",
}: OptionBtnProps) {
  return (
    <button
      className={`ob-option ob-option--${size} ${selected ? "ob-option--selected" : ""}`}
      onClick={onClick}
      type="button"
    >
      {emoji && <span className="ob-option__emoji">{emoji}</span>}
      <span>{label}</span>
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  SUGGESTED UNIVERSITIES (Nigerian + popular ones)
// ─────────────────────────────────────────────────────────────────────────────

const SUGGESTED_UNIVERSITIES = [
  { label: "Bowen University", short: "Bowen Uni.." },
  { label: "Covenant University", short: "Covenant.." },
  { label: "University of Lagos", short: "UNILAG" },
  { label: "Obafemi Awolowo University", short: "OAU" },
  { label: "University of Ibadan", short: "UI" },
  { label: "Lagos State University", short: "LASU" },
  { label: "University of Benin", short: "UNIBEN" },
  { label: "Babcock University", short: "Babcock.." },
];

// ─────────────────────────────────────────────────────────────────────────────
//  MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

function GetStarted() {
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [data, setData] = useState<OnboardingData>(EMPTY_DATA);
  const [slideDir, setSlideDir] = useState<"in" | "out">("in");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [usernameError, setUsernameError] = useState("");

  // ── University suggestion state ──────────────────────────────
  // Tracks whether the "Other" uni option is expanded
  const [uniOtherOpen, setUniOtherOpen] = useState(false);

  // ── Purpose "Something else?" AI state ──────────────────────
  // Tracks whether the custom purpose panel is open
  const [purposeCustomOpen, setPurposeCustomOpen] = useState(false);
  // The AI-generated follow-up question
  const [aiQuestion, setAiQuestion] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  // ── Helper: toggle multi-select ─────────────────────────────
  const toggleMulti = (field: keyof OnboardingData, value: string) => {
    const current = data[field] as string[];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    setData((prev) => ({ ...prev, [field]: updated }));
  };

  // ── Helper: go to next step with animation ───────────────────
  const goNext = () => {
    setSlideDir("out");
    setTimeout(() => {
      setStep((s) => s + 1);
      setSlideDir("in");
    }, 220);
  };

  const goBack = () => {
    setSlideDir("out");
    setTimeout(() => {
      setStep((s) => s - 1);
      setSlideDir("in");
    }, 220);
  };

  // ── Build step list dynamically ──────────────────────────────
  const getSteps = (): string[] => {
    const base = ["welcome", "purpose"];
    if (data.userPath === "university") {
      base.push("uni-name", "uni-level", "uni-department", "uni-courses");
    } else if (data.userPath === "school") {
      base.push("school-name", "school-class", "school-year");
    } else if (data.userPath === "home") {
      base.push("home-goals");
    }
    base.push(
      "study-style",
      "learner-type",
      "ai-personality",
      "username",
      "done",
    );
    return base;
  };

  const steps = getSteps();
  const currentStepId = steps[step];
  const totalSteps = steps.length - 2;
  const progressStep = Math.max(0, step - 1);
  const progressPercent =
    totalSteps > 0
      ? Math.min(100, Math.round((progressStep / totalSteps) * 100))
      : 0;

  // ── Username validation ──────────────────────────────────────
  const validateUsername = (val: string) => {
    if (!val.trim()) return "Please enter a username.";
    if (val.length < 3) return "Must be at least 3 characters.";
    if (!/^[a-zA-Z0-9_-]+$/.test(val))
      return "Only letters, numbers, _ and - allowed.";
    return "";
  };

  // ── AI follow-up question for custom purpose ─────────────────
  // Called when the user opens "Something else?" and types their goal
  const fetchAiQuestion = async (goal: string) => {
    if (!goal.trim() || goal.trim().length < 5) return;
    setAiLoading(true);
    setAiQuestion("");
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system:
            "You are helping personalize a learning platform called SkillQuest. " +
            "The user has described a custom learning goal. " +
            "Ask ONE short, friendly follow-up question (max 12 words) that helps understand " +
            "what they specifically want to achieve so the platform can be tailored for them. " +
            "No preamble. Just the question itself, ending with a question mark.",
          messages: [
            {
              role: "user",
              content: `My learning goal: "${goal}"`,
            },
          ],
        }),
      });
      const result = await response.json();
      const text = result?.content?.[0]?.text?.trim() ?? "";
      setAiQuestion(text);
    } catch {
      // silently fail — user can still proceed without AI question
    } finally {
      setAiLoading(false);
    }
  };

  // ── Debounce the AI question fetch ──────────────────────────
  const aiDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const handlePurposeCustomChange = (val: string) => {
    setData((p) => ({ ...p, purposeCustom: val }));
    setAiQuestion("");
    if (aiDebounceRef.current) clearTimeout(aiDebounceRef.current);
    if (val.trim().length >= 8) {
      aiDebounceRef.current = setTimeout(() => fetchAiQuestion(val), 900);
    }
  };

  // ── Submit to backend ────────────────────────────────────────
  const handleSubmit = async () => {
    const err = validateUsername(data.username);
    if (err) {
      setUsernameError(err);
      return;
    }

    setSubmitting(true);
    setSubmitError("");

    try {
      const cleanData = sanitizeOnboardingPayload(
        data as unknown as Record<string, unknown>,
      );

      // ⬇⬇⬇ REPLACE THIS with your real API call ⬇⬇⬇
      console.log("✅ Onboarding payload (sanitized):", cleanData);
      await new Promise((res) => setTimeout(res, 1200));
      // ⬆⬆⬆ REPLACE THIS with your real API call ⬆⬆⬆

      goNext();
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // ─────────────────────────────────────────────────────────────
  //  RENDER
  // ─────────────────────────────────────────────────────────────

  return (
    <div className="ob-root">
      {/* ── Progress bar ─────────────────────────────────────── */}
      {step > 0 && currentStepId !== "done" && (
        <div className="ob-progress-wrap">
          <div
            className="ob-progress-bar"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      )}

      {/* ── Back button (now bold and very visible) ──────────── */}
      {step > 1 && currentStepId !== "done" && (
        <button className="ob-back-btn" onClick={goBack} type="button">
          ← Back
        </button>
      )}

      {/* ── Screen ──────────────────────────────────────────── */}
      <div className={`ob-screen ob-screen--${slideDir}`} key={currentStepId}>
        {/* ════════════════════════════════
            STEP 0 — WELCOME
        ════════════════════════════════ */}
        {currentStepId === "welcome" && <WelcomeScreen onNext={goNext} />}

        {/* ════════════════════════════════
            STEP 1 — PURPOSE
            Now includes "Something else?" with AI follow-up
        ════════════════════════════════ */}
        {currentStepId === "purpose" && (
          <StepScreen
            question="What are you using SkillQuest for?"
            hint="Pick the one that fits you best"
          >
            <div className="ob-grid ob-grid--varied">
              {[
                {
                  label: "University / College",
                  emoji: "🎓",
                  value: "university",
                  size: "lg",
                },
                {
                  label: "Secondary School",
                  emoji: "🏫",
                  value: "school",
                  size: "md",
                },
                {
                  label: "Self Learning",
                  emoji: "🏠",
                  value: "home",
                  size: "md",
                },
                {
                  label: "Build my Career",
                  emoji: "💼",
                  value: "home",
                  size: "sm",
                },
                {
                  label: "Learn New Skills",
                  emoji: "⚡",
                  value: "home",
                  size: "sm",
                },
                {
                  label: "Build my Future",
                  emoji: "🚀",
                  value: "home",
                  size: "lg",
                },
              ].map((opt) => (
                <OptionBtn
                  key={opt.label}
                  label={opt.label}
                  emoji={opt.emoji}
                  selected={data.purpose === opt.label && !purposeCustomOpen}
                  size={opt.size as "sm" | "md" | "lg"}
                  onClick={() => {
                    setPurposeCustomOpen(false);
                    setData((prev) => ({
                      ...prev,
                      purpose: opt.label,
                      purposeCustom: "",
                      userPath: opt.value as UserPath,
                    }));
                  }}
                />
              ))}

              {/* ── "Something else?" button ── */}
              <button
                className={`ob-option ob-option--md ob-option--special ${purposeCustomOpen ? "ob-option--selected" : ""}`}
                onClick={() => {
                  setPurposeCustomOpen((v) => !v);
                  // Clear any preset purpose when opening custom
                  if (!purposeCustomOpen) {
                    setData((p) => ({
                      ...p,
                      purpose: "Something else",
                      userPath: "home",
                    }));
                  } else {
                    setData((p) => ({
                      ...p,
                      purpose: "",
                      purposeCustom: "",
                      userPath: "",
                    }));
                  }
                }}
                type="button"
              >
                <span className="ob-option__emoji">✨</span>
                <span>Something else…</span>
              </button>
            </div>

            {/* ── Custom purpose panel ── */}
            {purposeCustomOpen && (
              <div className="ob-custom-purpose">
                <p className="ob-custom-purpose__label">
                  Tell us what you're here for:
                </p>
                <textarea
                  className="ob-textarea"
                  placeholder="e.g. I want to learn enough to switch careers into UX design…"
                  value={data.purposeCustom}
                  maxLength={300}
                  rows={3}
                  autoFocus
                  onChange={(e) => handlePurposeCustomChange(e.target.value)}
                />

                {/* AI follow-up question */}
                {aiLoading && (
                  <div className="ob-ai-thinking">
                    <span className="ob-ai-dot" />
                    <span className="ob-ai-dot" />
                    <span className="ob-ai-dot" />
                  </div>
                )}
                {aiQuestion && !aiLoading && (
                  <div className="ob-ai-question">
                    <span className="ob-ai-question__icon">🤖</span>
                    <p className="ob-ai-question__text">{aiQuestion}</p>
                    <textarea
                      className="ob-textarea ob-textarea--sm"
                      placeholder="Your answer…"
                      maxLength={300}
                      rows={2}
                      onChange={(e) =>
                        setData((p) => ({
                          ...p,
                          purposeCustom:
                            data.purposeCustom + "\n" + e.target.value,
                        }))
                      }
                    />
                  </div>
                )}
              </div>
            )}

            <button
              className="ob-next-btn"
              disabled={
                purposeCustomOpen ? !data.purposeCustom.trim() : !data.purpose
              }
              onClick={goNext}
            >
              Continue →
            </button>
          </StepScreen>
        )}

        {/* ════════════════════════════════
            UNIVERSITY STEPS
            uni-name now has suggestion chips + Other
        ════════════════════════════════ */}
        {currentStepId === "uni-name" && (
          <StepScreen
            question="What university do you attend?"
            hint="Pick yours or type it in below"
          >
            {/* ── Suggestion chips ── */}
            <div className="ob-grid ob-grid--varied">
              {SUGGESTED_UNIVERSITIES.map((uni) => (
                <button
                  key={uni.label}
                  className={`ob-option ob-option--sm ${
                    data.universityName === uni.label && !uniOtherOpen
                      ? "ob-option--selected"
                      : ""
                  }`}
                  onClick={() => {
                    setUniOtherOpen(false);
                    setData((p) => ({ ...p, universityName: uni.label }));
                  }}
                  type="button"
                >
                  {uni.short}
                </button>
              ))}

              {/* ── "Other" chip ── */}
              <button
                className={`ob-option ob-option--sm ${uniOtherOpen ? "ob-option--selected" : ""}`}
                onClick={() => {
                  setUniOtherOpen(true);
                  setData((p) => ({ ...p, universityName: "" }));
                }}
                type="button"
              >
                ✏️ Other
              </button>
            </div>

            {/* ── Manual text input (always visible when Other is open) ── */}
            {uniOtherOpen && (
              <input
                className="ob-input ob-input--appear"
                placeholder="Type your university name…"
                value={data.universityName}
                maxLength={100}
                autoFocus
                onChange={(e) =>
                  setData((p) => ({ ...p, universityName: e.target.value }))
                }
              />
            )}

            <button
              className="ob-next-btn"
              disabled={!data.universityName.trim()}
              onClick={goNext}
            >
              Continue →
            </button>
          </StepScreen>
        )}

        {currentStepId === "uni-level" && (
          <StepScreen
            question="What level are you?"
            hint="Your current year or level"
          >
            <div className="ob-grid ob-grid--even">
              {[
                "100 Level",
                "200 Level",
                "300 Level",
                "400 Level",
                "500 Level",
                "Postgraduate",
              ].map((lvl) => (
                <OptionBtn
                  key={lvl}
                  label={lvl}
                  selected={data.uniLevel === lvl}
                  onClick={() => setData((p) => ({ ...p, uniLevel: lvl }))}
                />
              ))}
            </div>
            <button
              className="ob-next-btn"
              disabled={!data.uniLevel}
              onClick={goNext}
            >
              Continue →
            </button>
          </StepScreen>
        )}

        {currentStepId === "uni-department" && (
          <StepScreen
            question="What's your department or faculty?"
            hint="Type it in"
          >
            <input
              className="ob-input"
              placeholder="e.g. Computer Science, Law, Medicine…"
              value={data.department}
              maxLength={100}
              onChange={(e) =>
                setData((p) => ({ ...p, department: e.target.value }))
              }
            />
            <button
              className="ob-next-btn"
              disabled={!data.department.trim()}
              onClick={goNext}
            >
              Continue →
            </button>
          </StepScreen>
        )}

        {currentStepId === "uni-courses" && (
          <StepScreen
            question="What courses are you currently studying?"
            hint="List them separated by commas — e.g. Calculus, Data Structures, English"
          >
            <textarea
              className="ob-textarea"
              placeholder="e.g. Calculus, Data Structures, Physics…"
              value={data.courses}
              maxLength={300}
              rows={3}
              onChange={(e) =>
                setData((p) => ({ ...p, courses: e.target.value }))
              }
            />
            <button
              className="ob-next-btn"
              disabled={!data.courses.trim()}
              onClick={goNext}
            >
              Continue →
            </button>
          </StepScreen>
        )}

        {/* ════════════════════════════════
            SCHOOL STEPS
        ════════════════════════════════ */}
        {currentStepId === "school-name" && (
          <StepScreen
            question="What school do you attend?"
            hint="Type the full name"
          >
            <input
              className="ob-input"
              placeholder="e.g. King's College Lagos"
              value={data.schoolName}
              maxLength={100}
              onChange={(e) =>
                setData((p) => ({ ...p, schoolName: e.target.value }))
              }
            />
            <button
              className="ob-next-btn"
              disabled={!data.schoolName.trim()}
              onClick={goNext}
            >
              Continue →
            </button>
          </StepScreen>
        )}

        {currentStepId === "school-class" && (
          <StepScreen
            question="What class are you in?"
            hint="Pick your current class"
          >
            <div className="ob-grid ob-grid--even">
              {["JSS 1", "JSS 2", "JSS 3", "SS 1", "SS 2", "SS 3"].map(
                (cls) => (
                  <OptionBtn
                    key={cls}
                    label={cls}
                    selected={data.schoolClass === cls}
                    onClick={() => setData((p) => ({ ...p, schoolClass: cls }))}
                  />
                ),
              )}
            </div>
            <button
              className="ob-next-btn"
              disabled={!data.schoolClass}
              onClick={goNext}
            >
              Continue →
            </button>
          </StepScreen>
        )}

        {currentStepId === "school-year" && (
          <StepScreen
            question="What academic year is this?"
            hint="Type the year or session"
          >
            <input
              className="ob-input"
              placeholder="e.g. 2024 / 2025"
              value={data.schoolYear}
              maxLength={20}
              onChange={(e) =>
                setData((p) => ({ ...p, schoolYear: e.target.value }))
              }
            />
            <button
              className="ob-next-btn"
              disabled={!data.schoolYear.trim()}
              onClick={goNext}
            >
              Continue →
            </button>
          </StepScreen>
        )}

        {/* ════════════════════════════════
            HOME / SELF-LEARNING
        ════════════════════════════════ */}
        {currentStepId === "home-goals" && (
          <StepScreen
            question="What do you want to learn?"
            hint="Pick everything that applies — you can select multiple"
          >
            <div className="ob-grid ob-grid--varied">
              {[
                { label: "Programming & Tech", emoji: "💻", size: "lg" },
                { label: "Design & Creativity", emoji: "🎨", size: "md" },
                { label: "Business & Finance", emoji: "📈", size: "md" },
                { label: "Science & Research", emoji: "🔬", size: "sm" },
                { label: "Language Learning", emoji: "🌍", size: "sm" },
                { label: "Health & Medicine", emoji: "🩺", size: "md" },
                { label: "Arts & Humanities", emoji: "📚", size: "md" },
                { label: "Engineering", emoji: "⚙️", size: "lg" },
              ].map((opt) => (
                <OptionBtn
                  key={opt.label}
                  label={opt.label}
                  emoji={opt.emoji}
                  selected={data.learningGoals.includes(opt.label)}
                  size={opt.size as "sm" | "md" | "lg"}
                  onClick={() => toggleMulti("learningGoals", opt.label)}
                />
              ))}
            </div>
            <button
              className="ob-next-btn"
              disabled={data.learningGoals.length === 0}
              onClick={goNext}
            >
              Continue →
            </button>
          </StepScreen>
        )}

        {/* ════════════════════════════════
            STUDY STYLE (multi-select)
        ════════════════════════════════ */}
        {currentStepId === "study-style" && (
          <StepScreen
            question="How do you prefer to study?"
            hint="Pick as many as you like"
          >
            <div className="ob-grid ob-grid--varied">
              {[
                { label: "Video Lessons", emoji: "🎬", size: "lg" },
                { label: "Flashcards", emoji: "🃏", size: "md" },
                { label: "Notes & Summaries", emoji: "📝", size: "md" },
                { label: "Practice Exams", emoji: "📋", size: "md" },
                { label: "Visual Diagrams", emoji: "🖼️", size: "sm" },
                { label: "Audio / Podcasts", emoji: "🎧", size: "sm" },
                { label: "Live Sessions", emoji: "📡", size: "md" },
                { label: "Reading Articles", emoji: "📰", size: "lg" },
              ].map((opt) => (
                <OptionBtn
                  key={opt.label}
                  label={opt.label}
                  emoji={opt.emoji}
                  selected={data.studyStyle.includes(opt.label)}
                  size={opt.size as "sm" | "md" | "lg"}
                  onClick={() => toggleMulti("studyStyle", opt.label)}
                />
              ))}
            </div>
            <button
              className="ob-next-btn"
              disabled={data.studyStyle.length === 0}
              onClick={goNext}
            >
              Continue →
            </button>
          </StepScreen>
        )}

        {/* ════════════════════════════════
            LEARNER TYPE
        ════════════════════════════════ */}
        {currentStepId === "learner-type" && (
          <StepScreen
            question="What kind of learner are you?"
            hint="Be honest — we'll pace things to match you"
          >
            <div className="ob-grid ob-grid--even">
              {[
                {
                  label: "Slow & Steady",
                  emoji: "🐢",
                  desc: "I like to take my time",
                },
                {
                  label: "Balanced",
                  emoji: "⚖️",
                  desc: "Mix of slow and fast",
                },
                {
                  label: "Fast Learner",
                  emoji: "⚡",
                  desc: "I pick things up quickly",
                },
                {
                  label: "Intensive",
                  emoji: "🔥",
                  desc: "Deep focus, full speed",
                },
              ].map((opt) => (
                <button
                  key={opt.label}
                  className={`ob-learner-card ${data.learnerType === opt.label ? "ob-learner-card--selected" : ""}`}
                  onClick={() =>
                    setData((p) => ({ ...p, learnerType: opt.label }))
                  }
                  type="button"
                >
                  <span className="ob-learner-card__emoji">{opt.emoji}</span>
                  <span className="ob-learner-card__label">{opt.label}</span>
                  <span className="ob-learner-card__desc">{opt.desc}</span>
                </button>
              ))}
            </div>
            <button
              className="ob-next-btn"
              disabled={!data.learnerType}
              onClick={goNext}
            >
              Continue →
            </button>
          </StepScreen>
        )}

        {/* ════════════════════════════════
            AI PERSONALITY
        ════════════════════════════════ */}
        {currentStepId === "ai-personality" && (
          <StepScreen
            question="How should your AI tutor feel?"
            hint="This shapes how SkillQuest talks to you"
          >
            <div className="ob-grid ob-grid--even">
              {[
                {
                  label: "Strict & Focused",
                  emoji: "🎯",
                  desc: "Direct, no fluff, hold me accountable",
                },
                {
                  label: "Calm & Patient",
                  emoji: "🌿",
                  desc: "Gentle, encouraging, go at my pace",
                },
                {
                  label: "Friendly & Fun",
                  emoji: "😄",
                  desc: "Casual, jokes, makes learning fun",
                },
                {
                  label: "Coach Mode",
                  emoji: "🏆",
                  desc: "Pushes me harder, celebrates wins",
                },
              ].map((opt) => (
                <button
                  key={opt.label}
                  className={`ob-learner-card ${data.aiPersonality === opt.label ? "ob-learner-card--selected" : ""}`}
                  onClick={() =>
                    setData((p) => ({ ...p, aiPersonality: opt.label }))
                  }
                  type="button"
                >
                  <span className="ob-learner-card__emoji">{opt.emoji}</span>
                  <span className="ob-learner-card__label">{opt.label}</span>
                  <span className="ob-learner-card__desc">{opt.desc}</span>
                </button>
              ))}
            </div>
            <button
              className="ob-next-btn"
              disabled={!data.aiPersonality}
              onClick={goNext}
            >
              Continue →
            </button>
          </StepScreen>
        )}

        {/* ════════════════════════════════
            USERNAME
        ════════════════════════════════ */}
        {currentStepId === "username" && (
          <StepScreen
            question="Pick your SkillQuest username"
            hint="This is how others will see you. Letters, numbers, _ and - only."
          >
            <div className="ob-username-wrap">
              <span className="ob-username-prefix">@</span>
              <input
                className="ob-input ob-input--username"
                placeholder="your_username"
                value={data.username}
                maxLength={30}
                onChange={(e) => {
                  setData((p) => ({ ...p, username: e.target.value }));
                  setUsernameError("");
                }}
              />
            </div>
            {usernameError && <p className="ob-error">{usernameError}</p>}
            {submitError && <p className="ob-error">{submitError}</p>}
            <button
              className="ob-next-btn"
              disabled={!data.username.trim() || submitting}
              onClick={handleSubmit}
            >
              {submitting ? "Saving…" : "Finish & Continue →"}
            </button>
          </StepScreen>
        )}

        {/* ════════════════════════════════
            DONE SCREEN
        ════════════════════════════════ */}
        {currentStepId === "done" && (
          <DoneScreen
            username={data.username}
            onSignup={() => navigate("/signup")}
          />
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  WELCOME SCREEN
// ─────────────────────────────────────────────────────────────────────────────

function WelcomeScreen({ onNext }: { onNext: () => void }) {
  const line1 = useTypingAnimation("Hi there 👋  Welcome to SkillQuest.", 45);
  const line2 = useTypingAnimation(
    line1.done ? "Let's set up your personal learning experience." : "",
    38,
  );
  const line3 = useTypingAnimation(
    line2.done ? "This will take about 2 minutes." : "",
    38,
  );

  return (
    <div className="ob-welcome">
      <div className="ob-welcome__logo">
        Skill<span>Quest</span>
      </div>
      <div className="ob-welcome__lines">
        <p className="ob-welcome__line">
          {line1.displayed}
          {!line1.done && <span className="ob-cursor" />}
        </p>
        {line1.done && (
          <p className="ob-welcome__line ob-welcome__line--sub">
            {line2.displayed}
            {line1.done && !line2.done && <span className="ob-cursor" />}
          </p>
        )}
        {line2.done && (
          <p className="ob-welcome__line ob-welcome__line--hint">
            {line3.displayed}
            {line2.done && !line3.done && <span className="ob-cursor" />}
          </p>
        )}
      </div>
      {line3.done && (
        <button className="ob-next-btn ob-next-btn--welcome" onClick={onNext}>
          Let's get started →
        </button>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  STEP SCREEN WRAPPER
// ─────────────────────────────────────────────────────────────────────────────

function StepScreen({
  question,
  hint,
  children,
}: {
  question: string;
  hint?: string;
  children: React.ReactNode;
}) {
  const { displayed, done } = useTypingAnimation(question, 32);

  return (
    <div className="ob-step">
      <h2 className="ob-step__question">
        {displayed}
        {!done && <span className="ob-cursor" />}
      </h2>
      {hint && done && <p className="ob-step__hint">{hint}</p>}
      {done && <div className="ob-step__body">{children}</div>}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  DONE SCREEN
// ─────────────────────────────────────────────────────────────────────────────

function DoneScreen({
  username,
  onSignup,
}: {
  username: string;
  onSignup: () => void;
}) {
  const { displayed, done } = useTypingAnimation(
    `You're all set, @${username}! 🎉  Now let's create your account.`,
    40,
  );

  return (
    <div className="ob-welcome">
      <div className="ob-done-check">✓</div>
      <p className="ob-welcome__line" style={{ marginTop: "2rem" }}>
        {displayed}
        {!done && <span className="ob-cursor" />}
      </p>
      {done && (
        <>
          <p className="ob-welcome__line--hint" style={{ marginTop: "1rem" }}>
            Create your account to save your preferences and start learning.
          </p>
          <button
            className="ob-next-btn ob-next-btn--welcome"
            onClick={onSignup}
          >
            Create my Account →
          </button>
        </>
      )}
    </div>
  );
}

export default GetStarted;
