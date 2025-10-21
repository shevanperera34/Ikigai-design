// src/sections/Hero.tsx
import React from 'react'
import LightRays from '../components/LightRays'
import { LogoCanvas } from '../components/LogoCanvas'
import { Link } from 'react-router-dom'

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

      {/* Rays behind the logo (kept) */}
      <div className="absolute inset-0 z-0">
        <LightRays
          raysOrigin="top-center"
          // Slightly cooler white so the blue→purple accents dominate
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
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center gap-8 px-6 text-center">
        {/* 3D logo under the spotlight */}
        <LogoCanvas modelPath="/models/ikigai-logo.glb" />

        {/* CTAs */}
        <div className="mt-2 flex flex-col sm:flex-row items-center gap-4">
          <Link
            to="/work"
            className="inline-flex items-center justify-center rounded-full px-6 py-3 text-base font-medium
                       text-white shadow-sm transition-all
                       bg-gradient-to-r from-[rgba(0,51,255,0.9)] to-[rgba(108,0,255,0.9)]
                       hover:from-[rgba(0,51,255,1)] hover:to-[rgba(108,0,255,1)]
                       focus:outline-none focus:ring-2 focus:ring-white/20"
          >
            See Some Of Our Work
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
            Book a free 30min consultation today!
          </a>
        </div>
      </div>
    </section>
  )
}

