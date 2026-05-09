// UniversityPage.tsx
// Route: /university/:slug
// Full university detail page for SkillQuest — UniVibes edition
// Tabs: Overview | Faculties | Ratings | News | UniVibes
// Constraints: no CSS vars, no Google Fonts, React Router, plain CSS file

import { useEffect, useRef, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./UniversityPage.css";
import UNIVERSITIES from "./universities";
import type { University, FacultyData } from "./universities";

// ─────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────
type TabId = "overview" | "faculties" | "ratings" | "news" | "vibes";

interface Toast {
  id: number;
  message: string;
  exiting: boolean;
}

// ─────────────────────────────────────────────────────────────
// HELPER — render star icons from a numeric rating
// ─────────────────────────────────────────────────────────────
function StarRating({
  rating,
  max = 5,
  size = "normal",
}: {
  rating: number;
  max?: number;
  size?: "normal" | "large";
}) {
  const stars = [];
  for (let i = 1; i <= max; i++) {
    const filled = i <= Math.round(rating);
    stars.push(
      <span
        key={i}
        className={
          filled ? "upage__hero__star--filled" : "upage__hero__star--empty"
        }
        style={{ fontSize: size === "large" ? "2rem" : "1.2rem" }}
      >
        {filled ? "★" : "☆"}
      </span>,
    );
  }
  return <>{stars}</>;
}

// ─────────────────────────────────────────────────────────────
// TOAST HOOK — manages bottom-right toast queue
// ─────────────────────────────────────────────────────────────
function useToasts() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const counterRef = useRef(0);

  const addToast = useCallback((message: string) => {
    const id = ++counterRef.current;
    setToasts((prev) => [...prev, { id, message, exiting: false }]);

    // Start exit animation after 2.7s, remove after 3s
    setTimeout(() => {
      setToasts((prev) =>
        prev.map((t) => (t.id === id ? { ...t, exiting: true } : t)),
      );
    }, 2700);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3100);
  }, []);

  return { toasts, addToast };
}

// ─────────────────────────────────────────────────────────────
// FACULTY CARD — expandable, with dept & course drill-down
// ─────────────────────────────────────────────────────────────
function FacultyCard({ faculty }: { faculty: FacultyData }) {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const [openDept, setOpenDept] = useState<string | null>(null);

  // Group courses by level for display
  function groupByLevel(
    courses: { level: string; title: string }[],
  ): Record<string, string[]> {
    return courses.reduce(
      (acc, c) => {
        if (!acc[c.level]) acc[c.level] = [];
        acc[c.level].push(c.title);
        return acc;
      },
      {} as Record<string, string[]>,
    );
  }

  // Convert a course title to a URL-friendly slug
  function toSlug(title: string) {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  }

  return (
    <div
      className={`upage__faculty-card ${
        expanded ? "upage__faculty-card--expanded" : ""
      }`}
    >
      {/* Card header — click to expand/collapse */}
      <div
        className="upage__faculty-card__header"
        onClick={() => setExpanded((e) => !e)}
      >
        <div>
          <div className="upage__faculty-card__name">{faculty.name}</div>
          <div className="upage__faculty-card__desc">{faculty.description}</div>
        </div>
        <span
          className={`upage__faculty-card__arrow ${
            expanded ? "upage__faculty-card__arrow--open" : ""
          }`}
        >
          ›
        </span>
      </div>

      {/* Expanded department list */}
      {expanded && (
        <div className="upage__dept-list">
          {faculty.departments.map((dept) => (
            <div key={dept.name} className="upage__dept-item">
              {/* Department header — click to toggle courses */}
              <div
                className="upage__dept-header"
                onClick={() =>
                  setOpenDept(openDept === dept.name ? null : dept.name)
                }
              >
                <span>{dept.name}</span>
                <span
                  className={`upage__dept-arrow ${
                    openDept === dept.name ? "upage__dept-arrow--open" : ""
                  }`}
                >
                  ▾
                </span>
              </div>

              {/* Course list grouped by level */}
              {openDept === dept.name && (
                <div className="upage__course-list">
                  {Object.entries(groupByLevel(dept.courses)).map(
                    ([level, courses]) => (
                      <div key={level} className="upage__level-group">
                        <div className="upage__level-label">{level}</div>
                        {courses.map((title) => (
                          <div key={title} className="upage__course-item">
                            <span className="upage__course-title">{title}</span>
                            <button
                              className="upage__course-btn"
                              onClick={(e) => {
                                e.stopPropagation();
                                // Navigate to /course/:slug (page not built yet)
                                navigate(`/course/${toSlug(title)}`);
                              }}
                            >
                              Study Materials
                            </button>
                          </div>
                        ))}
                      </div>
                    ),
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// RATINGS TAB — animated satisfaction bars + reviews
// ─────────────────────────────────────────────────────────────
function RatingsPanel({
  university,
  isActive,
  onToast,
}: {
  university: University;
  isActive: boolean;
  onToast: (msg: string) => void;
}) {
  const [barsAnimated, setBarsAnimated] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Trigger bar animations using IntersectionObserver when tab is visible
  useEffect(() => {
    if (!isActive) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setBarsAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    if (panelRef.current) observer.observe(panelRef.current);
    return () => observer.disconnect();
  }, [isActive]);

  // Also trigger when we switch to this tab (panel is already in view)
  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => setBarsAnimated(true), 100);
      return () => clearTimeout(timer);
    } else {
      setBarsAnimated(false);
    }
  }, [isActive]);

  const scores = university.satisfactionScores;
  const categories: { key: keyof typeof scores; label: string }[] = [
    { key: "socialLife", label: "Social Life" },
    { key: "academics", label: "Academics" },
    { key: "safety", label: "Safety" },
    { key: "food", label: "Food" },
    { key: "hostel", label: "Hostel" },
  ];

  // Placeholder review data
  const reviews = [
    {
      initial: "A",
      name: "Adaeze Nwosu",
      course: "Computer Science, 300L",
      text: "The academic standard here is genuinely top-tier. My lecturers push us hard but the results speak for themselves. Social life is a bit limited but you get used to it.",
      rating: 4,
    },
    {
      initial: "T",
      name: "Tunde Afolabi",
      course: "Engineering, 400L",
      text: "Infrastructure is great — labs are modern and accessible. The hostel facilities have improved a lot in recent years. Campus security is excellent.",
      rating: 5,
    },
    {
      initial: "C",
      name: "Chidinma Obi",
      course: "Law, 200L",
      text: "I love the discipline and structure here. It's not for everyone but if you come to study, you'll leave with real results. Food can get repetitive though.",
      rating: 4,
    },
  ];

  return (
    <div className="upage__panel upage__ratings" ref={panelRef}>
      {/* Overall score */}
      <div className="upage__overall-rating">
        <div className="upage__overall-score">
          {university.rating.toFixed(1)}
        </div>
        <div className="upage__overall-stars">
          <StarRating rating={university.rating} size="large" />
        </div>
        <div className="upage__overall-label">Overall Student Rating</div>
      </div>

      {/* Satisfaction bars */}
      <div className="upage__satisfaction">
        {categories.map(({ key, label }) => {
          const score = scores[key];
          const pct = (score / 5) * 100;
          return (
            <div key={key} className="upage__sat-row">
              <div className="upage__sat-label">{label}</div>
              <div className="upage__sat-track">
                <div
                  className="upage__sat-fill"
                  style={{ width: barsAnimated ? `${pct}%` : "0%" }}
                />
              </div>
              <div className="upage__sat-score">{score.toFixed(1)}</div>
            </div>
          );
        })}
      </div>

      {/* Student review cards */}
      <h3 className="upage__section-title">Student Reviews</h3>
      <div className="upage__reviews">
        {reviews.map((r) => (
          <div key={r.name} className="upage__review-card">
            <div className="upage__review-header">
              <div className="upage__review-avatar">{r.initial}</div>
              <div>
                <div className="upage__review-name">{r.name}</div>
                <div className="upage__review-course">{r.course}</div>
              </div>
              <div className="upage__review-stars">
                {"★".repeat(r.rating)}
                {"☆".repeat(5 - r.rating)}
              </div>
            </div>
            <div className="upage__review-text">{r.text}</div>
          </div>
        ))}
      </div>

      {/* Leave a review CTA */}
      <button
        className="upage__leave-review-btn"
        onClick={() => onToast("Reviews coming soon 🔒")}
      >
        Leave a Review
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// NEWS PANEL — stagger slide-in animation
// ─────────────────────────────────────────────────────────────
function NewsPanel({
  university,
  isActive,
  onToast,
}: {
  university: University;
  isActive: boolean;
  onToast: (msg: string) => void;
}) {
  const [visibleCards, setVisibleCards] = useState<boolean[]>(() =>
    new Array(university.news.length).fill(false),
  );

  // Stagger cards when tab becomes active
  useEffect(() => {
    if (!isActive) {
      setVisibleCards(new Array(university.news.length).fill(false));
      return;
    }
    university.news.forEach((_, i) => {
      setTimeout(
        () => {
          setVisibleCards((prev) => {
            const next = [...prev];
            next[i] = true;
            return next;
          });
        },
        i * 150 + 80,
      ); // 80ms base delay + 150ms stagger per card
    });
  }, [isActive, university.news]);

  return (
    <div className="upage__panel">
      <div className="upage__news-list">
        {university.news.map((item, i) => (
          <div
            key={item.title}
            className={`upage__news-card ${
              visibleCards[i] ? "upage__news-card--visible" : ""
            }`}
          >
            <div className="upage__news-date">{item.date}</div>
            <div className="upage__news-title">{item.title}</div>
            <div className="upage__news-excerpt">{item.excerpt}</div>
            <button
              className="upage__news-readmore"
              onClick={() => onToast("Full article coming soon 📰")}
            >
              Read More →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// UNIVIBES PANEL
// ─────────────────────────────────────────────────────────────
function UniVibesPanel({
  universityName,
  onToast,
}: {
  universityName: string;
  onToast: (msg: string) => void;
}) {
  const [email, setEmail] = useState("");

  function handleSubmit() {
    if (!email.trim() || !email.includes("@")) {
      onToast("Please enter a valid email address");
      return;
    }
    setEmail("");
    onToast("You're on the list! 🎉");
  }

  return (
    <div className="upage__panel upage__vibes">
      {/* Animated glow background */}
      <div className="upage__vibes__glow" />

      {/* Lock / sparkle icon */}
      <div className="upage__vibes__icon">✦</div>

      {/* UniVibes logo */}
      <div className="upage__vibes__logo">UniVibes</div>

      {/* Tagline */}
      <div className="upage__vibes__tagline">
        Real student life, unfiltered.
      </div>

      {/* Description */}
      <div className="upage__vibes__desc">
        UniVibes is coming soon. Be the first to know when it drops for{" "}
        <strong style={{ color: "#ffffff" }}>{universityName}</strong>.
      </div>

      {/* Email capture */}
      <div className="upage__vibes__form">
        <input
          className="upage__vibes__input"
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        />
        <button className="upage__vibes__btn" onClick={handleSubmit}>
          Notify Me
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN PAGE COMPONENT
// ─────────────────────────────────────────────────────────────
export default function UniversityPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { toasts, addToast } = useToasts();

  // Find the university from our data array by slug
  const universityResult = slug
    ? UNIVERSITIES.find((u) => u.slug === slug)
    : undefined;

  const [activeTab, setActiveTab] = useState<TabId>("overview");

  // Hero parallax refs
  const heroRef = useRef<HTMLDivElement>(null);
  const heroImgRef = useRef<HTMLImageElement>(null);

  // ── Parallax scroll effect ─────────────────────────────────
  useEffect(() => {
    function handleScroll() {
      if (!heroRef.current || !heroImgRef.current) return;
      const scrollY = window.scrollY;
      // Move image at 40% of scroll speed — creates parallax depth
      heroImgRef.current.style.transform = `translateY(${scrollY * 0.4}px)`;
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── Guard: university not found ────────────────────────────
  if (!universityResult) {
    return (
      <div className="upage">
        <div className="upage__notfound">
          <h2>University not found</h2>
          <p>We don't have data for this university yet.</p>
          <span
            onClick={() => navigate("/")}
            style={{ cursor: "pointer", color: "#7c6ff7" }}
          >
            ← Back to Home
          </span>
        </div>
      </div>
    );
  }

  // After the guard, university is guaranteed to be defined
  const university: University = universityResult;

  // ── Tab definitions ────────────────────────────────────────
  const tabs: { id: TabId; label: string; badge?: string }[] = [
    { id: "overview", label: "Overview" },
    { id: "faculties", label: "Faculties" },
    { id: "ratings", label: "Ratings" },
    { id: "news", label: "News" },
    { id: "vibes", label: "UniVibes", badge: "Coming Soon" },
  ];

  // ── Render tab content ─────────────────────────────────────
  function renderPanel() {
    switch (activeTab) {
      // ── Overview ─────────────────────────────────────────
      case "overview":
        return (
          <div className="upage__panel upage__overview">
            {/* Left column */}
            <div>
              <h3 className="upage__section-title">About</h3>
              <p className="upage__overview__text">{university.overview}</p>

              <h3 className="upage__section-title">Key Facts</h3>
              <div className="upage__facts">
                <div className="upage__fact">
                  <div className="upage__fact__label">Founded</div>
                  <div className="upage__fact__value">{university.founded}</div>
                </div>
                <div className="upage__fact">
                  <div className="upage__fact__label">Location</div>
                  <div className="upage__fact__value">
                    {university.location}
                  </div>
                </div>
                <div className="upage__fact">
                  <div className="upage__fact__label">Type</div>
                  <div className="upage__fact__value">{university.type}</div>
                </div>
                <div className="upage__fact">
                  <div className="upage__fact__label">Accreditation</div>
                  <div className="upage__fact__value">
                    {university.accreditation}
                  </div>
                </div>
              </div>
            </div>

            {/* Right column */}
            <div>
              <h3 className="upage__section-title">Notable Alumni</h3>
              <div className="upage__alumni">
                {university.notableAlumni.map((a) => (
                  <div key={a.name} className="upage__alumni__card">
                    <div className="upage__alumni__avatar">
                      {a.name.charAt(0)}
                    </div>
                    <div>
                      <div className="upage__alumni__name">{a.name}</div>
                      <div className="upage__alumni__field">{a.field}</div>
                    </div>
                  </div>
                ))}
              </div>

              <h3 className="upage__section-title" style={{ marginTop: 28 }}>
                Fees Breakdown
              </h3>
              <div className="upage__fees">
                <div className="upage__fees__row">
                  <span className="upage__fees__label">
                    Tuition (per session)
                  </span>
                  <span className="upage__fees__value">
                    {university.fees.tuition}
                  </span>
                </div>
                <div className="upage__fees__row">
                  <span className="upage__fees__label">Accommodation</span>
                  <span className="upage__fees__value">
                    {university.fees.accommodation}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );

      // ── Faculties ─────────────────────────────────────────
      case "faculties":
        return (
          <div className="upage__panel">
            <div className="upage__faculties-grid">
              {university.faculties.map((faculty) => (
                <FacultyCard key={faculty.name} faculty={faculty} />
              ))}
            </div>
          </div>
        );

      // ── Ratings ───────────────────────────────────────────
      case "ratings":
        return (
          <RatingsPanel
            university={university}
            isActive={activeTab === "ratings"}
            onToast={addToast}
          />
        );

      // ── News ──────────────────────────────────────────────
      case "news":
        return (
          <NewsPanel
            university={university}
            isActive={activeTab === "news"}
            onToast={addToast}
          />
        );

      // ── UniVibes ──────────────────────────────────────────
      case "vibes":
        return (
          <UniVibesPanel universityName={university.name} onToast={addToast} />
        );

      default:
        return null;
    }
  }

  // ─────────────────────────────────────────────────────────
  return (
    <div className="upage">
      {/* ── Hero ───────────────────────────────────────────── */}
      <div className="upage__hero" ref={heroRef}>
        <img
          ref={heroImgRef}
          className="upage__hero__img"
          src={university.image}
          alt={`${university.name} campus`}
        />
        <div className="upage__hero__overlay" />

        <div className="upage__hero__content">
          <h1 className="upage__hero__name">{university.name}</h1>

          <div className="upage__hero__location">
            <span className="upage__hero__pin">📍</span>
            <span>{university.location}</span>
          </div>

          <div className="upage__hero__stars">
            <StarRating rating={university.rating} />
            <span className="upage__hero__rating-text">
              {university.rating.toFixed(1)} / 5
            </span>
          </div>
        </div>
      </div>

      {/* ── Sticky Tab Navigation ──────────────────────────── */}
      <div className="upage__tabs-wrap">
        <div className="upage__tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`upage__tab ${
                activeTab === tab.id ? "upage__tab--active" : ""
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
              {tab.badge && (
                <span className="upage__tab__badge">{tab.badge}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── Tab Content ────────────────────────────────────── */}
      <div className="upage__content">{renderPanel()}</div>

      {/* ── Toast Container ────────────────────────────────── */}
      <div className="upage__toast-container">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`upage__toast ${t.exiting ? "upage__toast--exit" : ""}`}
          >
            {t.message}
          </div>
        ))}
      </div>
    </div>
  );
}
