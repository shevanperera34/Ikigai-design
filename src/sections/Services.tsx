// src/sections/Services.tsx
import { useMemo, useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type ServiceKey = 'brand' | 'web' | 'growth'
type Service = {
  key: ServiceKey
  title: string
  subtitle: string
  priceFrom: string
  bulletsLeft: string[]
  bulletsRight: string[]
  ring: string
  glow: string
  tint: string
  label: string
}

const SERVICES: Service[] = [
  {
    key: 'web',
    title: 'Intelligent Web Infrastructure',
    subtitle: 'Bring it to life digitally.',
    priceFrom: '$2,000',
    bulletsLeft: ['Web design', '3D integration'],
    bulletsRight: ['Automation setup', 'Performance tracking'],
    ring: 'ring-cyan-300/35',
    glow: 'shadow-[0_0_110px_24px_rgba(34,211,238,0.09)]',
    tint: 'bg-cyan-300/10',
    label: 'Web Infrastructure',
  },
  {
    key: 'growth',
    title: 'Growth Architecture',
    subtitle: 'Scale with purpose.',
    priceFrom: '$1,200',
    bulletsLeft: ['Paid media setup', 'Content funnels'],
    bulletsRight: ['Campaign management', 'Analytics & reporting'],
    ring: 'ring-emerald-300/35',
    glow: 'shadow-[0_0_110px_24px_rgba(52,211,153,0.08)]',
    tint: 'bg-emerald-300/10',
    label: 'Growth Architecture',
  },
  {
    key: 'brand',
    title: 'Brand Systems Build',
    subtitle: 'Define who you are.',
    priceFrom: '$1,500',
    bulletsLeft: ['Logo & identity', 'Copy systems'],
    bulletsRight: ['Brand messaging', 'Creative direction'],
    ring: 'ring-amber-300/35',
    glow: 'shadow-[0_0_110px_24px_rgba(251,191,36,0.08)]',
    tint: 'bg-amber-300/10',
    label: 'Brand Systems',
  },
]

const chip =
  'px-3 py-1 rounded-full border border-white/10 text-[11px] leading-none text-white/80 hover:border-white/20 transition'

export default function Services() {
  const [selected, setSelected] = useState<ServiceKey | null>(null)
  const current = useMemo(
    () => SERVICES.find(s => s.key === selected) ?? null,
    [selected]
  )

  // Scroll the panel into view when a circle is picked (nice on smaller laptops)
  const panelRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    if (current && panelRef.current) {
      panelRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [current])

  return (
    <section className="relative min-h-screen bg-[#0b0b0b] text-white overflow-hidden">
      {/* soft vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_45%_at_50%_-10%,rgba(255,255,255,0.06),rgba(0,0,0,0))]" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 lg:px-10 py-14 md:py-18">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] text-white/70">
            <span className="block h-1.5 w-1.5 rounded-full bg-white/60" />
            The Ikigai Project
          </div>

          <h1 className="mt-3 text-[34px] sm:text-[40px] md:text-[44px] font-extrabold tracking-tight">
            Find Your Alignment
          </h1>
          <p className="mt-2 text-white/70 text-sm sm:text-[15px] leading-6">
            Choose a pathway or build your own. The center is where balance happens.
          </p>

          <div className="mt-6 flex items-center justify-center gap-2">
            <button className={chip}>Authenticity</button>
            <button className={chip}>Innovation</button>
            <button className={chip}>Balance</button>
          </div>
        </div>

        {/* Diagram — smaller and cleaner. Hidden on phones. */}
        <div className="relative mt-12 md:mt-14 lg:mt-16 hidden md:block">
          {/* Height trimmed so you don’t need page zoom */}
          <div className="relative mx-auto max-w-5xl h-[430px] lg:h-[470px]">
            <Circle
              size="md"
              position="top"
              service={SERVICES.find(s => s.key === 'brand')!}
              active={selected === 'brand'}
              onChoose={() => setSelected('brand')}
            />
            <Circle
              size="md"
              position="left"
              service={SERVICES.find(s => s.key === 'web')!}
              active={selected === 'web'}
              onChoose={() => setSelected('web')}
            />
            <Circle
              size="md"
              position="right"
              service={SERVICES.find(s => s.key === 'growth')!}
              active={selected === 'growth'}
              onChoose={() => setSelected('growth')}
            />

            {/* Center CTA */}
            <motion.button
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelected(null)}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-amber-400 text-black font-semibold px-4 py-2.5 rounded-xl shadow-[0_6px_28px_rgba(251,191,36,0.45)] ring-1 ring-white/70"
            >
              Custom Alignment
            </motion.button>
          </div>
        </div>

        {/* Detail panel OR 3-card chooser */}
        <div ref={panelRef} className="mt-10 lg:mt-12">
          <AnimatePresence mode="wait">
            {current ? (
              <motion.div
                key={current.key}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 18 }}
              >
                <DetailPanel service={current} onBack={() => setSelected(null)} />
              </motion.div>
            ) : (
              <motion.div
                key="cards"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 18 }}
                className="grid gap-5 md:gap-6 md:grid-cols-3"
              >
                {SERVICES.map(s => (
                  <button
                    key={s.key}
                    onClick={() => setSelected(s.key)}
                    className={`group text-left rounded-2xl border border-white/10 bg-white/[0.035] hover:bg-white/[0.06] transition p-5 md:p-6 ${s.glow} min-h-[180px]`}
                  >
                    <div className="text-[11px] tracking-widest text-white/70">
                      {s.title.toUpperCase()}
                    </div>
                    <div className="mt-1.5 text-white/90">{s.subtitle}</div>
                    <div className="mt-5 text-sm text-white/70">
                      From <span className="text-white/90">{s.priceFrom}</span>
                    </div>
                    <div className="mt-5 inline-flex items-center gap-2 text-sm text-black font-medium bg-white rounded-full px-3 py-1">
                      View Details
                      <span className="block h-2 w-2 rounded-full bg-black/50 group-hover:bg-black/70" />
                    </div>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <p className="mt-8 text-center text-[11px] text-white/45">
          Circles overlap visually; the center button is your “Custom Alignment” entry point.
        </p>
      </div>
    </section>
  )
}

/* ---------- components ---------- */

function DetailPanel({
  service,
  onBack,
}: {
  service: Service
  onBack: () => void
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-7 lg:p-8 backdrop-blur-sm">
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div className="min-w-[240px]">
          <h3 className="text-[20px] md:text-[22px] font-semibold">{service.title}</h3>
          <p className="mt-1 text-white/70">{service.subtitle}</p>
        </div>
        <div className="text-right text-white/70">
          <div className="text-xs">From</div>
          <div className="font-medium">{service.priceFrom}</div>
        </div>
      </div>

      <hr className="my-6 border-white/10" />

      <div className="grid gap-6 md:grid-cols-2">
        <ul className="space-y-2 text-white/90 leading-6">
          {service.bulletsLeft.map((b, i) => (
            <li key={i} className="flex gap-2">
              <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-white/70" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
        <ul className="space-y-2 text-white/90 leading-6">
          {service.bulletsRight.map((b, i) => (
            <li key={i} className="flex gap-2">
              <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-white/70" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <button className="rounded-md bg-white text-black px-4 py-2 text-sm font-medium hover:bg-white/90">
          View Details
        </button>
        <button className="rounded-md border border-white/20 px-4 py-2 text-sm font-medium text-white/90 hover:bg-white/5">
          Add to Custom Alignment
        </button>
        <button
          onClick={onBack}
          className="ml-auto rounded-md border border-white/10 px-4 py-2 text-sm text-white/75 hover:bg-white/5"
        >
          Back
        </button>
      </div>
    </div>
  )
}

function Circle({
  size,
  position,
  service,
  active,
  onChoose,
}: {
  size: 'md'
  position: 'top' | 'left' | 'right'
  service: Service
  active: boolean
  onChoose: () => void
}) {
  // Smaller, laptop-friendly sizes
  const dims =
    size === 'md'
      ? 'w-[360px] h-[360px] lg:w-[420px] lg:h-[420px]'
      : 'w-[520px] h-[520px]'

  const pos =
    position === 'top'
      ? 'left-1/2 -translate-x-1/2 -top-4 lg:-top-2'
      : position === 'left'
      ? 'left-[3%] bottom-2 lg:left-[6%]'
      : 'right-[3%] bottom-2 lg:right-[6%]'

  return (
    <div className={`absolute ${pos}`}>
      <button
        onClick={onChoose}
        className={[
          'relative rounded-full',
          dims,
          'transition',
          service.glow,
          active ? 'ring-2 ring-white/60' : `ring-[1.5px] ${service.ring}`,
          service.tint,
          'backdrop-blur-[2px] mix-blend-screen',
        ].join(' ')}
        aria-label={service.title}
        title={service.title}
      >
        {/* subtle inner radial */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full"
          style={{
            background:
              'radial-gradient(closest-side, rgba(255,255,255,0.10), rgba(255,255,255,0.06) 45%, rgba(255,255,255,0.02) 65%, transparent 76%)',
          }}
        />
      </button>

      {/* Circle label */}
      <div
        className={`absolute text-white/90 text-[13px] ${
          position === 'top'
            ? 'left-1/2 -translate-x-1/2 -top-7'
            : position === 'left'
            ? 'left-4 -bottom-7'
            : 'right-4 -bottom-7'
        }`}
      >
        {service.label}
      </div>
    </div>
  )
}

