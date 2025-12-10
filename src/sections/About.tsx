// src/sections/About.tsx
import React, { useEffect, useMemo, useState } from 'react'
import Particles from '../components/Particles'

// team images (same assets used on /team)
import sladeIntro from '../assets/slade_pic_intro_1.jpeg'
import shevanprofile from '../assets/ProfilePic_Shevan.png'
import seniprofile from '../assets/Seni_picintro.jpeg'

/* -------------------- Types & Data -------------------- */
type TeamKey = 'Shevan' | 'Seni' | 'Slade'

type TeamMember = {
  key: TeamKey
  name: string
  role: string
  imageUrl: string
  imgClass?: string
  bio: string
  instagram?: string
  linkedin?: string
  x?: string
}

const TEAM: TeamMember[] = [
  {
    key: 'Shevan',
    name: 'Shevan',
    role: 'Marketing and Strategy',
    imageUrl: shevanprofile,
    imgClass: 'object-top',
    bio:
      'Creative lead focused on brand systems, campaigns, and content that converts. Blends design thinking with strategy to make ideas land.',
    instagram: 'https://www.instagram.com/sh3van.n',
    linkedin: '#',
    x: '#',
  },
  {
    key: 'Seni',
    name: 'Seni',
    role: 'IT and Strategy',
    imageUrl: seniprofile,
    imgClass: 'object-center',
    bio:
      'Systems & infrastructure. Builds the backbone—automation, security, and performance—so products ship fast and scale cleanly.',
    instagram: 'https://www.instagram.com/seniii.r',
    linkedin: '#',
    x: '#',
  },
  {
    key: 'Slade',
    name: 'Slade',
    role: 'Client Relations and Strategy',
    imageUrl: sladeIntro,
    imgClass: 'object-center',
    bio:
      'Frontline for client growth. Outreach, enablement, and operations—turning conversations into long-term partnerships and results.',
    instagram: 'https://www.instagram.com/slxde.xx',
    linkedin: '#',
    x: '#',
  },
]

// Toolbox shown inside the modal
const TOOLBOX: Record<TeamKey, { title: string; items: string[] }[]> = {
  Seni: [
    {
      title: 'IT & Infrastructure',
      items: [
        'Azure, AWS',
        'Windows Server, AD / GPO',
        'Linux (Fedora, Arch, Debian)',
        'Aruba/Cisco networking',
        'SCCM / imaging / endpoint',
      ],
    },
    { title: 'Automation & Scripting', items: ['Python', 'Bash', 'PowerShell basics'] },
  ],
  Shevan: [
    {
      title: 'Creative Production',
      items: [
        'Photoshop, Illustrator, InDesign',
        'Premiere Pro, Final Cut Pro',
        'After Effects (motion templates)',
      ],
    },
    { title: '3D & Interactive', items: ['Blender', 'Three.js / OGL prototypes'] },
    { title: 'Marketing', items: ['Meta Ads', 'Google Ads', 'Content systems'] },
  ],
  Slade: [
    { title: 'Ops & Enablement', items: ['CRM & outreach', 'Lead funnels', 'Campaign ops'] },
    { title: 'Community', items: ['Social messaging', 'Retention & feedback loops'] },
  ],
}

/* -------------------- Icons -------------------- */
const LinkedInIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 382 382"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M347.445,0H34.555C15.471,0,0,15.471,0,34.555v312.889C0,366.529,15.471,382,34.555,382h312.889
      C366.529,382,382,366.529,382,347.444V34.555C382,15.471,366.529,0,347.445,0z M118.207,329.844
      c0,5.554-4.502,10.056-10.056,10.056H65.345c-5.554,0-10.056-4.502-10.056-10.056V150.403
      c0-5.554,4.502-10.056,10.056-10.056h42.806c5.554,0,10.056,4.502,10.056,10.056V329.844z
      M86.748,123.432c-22.459,0-40.666-18.207-40.666-40.666S64.289,42.1,86.748,42.1
      s40.666,18.207,40.666,40.666S109.208,123.432,86.748,123.432z M341.91,330.654
      c0,5.106-4.14,9.246-9.246,9.246H286.73c-5.106,0-9.246-4.14-9.246-9.246v-84.168
      c0-12.556,3.683-55.021-32.813-55.021c-28.309,0-34.051,29.066-35.204,42.11v97.079
      c0,5.106-4.139,9.246-9.246,9.246h-44.426c-5.106,0-9.246-4.14-9.246-9.246V149.593
      c0-5.106,4.14-9.246,9.246-9.246h44.426c5.106,0,9.246,4.14,9.246,9.246v15.655
      c10.497-15.753,26.097-27.912,59.312-27.912c73.552,0,73.131,68.716,73.131,106.472V330.654z" />
  </svg>
);



const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003Zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.282.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.231 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.843-.038 1.096-.047 3.232-.047h.001Zm4.905 1.882a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4ZM8 4.465a3.535 3.535 0 1 0 0 7.07 3.535 3.535 0 0 0 0-7.07ZM8 5.535a2.465 2.465 0 1 1 0 4.93 2.465 2.465 0 0 1 0-4.93Z"/>
  </svg>
)

const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.31l5.74-6.57L0 .75h5.063l3.495 4.633L12.6.75ZM11.47 13.5h1.146L4.74 2.15H3.522l7.95 11.35Z"/>
  </svg>
)

/* -------------------- Steps data -------------------- */
const STEPS = [
  { title: 'Discovery Call', desc: 'Quick intro chat to understand goals.' },
  { title: 'Scope & Quote', desc: 'We map out deliverables and costs.' },
  { title: 'Draft Build', desc: 'First version delivered for review.' },
  { title: 'Revisions', desc: 'Feedback loop until it feels right.' },
  { title: 'Launch', desc: 'Project goes live with full support.' },
  { title: 'Post-Launch Support', desc: '14-day safety net for fixes/questions.' },
]

/* -------------------- Team Card (click to open) -------------------- */
function TeamTile({ member, onOpen }: { member: TeamMember; onOpen: () => void }) {
  const stopCardClick = (e: React.MouseEvent) => e.stopPropagation()
  const igDisabled = !member.instagram
  const liDisabled = !member.linkedin
  const xDisabled  = !member.x

  return (
    <button
      onClick={onOpen}
      className="relative w-full max-w-[19rem] overflow-hidden rounded-2xl border border-white/15 backdrop-blur-md
                 shadow-[0_20px_80px_rgba(0,0,0,0.35)] transition-transform duration-300 transform-gpu
                 hover:-translate-y-1 hover:scale-[1.03]
                 hover:shadow-[0_30px_120px_rgba(0,0,0,0.45)] text-left"
      style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.05) 100%)' }}
      aria-label={`Open profile for ${member.name}`}
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
              src={member.imageUrl}
              alt={member.name}
              className={`h-full w-full object-cover ${member.imgClass ?? ''}`}
            />
          </div>
        </div>

        <div className="mt-3 text-center">
          <h3 className="text-lg font-semibold text-white">{member.name}</h3>
          <div className="mt-1 inline-flex items-center rounded-full border border-white/20 bg-white/[0.06] px-3 py-1 text-[11px] text-white/85">
            {member.role}
          </div>
        </div>

        {/* Socials (do not trigger modal) — LinkedIn, Instagram, X */}
        <div className="mt-3 mb-1 flex items-center justify-center gap-3" onClick={stopCardClick}>
          {/* LinkedIn */}
          <a
            href={member.linkedin || '#'}
            target={liDisabled ? undefined : '_blank'}
            rel={liDisabled ? undefined : 'noopener noreferrer'}
            className={[
              'p-2 rounded-full border transition hover:scale-105',
              liDisabled
                ? 'cursor-not-allowed text-white/40 bg-white/[0.04] border-white/10'
                : 'text-white/80 bg-white/[0.06] border-white/15 hover:text-white hover:bg-white/15',
            ].join(' ')}
            aria-label={`${member.name}'s LinkedIn profile`}
          >
            <LinkedInIcon />
          </a>

          {/* Instagram */}
          <a
            href={member.instagram || '#'}
            target={igDisabled ? undefined : '_blank'}
            rel={igDisabled ? undefined : 'noopener noreferrer'}
            className={[
              'p-2 rounded-full border transition hover:scale-105',
              igDisabled
                ? 'cursor-not-allowed text-white/40 bg-white/[0.04] border-white/10'
                : 'text-white/80 bg-white/[0.06] border-white/15 hover:text-white hover:bg-gradient-to-br hover:from-purple-500/70 hover:to-pink-500/70',
            ].join(' ')}
            aria-label={`${member.name}'s Instagram profile`}
          >
            <InstagramIcon />
          </a>

          {/* X */}
          <a
            href={member.x || '#'}
            target={xDisabled ? undefined : '_blank'}
            rel={xDisabled ? undefined : 'noopener noreferrer'}
            className={[
              'p-2 rounded-full border transition hover:scale-105',
              xDisabled
                ? 'cursor-not-allowed text-white/40 bg-white/[0.04] border-white/10'
                : 'text-white/80 bg-white/[0.06] border-white/15 hover:text-white hover:bg-white/15',
            ].join(' ')}
            aria-label={`${member.name}'s X profile`}
          >
            <XIcon />
          </a>
        </div>
      </div>
    </button>
  )
}

/* -------------------- Full-screen Modal -------------------- */
function ProfileModal({ member, onClose }: { member: TeamMember; onClose: () => void }) {
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  const sections = useMemo(() => TOOLBOX[member.key], [member.key])

  return (
    <div className="fixed inset-0 z-[100]" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />

      <div
        className="absolute inset-3 md:inset-6 lg:inset-10 rounded-2xl overflow-hidden border border-white/15 bg-white/10 backdrop-blur-xl shadow-[0_20px_100px_rgba(0,0,0,0.6)] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-5 md:px-8 py-4 bg-gradient-to-b from-black/20 to-transparent backdrop-blur-sm">
          <div className="text-white/90">
            <div className="text-2xl md:text-3xl font-semibold">{member.name}</div>
            <div className="text-white/70">{member.role}</div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full bg-white/15 hover:bg-white/25 text-white p-2 border border-white/20"
            aria-label="Close profile"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[420px_minmax(0,1fr)] gap-0">
            {/* Portrait */}
            <div className="relative lg:sticky lg:top-0 p-5 md:p-8 self-start">
              <div className="relative w-full h-[480px] lg:h-[calc(100vh-10rem)] rounded-2xl overflow-hidden ring-1 ring-white/20 bg-black/30">
                <img
                  src={member.imageUrl}
                  alt={member.name}
                  className={`absolute inset-0 w-full h-full object-cover ${member.imgClass ?? ''}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
            </div>

            {/* Details */}
            <div className="px-5 md:px-8 pb-10">
              <section className="pt-2 md:pt-4">
                <h3 className="text-xl font-semibold text-white/95">About</h3>
                <p className="mt-3 text-white/85 leading-relaxed">{member.bio}</p>
              </section>

              <section className="mt-10">
                <h3 className="text-xl font-semibold text-white/95">Toolbox</h3>
                <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
                  {sections.map((sec) => (
                    <div key={sec.title} className="rounded-xl border border-white/15 bg-white/7 backdrop-blur-md p-4 md:p-5">
                      <div className="font-medium text-white/95">{sec.title}</div>
                      <ul className="mt-3 space-y-1.5 text-white/85 text-sm leading-relaxed">
                        {sec.items.map((it, i) => (
                          <li key={i} className="flex gap-2">
                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/60" />
                            <span>{it}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              <section className="mt-10">
                <h3 className="text-xl font-semibold text-white/95">Links</h3>
                <div className="mt-3 flex gap-3">
                  <a className="px-3 py-2 rounded-lg bg-white text-black text-sm font-medium hover:bg-white/90" href="/Work">
                    View Work
                  </a>
                  <a
                    className="px-3 py-2 rounded-lg border border-white/25 text-white/90 text-sm hover:bg-white/10"
                    href="https://calendly.com/theikigaiproject-ca/30min?month=2025-10"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Connect
                  </a>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* -------------------- Page -------------------- */
export default function About() {
  const [openKey, setOpenKey] = useState<TeamKey | null>(null)
  const active = TEAM.find((m) => m.key === openKey) || null

  return (
    <section className="relative min-h-[110vh] overflow-hidden text-white font-[Inter] bg-[#060a18]">
      {/* --- Hue background (match Services) --- */}
      <div className="pointer-events-none absolute inset-0 -z-30">
        {/* deep navy base to near-black */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, #0b1220 0%, #070a14 40%, #05070d 100%)' }}
        />
        {/* top blue wash */}
        <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_50%_-140px,rgba(59,130,246,0.18),transparent_60%)]" />
        {/* right purple glow */}
        <div className="absolute inset-0 bg-[radial-gradient(900px_600px_at_82%_48%,rgba(168,85,247,0.12),transparent_60%)]" />
        {/* left blue glow */}
        <div className="absolute inset-0 bg-[radial-gradient(900px_600px_at_18%_56%,rgba(59,130,246,0.10),transparent_60%)]" />
      </div>

      {/* Particles background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="w-full h-full relative">
          <Particles
            particleColors={['#8ab4ff', '#b388ff', '#ffffff']}
            particleCount={220}
            particleSpread={10}
            speed={0.1}
            particleBaseSize={300}
            moveParticlesOnHover={true}
            alphaParticles={false}
            disableRotation={false}
            className="pointer-events-none"
          />
        </div>
      </div>

      {/* Soft vignette */}
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

        {/* OUR EXCEPTIONAL TEAM — tiles that open modal */}
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
            {TEAM.map((m) => (
              <TeamTile key={m.key} member={m} onOpen={() => setOpenKey(m.key)} />
            ))}
          </div>
        </section>

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
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-white/15" />
            <ul className="space-y-8 md:space-y-10">
              {STEPS.map((s, i) => (
                <li key={s.title} className="relative">
                  <div className="absolute left-1/2 -translate-x-1/2">
                    <div className="flex items-center justify-center h-9 w-9 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.15)]">
                      <span className="text-sm font-semibold">{i + 1}</span>
                    </div>
                  </div>

                  <div className={['mt-4', i % 2 === 0 ? 'md:pr-16 md:mr-[52%]' : 'md:pl-16 md:ml-[52%]'].join(' ')}>
                    <div
                      className="relative overflow-hidden rounded-2xl border border-white/15 backdrop-blur-md
                                 shadow-[0_20px_80px_rgba(0,0,0,0.35)]"
                      style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.04) 100%)' }}
                    >
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
      </div>

      {/* Modal */}
      {active && <ProfileModal member={active} onClose={() => setOpenKey(null)} />}
    </section>
  )
}

