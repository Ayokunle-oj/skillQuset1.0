import { useEffect, useRef, useState } from "react";
import "./index.css";
import SchoolSub from "./SchoolSub";

const UNIVERSITIES = [
  { name: "Bowen University", link: "/university/bowen-university", logo: "" },
  { name: "Nile University", link: "/university/nile-university", logo: "" },
  {
    name: "Bingham University",
    link: "/university/bingham-university",
    logo: "",
  },
  {
    name: "Pan-Atlantic University",
    link: "/university/pan-atlantic-university",
    logo: "",
  },
  {
    name: "Covenant University",
    link: "/university/covenant-university",
    logo: "",
  },
  {
    name: "Landmark University",
    link: "/university/landmark-university",
    logo: "",
  },
  {
    name: "Redeemer's University",
    link: "/university/redeemers-university",
    logo: "",
  },
  {
    name: "Afe Babalola University",
    link: "/university/afe-babalola-university",
    logo: "",
  },
  {
    name: "Babcock University",
    link: "/university/babcock-university",
    logo: "",
  },
];

function School() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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
      <h2>Schools built for every ambition</h2>
      <p>
        Browse programs by school to discover what you want to learn — from AI
        to Cybersecurity and beyond.
      </p>

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
