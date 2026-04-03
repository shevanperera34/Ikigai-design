import { useNavigate } from "react-router-dom";

import SEO from "../components/SEO";

export default function ActThankYou() {
  const navigate = useNavigate();

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

      <div className="relative z-10 mx-auto max-w-3xl px-5 sm:px-6 md:px-10 pt-20 sm:pt-24 md:pt-28 pb-20 sm:pb-24">
        <article className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 sm:p-10 text-center">
          <p className="text-[11px] tracking-[0.22em] text-white/70 font-[Space_Grotesk] uppercase">
            A.C.T.
          </p>

          <h1 className="mt-4 font-[Space_Grotesk] text-4xl sm:text-5xl font-semibold uppercase tracking-[0.08em] leading-tight">
            Thank You
          </h1>

          <p className="mt-5 text-white/82 text-sm sm:text-[15px] leading-7">
            Your intake has been received. Next step is a quick review call to
            confirm scope, timeline, and your first activation month.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => navigate("/contact")}
              className="rounded-xl px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all
                         bg-gradient-to-r from-[rgba(0,51,255,0.92)] to-[rgba(108,0,255,0.92)]
                         hover:from-[rgba(0,51,255,1)] hover:to-[rgba(108,0,255,1)]"
            >
              Book Intro Call
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
