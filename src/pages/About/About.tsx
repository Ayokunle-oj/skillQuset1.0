// ─────────────────────────────────────────────────────────────────────────────
// About.tsx — About page for Skill Quest
// An AI-powered adaptive learning platform
// ─────────────────────────────────────────────────────────────────────────────

import { useCallback, useEffect, useRef, useState } from "react";
import "./About.css";

// ─── Types ────────────────────────────────────────────────────────────────────

// Describes each feature card in the "What We Offer" section
interface Feature {
  icon: string;
  title: string;
  description: string;
}

// Describes each benefit card in the "How It Helps" section
interface Benefit {
  icon: string;
  title: string;
  description: string;
}

// Describes each differentiator in the "What Makes Us Different" section
interface Differentiator {
  icon: string;
  title: string;
  description: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const features: Feature[] = [
  {
    icon: "🤖",
    title: "AI-Powered Tutoring",
    description:
      "Your personal AI tutor is available 24/7 — it explains concepts in your own language, at your own pace. No judgment, infinite patience.",
  },
  {
    icon: "🗺️",
    title: "Personalized Learning Paths",
    description:
      "Skill Quest builds a unique curriculum just for you based on your goals, strengths, and gaps. No two journeys look the same.",
  },
  {
    icon: "📝",
    title: "Practice Tests & Quizzes",
    description:
      "Reinforce what you learn with targeted quizzes that adapt to your level. The more you practice, the sharper you get.",
  },
  {
    icon: "🤝",
    title: "Team Collaboration",
    description:
      "Study rooms, group challenges, and shared progress boards make learning a team sport. You're never alone on this quest.",
  },
];

const benefits: Benefit[] = [
  {
    icon: "⚡",
    title: "Learn Faster",
    description:
      "Adaptive lessons cut out the noise and focus on exactly what you need — so you absorb more in less time.",
  },
  {
    icon: "🔁",
    title: "Stay Consistent",
    description:
      "Daily streaks, reminders, and bite-sized lessons make it easy to show up every day without burnout.",
  },
  {
    icon: "📈",
    title: "Track Progress",
    description:
      "Visual dashboards show how far you've come. Watching your progress grow is its own kind of motivation.",
  },
  {
    icon: "💪",
    title: "Build Confidence",
    description:
      "Every quiz you pass and concept you master adds to your confidence. Skill Quest is built to make you feel capable.",
  },
];

const differentiators: Differentiator[] = [
  {
    icon: "🧠",
    title: "Adaptive AI",
    description:
      "Our AI doesn't just deliver content — it learns how YOU learn and adjusts in real time.",
  },
  {
    icon: "🌍",
    title: "Community Learning",
    description:
      "Join thousands of learners on the same quest. Share notes, compete on leaderboards, and grow together.",
  },
  {
    icon: "🎮",
    title: "Gamified Experience",
    description:
      "XP points, badges, streaks, and level-ups make studying feel like playing your favourite game.",
  },
  {
    icon: "🎯",
    title: "Built for Students",
    description:
      "Not just another content dump. Skill Quest is designed around how students actually think, fail, and succeed.",
  },
];

// ─── Custom Hook: Scroll Animation ────────────────────────────────────────────

// This hook watches an element and returns true when it enters the viewport.
// We use a CALLBACK REF (not useRef) so we never read .current during render,
// which is what caused the React ref warning.
function useInView(threshold = 0.15) {
  const [inView, setInView] = useState(false);

  // observerRef holds the IntersectionObserver instance so we can
  // disconnect it on cleanup — we never read this during render.
  const observerRef = useRef<IntersectionObserver | null>(null);

  // A callback ref is a plain function React calls with the DOM element
  // once it mounts, and with null when it unmounts.
  // This is the correct way to run side-effects tied to a DOM node.
  const ref = useCallback(
    (node: HTMLElement | null) => {
      // If a previous observer exists, clean it up first
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }

      // If the element has unmounted, nothing more to do
      if (!node) return;

      // Create a new observer for this element
      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setInView(true);
            // Once visible, stop observing — no need to re-trigger
            observerRef.current?.disconnect();
          }
        },
        { threshold }
      );

      observerRef.current.observe(node);
    },
    [threshold]
  );

  // Clean up when the component using this hook unmounts
  useEffect(() => {
    return () => observerRef.current?.disconnect();
  }, []);

  return { ref, inView };
}

// ─── Sub-components ───────────────────────────────────────────────────────────

// A single feature card used in "What We Offer"
function FeatureCard({ icon, title, description }: Feature) {
  return (
    <div className="sq-feature-card">
      <div className="sq-feature-icon">{icon}</div>
      <h3 className="sq-feature-title">{title}</h3>
      <p className="sq-feature-desc">{description}</p>
    </div>
  );
}

// A single benefit card used in "How It Helps"
function BenefitCard({ icon, title, description }: Benefit) {
  return (
    <div className="sq-benefit-card">
      <span className="sq-benefit-icon">{icon}</span>
      <div>
        <h3 className="sq-benefit-title">{title}</h3>
        <p className="sq-benefit-desc">{description}</p>
      </div>
    </div>
  );
}

// A single differentiator card used in "What Makes Us Different"
function DiffCard({ icon, title, description }: Differentiator) {
  return (
    <div className="sq-diff-card">
      <div className="sq-diff-icon">{icon}</div>
      <h3 className="sq-diff-title">{title}</h3>
      <p className="sq-diff-desc">{description}</p>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

function About() {
  // Each section gets its own scroll-watch so they animate independently
  const whySection = useInView();
  const offerSection = useInView();
  const benefitsSection = useInView();
  const diffSection = useInView();
  const ctaSection = useInView();

  return (
    <div className="sq-about">

      {/* ══════════════════════════════════════════════════════════════════
          HERO SECTION
          ══════════════════════════════════════════════════════════════════ */}
      <section className="sq-hero">

        {/* Decorative floating blobs in the background */}
        <div className="sq-hero-blob sq-hero-blob--1" aria-hidden="true" />
        <div className="sq-hero-blob sq-hero-blob--2" aria-hidden="true" />

        <div className="sq-hero-content">
          {/* Badge above the headline */}
          <span className="sq-hero-badge">✨ The future of learning is here</span>

          {/* Main headline */}
          <h1 className="sq-hero-headline">
            Level Up Your Learning <br />
            with <span className="sq-hero-brand">Skill Quest</span> 🚀
          </h1>

          {/* Tagline */}
          <p className="sq-hero-tagline">
            Stop grinding. Start growing. Your AI-powered learning companion
            that adapts to you, cheers you on, and helps you actually succeed.
          </p>

          {/* CTA button in hero */}
          <a href="#cta" className="sq-btn sq-btn--hero">
            Begin Your Quest →
          </a>
        </div>

        {/* ──────────────────────────────────────────────────────────────────
            HERO IMAGE GOES HERE
            Replace the placeholder below with your actual <img> tag, e.g:
            <img src="/images/hero.png" alt="Students learning on Skill Quest" className="sq-hero-image" />
        ─────────────────────────────────────────────────────────────────── */}
        <div className="sq-hero-image-placeholder" aria-hidden="true">
          <span className="sq-hero-image-label">📸 Hero Image Goes Here</span>
        </div>

      </section>


      {/* ══════════════════════════════════════════════════════════════════
          WHY SKILL QUEST — The problem students face
          ══════════════════════════════════════════════════════════════════ */}
      <section
        className={`sq-section sq-why ${whySection.inView ? "sq-visible" : ""}`}
        ref={whySection.ref}
      >
        <div className="sq-section-inner">
          <p className="sq-section-label">The honest truth 💬</p>
          <h2 className="sq-section-title">Sound familiar?</h2>

          <p className="sq-why-lead">
            You open your notes with the best intentions. But then — confusion
            sets in. You're not sure where to start. One topic leads to another
            rabbit hole. Hours pass and nothing sticks. You feel behind, burnt
            out, and honestly a bit lost.
          </p>

          <div className="sq-why-cards">
            <div className="sq-why-card">
              <span>😵‍💫</span>
              <p>Too much content, not enough clarity</p>
            </div>
            <div className="sq-why-card">
              <span>📅</span>
              <p>Hard to stay consistent when life gets busy</p>
            </div>
            <div className="sq-why-card">
              <span>😴</span>
              <p>Boring materials that kill your motivation</p>
            </div>
            <div className="sq-why-card">
              <span>🤷</span>
              <p>No idea if you're actually making progress</p>
            </div>
          </div>

          <p className="sq-why-close">
            You're not the problem. The tools you've been given just weren't
            built for the way you actually learn. <strong>Skill Quest was.</strong>
          </p>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════════════════
          WHAT WE OFFER — Core features
          ══════════════════════════════════════════════════════════════════ */}
      <section
        className={`sq-section sq-offer ${offerSection.inView ? "sq-visible" : ""}`}
        ref={offerSection.ref}
      >
        <div className="sq-section-inner">
          <p className="sq-section-label">What's inside 🎒</p>
          <h2 className="sq-section-title">Everything you need to thrive</h2>
          <p className="sq-section-subtitle">
            Skill Quest bundles everything a student needs into one smart,
            seamless experience.
          </p>

          <div className="sq-features-grid">
            {features.map((f) => (
              <FeatureCard key={f.title} {...f} />
            ))}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════════════════
          HOW IT HELPS — Clear benefits
          ══════════════════════════════════════════════════════════════════ */}
      <section
        className={`sq-section sq-benefits ${benefitsSection.inView ? "sq-visible" : ""}`}
        ref={benefitsSection.ref}
      >
        <div className="sq-section-inner sq-benefits-inner">
          <div className="sq-benefits-text">
            <p className="sq-section-label">The real difference 📊</p>
            <h2 className="sq-section-title">How Skill Quest changes the game</h2>
            <p className="sq-section-subtitle">
              It's not just about learning more — it's about becoming the kind
              of learner who keeps going, keeps growing, and never gives up.
            </p>
          </div>

          <div className="sq-benefits-list">
            {benefits.map((b, i) => (
              /* Each card gets a slight delay so they stagger in */
              <div
                key={b.title}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <BenefitCard {...b} />
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════════════════
          WHAT MAKES US DIFFERENT — Unique selling points
          ══════════════════════════════════════════════════════════════════ */}
      <section
        className={`sq-section sq-diff ${diffSection.inView ? "sq-visible" : ""}`}
        ref={diffSection.ref}
      >
        <div className="sq-section-inner">
          <p className="sq-section-label">Our secret sauce 🧪</p>
          <h2 className="sq-section-title">Not just another learning app</h2>
          <p className="sq-section-subtitle">
            There are a lot of platforms out there. Here's why students choose
            Skill Quest — and actually stick with it.
          </p>

          <div className="sq-diff-grid">
            {differentiators.map((d, i) => (
              <div
                key={d.title}
                style={{ animationDelay: `${i * 0.12}s` }}
              >
                <DiffCard {...d} />
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════════════════
          FUN / STATS STRIP — Engaging animated numbers
          ══════════════════════════════════════════════════════════════════ */}
      <section className="sq-stats-strip">
        <div className="sq-stat">
          <span className="sq-stat-number">50K+</span>
          <span className="sq-stat-label">Active Learners</span>
        </div>
        <div className="sq-stat-divider" aria-hidden="true" />
        <div className="sq-stat">
          <span className="sq-stat-number">200+</span>
          <span className="sq-stat-label">Learning Paths</span>
        </div>
        <div className="sq-stat-divider" aria-hidden="true" />
        <div className="sq-stat">
          <span className="sq-stat-number">98%</span>
          <span className="sq-stat-label">Say they improved</span>
        </div>
        <div className="sq-stat-divider" aria-hidden="true" />
        <div className="sq-stat">
          <span className="sq-stat-number">4.9⭐</span>
          <span className="sq-stat-label">Average Rating</span>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════════════════
          CALL TO ACTION — Final push
          ══════════════════════════════════════════════════════════════════ */}
      <section
        id="cta"
        className={`sq-section sq-cta ${ctaSection.inView ? "sq-visible" : ""}`}
        ref={ctaSection.ref}
      >
        {/* Decorative blobs */}
        <div className="sq-cta-blob sq-cta-blob--1" aria-hidden="true" />
        <div className="sq-cta-blob sq-cta-blob--2" aria-hidden="true" />

        <div className="sq-cta-content">
          <span className="sq-cta-emoji">✨</span>
          <h2 className="sq-cta-title">Start Your Journey Today</h2>
          <p className="sq-cta-sub">
            Thousands of students are already levelling up. Your quest starts
            with one click — no credit card, no confusion, no excuses.
          </p>
          <button className="sq-btn sq-btn--cta">
            Get Started — It's Free 🚀
          </button>
          <p className="sq-cta-note">Join 50,000+ learners. Free forever plan available.</p>
        </div>
      </section>

    </div>
  );
}

export default About;
