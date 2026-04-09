import { Link } from "react-router-dom";

// ─── Types ────────────────────────────────────────────────────────────────────
type SchoolSubProps = {
  logo: string; // path to university logo image
  text: string; // university name
  link: string; // route to navigate to
  index?: number; // staggered animation delay
};

function SchoolSub({ logo, text, link, index = 0 }: SchoolSubProps) {
  const animationDelay = `${index * 70}ms`;

  // Initials fallback: "Bowen University" → "BU"
  const initials = text
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    // Wrapper handles the staggered entrance animation
    <div className="school__sub__wrapper" style={{ animationDelay }}>
      <Link
        to={link}
        className="school__sub__link"
        aria-label={`Go to ${text}`}
      >
        {/* ── Logo — left ───────────────────────────────── */}
        <div className="school__sub__logo">
          {logo ? (
            <img src={logo} alt={`${text} logo`} />
          ) : (
            // Shows initials when no real logo is provided yet
            <span className="school__sub__initials">{initials}</span>
          )}
        </div>

        {/* ── University name — next to logo ────────────── */}
        <span className="school__sub__text">{text}</span>

        {/* ── Arrow — far right, slides in on hover ─────── */}
        <span className="school__sub__arrow">→</span>
      </Link>
    </div>
  );
}

export default SchoolSub;
