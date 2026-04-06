/**
 * whatsNewData.ts  —  SkillQuest "What's New" Page Mock Data
 * ─────────────────────────────────────────────────────────────
 * All content here is placeholder / demo data.
 *
 * When your backend is ready:
 *   1. Replace each exported array with an API fetch call
 *   2. Delete this file
 *   3. Nothing in WhatsNew.tsx will break — it only uses the types
 *
 * Two tabs of content:
 *   • "Platform Updates"  — announcements about SkillQuest itself
 *   • "Content Drops"     — new courses, lectures, textbooks added
 * ─────────────────────────────────────────────────────────────
 */

// ── TYPES ─────────────────────────────────────────────────────

/**
 * A single comment on an announcement.
 * Replies are nested one level deep inside `replies[]`.
 */
export interface Comment {
  id: string;
  author: string;           // display name
  avatar: string;           // initials string e.g. "BO" — shown in avatar circle
  avatarColor: string;      // background colour for the avatar circle
  body: string;             // comment text
  timestamp: string;        // human-readable e.g. "2 hours ago"
  likes: number;            // number of likes on this comment
  replies: Comment[];       // nested replies (one level only)
}

/**
 * A single announcement post shown in the feed.
 */
export interface Announcement {
  id: string;
  tab: "platform" | "content";  // which tab this post belongs to
  category: string;             // label e.g. "Feature", "Content Drop"
  categoryColor: string;        // hex colour for the category pill
  date: string;                 // e.g. "April 2, 2026"
  title: string;
  body: string;                 // full post body (shown expanded or truncated)
  likes: number;                // initial like count
  comments: Comment[];          // seeded comment threads
  isHighlighted?: boolean;      // true = featured/pinned post (shown with accent border)
}

/**
 * A single user review of SkillQuest as a platform.
 */
export interface Review {
  id: string;
  author: string;
  avatar: string;
  avatarColor: string;
  rating: number;           // 1–5 stars
  title: string;            // short review headline
  body: string;             // full review text
  date: string;
  helpful: number;          // "X people found this helpful"
}

// ── SEEDED COMMENTS (reusable across posts) ───────────────────

const COMMENT_A: Comment = {
  id: "c-a",
  author: "bammy__oj",
  avatar: "BO",
  avatarColor: "#7c6ff7",
  body: "This is exactly what I've been waiting for! The AI tutor feature is going to change everything for self-learners like me.",
  timestamp: "3 hours ago",
  likes: 14,
  replies: [
    {
      id: "c-a-r1",
      author: "tope__learns",
      avatar: "TL",
      avatarColor: "#0ea5e9",
      body: "Agreed! I tried it earlier today and it actually explains concepts differently depending on how you phrase your question. Super impressive.",
      timestamp: "2 hours ago",
      likes: 6,
      replies: [],
    },
    {
      id: "c-a-r2",
      author: "SkillQuest Team",
      avatar: "SQ",
      avatarColor: "#170b48",
      body: "Thanks for the kind words! We've been working on this for months. More improvements are coming in the next update 🚀",
      timestamp: "1 hour ago",
      likes: 22,
      replies: [],
    },
  ],
};

const COMMENT_B: Comment = {
  id: "c-b",
  author: "chioma.dev",
  avatar: "CD",
  avatarColor: "#16a34a",
  body: "Love the new interface. One suggestion though — can we get a dark mode option? Studying late at night is tough on the eyes.",
  timestamp: "5 hours ago",
  likes: 31,
  replies: [
    {
      id: "c-b-r1",
      author: "SkillQuest Team",
      avatar: "SQ",
      avatarColor: "#170b48",
      body: "Dark mode is on our roadmap! We expect to ship it in Q3. Stay tuned 🌙",
      timestamp: "4 hours ago",
      likes: 18,
      replies: [],
    },
  ],
};

const COMMENT_C: Comment = {
  id: "c-c",
  author: "adewale_codes",
  avatar: "AC",
  avatarColor: "#f59e0b",
  body: "The Bowen University lectures are brilliant. I'm a 300-level student and the quality is honestly better than some of my in-person classes.",
  timestamp: "1 day ago",
  likes: 47,
  replies: [
    {
      id: "c-c-r1",
      author: "naomi.reads",
      avatar: "NR",
      avatarColor: "#ec4899",
      body: "Same experience here! The Clinical Anatomy series is incredibly detailed.",
      timestamp: "20 hours ago",
      likes: 9,
      replies: [],
    },
  ],
};

const COMMENT_D: Comment = {
  id: "c-d",
  author: "seun__dev",
  avatar: "SD",
  avatarColor: "#0ea5e9",
  body: "Will JAMB past questions also be available as timed mock tests? That would be a game changer for students.",
  timestamp: "2 days ago",
  likes: 52,
  replies: [
    {
      id: "c-d-r1",
      author: "SkillQuest Team",
      avatar: "SQ",
      avatarColor: "#170b48",
      body: "Yes! Timed mock exams are part of our Study Mode update coming next month. We'll announce here first 📣",
      timestamp: "1 day ago",
      likes: 34,
      replies: [],
    },
  ],
};

// ── PLATFORM UPDATE ANNOUNCEMENTS ─────────────────────────────

export const PLATFORM_UPDATES: Announcement[] = [
  {
    id: "pu-1",
    tab: "platform",
    category: "Feature Launch",
    categoryColor: "#7c6ff7",
    date: "April 2, 2026",
    title: "Introducing the SkillQuest AI Tutor — Your Personal Learning Assistant",
    body: `We're thrilled to announce the official launch of the SkillQuest AI Tutor — the most significant feature we've shipped since the platform launched.

The AI Tutor lives inside every course and lecture on the platform. Ask it anything about the content you're studying and it will explain concepts in plain language, give you worked examples, quiz you on key points, and adapt its responses based on your level.

This is what we've always believed learning should be: deeply personal, always available, and genuinely helpful. Whether you're a medical student trying to understand clinical anatomy or a developer building your first React app, the AI Tutor meets you exactly where you are.

**What it can do:**
• Explain any concept in the course in simple terms
• Give you alternative examples and analogies
• Quiz you with follow-up questions
• Summarise key points at the end of a session
• Flag areas where you should review more

The AI Tutor is available on all SkillQuest Official courses starting today. University lectures and community content will be supported in the next rollout (April 15).`,
    likes: 284,
    isHighlighted: true,
    comments: [COMMENT_A, COMMENT_B],
  },
  {
    id: "pu-2",
    tab: "platform",
    category: "Update",
    categoryColor: "#0ea5e9",
    date: "March 28, 2026",
    title: "Progress Tracking 2.0 — Streaks, Milestones, and Learning Reports",
    body: `We've completely rebuilt the progress tracking system from the ground up. Here's what changed:

**Streaks** — maintain a daily learning streak and earn badges as you go. Miss a day? You get one free streak protection per week.

**Milestones** — every 5 lessons completed, you'll receive a milestone notification and a certificate fragment. Complete a full course to assemble your certificate.

**Weekly Learning Reports** — every Monday morning, receive a personalised report showing your study time, topics covered, and a comparison with your previous week.

We believe motivation comes from seeing progress clearly. This update is our commitment to making that possible for every learner on the platform.`,
    likes: 156,
    comments: [COMMENT_D],
  },
  {
    id: "pu-3",
    tab: "platform",
    category: "Partnership",
    categoryColor: "#16a34a",
    date: "March 20, 2026",
    title: "SkillQuest Partners with 6 Nigerian Universities for Official Lecture Access",
    body: `We're proud to announce formal partnerships with six Nigerian universities who have granted SkillQuest official rights to host and distribute their lecture recordings.

**Partner institutions:**
• University of Lagos (UNILAG)
• Bowen University
• Covenant University
• University of Ibadan (UI)
• Obafemi Awolowo University (OAU)
• University of Nigeria, Nsukka (UNN)

This means every lecture you access from these institutions on SkillQuest is verified, officially licensed, and maintained by the universities themselves. No more worrying about outdated or unofficial recordings.

We're in active discussions with eight more institutions and expect to announce new partnerships by the end of Q2.`,
    likes: 412,
    isHighlighted: true,
    comments: [COMMENT_C],
  },
  {
    id: "pu-4",
    tab: "platform",
    category: "Design",
    categoryColor: "#f59e0b",
    date: "March 15, 2026",
    title: "Platform Redesign — What Changed and Why",
    body: `Over the past three months, we quietly redesigned almost every screen on SkillQuest. Here's the thinking behind the changes.

Our old design was built fast — we needed to launch and get feedback. It worked, but it was showing its age. Navigation was confusing, the course cards didn't communicate enough information at a glance, and mobile users were having a rough time.

The new design is built around one principle: **clarity at every step**. Every element on screen earns its place. We reduced visual noise, increased font sizes across the board, and made the most important actions larger and easier to tap.

We also introduced the split-panel login and signup pages, a complete navigation overhaul, and the new Discover page — all of which are live today.

If you have feedback on the new design, drop it in the comments below or use the Feedback tab on this page. We read every single one.`,
    likes: 203,
    comments: [],
  },
  {
    id: "pu-5",
    tab: "platform",
    category: "Community",
    categoryColor: "#ec4899",
    date: "March 8, 2026",
    title: "Community Profiles Are Live — Build Your Learner Identity",
    body: `You can now create and customise your public SkillQuest profile. Show off your completed courses, earned certificates, learning streaks, and any content you've uploaded to the platform.

Profiles are public by default but you can switch them to private in settings. Community creators (users who upload their own courses or study materials) get a special Creator badge on their profile.

We're also introducing the concept of **Learning Circles** — small groups of up to 10 learners who study together, share resources, and hold each other accountable. Circles are invite-only and completely private. More details on this coming soon.`,
    likes: 178,
    comments: [],
  },
];

// ── CONTENT DROP ANNOUNCEMENTS ────────────────────────────────

export const CONTENT_DROPS: Announcement[] = [
  {
    id: "cd-1",
    tab: "content",
    category: "Content Drop",
    categoryColor: "#7c6ff7",
    date: "April 3, 2026",
    title: "240 New University Lectures Added — Sciences, Law, Medicine & Engineering",
    body: `This is the largest single content drop in SkillQuest history: 240 new university lectures across four faculties, sourced directly from our partner institutions.

**What's included:**

🔬 **Sciences (68 lectures)**
Quantum Physics, Molecular Biology, Organic Chemistry II, Genetics & Heredity, Environmental Science

⚖️ **Law (54 lectures)**
Constitutional Law, Criminal Procedure, International Law, Property Law, Legal Writing & Research

🩺 **Medicine (72 lectures)**
Clinical Anatomy (Upper & Lower Limb), Medical Biochemistry, Pharmacology I, Pathology, Histology

🔧 **Engineering (46 lectures)**
Thermodynamics II, Fluid Mechanics, Structural Analysis, Electrical Circuits, Engineering Mathematics

All lectures include transcripts, downloadable notes, and AI Tutor support (for SkillQuest Official content) or standard Q&A (for university lectures).`,
    likes: 631,
    isHighlighted: true,
    comments: [COMMENT_C, COMMENT_D],
  },
  {
    id: "cd-2",
    tab: "content",
    category: "New Course",
    categoryColor: "#0ea5e9",
    date: "April 1, 2026",
    title: "New SkillQuest Course: Full-Stack Web Development with React & Node.js",
    body: `Our most requested course is finally here.

**Full-Stack Web Development with React & Node.js** is a 32-hour, 210-lesson deep dive into building real production-grade web applications from the ground up. This is not a hello-world tutorial — you will build four complete projects:

1. A personal portfolio with a CMS backend
2. A real-time chat application with WebSockets
3. An e-commerce store with payment integration
4. A social learning app (similar to SkillQuest itself)

The course covers: HTML/CSS foundations, JavaScript ES2024, React 19, TypeScript, Node.js, Express, MongoDB, PostgreSQL, REST APIs, authentication, deployment, and testing.

Taught by the SkillQuest Engineering team — the same people who built this platform.`,
    likes: 389,
    comments: [],
  },
  {
    id: "cd-3",
    tab: "content",
    category: "Study Materials",
    categoryColor: "#16a34a",
    date: "March 30, 2026",
    title: "JAMB & WAEC Past Questions Library — 2010 to 2025 Now Complete",
    body: `Every JAMB and WAEC past question from 2010 through 2025 is now on SkillQuest, fully indexed, searchable, and accompanied by detailed worked solutions.

**Subjects covered:**
Mathematics, English Language, Physics, Chemistry, Biology, Economics, Government, Literature in English, Commerce, Accounting, Geography, Agricultural Science, and Further Mathematics.

Each question set includes:
• The original question exactly as it appeared
• A step-by-step worked solution
• The concept or topic the question tests
• Related questions from other years

We also added a **Practice Mode** that lets you attempt any set under timed conditions and get a performance breakdown at the end.`,
    likes: 724,
    isHighlighted: true,
    comments: [],
  },
  {
    id: "cd-4",
    tab: "content",
    category: "New Course",
    categoryColor: "#f59e0b",
    date: "March 25, 2026",
    title: "Data Science with Python: From Zero to Job-Ready in 12 Weeks",
    body: `SkillQuest's Data Science track has been restructured into one comprehensive flagship course designed to take complete beginners to job-ready analysts in 12 weeks.

The course follows a structured weekly schedule:

**Weeks 1–3:** Python fundamentals, data types, control flow, functions
**Weeks 4–5:** NumPy, Pandas, and data wrangling
**Weeks 6–7:** Data visualisation with Matplotlib and Seaborn
**Weeks 8–9:** Statistics and probability for data science
**Weeks 10–11:** Machine learning with scikit-learn
**Week 12:** Capstone project — build and present a real data portfolio piece

Includes 8 guided projects, 4 graded assessments, and a certificate of completion recognised by our hiring partners.`,
    likes: 298,
    comments: [],
  },
  {
    id: "cd-5",
    tab: "content",
    category: "Textbooks",
    categoryColor: "#ec4899",
    date: "March 22, 2026",
    title: "Digital Textbook Library Expands — 180 Open-Access Titles Added",
    body: `Our digital library just got significantly larger. We've added 180 open-access textbooks across every major discipline, all legally licensed and free to read on the platform.

Notable additions include Gray's Anatomy (student edition), Calculus by Stewart (open edition), Introduction to Algorithms (MIT), Business Law by Cheeseman, Principles of Economics by Mankiw, and Molecular Biology of the Cell.

Every textbook is fully searchable and linked to relevant courses on the platform — so if you're taking our Organic Chemistry course and reach a concept you want to go deeper on, the relevant textbook section is one click away.

Download for offline reading is available on the SkillQuest mobile app (iOS and Android), coming Q2 2026.`,
    likes: 245,
    comments: [],
  },
];

// ── REVIEWS ───────────────────────────────────────────────────

export const REVIEWS: Review[] = [
  {
    id: "rv-1",
    author: "bammy__oj",
    avatar: "BO",
    avatarColor: "#7c6ff7",
    rating: 5,
    title: "The best learning platform built for Nigerians, by Nigerians",
    body: "I've tried Coursera, Udemy, and Khan Academy. None of them understand my context the way SkillQuest does. The university lecture partnerships are incredibly valuable — I'm a law student and having Bowen's actual lecture recordings available is something I genuinely couldn't believe when I first saw it. The AI Tutor is a bonus on top of an already brilliant product.",
    date: "April 1, 2026",
    helpful: 48,
  },
  {
    id: "rv-2",
    author: "chioma.dev",
    avatar: "CD",
    avatarColor: "#16a34a",
    rating: 5,
    title: "Switched careers using SkillQuest — now a junior developer",
    body: "Six months ago I was an accounting graduate with no tech background. I found SkillQuest, enrolled in the Frontend course, and committed to 2 hours a day. Last month I got my first developer role. The structured learning path, the community, and the AI Tutor (which launched halfway through my journey) made it feel like I had a personal mentor. Cannot recommend this enough.",
    date: "March 29, 2026",
    helpful: 112,
  },
  {
    id: "rv-3",
    author: "adewale_codes",
    avatar: "AC",
    avatarColor: "#f59e0b",
    rating: 4,
    title: "Excellent platform with a few rough edges still",
    body: "The content quality is top-tier and the university partnerships are a genuinely unique offering. My only gripes: the mobile app isn't out yet (I'm using the browser on my phone which works but isn't ideal), and I'd love to see more community creator content — there are some brilliant minds in Nigeria who should be on here. Four stars for now, five when the app drops.",
    date: "March 25, 2026",
    helpful: 67,
  },
  {
    id: "rv-4",
    author: "naomi.reads",
    avatar: "NR",
    avatarColor: "#ec4899",
    rating: 5,
    title: "JAMB past questions feature alone is worth everything",
    body: "I'm a SS3 student preparing for JAMB and the past questions library on this platform is unlike anything I've seen. Every question from 2010 to 2025, with worked solutions and explanations. I've been doing 30 questions a day and my mock scores have gone from 180 to 256 in 8 weeks. This is a life-changing resource for Nigerian students.",
    date: "March 18, 2026",
    helpful: 89,
  },
];
