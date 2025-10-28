// src/sections/Contact.tsx
import Prism from '../components/Prism'
import { useState } from 'react'

type Purpose = 'call' | 'quote' | 'question'
type ProjectType = 'Brand' | 'Web' | 'Growth'

export default function Contact() {
  const [sent, setSent] = useState(false)

  // ui state
  const [purpose, setPurpose] = useState<Purpose>('quote')
  const [types, setTypes] = useState<Set<ProjectType>>(new Set())
  const [agree, setAgree] = useState(false)

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // read purpose/types/agree here when wiring to backend
    setSent(true)
    setTimeout(() => setSent(false), 3000)
  }

  const inputBase =
    'w-full bg-transparent text-white placeholder-white/60 ' +
    'border border-white/15 rounded-lg px-4 py-3 outline-none ' +
    'focus:border-white/50 focus:ring-2 focus:ring-white/20 transition'

  const chip = (label: ProjectType) => {
    const active = types.has(label)
    return (
      <button
        type="button"
        onClick={() => {
          const next = new Set(types)
          if (next.has(label)) next.delete(label)
          else next.add(label)
          setTypes(next)
        }}
        className={
          'rounded-full px-3 py-1.5 text-sm transition border ' +
          (active
            ? 'text-white shadow-sm bg-gradient-to-r from-[rgba(0,51,255,0.9)] to-[rgba(108,0,255,0.9)] border-white/0 hover:from-[rgba(0,51,255,1)] hover:to-[rgba(108,0,255,1)]'
            : 'border-white/20 text-white/85 hover:border-white/40')
        }
        aria-pressed={active}
        aria-label={`Toggle ${label}`}
      >
        {label}
      </button>
    )
  }

  return (
    <section className="relative min-h-screen overflow-hidden font-[Inter] text-white bg-black">
      {/* Brand gradient layers */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-purple-700/5 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(70%_45%_at_50%_-10%,rgba(255,255,255,0.05),transparent)]" />
      </div>

      {/* Animated background above base, below content */}
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

      {/* Soft vignette for readability */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(70%_45%_at_50%_-10%,rgba(0,0,0,0.35),rgba(0,0,0,0))]" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 md:px-8 lg:px-10 py-16 md:py-24">
        <header className="text-center mb-10 md:mb-14">
          <h1 className="font-[Space_Grotesk] uppercase tracking-widest text-4xl md:text-5xl mt-7">
            Contact
          </h1>
          <p className="mt-3 text-white/75">
            Tell us a bit about your project and we’ll get back to you.
          </p>
        </header>

        {/* Glassy form panel */}
        <form
          onSubmit={onSubmit}
          className="relative rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md
                     shadow-[0_20px_80px_rgba(0,0,0,0.35)] p-6 md:p-8 overflow-hidden"
        >
          {/* subtle brand wash */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-0"
            style={{
              background:
                'radial-gradient(80% 60% at 20% -10%, rgba(0,51,255,0.08), transparent 60%), radial-gradient(80% 60% at 120% -10%, rgba(108,0,255,0.08), transparent 60%)',
            }}
          />

          {/* Purpose segmented control */}
          <div className="relative mb-6">
            <span className="block text-sm text-white/80 mb-2">What do you want to do today?</span>
            <div className="flex flex-wrap gap-2">
              {([
                { k: 'call', label: 'Book a call' },
                { k: 'quote', label: 'Get a quote' },
                { k: 'question', label: 'General question' },
              ] as { k: Purpose; label: string }[]).map(({ k, label }) => {
                const active = purpose === k
                return (
                  <button
                    key={k}
                    type="button"
                    onClick={() => setPurpose(k)}
                    className={
                      'rounded-full px-3 py-1.5 text-sm transition border ' +
                      (active
                        ? 'text-white shadow-sm bg-gradient-to-r from-[rgba(0,51,255,0.9)] to-[rgba(108,0,255,0.9)] border-white/0 hover:from-[rgba(0,51,255,1)] hover:to-[rgba(108,0,255,1)]'
                        : 'border-white/20 text-white/85 hover:border-white/40')
                    }
                    aria-pressed={active}
                    aria-label={`Select purpose: ${label}`}
                  >
                    {label}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            <div>
              <label className="mb-1.5 block text-sm text-white/80">Full name</label>
              <input className={inputBase} name="name" placeholder="Jane Doe" required />
            </div>
            <div>
              <label className="mb-1.5 block text-sm text-white/80">Email</label>
              <input className={inputBase} name="email" placeholder="you@email.com" type="email" required />
            </div>
            <div>
              <label className="mb-1.5 block text-sm text-white/80">Company (optional)</label>
              <input className={inputBase} name="company" placeholder="Acme Co." />
            </div>
            <div>
              <label className="mb-1.5 block text-sm text-white/80">Budget (optional)</label>
              <select className={inputBase} name="budget" defaultValue="">
                <option value="" disabled>Select a range</option>
                <option>$1k – $5k</option>
                <option>$5k – $15k</option>
                <option>$15k – $50k</option>
                <option>$50k+</option>
              </select>
            </div>

            {/* Project type chips */}
            <div>
              <label className="mb-1.5 block text-sm text-white/80">Project type</label>
              <div className="flex flex-wrap gap-2">
                {chip('Brand')}
                {chip('Web')}
                {chip('Growth')}
              </div>
            </div>

            {/* Timeline select */}
            <div>
              <label className="mb-1.5 block text-sm text-white/80">Timeline</label>
              <select className={inputBase} name="timeline" defaultValue="">
                <option value="" disabled>Select a timeline</option>
                <option>ASAP (0–2 weeks)</option>
                <option>Soon (2–4 weeks)</option>
                <option>Planning (1–2 months)</option>
                <option>Later (3+ months)</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="mb-1.5 block text-sm text-white/80">Project details</label>
              <textarea
                className={inputBase + ' min-h-[140px]'}
                name="message"
                placeholder="What are you building? Timelines, goals, links…"
                rows={6}
                required
              />
            </div>
          </div>

          {/* consent */}
          <div className="relative mt-4 flex items-center gap-2 text-sm">
            <input
              id="agree"
              type="checkbox"
              className="h-4 w-4 rounded border-white/30 bg-transparent"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
            />
            <label htmlFor="agree" className="text-white/80 select-none">
              I agree to be contacted about my inquiry. We’ll never share your info.
            </label>
          </div>

          <div className="relative mt-6 md:mt-8 flex flex-wrap items-center gap-3">
            <button
              type="submit"
              className="rounded-lg px-5 py-3 text-sm font-medium text-white shadow-sm transition-all
                         bg-gradient-to-r from-[rgba(0,51,255,0.9)] to-[rgba(108,0,255,0.9)]
                         hover:from-[rgba(0,51,255,1)] hover:to-[rgba(108,0,255,1)]
                         focus:outline-none focus:ring-2 focus:ring-white/20 disabled:opacity-50"
              disabled={!agree}
            >
              Send message
            </button>

            <button
              type="button"
              className="rounded-lg border border-white/20 text-white/90 px-4 py-3 hover:border-white/40 transition"
              onClick={() => window.open('https://calendly.com/theikigaiproject-ca/30min', '_blank')}
            >
              Find a time
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

