// src/sections/Hero.tsx
import LightRays from '../components/LightRays'
import { LogoCanvas } from '../components/LogoCanvas'
import { Link } from 'react-router-dom'
import TextType from '../components/TextType'

export function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden font-[Inter] text-white">
      {/* Brand base + cinematic gradients */}
      <div className="absolute inset-0 -z-20">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-purple-700/5 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_-120px,rgba(255,255,255,0.07),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_500px_at_50%_120%,rgba(0,0,0,0.55),transparent_60%)]" />
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
        {/* Headline ABOVE logo (typed) */}
        <h1 className="mt-22 font-[Space_Grotesk] uppercase tracking-widest text-xl sm:text-3xl md:text-3xl text-white/95 min-h-[2.5rem] sm:min-h-[3rem]">
          <TextType
            text={['Confidence, built into every digital experience.']}
            typingSpeed={60}
            pauseDuration={20000}
            showCursor={false}
            cursorCharacter="|"
          />
          {/* Fallback (helps with SEO/accessibility if JS hiccups) */}
          <span className="sr-only">Confidence, built into every digital experience.</span>
        </h1>

        {/* Logo */}
        <div>
          <LogoCanvas modelPath="/models/ikigai-logo.glb" />
        </div>

        {/* Sub ABOVE buttons */}
        <p className="max-w-3xl text-[18px] sm:text-[19px] leading-relaxed text-white/70 mb-3">
          The Ikigai Project is a human first digital studio helping companies and individuals grow with intention,
          scale with confidence, and win financially without losing themselves.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
          <Link
            to="/work"
            className="inline-flex items-center justify-center rounded-full px-6 py-3 text-base font-medium
                       text-white shadow-sm transition-all
                       bg-gradient-to-r from-[rgba(0,51,255,0.9)] to-[rgba(108,0,255,0.9)]
                       hover:from-[rgba(0,51,255,1)] hover:to-[rgba(108,0,255,1)]
                       focus:outline-none focus:ring-2 focus:ring-white/20"
          >
            Explore Our Work
          </Link>

          <a
            href="https://calendly.com/theikigaiproject-ca/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full px-6 py-3 text-base font-medium
                       border border-white/20 text-white/90 bg-white/5
                       hover:border-white/40 hover:bg-white/10 hover:text-white
                       transition focus:outline-none focus:ring-2 focus:ring-white/20"
          >
            Book a Free Strategy Call
          </a>
        </div>
      </div>
    </section>
  )
}
