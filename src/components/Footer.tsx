import React from "react";
import { Link } from "react-router-dom";
import LiquidEther from "../components/LiquidEther";

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const linkBase = "text-white/70 hover:text-white transition";
  const chipBase =
    "rounded-full border border-white/20 bg-white/5 p-2 hover:bg-white/10 hover:border-white/35 transition";

  return (
    <footer className="relative -mt-10 pt-10 border-t border-white/10 bg-[#050712] overflow-hidden">
      {/* LiquidEther background layer */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <LiquidEther
          colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
          mouseForce={20}
          cursorSize={100}
          isViscous={false}
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            opacity: 0.55, // tweak intensity
          }}
        />

        {/* soften edges so it blends like your site */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050712]/40 via-[#050712]/60 to-[#050712]" />
        <div className="absolute inset-0 bg-[radial-gradient(70%_45%_at_50%_-10%,rgba(255,255,255,0.05),transparent)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl border border-white/15 bg-white/5 backdrop-blur-md grid place-items-center">
                <span className="text-sm font-[Space_Grotesk] tracking-widest">I</span>
              </div>
              <div>
                <div className="font-[Space_Grotesk] uppercase tracking-widest text-lg">
                  Ikigai Project
                </div>
                <div className="text-xs text-white/60">
                  Creative strategy + technical execution.
                </div>
              </div>
            </div>

            <p className="mt-4 text-sm text-white/70 leading-relaxed max-w-sm">
              No fluff. Just systems that look good, load fast, and convert.
            </p>

            <button
              onClick={scrollToTop}
              className="mt-6 inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-sm text-white/85 hover:bg-white/10 hover:border-white/35 transition"
            >
              ↑ Back to top
            </button>
          </div>

          {/* Links */}
          <div>
            <div className="font-[Space_Grotesk] uppercase tracking-widest text-sm text-white/90">
              Quick Links
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <Link to="/services" className={linkBase}>Services</Link>
              <Link to="/work" className={linkBase}>Work</Link>
              <Link to="/about" className={linkBase}>About</Link>
              <Link to="/contact" className={linkBase}>Contact</Link>
            </div>
          </div>

          {/* Connect */}
          <div>
            <div className="font-[Space_Grotesk] uppercase tracking-widest text-sm text-white/90">
              Connect
            </div>

            <div className="mt-4 space-y-4">
              <a href="mailto:hello@example.com" className={linkBase}>
                hello@example.com
              </a>

              {/* Social icons */}
              <div className="flex gap-3 pt-1">
                {/* Instagram */}
                <a href="#" className={chipBase} aria-label="Instagram">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h10zm-5 3a5 5 0 1 0 0 10a5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6a3 3 0 0 1 0-6zm4.5-.9a1.1 1.1 0 1 0 0 2.2a1.1 1.1 0 0 0 0-2.2z"/>
                  </svg>
                </a>

                {/* LinkedIn */}
                <a href="#" className={chipBase} aria-label="LinkedIn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M4.98 3.5a2.5 2.5 0 1 0 0 5a2.5 2.5 0 0 0 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.82-2.05 3.75-2.05C20 8.65 21 11 21 14.3V21h-4v-5.8c0-1.4 0-3.2-2-3.2s-2.3 1.5-2.3 3.1V21H9z"/>
                  </svg>
                </a>

                {/* X */}
                <a href="#" className={chipBase} aria-label="X">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.24 2.25h3.3l-7.2 8.23L22.5 21.75h-6.4l-5-6.54l-5.7 6.54H2.1l7.7-8.83L1.5 2.25h6.6l4.5 5.9z"/>
                  </svg>
                </a>
              </div>

              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium text-white shadow-sm transition-all
                           bg-gradient-to-r from-[rgba(0,51,255,0.9)] to-[rgba(108,0,255,0.9)]
                           hover:from-[rgba(0,51,255,1)] hover:to-[rgba(108,0,255,1)]
                           focus:outline-none focus:ring-2 focus:ring-white/20"
              >
                Start a project
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/10 pt-6">
          <div className="text-xs text-white/55">
            © {new Date().getFullYear()} The Ikigai Project. All rights reserved.
          </div>
          <div className="text-xs text-white/55">Shinzō wo Sasageyo!</div>
        </div>
      </div>
    </footer>
  );
}

