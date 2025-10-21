// src/sections/About.tsx
import Galaxy from '../components/Galaxy'

// team images (same assets used on /team)
import sladeIntro from '../assets/slade_pic_intro_1.jpeg'
import shevanprofile from '../assets/ProfilePic_Shevan.png'
import seniprofile from '../assets/Seni_picintro.jpeg'

const STEPS = [
  { title: 'Discovery Call', desc: 'Quick intro chat to understand goals.' },
  { title: 'Scope & Quote', desc: 'We map out deliverables and costs.' },
  { title: 'Draft Build', desc: 'First version delivered for review.' },
  { title: 'Revisions', desc: 'Feedback loop until it feels right.' },
  { title: 'Launch', desc: 'Project goes live with full support.' },
  { title: 'Post-Launch Support', desc: '14-day safety net for fixes/questions.' },
]

// --- Simple icons (reuse from Team) ---
const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.31l5.74-6.57L0 .75h5.063l3.495 4.633L12.6.75ZM11.47 13.5h1.146L4.74 2.15H3.522l7.95 11.35Z"/>
  </svg>
)
const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003Zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.282.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.231 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.843-.038 1.096-.047 3.232-.047h.001Zm4.905 1.882a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4ZM8 4.465a3.535 3.535 0 1 0 0 7.07 3.535 3.535 0 0 0 0-7.07ZM8 5.535a2.465 2.465 0 1 1 0 4.93 2.465 2.465 0 0 1 0-4.93Z"/>
  </svg>
)
const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0 0 3.603 0 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H11.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
  </svg>
)

type MiniMember = {
  name: string
  role: string
  image: string
  imgClass?: string
  instagram?: string
}

const MINI_TEAM: MiniMember[] = [
  { name: 'Shevan', role: 'Marketing and Strategy', image: shevanprofile, imgClass: 'object-top',    instagram: 'https://www.instagram.com/sh3van.n' },
  { name: 'Seni',   role: 'IT and Strategy',        image: seniprofile,   imgClass: 'object-center', instagram: 'https://www.instagram.com/seniii.r' },
  { name: 'Slade',  role: 'Client Relations and Strategy', image: sladeIntro, imgClass: 'object-center', instagram: 'https://www.instagram.com/slxde.xx' },
]

export default function About() {
  return (
    <section className="relative min-h-[110vh] overflow-hidden text-white font-[Inter] bg-black">
      {/* Brand gradient base (below galaxy for subtle color cast) */}
      <div className="pointer-events-none absolute inset-0 -z-20">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-purple-700/5 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(70%_45%_at_50%_-10%,rgba(255,255,255,0.05),transparent)]" />
      </div>

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
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(60%_40%_at_50%_-10%,rgba(0,0,0,0.18),rgba(0,0,0,0))]" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 py-24 md:py-32">
        <h1 className="text-center font-[Space_Grotesk] uppercase tracking-widest text-5xl md:text-7xl">
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

        {/* OUR EXCEPTIONAL TEAM — Glassy tiles with socials */}
        <section className="mt-16 md:mt-20">
          <header className="text-center mb-8 md:mb-10">
            <h2 className="font-[Space_Grotesk] tracking-widest text-3xl md:text-5xl">
              Our Exceptional Team
            </h2>
            <p className="mt-2 text-white/80">
              Creativity, infrastructure, and outreach working together.
            </p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 justify-items-center">
            {MINI_TEAM.map((m) => {
              const igDisabled = !m.instagram
              return (
                <article
                  key={m.name}
                  className="relative w-full max-w-[19rem] overflow-hidden rounded-2xl border border-white/15 backdrop-blur-md
                             shadow-[0_20px_80px_rgba(0,0,0,0.35)] hover:shadow-[0_30px_120px_rgba(0,0,0,0.45)] transition-shadow"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.05) 100%)',
                  }}
                >
                  {/* subtle brand wash */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        'radial-gradient(90% 70% at -10% -10%, rgba(0,51,255,0.10), transparent 60%), radial-gradient(90% 70% at 110% -10%, rgba(108,0,255,0.10), transparent 60%)',
                    }}
                  />
                  <div className="relative p-3">
                    <div className="rounded-xl overflow-hidden ring-1 ring-white/20 bg-white/[0.06]">
                      <div className="aspect-[3/4] w-full">
                        <img
                          src={m.image}
                          alt={m.name}
                          className={`h-full w-full object-cover ${m.imgClass ?? ''}`}
                        />
                      </div>
                    </div>

                    <div className="mt-3 text-center">
                      <h3 className="text-lg font-semibold">{m.name}</h3>
                      <div className="mt-1 inline-flex items-center rounded-full border border-white/20 bg-white/[0.06] px-3 py-1 text-[11px] text-white/85">
                        {m.role}
                      </div>
                    </div>

                    {/* Socials */}
                    <div className="mt-3 mb-1 flex items-center justify-center gap-3">
                      <a
                        href="#"
                        className="p-2 text-white/70 bg-white/[0.06] rounded-full border border-white/15 hover:bg-white/15 hover:text-white transition hover:scale-105"
                        aria-label={`${m.name}'s X profile`}
                      >
                        <XIcon />
                      </a>

                      <a
                        href={m.instagram || '#'}
                        target={igDisabled ? undefined : '_blank'}
                        rel={igDisabled ? undefined : 'noopener noreferrer'}
                        className={[
                          'p-2 rounded-full border transition hover:scale-105',
                          igDisabled
                            ? 'cursor-not-allowed text-white/40 bg-white/[0.04] border-white/10'
                            : 'text-white/80 bg-white/[0.06] border-white/15 hover:text-white hover:bg-gradient-to-br hover:from-purple-500/70 hover:to-pink-500/70',
                        ].join(' ')}
                        aria-label={`${m.name}'s Instagram profile`}
                      >
                        <InstagramIcon />
                      </a>

                      <a
                        href="#"
                        className="p-2 text-white/70 bg-white/[0.06] rounded-full border border-white/15 hover:bg-white/15 hover:text-white transition hover:scale-105"
                        aria-label={`${m.name}'s Facebook profile`}
                      >
                        <FacebookIcon />
                      </a>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </section>
        {/* END TEAM TILES */}

        {/* PROCESS */}
        <div className="mt-20 md:mt-28">
          <header className="text-center mb-8 md:mb-10">
            <h2 className="font-[Space_Grotesk] uppercase tracking-widest text-3xl md:text-4xl">
              The Process
            </h2>
            <p className="mt-2 text-white/80">A clear, step-by-step flow. No hidden surprises.</p>
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
                      i % 2 === 0 ? 'md:pr-16 md:mr-[52%]' : 'md:pl-16 md:ml-[52%]',
                    ].join(' ')}
                  >
                    <div
                      className="relative overflow-hidden rounded-2xl border border-white/15 backdrop-blur-md
                                 shadow-[0_20px_80px_rgba(0,0,0,0.35)]"
                      style={{
                        background:
                          'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.04) 100%)',
                      }}
                    >
                      {/* subtle brand wash */}
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0"
                        style={{
                          background:
                            'radial-gradient(90% 70% at -10% -10%, rgba(0,51,255,0.10), transparent 60%), radial-gradient(90% 70% at 110% -10%, rgba(108,0,255,0.10), transparent 60%)',
                        }}
                      />
                      <div className="relative px-4 py-4 md:px-5 md:py-5">
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

