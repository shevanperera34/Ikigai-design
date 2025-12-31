import { Link } from "react-router-dom"
import LiquidEther from "../components/LiquidEther"

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" })

  const linkBase = "text-white/70 hover:text-white transition"

  // 🔥 Ikigai gradient (blue -> purple), hover (purple -> black)
  const btnPrimary =
    "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium text-white shadow-sm " +
    "transition-all focus:outline-none focus:ring-2 focus:ring-white/20 " +
    "bg-gradient-to-r from-[#1d2d52] to-[#380A65] " +
    "hover:from-[#380A65] hover:to-black"

  // Small “chip” buttons (social icons)
  const chipBase =
    "rounded-full border border-white/20 bg-white/5 p-2 transition " +
    "hover:border-white/35 hover:bg-gradient-to-r hover:from-[#1d2d52] hover:to-[#380A65] " +
    "focus:outline-none focus:ring-2 focus:ring-white/20"

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
            opacity: 0.55,
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
              <svg
                viewBox="0 0 1024 1024"
                width="40"
                height="40"
                aria-hidden="true"
                className="opacity-90 shrink-0 text-white"
              >
                <path
                  fill="currentColor"
                  d="M912.5,511.5c0-220.91-179.09-400-400-400S112.5,290.59,112.5,511.5c0,205.64,155.19,375.04,354.84,397.47,0,0,64.72-95,69.66-131.97,5.46-40.88-39.67-119.92-36-161,1.27-14.27,25.52-35.89,28-50,2.47-14.02-17-43-16.5-54.5.03-.71,30.76,42.79,30.5,59.5-.19,12.44-18.55,33.57-19,46-1.54,42.66,40.53,122.45,44,165,2.6,31.85-12.49,127.21-12.49,127.21,200.69-21.45,356.99-191.32,356.99-397.71Z"
                />
              </svg>

              <div>
                <div className="font-[Space_Grotesk] uppercase tracking-widest text-lg">
                  Ikigai Project
                </div>
                <div className="text-xs text-white/60">IT + Branding + Marketing</div>
              </div>
            </div>

            <p className="mt-4 text-sm text-white/70 leading-relaxed max-w-sm">
              A business that helps people become businesses.
            </p>

            {/* ✅ Updated button */}
            <button onClick={scrollToTop} className={`mt-6 ${btnPrimary}`}>
              ↑ Back to top
            </button>
          </div>

          {/* Links */}
          <div>
            <div className="font-[Space_Grotesk] uppercase tracking-widest text-sm text-white/90">
              Quick Links
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <Link to="/services" className={linkBase}>
                Services
              </Link>
              <Link to="/work" className={linkBase}>
                Work
              </Link>
              <Link to="/about" className={linkBase}>
                About
              </Link>
              <Link to="/contact" className={linkBase}>
                Contact
              </Link>
            </div>
          </div>

          {/* Connect */}
          <div>
            <div className="font-[Space_Grotesk] uppercase tracking-widest text-sm text-white/90">
              Connect
            </div>

            <div className="mt-4 space-y-4">
              <a href="mailto:hello@example.com" className={linkBase}>
                Theikigaiproject.ca@gmail.com
              </a>

              {/* ✅ Social icons upgraded */}
              <div className="flex gap-3 pt-1">
                {/* Instagram */}
                <a
                  href="https://www.instagram.com/ikigaiproject._/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={chipBase}
                  aria-label="Instagram"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h10zm-5 3a5 5 0 1 0 0 10a5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6a3 3 0 0 1 0-6zm4.5-.9a1.1 1.1 0 1 0 0 2.2a1.1 1.1 0 0 0 0-2.2z" />
                  </svg>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/company/theikigaiproject/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={chipBase}
                  aria-label="LinkedIn"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M4.98 3.5a2.5 2.5 0 1 0 0 5a2.5 2.5 0 0 0 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.82-2.05 3.75-2.05C20 8.65 21 11 21 14.3V21h-4v-5.8c0-1.4 0-3.2-2-3.2s-2.3 1.5-2.3 3.1V21H9z" />
                  </svg>
                </a>

                {/* X */}
                <a
                  href="https://x.com/ikigai_the9489"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={chipBase}
                  aria-label="X"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.24 2.25h3.3l-7.2 8.23L22.5 21.75h-6.4l-5-6.54l-5.7 6.54H2.1l7.7-8.83L1.5 2.25h6.6l4.5 5.9z" />
                  </svg>
                </a>
              </div>

              {/* ✅ Start a project upgraded */}
              <Link to="/contact" className={btnPrimary}>
                Start a project
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/10 pt-6">
          <div className="text-xs text-white/55">
            © {new Date().getFullYear()} The Ikigai Project. All rights reserved.
          </div>

          <Link to="/terms" className="text-xs text-white/55 hover:text-white transition">
            Terms of Services
          </Link>
        </div>
      </div>
    </footer>
  )
}
