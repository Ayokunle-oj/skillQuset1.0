import { useState, useEffect } from "react";
import "./PrivacyPolicy.css";

// ── Types ──────────────────────────────────────────────────────────────────
interface Section {
  id: string;
  title: string;
  content: React.ReactNode;
}

// ── Data ───────────────────────────────────────────────────────────────────
const LAST_UPDATED = "April 11, 2026";
const COMPANY_NAME = "SkillQuest Ltd";
const PLATFORM_NAME = "SkillQuest";
const CONTACT_EMAIL = "privacy@skillquest.io";
const WEBSITE = "https://skillquest.io";

const sections: Section[] = [
  {
    id: "introduction",
    title: "1. Introduction",
    content: (
      <>
        <p>
          Welcome to <strong>{PLATFORM_NAME}</strong>, operated by{" "}
          <strong>{COMPANY_NAME}</strong> ("we", "us", "our"). We are committed
          to protecting your personal information and your right to privacy.
        </p>
        <p>
          This Privacy Policy explains how we collect, use, disclose, and
          safeguard your information when you use our platform — including our
          website, web application, mobile application, AI-powered features,
          university lecture content, courses, textbooks, and all related
          services (collectively, the "Service").
        </p>
        <p>
          By accessing or using {PLATFORM_NAME}, you agree to the terms of this
          Privacy Policy. If you do not agree, please discontinue use of the
          Service immediately.
        </p>
        <div className="pp-notice-box">
          <span className="pp-notice-icon">⚠</span>
          <p>
            <strong>Please read this policy carefully.</strong> It contains
            important information about your legal rights, including how to
            access, correct, or delete your data, and how we handle data for
            users under the age of 18.
          </p>
        </div>
      </>
    ),
  },
  {
    id: "who-we-are",
    title: "2. Who We Are",
    content: (
      <>
        <p>
          {COMPANY_NAME} is the data controller responsible for your personal
          data collected through the {PLATFORM_NAME} platform.
        </p>
        <table className="pp-table">
          <tbody>
            <tr>
              <td><strong>Company</strong></td>
              <td>{COMPANY_NAME}</td>
            </tr>
            <tr>
              <td><strong>Platform</strong></td>
              <td>{PLATFORM_NAME}</td>
            </tr>
            <tr>
              <td><strong>Website</strong></td>
              <td><a href={WEBSITE} target="_blank" rel="noreferrer">{WEBSITE}</a></td>
            </tr>
            <tr>
              <td><strong>Privacy Contact</strong></td>
              <td><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></td>
            </tr>
          </tbody>
        </table>
      </>
    ),
  },
  {
    id: "age-requirements",
    title: "3. Age Requirements & Children's Privacy",
    content: (
      <>
        <div className="pp-alert-box">
          <strong>Minimum Age:</strong> {PLATFORM_NAME} is intended for users
          aged <strong>13 years and older</strong>. We do not knowingly collect
          personal data from children under 13.
        </div>
        <p>
          If you are between the ages of 13 and 17, you must have verifiable
          parental or guardian consent before using {PLATFORM_NAME}. By
          registering, you represent that either (a) you are at least 18 years
          of age, or (b) you are at least 13 and have obtained parental consent.
        </p>
        <p>
          If we discover that we have inadvertently collected personal
          information from a child under 13 without verifiable parental consent,
          we will delete that information as quickly as reasonably possible.
          Parents or guardians who believe their child has provided us data
          without consent should contact us immediately at{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
        <p>
          We comply with applicable children's privacy laws, including the{" "}
          <strong>
            Children's Online Privacy Protection Act (COPPA)
          </strong>{" "}
          and equivalent regulations in other jurisdictions.
        </p>
      </>
    ),
  },
  {
    id: "data-we-collect",
    title: "4. Information We Collect",
    content: (
      <>
        <p>We collect information in the following categories:</p>

        <h4 className="pp-sub-heading">4.1 Information You Provide Directly</h4>
        <ul className="pp-list">
          <li><strong>Account Registration:</strong> Full name, email address, password (hashed), date of birth, and profile photo (optional).</li>
          <li><strong>Profile Information:</strong> Educational level, learning goals, preferred subjects, and biography.</li>
          <li><strong>Payment Information:</strong> Billing name, address, and payment method details. Card numbers are processed by our PCI-DSS compliant payment processors and are never stored on our servers.</li>
          <li><strong>Communications:</strong> Messages sent to our support team, feedback submissions, survey responses, and community posts.</li>
          <li><strong>AI Interactions:</strong> Prompts, queries, and responses generated through our AI-powered tutoring and content features.</li>
          <li><strong>User-Generated Content:</strong> Notes, annotations, quiz answers, forum posts, and course reviews.</li>
        </ul>

        <h4 className="pp-sub-heading">4.2 Information Collected Automatically</h4>
        <ul className="pp-list">
          <li><strong>Usage Data:</strong> Pages visited, courses accessed, time spent on content, feature interactions, search queries, and click patterns.</li>
          <li><strong>Learning Progress Data:</strong> Courses enrolled, modules completed, quiz scores, assignment submissions, certificates earned, and study streaks.</li>
          <li><strong>Device & Technical Data:</strong> IP address, browser type and version, operating system, device identifiers, screen resolution, and timezone.</li>
          <li><strong>Log Data:</strong> Server logs including request timestamps, error logs, and access logs.</li>
          <li><strong>Cookies & Tracking Technologies:</strong> Session cookies, persistent cookies, local storage tokens, and web beacons. See Section 9 for full details.</li>
        </ul>

        <h4 className="pp-sub-heading">4.3 Information From Third Parties</h4>
        <ul className="pp-list">
          <li><strong>Social Login Providers:</strong> If you sign in via Google, GitHub, or other OAuth providers, we receive your name, email, and profile picture as permitted by that provider.</li>
          <li><strong>Payment Processors:</strong> Transaction confirmation, payment status, and billing address from our payment partners.</li>
          <li><strong>Analytics Partners:</strong> Aggregated and anonymized behavioral data to help us understand platform usage trends.</li>
        </ul>
      </>
    ),
  },
  {
    id: "how-we-use",
    title: "5. How We Use Your Information",
    content: (
      <>
        <p>We use your information for the following purposes:</p>
        <ul className="pp-list">
          <li><strong>Providing the Service:</strong> Creating and managing your account, delivering course content, processing payments, and enabling AI-powered features.</li>
          <li><strong>Personalisation:</strong> Tailoring course recommendations, learning paths, and AI tutor responses based on your progress and preferences.</li>
          <li><strong>Communication:</strong> Sending transactional emails (receipts, password resets), platform notifications, and — with your consent — marketing communications.</li>
          <li><strong>Analytics & Improvement:</strong> Understanding how users interact with the platform to improve features, fix bugs, and develop new content.</li>
          <li><strong>AI Model Improvement:</strong> Anonymised and aggregated AI interaction data may be used to improve our AI tutoring models. We will never use personally identifiable AI interactions to train models without your explicit opt-in consent.</li>
          <li><strong>Security & Fraud Prevention:</strong> Monitoring for suspicious activity, enforcing our Terms of Service, and protecting the integrity of the platform.</li>
          <li><strong>Legal Compliance:</strong> Complying with applicable laws, responding to lawful legal requests, and enforcing our agreements.</li>
          <li><strong>Payment Processing:</strong> Verifying payment details, issuing refunds, and managing subscription billing.</li>
          <li><strong>Research & Development:</strong> Conducting internal research using de-identified data to improve educational outcomes.</li>
        </ul>

        <div className="pp-notice-box">
          <span className="pp-notice-icon">ℹ</span>
          <p>
            We will only use your information for the purpose it was collected.
            If we need to use it for a materially different purpose, we will
            notify you and, where required by law, obtain your consent.
          </p>
        </div>
      </>
    ),
  },
  {
    id: "legal-basis",
    title: "6. Legal Basis for Processing (GDPR & UK GDPR)",
    content: (
      <>
        <p>
          If you are located in the European Economic Area (EEA) or United
          Kingdom, our legal bases for processing your personal data are:
        </p>
        <table className="pp-table">
          <thead>
            <tr>
              <th>Processing Activity</th>
              <th>Legal Basis</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Account creation & service delivery</td>
              <td>Contractual necessity</td>
            </tr>
            <tr>
              <td>Payment processing</td>
              <td>Contractual necessity</td>
            </tr>
            <tr>
              <td>Marketing emails</td>
              <td>Consent</td>
            </tr>
            <tr>
              <td>Platform analytics & improvement</td>
              <td>Legitimate interests</td>
            </tr>
            <tr>
              <td>Security monitoring & fraud prevention</td>
              <td>Legitimate interests</td>
            </tr>
            <tr>
              <td>Legal compliance</td>
              <td>Legal obligation</td>
            </tr>
            <tr>
              <td>AI interaction data (personalisation)</td>
              <td>Contractual necessity / Legitimate interests</td>
            </tr>
          </tbody>
        </table>
        <p>
          Where we rely on <strong>legitimate interests</strong>, we have
          balanced those interests against your rights and concluded that our
          legitimate interests are not overridden by your privacy interests.
        </p>
      </>
    ),
  },
  {
    id: "data-sharing",
    title: "7. How We Share Your Information",
    content: (
      <>
        <p>
          {COMPANY_NAME} does <strong>not sell</strong> your personal data to
          third parties. We may share your information only in the following
          circumstances:
        </p>

        <h4 className="pp-sub-heading">7.1 Service Providers (Processors)</h4>
        <p>
          We engage trusted third-party companies to perform services on our
          behalf. These processors are contractually bound to use your data only
          as instructed and to maintain appropriate security standards.
          Categories of processors include:
        </p>
        <ul className="pp-list">
          <li><strong>Cloud Hosting & Infrastructure:</strong> Vercel (deployment), cloud database providers.</li>
          <li><strong>Payment Processing:</strong> PCI-DSS compliant payment gateways (e.g., Stripe or equivalent).</li>
          <li><strong>Email Delivery:</strong> Transactional email service providers.</li>
          <li><strong>Analytics:</strong> Privacy-respecting analytics platforms.</li>
          <li><strong>AI Services:</strong> AI model APIs used to power tutoring and content features.</li>
          <li><strong>Customer Support:</strong> Help desk software providers.</li>
        </ul>

        <h4 className="pp-sub-heading">7.2 Business Transfers</h4>
        <p>
          In the event of a merger, acquisition, restructuring, or sale of
          assets, your personal data may be transferred as part of that
          transaction. We will notify you via email or prominent notice on our
          platform before your data is transferred and becomes subject to a
          different privacy policy.
        </p>

        <h4 className="pp-sub-heading">7.3 Legal Requirements</h4>
        <p>
          We may disclose your information if required to do so by law, court
          order, or governmental authority, or if we believe in good faith that
          such disclosure is necessary to protect the rights, property, or
          safety of {COMPANY_NAME}, our users, or the public.
        </p>

        <h4 className="pp-sub-heading">7.4 With Your Consent</h4>
        <p>
          We may share your information with third parties when you have
          provided explicit consent to do so.
        </p>

        <div className="pp-alert-box">
          <strong>We never sell your data.</strong> {COMPANY_NAME} does not
          sell, rent, or trade your personal information to any third party for
          their own marketing purposes.
        </div>
      </>
    ),
  },
  {
    id: "data-retention",
    title: "8. Data Retention",
    content: (
      <>
        <p>
          We retain your personal data only for as long as necessary to fulfil
          the purposes outlined in this policy, unless a longer retention period
          is required or permitted by law.
        </p>
        <table className="pp-table">
          <thead>
            <tr>
              <th>Data Type</th>
              <th>Retention Period</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Account data (active users)</td>
              <td>Duration of account + 90 days after deletion request</td>
            </tr>
            <tr>
              <td>Learning progress & history</td>
              <td>Duration of account</td>
            </tr>
            <tr>
              <td>Payment & billing records</td>
              <td>7 years (legal/tax compliance)</td>
            </tr>
            <tr>
              <td>Support communications</td>
              <td>3 years from last interaction</td>
            </tr>
            <tr>
              <td>Server & security logs</td>
              <td>12 months</td>
            </tr>
            <tr>
              <td>Anonymised analytics</td>
              <td>Indefinitely (no personal identifiers)</td>
            </tr>
            <tr>
              <td>Marketing consent records</td>
              <td>Until consent is withdrawn + 3 years</td>
            </tr>
          </tbody>
        </table>
        <p>
          When data is no longer required, we securely delete or anonymise it in
          accordance with our data destruction policy.
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    title: "9. Cookies & Tracking Technologies",
    content: (
      <>
        <p>
          We use cookies and similar technologies to operate and improve the
          Service. Cookies are small text files stored on your device.
        </p>

        <h4 className="pp-sub-heading">Types of Cookies We Use</h4>
        <table className="pp-table">
          <thead>
            <tr>
              <th>Cookie Type</th>
              <th>Purpose</th>
              <th>Required?</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Strictly Necessary</strong></td>
              <td>Authentication, session management, security tokens</td>
              <td>Yes</td>
            </tr>
            <tr>
              <td><strong>Functional</strong></td>
              <td>Remembering preferences, language, UI settings</td>
              <td>No</td>
            </tr>
            <tr>
              <td><strong>Analytics</strong></td>
              <td>Understanding usage patterns and improving the platform</td>
              <td>No</td>
            </tr>
            <tr>
              <td><strong>Marketing</strong></td>
              <td>Displaying relevant content and measuring campaign effectiveness</td>
              <td>No</td>
            </tr>
          </tbody>
        </table>

        <p>
          You can manage cookie preferences through your browser settings or our
          in-app cookie preferences centre. Note that disabling strictly
          necessary cookies may prevent the Service from functioning correctly.
        </p>
        <p>
          We use <strong>local storage</strong> tokens (not cookies) for
          authentication session persistence. These are cleared when you log out
          or delete your account.
        </p>
      </>
    ),
  },
  {
    id: "security",
    title: "10. Data Security",
    content: (
      <>
        <p>
          We take the security of your personal data seriously and implement
          industry-standard technical and organisational measures to protect it
          against unauthorised access, alteration, disclosure, or destruction.
          Our security measures include:
        </p>
        <ul className="pp-list">
          <li><strong>Encryption in Transit:</strong> All data transmitted between your device and our servers is encrypted using TLS 1.2 or higher (HTTPS).</li>
          <li><strong>Encryption at Rest:</strong> Sensitive data stored in our databases is encrypted at rest using AES-256 encryption.</li>
          <li><strong>Password Hashing:</strong> User passwords are never stored in plain text. We use strong one-way hashing algorithms (bcrypt or equivalent).</li>
          <li><strong>Access Controls:</strong> Access to personal data is restricted to authorised personnel on a strict need-to-know basis. All access is logged and audited.</li>
          <li><strong>Regular Security Audits:</strong> We conduct regular vulnerability assessments and penetration testing.</li>
          <li><strong>Secure Payment Processing:</strong> Payment data is handled exclusively by PCI-DSS certified processors. We do not store raw card details on our systems.</li>
          <li><strong>Incident Response:</strong> We maintain a formal data breach response plan. In the event of a breach affecting your rights, we will notify you and relevant authorities as required by law, within 72 hours where required.</li>
        </ul>
        <div className="pp-notice-box">
          <span className="pp-notice-icon">⚠</span>
          <p>
            No method of transmission over the internet or electronic storage is
            100% secure. While we strive to use commercially acceptable means to
            protect your data, we cannot guarantee absolute security. You use
            the Service at your own risk.
          </p>
        </div>
      </>
    ),
  },
  {
    id: "your-rights",
    title: "11. Your Privacy Rights",
    content: (
      <>
        <p>
          Depending on your location, you may have the following rights
          regarding your personal data:
        </p>
        <table className="pp-table">
          <thead>
            <tr>
              <th>Right</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Access</strong></td>
              <td>Request a copy of the personal data we hold about you.</td>
            </tr>
            <tr>
              <td><strong>Correction</strong></td>
              <td>Request correction of inaccurate or incomplete data.</td>
            </tr>
            <tr>
              <td><strong>Deletion</strong></td>
              <td>Request deletion of your personal data ("right to be forgotten"), subject to legal retention obligations.</td>
            </tr>
            <tr>
              <td><strong>Portability</strong></td>
              <td>Request your data in a structured, machine-readable format.</td>
            </tr>
            <tr>
              <td><strong>Restriction</strong></td>
              <td>Request restriction of processing in certain circumstances.</td>
            </tr>
            <tr>
              <td><strong>Objection</strong></td>
              <td>Object to processing based on legitimate interests or for direct marketing.</td>
            </tr>
            <tr>
              <td><strong>Withdraw Consent</strong></td>
              <td>Withdraw consent at any time where processing is based on consent (e.g., marketing emails).</td>
            </tr>
            <tr>
              <td><strong>Lodge a Complaint</strong></td>
              <td>File a complaint with your local data protection authority.</td>
            </tr>
          </tbody>
        </table>
        <p>
          To exercise any of these rights, contact us at{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. We will
          respond within <strong>30 days</strong>. We may need to verify your
          identity before processing your request.
        </p>
      </>
    ),
  },
  {
    id: "international-transfers",
    title: "12. International Data Transfers",
    content: (
      <>
        <p>
          {COMPANY_NAME} operates globally. Your personal data may be
          transferred to and processed in countries outside of your country of
          residence, including countries that may not have the same level of
          data protection laws as your home country.
        </p>
        <p>
          Where we transfer data outside the EEA or UK, we ensure appropriate
          safeguards are in place, including:
        </p>
        <ul className="pp-list">
          <li>Standard Contractual Clauses (SCCs) approved by the European Commission.</li>
          <li>Adequacy decisions issued by relevant data protection authorities.</li>
          <li>Binding Corporate Rules where applicable.</li>
        </ul>
      </>
    ),
  },
  {
    id: "payments",
    title: "13. Payment Data & Billing",
    content: (
      <>
        <p>
          {PLATFORM_NAME} offers paid subscription plans. When you purchase a
          subscription or make a payment:
        </p>
        <ul className="pp-list">
          <li>Payment card details are collected and processed directly by our PCI-DSS certified payment processor. We do not store, transmit, or have access to full card numbers, CVVs, or PINs.</li>
          <li>We store a tokenised reference provided by the payment processor to facilitate future billing and refunds.</li>
          <li>Billing name, email, and address are stored by us for invoicing, tax, and legal compliance purposes.</li>
          <li>Transaction records are retained for a minimum of 7 years to comply with applicable tax and financial regulations.</li>
          <li>Refund requests are processed in accordance with our Refund Policy. Contact us at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> for billing disputes.</li>
        </ul>
        <div className="pp-alert-box">
          <strong>Subscription Renewals:</strong> Paid plans auto-renew unless
          cancelled before the renewal date. We will send a reminder email
          before any annual renewal. You can manage or cancel your subscription
          from your account settings at any time.
        </div>
      </>
    ),
  },
  {
    id: "ai-features",
    title: "14. AI-Powered Features",
    content: (
      <>
        <p>
          {PLATFORM_NAME} uses artificial intelligence to power tutoring,
          content recommendations, quiz generation, and other learning features.
          The following applies to AI interactions on our platform:
        </p>
        <ul className="pp-list">
          <li><strong>Data Use:</strong> Your AI interaction data (prompts and responses) is used to deliver personalised learning experiences. It may also be used in anonymised, aggregated form to improve our AI systems.</li>
          <li><strong>No Personally Identifiable Training:</strong> We will not use your personally identifiable AI interactions to train machine learning models without your explicit opt-in consent.</li>
          <li><strong>Third-Party AI APIs:</strong> We may use third-party AI APIs (such as large language model providers) to power some features. These providers are bound by data processing agreements and are prohibited from using your data for their own model training.</li>
          <li><strong>AI Limitations:</strong> AI-generated content on {PLATFORM_NAME} is for educational assistance only. It may not always be accurate. We are not liable for decisions made based solely on AI-generated content.</li>
          <li><strong>Human Review:</strong> Certain AI-flagged interactions (e.g., policy violations or safety concerns) may be reviewed by authorised human staff.</li>
        </ul>
      </>
    ),
  },
  {
    id: "third-party-links",
    title: "15. Third-Party Links & Integrations",
    content: (
      <>
        <p>
          Our Service may contain links to third-party websites, embedded
          content, or integrations (such as YouTube videos, external reading
          materials, or university resources). This Privacy Policy does not
          apply to those third-party services.
        </p>
        <p>
          We are not responsible for the privacy practices or content of
          third-party services. We encourage you to review the privacy policies
          of any third-party services you access through {PLATFORM_NAME}.
        </p>
      </>
    ),
  },
  {
    id: "do-not-sell",
    title: "16. Do Not Sell or Share My Personal Information (CCPA)",
    content: (
      <>
        <p>
          If you are a California resident, the{" "}
          <strong>California Consumer Privacy Act (CCPA)</strong> grants you
          specific rights:
        </p>
        <ul className="pp-list">
          <li><strong>Right to Know:</strong> You may request information about the categories and specific pieces of personal data we have collected about you.</li>
          <li><strong>Right to Delete:</strong> You may request that we delete personal data we collected from you, subject to certain exceptions.</li>
          <li><strong>Right to Opt-Out:</strong> You have the right to opt out of the "sale" or "sharing" of your personal information. {COMPANY_NAME} does not sell personal information.</li>
          <li><strong>Right to Non-Discrimination:</strong> We will not discriminate against you for exercising your CCPA rights.</li>
        </ul>
        <p>
          To submit a CCPA request, contact us at{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> with the subject
          line "CCPA Privacy Request."
        </p>
      </>
    ),
  },
  {
    id: "changes",
    title: "17. Changes to This Privacy Policy",
    content: (
      <>
        <p>
          We may update this Privacy Policy from time to time to reflect changes
          in our practices, technology, legal requirements, or other factors. We
          will notify you of material changes by:
        </p>
        <ul className="pp-list">
          <li>Sending an email to the address associated with your account.</li>
          <li>Displaying a prominent notice on the {PLATFORM_NAME} platform.</li>
          <li>Updating the "Last Updated" date at the top of this page.</li>
        </ul>
        <p>
          Your continued use of the Service after the effective date of any
          updated policy constitutes your acceptance of the changes. If you do
          not agree, you must stop using the Service and may request deletion of
          your account.
        </p>
        <p>
          We encourage you to review this page periodically to stay informed
          about how we protect your information.
        </p>
      </>
    ),
  },
  {
    id: "limitation-of-liability",
    title: "18. Limitation of Liability",
    content: (
      <>
        <p>
          To the maximum extent permitted by applicable law, {COMPANY_NAME}{" "}
          shall not be liable for any indirect, incidental, special,
          consequential, or punitive damages arising out of or related to:
        </p>
        <ul className="pp-list">
          <li>Unauthorised access to or use of your personal data due to circumstances beyond our reasonable control.</li>
          <li>Data breaches caused by your failure to maintain the security of your account credentials.</li>
          <li>Inaccuracies in AI-generated content used for personal, academic, or professional decisions.</li>
          <li>Loss of data caused by technical failures, force majeure events, or third-party service outages.</li>
        </ul>
        <p>
          Nothing in this section limits our liability for gross negligence,
          wilful misconduct, or any liability that cannot be excluded under
          applicable law (including consumer protection laws).
        </p>
      </>
    ),
  },
  {
    id: "contact",
    title: "19. Contact Us",
    content: (
      <>
        <p>
          If you have any questions, concerns, or requests regarding this
          Privacy Policy or how we handle your personal data, please contact us:
        </p>
        <table className="pp-table">
          <tbody>
            <tr>
              <td><strong>Email</strong></td>
              <td><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></td>
            </tr>
            <tr>
              <td><strong>Website</strong></td>
              <td><a href={WEBSITE} target="_blank" rel="noreferrer">{WEBSITE}</a></td>
            </tr>
            <tr>
              <td><strong>Response Time</strong></td>
              <td>Within 30 days of receipt</td>
            </tr>
          </tbody>
        </table>
        <p>
          For data protection complaints, you also have the right to lodge a
          complaint with your national or regional data protection supervisory
          authority.
        </p>
      </>
    ),
  },
];

// ── Component ──────────────────────────────────────────────────────────────
export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState<string>("introduction");
  const [tocOpen, setTocOpen] = useState<boolean>(false);

  // Highlight active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + 140;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && el.offsetTop <= scrollY) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    setTocOpen(false);
  };

  return (
    <div className="pp-root">
      {/* ── Header ── */}
      <header className="pp-hero">
        <div className="pp-hero-inner">
          <div className="pp-badge">Legal</div>
          <h1 className="pp-hero-title">Privacy Policy</h1>
          <p className="pp-hero-subtitle">
            {COMPANY_NAME} — how we collect, use, and protect your data.
          </p>
          <p className="pp-hero-date">Last updated: {LAST_UPDATED}</p>
        </div>
        <div className="pp-hero-bg-shape" aria-hidden="true" />
      </header>

      <div className="pp-layout">
        {/* ── Sidebar ToC ── */}
        <aside className="pp-sidebar">
          <div className="pp-toc-header">
            <span>Contents</span>
          </div>
          <nav className="pp-toc">
            {sections.map((s) => (
              <button
                key={s.id}
                className={`pp-toc-item${activeSection === s.id ? " pp-toc-item--active" : ""}`}
                onClick={() => scrollTo(s.id)}
              >
                {s.title}
              </button>
            ))}
          </nav>
        </aside>

        {/* ── Mobile ToC toggle ── */}
        <div className="pp-mobile-toc">
          <button
            className="pp-mobile-toc-toggle"
            onClick={() => setTocOpen(!tocOpen)}
          >
            <span>📋 Table of Contents</span>
            <span className={`pp-caret${tocOpen ? " pp-caret--open" : ""}`}>▾</span>
          </button>
          {tocOpen && (
            <nav className="pp-mobile-toc-nav">
              {sections.map((s) => (
                <button
                  key={s.id}
                  className={`pp-toc-item${activeSection === s.id ? " pp-toc-item--active" : ""}`}
                  onClick={() => scrollTo(s.id)}
                >
                  {s.title}
                </button>
              ))}
            </nav>
          )}
        </div>

        {/* ── Main Content ── */}
        <main className="pp-main">
          <div className="pp-effective-banner">
            This policy is effective as of <strong>{LAST_UPDATED}</strong> and
            applies to all users of the {PLATFORM_NAME} platform.
          </div>

          {sections.map((s) => (
            <section key={s.id} id={s.id} className="pp-section">
              <h2 className="pp-section-title">{s.title}</h2>
              <div className="pp-section-body">{s.content}</div>
            </section>
          ))}

          {/* Footer stamp */}
          <div className="pp-footer-stamp">
            <span className="pp-footer-logo">SQ</span>
            <div>
              <p><strong>{COMPANY_NAME}</strong></p>
              <p>© {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.</p>
              <p>
                Questions?{" "}
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
