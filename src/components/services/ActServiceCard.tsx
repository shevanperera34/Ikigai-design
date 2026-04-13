import { ACT_SERVICE_CARD } from "../../content/actService";

interface ActServiceCardProps {
  sectionTitleClass: string;
  onActivate: () => void;
  className?: string;
}

export default function ActServiceCard({
  sectionTitleClass,
  onActivate,
  className = "mt-8 sm:mt-10",
}: ActServiceCardProps) {
  return (
    <div
      className={`relative ${className} mx-auto w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 bg-black/70 px-5 sm:px-8 md:px-12 py-8 sm:py-10 md:py-12 shadow-[0_20px_80px_rgba(0,0,0,0.45)]`}
    >
      <h3 className="mb-6 text-center text-5xl font-semibold font-[Space_Grotesk] uppercase tracking-[0.12em] leading-tight sm:hidden">
        {ACT_SERVICE_CARD.title}
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-14 items-start">
        <div className="text-left pt-6 sm:pt-8 md:pt-10">
          <div className="text-[11px] tracking-[0.22em] text-white/80 font-[Space_Grotesk] uppercase">
            {ACT_SERVICE_CARD.coreTag}
          </div>

          <h3 className={sectionTitleClass}>{ACT_SERVICE_CARD.headline}</h3>

          <p className="mt-4 sm:mt-6 text-white/85 text-sm sm:text-base md:text-[15px] leading-7 max-w-xl">
            {ACT_SERVICE_CARD.paragraph}
          </p>

          <ul className="pt-3 space-y-2 text-white/82 text-sm sm:text-[15px] leading-7">
            {ACT_SERVICE_CARD.bullets.map((bullet) => (
              <li key={bullet}>• {bullet}</li>
            ))}
          </ul>

          <div className="mt-6 sm:mt-8 w-full max-w-[420px] sm:max-w-[480px] md:max-w-[520px] mx-auto lg:mx-0 flex justify-center">
            <button
              type="button"
              onClick={onActivate}
              className="w-full max-w-[280px] rounded-xl px-4 py-2 text-sm font-medium
                         text-white shadow-sm transition-all
                         bg-gradient-to-r from-[rgba(0,51,255,0.92)] to-[rgba(108,0,255,0.92)]
                         hover:from-[rgba(0,51,255,1)] hover:to-[rgba(108,0,255,1)]
                         focus:outline-none focus:ring-2 focus:ring-white/25"
            >
              {ACT_SERVICE_CARD.buttonLabel}
            </button>
          </div>
        </div>

        <div className="text-center lg:text-left">
          <h3 className="hidden sm:block text-right text-7xl sm:text-8xl md:text-9xl font-semibold font-[Space_Grotesk] uppercase tracking-[0.12em] break-words leading-tight">
            {ACT_SERVICE_CARD.title}
          </h3>

          <div className="relative w-full max-w-[420px] sm:max-w-[480px] md:max-w-[520px] h-[200px] sm:h-[240px] overflow-hidden rounded-2xl border border-white/15 bg-black/40 mx-auto lg:mx-0 mt-4 sm:mt-6">
            <iframe
              title={ACT_SERVICE_CARD.visualLabel}
              src="https://my.spline.design/untitled-qUEVLzvTd5CHHPt2lNBff9oM-0P6/"
              frameBorder="0"
              className="absolute inset-0 h-full w-full"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
