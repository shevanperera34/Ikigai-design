// src/components/ServicesPreview.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

type BundleKey = "brand" | "web" | "growth";

interface Bundle {
  key: BundleKey;
  title: string;
  tagline: string;
  includes: string[];
  price: string;
}

const BUNDLES: Bundle[] = [
  {
    key: "brand",
    title: "Brand Systems Build",
    tagline: "Define who you are.Then make it unmistakable",
    includes: ["Logo & identity", "Brand messaging", "Copy systems", "Creative direction"],
    price: "From $1,500",
  },
  {
    key: "web",
    title: "Intelligent Web Infrastructure",
    tagline: "Turn strategy into systems that actually perform",
    includes: ["Web design", "Automation setup", "3D integration", "Performance tracking"],
    price: "From $2,000",
  },
  {
    key: "growth",
    title: "Growth Architecture",
    tagline: "Scale intentionally, without losing control",
    includes: ["Paid media setup", "Campaign management", "Content funnels", "Analytics & reporting"],
    price: "From $1,200",
  },
];

export default function ServicesPreview() {
  const navigate = useNavigate();

  // keep your “custom alignment” add behavior, but as a lightweight toast only
  const [customSet, setCustomSet] = useState<Set<BundleKey>>(new Set());
  const [toast, setToast] = useState<{ id: number; message: string } | null>(null);

  const showToast = (message: string) => {
    const id = Date.now();
    setToast({ id, message });
    window.setTimeout(() => {
      setToast((t) => (t && t.id === id ? null : t));
    }, 2000);
  };

  const addToCustom = (key: BundleKey) => {
    if (!customSet.has(key)) {
      const next = new Set(customSet);
      next.add(key);
      setCustomSet(next);
      showToast("Added to Custom Alignment");
    } else {
      showToast("Already in Custom Alignment");
    }
  };

  const goToQuote = (bundles: BundleKey[]) => {
    if (!bundles.length) return;
    navigate("/services/get-quote", { state: { bundles } });
  };

  // ✅ per-card CTA labels (left-to-right based on key)
  const quoteLabel: Record<BundleKey, string> = {
    brand: "Build the Brand",
    web: "Build the system",
    growth: "Plan growth",
  };

  return (
    <section className="relative overflow-hidden font-[Inter] text-white">
      {/* toast */}
      {toast && (
        <div className="fixed top-6 left-6 z-[120]">
          <div className="rounded-xl border border-white/15 bg-white/10 backdrop-blur-md px-4 py-2 shadow-[0_8px_40px_rgba(0,0,0,0.5)]">
            <span className="text-sm text-white/95">{toast.message}</span>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="max-w-6xl mx-auto px-6 md:px-12">
        <h2 className="text-center font-[Space_Grotesk] uppercase tracking-widest text-3xl md:text-4xl">
          Services
        </h2>
        <p className="mt-3 text-center text-white/70">
          Three core systems designed to build clarity, confidence, and growth Or Combine services into
          a single, aligned system built around your goals
        </p>
      </header>

      {/* 3 “right-panel style” tiles */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 pt-10 md:pt-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {BUNDLES.map((b) => (
            <div
              key={b.key}
              className="relative overflow-hidden border border-white/10 rounded-2xl p-6 md:p-7 backdrop-blur-sm
                         shadow-[0_20px_80px_rgba(0,0,0,0.35)]"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.04) 100%)",
              }}
            >
              {/* subtle brand wash */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(80% 60% at 20% -10%, rgba(0,51,255,0.08), transparent 60%), radial-gradient(80% 60% at 120% -10%, rgba(108,0,255,0.08), transparent 60%)",
                }}
              />

              <div className="relative flex h-full flex-col">
                <h3 className="text-xl md:text-2xl font-semibold mb-1.5 font-[Space_Grotesk] uppercase tracking-widest">
                  {b.title}
                </h3>
                <p className="text-white/70 mb-4 min-h-[48px] md:min-h-[56px]">{b.tagline}</p>

                <ul className="text-sm text-white/85 space-y-1.5 mb-5 leading-6">
                  {b.includes.map((item, idx) => (
                    <li key={idx}>• {item}</li>
                  ))}
                </ul>

                <p className="font-medium text-white/90">{b.price}</p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    className="rounded-xl px-4 py-2 text-sm font-medium
                               text-white shadow-sm transition-all
                               bg-gradient-to-r from-[rgba(0,51,255,0.9)] to-[rgba(108,0,255,0.9)]
                               hover:from-[rgba(0,51,255,1)] hover:to-[rgba(108,0,255,1)]
                               focus:outline-none focus:ring-2 focus:ring-white/20"
                    onClick={() => goToQuote([b.key])}
                  >
                    {quoteLabel[b.key]}
                  </button>

                  <button
                    className="rounded-xl border border-white/20 px-4 py-2 text-white/90 hover:border-white/40 hover:bg-white/5"
                    onClick={() => addToCustom(b.key)}
                  >
                    Add to Custom Alignment
                  </button>

                  <button
                    className="rounded-xl border border-white/20 px-4 py-2 text-white/90 hover:border-white/40 hover:bg-white/5"
                    onClick={() => navigate("/services")}
                  >
                    View full Services →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Optional: one clean CTA under the grid */}
        <div className="mt-10 flex justify-center">
          <button
            onClick={() => navigate("/services")}
            className="rounded-full px-6 py-3 text-sm font-medium
                       border border-white/20 text-white/90 bg-white/5
                       hover:border-white/40 hover:bg-white/10 hover:text-white
                       transition focus:outline-none focus:ring-2 focus:ring-white/20"
          >
            Explore Services in depth →
          </button>
        </div>
      </div>
    </section>
  );
}
