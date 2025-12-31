// src/pages/DataUse.tsx
import React from "react";
import LegalLayout from "../components/LegalLayout";

export default function DataUse() {
  return (
    <LegalLayout title="Data Use" lastUpdated="Effective Date: January 1, 2026 • Last Updated: January 1, 2026">
      <p>
        This page explains, in plain language, how we use data across the Site, quote builder, and service delivery process.
      </p>

      <h2 className="text-xl font-semibold text-white">1) Quote builder + PDF quote delivery</h2>
      <p>When you build a package and request a quote, we use:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>selected services/options,</li>
        <li>your notes/requirements,</li>
        <li>your contact details,</li>
        <li>quote metadata (quote ID, dates, validity period if used).</li>
      </ul>
      <p className="font-semibold text-white/90">Purpose:</p>
      <p>generate your estimate, produce a PDF quote, send it to you, and follow up about your request.</p>

      <h2 className="text-xl font-semibold text-white">2) Contact requests</h2>
      <p>When you contact us, we use your submission to reply, qualify your needs, and propose next steps.</p>

      <h2 className="text-xl font-semibold text-white">3) Analytics and site improvement</h2>
      <p>We may use analytics to understand:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>which pages users visit,</li>
        <li>where users drop off,</li>
        <li>site performance and errors,</li>
        <li>overall conversion flow quality.</li>
      </ul>
      <p className="font-semibold text-white/90">Purpose:</p>
      <p>improve user journey, clarity, and performance.</p>

      <h2 className="text-xl font-semibold text-white">4) Tracking, pixels, and event setup (if applicable)</h2>
      <p>For marketing/advertising engagements, we may configure:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>conversion events (lead, purchase, form submit, etc.)</li>
        <li>pixels and tags</li>
        <li>analytics reporting views</li>
        <li>dashboards and campaign reporting tools</li>
      </ul>
      <p className="font-semibold text-white/90">Purpose:</p>
      <p>measurement, optimization, and reporting.</p>
      <p className="text-white/75">
        Reality check: tracking can be affected by consent settings, browser restrictions, ad blockers, and platform changes.
      </p>

      <h2 className="text-xl font-semibold text-white">5) CRM and internal workflows</h2>
      <p>
        We may store inquiry and project info in internal systems (e.g., CRM, project tracking) for coordination and delivery.
        Access is limited to those who need it.
      </p>

      <h2 className="text-xl font-semibold text-white">6) Payments (Stripe)</h2>
      <p>
        If you pay for services online, Stripe processes the payment. We use payment status and transaction references to:
      </p>
      <ul className="list-disc pl-5 space-y-2">
        <li>confirm receipt of deposits/invoices,</li>
        <li>provide receipts and account records,</li>
        <li>issue refunds or credits when applicable,</li>
        <li>prevent fraud and handle disputes or chargebacks.</li>
      </ul>
      <p>
        We do not use your payment details to sell you random stuff, and we do not store full card numbers on our servers.
      </p>

      <h2 className="text-xl font-semibold text-white">7) Discount codes and promotions</h2>
      <p>
        If you use a discount code, we record redemption details (such as the code applied, time of redemption, and services purchased) to:
      </p>
      <ul className="list-disc pl-5 space-y-2">
        <li>apply the correct discount,</li>
        <li>enforce eligibility/usage limits,</li>
        <li>prevent abuse or fraud,</li>
        <li>evaluate marketing performance.</li>
      </ul>

      <h2 className="text-xl font-semibold text-white">8) AI and automation</h2>
      <p>
        We may use automation (and, where appropriate, AI tools) to speed up drafting, analysis, or production.
        We aim to minimize sensitive data in these tools and keep human review for final decisions and deliverables.
      </p>

      <h2 className="text-xl font-semibold text-white">9) We don’t sell your personal info</h2>
      <p className="font-semibold text-white">We don’t sell personal information. Period.</p>

      <h2 className="text-xl font-semibold text-white">10) Contact</h2>
      <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-white/80">
        <p>Email: theikigaiproject.ca@gmail.com</p>
        <p>Address: Attention/Care of Shevan Perera, 430 Square One Drive, Apartment 803, Mississauga, Ontario, L5B0L6, Canada</p>
      </div>
    </LegalLayout>
  );
}
