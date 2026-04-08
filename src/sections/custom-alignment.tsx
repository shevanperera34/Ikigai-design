import { useNavigate } from "react-router-dom";

import SEO from "../components/SEO";
import SEOText from "../components/SEOText";

export default function CustomAlignmentOverview() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen overflow-hidden font-[Inter] text-white">
      <SEO
        title="Custom Alignment | The Ikigai Project"
        description="Custom Alignment helps you identify the right service sequence for your stage before you overspend on the wrong layer."
        path="/services/custom-alignment"
      />
      <SEOText page="services" />

      <div className="pointer-events-none absolute inset-0 -z-20">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-purple-700/5 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(70%_45%_at_50%_-10%,rgba(255,255,255,0.05),transparent)]" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-5 pb-20 pt-28 sm:px-6 md:px-10">
        <section
          className="relative overflow-hidden rounded-2xl border border-white/15 p-6 sm:p-8 md:p-10
                     shadow-[0_20px_80px_rgba(0,0,0,0.35)]"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.04) 100%)",
          }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(80% 60% at 20% -10%, rgba(0,51,255,0.16), transparent 60%), radial-gradient(80% 60% at 120% -10%, rgba(108,0,255,0.16), transparent 60%)",
            }}
          />

          <div className="relative text-center">
            <p className="font-[Space_Grotesk] text-[11px] uppercase tracking-[0.24em] text-white/60">Custom Flow</p>
            <h1 className="mt-3 font-[Space_Grotesk] text-4xl uppercase tracking-widest sm:text-5xl">
              Custom Alignment
            </h1>
            <p className="mx-auto mt-4 max-w-3xl text-white/75 text-[15px] leading-8 sm:text-lg">
              A guided recommendation flow that identifies what your business needs now, what should be deferred, and
              the order that makes execution cleaner.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-3 text-left sm:grid-cols-3">
              {[
                "Answer a short assessment",
                "Unlock a selective aligned path",
                "Send recommendations into quote builder",
              ].map((item) => (
                <div key={item} className="rounded-xl border border-white/15 bg-white/[0.05] p-4 text-sm text-white/80">
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button
                type="button"
                className="rounded-xl px-5 py-2.5 text-sm font-medium text-white transition-all focus:outline-none focus:ring-2 focus:ring-white/20
                           bg-gradient-to-r from-[rgba(0,51,255,0.95)] to-[rgba(108,0,255,0.95)] hover:from-[rgba(0,51,255,1)] hover:to-[rgba(108,0,255,1)]"
                onClick={() => navigate("/services/custom-alignment/builder")}
              >
                Start Alignment
              </button>

              <button
                type="button"
                className="rounded-xl border border-white/20 px-5 py-2.5 text-sm text-white/90 transition hover:border-white/40"
                onClick={() => navigate("/services")}
              >
                Back to Services
              </button>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
