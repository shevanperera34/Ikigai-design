import { useEffect } from "react";

import SEO from "../components/SEO";

export default function ActThankYou() {
  useEffect(() => {
    const id = "calendly-widget-script";
    if (document.getElementById(id)) return;

    const script = document.createElement("script");
    script.id = id;
    script.type = "text/javascript";
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <section className="relative overflow-hidden bg-black font-[Inter] text-white">
      <SEO
        title="A.C.T. Intake Received | Thank You"
        description="Thank-you confirmation after completing the A.C.T. intake flow."
        path="/services/act/thank-you"
      />

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-purple-700/5 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-5 sm:px-6 md:px-10 pt-20 sm:pt-24 md:pt-28 pb-20 sm:pb-24 space-y-6">
        <article className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <p className="text-[11px] tracking-[0.22em] text-white/70 font-[Space_Grotesk] uppercase">
            A.C.T.
          </p>
          <h1 className="mt-3 font-[Space_Grotesk] text-3xl sm:text-4xl md:text-5xl font-semibold uppercase tracking-[0.08em] leading-tight">
            Thank You
          </h1>
          <p className="mt-4 text-white/85 text-sm sm:text-[15px] leading-7 max-w-3xl">
            Your intake is in. We have what we need to make the intro call actually useful.
          </p>
        </article>

        <article className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <h2 className="font-[Space_Grotesk] text-2xl sm:text-3xl font-semibold uppercase tracking-[0.08em]">
            What your intro call covers
          </h2>

          <ul className="mt-4 space-y-2 text-white/80 text-sm sm:text-[15px] leading-7">
            <li>• Review your Instant Presence Check result and key gaps.</li>
            <li>• Walk through the right A.C.T. starting package for your stage.</li>
            <li>• Confirm practical next steps and timeline.</li>
          </ul>
        </article>

        <article>
          <div
            className="calendly-inline-widget w-full"
            data-url="https://calendly.com/theikigaiproject-ca/30min"
            style={{ minWidth: "320px", height: "700px" }}
          />
        </article>

        <p className="text-center text-white/62 text-sm sm:text-[15px]">
          Not ready to book yet? We&apos;ll follow up within 24 hours.
        </p>
      </div>
    </section>
  );
}
