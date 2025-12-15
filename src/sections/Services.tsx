// src/sections/Services.tsx
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

/** ─────────────────────────────────────────────────────────────────────────────
 *  Ikigai Brand Tokens (local to this file; swap to a shared brand config later)
 *  Colors: Absolute Black (#000), Deep Electric Blue (#0033FF), Royal Purple (#6C00FF), Pure White (#FFF)
 *  Fonts: Space Grotesk (display, uppercase, tracking-widest), Inter (body)
 *  --------------------------------------------------------------------------- */
const IKIGAI = {
  black: "#000000",
  blue: "#0033FF",
  purple: "#6C00FF",
  white: "#FFFFFF",
};

interface Bundle {
  key: "brand" | "web" | "growth";
  title: string;
  tagline: string;
  includes: string[];
  price: string;
}

const BUNDLES: Bundle[] = [
  {
    key: "brand",
    title: "Brand Systems Build",
    tagline: "Define who you are.",
    includes: ["Logo & identity", "Brand messaging", "Copy systems", "Creative direction"],
    price: "From $1,500",
  },
  {
    key: "web",
    title: "Intelligent Web Infrastructure",
    tagline: "Bring it to life digitally.",
    includes: ["Web design", "Automation setup", "3D integration", "Performance tracking"],
    price: "From $2,000",
  },
  {
    key: "growth",
    title: "Growth Architecture",
    tagline: "Scale with purpose.",
    includes: ["Paid media setup", "Campaign management", "Content funnels", "Analytics & reporting"],
    price: "From $1,200",
  },
];

export default function Services() {
  const navigate = useNavigate();
  const [hoveredKey, setHoveredKey] = useState<Bundle["key"] | null>(null);
  const [selectedKey, setSelectedKey] = useState<Bundle["key"] | null>(null);

  // custom alignment state
  const [customSet, setCustomSet] = useState<Set<Bundle["key"]>>(new Set());
  const [showCustom, setShowCustom] = useState(false);
  const [customLocked, setCustomLocked] = useState(false);

  // toast state
  const [toast, setToast] = useState<{ id: number; message: string } | null>(null);

  const activeKey = showCustom ? null : (selectedKey ?? hoveredKey);
  const active = BUNDLES.find((b) => b.key === activeKey) || null;

  // Venn centers (SVG viewBox is 1000 x 750)
  const coords = useMemo(
    () => ({
      brand: { cx: 500, cy: 290 },
      web: { cx: 370, cy: 460 },
      growth: { cx: 630, cy: 460 },
    }),
    []
  );

  // helper: show toast for ~2s
  const showToast = (message: string) => {
    const id = Date.now();
    setToast({ id, message });
    window.setTimeout(() => {
      setToast((t) => (t && t.id === id ? null : t));
    }, 2000);
  };

  const handleAddOrViewCustom = (key: Bundle["key"]) => {
    if (!customSet.has(key)) {
      const next = new Set(customSet);
      next.add(key);
      setCustomSet(next);
      showToast("Added to Custom Alignment");
    }
    setShowCustom(true);
    setCustomLocked(true);
    setHoveredKey(null);
    setSelectedKey(null);
  };

  const toggleCustom = (key: Bundle["key"]) => {
    const next = new Set(customSet);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    setCustomSet(next);
  };

  const onEnterCircle = (key: Bundle["key"]) => {
    if (customLocked) return;
    setShowCustom(false);
    setHoveredKey(key);
  };

  const onClickCircle = (key: Bundle["key"]) => {
    setCustomLocked(false);
    setShowCustom(false);
    setSelectedKey(key);
  };

  const goToQuote = (bundles: Bundle["key"][]) => {
    if (bundles.length === 0) return;
    navigate("/services/get-quote", { state: { bundles } });
  };

  return (
    <section
      className="relative min-h-screen overflow-hidden font-[Inter] text-white"
      style={{ backgroundColor: IKIGAI.black }}
    >
      {/* Global brand glow layer */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-purple-700/5 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(70%_45%_at_50%_-10%,rgba(255,255,255,0.05),transparent)]" />
      </div>

      {/* toast */}
      {toast && (
        <div className="fixed top-6 left-6 z-[120]">
          <div className="rounded-xl border border-white/15 bg-white/10 backdrop-blur-md px-4 py-2 shadow-[0_8px_40px_rgba(0,0,0,0.5)]">
            <span className="text-sm text-white/95">{toast.message}</span>
          </div>
        </div>
      )}

      {/* Page header (responsive spacing + bigger on small laptops) */}
      <header className="relative z-10 max-w-6xl mx-auto px-5 sm:px-6 md:px-10 pt-10 sm:pt-12 md:pt-16">
        <h1 className="text-center font-[Space_Grotesk] uppercase tracking-widest text-3xl sm:text-4xl md:text-5xl mt-10 sm:mt-12 md:mt-10">
          Find Your Alignment
        </h1>
        <p className="mt-3 text-center text-white/70 text-sm sm:text-base">
          Choose a pathway or build your own. The center is where balance happens.
        </p>
      </header>

      {/* Keyframes */}
      <style>{`
        @keyframes ikigai-rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes ikigai-breathe { 0% { opacity: .08; } 50% { opacity: .16; } 100% { opacity: .08; } }
        @keyframes ikigai-pulse { 0% { transform: translate(-50%, -50%) scale(1); } 50% { transform: translate(-50%, -50%) scale(1.06); } 100% { transform: translate(-50%, -50%) scale(1); } }
      `}</style>

      {/* Main content */}
      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-6 md:px-10 pt-8 pb-24 sm:py-10 md:py-14">  
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-7 sm:gap-8 lg:gap-12">
          {/* Left: Venn */}
          <div className="relative w-full lg:w-[56%] max-w-[820px] mx-auto">
            {/* Responsive sizing wrapper:
                - phones: tall enough to breathe
                - small laptops (MacBook): slightly bigger so it doesn't feel tiny
            */}
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] flex items-center justify-center">
              {/* Breathing center halo */}
              <div
                aria-hidden
                className="pointer-events-none absolute rounded-full blur-3xl"
                style={{
                  width: 340,
                  height: 340,
                  left: "50%",
                  top: "52%",
                  transform: "translate(-50%, -50%)",
                  background: "rgba(255,255,255,0.08)",
                  animation: "ikigai-breathe 6s ease-in-out infinite",
                }}
              />

              {/* active glow */}
              {!showCustom && activeKey && (
                <div
                  aria-hidden
                  className="pointer-events-none absolute rounded-full blur-2xl opacity-80 transition-all duration-300"
                  style={{
                    width: 460,
                    height: 460,
                    left: `${coords[activeKey].cx / 10}%`,
                    top: `${coords[activeKey].cy / 7.5}%`,
                    transform: "translate(-50%, -50%)",
                    background: `radial-gradient(closest-side, rgba(0,51,255,0.22), rgba(108,0,255,0.18), transparent 70%)`,
                    animation: "ikigai-pulse 5s ease-in-out infinite",
                    filter: "drop-shadow(0 0 30px rgba(108,0,255,0.25))",
                  }}
                />
              )}

              {/* orbit */}
              <div
                aria-hidden
                className="pointer-events-none absolute"
                style={{
                  left: "50%",
                  top: "52%",
                  width: 1,
                  height: 1,
                  transform: "translate(-50%, -50%)",
                  animation: "ikigai-rotate 18s linear infinite",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    left: 140,
                    top: -2,
                    width: 6,
                    height: 6,
                    borderRadius: 9999,
                    background: IKIGAI.white,
                    boxShadow: "0 0 12px rgba(255,255,255,0.8)",
                  }}
                />
              </div>

              {/* IMPORTANT: make the SVG fill the wrapper always */}
              <svg
                viewBox="0 0 1000 750"
                className="h-full w-full"
                preserveAspectRatio="xMidYMid meet"
                onMouseLeave={() => setHoveredKey(null)}
                role="img"
                aria-label="Ikigai service alignment Venn diagram"
              >
                {/* dashed ring */}
                <g
                  style={{
                    transformOrigin: "500px 375px",
                    animation: "ikigai-rotate 40s linear infinite",
                  }}
                >
                  <circle
                    cx={500}
                    cy={375}
                    r={240}
                    fill="none"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth={1}
                    strokeDasharray="6 10"
                  />
                </g>

                {/* circles */}
                <circle
                  cx={coords.brand.cx}
                  cy={coords.brand.cy}
                  r={210}
                  fill={IKIGAI.white}
                  opacity={!showCustom && activeKey === "brand" ? 0.22 : 0.14}
                  className="cursor-pointer transition-opacity duration-200"
                  onMouseEnter={() => onEnterCircle("brand")}
                  onClick={() => onClickCircle("brand")}
                />
                <circle
                  cx={coords.web.cx}
                  cy={coords.web.cy}
                  r={210}
                  fill={IKIGAI.white}
                  opacity={!showCustom && activeKey === "web" ? 0.22 : 0.14}
                  className="cursor-pointer transition-opacity duration-200"
                  onMouseEnter={() => onEnterCircle("web")}
                  onClick={() => onClickCircle("web")}
                />
                <circle
                  cx={coords.growth.cx}
                  cy={coords.growth.cy}
                  r={210}
                  fill={IKIGAI.white}
                  opacity={!showCustom && activeKey === "growth" ? 0.22 : 0.14}
                  className="cursor-pointer transition-opacity duration-200"
                  onMouseEnter={() => onEnterCircle("growth")}
                  onClick={() => onClickCircle("growth")}
                />

                {/* Labels */}
{/* Labels (outside circles) */}
<text
  x="500"
  y="65"
  textAnchor="middle"
  fontSize="18"
  fill="white"
  opacity={!showCustom && activeKey === "brand" ? 1 : 0.9}
  filter="url(#labelGlow)"
  className="font-[Space_Grotesk] uppercase tracking-[0.25em] select-none pointer-events-none"
  style={{
    fontWeight: 800,
    paintOrder: "stroke",
    stroke: "rgba(0,0,0,0.65)",
    strokeWidth: 2,
  }}
>
  BRAND SYSTEMS
</text>

<text
  x="270"
  y="700"
  textAnchor="middle"
  fontSize="18"
  fill="white"
  opacity={!showCustom && activeKey === "brand" ? 1 : 0.9}
  filter="url(#labelGlow)"
  className="font-[Space_Grotesk] uppercase tracking-[0.25em] select-none pointer-events-none"
  style={{
    fontWeight: 800,
    paintOrder: "stroke",
    stroke: "rgba(0,0,0,0.65)",
    strokeWidth: 2,
  }}
>
  WEB INFRASTRUCTURE
</text>

<text
  x="730"
  y="700"
  textAnchor="middle"
  fontSize="18"
  fill="white"
  opacity={!showCustom && activeKey === "brand" ? 1 : 0.9}
  filter="url(#labelGlow)"
  className="font-[Space_Grotesk] uppercase tracking-[0.25em] select-none pointer-events-none"
  style={{
    fontWeight: 800,
    paintOrder: "stroke",
    stroke: "rgba(0,0,0,0.65)",
    strokeWidth: 2,
  }}
>
  GROWTH ARCHITECTURE
</text>




                {/* Center CTA */}
{/* Center CTA (SVG-only — works on mobile, no foreignObject) */}
<g
  role="button"
  tabIndex={0}
  aria-label="Custom Alignment"
  cursor="pointer"
  onClick={() => {
    setHoveredKey(null);
    setSelectedKey(null);
    setShowCustom(true);
    setCustomLocked(true);
  }}
  onKeyDown={(e: any) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setHoveredKey(null);
      setSelectedKey(null);
      setShowCustom(true);
      setCustomLocked(true);
    }
  }}
  className="group"
>
  {/* clickable hit box */}
  <rect
    x="418"
    y="360"
    width="164"
    height="104"
    rx="18"
    ry="18"
    fill="rgba(255,255,255,0.00)"
    stroke="rgba(255,255,255,0.00)"
  />

  {/* hover hue (desktop hover) */}
  <rect
    x="418"
    y="350"
    width="164"
    height="104"
    rx="18"
    ry="18"
    fill="url(#ikigaiHue)"
    opacity="0"
    className="transition-opacity duration-300 group-hover:opacity-100"
  />

  {/* subtle glass highlight on hover */}
  <rect
    x="418"
    y="350"
    width="164"
    height="104"
    rx="18"
    ry="18"
    fill="rgba(255,255,255,0.08)"
    opacity="0"
    className="transition-opacity duration-300 group-hover:opacity-100"
  />

  {/* ✅ SELECTED GLOW:
      - Desktop: button glows (rect glow)
      - Mobile: text glows (text filter)
  */}
  {showCustom && (
    <>
      {/* desktop selected glow (behind the button) */}
      <rect
        x="410"
        y="352"
        width="180"
        height="120"
        rx="22"
        ry="22"
        fill="url(#ikigaiHue)"
        opacity="0.28"
        className="hidden sm:block"
        filter="url(#btnGlow)"
      />

      {/* mobile selected glow (text glow only) */}
      {/* we apply filter to the text below via a conditional prop */}
    </>
  )}

  {/* Text always visible */}
  <text
    x="500"
    y="392"
    textAnchor="middle"
    fill="white"
    className="select-none"
    filter={showCustom ? "url(#textGlow)" : undefined}
    style={{
      fontFamily: "Space Grotesk",
      fontSize: 22,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      fontWeight: 700,
    }}
  >
    <tspan x="500" dy="10">Custom</tspan>
    <tspan x="500" dy="30">Alignment</tspan>
  </text>
</g>



{/* Define the hue gradient once inside your <svg> (place near top, e.g. after dashed ring) */}
<defs>
  <linearGradient id="ikigaiHue" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0%" stopColor="rgba(0,51,255,0.95)" />
    <stop offset="100%" stopColor="rgba(108,0,255,0.95)" />
  </linearGradient>

<filter id="labelGlow" x="-50%" y="-50%" width="200%" height="200%">
  <feGaussianBlur stdDeviation="1.4" result="b" />
  <feMerge>
    <feMergeNode in="b" />
    <feMergeNode in="SourceGraphic" />
  </feMerge>
</filter>


  {/* glow for the selected desktop button */}
  <filter id="btnGlow" x="-50%" y="-50%" width="200%" height="200%">
    <feGaussianBlur stdDeviation="10" result="blur" />
    <feColorMatrix
      in="blur"
      type="matrix"
      values="
        1 0 0 0 0
        0 1 0 0 0
        0 0 1 0 0
        0 0 0 0.9 0"
      result="glow"
    />
    <feMerge>
      <feMergeNode in="glow" />
      <feMergeNode in="SourceGraphic" />
    </feMerge>
  </filter>

  {/* glow for selected text (mobile feedback) */}
  <filter id="textGlow" x="-50%" y="-50%" width="200%" height="200%">
    <feGaussianBlur stdDeviation="3.5" result="tBlur" />
    <feMerge>
      <feMergeNode in="tBlur" />
      <feMergeNode in="SourceGraphic" />
    </feMerge>
  </filter>
</defs>



		</svg>
            </div>
          </div>

          {/* Right: Panel (responsive min-height + padding) */}
          <div className="w-full lg:flex-1">
            <div
              className="relative overflow-hidden border border-white/10 rounded-2xl p-5 sm:p-6 md:p-7 backdrop-blur-sm
                         shadow-[0_20px_80px_rgba(0,0,0,0.35)]
                         min-h-[320px] sm:min-h-[360px] md:min-h-[420px]"
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
                    "radial-gradient(80% 60% at 20% -10%, rgba(0,51,255,0.08), transparent 60%), radial-gradient(80% 60% at 120% -10%, rgba(108,0,255,0.08), transparent 60%)",
                }}
              />

              <div className="relative">
                {showCustom ? (
                  <div>
                    <h2 className="text-xl sm:text-2xl font-semibold mb-1.5 font-[Space_Grotesk] uppercase tracking-widest">
                      Custom Alignment
                    </h2>
                    <p className="text-white/70 mb-5 text-sm">
                      Mix &amp; match the areas you want. Items you added are already checked.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      {BUNDLES.map((b) => (
                        <label
                          key={b.key}
                          className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4 hover:border-white/30 transition-colors cursor-pointer"
                        >
                          <input
                            aria-label={`Toggle ${b.title}`}
                            type="checkbox"
                            className="mt-1 h-4 w-4 accent-white"
                            checked={customSet.has(b.key)}
                            onChange={() => toggleCustom(b.key)}
                          />
                          <div>
                            <div className="font-medium">{b.title}</div>
                            <div className="text-xs">{b.tagline}</div>
                          </div>
                        </label>
                      ))}
                    </div>

                    <div className="mt-6 flex flex-wrap gap-3">
                      <button
                        className="rounded-xl border border-white/20 px-4 py-2 text-white/90 hover:border-white/40"
                        onClick={() => {
                          setShowCustom(false);
                          setCustomLocked(false);
                        }}
                      >
                        Done
                      </button>
                      <button
                        className="rounded-xl px-4 py-2 text-sm font-medium
                                   text-white shadow-sm transition-all
                                   bg-gradient-to-r from-[rgba(0,51,255,0.9)] to-[rgba(108,0,255,0.9)]
                                   hover:from-[rgba(0,51,255,1)] hover:to-[rgba(108,0,255,1)]
                                   focus:outline-none focus:ring-2 focus:ring-white/20"
                        onClick={() => goToQuote(Array.from(customSet))}
                      >
                        Get Quote
                      </button>
                    </div>
                  </div>
                ) : active ? (
                  <div>
                    <h2 className="text-xl sm:text-2xl font-semibold mb-1.5 font-[Space_Grotesk] uppercase tracking-widest">
                      {active.title}
                    </h2>
                    <p className="text-white/70 mb-4 text-sm ">{active.tagline}</p>

                    <ul className="text-sm text-white/85 space-y-1.5 mb-5 leading-6">
                      {active.includes.map((item, idx) => (
                        <li key={idx}>• {item}</li>
                      ))}
                    </ul>

                    <p className="font-medium text-white/90">{active.price}</p>

                    <div className="mt-6 flex flex-wrap gap-3">
                      <button
                        className="rounded-xl px-4 py-2 text-sm font-medium
                                   text-white shadow-sm transition-all
                                   bg-gradient-to-r from-[rgba(0,51,255,0.9)] to-[rgba(108,0,255,0.9)]
                                   hover:from-[rgba(0,51,255,1)] hover:to-[rgba(108,0,255,1)]
                                   focus:outline-none focus:ring-2 focus:ring-white/20"
                        onClick={() => goToQuote([active.key])}
                      >
                        Get Quote
                      </button>
                      <button
                        className="rounded-xl border border-white/20 px-4 py-2 text-white/90 hover:border-white/40"
                        onClick={() => handleAddOrViewCustom(active.key)}
                      >
                        {customSet.has(active.key) ? "View Custom Alignment" : "Add to Custom Alignment"}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-white/60 flex items-center justify-center h-[260px] sm:h-[320px]">
                    Hover or click a circle to view details.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

