/**
 * Discover.tsx  —  SkillQuest Discover Page
 * ─────────────────────────────────────────────────────────────
 * Layout  : Top navbar (desktop) + Bottom tab bar (mobile)
 * Features:
 *   • Sticky top navbar with animated dropdowns
 *   • "Back to Home" button
 *   • Full-width search bar with clear button
 *   • Auto-scrolling featured carousel (arrows + dots + touch)
 *   • Suggestion chips (trigger a search on click)
 *   • Course sections: Top Courses, SkillQuest, Newly Added,
 *                      University Lectures, Study Materials
 *   • Search results grid (replaces sections while searching)
 *   • Course cards: thumbnail, creator badge, difficulty,
 *                   duration, views, lessons, rating
 *   • Bottom tab bar for mobile navigation
 *
 * All data lives in discoverData.ts — swap for API calls there.
 * No dark-mode toggle · No CSS :root · No Google Fonts
 * ─────────────────────────────────────────────────────────────
 */

import {
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  CAROUSEL_SLIDES,
  SUGGESTION_CHIPS,
  TOP_COURSES,
  SKILLQUEST_COURSES,
  NEWLY_ADDED,
  UNIVERSITY_LECTURES,
  STUDY_MATERIALS,
  type Course,
} from "./discoverData";
import "./discover.css";

// ════════════════════════════════════════════════════════════════
//  NAV MENU STRUCTURE
//  Each item has a label and an array of dropdown sub-items.
//  If dropdownItems is empty, the button navigates directly.
// ════════════════════════════════════════════════════════════════
const NAV_ITEMS = [
  {
    id: "top-courses",
    label: "Top Courses",
    dropdownItems: [
      { icon: "🔥", label: "Most Popular",   path: "/discover/popular" },
      { icon: "📈", label: "Trending Now",    path: "/discover/trending" },
      { icon: "⭐", label: "Editor's Picks",  path: "/discover/picks" },
    ],
  },
  {
    id: "newly-added",
    label: "Newly Added",
    dropdownItems: [
      { icon: "🆕", label: "New This Week",  path: "/discover/new" },
      { icon: "📅", label: "Recent Uploads", path: "/discover/recent" },
    ],
  },
  {
    id: "textbooks",
    label: "Textbooks",
    dropdownItems: [
      { icon: "🔬", label: "Sciences",       path: "/discover/textbooks/science" },
      { icon: "⚖️", label: "Law",            path: "/discover/textbooks/law" },
      { icon: "🩺", label: "Medicine",       path: "/discover/textbooks/medicine" },
      { icon: "🔧", label: "Engineering",    path: "/discover/textbooks/engineering" },
      { icon: "📊", label: "Business",       path: "/discover/textbooks/business" },
    ],
  },
  {
    id: "study-materials",
    label: "Study Materials",
    dropdownItems: [
      { icon: "📝", label: "Past Questions", path: "/discover/materials/past-q" },
      { icon: "🗂️", label: "Flashcards",     path: "/discover/materials/flashcards" },
      { icon: "📋", label: "Lecture Notes",  path: "/discover/materials/notes" },
    ],
  },
  {
    id: "sq-courses",
    label: "SkillQuest Courses",
    dropdownItems: [
      { icon: "💻", label: "Frontend",       path: "/discover/sq/frontend" },
      { icon: "⚙️", label: "Backend",        path: "/discover/sq/backend" },
      { icon: "📊", label: "Data Science",   path: "/discover/sq/data" },
      { icon: "🎨", label: "Design",         path: "/discover/sq/design" },
    ],
  },
  {
    id: "skills",
    label: "Skills",
    dropdownItems: [
      { icon: "🌐", label: "Web Dev",        path: "/discover/skills/webdev" },
      { icon: "📱", label: "Mobile Dev",     path: "/discover/skills/mobile" },
      { icon: "🧠", label: "AI & ML",        path: "/discover/skills/ai" },
      { icon: "💼", label: "Soft Skills",    path: "/discover/skills/soft" },
      { icon: "🌍", label: "Languages",      path: "/discover/skills/language" },
    ],
  },
];

// Bottom tab items (mobile only)
const TAB_ITEMS = [
  { id: "home",      icon: "🏠", label: "Home",     path: "/discover" },
  { id: "courses",   icon: "📚", label: "Courses",  path: "/discover/popular" },
  { id: "skills",    icon: "⚡", label: "Skills",   path: "/discover/skills" },
  { id: "library",   icon: "📖", label: "Library",  path: "/discover/textbooks" },
  { id: "profile",   icon: "👤", label: "Profile",  path: "/profile" },
];

// ════════════════════════════════════════════════════════════════
//  HELPER: Creator icon based on creator type
// ════════════════════════════════════════════════════════════════
function creatorIcon(type: Course["creatorType"]): string {
  if (type === "official")   return "◈";
  if (type === "university") return "🏛️";
  return "👤";
}

// ════════════════════════════════════════════════════════════════
//  HELPER: Star rating display
// ════════════════════════════════════════════════════════════════
function formatRating(rating: number): string {
  return rating.toFixed(1);
}

// ════════════════════════════════════════════════════════════════
//  SUB-COMPONENT: CourseCard
//  Displays one course in a horizontal row or search grid.
//  Navigates to /course/:id on click.
// ════════════════════════════════════════════════════════════════
function CourseCard({ course }: { course: Course }) {
  const navigate = useNavigate();

  // Navigate to the course detail page when the card is clicked
  const handleClick = () => {
    navigate(`/course/${course.id}`);
  };

  // Allow keyboard users to activate the card with Enter or Space
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <article
      className="discover__card"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`${course.title} by ${course.creator}`}
    >
      {/* ── Thumbnail ─────────────────────────────────────── */}
      <div className="discover__card__thumb">
        {/* Gradient placeholder — replace with <img> when you have real images */}
        <div
          className="discover__card__thumb__bg"
          style={{ background: course.thumbnail }}
          aria-hidden="true"
        />

        {/* Left badges: creator type + New */}
        <div className="discover__card__badges">
          <span className={`discover__card__badge ${course.creatorType}`}>
            {course.creatorType === "official"
              ? "SkillQuest"
              : course.creatorType === "university"
              ? "University"
              : "Community"}
          </span>
          {course.isNew && (
            <span className="discover__card__badge new">New</span>
          )}
        </div>

        {/* Difficulty badge (top right) */}
        <span
          className={`discover__card__difficulty ${course.difficulty}`}
          aria-label={`Difficulty: ${course.difficulty}`}
        >
          {course.difficulty}
        </span>

        {/* Duration (bottom right) */}
        <span className="discover__card__duration" aria-label={`Duration: ${course.duration}`}>
          ⏱ {course.duration}
        </span>
      </div>

      {/* ── Card Body ─────────────────────────────────────── */}
      <div className="discover__card__body">
        {/* Category */}
        <span className="discover__card__category">{course.category}</span>

        {/* Title */}
        <h3 className="discover__card__title">{course.title}</h3>

        {/* Creator */}
        <div className="discover__card__creator">
          <span className="discover__card__creator__icon" aria-hidden="true">
            {creatorIcon(course.creatorType)}
          </span>
          <span className="discover__card__creator__name">{course.creator}</span>
        </div>

        {/* Stats row */}
        <div className="discover__card__stats">
          {/* Rating */}
          <span className="discover__card__stat discover__card__rating">
            ★ {formatRating(course.rating)}
          </span>
          <span className="discover__card__dot" aria-hidden="true" />

          {/* Views */}
          <span className="discover__card__stat" aria-label={`${course.views} views`}>
            👁 {course.views}
          </span>
          <span className="discover__card__dot" aria-hidden="true" />

          {/* Lessons */}
          <span className="discover__card__stat" aria-label={`${course.lessons} lessons`}>
            📑 {course.lessons} lessons
          </span>
        </div>
      </div>
    </article>
  );
}

// ════════════════════════════════════════════════════════════════
//  SUB-COMPONENT: CourseSection
//  A labelled horizontal-scroll row of CourseCard components.
// ════════════════════════════════════════════════════════════════
interface CourseSectionProps {
  title: string;
  icon: string;
  courses: Course[];
  seeAllPath: string;
  animationDelay?: string;
}

function CourseSection({
  title,
  icon,
  courses,
  seeAllPath,
  animationDelay = "0s",
}: CourseSectionProps) {
  const navigate = useNavigate();

  return (
    <section
      className="discover__section"
      style={{ animationDelay }}
      aria-labelledby={`section-${title}`}
    >
      {/* Header */}
      <div className="discover__section__header">
        <h2 className="discover__section__title" id={`section-${title}`}>
          <span className="discover__section__icon" aria-hidden="true">{icon}</span>
          {title}
        </h2>
        <button
          className="discover__see__all"
          onClick={() => navigate(seeAllPath)}
          aria-label={`See all ${title}`}
        >
          See all →
        </button>
      </div>

      {/* Horizontal card row */}
      <div
        className="discover__cards__row"
        role="list"
        aria-label={`${title} courses`}
      >
        {courses.map((course) => (
          <div key={course.id} role="listitem">
            <CourseCard course={course} />
          </div>
        ))}
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════
//  MAIN COMPONENT: Discover
// ════════════════════════════════════════════════════════════════
function Discover() {
  const navigate = useNavigate();

  // ── STATE ──────────────────────────────────────────────────

  // Which nav dropdown is currently open (null = none)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Search query typed by the user
  const [searchQuery, setSearchQuery] = useState("");

  // Carousel state
  const [currentSlide, setCurrentSlide] = useState(0);

  // Active mobile tab
  const [activeTab, setActiveTab] = useState("home");

  // ── REFS ───────────────────────────────────────────────────

  // Reference to the carousel auto-play timer so we can reset it on manual nav
  const carouselTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  // Reference to the nav bar — used to detect clicks outside the dropdown
  const navRef = useRef<HTMLElement | null>(null);

  // ── CAROUSEL AUTO-PLAY ─────────────────────────────────────

  /**
   * Moves the carousel to a specific slide index.
   * Also resets the auto-play timer so it doesn't jump
   * right after the user manually navigates.
   */
  const goToSlide = useCallback((index: number) => {
    // Wrap around: if we go past the last slide, go to first
    const total = CAROUSEL_SLIDES.length;
    const next = ((index % total) + total) % total;
    setCurrentSlide(next);

    // Reset the auto-play timer
    if (carouselTimer.current) clearInterval(carouselTimer.current);
    carouselTimer.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % total);
    }, 4500); // advance every 4.5 seconds
  }, []);

  // Start auto-play on mount, clear it on unmount
  useEffect(() => {
    carouselTimer.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
    }, 4500);

    // Cleanup on unmount — prevents memory leaks
    return () => {
      if (carouselTimer.current) clearInterval(carouselTimer.current);
    };
  }, []);

  // ── DROPDOWN: close when clicking outside the nav ──────────
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Also close dropdown on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenDropdown(null);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  // ── SEARCH ─────────────────────────────────────────────────

  // Trimmed version of the query used for actual filtering
  const trimmedQuery = searchQuery.trim().toLowerCase();

  // Combine ALL courses into one pool for search
  const allCourses: Course[] = [
    ...TOP_COURSES,
    ...SKILLQUEST_COURSES,
    ...NEWLY_ADDED,
    ...UNIVERSITY_LECTURES,
    ...STUDY_MATERIALS,
  ];

  // Deduplicate courses (some may appear in multiple sections)
  const uniqueCourses = allCourses.filter(
    (course, index, self) => index === self.findIndex((c) => c.id === course.id)
  );

  // Filter by title, category, or creator
  const searchResults = trimmedQuery
    ? uniqueCourses.filter(
        (course) =>
          course.title.toLowerCase().includes(trimmedQuery) ||
          course.category.toLowerCase().includes(trimmedQuery) ||
          course.creator.toLowerCase().includes(trimmedQuery)
      )
    : [];

  // Whether we are in "search mode" (user has typed something)
  const isSearching = trimmedQuery.length > 0;

  // ── CHIP CLICK: trigger a search with the chip label ───────
  const handleChipClick = (label: string) => {
    setSearchQuery(label);
    // Scroll to the top of the page so the results are visible
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ── RENDER ─────────────────────────────────────────────────
  return (
    <div className="discover__page">

      {/* ══════════════════════════════════════════════════════
          TOP NAVBAR
          ══════════════════════════════════════════════════════ */}
      <nav
        className="discover__nav"
        ref={navRef}
        aria-label="Discover navigation"
      >
        {/* Logo */}
        <Link to="/" className="discover__nav__logo" aria-label="SkillQuest home">
          <span className="discover__nav__logo__icon" aria-hidden="true">◈</span>
          SkillQuest
        </Link>

        {/* Nav dropdown items */}
        <ul className="discover__nav__items" role="menubar">
          {NAV_ITEMS.map((item) => {
            const isOpen = openDropdown === item.id;

            return (
              <li key={item.id} className="discover__nav__item" role="none">
                {/* Main nav button */}
                <button
                  className={`discover__nav__btn ${isOpen ? "open active" : ""}`}
                  role="menuitem"
                  aria-haspopup="true"
                  aria-expanded={isOpen}
                  onClick={() =>
                    setOpenDropdown(isOpen ? null : item.id)
                  }
                >
                  {item.label}
                  <span className="discover__nav__chevron" aria-hidden="true">
                    ▾
                  </span>
                </button>

                {/* Dropdown panel */}
                {isOpen && (
                  <div
                    className="discover__dropdown"
                    role="menu"
                    aria-label={`${item.label} submenu`}
                  >
                    {item.dropdownItems.map((sub) => (
                      <button
                        key={sub.path}
                        className="discover__dropdown__item"
                        role="menuitem"
                        onClick={() => {
                          setOpenDropdown(null);
                          navigate(sub.path);
                        }}
                      >
                        <span className="discover__dropdown__icon" aria-hidden="true">
                          {sub.icon}
                        </span>
                        {sub.label}
                      </button>
                    ))}
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        {/* Back to Home button */}
        <Link to="/" className="discover__home__btn" aria-label="Back to home page">
          ← Home
        </Link>
      </nav>

      {/* ══════════════════════════════════════════════════════
          MAIN CONTENT
          ══════════════════════════════════════════════════════ */}
      <main className="discover__main">

        {/* ── SEARCH BAR ─────────────────────────────────── */}
        <div className="discover__search__wrap">
          <div className="discover__search__inner">
            {/* Search icon */}
            <span className="discover__search__icon" aria-hidden="true">🔍</span>

            <input
              type="search"
              className="discover__search__input"
              placeholder="Search courses, skills, topics…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search SkillQuest"
              autoComplete="off"
              spellCheck={false}
            />

            {/* Clear button — only shown when there is text */}
            {searchQuery && (
              <button
                className="discover__search__clear"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          {/* Query feedback */}
          {isSearching && (
            <p className="discover__search__notice" aria-live="polite">
              {searchResults.length > 0
                ? `${searchResults.length} result${searchResults.length !== 1 ? "s" : ""} for "${trimmedQuery}"`
                : `No results for "${trimmedQuery}"`}
            </p>
          )}
        </div>

        {/* ════════════════════════════════════════════════════
            SEARCH RESULTS (shown instead of sections when searching)
            ════════════════════════════════════════════════════ */}
        {isSearching ? (
          <div className="discover__results__wrap">
            <h2 className="discover__results__title">
              Results for <span>"{trimmedQuery}"</span>
            </h2>

            {searchResults.length > 0 ? (
              <div className="discover__results__grid" role="list">
                {searchResults.map((course) => (
                  <div key={course.id} role="listitem">
                    <CourseCard course={course} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="discover__results__empty" role="status">
                <span className="discover__results__empty__icon" aria-hidden="true">
                  🔭
                </span>
                <p>
                  No courses matched "{trimmedQuery}".{" "}
                  Try a different keyword or browse the sections below.
                </p>
              </div>
            )}
          </div>
        ) : (
          <>
            {/* ════════════════════════════════════════════════
                FEATURED CAROUSEL
                ════════════════════════════════════════════════ */}
            <div className="discover__carousel__wrap">
              <div
                className="discover__carousel"
                role="region"
                aria-label="Featured content carousel"
                aria-roledescription="carousel"
              >
                {/* Sliding track */}
                <div
                  className="discover__carousel__track"
                  style={{
                    transform: `translateX(-${currentSlide * 100}%)`,
                  }}
                  aria-live="off"
                >
                  {CAROUSEL_SLIDES.map((slide, index) => (
                    <div
                      key={slide.id}
                      className="discover__carousel__slide"
                      style={{ background: slide.gradient }}
                      role="group"
                      aria-roledescription="slide"
                      aria-label={`Slide ${index + 1} of ${CAROUSEL_SLIDES.length}: ${slide.headline}`}
                      aria-hidden={index !== currentSlide}
                    >
                      <span className="discover__carousel__tag">
                        {slide.tag}
                      </span>
                      <h2 className="discover__carousel__headline">
                        {slide.headline}
                      </h2>
                      <p className="discover__carousel__subline">
                        {slide.subline}
                      </p>
                      <button
                        className="discover__carousel__cta"
                        style={{ background: slide.accentColor }}
                        onClick={() => navigate("/discover/popular")}
                        tabIndex={index === currentSlide ? 0 : -1}
                      >
                        {slide.ctaText} →
                      </button>
                    </div>
                  ))}
                </div>

                {/* Prev arrow */}
                <button
                  className="discover__carousel__arrow prev"
                  onClick={() => goToSlide(currentSlide - 1)}
                  aria-label="Previous slide"
                >
                  ‹
                </button>

                {/* Next arrow */}
                <button
                  className="discover__carousel__arrow next"
                  onClick={() => goToSlide(currentSlide + 1)}
                  aria-label="Next slide"
                >
                  ›
                </button>

                {/* Dot indicators */}
                <div className="discover__carousel__dots" role="tablist">
                  {CAROUSEL_SLIDES.map((slide, index) => (
                    <button
                      key={slide.id}
                      className={`discover__carousel__dot ${
                        index === currentSlide ? "active" : ""
                      }`}
                      onClick={() => goToSlide(index)}
                      role="tab"
                      aria-selected={index === currentSlide}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* ════════════════════════════════════════════════
                SUGGESTION CHIPS
                ════════════════════════════════════════════════ */}
            <div className="discover__chips__wrap">
              <p className="discover__chips__label">
                Browse by topic
              </p>
              <div
                className="discover__chips__row"
                role="list"
                aria-label="Topic suggestions"
              >
                {SUGGESTION_CHIPS.map((chip) => (
                  <button
                    key={chip.id}
                    className="discover__chip"
                    role="listitem"
                    onClick={() => handleChipClick(chip.label)}
                    aria-label={`Search for ${chip.label}`}
                  >
                    <span aria-hidden="true">{chip.icon}</span>
                    {chip.label}
                  </button>
                ))}
              </div>
            </div>

            {/* ════════════════════════════════════════════════
                COURSE SECTIONS
                Each section is a horizontal scroll row.
                animationDelay staggers their entrance.
                ════════════════════════════════════════════════ */}

            {/* 1. Top Courses */}
            <CourseSection
              title="Top Courses"
              icon="🔥"
              courses={TOP_COURSES}
              seeAllPath="/discover/popular"
              animationDelay="0.4s"
            />

            {/* 2. SkillQuest Official */}
            <CourseSection
              title="SkillQuest Courses"
              icon="◈"
              courses={SKILLQUEST_COURSES}
              seeAllPath="/discover/sq"
              animationDelay="0.5s"
            />

            {/* 3. Newly Added */}
            <CourseSection
              title="Newly Added"
              icon="🆕"
              courses={NEWLY_ADDED}
              seeAllPath="/discover/new"
              animationDelay="0.6s"
            />

            {/* 4. University Lectures */}
            <CourseSection
              title="University Lectures"
              icon="🏛️"
              courses={UNIVERSITY_LECTURES}
              seeAllPath="/discover/university"
              animationDelay="0.7s"
            />

            {/* 5. Study Materials */}
            <CourseSection
              title="Study Materials"
              icon="📋"
              courses={STUDY_MATERIALS}
              seeAllPath="/discover/materials"
              animationDelay="0.8s"
            />
          </>
        )}
      </main>

      {/* ══════════════════════════════════════════════════════
          BOTTOM TAB BAR (mobile only — shown below 768px)
          ══════════════════════════════════════════════════════ */}
      <nav
        className="discover__tab__bar"
        aria-label="Mobile navigation"
      >
        <div className="discover__tab__bar__inner">
          {TAB_ITEMS.map((tab) => (
            <button
              key={tab.id}
              className={`discover__tab ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => {
                setActiveTab(tab.id);
                navigate(tab.path);
              }}
              aria-label={tab.label}
              aria-current={activeTab === tab.id ? "page" : undefined}
            >
              <span className="discover__tab__icon" aria-hidden="true">
                {tab.icon}
              </span>
              <span className="discover__tab__label">{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}

export default Discover;
