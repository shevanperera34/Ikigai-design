// src/sections/Contact.tsx
import Prism from '../components/Prism'
import { useState } from 'react'

export default function Contact() {
  const [sent, setSent] = useState(false)

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 3000)
  }

  const inputClass =
    'w-full bg-transparent text-white placeholder-white/60 ' +
    'border border-white/20 rounded-lg px-4 py-3 outline-none ' +
    'focus:border-white/50 focus:ring-2 focus:ring-white/20 transition'

  return (
    <section className="relative min-h-screen text-white overflow-hidden">
      {/* Animated background (keep ABOVE parent background with z-0) */}
      <div className="absolute inset-0 z-0">
        <Prism
          animationType="rotate"
          timeScale={0.15}
          height={3.5}
          baseWidth={5.5}
          scale={3.6}
          hueShift={0}
          colorFrequency={1}
          noise={0}
          glow={0.6}
          suspendWhenOffscreen
        />
      </div>

      {/* Soft vignette for readability (still transparent) */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(70%_45%_at_50%_-10%,rgba(0,0,0,0.35),rgba(0,0,0,0))]" />

      {/* Content sits above the background */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 md:px-8 lg:px-10 py-16 md:py-24">
        <header className="text-center mb-10 md:mb-14">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Contact</h1>
          <p className="mt-3 text-white/75">Tell us a bit about your project and we’ll get back to you.</p>
        </header>

        {/* Glassy, transparent form */}
        <form
          onSubmit={onSubmit}
          className="rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md
                     shadow-[0_20px_80px_rgba(0,0,0,0.35)] p-6 md:p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            <div>
              <label className="mb-1.5 block text-sm text-white/80">Full name</label>
              <input className={inputClass} name="name" placeholder="Jane Doe" required />
            </div>
            <div>
              <label className="mb-1.5 block text-sm text-white/80">Email</label>
              <input className={inputClass} name="email" placeholder="you@email.com" type="email" required />
            </div>
            <div>
              <label className="mb-1.5 block text-sm text-white/80">Company (optional)</label>
              <input className={inputClass} name="company" placeholder="Acme Co." />
            </div>
            <div>
              <label className="mb-1.5 block text-sm text-white/80">Budget (optional)</label>
              <select className={inputClass} name="budget" defaultValue="">
                <option value="" disabled>Select a range</option>
                <option>$1k – $5k</option>
                <option>$5k – $15k</option>
                <option>$15k – $50k</option>
                <option>$50k+</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="mb-1.5 block text-sm text-white/80">Project details</label>
              <textarea
                className={inputClass + ' min-h-[140px]'}
                name="message"
                placeholder="What are you building? Timelines, goals, links…"
                rows={6}
                required
              />
            </div>
          </div>

          <div className="mt-6 md:mt-8 flex flex-wrap items-center gap-3">
            <button
              type="submit"
              className="rounded-lg bg-white text-black font-medium px-5 py-3 hover:bg-white/90 transition"
            >
              Send message
            </button>
            {sent && <span className="text-emerald-300/90 text-sm">Thanks — we’ll be in touch shortly.</span>}
            <span className="ml-auto text-xs text-white/60">
              Prefer email?{' '}
              <a className="underline hover:text-white" href="mailto:hello@example.com">
                hello@example.com
              </a>
            </span>
          </div>
        </form>

        <div className="h-10" />
      </div>
    </section>
  )
}

