import { useNavigate } from "react-router-dom";

import SEO from "../components/SEO";
import SEOText from "../components/SEOText";
import { ALIGNMENT_SERVICES } from "../lib/custom-alignment/services";

export default function CustomAlignmentOverview() {
  const navigate = useNavigate();
  const previewServices = ["logo", "voice", "site1"]
    .map((id) => ALIGNMENT_SERVICES.find((service) => service.id === id))
    .filter((service): service is NonNullable<typeof service> => Boolean(service));

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

      <div className="mx-auto w-full max-w-6xl px-4 pb-16 pt-24 sm:px-6 sm:pt-28 md:px-10">
        <p className="mb-6 text-right font-[Space_Grotesk] text-4xl font-semibold tracking-tight text-white/90 sm:text-5xl">
          Custom Alignment
        </p>

        <section className="relative grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-10">
          <article className="relative">
            <div className="relative">
              <h1 className="mt-3 font-[Space_Grotesk] text-[40px] font-semibold leading-[1.12] text-white sm:text-5xl">
                Service Sequencing That Creates <span className="text-[#6C00FF]">Clarity</span>, Then Builds{" "}
                <span className="text-[#3D4DFF]">Momentum</span>.
              </h1>
              <p className="mt-5 max-w-2xl text-[18px] leading-9 text-white/70 sm:text-[19px]">
                Custom Alignment is for teams that want a clear path before they spend. It identifies what to execute
                now, what to defer, and how to sequence services so every move compounds instead of competing.
              </p>

              <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {previewServices.map((service) => (
                  <div key={service.id} className="rounded-xl border border-white/15 bg-white/[0.05] p-4 backdrop-blur-sm">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-white/55">{service.category}</p>
                    <p className="mt-2 text-base font-medium text-white">{service.name}</p>
                    <p className="mt-1 text-sm text-white/70">{service.shortDescription}</p>
                  </div>
                ))}

                <button
                  type="button"
                  className="rounded-xl border border-white/25 bg-white/[0.04] p-4 text-left transition hover:-translate-y-[1px] hover:border-white/45 hover:bg-white/[0.08]"
                  onClick={() =>
                    navigate("/services/get-quote", {
                      state: { source: "custom_alignment_skip_quiz" },
                    })
                  }
                >
                  <p className="text-[11px] uppercase tracking-[0.18em] text-white/55">Legacy Builder</p>
                  <p className="mt-2 text-base font-medium text-white">Preview All Services -&gt;</p>
                  <p className="mt-1 text-sm text-white/70">Skip the quiz and open the classic quote builder menu.</p>
                </button>
              </div>
            </div>
          </article>

          <article
            className="relative overflow-hidden rounded-2xl border border-white/15 p-4 sm:p-5 lg:ml-auto lg:max-w-[30rem]"
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
                  "radial-gradient(80% 60% at 20% -10%, rgba(0,51,255,0.14), transparent 60%), radial-gradient(80% 60% at 120% -10%, rgba(108,0,255,0.14), transparent 60%)",
              }}
            />

            <div className="relative flex flex-col items-end text-right">
              <p className="font-[Space_Grotesk] text-[11px] uppercase tracking-[0.24em] text-white/60">Quiz Flow</p>
              <h2 className="mt-3 font-[Space_Grotesk] text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Take <span className="text-[#6C00FF]">Alignment</span> Quiz
              </h2>

              <div className="mt-7 flex w-full max-w-full flex-col items-center">
                {[
                  "Answer a short assessment",
                  "Unlock a selective aligned path",
                  "Send recommendations into quote builder",
                ].map((item, index, items) => (
                  <div key={item} className="flex w-fit max-w-[26rem] flex-col items-center">
                    <div className="w-fit max-w-[min(88vw,26rem)] rounded-xl border border-white/15 bg-white/[0.05] px-5 py-3 text-right text-sm text-white/80">
                      {item}
                    </div>

                    {index < items.length - 1 && (
                      <div className="relative h-8 w-6" aria-hidden>
                        <div className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 rounded-full bg-[rgba(108,0,255,0.95)] shadow-[0_0_14px_rgba(108,0,255,0.95)]" />
                        <div className="absolute left-1/2 top-0 h-full w-3 -translate-x-1/2 rounded-full bg-[rgba(108,0,255,0.35)] blur-[6px]" />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <button
                type="button"
                className="mt-8 w-full sm:w-auto rounded-xl px-5 py-2.5 text-sm font-medium text-white transition-all focus:outline-none focus:ring-2 focus:ring-white/20
                           bg-gradient-to-r from-[rgba(0,51,255,0.95)] to-[rgba(108,0,255,0.95)] hover:from-[rgba(0,51,255,1)] hover:to-[rgba(108,0,255,1)]"
                onClick={() => navigate("/services/custom-alignment/builder")}
              >
                Start Alignment
              </button>
            </div>
          </article>
        </section>
      </div>
    </section>
  );
}
