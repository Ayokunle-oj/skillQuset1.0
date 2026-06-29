import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGaugeHigh,
  faBookOpen,
  faCompass,
  faMessage,
  faChalkboardUser,
  faDatabase,
  faGear,
  faChevronLeft,
  faBell,
  faMagnifyingGlass,
  faRankingStar,
  faBolt,
  faStar,
  faFire,
  faUser,
  faPen,
  faShield,
  faArrowRightFromBracket,
  faTrophy,
  faMedal,
} from "@fortawesome/free-solid-svg-icons";
import "./Dashboard.css";

// ─── Types ────────────────────────────────────────────────────────────────────
interface NavItem {
  icon: typeof faGaugeHigh;
  label: string;
  path: string;
}

interface CourseProgress {
  id: number;
  name: string;
  instructor: string;
  progress: number;
  color: string;
  bg: string;
  iconColor: string;
}

interface CompletedCourse {
  id: number;
  name: string;
  date: string;
  bg: string;
  iconColor: string;
}

interface LeaderboardEntry {
  id: number;
  name: string;
  initials: string;
  points: number;
  avatarBg: string;
  isUser?: boolean;
}

// ─── Static Data ──────────────────────────────────────────────────────────────
const NAV_ITEMS: NavItem[] = [
  { icon: faGaugeHigh,      label: "Dashboard",    path: "/dashboard"   },
  { icon: faBookOpen,       label: "My Courses",   path: "/my-courses"  },
  { icon: faCompass,        label: "Discover",     path: "/discover"    },
  { icon: faMessage,        label: "Messages",     path: "/messages"    },
  { icon: faChalkboardUser, label: "Lecture Room", path: "/lecture-room"},
  { icon: faDatabase,       label: "Library",      path: "/library"     },
  { icon: faGear,           label: "Settings",     path: "/settings"    },
];

const ACTIVE_COURSES: CourseProgress[] = [
  { id: 1, name: "UI/UX Design Fundamentals", instructor: "Dr. Adaeze Obi",  progress: 72, color: "#7c6ff7", bg: "#f0eeff", iconColor: "#7c6ff7" },
  { id: 2, name: "Data Structures & Algorithms", instructor: "Prof. Emeka Nwosu", progress: 45, color: "#4f8ef7", bg: "#e8f0ff", iconColor: "#4f8ef7" },
  { id: 3, name: "Business Communication", instructor: "Ms. Funke Adesanya",  progress: 88, color: "#22a855", bg: "#e6f9ee", iconColor: "#22a855" },
];

const COMPLETED_COURSES: CompletedCourse[] = [
  { id: 1, name: "Intro to Python",          date: "Apr 28, 2026", bg: "#fff5e0", iconColor: "#f7a800" },
  { id: 2, name: "Mathematics for Engineers", date: "Mar 15, 2026", bg: "#ffece8", iconColor: "#f7533a" },
  { id: 3, name: "Critical Thinking 101",    date: "Feb 02, 2026", bg: "#e8f0ff", iconColor: "#4f8ef7" },
];

const LEADERBOARD: LeaderboardEntry[] = [
  { id: 1, name: "Amara Okafor",   initials: "AO", points: 9840, avatarBg: "linear-gradient(135deg,#f7a800,#f7533a)" },
  { id: 2, name: "Tunde Adeyemi",  initials: "TA", points: 9120, avatarBg: "linear-gradient(135deg,#4f8ef7,#7c6ff7)" },
  { id: 3, name: "Chisom Eze",     initials: "CE", points: 8750, avatarBg: "linear-gradient(135deg,#22a855,#4f8ef7)" },
  { id: 4, name: "You",            initials: "AO", points: 7430, avatarBg: "linear-gradient(135deg,#7c6ff7,#4f8ef7)", isUser: true },
  { id: 5, name: "Bisi Adeleke",   initials: "BA", points: 6980, avatarBg: "linear-gradient(135deg,#f7533a,#f7a800)" },
];

// ─── Gauge SVG ────────────────────────────────────────────────────────────────
function ActivityGauge() {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 300);
    return () => clearTimeout(t);
  }, []);

  // Half-circle gauge params
  const cx = 110, cy = 110, r = 80;
  const circ = Math.PI * r; // half-circle circumference
  // Segments: UI 40%, Motion 65%, Art 30% — shown as filled arc segments
  const toOffset = (pct: number) => circ - (pct / 100) * circ;

  return (
    <div className="activity-gauge-wrap">
      <svg
        className="gauge-svg"
        width="220"
        height="130"
        viewBox="0 0 220 130"
      >
        <defs>
          <linearGradient id="gaugeGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7c6ff7" />
            <stop offset="100%" stopColor="#4f8ef7" />
          </linearGradient>
          <linearGradient id="gaugeGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f7a800" />
            <stop offset="100%" stopColor="#f7533a" />
          </linearGradient>
          <linearGradient id="gaugeGrad3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f7533a" />
            <stop offset="100%" stopColor="#ff89c4" />
          </linearGradient>
        </defs>

        {/* Track */}
        <path
          d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
          fill="none"
          stroke="#e8edf8"
          strokeWidth="16"
          strokeLinecap="round"
        />

        {/* Art segment (30%) — bottom layer */}
        <path
          d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
          fill="none"
          stroke="url(#gaugeGrad3)"
          strokeWidth="16"
          strokeLinecap="round"
          strokeDasharray={`${circ}`}
          strokeDashoffset={animated ? toOffset(30) : circ}
          style={{ transition: "stroke-dashoffset 1.6s cubic-bezier(0.4,0,0.2,1) 0.5s" }}
        />

        {/* Motion segment (65%) — mid layer */}
        <path
          d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
          fill="none"
          stroke="url(#gaugeGrad2)"
          strokeWidth="16"
          strokeLinecap="round"
          strokeDasharray={`${circ}`}
          strokeDashoffset={animated ? toOffset(65) : circ}
          style={{ transition: "stroke-dashoffset 1.6s cubic-bezier(0.4,0,0.2,1) 0.25s" }}
        />

        {/* UI segment (40%) — top layer */}
        <path
          d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
          fill="none"
          stroke="url(#gaugeGrad1)"
          strokeWidth="16"
          strokeLinecap="round"
          strokeDasharray={`${circ}`}
          strokeDashoffset={animated ? toOffset(40) : circ}
          style={{ transition: "stroke-dashoffset 1.6s cubic-bezier(0.4,0,0.2,1)" }}
        />

        {/* Center label */}
        <text x={cx} y={cy - 14} textAnchor="middle" fill="#0f2c6f" fontSize="30" fontWeight="800">
          78%
        </text>
        <text x={cx} y={cy + 8} textAnchor="middle" fill="#8896b3" fontSize="11">
          Overall Progress
        </text>
      </svg>

      <div className="activity-legend">
        <div className="legend-item">
          <div className="legend-dot" style={{ background: "#7c6ff7" }} />
          <span>UI Design</span>
          <span className="legend-pct">40%</span>
        </div>
        <div className="legend-item">
          <div className="legend-dot" style={{ background: "#f7a800" }} />
          <span>Critical Thinking</span>
          <span className="legend-pct">65%</span>
        </div>
        <div className="legend-item">
          <div className="legend-dot" style={{ background: "#f7533a" }} />
          <span>Data Structures</span>
          <span className="legend-pct">30%</span>
        </div>
      </div>
    </div>
  );
}

// ─── Profile Dropdown ─────────────────────────────────────────────────────────
function ProfileDropdown({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  return (
    <div className="profile-dropdown" ref={ref}>
      <div className="dropdown-header">
        <div className="dropdown-avatar">AO</div>
        <div>
          <div className="dropdown-user-name">Ayokunle Ojo</div>
          <div className="dropdown-user-email">ayokunleojo14@gmail.com</div>
        </div>
      </div>

      <div className="dropdown-stats">
        <div className="dropdown-stat">
          <div className="dropdown-stat-value">#4</div>
          <div className="dropdown-stat-label">Rank</div>
        </div>
        <div className="dropdown-stat">
          <div className="dropdown-stat-value">7,430</div>
          <div className="dropdown-stat-label">Points</div>
        </div>
        <div className="dropdown-stat">
          <div className="dropdown-stat-value">12</div>
          <div className="dropdown-stat-label">Streak</div>
        </div>
      </div>

      <div className="dropdown-menu">
        <div className="dropdown-menu-item">
          <FontAwesomeIcon icon={faUser} className="fa-icon" />
          View Profile
        </div>
        <div className="dropdown-menu-item">
          <FontAwesomeIcon icon={faPen} className="fa-icon" />
          Edit Profile
        </div>
        <div className="dropdown-menu-item">
          <FontAwesomeIcon icon={faShield} className="fa-icon" />
          Privacy & Security
        </div>
        <div className="dropdown-divider" />
        <div className="dropdown-menu-item danger">
          <FontAwesomeIcon icon={faArrowRightFromBracket} className="fa-icon" />
          Log Out
        </div>
      </div>
    </div>
  );
}

// ─── Main Dashboard Component ─────────────────────────────────────────────────
export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const rankLabel = (i: number) => {
    if (i === 0) return "gold";
    if (i === 1) return "silver";
    if (i === 2) return "bronze";
    return "";
  };

  return (
    <div className="dashboard-layout">
      {/* ── Sidebar ────────────────────────────────────────────────────────── */}
      <aside className={`sidebar${collapsed ? " collapsed" : ""}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <div className="logo-icon">SQ</div>
            <span className="logo-text">SkillQuest</span>
          </div>
          <button
            className="collapse-btn"
            onClick={() => setCollapsed((c) => !c)}
            aria-label="Toggle sidebar"
          >
            <FontAwesomeIcon icon={faChevronLeft} style={{ fontSize: 12 }} />
          </button>
        </div>

        <nav className="sidebar-nav" role="navigation">
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.path || (item.path === "/dashboard" && location.pathname === "/");
            return (
              <div
                key={item.path}
                className={`nav-item${isActive ? " active" : ""}`}
                onClick={() => navigate(item.path)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && navigate(item.path)}
              >
                <FontAwesomeIcon icon={item.icon} className="nav-icon" />
                <span className="nav-label">{item.label}</span>
                <span className="nav-tooltip">{item.label}</span>
              </div>
            );
          })}
        </nav>

        <div className="sidebar-premium">
          <div className="premium-badge">Premium</div>
          <div className="premium-title">Go Premium</div>
          <div className="premium-sub">Unlock all courses & features</div>
          <button className="premium-btn">Coming Soon</button>
        </div>
      </aside>

      {/* ── Main ───────────────────────────────────────────────────────────── */}
      <div className={`main-content${collapsed ? " collapsed" : ""}`}>
        {/* Top Bar */}
        <header className="topbar">
          <div className="topbar-left">
            <h1>Dashboard</h1>
            <p>Welcome back, Ayokunle — keep the streak alive!</p>
          </div>
          <div className="topbar-right">
            <button className="topbar-icon-btn" aria-label="Search">
              <FontAwesomeIcon icon={faMagnifyingGlass} style={{ fontSize: 14 }} />
            </button>
            <button className="topbar-icon-btn" aria-label="Notifications">
              <FontAwesomeIcon icon={faBell} style={{ fontSize: 14 }} />
              <span className="notif-dot" />
            </button>

            <div
              className="profile-trigger"
              onClick={() => setShowProfile((v) => !v)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setShowProfile((v) => !v)}
            >
              <div className="profile-avatar">AO</div>
              <div className="profile-info">
                <span className="profile-name">Ayokunle Ojo</span>
                <span className="profile-role">Student</span>
              </div>
            </div>
          </div>

          {showProfile && (
            <ProfileDropdown onClose={() => setShowProfile(false)} />
          )}
        </header>

        {/* Page Content */}
        <main className="page-content">
          {/* Stat Cards: Rank, Points, Streaks */}
          <div className="stat-cards">
            <div className="stat-card">
              <div className="stat-icon-wrap rank">
                <FontAwesomeIcon icon={faRankingStar} />
              </div>
              <div className="stat-info">
                <div className="stat-value">#4</div>
                <div className="stat-label">Current Rank</div>
                <div className="stat-sub">Top 15% nationwide</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon-wrap points">
                <FontAwesomeIcon icon={faBolt} />
              </div>
              <div className="stat-info">
                <div className="stat-value">7,430</div>
                <div className="stat-label">Total Points</div>
                <div className="stat-sub">+320 this week</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon-wrap streak">
                <FontAwesomeIcon icon={faFire} />
              </div>
              <div className="stat-info">
                <div className="stat-value">12</div>
                <div className="stat-label">Day Streak</div>
                <div className="stat-sub">Personal best!</div>
              </div>
            </div>
          </div>

          {/* Main Grid */}
          <div className="dashboard-grid">
            {/* Left Column */}
            <div className="dashboard-col">
              {/* Today's Activity */}
              <div className="card activity-card">
                <div className="card-header">
                  <span className="card-title">Today's Activity</span>
                  <span className="card-action">Details</span>
                </div>
                <div className="card-body">
                  <ActivityGauge />
                </div>
              </div>

              {/* My Courses Progress */}
              <div className="card courses-card">
                <div className="card-header">
                  <span className="card-title">My Courses</span>
                  <span
                    className="card-action"
                    onClick={() => navigate("/my-courses")}
                  >
                    View All
                  </span>
                </div>
                <div className="card-body">
                  {ACTIVE_COURSES.map((course) => (
                    <div className="course-item" key={course.id}>
                      <div
                        className="course-thumb"
                        style={{ background: course.bg }}
                      >
                        <FontAwesomeIcon
                          icon={faBookOpen}
                          style={{ color: course.iconColor, fontSize: 16 }}
                        />
                      </div>
                      <div className="course-details">
                        <div className="course-name">{course.name}</div>
                        <div className="course-meta">{course.instructor}</div>
                        <div className="course-progress-wrap">
                          <div className="progress-bar-bg">
                            <div
                              className="progress-bar-fill"
                              style={{
                                width: `${course.progress}%`,
                                background: course.color,
                              }}
                            />
                          </div>
                          <span className="progress-pct">{course.progress}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Courses Completed */}
              <div className="card completed-card">
                <div className="card-header">
                  <span className="card-title">Courses Completed</span>
                  <span className="card-action">See All</span>
                </div>
                <div className="card-body">
                  <div className="completed-count-row">
                    <span className="completed-big-num">
                      {COMPLETED_COURSES.length}
                    </span>
                    <span className="completed-label">courses finished</span>
                  </div>
                  <div className="completed-course-list">
                    {COMPLETED_COURSES.map((c) => (
                      <div className="completed-item" key={c.id}>
                        <div
                          className="completed-thumb"
                          style={{ background: c.bg }}
                        >
                          <FontAwesomeIcon
                            icon={faStar}
                            style={{ color: c.iconColor, fontSize: 15 }}
                          />
                        </div>
                        <div className="completed-info">
                          <div className="completed-name">{c.name}</div>
                          <div className="completed-date">{c.date}</div>
                        </div>
                        <span className="completed-badge">Done</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="dashboard-col">
              {/* Leaderboard */}
              <div className="card leaderboard-card">
                <div className="card-header">
                  <span className="card-title">Leaderboard</span>
                  <span className="card-action">Full Board</span>
                </div>
                <div className="card-body">
                  <div className="leaderboard-list">
                    {LEADERBOARD.map((entry, i) => (
                      <div
                        className={`lb-item${entry.isUser ? " is-user" : ""}`}
                        key={entry.id}
                      >
                        <div className={`lb-rank ${rankLabel(i)}`}>
                          {i < 3 ? (
                            <FontAwesomeIcon
                              icon={i === 0 ? faTrophy : faMedal}
                              style={{ fontSize: 14 }}
                            />
                          ) : (
                            `#${i + 1}`
                          )}
                        </div>
                        <div
                          className="lb-avatar"
                          style={{ background: entry.avatarBg }}
                        >
                          {entry.initials}
                        </div>
                        <div className="lb-name">
                          {entry.isUser ? "You" : entry.name}
                        </div>
                        {entry.isUser && (
                          <span className="lb-you">You</span>
                        )}
                        <div>
                          <div className="lb-points">
                            {entry.points.toLocaleString()}
                          </div>
                          <div className="lb-points-label">pts</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
