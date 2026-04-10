import "./index.css";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

// ─── Data ───────────────────────────────────────────────────────────────────

const features = [
  {
    icon: "🧠",
    title: "AI That Knows You",
    body: "SkillQuest's engine maps your strengths, gaps, and pace — then builds a learning path that's entirely yours. No cookie-cutter courses.",
    accent: "#7C6FE0",
  },
  {
    icon: "⚡",
    title: "Learn 3× Faster",
    body: "Spaced repetition, instant feedback, and bite-sized modules keep you in the flow state — the zone where real learning happens.",
    accent: "#E0936F",
  },
  {
    icon: "🎯",
    title: "Goal-First Design",
    body: "Tell SkillQuest where you want to go. It reverse-engineers the exact skills you need and the fastest route to get there.",
    accent: "#6FD4E0",
  },
  {
    icon: "🤝",
    title: "AI Mentor, 24/7",
    body: "Stuck at 2 AM? Your AI mentor never sleeps. Ask anything, get clear explanations, and keep your momentum going.",
    accent: "#A8E06F",
  },
  {
    icon: "📈",
    title: "Progress You Can See",
    body: "Live dashboards, streak tracking, and milestone badges make your growth visible — and make it impossible to stop.",
    accent: "#E06FA8",
  },
  {
    icon: "🌍",
    title: "Skills That Transfer",
    body: "Our curriculum is built with industry leaders. Every skill you earn on SkillQuest is a skill the real world values.",
    accent: "#E0D46F",
  },
];

const testimonials = [
  {
    quote:
      "SkillQuest felt like having a private tutor who knew exactly what I needed. I landed my first dev job in 4 months.",
    name: "Amara Osei",
    role: "Frontend Developer, Lagos",
    avatar: "AO",
    color: "#7C6FE0",
  },
  {
    quote:
      "I tried 6 other platforms. Nothing clicked until SkillQuest. The AI actually adapts — it's not just a fancy playlist.",
    name: "James Whitfield",
    role: "Product Manager, London",
    avatar: "JW",
    color: "#6FD4E0",
  },
  {
    quote:
      "Went from zero to shipping machine learning models in 3 months. The personalised path made all the difference.",
    name: "Priya Nair",
    role: "ML Engineer, Bangalore",
    avatar: "PN",
    color: "#E0936F",
  },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="mentor__hero">
      <div
        className="mentor__hero-glow mentor__hero-glow--1"
        aria-hidden="true"
      />
      <div
        className="mentor__hero-glow mentor__hero-glow--2"
        aria-hidden="true"
      />
      <div className="mentor__hero-grid" aria-hidden="true" />

      <div className="mentor__hero-inner">
        <span className="mentor__badge">AI-Powered Learning</span>
        <h1 className="mentor__hero-heading">
          The mentor you
          <br />
          <span className="mentor__hero-gradient">always deserved.</span>
        </h1>
        <p className="mentor__hero-sub">
          SkillQuest combines world-class content with an AI that studies
          <em> you</em> — your pace, your goals, your gaps. Then it builds the
          most direct path from where you are to where you want to be.
        </p>
        <div className="mentor__hero-actions">
          <Link className="mentor__btn mentor__btn--primary" to="/signup">
            Get started free
          </Link>

          <Link to="/discover" className="mentor__btn mentor__btn--ghost">
            See how it works →
          </Link>
        </div>

        {/* floating stat pills */}
        <div className="mentor__floating-pills" aria-hidden="true">
          <div className="mentor__pill mentor__pill--1">
            🔥 142 learners active now
          </div>
          <div className="mentor__pill mentor__pill--2">
            ✅ Sarah just completed Python Basics
          </div>
          <div className="mentor__pill mentor__pill--3">
            🚀 Kofi landed a job this week
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturesGrid() {
  return (
    <section className="mentor__features">
      <div className="mentor__section-label">Why SkillQuest</div>
      <h2 className="mentor__section-heading">
        Everything your learning
        <br />
        journey needs.
      </h2>
      <div className="mentor__features-grid">
        {features.map((f, i) => (
          <div
            className="mentor__feature-card"
            key={i}
            style={
              {
                "--card-accent": f.accent,
                animationDelay: `${i * 0.1}s`,
              } as React.CSSProperties
            }
          >
            <div className="mentor__feature-icon">{f.icon}</div>
            <h3 className="mentor__feature-title">{f.title}</h3>
            <p className="mentor__feature-body">{f.body}</p>
            <div className="mentor__feature-bar" />
          </div>
        ))}
      </div>
    </section>
  );
}

function PathVisual() {
  return (
    <section className="mentor__path">
      <div className="mentor__path-inner">
        <div className="mentor__path-copy">
          <div className="mentor__section-label">How it works</div>
          <h2 className="mentor__section-heading mentor__section-heading--left">
            Your path.
            <br />
            Uniquely yours.
          </h2>
          <p className="mentor__path-body">
            Most platforms give everyone the same course. SkillQuest does the
            opposite. It starts with your goal and works backwards — figuring
            out exactly what you need to learn, in exactly the right order.
          </p>
          <ul className="mentor__steps">
            {[
              [
                "01",
                "Tell us your goal",
                "Career change, promotion, or pure curiosity — we start there.",
              ],
              [
                "02",
                "AI builds your map",
                "A personalised curriculum, calibrated to your current level.",
              ],
              [
                "03",
                "Learn, adapt, grow",
                "As you progress, your path updates. Stuck? Your AI mentor helps instantly.",
              ],
              [
                "04",
                "Achieve & prove it",
                "Earn verified badges and a portfolio employers actually notice.",
              ],
            ].map(([num, title, desc]) => (
              <li className="mentor__step" key={num}>
                <span className="mentor__step-num">{num}</span>
                <div>
                  <strong className="mentor__step-title">{title}</strong>
                  <p className="mentor__step-desc">{desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* decorative UI mock */}
        <div className="mentor__mock" aria-hidden="true">
          <div className="mentor__mock-window">
            <div className="mentor__mock-bar">
              <span />
              <span />
              <span />
            </div>
            <div className="mentor__mock-content">
              <p className="mentor__mock-greeting">Good morning, Kofi 👋</p>
              <p className="mentor__mock-goal">Goal: Backend Developer</p>
              <div className="mentor__mock-progress-wrap">
                <div className="mentor__mock-progress-label">
                  <span>Python Fundamentals</span>
                  <span>78%</span>
                </div>
                <div className="mentor__mock-track">
                  <div className="mentor__mock-fill" style={{ width: "78%" }} />
                </div>
              </div>
              <div className="mentor__mock-progress-wrap">
                <div className="mentor__mock-progress-label">
                  <span>Data Structures</span>
                  <span>42%</span>
                </div>
                <div className="mentor__mock-track">
                  <div className="mentor__mock-fill" style={{ width: "42%" }} />
                </div>
              </div>
              <div className="mentor__mock-next">
                <p className="mentor__mock-next-label">Up next</p>
                <div className="mentor__mock-lesson">
                  <span>⚡</span>
                  <span>Recursion Deep Dive — 12 min</span>
                </div>
              </div>
              <div className="mentor__mock-streak">
                🔥 11-day streak — keep it going!
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="mentor__testimonials">
      <div className="mentor__section-label">Student Stories</div>
      <h2 className="mentor__section-heading">
        Real people.
        <br />
        Real results.
      </h2>
      <div className="mentor__testi-grid">
        {testimonials.map((t, i) => (
          <div className="mentor__testi-card" key={i}>
            <p className="mentor__testi-quote">"{t.quote}"</p>
            <div className="mentor__testi-author">
              <div
                className="mentor__testi-avatar"
                style={{ background: t.color + "30", color: t.color }}
              >
                {t.avatar}
              </div>
              <div>
                <p className="mentor__testi-name">{t.name}</p>
                <p className="mentor__testi-role">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CtaBanner() {
  return (
    <section className="mentor__cta-banner">
      <div className="mentor__cta-glow" aria-hidden="true" />
      <h2 className="mentor__cta-heading">
        Your future self
        <br />
        starts today.
      </h2>
      <p className="mentor__cta-sub">
        Join 50,000+ learners who chose a smarter way to grow.
        <br />
        Free to start. No credit card needed.
      </p>
      <Link
        to="/signup"
        className="mentor__btn mentor__btn--primary mentor__btn--lg"
      >
        Begin your journey →
      </Link>
    </section>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────

function Mentor() {
  // Intersection Observer for scroll-reveal animations
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("mentor__visible");
          }
        });
      },
      { threshold: 0.1 },
    );

    // Observe all elements with the reveal class
    const targets = sectionRef.current?.querySelectorAll(".mentor__reveal");
    targets?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="mentor__root" ref={sectionRef}>
      <HeroSection />
      <FeaturesGrid />
      <PathVisual />
      <Testimonials />
      <CtaBanner />
    </div>
  );
}

export default Mentor;
