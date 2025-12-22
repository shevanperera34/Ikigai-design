// src/components/WorkPreview.tsx
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";

import blindthumb from "../assets/Blinds_thumbnail_2.png";
import clubpromo from "../assets/ClubPromo_Thumbnail.png";
import Tailor from "../assets/Tailorshop_Thumbnail.png";

type PreviewProject = {
  id: number;
  title: string;
  category: string;
  thumbnailUrl: string;
  blurb: string;
};

const PREVIEW: PreviewProject[] = [
  {
    id: 1,
    title: "Blinds 3D Website",
    category: "Digital Systems",
    thumbnailUrl: blindthumb,
    blurb: "Interactive 3D configurator with a premium product feel.",
  },
  {
    id: 7,
    title: "Club promo video",
    category: "Creative Strategy",
    thumbnailUrl: clubpromo,
    blurb: "Punchy sizzle edit built for shares, RSVPs, and hype.",
  },
  {
    id: 2,
    title: "Tailorshop Themed build",
    category: "Digital Systems",
    thumbnailUrl: Tailor,
    blurb: "Boutique themed site focused on clean UX and booking flow.",
  },
];

export default function WorkPreview() {
  const navigate = useNavigate();
  const [activeId, setActiveId] = useState<number>(PREVIEW[0].id);

  const active = useMemo(() => PREVIEW.find((p) => p.id === activeId)!, [activeId]);

  return (
    <section className="relative overflow-hidden font-[Inter] text-white">
      {/* Header */}
      <header className="max-w-6xl mx-auto px-6 md:px-12">
        <h2 className="text-center font-[Space_Grotesk] uppercase tracking-widest text-3xl md:text-4xl">
          Our Work
        </h2>
        <p className="mt-3 text-center text-white/70">
          A quick preview of what we build — systems and stories that actually ship.
        </p>
      </header>

      <div className="max-w-6xl mx-auto px-6 md:px-10 pt-10 md:pt-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
          {/* Left: Select tiles */}
          <div className="lg:col-span-5 space-y-4">
            {PREVIEW.map((p) => {
              const isActive = p.id === activeId;
              return (
                <button
                  key={p.id}
                  onMouseEnter={() => setActiveId(p.id)}
                  onFocus={() => setActiveId(p.id)}
                  onClick={() => navigate("/work")}
                  className={`group w-full text-left rounded-2xl border backdrop-blur-md p-5 transition-all
                    ${isActive ? "border-white/35 bg-white/10" : "border-white/15 bg-white/5 hover:border-white/30 hover:bg-white/8"}
                    shadow-[0_20px_80px_rgba(0,0,0,0.28)]`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.22em] text-white/65">
                        {p.category}
                      </p>
                      <h3 className="mt-2 text-lg md:text-xl font-semibold">
                        {p.title}
                      </h3>
                      <p className="mt-2 text-sm text-white/70 leading-relaxed">
                        {p.blurb}
                      </p>
                    </div>

                    <div
                      className={`shrink-0 mt-1 inline-flex items-center justify-center w-10 h-10 rounded-xl border
                        ${isActive ? "border-white/30 bg-white/10" : "border-white/20 bg-white/5"}
                        transition group-hover:scale-[1.03]`}
                      aria-hidden
                    >
                      <Play size={16} className="text-white/85 ml-[1px]" />
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-3">
                    <span className="text-[11px] text-white/60 group-hover:text-white/80 transition">
                      Open Project →
                    </span>
                  </div>
                </button>
              );
            })}

          </div>

          {/* Right: Preview card */}
          <div className="lg:col-span-7">
            <div
              className="relative overflow-hidden border border-white/10 rounded-2xl backdrop-blur-sm
                         shadow-[0_20px_80px_rgba(0,0,0,0.35)]"
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
                    "radial-gradient(80% 60% at 20% -10%, rgba(0,51,255,0.10), transparent 60%), radial-gradient(80% 60% at 120% -10%, rgba(108,0,255,0.10), transparent 60%)",
                }}
              />

              <div className="relative p-5 md:p-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.id}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="rounded-xl overflow-hidden border border-white/10 bg-white/[0.04]">
                      <div className="aspect-[16/9] w-full">
                        <img
                          src={active.thumbnailUrl}
                          alt={active.title}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    </div>

                    <div className="mt-5 flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.22em] text-white/65">
                          {active.category}
                        </p>
                        <h3 className="mt-2 text-2xl font-semibold font-[Space_Grotesk] uppercase tracking-widest">
                          {active.title}
                        </h3>
                        <p className="mt-3 text-sm text-white/75 leading-relaxed">
                          {active.blurb}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-3">
                      <button
                        onClick={() => navigate("/work")}
                        className="rounded-xl border border-white/20 px-4 py-2 text-white/90 hover:border-white/40"
                      >
                        Open in Our Work →
                      </button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

