import React from 'react'
import LightRays from '../components/LightRays'
import { LogoCanvas } from '../components/LogoCanvas'
import { Link } from 'react-router-dom'

export function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
      {/* base + vignette */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-base" />
        <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_-120px,rgba(255,255,255,0.07),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_500px_at_50%_120%,rgba(0,0,0,0.55),transparent_60%)]" />
      </div>

      {/* rays behind the logo */}
      <div className="absolute inset-0 z-0">
        <LightRays
          raysOrigin="top-center"
          raysColor="#bfc4d0"     // fixed accent color
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

      {/* content */}
      <div className="relative z-10 flex flex-col items-center gap-8 px-6 text-center">
        {/* GLB logo under the spotlight */}
        <LogoCanvas modelPath="/models/ikigai-logo.glb" />

        {/* CTAs */}
        <div className="mt-2 flex items-center gap-4">
          <Link
            to="/work"
            className="inline-flex items-center justify-center rounded-full px-6 py-3 text-base font-medium bg-slate-200 text-slate-900 hover:opacity-95 transition shadow-lg"
          >
            See Some Of Our Work
          </Link>
          <a 
            className="inline-flex items-center justify-center rounded-full px-6 py-3 text-base font-medium border border-white/15 bg-white/5 text-white/80 hover:bg-white/10 hover:text-white transition"
            href="https://calendly.com/theikigaiproject-ca/30min?month=2025-10"
          target="_blank"
	  rel="noopener noreferrer"
	    >
            Book a free 30min consultation today!
          </a>
        </div>
      </div>
    </section>
  )
}

