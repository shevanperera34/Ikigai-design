// src/pages/Privacy.tsx
import React from "react";
import LegalLayout from "../components/LegalLayout";

export default function Privacy() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="Effective Date: January 1, 2026 • Last Updated: January 1, 2026">
      <p>
        This Privacy Policy explains how THE IKIGAI PROJECT (General Partnership, Ontario, BIN 1001299745) collects, uses,
        and shares personal information when you use our Site, quote builder, and contact workflows.
      </p>

      <h2 className="text-xl font-semibold text-white">1) Information we collect</h2>

      <p className="font-semibold text-white/90">1.1 Information you provide</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>Name, email, phone number</li>
        <li>Business/company details</li>
        <li>Project details (goals, timelines, needs)</li>
        <li>Quote selections and notes (packages, services selected)</li>
        <li>Messages and communications</li>
        <li>Files or links you choose to share (if enabled)</li>
      </ul>

      <p className="font-semibold text-white/90">1.2 Information collected automatically</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>IP address, browser/device information</li>
        <li>Pages visited, timestamps, referral sources</li>
        <li>Approximate location (city-level) inferred from IP</li>
        <li>Cookies or similar technologies (if enabled)</li>
      </ul>

      <p className="font-semibold text-white/90">1.3 Payments (Stripe)</p>
      <p>
        If you make a payment, Stripe may collect and process payment and verification information such as billing name,
        billing address, partial card details (e.g., last four digits), payment method type, transaction identifiers,
        and fraud-prevention signals.
      </p>
      <p>
        We receive limited payment-related information from Stripe (for example, payment status, amount, timestamps, and a
        transaction reference). We do not receive or store full card numbers.
      </p>

      <h2 className="text-xl font-semibold text-white">2) How we use information</h2>
      <p>We use personal information to:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>respond to inquiries and requests</li>
        <li>generate and deliver quotes (including PDF quote delivery)</li>
        <li>coordinate meetings and follow-ups</li>
        <li>deliver Services and project support</li>
        <li>maintain and improve the Site (UX, performance, troubleshooting)</li>
        <li>prevent fraud, abuse, and security issues</li>
        <li>comply with legal obligations</li>
      </ul>
      <p>
        We may use data related to Promotions (such as discount code usage, eligibility signals, and redemption history) to apply discounts,
        prevent fraud or abuse, audit campaign performance, and enforce promotional terms.
      </p>

      <h2 className="text-xl font-semibold text-white">3) Advertising, analytics, pixels, and measurement (if applicable)</h2>
      <p>
        If you engage us for marketing/advertising work, we may need to configure or work with: analytics tools, conversion tracking,
        pixels and event tracking, reporting dashboards, and ad platform accounts (where you provide access).
      </p>
      <p>
        We use this data to measure performance, improve campaigns, and report results. Tracking accuracy can be affected by browser settings,
        cookie restrictions, site configuration, and platform changes.
      </p>

      <h2 className="text-xl font-semibold text-white">4) How we share information</h2>
      <p>We may share information with:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>Service providers that support the Site and delivery (hosting, email delivery, analytics, CRM, scheduling, PDF generation, payments), under appropriate safeguards.</li>
        <li>Payment processing providers (e.g., Stripe) to process transactions, prevent fraud, and issue receipts or refunds.</li>
        <li>Legal/compliance when required by law or to protect rights/safety</li>
        <li>Business transfers (merger, acquisition, restructuring), with reasonable protections</li>
      </ul>
      <p>We do not sell personal information.</p>

      <h2 className="text-xl font-semibold text-white">5) International processing</h2>
      <p>Some providers may process data outside Canada. In those cases, your information may be subject to foreign laws.</p>

      <h2 className="text-xl font-semibold text-white">6) Retention</h2>
      <p>We keep information only as long as necessary for the purposes described, including quote follow-up, service delivery, record-keeping, and dispute resolution.</p>

      <h2 className="text-xl font-semibold text-white">7) Security</h2>
      <p>We use reasonable safeguards to protect personal information (see the Security page for a plain-language summary).</p>

      <h2 className="text-xl font-semibold text-white">8) Your choices</h2>
      <p>You can request access to or correction of your information, and you can opt out of marketing communications at any time by contacting us.</p>

      <h2 className="text-xl font-semibold text-white">9) Cookies</h2>
      <p>
        If we use cookies, you can usually control them through browser settings (and any cookie banner/settings we implement).
        Some site features may not work properly without certain cookies.
      </p>

      <h2 className="text-xl font-semibold text-white">10) Contact</h2>
      <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-white/80">
        <p>Email: theikigaiproject.ca@gmail.com</p>
        <p>Address: Attention/Care of Shevan Perera, 430 Square One Drive, Apartment 803, Mississauga, Ontario, L5B0L6, Canada</p>
      </div>
    </LegalLayout>
  );
}
