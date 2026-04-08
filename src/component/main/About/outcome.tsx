import "./index.css";

const stats = [
  { value: "90%", label: "of students achieved their learning goal" },
  { value: "3×", label: "faster skill acquisition with AI guidance" },
  { value: "50K+", label: "learners transformed worldwide" },
];

function Outcome() {
  return (
    <section className="outcome__section">
      {/* background decorative blobs */}
      <div className="outcome__blob outcome__blob--1" aria-hidden="true" />
      <div className="outcome__blob outcome__blob--2" aria-hidden="true" />

      <div className="outcome__inner">
        {/* Left: headline + body */}
        <div className="outcome__copy">
          <span className="outcome__eyebrow">Real Results</span>
          <h2 className="outcome__heading">
            It's about outcomes,
            <br />
            <em>not optics.</em>
          </h2>
          <p className="outcome__body">
            Whether you're chasing a new career, building a startup, or just
            hungry to grow — SkillQuest students don't just learn. They
            transform. Our AI adapts to you, not the other way around.
          </p>
          <a href="/signup" className="outcome__cta">
            Start your journey
            <span className="outcome__cta-arrow">→</span>
          </a>
        </div>

        {/* Right: stat cards */}
        <div className="outcome__stats">
          {stats.map((s, i) => (
            <div
              className="outcome__stat-card"
              key={i}
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <span className="outcome__stat-value">{s.value}</span>
              <span className="outcome__stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Outcome;
