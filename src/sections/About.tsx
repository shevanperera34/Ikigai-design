// src/sections/About.tsx
import React, { useEffect, useMemo } from "react"
import { useLocation } from "react-router-dom"
import type { StaticImageData } from "next/image"
import Particles from "../components/Particles"
import SEOText from "../components/SEOText"
import SEO from "../components/SEO"
import ExceptionalTeamCluster from "../components/ExceptionalTeamCluster"

// team images
import sladeIntro from "../assets/slade_pic_intro_1.jpeg"
import shevanprofile from "../assets/ProfilePic_Shevan.png"
import seniprofile from "../assets/Seni_picintro.jpeg"

/* -------------------- Types -------------------- */
type TeamKey = "Shevan" | "Seni" | "Slade"

type ToolboxSection = { title: string; items: string[] }

type TeamMember = {
  key: TeamKey
  name: string
  role: string
  imageUrl: string | StaticImageData
  imgClass?: string

  // short card bio
  bio: string

  // full modal content
  about: string
  whatIDo: string[]
  toolbox: ToolboxSection[]

  instagram?: string
  linkedin?: string
  x?: string
}

/* -------------------- Data -------------------- */
const TEAM: TeamMember[] = [
  {
    key: "Shevan",
    name: "Shevan",
    role: "Marketing and Strategy",
    imageUrl: shevanprofile,
    imgClass: "object-top",
    bio:
      "Creative lead focused on brand systems, campaigns, and content that converts. Blends design thinking with strategy to make ideas land.",
    about:
      "I build brands, campaigns, and content systems designed to actually move people, not just sit around looking aesthetic. My work lives where strategy, design, and culture meet. The goal is simple: clarity, momentum, and results you can feel in real life, not just in a dashboard.\n\n" +
      "My background blends creative direction, marketing strategy, and live performance, which means I care a lot about presence. A brand should feel alive. It should say something, stand for something, and show up with confidence. I help founders and teams define that identity, turn it into a system, and scale it with content and smart marketing.\n\n" +
      "If you want a brand that feels human, modern, and built to grow, that’s the lane I operate in.",
    whatIDo: [
      "Brand identity and brand systems",
      "Campaign strategy and execution",
      "Content strategy and production direction",
      "Performance marketing and funnels",
      "Everything is designed to convert, not just look good.",
    ],
    toolbox: [
      {
        title: "Creative Production",
        items: [
          "Adobe Photoshop",
          "Adobe Illustrator",
          "Adobe InDesign",
          "Premiere Pro",
          "Final Cut Pro",
          "After Effects (motion graphics and templates)",
        ],
      },
      {
        title: "3D & Interactive",
        items: [
          "Blender",
          "Three.js / WebGL prototypes",
          "3D visuals, product renders, interactive brand assets",
        ],
      },
      {
        title: "Marketing & Growth",
        items: [
          "Meta Ads",
          "Google Ads",
          "Content systems",
          "Funnel architecture and optimization",
        ],
      },
    ],
    instagram: "https://www.instagram.com/sh3van.n",
    x: "https://x.com/PereraShevan",
    linkedin: "https://www.linkedin.com/in/shevan-p-b62922242/",
  },
  {
    key: "Seni",
    name: "Seni",
    role: "IT and Strategy",
    imageUrl: seniprofile,
    imgClass: "object-center",
    bio:
      "Systems & infrastructure. Builds the backbone, automation, security, and performance, so products ship fast and scale cleanly.",
    about:
      "I build the technical backbone that makes everything else possible. If the brand is the face, the infrastructure is the nervous system, and I’m obsessed with making it fast, secure, and reliable.\n\n" +
      "My lane is clean deployments, strong security, and systems that don’t crumble when real users show up. I think in networks, performance bottlenecks, failure points, and automation, because the goal isn’t just launching, it’s staying online and scaling without chaos.\n\n" +
      "If you want a site that loads fast, stays stable, and doesn’t become a maintenance nightmare… that’s what I build.",
    whatIDo: [
      "Web infrastructure and deployment systems",
      "Performance optimization (real-world speed, not just Lighthouse flex)",
      "Security fundamentals (hardening, access control, safer defaults)",
      "Automation that saves hours (builds, scripts, repeatable processes)",
    ],
    toolbox: [
      {
        title: "IT & Infrastructure",
        items: [
          "Azure, AWS",
          "Windows Server, AD / GPO",
          "Linux (Fedora, Arch, Debian)",
          "Aruba / Cisco networking",
          "SCCM / imaging / endpoint fundamentals",
        ],
      },
      {
        title: "Automation & Scripting",
        items: ["Python", "Bash", "PowerShell (basics)"],
      },
      {
        title: "Security & Reliability",
        items: [
          "Baseline hardening & access control",
          "Monitoring mindset (logs, traces, issues before users complain)",
          "Operational thinking (repeatable, documented, maintainable)",
        ],
      },
    ],
    instagram: "https://www.instagram.com/seniii.r",
    x: "https://x.com/seniii_r",
    linkedin: "https://www.linkedin.com/in/seni/",
  },
  {
    key: "Slade",
    name: "Slade",
    role: "Client Relations and Strategy",
    imageUrl: sladeIntro,
    imgClass: "object-center",
    bio:
      "Frontline for client growth. Outreach, enablement, and operations, turning conversations into long-term partnerships and results.",
    about:
      "I’m the bridge between what a client wants and what we ship. I focus on clarity, communication, and momentum, so projects don’t stall, expectations stay aligned, and outcomes stay real.\n\n" +
      "I care about relationships, but I care even more about results. That means great onboarding, clean handoffs, and a process clients actually enjoy (instead of dread).\n\n" +
      "If you want a team that’s sharp, responsive, and serious about delivering, without the agency headache, I’m here to make that happen.",
    whatIDo: [
      "Client onboarding and project alignment",
      "Outreach, partnerships, and relationship building",
      "Operational flow (keeping things moving, clean timelines)",
      "Turning interest into action (and action into long-term growth)",
    ],
    toolbox: [
      {
        title: "Ops & Enablement",
        items: ["CRM & outreach workflows", "Lead funnels", "Campaign operations"],
      },
      {
        title: "Client Strategy",
        items: [
          "Discovery & requirements clarity",
          "Project coordination & follow-through",
          "Retention & feedback loops",
        ],
      },
      {
        title: "Growth Support",
        items: ["Partnership building", "Messaging clarity", "Conversion-focused support"],
      },
    ],
    instagram: "https://www.instagram.com/slxde.xx",
    x: "https://x.com/yourhandle",
    linkedin: "https://www.linkedin.com/in/afolabi-akinlolu-bb461735a/",
  },
]

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
)

const XIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.31l5.74-6.57L0 .75h5.063l3.495 4.633L12.6.75ZM11.47 13.5h1.146L4.74 2.15H3.522l7.95 11.35Z" />
  </svg>
)

const InstagramIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 256 256"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M127.999746,23.06353 C162.177385,23.06353 166.225393,23.1936027 179.722476,23.8094161 C192.20235,24.3789926 198.979853,26.4642218 203.490736,28.2166477 C209.464938,30.5386501 213.729395,33.3128586 218.208268,37.7917319 C222.687141,42.2706052 225.46135,46.5350617 227.782844,52.5092638 C229.535778,57.0201472 231.621007,63.7976504 232.190584,76.277016 C232.806397,89.7746075 232.93647,93.8226147 232.93647,128.000254 C232.93647,162.177893 232.806397,166.225901 232.190584,179.722984 C231.621007,192.202858 229.535778,198.980361 227.782844,203.491244 C225.46135,209.465446 222.687141,213.729903 218.208268,218.208776 C213.729395,222.687649 209.464938,225.461858 203.490736,227.783352 C198.979853,229.536286 192.20235,231.621516 179.722476,232.191092 C166.227425,232.806905 162.179418,232.936978 127.999746,232.936978 C93.8200742,232.936978 89.772067,232.806905 76.277016,232.191092 C63.7971424,231.621516 57.0196391,229.536286 52.5092638,227.783352 C46.5345536,225.461858 42.2700971,222.687649 37.7912238,218.208776 C33.3123505,213.729903 30.538142,209.465446 28.2166477,203.491244 C26.4637138,198.980361 24.3784845,192.202858 23.808908,179.723492 C23.1930946,166.225901 23.0630219,162.177893 23.0630219,128.000254 C23.0630219,93.8226147 23.1930946,89.7746075 23.808908,76.2775241 C24.3784845,63.7976504 26.4637138,57.0201472 28.2166477,52.5092638 C30.538142,46.5350617 33.3123505,42.2706052 37.7912238,37.7917319 C42.2700971,33.3128586 46.5345536,30.5386501 52.5092638,28.2166477 C57.0196391,26.4642218 63.7971424,24.3789926 76.2765079,23.8094161 C89.7740994,23.1936027 93.8221066,23.06353 127.999746,23.06353 M127.999746,0 C93.2367791,0 88.8783247,0.147348072 75.2257637,0.770274749 C61.601148,1.39218523 52.2968794,3.55566141 44.1546281,6.72008828 C35.7374966,9.99121548 28.5992446,14.3679613 21.4833489,21.483857 C14.3674532,28.5997527 9.99070739,35.7380046 6.71958019,44.1551362 C3.55515331,52.2973875 1.39167714,61.6016561 0.769766653,75.2262718 C0.146839975,88.8783247 0,93.2372872 0,128.000254 C0,162.763221 0.146839975,167.122183 0.769766653,180.774236 C1.39167714,194.398852 3.55515331,203.703121 6.71958019,211.845372 C9.99070739,220.261995 14.3674532,227.400755 21.4833489,234.516651 C28.5992446,241.632547 35.7374966,246.009293 44.1546281,249.28042 C52.2968794,252.444847 61.601148,254.608323 75.2257637,255.230233 C88.8783247,255.85316 93.2367791,256 127.999746,256 C162.762713,256 167.121675,255.85316 180.773728,255.230233 C194.398344,254.608323 203.702613,252.444847 211.844864,249.28042 C220.261995,246.009293 227.400247,241.632547 234.516143,234.516651 C241.632039,227.400755 246.008785,220.262503 249.279912,211.845372 C252.444339,203.703121 254.607815,194.398852 255.229725,180.774236 C255.852652,167.122183 256,162.763221 256,128.000254 C256,93.2372872 255.852652,88.8783247 255.229725,75.2262718 C254.607815,61.6016561 252.444339,52.2973875 249.279912,44.1551362 C246.008785,35.7380046 241.632039,28.5997527 234.516143,21.483857 C227.400247,14.3679613 220.261995,9.99121548 211.844864,6.72008828 C203.702613,3.55566141 194.398344,1.39218523 180.773728,0.770274749 C167.121675,0.147348072 162.762713,0 127.999746,0 Z M127.999746,62.2703115 C91.698262,62.2703115 62.2698034,91.69877 62.2698034,128.000254 C62.2698034,164.301738 91.698262,193.730197 127.999746,193.730197 C164.30123,193.730197 193.729689,164.301738 193.729689,128.000254 C193.729689,91.69877 164.30123,62.2703115 127.999746,62.2703115 Z M127.999746,170.667175 C104.435741,170.667175 85.3328252,151.564259 85.3328252,128.000254 C85.3328252,104.436249 104.435741,85.3333333 127.999746,85.3333333 C151.563751,85.3333333 170.666667,104.436249 170.666667,128.000254 C170.666667,151.564259 151.563751,170.667175 127.999746,170.667175 Z M211.686338,59.6734287 C211.686338,68.1566129 204.809755,75.0337031 196.326571,75.0337031 C187.843387,75.0337031 180.966297,68.1566129 180.966297,59.6734287 C180.966297,51.1902445 187.843387,44.3136624 196.326571,44.3136624 C204.809755,44.3136624 211.686338,51.1902445 211.686338,59.6734287 Z" />
  </svg>
)

/* -------------------- Steps data -------------------- */
const STEPS = [
  { title: "Discovery Call", desc: "Quick intro chat to understand goals." },
  { title: "Scope & Quote", desc: "We map out deliverables and costs." },
  { title: "Confirm Alignment", desc: "Finalize Terms and payments" },
  { title: "Draft Build", desc: "First version delivered for review." },
  { title: "Revisions", desc: "Feedback loop until it feels right." },
  { title: "Launch", desc: "Project goes live with full support." },
  { title: "Post-Launch Support", desc: "14-day safety net for fixes/questions." },
]

/* -------------------- Team Card -------------------- */
function TeamTile({ member, onOpen }: { member: TeamMember; onOpen: () => void }) {
  const stopCardClick = (e: React.MouseEvent) => e.stopPropagation()
  const imageSrc = typeof member.imageUrl === "string" ? member.imageUrl : member.imageUrl.src

  const SocialBtn = ({
    href,
    label,
    children,
    variant = "default",
  }: {
    href?: string
    label: string
    children: React.ReactNode
    variant?: "default" | "instagram"
  }) => {
    const disabled = !href
    return (
      <a
        href={disabled ? undefined : href}
        target={disabled ? undefined : "_blank"}
        rel={disabled ? undefined : "noopener noreferrer"}
        aria-label={`${member.name}'s ${label}`}
        onClick={(e) => {
          if (disabled) e.preventDefault()
        }}
        className={[
          "p-2 rounded-full border transition hover:scale-105",
          disabled
            ? "cursor-not-allowed text-white/40 bg-white/[0.04] border-white/10"
            : variant === "instagram"
              ? "text-white/80 bg-white/[0.06] border-white/15 hover:text-white hover:bg-gradient-to-br hover:from-purple-500/70 hover:to-pink-500/70"
              : "text-white/80 bg-white/[0.06] border-white/15 hover:text-white hover:bg-white/15",
        ].join(" ")}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      onClick={onOpen}
      className="relative w-full max-w-[19rem] overflow-hidden rounded-2xl border border-white/15 backdrop-blur-md
                 shadow-[0_20px_80px_rgba(0,0,0,0.35)] transition-transform duration-300 transform-gpu
                 hover:-translate-y-1 hover:scale-[1.03]
                 hover:shadow-[0_30px_120px_rgba(0,0,0,0.45)] text-left"
      style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.05) 100%)" }}
      aria-label={`Open profile for ${member.name}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(90% 70% at -10% -10%, rgba(0,51,255,0.10), transparent 60%), radial-gradient(90% 70% at 110% -10%, rgba(108,0,255,0.10), transparent 60%)",
        }}
      />

      <div className="relative p-3">
        <div className="rounded-xl overflow-hidden ring-1 ring-white/20 bg-white/[0.06]">
          <div className="aspect-[3/4] w-full">
            <img
              src={imageSrc}
              alt={member.name}
              className={`h-full w-full object-cover ${member.imgClass ?? ""}`}
            />
          </div>
        </div>

        <div className="mt-3 text-center">
          <h3 className="text-lg font-semibold text-white">{member.name}</h3>
          <div className="mt-1 inline-flex items-center rounded-full border border-white/20 bg-white/[0.06] px-3 py-1 text-[11px] text-white/85">
            {member.role}
          </div>
        </div>

        <div className="mt-3 mb-1 flex items-center justify-center gap-3" onClick={stopCardClick}>
          <SocialBtn href={member.linkedin} label="LinkedIn">
            <LinkedInIcon size={16} />
          </SocialBtn>
          <SocialBtn href={member.instagram} label="Instagram" variant="instagram">
            <InstagramIcon size={16} />
          </SocialBtn>
          <SocialBtn href={member.x} label="X">
            <XIcon size={16} />
          </SocialBtn>
        </div>
      </div>
    </button>
  )
}

/* -------------------- Full-screen Modal -------------------- */
function ProfileModal({ member, onClose }: { member: TeamMember; onClose: () => void }) {
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener("keydown", onKey)
    }
  }, [onClose])

  const aboutParagraphs = useMemo(() => member.about.split("\n\n").filter(Boolean), [member.about])
  const imageSrc = typeof member.imageUrl === "string" ? member.imageUrl : member.imageUrl.src

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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
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
                  src={imageSrc}
                  alt={member.name}
                  className={`absolute inset-0 w-full h-full object-cover ${member.imgClass ?? ""}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
            </div>

            {/* Details */}
            <div className="px-5 md:px-8 pb-10">
              <section className="pt-2 md:pt-4">
                <h3 className="text-xl font-semibold text-white/95">About</h3>
                <div className="mt-3 space-y-4 text-white/85 leading-relaxed">
                  {aboutParagraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </section>

              <section className="mt-10">
                <h3 className="text-xl font-semibold text-white/95">What I Do</h3>
                <ul className="mt-4 space-y-2 text-white/85 text-sm leading-relaxed">
                  {member.whatIDo.map((it, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/60" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="mt-10">
                <h3 className="text-xl font-semibold text-white/95">Toolbox</h3>
                <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
                  {member.toolbox.map((sec) => (
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
                <div className="mt-3 flex flex-wrap gap-3">
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

                  {member.linkedin && (
                    <a
                      className="px-3 py-2 rounded-lg border border-white/25 text-white/90 text-sm hover:bg-white/10"
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      LinkedIn
                    </a>
                  )}
                  {member.instagram && (
                    <a
                      className="px-3 py-2 rounded-lg border border-white/25 text-white/90 text-sm hover:bg-white/10"
                      href={member.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Instagram
                    </a>
                  )}
                  {member.x && (
                    <a
                      className="px-3 py-2 rounded-lg border border-white/25 text-white/90 text-sm hover:bg-white/10"
                      href={member.x}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      X
                    </a>
                  )}
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
  const location = useLocation()
  const initialTeamKey = (location.state as { memberKey?: string } | null)?.memberKey

  const FINAL_CARD = { title: "Continuous support", desc: "We're here for you!" }

  return (
    <section className="relative min-h-[110vh] overflow-hidden text-white font-[Inter] bg-[#060a18]">
      <SEO
        title="The Ikigai Project | Brand Systems, Web Infrastructure & Growth Architecture"
        description="A human-first digital studio building brand systems, intelligent websites, and growth architecture for companies that want clarity, speed, and real results."
        path="/about"
      />
      <SEOText page="about" />

      {/* --- Hue background (match Services) --- */}
      <div className="pointer-events-none absolute inset-0 -z-30">
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #0b1220 0%, #070a14 40%, #05070d 100%)" }} />
        <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_50%_-140px,rgba(59,130,246,0.18),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_600px_at_82%_48%,rgba(168,85,247,0.12),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_600px_at_18%_56%,rgba(59,130,246,0.10),transparent_60%)]" />
      </div>

      {/* Particles background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="w-full h-full relative">
          <Particles
            particleColors={["#1b2d52", "#000000", "#380a65"]}
            particleCount={700000}
            particleSpread={100}
            speed={0.05}
            particleBaseSize={120}
            moveParticlesOnHover={true}
            alphaParticles={true}
            disableRotation={true}
            className="pointer-events-none"
          />
        </div>
      </div>

      {/* Soft vignette */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(60%_40%_at_50%_-10%,rgba(0,0,0,0.18),rgba(0,0,0,0))]" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 py-24 md:py-32">
        <h2 className="text-center font-bold font-[Space_Grotesk] uppercase tracking-widest text-3xl md:text-5xl">Who We Are</h2>
        <p className="mt-4 text-center text-lg md:text-2xl text-white/90">We build power through clarity</p>

        <div className="text-center mt-4 space-y-7 text-base md:text-lg leading-relaxed text-white/90 max-w-4xl mx-auto">
          <p>
            The Ikigai Project exists to help companies and individuals operate at their full potential. We design web and digital systems
            that create confidence first, financial momentum second, and long-term alignment always.
          </p>
          <p>
            Our work sits at the intersection of design, advertising, and technology. Not for complexity’s sake, but to build systems that last,
            scale, and actually move the needle.
          </p>
        </div>

        <h2 className="text-center font-bold font-[Space_Grotesk] uppercase tracking-widest text-3xl md:text-5xl mt-10">WHAT WE BELIEVE</h2>
        <div className="text-center mt-4 space-y-7 text-base md:text-lg leading-relaxed text-white/90 max-w-4xl mx-auto">
          <p>We don’t believe in bloated agency processes, endless buzzwords, or AI-for-the-sake-of-AI.</p>
          <p>We believe clarity creates confidence. Confidence creates decisive action. And decisive action is what builds real growth.</p>
        </div>

        <ExceptionalTeamCluster initialOpenKey={initialTeamKey} />

        {/* PROCESS */}
        <div className="mt-20 md:mt-28">
          <header className="text-center mb-8 md:mb-10">
            <h2 className="font-bold font-[Space_Grotesk] uppercase tracking-widest text-3xl md:text-4xl">The Process</h2>
            <p className="mt-2 text-white/80">A clear, step-by-step flow. No hidden surprises.</p>
          </header>

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

                  <div className={["mt-4", i % 2 === 0 ? "md:pr-16 md:mr-[52%]" : "md:pl-16 md:ml-[52%]"].join(" ")}>
                    <div
                      className="relative overflow-hidden rounded-2xl border border-white/15 backdrop-blur-md
                                 shadow-[0_20px_80px_rgba(0,0,0,0.35)]"
                      style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.04) 100%)" }}
                    >
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0"
                        style={{
                          background:
                            "radial-gradient(90% 70% at -10% -10%, rgba(0,51,255,0.10), transparent 60%), radial-gradient(90% 70% at 110% -10%, rgba(108,0,255,0.10), transparent 60%)",
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

              {/* FINAL CENTER CARD */}
              <li className="relative">
                <div className="absolute left-1/2 -translate-x-1/2 -top-2">
                  <div className="h-8 w-px bg-white/20 mx-auto" />
                  <div className="h-2 w-2 rotate-45 border-r border-b border-white/30 mx-auto -mt-1" />
                </div>

                <div className="mt-8 flex justify-center">
                  <div
                    className="relative w-full max-w-[520px] overflow-hidden rounded-2xl border border-white/15 backdrop-blur-md
                               shadow-[0_20px_80px_rgba(0,0,0,0.35)] text-center"
                    style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.04) 100%)" }}
                  >
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background:
                          "radial-gradient(90% 70% at -10% -10%, rgba(0,51,255,0.10), transparent 60%), radial-gradient(90% 70% at 110% -10%, rgba(108,0,255,0.10), transparent 60%)",
                      }}
                    />
                    <div className="relative px-5 py-5 md:px-6 md:py-6">
                      <div className="text-base md:text-lg font-semibold text-white">{FINAL_CARD.title}</div>
                      <div className="mt-1 text-sm text-white/80">{FINAL_CARD.desc}</div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
