// src/sections/Team.tsx
import React, { useEffect, useMemo, useState } from 'react'
import sladeIntro from '../assets/slade_pic_intro_1.jpeg'
import shevanprofile from '../assets/ProfilePic_Shevan.png'
import seniprofile from '../assets/Seni_picintro.jpeg'

type TeamKey = 'Shevan' | 'Seni' | 'Slade'

type TeamMember = {
  key: TeamKey
  name: string
  role: string
  imageUrl: string
  imgClass?: string
  bio: string
  instagram?: string   // <-- optional
}

const teamMembers: TeamMember[] = [
  {
    key: 'Shevan',
    name: 'Shevan',
    role: 'Marketing and Strategy',
    imageUrl: shevanprofile,
    imgClass: 'object-top',
    bio:
      'Creative lead focused on brand systems, campaigns, and content that actually converts. Blends design thinking with strategy to make ideas land.',
    instagram: 'https://www.instagram.com/sh3van.n', // <-- valid string with scheme
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
  },
  {
    key: 'Slade',
    name: 'Slade',
    role: 'Client Relations and Strategy',
    imageUrl: sladeIntro,
    imgClass: 'object-center',
    bio:
      'Frontline for client growth. Outreach, enablement, and operations—turning conversations into long-term partnerships and results.',
    instagram: 'https://www.instagram.com/slxde.xx'
  },
]

// --- Simple icons ---
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

// ----- Toolbox -----
const TOOLBOX: Record<TeamKey, { title: string; items: string[] }[]> = {
  Seni: [
    {
      title: 'IT & Infrastructure',
      items: [
        'Azure, AWS',
        'VMware, VirtualBox',
        'Windows Server 2012/2016/2019',
        'Active Directory, SCCM',
        'Linux (Ubuntu, Arch, Debian, RHEL/CentOS)',
        'Aruba switches, pfSense/IPFire',
        'OSSIM AlienVault, Splunk, SolarWinds ITSM, Veeam',
      ],
    },
    { title: 'Data & Scripting', items: ['Python (project scripts)', 'Bash automation'] },
  ],
  Shevan: [
    {
      title: 'Creative Production',
      items: [
        'Adobe Photoshop, Illustrator, InDesign',
        'Final Cut Pro, Adobe Premiere Pro',
        'Logic Pro X, Cubase',
        'Adobe Audition',
      ],
    },
    { title: '3D & Interactive', items: ['Blender (product/visual modeling)', 'Three.js prototypes / embeds'] },
    { title: 'Marketing & Ads', items: ['Meta Ads', 'Google Ads', 'Hootsuite Platform', 'Social Listening', 'Social Media Marketing'] },
  ],
  Slade: [
    { title: 'Ops & Sales Enablement', items: ['Client outreach & CRM', 'Campaign support', 'Retail ops experience'] },
    { title: 'Marketing & Ads', items: ['Meta Ads', 'Google Ads', 'Social Messaging', 'Community management'] },
  ],
}

// ---- Card ----
function TeamMemberCard({ member, onOpen }: { member: TeamMember; onOpen: () => void }) {
  // only stop opening the modal; let the link navigate
  const stopCardClick = (e: React.MouseEvent) => e.stopPropagation()

  const igHref = member.instagram || '#'
  const igDisabled = !member.instagram

  return (
    <button
      onClick={onOpen}
      className="w-full max-w-[22rem] group flex flex-col items-center text-center p-6 bg-white/95 dark:bg-gray-900 rounded-2xl shadow-sm hover:shadow-xl dark:shadow-gray-900/20 dark:hover:shadow-gray-900/40 transition-all duration-300 border border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700 hover:-translate-y-1"
      aria-label={`Open profile for ${member.name}`}
    >
      <div className="relative mb-4 w-40 h-56 md:w-48 md:h-64 rounded-xl ring-4 ring-white dark:ring-gray-800 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
        <img
          className={`absolute inset-0 w-full h-full object-cover ${member.imgClass ?? ''}`}
          src={member.imageUrl}
          alt={`Portrait of ${member.name}`}
        />
      </div>

      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
        {member.name}
      </h3>
      <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-4 px-3 py-1 bg-gray-50 dark:bg-gray-800 rounded-full">
        {member.role}
      </p>

      {/* Socials */}
      <div className="flex space-x-3" onClick={stopCardClick}>
        <a
          href="#"
          className="p-2 text-gray-400 bg-gray-100 dark:bg-gray-800 rounded-full transition-all duration-300 hover:text-white hover:bg-blue-500 dark:hover:bg-blue-600 hover:scale-110 hover:shadow-lg"
          aria-label={`${member.name}'s X profile`}
        >
          <XIcon />
        </a>

        <a
          href={igHref}
          target={igDisabled ? undefined : '_blank'}
          rel={igDisabled ? undefined : 'noopener noreferrer'}
          className={[
            'p-2 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg',
            igDisabled
              ? 'cursor-not-allowed text-gray-300 bg-gray-100 dark:bg-gray-800'
              : 'text-gray-400 bg-gray-100 dark:bg-gray-800 hover:text-white hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500',
          ].join(' ')}
          aria-label={`${member.name}'s Instagram profile`}
        >
          <InstagramIcon />
        </a>

        <a
          href="#"
          className="p-2 text-gray-400 bg-gray-100 dark:bg-gray-800 rounded-full transition-all duration-300 hover:text-white hover:bg-blue-600 dark:hover:bg-blue-700 hover:scale-110 hover:shadow-lg"
          aria-label={`${member.name}'s Facebook profile`}
        >
          <FacebookIcon />
        </a>
      </div>
    </button>
  )
}

// ---- Full-screen Modal ----
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

        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[420px_minmax(0,1fr)] gap-0">
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
                    href="https://calendly.com/theikigaiproject-ca/30min?month=2025-10" target="_blank" rel="noopener noreferrer"
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

// ---- Page ----
export default function TeamMemberSection() {
  const [openKey, setOpenKey] = useState<TeamKey | null>(null)
  const active = teamMembers.find((m) => m.key === openKey) || null

  return (
    <section className="relative bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-black dark:via-gray-900 dark:to-black overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.05)_1px,transparent_0)] dark:bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)] bg-[size:20px_20px]" />
      <div className="relative w-full px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="w-full text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium mb-6">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            Meet Our Team
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white mb-6">
            Our Exceptional Team
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            Meet our outstanding team — creativity, infrastructure, and outreach working together.
          </p>
        </div>

        <div className="mx-auto max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {teamMembers.map((m, i) => (
            <div key={m.name} className="animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
              <TeamMemberCard member={m} onOpen={() => setOpenKey(m.key)} />
            </div>
          ))}
        </div>
      </div>

      {active && <ProfileModal member={active} onClose={() => setOpenKey(null)} />}
    </section>
  )
}

