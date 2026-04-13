import type { AlignmentRecommendationResult } from "../../lib/custom-alignment/recommendation-engine";

interface BlurredRecommendationPreviewProps {
  result: AlignmentRecommendationResult;
}

export function BlurredRecommendationPreview({ result }: BlurredRecommendationPreviewProps) {
  const topServices = result.neededNow.slice(0, 3);

  return (
    <section
      className="relative overflow-hidden rounded-2xl border border-white/15 p-5 sm:p-6"
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
            "radial-gradient(80% 60% at 20% -10%, rgba(0,51,255,0.15), transparent 60%), radial-gradient(80% 60% at 120% -10%, rgba(108,0,255,0.15), transparent 60%)",
        }}
      />

      <div className="relative text-center">
        <p className="font-[Space_Grotesk] text-[11px] uppercase tracking-[0.24em] text-white/60">Preview</p>
        <h3 className="mt-2 font-[Space_Grotesk] text-2xl sm:text-3xl uppercase tracking-widest text-white">
          Your Alignment Snapshot
        </h3>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {topServices.map((service) => (
            <div
              key={service.id}
              className="rounded-xl border border-white/15 bg-white/[0.05] p-3 text-center text-sm text-white/75 backdrop-blur-sm"
            >
              <p className="text-[11px] uppercase tracking-[0.18em] text-white/55">{service.category}</p>
              <p className="mt-2 font-medium text-white">{service.name}</p>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-4 max-w-lg text-xs text-white/50">
          Unlock your full recommendation to see selected-now services, deferred services, rationale, and sequence.
        </p>
      </div>
    </section>
  );
}
