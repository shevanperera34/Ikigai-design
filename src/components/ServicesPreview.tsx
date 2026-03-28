// src/components/ServicesPreview.tsx
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

const CARESAFE_SPLINE_URL =
  "https://prod.spline.design/CeXiSwuOLmXBsv98/scene.splinecode";
const CARESAFE_SPLINE_URL_MOBILE =
  "https://prod.spline.design/CeXiSwuOLmXBsv98/scene.splinecode";

function SplineViewer(props: {
  url: string;
  className?: string;
  loading?: string;
  style?: React.CSSProperties;
}) {
  return React.createElement("spline-viewer", { ...props } as any);
}

function CustomAlignmentAnimation() {
  const coords = useMemo(
    () => ({
      brand: { cx: 500, cy: 290 },
      web: { cx: 370, cy: 460 },
      growth: { cx: 630, cy: 460 },
    }),
    []
  );

  return (
    <div className="relative mx-auto w-full max-w-[430px]">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(108,0,255,0.28) 0%, rgba(0,51,255,0.22) 38%, rgba(0,0,0,0) 75%)",
          animation: "preview-breathe 6s ease-in-out infinite",
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-px w-px -translate-x-1/2 -translate-y-1/2"
        style={{ animation: "preview-rotate 18s linear infinite" }}
      >
        <div className="absolute left-[112px] top-0 h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)]" />
      </div>

      <svg
        viewBox="0 0 1000 750"
        className="h-full w-full"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Custom Alignment animation"
      >
        <g
          style={{
            transformOrigin: "500px 375px",
            animation: "preview-rotate 40s linear infinite",
          }}
        >
          <circle
            cx={500}
            cy={375}
            r={240}
            fill="none"
            stroke="rgba(255,255,255,0.20)"
            strokeWidth={1}
            strokeDasharray="6 10"
          />
        </g>

        <circle cx={coords.brand.cx} cy={coords.brand.cy} r={210} fill="white" opacity={0.16} />
        <circle cx={coords.web.cx} cy={coords.web.cy} r={210} fill="white" opacity={0.16} />
        <circle cx={coords.growth.cx} cy={coords.growth.cy} r={210} fill="white" opacity={0.16} />

        <text
          x="500"
          y="65"
          textAnchor="middle"
          fontSize="18"
          fill="white"
          opacity="0.9"
          className="font-[Space_Grotesk] uppercase tracking-[0.25em] select-none pointer-events-none"
          style={{ fontWeight: 800, paintOrder: "stroke", stroke: "rgba(0,0,0,0.6)", strokeWidth: 2 }}
        >
          BRAND SYSTEMS
        </text>

        <text
          x="270"
          y="700"
          textAnchor="middle"
          fontSize="18"
          fill="white"
          opacity="0.9"
          className="font-[Space_Grotesk] uppercase tracking-[0.25em] select-none pointer-events-none"
          style={{ fontWeight: 800, paintOrder: "stroke", stroke: "rgba(0,0,0,0.6)", strokeWidth: 2 }}
        >
          WEB INFRASTRUCTURE
        </text>

        <text
          x="730"
          y="700"
          textAnchor="middle"
          fontSize="18"
          fill="white"
          opacity="0.9"
          className="font-[Space_Grotesk] uppercase tracking-[0.25em] select-none pointer-events-none"
          style={{ fontWeight: 800, paintOrder: "stroke", stroke: "rgba(0,0,0,0.6)", strokeWidth: 2 }}
        >
          GROWTH ARCHITECTURE
        </text>

        <rect x="410" y="350" width="180" height="120" rx="22" ry="22" fill="url(#previewHue)" opacity="0.28" />
        <text
          x="500"
          y="392"
          textAnchor="middle"
          fill="white"
          className="select-none"
          style={{
            fontFamily: "Space Grotesk",
            fontSize: 26,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            fontWeight: 900,
          }}
        >
          <tspan x="500" dy="10">
            Custom
          </tspan>
          <tspan x="500" dy="30">
            Alignment
          </tspan>
        </text>

        <defs>
          <linearGradient id="previewHue" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(0,51,255,0.95)" />
            <stop offset="100%" stopColor="rgba(108,0,255,0.95)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export default function ServicesPreview() {
  const navigate = useNavigate();
  const [isMobileViewport, setIsMobileViewport] = useState(false);

  useEffect(() => {
    const id = "spline-viewer-script";
    if (document.getElementById(id)) return;

    const script = document.createElement("script");
    script.id = id;
    script.type = "module";
    script.src =
      "https://unpkg.com/@splinetool/viewer@1.12.61/build/spline-viewer.js";
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(max-width: 767px)");

    const syncViewport = () => setIsMobileViewport(media.matches);
    syncViewport();

    media.addEventListener("change", syncViewport);
    return () => media.removeEventListener("change", syncViewport);
  }, []);

  const activeSplineUrl = isMobileViewport
    ? CARESAFE_SPLINE_URL_MOBILE
    : CARESAFE_SPLINE_URL;

  const primaryButtonClass =
    "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium text-black " +
    "bg-white transition-all hover:-translate-y-[1px] hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/30";

  const secondaryButtonClass =
    "inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-medium text-white/90 " +
    "border border-white/20 bg-white/5 transition-all hover:-translate-y-[1px] hover:border-white/35 hover:text-white";

  return (
    <section className="relative overflow-hidden font-[Inter] text-white">
      <style>{`
        @keyframes preview-rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes preview-breathe { 0% { opacity: .12; } 50% { opacity: .24; } 100% { opacity: .12; } }
      `}</style>

      <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(to_right,rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:28px_28px]" />

      <div className="relative mx-auto max-w-6xl px-6 md:px-10">
        <header className="mx-auto max-w-4xl text-center">
          <h2 className="font-[Space_Grotesk] text-4xl sm:text-5xl md:text-6xl font-semibold leading-[0.95] tracking-tight">
            Two core solutions. One connected system.
          </h2>
          <p className="mt-5 text-white/70 text-base sm:text-lg leading-8">
            Ikigai helps businesses move forward in two ways: Custom Alignment
            brings clarity to what should be built across brand, web, and
            growth, while InfraCare supports, stabilizes, and improves the
            infrastructure behind day-to-day operations.
          </p>
        </header>

        <div className="mt-10 space-y-6 sm:space-y-8">
          <article className="relative overflow-hidden rounded-[28px] border border-white/15 bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0.03)_100%)] p-6 sm:p-8 md:p-10 shadow-[0_20px_80px_rgba(0,0,0,0.35)]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_20%_-10%,rgba(0,51,255,0.14),transparent_60%),radial-gradient(80%_60%_at_120%_-10%,rgba(108,0,255,0.14),transparent_60%)]" />
            <div className="relative grid grid-cols-1 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] items-center gap-8 lg:gap-10">
              <div>
                <span className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 p-3 text-white/85">
                  <Sparkles size={16} />
                </span>
                <p className="mt-5 text-[11px] font-[Space_Grotesk] uppercase tracking-[0.25em] text-white/60">
                  Core Solution
                </p>
                <h3 className="mt-2 font-[Space_Grotesk] text-4xl sm:text-5xl font-semibold tracking-tight">
                  Custom Alignment
                </h3>
                <p className="mt-4 max-w-2xl text-white/75 text-[15px] leading-8">
                  Find the right build path for your business before resources
                  get spread across the wrong priorities. Custom Alignment helps
                  identify what should happen across brand, web, and growth, then
                  turns that into a clearer sequence and scope.
                </p>
                <ul className="mt-5 space-y-2.5 text-white/85 text-[15px]">
                  <li>• Strategic clarity before implementation</li>
                  <li>• Connects brand, web, and growth decisions</li>
                  <li>• Leads into the right next build path</li>
                </ul>
                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => navigate("/services/alignment")}
                    className={primaryButtonClass}
                  >
                    Explore Custom Alignment <ArrowRight size={15} />
                  </button>
                </div>
              </div>

              <div className="px-1 sm:px-4 lg:px-0">
                <CustomAlignmentAnimation />
              </div>
            </div>
          </article>

          <article className="relative overflow-hidden rounded-[28px] border border-white/15 bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0.03)_100%)] p-6 sm:p-8 md:p-10 shadow-[0_20px_80px_rgba(0,0,0,0.35)]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_20%_-10%,rgba(0,51,255,0.14),transparent_60%),radial-gradient(80%_60%_at_120%_-10%,rgba(108,0,255,0.14),transparent_60%)]" />
            <div className="relative grid grid-cols-1 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] items-center gap-8 lg:gap-10">
              <div>
                <span className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 p-3 text-white/85">
                  <ShieldCheck size={16} />
                </span>
                <p className="mt-5 text-[11px] font-[Space_Grotesk] uppercase tracking-[0.25em] text-white/60">
                  Core Solution
                </p>
                <h3 className="mt-2 font-[Space_Grotesk] text-4xl sm:text-5xl font-semibold tracking-tight">
                  InfraCare
                </h3>
                <p className="mt-4 max-w-2xl text-white/75 text-[15px] leading-8">
                  Stabilize, support, and improve the systems your business
                  depends on. InfraCare is a remote-first support model built for
                  stronger technical reliability, clearer ownership, healthier
                  security foundations, and more structured improvement over time.
                </p>
                <ul className="mt-5 space-y-2.5 text-white/85 text-[15px]">
                  <li>• Remote-first support with on-site when needed</li>
                  <li>• Documentation, security, and operational clarity</li>
                  <li>• Built for reliability now and stronger infrastructure later</li>
                </ul>
                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => navigate("/services/caresafe")}
                    className={primaryButtonClass}
                  >
                    Explore InfraCare <ArrowRight size={15} />
                  </button>
                </div>
              </div>

              <div className="mx-auto w-full max-w-[420px]">
                <div
                  className="relative h-[240px] w-full overflow-hidden rounded-2xl border border-white/15 bg-black/25 sm:h-[300px]"
                  style={{ touchAction: "pan-y" }}
                >
                  <SplineViewer
                    url={activeSplineUrl}
                    className="absolute inset-0 block h-full w-full pointer-events-none"
                    style={{
                      transform: isMobileViewport
                        ? "translateY(8%) scale(1.28)"
                        : "translateY(6%) scale(1.08)",
                      transformOrigin: "center center",
                    }}
                  />
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
