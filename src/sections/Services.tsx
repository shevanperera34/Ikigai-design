// src/sections/Services.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import SEO from "../components/SEO";
import SEOText from "../components/SEOText";

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

// CareSafe scene
const CLINIC_SPLINE_URL =
  "https://prod.spline.design/CeXiSwuOLmXBsv98/scene.splinecode";

interface Bundle {
  key: "brand" | "web" | "growth";
  title: string;
  tagline: string;
  short_description: string;
  includes: string[];
  price: string;
}

const BUNDLES: Bundle[] = [
  {
    key: "brand",
    title: "Brand Systems Build",
    tagline: "Define who you are, and make it unmistakable",
    short_description:
      "Brand systems that clarify your identity, sharpen your messaging, and give every touchpoint a consistent foundation",
    includes: [
      "Logo & visual identity",
      "Brand messaging & positioning",
      "Conversion-focused copy systems",
      "Creative direction",
    ],
    price: "From $600",
  },
  {
    key: "web",
    title: "Intelligent Web Infrastructure",
    tagline: "High-performance websites and systems built to scale",
    short_description:
      "We design and develop fast, scalable websites with automation, tracking, and modern interactions built in from day one",
    includes: [
      "Web design & development",
      "Automation & CRM setup",
      "3D & interactive integration",
      "Performance & analytics tracking",
    ],
    price: "From $999",
  },
  {
    key: "growth",
    title: "Growth Architecture",
    tagline: "Growth systems that turn traffic into momentum",
    short_description:
      "Paid media, funnels, and reporting designed to grow what’s already aligned, not paper over broken foundations",
    includes: [
      "Paid media setup (Meta & Google)",
      "Campaign management",
      "Content & funnel systems",
      "Analytics & reporting",
    ],
    price: "From $949",
  },
];

const PRIMARY_CTA: Record<Bundle["key"], string> = {
  brand: "Build My Brand",
  web: "Build My Website",
  growth: "Plan My Growth",
};

export default function Services() {
  const navigate = useNavigate();
  const sectionTitleClass =
    "text-3xl sm:text-5xl md:text-6xl font-semibold font-[Space_Grotesk] uppercase tracking-widest break-words leading-tight";
  const [hoveredKey, setHoveredKey] = useState<Bundle["key"] | null>(null);
  const [selectedKey, setSelectedKey] = useState<Bundle["key"] | null>(null);

  // custom alignment state
  const [customSet, setCustomSet] = useState<Set<Bundle["key"]>>(new Set());
  const [showCustom, setShowCustom] = useState(false);
  const [customLocked, setCustomLocked] = useState(false);

  // toast state
  const [toast, setToast] = useState<{ id: number; message: string } | null>(
    null
  );

  // ✅ ref for clinic spline wrapper (used to block wheel zoom)
  const clinicSplineWrapRef = useRef<HTMLDivElement | null>(null);

  // Load Spline viewer script once
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

  // ✅ Prevent scroll-wheel/trackpad from zooming inside the Spline canvas.
  // (No preventDefault, so the page still scrolls normally.)
  useEffect(() => {
    const wrap = clinicSplineWrapRef.current;
    if (!wrap) return;

    const stop = (e: Event) => {
      e.stopPropagation();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (e as any).stopImmediatePropagation?.();
    };

    const onWheel = (e: WheelEvent) => stop(e);

    wrap.addEventListener("wheel", onWheel, { capture: true });

    // Safari pinch/gesture zoom events
    wrap.addEventListener("gesturestart", stop as EventListener, {
      capture: true,
    });
    wrap.addEventListener("gesturechange", stop as EventListener, {
      capture: true,
    });

    return () => {
      wrap.removeEventListener("wheel", onWheel, true);
      wrap.removeEventListener("gesturestart", stop as EventListener, true);
      wrap.removeEventListener("gesturechange", stop as EventListener, true);
    };
  }, []);

  const activeKey = showCustom ? null : selectedKey ?? hoveredKey;
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

  const showToastMsg = (message: string) => {
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
      showToastMsg("Added to Custom Alignment");
    }
    setShowCustom(true);
    setCustomLocked(true);
    setHoveredKey(null);
    setSelectedKey(null);
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

  const goToGetQuote = () => navigate("/services/get-quote");

  const goToQuote = (bundles: Bundle["key"][]) => {
    if (bundles.length === 0) return;
    navigate("/services/get-quote", { state: { bundles } });
  };

  return (
    <section
      className="relative overflow-hidden font-[Inter] text-white"
      style={{ backgroundColor: IKIGAI.black }}
    >
      <SEO
        title="The Ikigai Project | Brand Systems, Web Infrastructure & Growth Architecture"
        description="A human-first digital studio building brand systems, intelligent websites, and growth architecture for companies that want clarity, speed, and real results."
        path="/services"
      />
      <SEOText page="services" />

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

      {/* Keyframes */}
      <style>{`
        @keyframes ikigai-rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes ikigai-breathe { 0% { opacity: .08; } 50% { opacity: .16; } 100% { opacity: .08; } }
        @keyframes ikigai-pulse { 0% { transform: translate(-50%, -50%) scale(1); } 50% { transform: translate(-50%, -50%) scale(1.06); } 100% { transform: translate(-50%, -50%) scale(1); } }
      `}</style>

      {/* ───────────────────────── SECTION 1: ALIGNMENT (Glassy Canvas) ───────────────────────── */}
      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-6 md:px-10 pt-12 sm:pt-14 md:pt-20 pb-20 sm:pb-24 md:pb-28">
        {/* ✅ Header OUTSIDE glass border */}
        

        <div
          className="relative mt-10 overflow-hidden rounded-3xl border border-white/10 shadow-[0_20px_80px_rgba(0,0,0,0.45)]"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.03) 100%)",
          }}
        >
          {/* subtle glass glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(80% 60% at 20% -10%, rgba(0,51,255,0.10), transparent 60%), radial-gradient(80% 60% at 120% -10%, rgba(108,0,255,0.10), transparent 60%)",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(70% 80% at 50% 120%, rgba(0,0,0,0.10), rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.55) 100%)",
            }}
          />

          <div className="relative p-6 sm:p-8 md:p-10">
            {/* Venn */}
            <div className="grid w-full grid-cols-1 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] gap-8 lg:gap-10 items-center">
              <div className="w-full">
                <h3 className="mb-5 text-center lg:text-left font-bold font-[Space_Grotesk] uppercase tracking-[0.22em] text-3xl sm:text-4xl md:text-5xl text-white/90">
                  Custom Alignment
                </h3>
                <div className="relative w-full max-w-[820px] mx-auto lg:mx-0">
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
                      opacity={!showCustom && activeKey === "web" ? 1 : 0.9}
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
                      opacity={!showCustom && activeKey === "growth" ? 1 : 0.9}
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
                        navigate("/services/alignment");
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

                      {/* ✅ removed the showCustom rectangle highlight that was showing as a white box */}

                      <text
                        x="500"
                        y="392"
                        textAnchor="middle"
                        fill="white"
                        className="select-none"
                        filter={showCustom ? "url(#textGlow)" : undefined}
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
                    </g>

                    <defs>
                      <linearGradient id="ikigaiHue" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="rgba(0,51,255,0.95)" />
                        <stop offset="100%" stopColor="rgba(108,0,255,0.95)" />
                      </linearGradient>

                      <filter
                        id="labelGlow"
                        x="-50%"
                        y="-50%"
                        width="200%"
                        height="200%"
                      >
                        <feGaussianBlur stdDeviation="1.4" result="b" />
                        <feMerge>
                          <feMergeNode in="b" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>

                      <filter
                        id="btnGlow"
                        x="-50%"
                        y="-50%"
                        width="200%"
                        height="200%"
                      >
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

                      <filter
                        id="textGlow"
                        x="-50%"
                        y="-50%"
                        width="200%"
                        height="200%"
                      >
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
              </div>

              {/* Copy block */}
              <div className="w-full max-w-[920px] mx-auto lg:mx-0 text-center lg:text-left">
                <div className="text-[11px] tracking-[0.22em] text-white/80 font-[Space_Grotesk] uppercase">
                  Core Solution
                </div>

                <h2 className={`mt-0 ${sectionTitleClass}`}>
                  Find the right build sequence
                </h2>

                <div className="mt-4 text-white/75 text-sm sm:text-[15px] leading-7 space-y-3 max-w-[860px] mx-auto">
                  <p>
                  Clarify what your business needs before you build. Identify the right priorities 
                  across brand, web, and growth, then move forward with a clear plan.
                  </p>
                  <ul className="pt-1 space-y-2 text-white/82 text-sm sm:text-[15px] leading-7">
                    <li>• Diagnostic and strategic starting point</li>
                    <li>• Connects brand, web, and growth decisions</li>
                    <li>• Leads into the right implementation path</li>
                  </ul>
                </div>

                <div className="mt-7 flex justify-center lg:justify-start">
                  <button
                    className="w-full max-w-[280px] rounded-xl px-4 py-2 text-sm font-medium
                               text-white shadow-sm transition-all
                               bg-gradient-to-r from-[rgba(0,51,255,0.9)] to-[rgba(108,0,255,0.9)]
                               hover:from-[rgba(0,51,255,1)] hover:to-[rgba(108,0,255,1)]
                               focus:outline-none focus:ring-2 focus:ring-white/20"
                    onClick={() => navigate("/services/alignment")}
                  >
                    More
                  </button>
                </div>
              </div>
            </div>
            {/* end alignment canvas */}
          </div>
        </div>
      </div>

      {/* ───────────────────────── SECTION 2: CLINIC (Text blended onto Spline) ───────────────────────── */}
      <section className="relative z-10 max-w-6xl mx-auto px-5 sm:px-6 md:px-10 pb-28 sm:pb-32 md:pb-36">
       

        <div className="relative mt-6 sm:mt-10 mx-auto w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 bg-black/70 px-5 sm:px-8 md:px-12 py-8 sm:py-10 md:py-12 shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
          <h3 className="mb-6 text-center text-5xl font-semibold font-[Space_Grotesk] uppercase tracking-[0.12em] leading-tight sm:hidden">
            InfraCare
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-14 items-start">
            <div className="text-left pt-6 sm:pt-8 md:pt-10">
              <div className="text-[11px] tracking-[0.22em] text-white/80 font-[Space_Grotesk] uppercase">
                Core Solution
              </div>
              <h3 className={sectionTitleClass}>
                RUN STABLE. GROW CLEAN.
              </h3>

              <p className="mt-4 sm:mt-6 text-white/85 text-sm sm:text-base md:text-[15px] leading-7 max-w-xl">
                Stabilize and improve the systems your business runs on. Ongoing
                support, security, and operational infrastructure improvement for
                growing organizations.
              </p>
              <ul className="pt-3 space-y-2 text-white/82 text-sm sm:text-[15px] leading-7">
                    <li>• Support, security, and technical stability</li>
                    <li>• Built for ongoing operational reliability</li>
                  </ul>
            </div>

            <div className="text-center lg:text-left">
              <h3 className="hidden sm:block text-right text-7xl sm:text-8xl md:text-9xl font-semibold font-[Space_Grotesk] uppercase tracking-[0.12em] break-words leading-tight">
                InfraCare
              </h3>

              <div
                ref={clinicSplineWrapRef}
                className="relative w-full max-w-[420px] sm:max-w-[480px] md:max-w-[520px] h-[200px] sm:h-[240px] overflow-hidden mx-auto lg:mx-0 mt-4 sm:mt-6"
                style={{ touchAction: "pan-y" }}
              >
                <spline-viewer
                  url={CLINIC_SPLINE_URL}
                  className="absolute inset-0 block w-full h-full"
                  style={{
                    transform: "translateY(-10px) scale(0.9)",
                    transformOrigin: "center center",
                  }}
                />
              </div>

              <div className="mt-6 sm:mt-8 w-full max-w-[420px] sm:max-w-[480px] md:max-w-[520px] mx-auto lg:mx-0 flex justify-center">
                <button
                  className="w-full max-w-[280px] rounded-xl px-4 py-2 text-sm font-medium
                             text-white shadow-sm transition-all
                             bg-gradient-to-r from-[rgba(0,51,255,0.92)] to-[rgba(108,0,255,0.92)]
                             hover:from-[rgba(0,51,255,1)] hover:to-[rgba(108,0,255,1)]
                             focus:outline-none focus:ring-2 focus:ring-white/25"
                  onClick={() => navigate("/services/caresafe")}
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
