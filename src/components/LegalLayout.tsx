// src/components/LegalLayout.tsx
import React from "react";
import { NavLink } from "react-router-dom";
import Aurora from "../components/Aurora";

type Props = {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
};

const navBase =
  "block text-sm transition rounded-lg px-3 py-2 border border-transparent";
const navInactive = "text-white/60 hover:text-white/90 hover:bg-white/5";
const navActive = "text-white bg-white/10 border-white/10";

export default function LegalLayout({ title, lastUpdated, children }: Props) {
  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Aurora background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Aurora
          colorStops={["#1b2d52", "#380a65", "#1b2d52"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      </div>

      {/* readability layers */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-black/70" />
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(70%_45%_at_50%_-10%,rgba(255,255,255,0.06),transparent)]" />
      <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-b from-black/40 via-black/70 to-black" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-10">
          {/* Left panel */}
          <aside className="md:sticky md:top-16 h-fit">
            <div className="mb-4 text-xs uppercase tracking-[0.25em] text-white/60">
              Ikigai Legal
            </div>

            <nav className="space-y-1">
              <NavLink
                to="/terms"
                className={({ isActive }) =>
                  `${navBase} ${isActive ? navActive : navInactive}`
                }
              >
                Terms of Service
              </NavLink>
              <NavLink
                to="/privacy"
                className={({ isActive }) =>
                  `${navBase} ${isActive ? navActive : navInactive}`
                }
              >
                Privacy Policy
              </NavLink>
              <NavLink
                to="/data-use"
                className={({ isActive }) =>
                  `${navBase} ${isActive ? navActive : navInactive}`
                }
              >
                Data Use
              </NavLink>
              <NavLink
                to="/security"
                className={({ isActive }) =>
                  `${navBase} ${isActive ? navActive : navInactive}`
                }
              >
                Security
              </NavLink>
            </nav>


          </aside>

          {/* Content column */}
          <section className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
              {title}
            </h1>
            <p className="mt-3 text-white/60">{lastUpdated}</p>

            <div className="mt-10 space-y-8 text-[15px] leading-7 text-white/85">
              {children}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
