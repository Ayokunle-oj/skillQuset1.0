import { useState } from "react";
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
  faCircleUser,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import "../sidebar.css";

interface NavItem {
  icon: typeof faGaugeHigh;
  label: string;
  path: string;
}
interface props {
  Outlet: React.ReactNode;
}

const NAV_ITEMS: NavItem[] = [
  { icon: faGaugeHigh, label: "Dashboard", path: "/dashboard/Home" },
  { icon: faBookOpen, label: "My Courses", path: "/dashboard/my-courses" },
  { icon: faCompass, label: "Discover", path: "/dashboard/discover" },
  { icon: faMessage, label: "Messages", path: "/dashboard/messages" },
  {
    icon: faChalkboardUser,
    label: "Lecture Room",
    path: "/dashboard/lecture-room",
  },
  { icon: faDatabase, label: "Library", path: "/dashboard/library" },
  { icon: faGear, label: "Settings", path: "/dashboard/settings" },
];

interface MobileNavItem {
  icon: typeof faGaugeHigh;
  label: string;
  path: string;
  matchPaths: string[]; // routes that should light this icon up as active
  center?: boolean;
}

const MOBILE_NAV_ITEMS: MobileNavItem[] = [
  {
    icon: faDatabase,
    label: "Library",
    path: "/dashboard/library",
    matchPaths: ["/dashboard/library"],
  },
  {
    icon: faBookOpen,
    label: "Courses",
    path: "/dashboard/my-courses",
    matchPaths: ["/dashboard/my-courses", "/dashboard/lecture-room"],
  },
  {
    icon: faGaugeHigh,
    label: "Home",
    path: "/dashboard/Home",
    matchPaths: ["/dashboard/Home", "/dashboard"],
    center: true,
  },
  {
    icon: faCompass,
    label: "Discover",
    path: "/dashboard/discover",
    matchPaths: ["/dashboard/discover"],
  },
  {
    icon: faCircleUser,
    label: "Profile",
    path: "/dashboard/profile",
    matchPaths: ["/dashboard/profile", "/dashboard/settings"],
  },
];

function UserDashNavbar({ Outlet }: props) {
  // ─── Main Dashboard Component ─────────────────────────────────────────────────
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="sidebar_container">
      <div className="sidebar_wrapper">
        <div className={`dashboard-layout${collapsed ? " collapsed" : ""}`}>
          {/* ── Sidebar ────────────────────────────────────────────────────────── */}
          <aside className={`sidebar${collapsed ? " collapsed" : ""}`}>
            <div className="sidebar-header">
              <div className="sidebar-logo">
                <div className="logo-icon">S</div>
                <span className="logo-text">SkillQuest</span>
              </div>
              <button
                className="collapse-btn"
                onClick={() => setCollapsed((c) => !c)}
                aria-label="Toggle sidebar"
              >
                <FontAwesomeIcon
                  icon={faChevronLeft}
                  style={{ fontSize: 12 }}
                />
              </button>
            </div>

            <nav className="sidebar-nav" role="navigation">
              {NAV_ITEMS.map((item) => {
                const isActive =
                  location.pathname === item.path ||
                  (item.path === "/dashboard" && location.pathname === "/");
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
          <div className="dashboard-content">{Outlet}</div>
        </div>
      </div>
      <nav className="mobile-navbar" role="navigation">
        {MOBILE_NAV_ITEMS.map((item) => {
          const isActive = item.matchPaths.some((p) =>
            location.pathname.startsWith(p),
          );
          return (
            <button
              key={item.path}
              className={`mobile-nav-item${item.center ? " center-item" : ""}${
                isActive ? " active" : ""
              }`}
              onClick={() => navigate(item.path)}
              aria-label={item.label}
            >
              {item.center ? (
                <span className="mobile-nav-icon-wrap">
                  <FontAwesomeIcon
                    icon={item.icon}
                    className="mobile-nav-icon"
                  />
                </span>
              ) : (
                <FontAwesomeIcon icon={item.icon} className="mobile-nav-icon" />
              )}
              <span className="mobile-nav-label">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}

export default UserDashNavbar;
