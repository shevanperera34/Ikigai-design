export function AIPlaceholder() {
  return (
    <section
      className="relative overflow-hidden rounded-2xl border border-white/15 p-5 sm:p-6"
      style={{
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.04) 100%)",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(80% 60% at 20% -10%, rgba(0,51,255,0.12), transparent 60%), radial-gradient(80% 60% at 120% -10%, rgba(108,0,255,0.12), transparent 60%)",
        }}
      />

      <div className="relative">
        <p className="font-[Space_Grotesk] text-[11px] uppercase tracking-[0.24em] text-white/60">
          Future Layer
        </p>
        <h3 className="mt-2 font-[Space_Grotesk] text-xl sm:text-2xl uppercase tracking-widest text-white">
          AI-Enhanced Personalization
        </h3>
        <p className="mt-3 text-sm leading-7 text-white/75">
          AI-enhanced personalization will be added here in a future version. For now, recommendations are generated
          from a deterministic alignment model to keep outputs consistent and transparent.
        </p>
      </div>
    </section>
  );
}
