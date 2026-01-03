import React from "react";

type SEOTextProps = {
  page:
    | "home"
    | "services"
    | "about"
    | "work"
    | "contact";
};

export default function SEOText({ page }: SEOTextProps) {
  // Tailwind sr-only = visually hidden, still in DOM, still crawlable
  // If you're not using Tailwind's sr-only, I included a fallback class below.
  const cls = "sr-only";

  if (page === "home") {
    return (
      <section aria-label="The Ikigai Project overview" className={cls}>
        <h1>The Ikigai Project — Brand Systems, Web Infrastructure, Growth Architecture</h1>

        <p>
          The Ikigai Project is a human-first digital studio building brand systems,
          intelligent web infrastructure, and growth architecture for modern businesses.
        </p>
        <p>
          We help founders and teams clarify positioning, sharpen messaging, and build
          fast, modern websites designed to convert. Our work blends strategy, design,
          and engineering into a single system that performs.
        </p>
        <p>
          Services include brand identity and messaging, custom React builds, performance
          optimization, analytics and tracking integration, and growth planning built
          for long-term momentum.
        </p>
        <p>
          If you’re looking for a premium website and a clean system behind it, we build
          the foundation that makes growth repeatable.
        </p>
      </section>
    );
  }

  if (page === "services") {
    return (
      <section aria-label="Ikigai Project services" className={cls}>
        <h1>Services — Brand Systems, Intelligent Web Infrastructure, Growth Architecture</h1>

        <p>
          Ikigai Project offers three core systems designed to align strategy, design,
          and execution: Brand Systems Build, Intelligent Web Infrastructure, and Growth
          Architecture.
        </p>
        <p>
          Brand Systems Build focuses on identity, messaging, and positioning so your brand
          is clear and consistent. Intelligent Web Infrastructure delivers fast, modern
          websites engineered for performance and conversion. Growth Architecture maps the
          strategy, tracking, and execution plan required to scale intentionally.
        </p>
      </section>
    );
  }

  if (page === "about") {
    return (
      <section aria-label="About The Ikigai Project" className={cls}>
        <h1>About — The Ikigai Project</h1>

        <p>
          The Ikigai Project is a small team focused on building digital systems that feel
          human and perform under pressure. We combine strategy, design, and engineering
          to help brands communicate clearly and convert consistently.
        </p>
        <p>
          We work best with founders and teams who want a premium look, a fast website,
          and a system that supports growth over time.
        </p>
      </section>
    );
  }

  if (page === "work") {
    return (
      <section aria-label="Ikigai Project work and case studies" className={cls}>
        <h1>Work — Case Studies and Digital Systems</h1>

        <p>
          Explore recent work from The Ikigai Project including brand systems, websites,
          and digital experiences designed for clarity, performance, and conversion.
        </p>
      </section>
    );
  }

  if (page === "contact") {
    return (
      <section aria-label="Contact The Ikigai Project" className={cls}>
        <h1>Contact — The Ikigai Project</h1>

        <p>
          Contact The Ikigai Project to request a quote, schedule a call, or ask a question.
          Share your goals and timeline and we’ll recommend the best next step.
        </p>
      </section>
    );
  }

  return null;
}

/**
 * If you don't have Tailwind's sr-only class available for some reason,
 * add this to your global CSS:
 *
 * .sr-only {
 *   position: absolute;
 *   width: 1px;
 *   height: 1px;
 *   padding: 0;
 *   margin: -1px;
 *   overflow: hidden;
 *   clip: rect(0, 0, 0, 0);
 *   white-space: nowrap;
 *   border: 0;
 * }
 */
