import { useState, useEffect } from "react";
import "./TermsOfService.css";

// ── Constants ──────────────────────────────────────────────────────────────
const LAST_UPDATED = "April 11, 2026";
const COMPANY_NAME = "SkillQuest Ltd";
const PLATFORM_NAME = "SkillQuest";
const CONTACT_EMAIL = "legal@skillquest.io";
const SUPPORT_EMAIL = "support@skillquest.io";
const WEBSITE = "https://skillquest.io";

// ── Types ──────────────────────────────────────────────────────────────────
interface Section {
  id: string;
  title: string;
  content: React.ReactNode;
}

// ── Sections Data ──────────────────────────────────────────────────────────
const sections: Section[] = [
  {
    id: "acceptance",
    title: "1. Acceptance of Terms",
    content: (
      <>
        <p>
          These Terms of Service ("Terms", "Agreement") constitute a legally
          binding agreement between you ("User", "you", "your") and{" "}
          <strong>{COMPANY_NAME}</strong> ("Company", "we", "us", "our"),
          governing your access to and use of the {PLATFORM_NAME} platform,
          including all associated websites, web applications, mobile
          applications, AI-powered features, courses, university lecture
          content, textbooks, study materials, and any other services
          (collectively, the "Service").
        </p>
        <p>
          By creating an account, clicking "I Agree", accessing, or otherwise
          using the Service, you confirm that you have read, understood, and
          agree to be bound by these Terms in their entirety, together with our{" "}
          <a href="/privacy">Privacy Policy</a>, which is incorporated into
          these Terms by reference.
        </p>
        <div className="tos-alert-box tos-alert--red">
          <span className="tos-alert-icon">⚠</span>
          <p>
            <strong>If you do not agree to these Terms, you must
            immediately stop using the Service and delete your account.</strong>{" "}
            Continued use of the Service constitutes ongoing acceptance of
            these Terms, including any updates made pursuant to Section 22.
          </p>
        </div>
        <p>
          We reserve the right to modify these Terms at any time. Notice of
          material changes will be provided per Section 22. Your continued use
          after any modification constitutes acceptance of the revised Terms.
        </p>
      </>
    ),
  },
  {
    id: "eligibility",
    title: "2. Eligibility & Account Registration",
    content: (
      <>
        <h4 className="tos-sub-heading">2.1 Age Requirements</h4>
        <p>
          You must be at least <strong>13 years of age</strong> to use{" "}
          {PLATFORM_NAME}. Users between 13 and 17 years old must have
          verifiable parental or guardian consent. By registering, you represent
          and warrant that you meet these age requirements.
        </p>
        <p>
          If you are registering on behalf of a minor with parental consent, you
          accept these Terms on their behalf and take full responsibility for
          their use of the Service.
        </p>

        <h4 className="tos-sub-heading">2.2 Account Accuracy</h4>
        <p>
          You agree to provide accurate, current, and complete information when
          creating your account. You are responsible for maintaining the
          accuracy of your account information and must promptly update any
          information that becomes outdated or incorrect.
        </p>

        <h4 className="tos-sub-heading">2.3 Account Security</h4>
        <p>
          You are solely responsible for maintaining the confidentiality of your
          account credentials, including your password. You agree to notify us
          immediately at <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>{" "}
          if you suspect any unauthorised access to your account.
        </p>
        <p>
          {COMPANY_NAME} shall not be liable for any loss or damage arising from
          your failure to maintain account security, including losses caused by
          unauthorised use of your account credentials.
        </p>

        <h4 className="tos-sub-heading">2.4 One Account Per User</h4>
        <p>
          Each user may only maintain one active account. Creating multiple
          accounts to circumvent restrictions, bans, or subscription limits is
          strictly prohibited and may result in permanent termination of all
          associated accounts.
        </p>

        <h4 className="tos-sub-heading">2.5 Legal Capacity</h4>
        <p>
          By using the Service, you represent that you have the full legal
          capacity to enter into this Agreement. If you are using the Service on
          behalf of an organisation, you represent that you are authorised to
          bind that organisation to these Terms.
        </p>
      </>
    ),
  },
  {
    id: "service-description",
    title: "3. Description of Service",
    content: (
      <>
        <p>
          {PLATFORM_NAME} is an AI-driven online learning platform that
          provides access to:
        </p>
        <ul className="tos-list">
          <li><strong>Course Content:</strong> Structured courses across a wide range of academic and professional subjects.</li>
          <li><strong>University Lectures:</strong> Recorded and live lecture content from academic institutions and educators.</li>
          <li><strong>Textbooks & Study Materials:</strong> Digital textbooks, reference documents, practice problems, and revision notes.</li>
          <li><strong>AI Tutoring:</strong> AI-powered tutoring, question answering, content summarisation, and personalised learning assistance.</li>
          <li><strong>Progress Tracking:</strong> Learning analytics, quiz scoring, certificates of completion, and study streak tracking.</li>
          <li><strong>Community Features:</strong> Discussion forums, peer reviews, and collaborative study tools.</li>
          <li><strong>Subscription Plans:</strong> Free and paid tiers offering varying levels of access to content and features.</li>
        </ul>
        <p>
          We reserve the right to modify, suspend, or discontinue any aspect of
          the Service at any time, with or without notice, and without liability
          to you except as expressly stated in these Terms.
        </p>
        <div className="tos-notice-box">
          <span className="tos-notice-icon">ℹ</span>
          <p>
            AI-generated content on {PLATFORM_NAME} is provided for educational
            assistance only. It may not be 100% accurate and should not be used
            as the sole basis for academic, professional, legal, medical, or
            financial decisions. {COMPANY_NAME} disclaims all liability for
            reliance on AI-generated content.
          </p>
        </div>
      </>
    ),
  },
  {
    id: "subscriptions",
    title: "4. Subscriptions, Payments & Refunds",
    content: (
      <>
        <h4 className="tos-sub-heading">4.1 Subscription Plans</h4>
        <p>
          {PLATFORM_NAME} offers both free and paid subscription tiers. Paid
          subscriptions unlock additional features, content, and AI capabilities
          as described on our pricing page. Features available under each tier
          are subject to change at our discretion, provided that material
          downgrades to paid plans will be communicated with at least 30 days'
          notice.
        </p>

        <h4 className="tos-sub-heading">4.2 Billing & Automatic Renewal</h4>
        <p>
          Paid subscriptions are billed on a recurring basis (monthly or
          annually, depending on the plan selected). Your subscription will
          automatically renew at the end of each billing period unless you
          cancel it before the renewal date.
        </p>
        <p>
          We will send a renewal reminder email at least{" "}
          <strong>7 days before</strong> any annual subscription renews. You
          can cancel or manage your subscription at any time from your account
          settings page.
        </p>

        <h4 className="tos-sub-heading">4.3 Pricing & Taxes</h4>
        <p>
          All prices are displayed in the currency applicable to your region.
          Prices do not include applicable taxes, duties, or levies unless
          expressly stated. You are responsible for all taxes applicable to your
          purchase under the laws of your jurisdiction.
        </p>
        <p>
          We reserve the right to change subscription prices at any time. Price
          changes for existing paid subscribers will be communicated at least{" "}
          <strong>30 days in advance</strong> and will take effect at the next
          renewal date.
        </p>

        <h4 className="tos-sub-heading">4.4 Payment Processing</h4>
        <p>
          Payments are processed by PCI-DSS certified third-party payment
          processors. By providing payment details, you authorise us (through
          our payment processor) to charge your payment method for all fees
          incurred. {COMPANY_NAME} does not store raw card details on its
          servers.
        </p>
        <p>
          If a payment fails, we may retry the charge and may suspend your
          access to paid features until payment is successfully processed. You
          are responsible for ensuring your payment method remains valid.
        </p>

        <h4 className="tos-sub-heading">4.5 Refund Policy</h4>
        <p>
          We offer a <strong>7-day money-back guarantee</strong> on new paid
          subscriptions. If you are unsatisfied within the first 7 days of a
          new subscription, contact us at{" "}
          <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> for a full
          refund.
        </p>
        <ul className="tos-list">
          <li>Refunds are not available after the 7-day window has passed.</li>
          <li>Refunds are not available for partial billing periods after cancellation.</li>
          <li>One-time course or content purchases are non-refundable once the content has been accessed.</li>
          <li>Refunds will not be issued where accounts have been terminated for violations of these Terms.</li>
          <li>Promotional or discounted subscriptions may have different refund terms as stated at the time of purchase.</li>
        </ul>

        <h4 className="tos-sub-heading">4.6 Cancellation</h4>
        <p>
          You may cancel your subscription at any time. Upon cancellation, you
          will retain access to paid features until the end of your current
          billing period, after which your account will revert to the free tier.
          Cancellation does not entitle you to a refund unless within the 7-day
          guarantee window.
        </p>
      </>
    ),
  },
  {
    id: "acceptable-use",
    title: "5. Acceptable Use Policy",
    content: (
      <>
        <p>
          By using {PLATFORM_NAME}, you agree to use the Service only for
          lawful, educational purposes and in a manner consistent with these
          Terms. You agree{" "}
          <strong>not</strong> to:
        </p>
        <ul className="tos-list">
          <li>Use the Service for any unlawful purpose or in violation of any applicable local, national, or international law or regulation.</li>
          <li>Reproduce, distribute, sell, sublicense, or commercially exploit any content from the Service without our express written permission.</li>
          <li>Use the Service to cheat, plagiarise, or engage in academic dishonesty, including submitting AI-generated content as your own original work in violation of your institution's academic integrity policies.</li>
          <li>Attempt to gain unauthorised access to any part of the Service, our systems, or the accounts of other users.</li>
          <li>Upload, post, or transmit any content that is unlawful, harmful, defamatory, obscene, threatening, abusive, or otherwise objectionable.</li>
          <li>Harass, bully, or intimidate other users on the platform, including in forums, comments, or community features.</li>
          <li>Use automated tools, bots, scrapers, or scripts to access, extract, or interact with the Service without our express written permission.</li>
          <li>Introduce malware, viruses, trojans, or any other malicious code to the Service.</li>
          <li>Misrepresent your identity or impersonate any person or entity.</li>
          <li>Circumvent, disable, or interfere with security features of the Service.</li>
          <li>Use the Service to promote, advertise, or solicit products or services without our written consent.</li>
          <li>Share your account credentials with others or allow third parties to access the Service through your account.</li>
          <li>Manipulate or falsify learning progress, quiz results, or certificates.</li>
          <li>Attempt to reverse engineer, decompile, or disassemble any component of the Service.</li>
        </ul>
        <div className="tos-alert-box tos-alert--red">
          <span className="tos-alert-icon">⚠</span>
          <p>
            Violation of this Acceptable Use Policy may result in a warning,
            suspension, or permanent termination of your account, and may be
            reported to relevant law enforcement authorities where appropriate.
          </p>
        </div>
      </>
    ),
  },
  {
    id: "enforcement",
    title: "6. Enforcement & Account Termination",
    content: (
      <>
        <p>
          {COMPANY_NAME} reserves the right to enforce these Terms and take
          appropriate action against any user who violates them. Our enforcement
          process is as follows:
        </p>
        <table className="tos-table">
          <thead>
            <tr>
              <th>Step</th>
              <th>Action</th>
              <th>Timeline</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>1 — Warning</strong></td>
              <td>A formal written warning is issued to the user's registered email outlining the violation.</td>
              <td>First occurrence (minor violations)</td>
            </tr>
            <tr>
              <td><strong>2 — Suspension</strong></td>
              <td>Temporary suspension of account access, ranging from 24 hours to 30 days, depending on severity.</td>
              <td>Repeat violations or moderate severity</td>
            </tr>
            <tr>
              <td><strong>3 — Termination</strong></td>
              <td>Permanent termination of account and all associated data.</td>
              <td>Severe violations or failure to comply after suspension</td>
            </tr>
          </tbody>
        </table>
        <p>
          {COMPANY_NAME} reserves the right to <strong>skip directly to
          suspension or immediate termination</strong> without prior warning for
          severe violations, including but not limited to: illegal activity,
          distribution of harmful content, serious security breaches, or fraud.
        </p>
        <p>
          Upon termination, your right to access the Service ceases immediately.
          We may delete your account data in accordance with our data retention
          policy. Termination for cause does not entitle you to any refund.
        </p>

        <h4 className="tos-sub-heading">6.1 User-Initiated Termination</h4>
        <p>
          You may terminate your account at any time by using the account
          deletion feature in your settings or by contacting us at{" "}
          <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>. Upon
          deletion, your personal data will be handled in accordance with our
          Privacy Policy.
        </p>

        <h4 className="tos-sub-heading">6.2 Appeals</h4>
        <p>
          If you believe your account was suspended or terminated in error, you
          may appeal by contacting{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> within{" "}
          <strong>14 days</strong> of the enforcement action. We will review
          your appeal and respond within 10 business days. Our decision on
          appeals is final.
        </p>
      </>
    ),
  },
  {
    id: "intellectual-property",
    title: "7. Intellectual Property Rights",
    content: (
      <>
        <h4 className="tos-sub-heading">7.1 Our Content</h4>
        <p>
          All content on {PLATFORM_NAME} — including but not limited to course
          materials, lecture videos, textbooks, AI-generated content, graphics,
          software code, brand assets, user interface designs, and trade marks
          — is the exclusive intellectual property of {COMPANY_NAME} or its
          licensors, and is protected by applicable copyright, trade mark, and
          other intellectual property laws.
        </p>
        <p>
          Nothing in these Terms grants you any ownership rights over our
          content. You are granted a limited, non-exclusive, non-transferable,
          revocable licence to access and use the Service's content solely for
          your personal, non-commercial educational purposes.
        </p>

        <h4 className="tos-sub-heading">7.2 Restrictions</h4>
        <ul className="tos-list">
          <li>You may not copy, reproduce, modify, adapt, translate, distribute, publish, or create derivative works from any content on the Service without our express written permission.</li>
          <li>You may not download, screen-record, or otherwise capture course videos, AI interactions, or any premium content for redistribution.</li>
          <li>You may not use our trade marks, logos, or brand assets without prior written consent.</li>
        </ul>

        <h4 className="tos-sub-heading">7.3 User-Generated Content</h4>
        <p>
          By submitting content to {PLATFORM_NAME} (including forum posts,
          reviews, notes, quiz responses, or any other user-generated content),
          you grant {COMPANY_NAME} a worldwide, royalty-free, perpetual,
          irrevocable, non-exclusive licence to use, reproduce, modify, adapt,
          publish, translate, distribute, and display such content in connection
          with operating and improving the Service.
        </p>
        <p>
          You represent and warrant that you own or have the necessary rights to
          the content you submit, and that it does not infringe the intellectual
          property rights of any third party.
        </p>

        <h4 className="tos-sub-heading">7.4 DMCA / Copyright Complaints</h4>
        <p>
          If you believe any content on {PLATFORM_NAME} infringes your
          copyright, please send a written notice to{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> including: a
          description of the copyrighted work, the URL of the infringing
          content, your contact information, and a statement of good faith
          belief. We will investigate and, where appropriate, remove the
          infringing content promptly.
        </p>
      </>
    ),
  },
  {
    id: "ai-content",
    title: "8. AI-Powered Features & Content",
    content: (
      <>
        <p>
          {PLATFORM_NAME} uses artificial intelligence to deliver tutoring,
          content recommendations, quiz generation, and other educational
          features. The following terms apply to all AI-powered features:
        </p>
        <ul className="tos-list">
          <li><strong>Educational Purpose Only:</strong> AI-generated content is provided solely as an educational aid. It is not professional legal, medical, financial, or academic advice.</li>
          <li><strong>No Guarantee of Accuracy:</strong> AI outputs may contain errors, inaccuracies, or outdated information. You are responsible for independently verifying important information before relying on it.</li>
          <li><strong>No Misuse of AI:</strong> You may not use our AI features to generate harmful, deceptive, misleading, illegal, or abusive content. Attempts to "jailbreak", manipulate, or extract harmful outputs from our AI systems are strictly prohibited.</li>
          <li><strong>Academic Integrity:</strong> You agree not to submit AI-generated content as your own original work in violation of your institution's academic integrity or plagiarism policies. {COMPANY_NAME} bears no responsibility for academic consequences arising from such misuse.</li>
          <li><strong>Data Use:</strong> Your AI interactions may be used in anonymised, aggregated form to improve our models. See our Privacy Policy for full details.</li>
          <li><strong>Third-Party AI:</strong> Some AI features may be powered by third-party AI providers under data processing agreements. These providers are prohibited from using your interactions for their own model training.</li>
        </ul>
        <div className="tos-notice-box">
          <span className="tos-notice-icon">ℹ</span>
          <p>
            {COMPANY_NAME} is not liable for any academic, professional, or
            personal consequences resulting from reliance on AI-generated
            content. Use AI features as a supplement to, not a replacement for,
            verified educational resources.
          </p>
        </div>
      </>
    ),
  },
  {
    id: "privacy",
    title: "9. Privacy & Data Protection",
    content: (
      <>
        <p>
          Your privacy is important to us. Our collection, use, storage, and
          sharing of your personal data is governed by our{" "}
          <a href="/privacy">Privacy Policy</a>, which is incorporated into
          these Terms by reference.
        </p>
        <p>
          By using the Service, you consent to our processing of your personal
          data in accordance with the Privacy Policy. You represent that all
          personal data you provide is accurate and that you have the right to
          provide it.
        </p>
        <p>
          We comply with applicable data protection laws, including the General
          Data Protection Regulation (GDPR), the UK GDPR, the Nigerian Data
          Protection Act (NDPA), the California Consumer Privacy Act (CCPA),
          and other applicable privacy legislation.
        </p>
      </>
    ),
  },
  {
    id: "third-party",
    title: "10. Third-Party Services & Links",
    content: (
      <>
        <p>
          The Service may contain links to, or integrate with, third-party
          websites, services, or content. These include external reading
          materials, embedded videos, university resources, payment processors,
          and OAuth sign-in providers.
        </p>
        <ul className="tos-list">
          <li>We are not responsible for the content, privacy practices, or terms of any third-party services.</li>
          <li>Accessing third-party services through {PLATFORM_NAME} is at your own risk.</li>
          <li>We do not endorse or make any representations about third-party content or services.</li>
          <li>Your interactions with third-party services are governed by their own terms and privacy policies.</li>
        </ul>
        <p>
          Any issues arising from your use of third-party services must be
          resolved directly with the relevant third party. {COMPANY_NAME} has no
          obligation to intervene in or resolve such disputes.
        </p>
      </>
    ),
  },
  {
    id: "disclaimers",
    title: "11. Disclaimers & Warranties",
    content: (
      <>
        <div className="tos-alert-box tos-alert--grey">
          <span className="tos-alert-icon">§</span>
          <p>
            <strong>
              THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE", WITHOUT
              WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.
            </strong>
          </p>
        </div>
        <p>
          To the fullest extent permitted by applicable law, {COMPANY_NAME}{" "}
          expressly disclaims all warranties, including but not limited to:
        </p>
        <ul className="tos-list">
          <li><strong>Merchantability:</strong> We do not warrant that the Service is fit for any particular purpose.</li>
          <li><strong>Accuracy:</strong> We do not warrant that course content, AI-generated content, or any other content on the platform is accurate, complete, current, or error-free.</li>
          <li><strong>Availability:</strong> We do not warrant that the Service will be available at all times, uninterrupted, or free from technical errors or outages.</li>
          <li><strong>Security:</strong> While we implement industry-standard security measures, we do not warrant that the Service is completely secure or free from vulnerabilities.</li>
          <li><strong>Educational Outcomes:</strong> We do not guarantee any specific learning outcomes, exam results, grades, employment outcomes, or certifications resulting from use of the Service.</li>
          <li><strong>Non-Infringement:</strong> We do not warrant that the Service does not infringe the intellectual property rights of any third party, except for content we have created or licensed.</li>
        </ul>
      </>
    ),
  },
  {
    id: "limitation-liability",
    title: "12. Limitation of Liability",
    content: (
      <>
        <p>
          To the maximum extent permitted by applicable law, {COMPANY_NAME} and
          its officers, directors, employees, agents, licensors, and service
          providers shall not be liable for:
        </p>
        <ul className="tos-list">
          <li><strong>Indirect or Consequential Damages:</strong> Including loss of profits, loss of data, loss of business opportunity, reputational damage, or any indirect, incidental, special, or punitive damages.</li>
          <li><strong>Service Interruptions:</strong> Damages arising from downtime, outages, or technical failures of the Service.</li>
          <li><strong>Content Reliance:</strong> Damages arising from your reliance on any content, including AI-generated content, on the platform.</li>
          <li><strong>Third-Party Actions:</strong> Damages caused by third-party services, providers, or users of the platform.</li>
          <li><strong>Unauthorised Access:</strong> Damages resulting from unauthorised access to your account due to your failure to maintain credential security.</li>
          <li><strong>Data Loss:</strong> Loss of data due to technical failures, force majeure, or circumstances beyond our reasonable control.</li>
        </ul>
        <p>
          In jurisdictions that do not allow the exclusion or limitation of
          certain damages, our liability shall be limited to the maximum extent
          permitted by law. In all cases, our total aggregate liability to you
          shall not exceed the greater of (a){" "}
          <strong>the total amount you paid us in the 12 months preceding the
          claim</strong>, or (b) <strong>USD $100</strong>.
        </p>
        <p>
          Nothing in this section limits our liability for death or personal
          injury caused by our negligence, fraud, or any other liability that
          cannot be excluded under applicable law.
        </p>
      </>
    ),
  },
  {
    id: "indemnification",
    title: "13. Indemnification",
    content: (
      <>
        <p>
          You agree to indemnify, defend, and hold harmless {COMPANY_NAME} and
          its affiliates, officers, directors, employees, contractors, agents,
          licensors, and successors from and against any claims, liabilities,
          damages, judgments, awards, losses, costs, and expenses (including
          reasonable legal fees) arising out of or relating to:
        </p>
        <ul className="tos-list">
          <li>Your use of or inability to use the Service.</li>
          <li>Your violation of any provision of these Terms.</li>
          <li>Your violation of any applicable law, regulation, or third-party right, including intellectual property rights.</li>
          <li>Any content you submit, post, or transmit through the Service.</li>
          <li>Your misuse of AI-powered features, including use that results in academic integrity violations or harm to third parties.</li>
          <li>Any misrepresentation made by you in connection with your use of the Service.</li>
        </ul>
        <p>
          {COMPANY_NAME} reserves the right to assume exclusive control of any
          matter subject to indemnification, in which case you agree to
          cooperate fully with our defence.
        </p>
      </>
    ),
  },
  {
    id: "dispute-resolution",
    title: "14. Dispute Resolution & Arbitration",
    content: (
      <>
        <div className="tos-alert-box tos-alert--indigo">
          <span className="tos-alert-icon">⚖</span>
          <p>
            <strong>
              Please read this section carefully. It affects your legal rights,
              including your right to bring a lawsuit in court.
            </strong>
          </p>
        </div>

        <h4 className="tos-sub-heading">14.1 Informal Resolution First</h4>
        <p>
          Before initiating any formal dispute resolution proceedings, you agree
          to first contact us at{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> and attempt to
          resolve the dispute informally. We will make good-faith efforts to
          resolve any complaint within <strong>30 days</strong>. If the dispute
          is not resolved within 30 days, either party may proceed to
          arbitration.
        </p>

        <h4 className="tos-sub-heading">14.2 Binding Arbitration</h4>
        <p>
          If informal resolution fails, any dispute, claim, or controversy
          arising out of or relating to these Terms, the Service, or your
          relationship with {COMPANY_NAME} shall be resolved by{" "}
          <strong>binding arbitration</strong> administered by a mutually agreed
          internationally recognised arbitration institution (such as the ICC
          International Court of Arbitration or LCIA), in accordance with its
          applicable rules.
        </p>
        <ul className="tos-list">
          <li>Arbitration shall be conducted in the English language.</li>
          <li>The seat of arbitration shall be agreed upon by both parties, or determined by the arbitration institution in the absence of agreement.</li>
          <li>The arbitrator's award shall be final and binding and may be enforced in any court of competent jurisdiction.</li>
          <li>Each party shall bear their own arbitration costs unless the arbitrator determines otherwise.</li>
        </ul>

        <h4 className="tos-sub-heading">14.3 Exceptions to Arbitration</h4>
        <p>
          The following disputes are exempt from arbitration and may be brought
          before a court of competent jurisdiction:
        </p>
        <ul className="tos-list">
          <li>Claims for injunctive or equitable relief to protect intellectual property rights.</li>
          <li>Small claims that fall within the jurisdiction of a small claims court.</li>
          <li>Disputes where arbitration is prohibited by applicable law.</li>
        </ul>

        <h4 className="tos-sub-heading">14.4 No Class Actions</h4>
        <p>
          <strong>
            You waive any right to participate in class action lawsuits or
            class-wide arbitration against {COMPANY_NAME}.
          </strong>{" "}
          All disputes must be resolved on an individual basis. If this waiver
          is unenforceable in your jurisdiction, the arbitration clause in
          Section 14.2 shall not apply to you.
        </p>

        <h4 className="tos-sub-heading">14.5 Governing Law</h4>
        <p>
          These Terms and any disputes arising from them shall be governed by
          internationally recognised principles of commercial law and, where
          applicable, the laws of the jurisdiction in which {COMPANY_NAME} is
          incorporated or primarily operates, excluding conflict-of-law
          principles that would apply any other jurisdiction's law.
        </p>
      </>
    ),
  },
  {
    id: "certificates",
    title: "15. Certificates & Academic Recognition",
    content: (
      <>
        <p>
          {PLATFORM_NAME} may issue certificates of completion for courses and
          learning milestones. You acknowledge and agree that:
        </p>
        <ul className="tos-list">
          <li>{PLATFORM_NAME} certificates are proprietary credentials issued by {COMPANY_NAME} and are not accredited academic qualifications unless expressly stated.</li>
          <li>Certificates are issued based on your completion of the relevant course or assessment as recorded by the platform. We do not guarantee that certificates will be recognised by any educational institution, employer, or regulatory body.</li>
          <li>Fraudulently obtaining a certificate (including by cheating on assessments or manipulating progress data) violates these Terms and may result in immediate account termination and revocation of all certificates.</li>
          <li>Certificates are issued to individual users and may not be transferred, sold, or assigned.</li>
          <li>{COMPANY_NAME} reserves the right to revoke certificates if it determines they were obtained fraudulently or in violation of these Terms.</li>
        </ul>
      </>
    ),
  },
  {
    id: "community",
    title: "16. Community Standards",
    content: (
      <>
        <p>
          {PLATFORM_NAME} may offer community features including discussion
          forums, comment sections, peer review tools, and study groups. When
          participating in community features, you agree to:
        </p>
        <ul className="tos-list">
          <li>Be respectful and constructive in all interactions with other users and staff.</li>
          <li>Not post content that is offensive, defamatory, discriminatory, hateful, or harassing.</li>
          <li>Not share personal information of other users without their consent.</li>
          <li>Not post spam, advertisements, or unsolicited promotional content.</li>
          <li>Not share pirated or copyrighted content without authorisation.</li>
          <li>Report content or behaviour that violates these standards to <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.</li>
        </ul>
        <p>
          {COMPANY_NAME} reserves the right to remove any community content that
          violates these standards, without notice, and to take enforcement
          action per Section 6.
        </p>
      </>
    ),
  },
  {
    id: "force-majeure",
    title: "17. Force Majeure",
    content: (
      <>
        <p>
          {COMPANY_NAME} shall not be liable for any failure or delay in
          performing its obligations under these Terms where such failure or
          delay results from circumstances beyond its reasonable control,
          including but not limited to:
        </p>
        <ul className="tos-list">
          <li>Natural disasters, acts of God, floods, earthquakes, or extreme weather events.</li>
          <li>Government actions, war, terrorism, civil unrest, or national emergencies.</li>
          <li>Internet or telecommunications infrastructure failures beyond our control.</li>
          <li>Third-party service provider outages, including cloud hosting, payment processors, or AI API providers.</li>
          <li>Pandemics, epidemics, or other public health emergencies.</li>
          <li>Cyberattacks or data breaches caused by external threat actors despite reasonable security measures.</li>
        </ul>
        <p>
          In such circumstances, we will use reasonable efforts to resume normal
          service as quickly as possible and will communicate with affected users
          through available channels.
        </p>
      </>
    ),
  },
  {
    id: "modifications",
    title: "18. Modifications to the Service",
    content: (
      <>
        <p>
          {COMPANY_NAME} reserves the right to modify, update, suspend, or
          discontinue all or any part of the Service at any time. This
          includes:
        </p>
        <ul className="tos-list">
          <li>Adding, modifying, or removing features or content.</li>
          <li>Changing subscription plan features or pricing (with 30 days' notice for existing paid subscribers).</li>
          <li>Temporarily suspending the Service for maintenance or updates.</li>
          <li>Permanently discontinuing the Service with reasonable advance notice to registered users.</li>
        </ul>
        <p>
          We will make reasonable efforts to notify users of significant
          changes. However, some modifications (such as emergency security
          updates or minor feature changes) may be implemented without prior
          notice.
        </p>
        <p>
          {COMPANY_NAME} shall not be liable to you or any third party for any
          modification, suspension, or discontinuation of the Service, except as
          expressly provided in these Terms.
        </p>
      </>
    ),
  },
  {
    id: "assignment",
    title: "19. Assignment",
    content: (
      <>
        <p>
          You may not assign, transfer, or delegate any of your rights or
          obligations under these Terms to any third party without the prior
          written consent of {COMPANY_NAME}.
        </p>
        <p>
          {COMPANY_NAME} may freely assign, transfer, or delegate these Terms or
          any rights and obligations hereunder to any affiliate, successor, or
          acquirer, including in connection with a merger, acquisition, or sale
          of assets, without your consent. We will provide notice of any such
          assignment that materially affects your rights.
        </p>
      </>
    ),
  },
  {
    id: "severability",
    title: "20. Severability & Entire Agreement",
    content: (
      <>
        <h4 className="tos-sub-heading">20.1 Severability</h4>
        <p>
          If any provision of these Terms is found to be invalid, illegal, or
          unenforceable under applicable law, that provision shall be modified to
          the minimum extent necessary to make it enforceable, or severed from
          these Terms if modification is not possible. The remaining provisions
          shall continue in full force and effect.
        </p>

        <h4 className="tos-sub-heading">20.2 Entire Agreement</h4>
        <p>
          These Terms, together with our{" "}
          <a href="/privacy">Privacy Policy</a> and any other policies or
          agreements referenced herein, constitute the entire agreement between
          you and {COMPANY_NAME} with respect to the Service and supersede all
          prior agreements, representations, warranties, and understandings,
          whether written or oral.
        </p>

        <h4 className="tos-sub-heading">20.3 No Waiver</h4>
        <p>
          Our failure to enforce any provision of these Terms at any time shall
          not be construed as a waiver of that provision or of our right to
          enforce it at a later time.
        </p>

        <h4 className="tos-sub-heading">20.4 Headings</h4>
        <p>
          Section headings in these Terms are for convenience only and have no
          legal or contractual effect.
        </p>
      </>
    ),
  },
  {
    id: "changes-to-terms",
    title: "21. Changes to These Terms",
    content: (
      <>
        <p>
          {COMPANY_NAME} reserves the right to update or modify these Terms at
          any time. We will provide notice of material changes by:
        </p>
        <ul className="tos-list">
          <li>Sending an email notification to your registered email address at least <strong>14 days</strong> before the changes take effect.</li>
          <li>Displaying a prominent notice on the {PLATFORM_NAME} platform.</li>
          <li>Updating the "Last Updated" date at the top of this page.</li>
        </ul>
        <p>
          Your continued use of the Service after the effective date of updated
          Terms constitutes your acceptance of the revised Terms. If you do not
          agree to the changes, you must stop using the Service before the
          effective date and may request account deletion.
        </p>
        <p>
          For non-material changes (such as typographical corrections,
          clarifications, or changes that do not affect your rights), we may
          update the Terms without advance notice.
        </p>
      </>
    ),
  },
  {
    id: "contact",
    title: "22. Contact Information",
    content: (
      <>
        <p>
          If you have any questions, concerns, or requests regarding these Terms
          of Service, please contact us:
        </p>
        <table className="tos-table">
          <tbody>
            <tr>
              <td><strong>Legal Enquiries</strong></td>
              <td><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></td>
            </tr>
            <tr>
              <td><strong>General Support</strong></td>
              <td><a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a></td>
            </tr>
            <tr>
              <td><strong>Website</strong></td>
              <td><a href={WEBSITE} target="_blank" rel="noreferrer">{WEBSITE}</a></td>
            </tr>
            <tr>
              <td><strong>Company</strong></td>
              <td>{COMPANY_NAME}</td>
            </tr>
            <tr>
              <td><strong>Response Time</strong></td>
              <td>Within 10 business days</td>
            </tr>
          </tbody>
        </table>
        <p>
          For urgent legal matters or to submit a formal notice under these
          Terms, please use the legal enquiries email address above and include
          "LEGAL NOTICE" in the subject line.
        </p>
      </>
    ),
  },
];

// ── Component ──────────────────────────────────────────────────────────────
export default function TermsOfService() {
  const [activeSection, setActiveSection] = useState<string>("acceptance");
  const [tocOpen, setTocOpen] = useState<boolean>(false);

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
    <div className="tos-root">
      {/* ── Hero ── */}
      <header className="tos-hero">
        <div className="tos-hero-inner">
          <div className="tos-badge">Legal</div>
          <h1 className="tos-hero-title">Terms of Service</h1>
          <p className="tos-hero-subtitle">
            {COMPANY_NAME} — the rules that govern your use of {PLATFORM_NAME}.
          </p>
          <p className="tos-hero-date">Last updated: {LAST_UPDATED}</p>
        </div>
        <div className="tos-hero-orb tos-hero-orb--left" aria-hidden="true" />
        <div className="tos-hero-orb tos-hero-orb--right" aria-hidden="true" />
      </header>

      <div className="tos-layout">
        {/* ── Desktop Sidebar ── */}
        <aside className="tos-sidebar">
          <div className="tos-toc-header">Contents</div>
          <nav className="tos-toc">
            {sections.map((s) => (
              <button
                key={s.id}
                className={`tos-toc-item${activeSection === s.id ? " tos-toc-item--active" : ""}`}
                onClick={() => scrollTo(s.id)}
              >
                {s.title}
              </button>
            ))}
          </nav>
        </aside>

        {/* ── Mobile ToC ── */}
        <div className="tos-mobile-toc">
          <button
            className="tos-mobile-toc-toggle"
            onClick={() => setTocOpen(!tocOpen)}
          >
            <span>📋 Table of Contents</span>
            <span className={`tos-caret${tocOpen ? " tos-caret--open" : ""}`}>▾</span>
          </button>
          {tocOpen && (
            <nav className="tos-mobile-toc-nav">
              {sections.map((s) => (
                <button
                  key={s.id}
                  className={`tos-toc-item${activeSection === s.id ? " tos-toc-item--active" : ""}`}
                  onClick={() => scrollTo(s.id)}
                >
                  {s.title}
                </button>
              ))}
            </nav>
          )}
        </div>

        {/* ── Main ── */}
        <main className="tos-main">
          <div className="tos-effective-banner">
            These Terms are effective as of <strong>{LAST_UPDATED}</strong> and
            apply to all users of the {PLATFORM_NAME} platform. By using{" "}
            {PLATFORM_NAME} you agree to be bound by these Terms.
          </div>

          {sections.map((s) => (
            <section key={s.id} id={s.id} className="tos-section">
              <h2 className="tos-section-title">{s.title}</h2>
              <div className="tos-section-body">{s.content}</div>
            </section>
          ))}

          <div className="tos-footer-stamp">
            <span className="tos-footer-logo">SQ</span>
            <div>
              <p><strong>{COMPANY_NAME}</strong></p>
              <p>© {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.</p>
              <p>
                Legal enquiries:{" "}
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
