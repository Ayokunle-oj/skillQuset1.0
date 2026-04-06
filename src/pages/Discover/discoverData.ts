/**
 * discoverData.ts  —  SkillQuest Discover Page Mock Data
 * ─────────────────────────────────────────────────────────────
 * All data here is placeholder / demo content.
 * When your backend is ready, replace these arrays with real
 * API calls (e.g. fetch("/api/courses/top")) and delete this file.
 *
 * Each section exports its own array so you can swap them
 * individually without touching the others.
 * ─────────────────────────────────────────────────────────────
 */

// ── TYPES ─────────────────────────────────────────────────────

/**
 * A single course card displayed in any horizontal section row.
 */
export interface Course {
  id: string;
  title: string;
  creator: string;             // e.g. "SkillQuest", "Bowen University", "bammy__oj"
  creatorType: "official" | "university" | "user"; // controls badge style
  thumbnail: string;           // gradient string used as background (replace with real image URLs)
  duration: string;            // e.g. "4h 32m"
  lessons: number;             // total number of lessons
  views: string;               // formatted string e.g. "12.4k"
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  category: string;            // e.g. "Physics", "Frontend"
  rating: number;              // 1–5
  isNew?: boolean;             // shows a "New" badge
}

/**
 * A single carousel / featured banner slide.
 */
export interface CarouselSlide {
  id: string;
  tag: string;                 // small label above headline e.g. "Featured"
  headline: string;
  subline: string;
  ctaText: string;
  gradient: string;            // CSS gradient for the slide background
  accentColor: string;         // colour used for the CTA button
}

/**
 * A suggestion chip shown in the topic row.
 */
export interface SuggestionChip {
  id: string;
  label: string;
  icon: string;                // emoji icon
}

// ── CAROUSEL SLIDES ────────────────────────────────────────────
export const CAROUSEL_SLIDES: CarouselSlide[] = [
  {
    id: "slide-1",
    tag: "🚀 AI-Powered Learning",
    headline: "The Future of Education is Here",
    subline: "Personalised paths, expert content, and AI guidance — all in one place.",
    ctaText: "Start Exploring",
    gradient: "linear-gradient(135deg, #170b48 0%, #2d1a7a 50%, #1a3a6b 100%)",
    accentColor: "#7c6ff7",
  },
  {
    id: "slide-2",
    tag: "🏛️ University Lectures",
    headline: "Learn Directly from Top Universities",
    subline: "Access real lectures from Bowen, Covenant, UI, and more Nigerian institutions.",
    ctaText: "Browse Lectures",
    gradient: "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)",
    accentColor: "#38bdf8",
  },
  {
    id: "slide-3",
    tag: "💼 Skills That Matter",
    headline: "Build Real-World Skills in Weeks",
    subline: "Frontend, Backend, Data Science, Design — industry-ready from day one.",
    ctaText: "Explore Skills",
    gradient: "linear-gradient(135deg, #1a0533 0%, #3b0f6b 50%, #170b48 100%)",
    accentColor: "#c084fc",
  },
  {
    id: "slide-4",
    tag: "📚 Free Textbooks",
    headline: "Thousands of Textbooks, Zero Cost",
    subline: "Medical, Law, Engineering, Sciences — browse our open digital library.",
    ctaText: "Open Library",
    gradient: "linear-gradient(135deg, #052e16 0%, #0f4c2a 50%, #170b48 100%)",
    accentColor: "#4ade80",
  },
];

// ── SUGGESTION CHIPS ───────────────────────────────────────────
export const SUGGESTION_CHIPS: SuggestionChip[] = [
  { id: "chip-1",  label: "Frontend",      icon: "💻" },
  { id: "chip-2",  label: "Backend",       icon: "⚙️" },
  { id: "chip-3",  label: "Physics",       icon: "⚛️" },
  { id: "chip-4",  label: "Microbiology",  icon: "🔬" },
  { id: "chip-5",  label: "Law",           icon: "⚖️" },
  { id: "chip-6",  label: "Mathematics",   icon: "📐" },
  { id: "chip-7",  label: "Data Science",  icon: "📊" },
  { id: "chip-8",  label: "Medicine",      icon: "🩺" },
  { id: "chip-9",  label: "Design",        icon: "🎨" },
  { id: "chip-10", label: "Economics",     icon: "📈" },
  { id: "chip-11", label: "Chemistry",     icon: "🧪" },
  { id: "chip-12", label: "History",       icon: "📜" },
  { id: "chip-13", label: "Engineering",   icon: "🔧" },
  { id: "chip-14", label: "Business",      icon: "💼" },
  { id: "chip-15", label: "Psychology",    icon: "🧠" },
];

// ── SHARED THUMBNAIL GRADIENTS (placeholder until real images) ──
// When you have real image URLs, replace the `thumbnail` field
// on each course with the image URL and update the CSS to use
// background-image instead of background.
const THUMBS = {
  purple:  "linear-gradient(135deg, #2d1a7a, #170b48)",
  blue:    "linear-gradient(135deg, #1a3a6b, #0f2c54)",
  teal:    "linear-gradient(135deg, #134e4a, #0f4c2a)",
  rose:    "linear-gradient(135deg, #4c0519, #7f1d1d)",
  amber:   "linear-gradient(135deg, #451a03, #78350f)",
  indigo:  "linear-gradient(135deg, #1e1b4b, #312e81)",
  sky:     "linear-gradient(135deg, #0c4a6e, #075985)",
  green:   "linear-gradient(135deg, #052e16, #14532d)",
  violet:  "linear-gradient(135deg, #2e1065, #4c1d95)",
  slate:   "linear-gradient(135deg, #0f172a, #1e293b)",
};

// ── TOP COURSES ────────────────────────────────────────────────
export const TOP_COURSES: Course[] = [
  {
    id: "tc-1",
    title: "Complete React & TypeScript Bootcamp",
    creator: "SkillQuest",
    creatorType: "official",
    thumbnail: THUMBS.purple,
    duration: "18h 45m",
    lessons: 124,
    views: "84.2k",
    difficulty: "Intermediate",
    category: "Frontend",
    rating: 4.9,
  },
  {
    id: "tc-2",
    title: "Introduction to Organic Chemistry",
    creator: "Bowen University",
    creatorType: "university",
    thumbnail: THUMBS.teal,
    duration: "6h 12m",
    lessons: 38,
    views: "31.7k",
    difficulty: "Beginner",
    category: "Chemistry",
    rating: 4.7,
  },
  {
    id: "tc-3",
    title: "Nigerian Constitutional Law — Full Course",
    creator: "Covenant University",
    creatorType: "university",
    thumbnail: THUMBS.rose,
    duration: "9h 04m",
    lessons: 56,
    views: "22.1k",
    difficulty: "Advanced",
    category: "Law",
    rating: 4.8,
  },
  {
    id: "tc-4",
    title: "Data Science with Python: Zero to Hero",
    creator: "SkillQuest",
    creatorType: "official",
    thumbnail: THUMBS.blue,
    duration: "24h 10m",
    lessons: 160,
    views: "102.5k",
    difficulty: "Beginner",
    category: "Data Science",
    rating: 4.9,
  },
  {
    id: "tc-5",
    title: "Calculus I — Limits, Derivatives & Integrals",
    creator: "bammy__oj",
    creatorType: "user",
    thumbnail: THUMBS.indigo,
    duration: "11h 30m",
    lessons: 74,
    views: "18.3k",
    difficulty: "Intermediate",
    category: "Mathematics",
    rating: 4.6,
  },
  {
    id: "tc-6",
    title: "UI/UX Design Fundamentals",
    creator: "SkillQuest",
    creatorType: "official",
    thumbnail: THUMBS.violet,
    duration: "8h 20m",
    lessons: 52,
    views: "45.9k",
    difficulty: "Beginner",
    category: "Design",
    rating: 4.8,
  },
];

// ── SKILLQUEST OFFICIAL COURSES ────────────────────────────────
export const SKILLQUEST_COURSES: Course[] = [
  {
    id: "sq-1",
    title: "Node.js & Express — Backend Mastery",
    creator: "SkillQuest",
    creatorType: "official",
    thumbnail: THUMBS.green,
    duration: "20h 00m",
    lessons: 138,
    views: "67.4k",
    difficulty: "Intermediate",
    category: "Backend",
    rating: 4.9,
  },
  {
    id: "sq-2",
    title: "Figma for Beginners — Design Like a Pro",
    creator: "SkillQuest",
    creatorType: "official",
    thumbnail: THUMBS.violet,
    duration: "5h 40m",
    lessons: 34,
    views: "38.2k",
    difficulty: "Beginner",
    category: "Design",
    rating: 4.7,
  },
  {
    id: "sq-3",
    title: "Machine Learning A–Z",
    creator: "SkillQuest",
    creatorType: "official",
    thumbnail: THUMBS.blue,
    duration: "30h 15m",
    lessons: 200,
    views: "120.1k",
    difficulty: "Advanced",
    category: "Data Science",
    rating: 4.9,
  },
  {
    id: "sq-4",
    title: "Business Communication & Leadership",
    creator: "SkillQuest",
    creatorType: "official",
    thumbnail: THUMBS.amber,
    duration: "4h 50m",
    lessons: 28,
    views: "14.6k",
    difficulty: "Beginner",
    category: "Business",
    rating: 4.5,
  },
  {
    id: "sq-5",
    title: "Docker & Kubernetes for Developers",
    creator: "SkillQuest",
    creatorType: "official",
    thumbnail: THUMBS.sky,
    duration: "14h 00m",
    lessons: 92,
    views: "29.8k",
    difficulty: "Advanced",
    category: "Backend",
    rating: 4.8,
  },
];

// ── NEWLY ADDED ────────────────────────────────────────────────
export const NEWLY_ADDED: Course[] = [
  {
    id: "na-1",
    title: "Introduction to Quantum Physics",
    creator: "University of Ibadan",
    creatorType: "university",
    thumbnail: THUMBS.sky,
    duration: "7h 18m",
    lessons: 44,
    views: "1.2k",
    difficulty: "Advanced",
    category: "Physics",
    rating: 4.6,
    isNew: true,
  },
  {
    id: "na-2",
    title: "Microbiology & Infectious Disease",
    creator: "Bowen University",
    creatorType: "university",
    thumbnail: THUMBS.teal,
    duration: "5h 55m",
    lessons: 36,
    views: "874",
    difficulty: "Intermediate",
    category: "Microbiology",
    rating: 4.5,
    isNew: true,
  },
  {
    id: "na-3",
    title: "Freelancing as a Developer in Africa",
    creator: "bammy__oj",
    creatorType: "user",
    thumbnail: THUMBS.amber,
    duration: "2h 30m",
    lessons: 18,
    views: "3.4k",
    difficulty: "Beginner",
    category: "Business",
    rating: 4.7,
    isNew: true,
  },
  {
    id: "na-4",
    title: "Advanced CSS — Animations & 3D Transforms",
    creator: "SkillQuest",
    creatorType: "official",
    thumbnail: THUMBS.purple,
    duration: "6h 10m",
    lessons: 40,
    views: "5.1k",
    difficulty: "Advanced",
    category: "Frontend",
    rating: 4.8,
    isNew: true,
  },
  {
    id: "na-5",
    title: "Introduction to Psychology",
    creator: "Covenant University",
    creatorType: "university",
    thumbnail: THUMBS.rose,
    duration: "4h 40m",
    lessons: 30,
    views: "2.0k",
    difficulty: "Beginner",
    category: "Psychology",
    rating: 4.4,
    isNew: true,
  },
];

// ── UNIVERSITY LECTURES ────────────────────────────────────────
export const UNIVERSITY_LECTURES: Course[] = [
  {
    id: "ul-1",
    title: "Medical Biochemistry — Year 2",
    creator: "University of Lagos",
    creatorType: "university",
    thumbnail: THUMBS.teal,
    duration: "12h 00m",
    lessons: 72,
    views: "44.3k",
    difficulty: "Advanced",
    category: "Medicine",
    rating: 4.7,
  },
  {
    id: "ul-2",
    title: "Contract Law — Fundamentals",
    creator: "Bowen University",
    creatorType: "university",
    thumbnail: THUMBS.rose,
    duration: "8h 30m",
    lessons: 50,
    views: "19.6k",
    difficulty: "Intermediate",
    category: "Law",
    rating: 4.6,
  },
  {
    id: "ul-3",
    title: "Engineering Thermodynamics",
    creator: "Covenant University",
    creatorType: "university",
    thumbnail: THUMBS.slate,
    duration: "10h 20m",
    lessons: 62,
    views: "11.4k",
    difficulty: "Advanced",
    category: "Engineering",
    rating: 4.5,
  },
  {
    id: "ul-4",
    title: "Macroeconomics I",
    creator: "University of Ibadan",
    creatorType: "university",
    thumbnail: THUMBS.amber,
    duration: "6h 45m",
    lessons: 42,
    views: "8.7k",
    difficulty: "Intermediate",
    category: "Economics",
    rating: 4.4,
  },
  {
    id: "ul-5",
    title: "Clinical Anatomy — Upper Limb",
    creator: "University of Lagos",
    creatorType: "university",
    thumbnail: THUMBS.green,
    duration: "9h 10m",
    lessons: 58,
    views: "23.1k",
    difficulty: "Advanced",
    category: "Medicine",
    rating: 4.8,
  },
];

// ── STUDY MATERIALS ────────────────────────────────────────────
export const STUDY_MATERIALS: Course[] = [
  {
    id: "sm-1",
    title: "JAMB Physics Past Questions — 2010–2024",
    creator: "SkillQuest",
    creatorType: "official",
    thumbnail: THUMBS.indigo,
    duration: "Self-paced",
    lessons: 200,
    views: "156.2k",
    difficulty: "Intermediate",
    category: "Physics",
    rating: 4.9,
  },
  {
    id: "sm-2",
    title: "WAEC Mathematics Revision Pack",
    creator: "SkillQuest",
    creatorType: "official",
    thumbnail: THUMBS.blue,
    duration: "Self-paced",
    lessons: 180,
    views: "98.4k",
    difficulty: "Beginner",
    category: "Mathematics",
    rating: 4.8,
  },
  {
    id: "sm-3",
    title: "Anatomy Flashcard Set — 400 Cards",
    creator: "tope__learns",
    creatorType: "user",
    thumbnail: THUMBS.teal,
    duration: "Self-paced",
    lessons: 400,
    views: "12.9k",
    difficulty: "Advanced",
    category: "Medicine",
    rating: 4.7,
  },
  {
    id: "sm-4",
    title: "JavaScript Interview Cheat Sheet",
    creator: "SkillQuest",
    creatorType: "official",
    thumbnail: THUMBS.amber,
    duration: "Self-paced",
    lessons: 60,
    views: "34.5k",
    difficulty: "Intermediate",
    category: "Frontend",
    rating: 4.8,
  },
];
