import { useNavigate } from "react-router-dom";

import SEO from "../components/SEO";

export default function ActReportDemo() {
  const navigate = useNavigate();

  const metrics = [
    { label: "Posts Published", value: "14" },
    { label: "Reels Delivered", value: "7" },
    { label: "Calendar Adherence", value: "96%" },
    { label: "Profile Actions", value: "+38%" },
  ];

  const highlights = [
    "Consistent weekly publishing cadence maintained for full month",
    "Content mix improved from static-only to static + reels + stories",
    "Most engagement came from behind-the-scenes and service proof posts",
    "Next cycle recommendation: keep cadence, test one focused offer",
  ];

  return (
    <section className="relative overflow-hidden bg-black font-[Inter] text-white">
      <SEO
        title="See a Sample Monthly Report | A.C.T."
        description="Preview the reporting view A.C.T. clients receive each month, including output, cadence, and next-step adjustments."
        path="/services/act/report-demo"
      />

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-purple-700/5 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-5 sm:px-6 md:px-10 pt-14 sm:pt-16 md:pt-20 pb-20 sm:pb-24 space-y-6 sm:space-y-8">
        <header className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <p className="text-[11px] tracking-[0.22em] text-white/70 font-[Space_Grotesk] uppercase">
            Proof of Delivery
          </p>
          <h1 className="mt-3 font-[Space_Grotesk] text-4xl sm:text-5xl font-semibold uppercase tracking-[0.08em] leading-tight">
            See a Sample Monthly Report
          </h1>
          <p className="mt-4 text-white/80 text-sm sm:text-[15px] leading-7">
            Preview the reporting view clients receive each month. A.C.T.
            reporting stays focused on clarity: what shipped, how consistently
            it shipped, and what adjusts next.
          </p>
        </header>

        <article className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <h2 className="font-[Space_Grotesk] text-2xl sm:text-3xl font-semibold uppercase tracking-[0.08em]">
            Preview the Reporting View
          </h2>
          <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-2xl border border-white/15 bg-black/35 p-4"
              >
                <p className="text-[11px] tracking-[0.16em] uppercase text-white/60 font-[Space_Grotesk]">
                  {metric.label}
                </p>
                <p className="mt-2 text-2xl sm:text-3xl font-semibold text-white">
                  {metric.value}
                </p>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <h2 className="font-[Space_Grotesk] text-2xl sm:text-3xl font-semibold uppercase tracking-[0.08em]">
            Key Highlights
          </h2>
          <ul className="mt-4 space-y-2 text-white/80 text-sm sm:text-[15px] leading-7">
            {highlights.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </article>

        <article className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <h2 className="font-[Space_Grotesk] text-2xl sm:text-3xl font-semibold uppercase tracking-[0.08em]">
            Next-Month Adjustments
          </h2>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="rounded-2xl border border-white/15 bg-black/35 p-4">
              <p className="text-sm text-white/90 font-medium">Content Angle</p>
              <p className="mt-2 text-white/75 text-sm leading-6">Increase proof-style posts from 2 to 4.</p>
            </div>
            <div className="rounded-2xl border border-white/15 bg-black/35 p-4">
              <p className="text-sm text-white/90 font-medium">Cadence</p>
              <p className="mt-2 text-white/75 text-sm leading-6">Keep 3-4 weekly touchpoints with story support.</p>
            </div>
            <div className="rounded-2xl border border-white/15 bg-black/35 p-4">
              <p className="text-sm text-white/90 font-medium">Offer Test</p>
              <p className="mt-2 text-white/75 text-sm leading-6">Run one focused campaign around a seasonal offer.</p>
            </div>
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => navigate("/contact")}
              className="rounded-xl px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all
                         bg-gradient-to-r from-[rgba(0,51,255,0.92)] to-[rgba(108,0,255,0.92)]
                         hover:from-[rgba(0,51,255,1)] hover:to-[rgba(108,0,255,1)]"
            >
              Book A.C.T. Intro Call
            </button>

            <button
              type="button"
              onClick={() => navigate("/services/act")}
              className="rounded-xl px-5 py-2.5 text-sm font-medium border border-white/20 bg-white/5 text-white/90
                         transition-all hover:border-white/35 hover:text-white"
            >
              Back To A.C.T.
            </button>
          </div>
        </article>
      </div>
    </section>
  );
}
