import { useEffect, useRef, useState } from "react";
// import "./index.css";
import SchoolSub from "./SchoolSub";

// ─────────────────────────────────────────────────────────────────────────────
//  UNIVERSITY DATA
//  👉 When you have real logos, import them and replace logo: ""
//     Example:
//       import bowenLogo from "../../assets/bowen.png";
//       { name: "Bowen University", link: "./university/bowen", logo: bowenLogo }
// ─────────────────────────────────────────────────────────────────────────────

const UNIVERSITIES = [
  { name: "Bowen University", link: "./university/bowen", logo: "" },
  { name: "Nile University", link: "./university/nile", logo: "" },
  { name: "Bingham University", link: "./university/bingham", logo: "" },
  {
    name: "Pan-Atlantic University",
    link: "./university/pan-atlantic",
    logo: "",
  },
  { name: "Covenant University", link: "./university/covenant", logo: "" },
  { name: "Landmark University", link: "./university/landmark", logo: "" },
  { name: "Redeemer's University", link: "./university/redeemers", logo: "" },
  {
    name: "Afe Babalola University",
    link: "./university/afe-babalola",
    logo: "",
  },
  { name: "Babcock University", link: "./university/babcock", logo: "" },
];

function School() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Fires entrance animation when section scrolls into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`school__container ${isVisible ? "school__container--visible" : ""}`}
    >
      {/* ── Header ──────────────────────────────────────── */}
      <h2>Schools built for every ambition</h2>
      <p>
        Browse programs by school to discover what you want to learn — from AI
        to Cybersecurity and beyond.
      </p>

      {/* ── 3-column card grid ──────────────────────────── */}
      <div className="school__sub__container">
        {UNIVERSITIES.map((uni, i) => (
          <SchoolSub
            key={uni.name}
            logo={uni.logo}
            text={uni.name}
            link={uni.link}
            index={i}
          />
        ))}
      </div>
    </section>
  );
}

export default School;
