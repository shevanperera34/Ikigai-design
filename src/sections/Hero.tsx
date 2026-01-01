// src/sections/Hero.tsx
import LightRays from "../components/LightRays"
import { LogoCanvas } from "../components/LogoCanvas"
import Aurora from "../components/Aurora"
import { Link } from "react-router-dom"
import { ShinyButton } from "../components/shiny-button"
import FirstClientPopup from "../components/FirstClientPopup"


export function Hero() {
  return (
    <section
      id="home-hero"
      className="relative min-h-[92vh] flex items-center justify-center overflow-hidden font-[Inter] text-white"
    >
      <FirstClientPopup />
      {/* Brand base + cinematic gradients */}
      <div className="absolute inset-0 -z-20">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-purple-700/5 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_-120px,rgba(255,255,255,0.2),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_500px_at_50%_120%,rgba(0,0,0,0.55),transparent_60%)]" />
      </div>

      {/* Aurora background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Aurora colorStops={["#1b2d52", "#380a65", "#1b2d52"]} blend={0.5} amplitude={1.0} speed={0.5} />
      </div>

      {/* Rays behind the logo */}
      <div className="absolute inset-0 z-0">
        <LightRays
          raysOrigin="top-center"
          raysColor="#e6e9ff"
          raysSpeed={1.1}
          lightSpread={0.75}
          rayLength={1.15}
          followMouse
          mouseInfluence={0.1}
          noiseAmount={0.05}
          distortion={0.035}
          className="absolute inset-0"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-4 text-center">
        <h1 className="mt-22 font-[Space_Grotesk] uppercase tracking-widest text-xl sm:text-3xl md:text-3xl text-white/95">
          THE IKIGAI PROJECT
        </h1>

        {/* Logo */}
        <div>
          <LogoCanvas modelPath="/models/ikigai-logo.glb" />
        </div>

        <p className="max-w-3xl text-[18px] sm:text-[19px] leading-relaxed text-white/70 mb-3">
          The Ikigai Project is a human first digital studio helping companies and individuals grow with intention, scale
          with confidence, and win financially without losing themselves.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
          {/* React Router internal nav: wrap button in Link */}
          <Link to="/work" className="inline-flex">
            <ShinyButton className="min-w-[220px]">
              Explore Our Work
            </ShinyButton>
          </Link>

          {/* External link: keep <a> but button style */}
          <a
            href="https://calendly.com/theikigaiproject-ca/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex"
          >
            <ShinyButton className="min-w-[260px]">
              Book a Free Strategy Call
            </ShinyButton>
          </a>

          {/* Secondary style: same component, just tweak className */}
          <a
            href="/pay"
            className="inline-flex"
          >
            <ShinyButton
              className="min-w-[170px]"
              style={{
                // quick “secondary” look without rebuilding the component
                filter: "saturate(0.9)",
                opacity: 0.92,
              }}
            >
              Have a quote?
            </ShinyButton>
          </a>
        </div>
      </div>
    </section>
  )
}
