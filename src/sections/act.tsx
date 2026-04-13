import { useNavigate } from "react-router-dom";

import SEO from "../components/SEO";
import ActActivationSequence from "../components/services/ActActivationSequence";
import {
  ACT_PACKAGES,
  ACT_PROCESS_STEPS,
  ACT_SERVICE_PAGE,
} from "../content/actService";

export default function ActService() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-black font-[Inter] text-white">
      <SEO
        title="A.C.T. | Activate Consistent Traction"
        description="A.C.T. is Ikigai's execution-first marketing service for local businesses that need consistent, accurate digital presence."
        path="/services/act"
      />

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-purple-700/5 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(70%_45%_at_50%_-10%,rgba(255,255,255,0.05),transparent)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-6 md:px-10 pt-14 sm:pt-16 md:pt-20 pb-20 sm:pb-24 md:pb-28 space-y-8 sm:space-y-10">
        <header className="space-y-6">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
            <h1 className="font-[Space_Grotesk] text-4xl sm:text-5xl md:text-6xl font-semibold uppercase tracking-[0.1em] leading-tight text-white/95">
              {ACT_SERVICE_PAGE.name}
            </h1>
            <h2 className="whitespace-nowrap font-[Space_Grotesk] text-3xl sm:text-4xl md:text-5xl font-semibold uppercase tracking-[0.08em] leading-tight lg:text-right">
              Activate <span className="text-[#3D4DFF]">Consistent</span>{" "}
              <span className="text-[#6C00FF]">Traction</span>
            </h2>
          </div>

          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_30rem] lg:gap-8">
            <div className="max-w-3xl">
              <p className="text-[11px] tracking-[0.22em] text-white/60 font-[Space_Grotesk] uppercase">
                About
              </p>
              <p className="mt-3 text-white/82 text-sm sm:text-[15px] leading-7">
                {ACT_SERVICE_PAGE.summary}
              </p>
              <p className="mt-3 text-white/72 text-sm sm:text-[15px] leading-7">
                {ACT_SERVICE_PAGE.valueProposition}
              </p>
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/[0.03] p-5 sm:p-6 lg:border-l lg:border-white/18">
              <p className="text-white/72 text-sm sm:text-[15px] leading-7">
                Start with the Instant Presence Check to quickly diagnose how your business is signaling online before
                moving into intake.
              </p>

              <p className="mt-3 text-white/68 text-sm sm:text-[15px] leading-7">
                {ACT_SERVICE_PAGE.signatureLine}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => navigate("/services/act/fit")}
                  className="rounded-xl px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all
                             bg-gradient-to-r from-[rgba(0,51,255,0.92)] to-[rgba(108,0,255,0.92)]
                             hover:from-[rgba(0,51,255,1)] hover:to-[rgba(108,0,255,1)]
                             focus:outline-none focus:ring-2 focus:ring-white/25"
                >
                  Run Instant Presence Check
                </button>
              </div>
            </div>
          </div>

          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        </header>

        <article className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 md:p-10">
          <h2 className="font-[Space_Grotesk] text-3xl sm:text-4xl font-semibold uppercase tracking-[0.08em]">
            Activation Sequence
          </h2>
          <p className="mt-3 text-white/75 text-sm sm:text-[15px] leading-7 max-w-3xl">
            The delivery ladder for every A.C.T. engagement: Onboard, Capture,
            Build, Activate, Maintain, and Report.
          </p>

          <div className="mt-6">
            <ActActivationSequence steps={ACT_PROCESS_STEPS} />
          </div>
        </article>

        <article className="p-1 sm:p-2 md:p-3">
          <h2 className="text-center font-[Space_Grotesk] text-3xl sm:text-4xl font-semibold uppercase tracking-[0.08em]">
            Packages
          </h2>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
            {ACT_PACKAGES.map((pkg) => (
              <div
                key={pkg.name}
                className="rounded-2xl border border-white/15 bg-black/30 p-5"
              >
                <h3 className="font-[Space_Grotesk] text-2xl font-semibold uppercase tracking-[0.08em]">
                  {pkg.name}
                </h3>
                <p className="mt-2 text-white text-sm sm:text-[15px] font-medium">
                  {pkg.price}
                </p>
                <p className="mt-3 text-white/78 text-sm sm:text-[15px] leading-7">
                  {pkg.bestFor}
                </p>
                <ul className="mt-4 space-y-2 text-white/80 text-sm sm:text-[15px] leading-7">
                  {pkg.includes.map((feature) => (
                    <li key={feature}>• {feature}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <div className="grid grid-cols-1 gap-4">
            <div className="rounded-2xl border border-white/15 bg-black/30 p-3">
              <p className="text-[11px] tracking-[0.18em] text-white/60 font-[Space_Grotesk] uppercase">
                Calendar Booking Preview
              </p>
              <iframe
                title="Book Intro Call"
                src="https://calendly.com/theikigaiproject-ca/30min?hide_event_type_details=1&hide_gdpr_banner=1"
                className="mt-2 h-[30rem] w-full rounded-xl border border-white/10 bg-black/20"
              />
            </div>
          </div>
        </article>

        <article className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <h2 className="font-[Space_Grotesk] text-2xl sm:text-3xl font-semibold uppercase tracking-[0.08em]">
            Fit Profile
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div>
              <p className="text-[11px] tracking-[0.22em] text-white/65 font-[Space_Grotesk] uppercase">
                Ideal Client
              </p>
              <ul className="mt-3 space-y-2 text-white/82 text-sm sm:text-[15px] leading-7">
                {ACT_SERVICE_PAGE.idealClient.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-[11px] tracking-[0.22em] text-white/65 font-[Space_Grotesk] uppercase">
                Not A Fit
              </p>
              <ul className="mt-3 space-y-2 text-white/80 text-sm sm:text-[15px] leading-7">
                {ACT_SERVICE_PAGE.notFor.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => navigate("/services/act/intake")}
              className="rounded-xl px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all
                         bg-gradient-to-r from-[rgba(0,51,255,0.92)] to-[rgba(108,0,255,0.92)]
                         hover:from-[rgba(0,51,255,1)] hover:to-[rgba(108,0,255,1)]
                         focus:outline-none focus:ring-2 focus:ring-white/25"
            >
              Start A.C.T. Intake
            </button>

            <button
              type="button"
              onClick={() => navigate("/services")}
              className="rounded-xl px-5 py-2.5 text-sm font-medium border border-white/20 bg-white/5 text-white/90
                         transition-all hover:border-white/35 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/25"
            >
              Back To Services
            </button>
          </div>
        </article>
      </div>
    </section>
  );
}
