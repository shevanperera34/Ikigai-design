// src/pages/Terms.tsx
import React from "react";
import LegalLayout from "../components/LegalLayout";

export default function Terms() {
  return (
    <LegalLayout title="Terms of Service" lastUpdated="Effective Date: January 1, 2026 • Last Updated: January 1, 2026">
      <p>
        These Terms of Service (“Terms”) govern your access to and use of the websites, forms, quote builder,
        content, and related services (collectively, the “Site”) operated by THE IKIGAI PROJECT (a General Partnership
        registered in Ontario, Canada, Business Identification Number 1001299745) (“Ikigai,” “we,” “us,” “our”).
      </p>

      <p className="font-semibold text-white">
        By accessing or using the Site, you agree to these Terms. If you do not agree, DO NOT USE THE SITE.
      </p>

      <h2 className="text-xl font-semibold text-white">1) Who we are</h2>
      <p>
        The Ikigai Project provides creative and digital services that may include branding, web design and development,
        marketing/advertising support, strategy, and related deliverables (the “Services”). The Site may also include a
        quote builder that allows you to select packages, services, generate an estimate, and receive a PDF quote.
      </p>

      <h2 className="text-xl font-semibold text-white">2) Agreement hierarchy</h2>
      <p>If there is ever a conflict between:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>a signed agreement or Statement of Work (“SOW”),</li>
        <li>an accepted quote/proposal (including the PDF quote terms), and</li>
        <li>these website Terms,</li>
      </ul>
      <p>
        then the signed agreement/SOW controls, then the accepted quote/proposal, then these Terms.
      </p>

      <h2 className="text-xl font-semibold text-white">3) Eligibility</h2>
      <p>
        You must be able to form a legally binding contract to use the Site. If you use the Site on behalf of a company,
        you represent that you are authorized to bind that company.
      </p>

      <h2 className="text-xl font-semibold text-white">4) Quotes, estimates, and acceptance</h2>
      <p className="font-semibold text-white/90">4.1 Estimates are not binding</p>
      <p>
        Pricing, totals, and timelines shown on the Site or quote builder are estimates and are not binding unless confirmed
        in a written quote/proposal/SOW.
      </p>

      <p className="font-semibold text-white/90">4.2 Quote validity</p>
      <p>A quote is valid only until the “Valid Until” date shown on the quote, if applicable.</p>

      <p className="font-semibold text-white/90">4.3 Acceptance</p>
      <p>
        A quote is considered accepted when we receive written confirmation (including email) or when the first invoice/deposit
        is paid, unless the quote states a different acceptance method.
      </p>

      <p className="font-semibold text-white/90">4.4 Scope changes</p>
      <p>
        Anything outside the accepted scope requires written approval and may require a change order, re-quote, or additional billing.
      </p>

      <p className="font-semibold text-white/90">4.5 Discount codes and promotions</p>
      <p>
        We may offer discount codes, promotional pricing, or limited-time offers (“Promotions”). Promotions have no cash value and are
        subject to additional terms, including eligibility requirements, minimum spend, expiration dates, usage limits, and restrictions
        on combining offers.
      </p>
      <p>Unless we state otherwise, discount codes:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>are non-transferable and may not be resold,</li>
        <li>cannot be combined with other offers,</li>
        <li>apply only to specified services and time periods,</li>
        <li>may be revoked if we suspect misuse, fraud, scraping, bulk distribution, or any attempt to circumvent limits.</li>
      </ul>
      <p>
        If you receive a discount and later request a refund or credit (where applicable), it will be calculated based on the discounted
        amount actually paid, not the original price.
      </p>

      <h2 className="text-xl font-semibold text-white">5) Client responsibilities</h2>
      <p>You agree to:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>provide accurate info and materials required for the project,</li>
        <li>provide timely feedback/approvals,</li>
        <li>provide access to accounts/hosting/tools where needed (preferably invite-based access),</li>
        <li>ensure you have the rights to all materials you provide,</li>
        <li>designate a single decision-maker where reasonable.</li>
      </ul>
      <p>
        Delays caused by missing access, delayed feedback, or changing requirements can impact timelines and cost.
      </p>

      <h2 className="text-xl font-semibold text-white">6) Payments, invoices, and late payment</h2>
      <p>
        Unless otherwise stated in your accepted quote/proposal: Invoices are payable within 10 business days. For fixed-scope projects,
        the default structure is 50% to begin and 50% upon delivery (or as stated in your quote). For recurring services (e.g., monthly
        management), fees are billed on the schedule in your quote and may include setup fees.
      </p>
      <p>
        Third-party costs (domains, hosting, plugins, paid tools, stock assets, ad spend) are typically billed to you directly or invoiced
        in advance, unless agreed otherwise.
      </p>
      <p>If payment is late, we may pause work, withhold deliverables, and adjust timelines accordingly.</p>

      <p className="font-semibold text-white/90">6.1 Payments processed by Stripe</p>
      <p>
        We use Stripe (a third-party payment processor) to process card and other supported payment methods. By making a payment, you agree
        to Stripe’s applicable terms and policies in addition to ours.
      </p>
      <p>
        We do not store your full payment card number on our servers. Payment details are handled by Stripe and may be stored by Stripe according
        to its policies.
      </p>
      <p>
        You authorize us (and Stripe) to charge the payment method you provide for agreed fees, including deposits, one-time invoices, recurring
        fees (if applicable), taxes, and any approved add-ons or change orders.
      </p>
      <p>
        If a payment fails, is reversed, or is charged back, we may pause work, withhold deliverables, and/or terminate services until the balance
        is resolved. You are responsible for any chargeback fees or administrative costs we incur as a result of payment disputes.
      </p>

      <h2 className="text-xl font-semibold text-white">7) Performance credits / KPI adjustments (only if explicitly included)</h2>
      <p>
        Some quotes may include a Performance Adjustment or credit if defined KPIs are not met. This applies only if:
      </p>
      <ul className="list-disc pl-5 space-y-2">
        <li>it is explicitly included in your accepted quote/SOW, and</li>
        <li>KPIs, measurement methods, data sources, timeframe, and credit amount are defined in writing.</li>
      </ul>
      <p>
        Unless stated otherwise, credits: are applied to future invoices (not cash refunds), and do not apply if performance is impacted by exclusions
        such as: client delays, tracking/pixel errors, platform outages/policy changes, budget changes, creative/approval delays, site downtime, inaccurate
        data provided by the client, or force majeure.
      </p>

      <h2 className="text-xl font-semibold text-white">8) Intellectual property</h2>
      <p className="font-semibold text-white/90">8.1 Site IP</p>
      <p>
        We own or license the Site content, UI, copy, and templates. You may not copy, scrape, resell, reverse engineer, or exploit the Site without written permission.
      </p>
      <p className="font-semibold text-white/90">8.2 Client materials</p>
      <p>
        You retain ownership of what you provide (“Client Materials”). You grant us a limited license to use Client Materials solely to perform the Services and operate the quote/contact process.
      </p>
      <p className="font-semibold text-white/90">8.3 Deliverables (ownership transfer)</p>
      <p>
        Unless otherwise stated in your quote/SOW: you receive rights to the final deliverables upon full payment, and we retain ownership of our pre-existing materials, processes, templates,
        tooling, libraries, and know-how (including anything not created specifically for you).
      </p>

      <h2 className="text-xl font-semibold text-white">9) Portfolio / case study rights</h2>
      <p>
        Unless you opt out in writing or we have an NDA, you allow us to showcase non-confidential aspects of completed work for portfolio/case studies/marketing.
      </p>

      <h2 className="text-xl font-semibold text-white">10) Confidentiality</h2>
      <p>
        We treat non-public project information as confidential and use reasonable care to protect it. Unless otherwise stated in writing:
        confidentiality obligations apply during the engagement and for 3 years after, and trade secrets and personal data remain protected as required by law and good practice.
      </p>

      <h2 className="text-xl font-semibold text-white">11) Acceptable use</h2>
      <p>You agree not to:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>attempt unauthorized access, probe vulnerabilities, or disrupt the Site,</li>
        <li>upload malware or harmful code,</li>
        <li>spam or scrape forms,</li>
        <li>violate laws or third-party rights.</li>
      </ul>
      <p>We may suspend access if misuse is suspected.</p>

      <h2 className="text-xl font-semibold text-white">12) Disclaimers</h2>
      <p>
        THE SITE AND SERVICES ARE PROVIDED “AS IS” AND “AS AVAILABLE.” We do not guarantee uninterrupted operation or specific business outcomes
        (rankings, leads, revenue) unless explicitly agreed in writing.
      </p>

      <h2 className="text-xl font-semibold text-white">13) Limitation of liability</h2>
      <p>
        To the maximum extent permitted by law, Ikigai is not liable for indirect, incidental, special, consequential, or punitive damages, or loss of profits,
        revenue, data, or goodwill.
      </p>
      <p>
        To the maximum extent permitted by law, our total liability for claims relating to the Site will not exceed the greater of: CAD $100, or the amount you paid us
        in the 3 months before the event giving rise to the claim.
      </p>

      <h2 className="text-xl font-semibold text-white">14) Termination</h2>
      <p>
        Unless otherwise stated in your quote/SOW: either party may terminate with 30 days written notice, or immediately for a material breach not cured within 10 business days after written notice.
      </p>
      <p>
        Upon termination, you must pay for work completed and any non-cancellable commitments. If requested and agreed, we may provide a transition period (e.g., knowledge transfer), billed separately unless included in your agreement.
      </p>

      <h2 className="text-xl font-semibold text-white">15) Dispute resolution</h2>
      <p>
        Unless prohibited by law: Parties will attempt to resolve disputes through good-faith negotiation for 15 business days. Parties may proceed to mediation by mutual agreement.
        If unresolved, disputes will be resolved by binding arbitration in Ontario, Canada, unless the parties agree otherwise.
      </p>

      <h2 className="text-xl font-semibold text-white">16) Governing law</h2>
      <p>These Terms are governed by the laws of Ontario, Canada.</p>

      <h2 className="text-xl font-semibold text-white">17) Contact</h2>
      <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-white/80">
        <p className="font-semibold text-white">THE IKIGAI PROJECT (General Partnership, Ontario)</p>
        <p>BIN: 1001299745</p>
        <p>Address: Attention/Care of Shevan Perera, 430 Square One Drive, Apartment 803, Mississauga, Ontario, L5B0L6, Canada</p>
        <p>Email: theikigaiproject.ca@gmail.com</p>
      </div>
    </LegalLayout>
  );
}
