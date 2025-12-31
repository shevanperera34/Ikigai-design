// src/pages/Security.tsx
import React from "react";
import LegalLayout from "../components/LegalLayout";

export default function Security() {
  return (
    <LegalLayout title="Security" lastUpdated="Effective Date: January 1, 2026 • Last Updated: January 1, 2026">
      <p>
        This page summarizes how we protect the Site, quote workflow, and any project data we handle.
      </p>

      <h2 className="text-xl font-semibold text-white">1) Safeguards we use (high-level)</h2>
      <p>We use reasonable safeguards, which may include:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>encryption in transit (HTTPS/TLS)</li>
        <li>access controls (least privilege)</li>
        <li>multi-factor authentication where supported</li>
        <li>secure hosting practices and timely patching</li>
        <li>backups and recovery procedures</li>
        <li>spam/abuse monitoring on forms</li>
        <li>vendor selection for critical providers</li>
      </ul>
      <p>
        No system is perfectly secure, but we design to reduce risk and respond quickly.
      </p>

      <p className="font-semibold text-white/90">1.1 Payments security (Stripe)</p>
      <p>
        Online payments are processed by Stripe, which is designed to handle sensitive payment information securely.
        We do not store full payment card details on our servers. Where applicable, Stripe uses tokenization and PCI-oriented
        controls to reduce exposure of card data.
      </p>
      <p>
        We restrict access to payment dashboards and administrative tools, and we recommend multi-factor authentication (MFA)
        on all accounts involved in billing and payment processing.
      </p>

      <h2 className="text-xl font-semibold text-white">2) Access and credentials</h2>
      <p>If we need access to your tools (hosting, analytics, ad accounts, etc.), we prefer:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>invite-based access (role-based permissions),</li>
        <li>temporary access where possible,</li>
        <li>no passwords sent through forms or plain email.</li>
      </ul>

      <h2 className="text-xl font-semibold text-white">3) Incident handling</h2>
      <p>If we suspect a security incident affecting personal information or project data, we will:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>investigate and contain,</li>
        <li>assess impact,</li>
        <li>notify affected parties where appropriate/required,</li>
        <li>document and remediate.</li>
      </ul>

      <h2 className="text-xl font-semibold text-white">4) Promotion and discount code abuse prevention</h2>
      <p>
        We may implement controls to prevent promotional abuse (e.g., rate limiting, bot protection on checkout,
        monitoring for unusual redemption patterns, and disabling codes that appear compromised). Misuse may result in
        invalidation of discounts and refusal of service where legally permitted.
      </p>

      <h2 className="text-xl font-semibold text-white">4) Vulnerability reporting</h2>
      <p>
        If you believe you found a security issue, email: theikigaiproject.ca@gmail.com with steps to reproduce and any helpful details.
        Please don’t publicly disclose until we’ve had a reasonable chance to fix it.
      </p>

      <h2 className="text-xl font-semibold text-white">5) Third-party providers</h2>
      <p>
        We may rely on third-party providers (hosting, email, analytics, CRM, etc…). We choose reputable vendors and limit access,
        but we can’t fully control their systems.
      </p>

      <h2 className="text-xl font-semibold text-white">6) Contact</h2>
      <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-white/80">
        <p>Email: theikigaiproject.ca@gmail.com</p>
        <p>Address: Attention/Care of Shevan Perera, 430 Square One Drive, Apartment 803, Mississauga, Ontario, L5B0L6, Canada</p>
      </div>
    </LegalLayout>
  );
}
