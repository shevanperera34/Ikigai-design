// src/sections/Services.tsx
import React, { useMemo, useState } from "react";

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
  const [hoveredKey, setHoveredKey] = useState<Bundle["key"] | null>(null);
  const [selectedKey, setSelectedKey] = useState<Bundle["key"] | null>(null);

  const activeKey = selectedKey ?? hoveredKey;
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

  return (
    <section className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* soft vignette background for depth */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_45%_at_50%_-10%,rgba(255,255,255,0.05),transparent)]" />

      {/* Page header (your global nav should already be above this) */}
      <header className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 pt-12 md:pt-22">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-center">
          Find Your Alignment
        </h1>
        <p className="mt-3 text-center text-white/70">
          Choose a pathway or build your own. The center is where balance happens.
        </p>
      </header>

      <style>{`
        @keyframes ikigai-rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes ikigai-breathe { 0% { opacity: .08; } 50% { opacity: .16; } 100% { opacity: .08; } }
        @keyframes ikigai-pulse { 0% { transform: translate(-50%, -50%) scale(1); } 50% { transform: translate(-50%, -50%) scale(1.06); } 100% { transform: translate(-50%, -50%) scale(1); } }
      `}</style>

      {/* Main content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 py-10 md:py-14">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-12">
          {/* Left: Venn + animated accents */}
          <div className="relative w-full lg:w-[56%] max-w-[720px] mx-auto aspect-[4/3] flex items-center justify-center">
            {/* Breathing center halo */}
            <div
              className="pointer-events-none absolute rounded-full blur-3xl"
              style={{
                width: 420,
                height: 420,
                left: "50%",
                top: "52%",
                transform: "translate(-50%, -50%)",
                background: "rgba(255,255,255,0.08)",
                animation: "ikigai-breathe 6s ease-in-out infinite",
              }}
            />

            {/* Purple glow for active circle */}
            {activeKey && (
              <div
                className="pointer-events-none absolute rounded-full blur-2xl opacity-70 transition-all duration-300"
                style={{
                  width: 500,
                  height: 500,
                  left: `${coords[activeKey].cx / 10}%`,
                  top: `${coords[activeKey].cy / 7.5}%`,
                  transform: "translate(-50%, -50%)",
                  background: "rgba(168,85,247,0.25)",
                  animation: "ikigai-pulse 5s ease-in-out infinite",
                }}
              />
            )}

            {/* Tiny orbiting dot */}
            <div
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
                  left: 150,
                  top: -2,
                  width: 6,
                  height: 6,
                  borderRadius: 9999,
                  background: "white",
                  boxShadow: "0 0 12px rgba(255,255,255,0.8)",
                }}
              />
            </div>

            <svg
              viewBox="0 0 1000 750"
              className="h-full w-full"
              onMouseLeave={() => setHoveredKey(null)}
            >
              {/* slow rotating dashed ring */}
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

              {/* circles (solid white with low opacity; increase on hover/active) */}
              <circle
                cx={coords.brand.cx}
                cy={coords.brand.cy}
                r={210}
                fill="#ffffff"
                opacity={activeKey === "brand" ? 0.22 : 0.14}
                className="cursor-pointer transition-opacity duration-200"
                onMouseEnter={() => setHoveredKey("brand")}
                onClick={() => setSelectedKey("brand")}
              />
              <circle
                cx={coords.web.cx}
                cy={coords.web.cy}
                r={210}
                fill="#ffffff"
                opacity={activeKey === "web" ? 0.22 : 0.14}
                className="cursor-pointer transition-opacity duration-200"
                onMouseEnter={() => setHoveredKey("web")}
                onClick={() => setSelectedKey("web")}
              />
              <circle
                cx={coords.growth.cx}
                cy={coords.growth.cy}
                r={210}
                fill="#ffffff"
                opacity={activeKey === "growth" ? 0.22 : 0.14}
                className="cursor-pointer transition-opacity duration-200"
                onMouseEnter={() => setHoveredKey("growth")}
                onClick={() => setSelectedKey("growth")}
              />

              {/* Labels */}
              <text x="500" y="130" textAnchor="middle" fontSize="18" fill="white">
                Brand Systems
              </text>
              <text x="270" y="680" textAnchor="middle" fontSize="18" fill="white">
                Web Infrastructure
              </text>
              <text x="730" y="680" textAnchor="middle" fontSize="18" fill="white">
                Growth Architecture
              </text>

              {/* Center CTA (small, clean) */}
              <foreignObject x="430" y="355" width="140" height="80">
                <div className="flex h-full w-full items-center justify-center">
                  <button
                    className="rounded-xl bg-white text-black px-3 py-2 text-sm hover:bg-neutral-200 transition-colors"
                    onClick={() => setSelectedKey(null)}
                  >
                    Custom Alignment
                  </button>
                </div>
              </foreignObject>
            </svg>
          </div>

          {/* Right: Details panel */}
          <div className="w-full lg:flex-1">
            <div className="border border-white/10 bg-white/5 rounded-2xl p-6 md:p-7 backdrop-blur-sm shadow-[0_20px_80px_rgba(0,0,0,0.35)] min-h-[420px]">
              {active ? (
                <div>
                  <h2 className="text-2xl font-semibold mb-1.5">{active.title}</h2>
                  <p className="text-white/70 mb-4">{active.tagline}</p>
                  <ul className="text-sm text-white/85 space-y-1.5 mb-5 leading-6">
                    {active.includes.map((item, idx) => (
                      <li key={idx}>• {item}</li>
                    ))}
                  </ul>
                  <p className="font-medium text-white/90">{active.price}</p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <button className="rounded-xl bg-white text-black px-4 py-2 hover:bg-neutral-200">
                      View Details
                    </button>
                    <button className="rounded-xl border border-white/20 px-4 py-2 text-white/90 hover:border-white/40">
                      Add to Custom Alignment
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-white/60 flex items-center justify-center h-[360px]">
                  Hover or click a circle to view details.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

