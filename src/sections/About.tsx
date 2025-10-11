// src/sections/About.tsx
import Galaxy from '../components/Galaxy'

const STEPS = [
  {
    title: 'Discovery Call',
    desc: 'Quick intro chat to understand goals.',
  },
  {
    title: 'Scope & Quote',
    desc: 'We map out deliverables and costs.',
  },
  {
    title: 'Draft Build',
    desc: 'First version delivered for review.',
  },
  {
    title: 'Revisions',
    desc: 'Feedback loop until it feels right.',
  },
  {
    title: 'Launch',
    desc: 'Project goes live with full support.',
  },
  {
    title: 'Post-Launch Support',
    desc: '14-day safety net for fixes/questions.',
  },
]

export default function About() {
  return (
    <section className="relative min-h-[110vh] overflow-hidden text-white">
      {/* Galaxy canvas sits above the section background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Galaxy
          transparent
          mouseRepulsion
          mouseInteraction
          density={1.5}
          glowIntensity={0.5}
          saturation={0.8}
          hueShift={240}
          starSpeed={0.5}
          speed={1}
          rotationSpeed={0.08}
          twinkleIntensity={0.4}
        />
      </div>

      {/* Soft vignette ABOVE galaxy but BELOW content for readability */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]
                   bg-[radial-gradient(60%_40%_at_50%_-10%,rgba(0,0,0,0.18),rgba(0,0,0,0))]"
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 py-24 md:py-32">
        <h1 className="text-center text-5xl md:text-7xl font-extrabold tracking-tight">
          Who We Are
        </h1>
        <p className="mt-4 text-center text-lg md:text-2xl text-white/90">
          A small team with a big range.
        </p>

        <div className="mt-10 space-y-7 text-base md:text-lg leading-relaxed text-white/90 max-w-4xl mx-auto">
          <p>
            We’re The Ikigai Project – a small team blending creative marketing with technical execution.
            Our work sits at the crossroads of <strong>design</strong>, <strong>advertising</strong>, and <strong>IT</strong>,
            giving businesses practical solutions that actually move the needle.
          </p>

          <p>
            We don’t believe in bloated agency processes or endless buzzwords. Just sharp builds,
            campaigns that convert, and systems that <strong>last</strong>.
          </p>
        </div>

        {/* PROCESS */}
        <div className="mt-20 md:mt-28">
          <header className="text-center mb-8 md:mb-10">
            <h2 className="text-3xl md:text-4xl font-bold">The Process</h2>
            <p className="mt-2 text-white/80">
              A clear, step-by-step flow. No hidden surprises.
            </p>
          </header>

          {/* Vertical timeline */}
          <div className="relative max-w-3xl mx-auto">
            {/* vertical line */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-white/15" />

            <ul className="space-y-8 md:space-y-10">
              {STEPS.map((s, i) => (
                <li key={s.title} className="relative">
                  {/* node */}
                  <div className="absolute left-1/2 -translate-x-1/2">
                    <div className="flex items-center justify-center h-9 w-9 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.15)]">
                      <span className="text-sm font-semibold">{i + 1}</span>
                    </div>
                  </div>

                  {/* card */}
                  <div
                    className={[
                      'mt-4',
                      // left/right alternating on wide screens for a nice flow
                      i % 2 === 0 ? 'md:pr-16 md:mr-[52%]' : 'md:pl-16 md:ml-[52%]',
                    ].join(' ')}
                  >
                    <div
                      className="rounded-2xl border border-white/15 bg-white/8 backdrop-blur-md
                                 shadow-[0_20px_80px_rgba(0,0,0,0.35)]"
                    >
                      <div className="px-4 py-4 md:px-5 md:py-5">
                        <div className="text-base md:text-lg font-semibold text-white">{s.title}</div>
                        <div className="mt-1 text-sm text-white/80">{s.desc}</div>
                      </div>
                    </div>
                  </div>

                  {/* connector arrow */}
                  {i < STEPS.length - 1 && (
                    <div className="absolute left-1/2 -translate-x-1/2 mt-3">
                      <div className="h-7 w-px bg-white/20 mx-auto" />
                      <div className="h-2 w-2 rotate-45 border-r border-b border-white/30 mx-auto -mt-1" />
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* END PROCESS */}
      </div>
    </section>
  )
}

