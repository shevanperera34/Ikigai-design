// src/sections/Services.tsx
import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
   
  // updated: open custom from details panel
const handleAddOrViewCustom = (key: Bundle["key"]) => {
  if (!customSet.has(key)) {
    const next = new Set(customSet);
    next.add(key);
    setCustomSet(next);
    showToast("Added to Custom Alignment");
  }
  setShowCustom(true);
  setCustomLocked(true);        // <-- lock in custom view
  setHoveredKey(null);
  setSelectedKey(null);
};



  // toggle from the Custom Alignment tile checkboxes
  const toggleCustom = (key: Bundle["key"]) => {
    const next = new Set(customSet);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    setCustomSet(next);
  };

  // updated: hover and click handlers for circles
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
    <section className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* toast (top-left) */}
      {toast && (
        <div className="fixed top-6 left-6 z-[120]">
          <div className="rounded-xl border border-white/15 bg-white/10 backdrop-blur-md px-4 py-2 shadow-[0_8px_40px_rgba(0,0,0,0.5)]">
            <span className="text-sm text-white/95">{toast.message}</span>
          </div>
        </div>
      )}

      {/* soft vignette background for depth */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_45%_at_50%_-10%,rgba(255,255,255,0.05),transparent)]" />

      {/* Page header */}
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
            {(!showCustom && activeKey) && (
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

              {/* circles */}
              <circle
                cx={coords.brand.cx}
                cy={coords.brand.cy}
                r={210}
                fill="#ffffff"
                opacity={!showCustom && activeKey === "brand" ? 0.22 : 0.14}
                className="cursor-pointer transition-opacity duration-200"
                onMouseEnter={() => onEnterCircle("brand")}
                onClick={() => onClickCircle("brand")}
              />
              <circle
                cx={coords.web.cx}
                cy={coords.web.cy}
                r={210}
                fill="#ffffff"
                opacity={!showCustom && activeKey === "web" ? 0.22 : 0.14}
                className="cursor-pointer transition-opacity duration-200"
                onMouseEnter={() => onEnterCircle("web")}
                onClick={() => onClickCircle("web")}
              />
              <circle
                cx={coords.growth.cx}
                cy={coords.growth.cy}
                r={210}
                fill="#ffffff"
                opacity={!showCustom && activeKey === "growth" ? 0.22 : 0.14}
                className="cursor-pointer transition-opacity duration-200"
                onMouseEnter={() => onEnterCircle("growth")}
                onClick={() => onClickCircle("growth")}
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

              {/* Center CTA */}
              <foreignObject x="430" y="355" width="140" height="80">
                <div className="flex h-full w-full items-center justify-center">
                  <button
                    className="rounded-xl bg-white text-black px-3 py-2 text-sm hover:bg-neutral-200 transition-colors"
                    onClick={() => {
                      setHoveredKey(null);
                      setSelectedKey(null);
                      setShowCustom(true);
		      setCustomLocked(true);
                    }}
                  >
                    Custom Alignment
                  </button>
                </div>
              </foreignObject>
            </svg>
          </div>

          {/* Right: Panel */}
          <div className="w-full lg:flex-1">
            <div className="border border-white/10 bg-white/5 rounded-2xl p-6 md:p-7 backdrop-blur-sm shadow-[0_20px_80px_rgba(0,0,0,0.35)] min-h-[420px]">
              {/* CUSTOM ALIGNMENT VIEW */}
              {showCustom ? (
                <div>
                  <h2 className="text-2xl font-semibold mb-1.5">Custom Alignment</h2>
                  <p className="text-white/70 mb-5">
                    Mix & match the areas you want. Items you added are already checked.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {BUNDLES.map((b) => (
                      <label
                        key={b.key}
                        className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4 hover:border-white/30 transition-colors cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          className="mt-1 h-4 w-4 accent-white"
                          checked={customSet.has(b.key)}
                          onChange={() => toggleCustom(b.key)}
                        />
                        <div>
                          <div className="font-medium">{b.title}</div>
                          <div className="text-xs text-white/70">{b.tagline}</div>
                        </div>
                      </label>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <button
                      className="rounded-xl bg-white text-black px-4 py-2 hover:bg-neutral-200"
                      onClick={() => {setShowCustom(false); setCustomLocked(false);}}
                    >
                      Done
                    </button>
                    <button
                      className="rounded-xl border border-white/20 px-4 py-2 text-white/90 hover:border-white/40"
                      onClick={() => goToQuote(Array.from(customSet))}
                    >
                      Get Quote
                    </button>
                  </div>
                </div>
              ) : /* BUNDLE DETAILS */ active ? (
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
                    <button className="rounded-xl bg-white text-black px-4 py-2 hover:bg-neutral-200" onClick={() => goToQuote([active.key])}>
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

