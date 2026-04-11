import { useState } from "react";
import "./Footer.css";

// ─────────────────────────────────────────────
//  TYPES
// ─────────────────────────────────────────────

interface ContactFormData {
  name: string;
  subject: string;
  message: string;
}

interface FormStatus {
  type: "idle" | "loading" | "success" | "error";
  message: string;
}

// ─────────────────────────────────────────────
//  SVG ICONS  (inline — no extra dependencies)
// ─────────────────────────────────────────────

const InstagramIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.121.554 4.11 1.523 5.834L.057 23.887a.5.5 0 0 0 .606.61l6.213-1.63A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.808 9.808 0 0 1-5.034-1.384l-.36-.214-3.733.979.998-3.648-.235-.374A9.775 9.775 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
  </svg>
);

const TwitterXIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.31 6.31 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.79 1.53V6.75a4.85 4.85 0 0 1-1.02-.06z" />
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

// ─────────────────────────────────────────────
//  SOCIAL LINKS CONFIG
//  👉 Replace the href values with your real URLs
// ─────────────────────────────────────────────

const SOCIAL_LINKS = [
  {
    name: "Instagram",
    href: "https://instagram.com/YOUR_HANDLE", // 🔗 Replace with your Instagram URL
    icon: <InstagramIcon />,
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/YOUR_PHONE_NUMBER", // 🔗 Replace with your WhatsApp number link
    icon: <WhatsAppIcon />,
  },
  {
    name: "Twitter / X",
    href: "https://twitter.com/YOUR_HANDLE", // 🔗 Replace with your Twitter/X URL
    icon: <TwitterXIcon />,
  },
  {
    name: "TikTok",
    href: "https://tiktok.com/@YOUR_HANDLE", // 🔗 Replace with your TikTok URL
    icon: <TikTokIcon />,
  },
  {
    name: "Facebook",
    href: "https://facebook.com/YOUR_PAGE", // 🔗 Replace with your Facebook page URL
    icon: <FacebookIcon />,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/company/YOUR_PAGE", // 🔗 Replace with your LinkedIn URL
    icon: <LinkedInIcon />,
  },
];

// ─────────────────────────────────────────────
//  NAV LINKS CONFIG
//  👉 Replace the href values with your real routes
// ─────────────────────────────────────────────

const NAV_LINKS = [
  { label: "About", href: "/about" },
  { label: "Courses", href: "/discover" },
  { label: "Blog / What's New", href: "/whats-new" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

// ─────────────────────────────────────────────
//  FOOTER COMPONENT
// ─────────────────────────────────────────────

const Footer = () => {
  // Form field state
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    subject: "",
    message: "",
  });

  // Tracks submission status: idle | loading | success | error
  const [formStatus, setFormStatus] = useState<FormStatus>({
    type: "idle",
    message: "",
  });

  // ── Handle input changes ──────────────────────
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ── Handle form submission ────────────────────
  // 🔧 BACKEND CONNECTION POINT:
  //    Replace the simulated fetch below with your real API call.
  //    Example with EmailJS:
  //      import emailjs from "@emailjs/browser";
  //      await emailjs.send("SERVICE_ID", "TEMPLATE_ID", formData, "PUBLIC_KEY");
  //
  //    Example with a custom backend:
  //      await fetch("/api/contact", { method: "POST", body: JSON.stringify(formData) });
  //
  //    The data to send to skillquest11@gmail.com:
  //      formData.name    → sender's name
  //      formData.subject → email subject/title
  //      formData.message → email body

  const handleSubmit = async () => {
    // ── Basic validation ──
    if (!formData.name.trim()) {
      setFormStatus({ type: "error", message: "Please enter your name." });
      return;
    }
    if (!formData.subject.trim()) {
      setFormStatus({ type: "error", message: "Please enter a subject." });
      return;
    }
    if (!formData.message.trim()) {
      setFormStatus({ type: "error", message: "Please enter a message." });
      return;
    }

    setFormStatus({ type: "loading", message: "Sending your message…" });

    try {
      // ⬇⬇⬇ REPLACE THIS BLOCK WITH YOUR REAL API CALL ⬇⬇⬇
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulated delay
      // ⬆⬆⬆ REPLACE THIS BLOCK WITH YOUR REAL API CALL ⬆⬆⬆

      setFormStatus({
        type: "success",
        message: "Message sent! We'll get back to you soon. 🎉",
      });

      // Clear the form after success
      setFormData({ name: "", subject: "", message: "" });
    } catch {
      setFormStatus({
        type: "error",
        message: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <footer className="footer">
      {/* ── Decorative top accent line ── */}
      <div className="footer-accent-bar" />

      <div className="footer-inner">
        {/* ══════════════════════════════════
            TOP SECTION: Brand + Nav + Social
        ══════════════════════════════════ */}
        <div className="footer-top">
          {/* Brand column */}
          <div className="footer-brand">
            <span className="footer-logo">
              Skill<span className="footer-logo-accent">Quest</span>
            </span>
            <p className="footer-tagline">
              Learn smarter. Level up faster. Your journey starts here.
            </p>

            {/* Social icons */}
            <div className="footer-socials">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-icon"
                  aria-label={social.name}
                  title={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Nav links column */}
          <nav className="footer-nav" aria-label="Footer navigation">
            <p className="footer-nav-title">Quick Links</p>
            <ul className="footer-nav-list">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="footer-nav-link">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact form column */}
          <div className="footer-contact">
            <p className="footer-contact-title">Send us a message</p>
            <p className="footer-contact-sub">
              We read every message at{" "}
              <span className="footer-email">skillquest11@gmail.com</span>
            </p>

            {/* Name field */}
            <div className="footer-field">
              <label htmlFor="footer-name" className="footer-label">
                Your Name
              </label>
              <input
                id="footer-name"
                name="name"
                type="text"
                className="footer-input"
                placeholder="e.g. John Doe"
                value={formData.name}
                onChange={handleChange}
                maxLength={80}
                autoComplete="name"
              />
            </div>

            {/* Subject field */}
            <div className="footer-field">
              <label htmlFor="footer-subject" className="footer-label">
                Subject
              </label>
              <input
                id="footer-subject"
                name="subject"
                type="text"
                className="footer-input"
                placeholder="What's this about?"
                value={formData.subject}
                onChange={handleChange}
                maxLength={120}
              />
            </div>

            {/* Message field */}
            <div className="footer-field">
              <label htmlFor="footer-message" className="footer-label">
                Message
              </label>
              <textarea
                id="footer-message"
                name="message"
                className="footer-textarea"
                placeholder="Type your message here…"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                maxLength={1000}
              />
            </div>

            {/* Status message (error / success) */}
            {formStatus.type !== "idle" && formStatus.type !== "loading" && (
              <p
                className={`footer-status ${
                  formStatus.type === "success"
                    ? "footer-status--success"
                    : "footer-status--error"
                }`}
              >
                {formStatus.message}
              </p>
            )}

            {/* Submit button */}
            <button
              className="footer-submit-btn"
              onClick={handleSubmit}
              disabled={formStatus.type === "loading"}
            >
              {formStatus.type === "loading" ? "Sending…" : "Send Message"}
            </button>
          </div>
        </div>

        {/* ══════════════════════════════════
            BOTTOM BAR: Copyright
        ══════════════════════════════════ */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {new Date().getFullYear()} SkillQuest. All rights reserved.
          </p>
          <p className="footer-made-with">
            Built for learners, by learners. 🚀
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
