import React, { useEffect, useRef, useState } from "react"
import shevanFigure from "../assets/3d_team /Shevan.png"
import seniFigure from "../assets/3d_team /Seni.png"
import sladeFigure from "../assets/3d_team /Slade.png"
import marFigure from "../assets/3d_team /Mar.png"
import dylanFigure from "../assets/3d_team /Dylan.png"
import shevanReal from "../assets/3d_team /team/Shevan_real.png"
import seniReal from "../assets/3d_team /team/seni_real.png"
import sladeReal from "../assets/3d_team /team/slade_real.png"
import marReal from "../assets/3d_team /team/Mar_real.png"
import dylanReal from "../assets/3d_team /team/Dylam_real.png"

const ACTION_FIGURE_TEAM = [
  {
    key: "Shevan",
    name: "Shevan",
    role: "Growth & Strategy",
    imageUrl: shevanFigure,
    profileImageUrl: shevanReal,
    quote: "I turn positioning into campaigns and content systems that move people and convert with clarity.",
    about:
      "Shevan is the CEO and creative owner of The Ikigai Project. He leads the vision, brand direction, and high-level creative strategy across both Ikigai and client work, keeping the team aligned on quality, positioning, and execution.",
    clusterClass: "md:left-[37.5%] md:top-[16%] md:z-20",
    heightClass: "h-[226px] sm:h-[252px] md:h-[300px]",
    bubbleClass: "md:-translate-x-10",
  },
  {
    key: "Mar",
    name: "Mar",
    role: "Creative Production",
    imageUrl: marFigure,
    profileImageUrl: marReal,
    quote: "I shape visual direction so every brand touchpoint feels premium, consistent, and alive.",
    about:
      "Mar supports creative production through graphics and design execution, while also handling key admin operations, documentation, and communication clarity. She helps keep both internal and client-facing workflows organized and clean.",
    clusterClass: "md:left-1/2 md:top-[6%] md:z-30",
    heightClass: "h-[224px] sm:h-[248px] md:h-[294px]",
    bubbleClass: "md:-translate-y-1 md:translate-x-0",
  },
  {
    key: "Dylan",
    name: "Dylan",
    role: "Growth Operations",
    imageUrl: dylanFigure,
    profileImageUrl: dylanReal,
    quote: "I keep execution tight so ideas move from concept to measurable growth, fast.",
    about:
      "Dylan works as a Creative Director and growth partner for both Ikigai and client engagements. He helps drive creative direction, campaign execution, and growth-focused implementation from concept to delivery.",
    clusterClass: "md:left-[62.5%] md:top-[15%] md:z-20",
    heightClass: "h-[228px] sm:h-[256px] md:h-[304px]",
    bubbleClass: "md:translate-x-12",
  },
  {
    key: "Seni",
    name: "Seni",
    role: "IT and Strategy",
    imageUrl: seniFigure,
    profileImageUrl: seniReal,
    quote: "I build the technical backbone so products are fast, secure, and ready to scale without chaos.",
    about:
      "Seni is the CTO and leads all core technical systems. He handles architecture, infrastructure, and platform reliability, which is critical to Ikigai’s ability to deliver secure, scalable, high-performance work.",
    clusterClass: "md:left-[36.5%] md:top-[35%] md:z-40",
    heightClass: "h-[270px] sm:h-[314px] md:h-[388px]",
    bubbleClass: "md:-translate-x-14",
  },
  {
    key: "Slade",
    name: "Slade",
    role: "COO, Outreach and Creative Direction",
    imageUrl: sladeFigure,
    profileImageUrl: sladeReal,
    quote: "I keep projects aligned and moving so clients feel supported and outcomes stay sharp.",
    about:
      "Slade is the COO and primary outreach lead, serving as a key relationship connector across the network. He drives sales conversations, brings in opportunities, and contributes as a Creative Director to keep operations, positioning, and delivery connected.",
    clusterClass: "md:left-[56.5%] md:top-[33%] md:z-50",
    heightClass: "h-[278px] sm:h-[328px] md:h-[406px]",
    bubbleClass: "md:translate-x-14",
  },
] as const

type ActionFigureKey = (typeof ACTION_FIGURE_TEAM)[number]["key"]

type ExceptionalTeamClusterProps = {
  initialOpenKey?: string
}

export default function ExceptionalTeamCluster({ initialOpenKey }: ExceptionalTeamClusterProps) {
  const [activeFigure, setActiveFigure] = useState<ActionFigureKey | null>(null)
  const [mobileIndex, setMobileIndex] = useState(0)
  const [isMobileFading, setIsMobileFading] = useState(false)
  const fadeTimerRef = useRef<number | null>(null)
  const touchStartXRef = useRef<number | null>(null)
  const touchStartYRef = useRef<number | null>(null)
  const MOBILE_FADE_OUT_MS = 180

  const getMemberAt = (index: number) => {
    const len = ACTION_FIGURE_TEAM.length
    return ACTION_FIGURE_TEAM[(index + len) % len]
  }

  const queueMobileIndex = (nextIndex: number) => {
    const len = ACTION_FIGURE_TEAM.length
    const normalized = (nextIndex + len) % len
    if (normalized === mobileIndex || isMobileFading) return

    setIsMobileFading(true)
    if (fadeTimerRef.current) window.clearTimeout(fadeTimerRef.current)

    fadeTimerRef.current = window.setTimeout(() => {
      setMobileIndex(normalized)
      requestAnimationFrame(() => setIsMobileFading(false))
    }, MOBILE_FADE_OUT_MS)
  }

  const moveMobile = (step: number) => {
    queueMobileIndex(mobileIndex + step)
  }

  useEffect(() => {
    const idx = ACTION_FIGURE_TEAM.findIndex((member) => member.key === initialOpenKey)
    if (idx !== -1) {
      setActiveFigure(ACTION_FIGURE_TEAM[idx].key as ActionFigureKey)
      setMobileIndex(idx)
    }
  }, [initialOpenKey])

  const mobileSelected = ACTION_FIGURE_TEAM[mobileIndex]
  const activeMember = ACTION_FIGURE_TEAM.find((member) => member.key === activeFigure) ?? null
  const mobileSelectedImage = typeof mobileSelected.imageUrl === "string" ? mobileSelected.imageUrl : mobileSelected.imageUrl.src
  const mobileOrbitMembers = [
    getMemberAt(mobileIndex - 2),
    getMemberAt(mobileIndex - 1),
    getMemberAt(mobileIndex + 1),
    getMemberAt(mobileIndex + 2),
  ]
  const mobileOrbitSlots = [
    { x: 35, y: 21, height: "h-[172px]", z: "z-10", opacity: "opacity-85" },
    { x: 65, y: 21, height: "h-[172px]", z: "z-10", opacity: "opacity-85" },
    { x: 30, y: 46, height: "h-[158px]", z: "z-20", opacity: "opacity-90" },
    { x: 70, y: 46, height: "h-[158px]", z: "z-20", opacity: "opacity-90" },
  ] as const
  const mobileSelectedHeight =
    mobileSelected.key === "Seni" || mobileSelected.key === "Slade" ? "h-[296px]" : "h-[272px]"

  const selectMobileByKey = (key: ActionFigureKey) => {
    const idx = ACTION_FIGURE_TEAM.findIndex((member) => member.key === key)
    if (idx !== -1) queueMobileIndex(idx)
  }

  const handleStageTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0]
    touchStartXRef.current = touch.clientX
    touchStartYRef.current = touch.clientY
  }

  const handleStageTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return

    const touch = e.changedTouches[0]
    const dx = touch.clientX - touchStartXRef.current
    const dy = touch.clientY - touchStartYRef.current

    touchStartXRef.current = null
    touchStartYRef.current = null

    if (Math.abs(dx) < 42 || Math.abs(dx) < Math.abs(dy)) return
    moveMobile(dx < 0 ? 1 : -1)
  }

  useEffect(() => {
    return () => {
      if (fadeTimerRef.current) window.clearTimeout(fadeTimerRef.current)
    }
  }, [])

  return (
    <section className="mt-16 md:mt-20">
      <header className="text-center mb-8 md:mb-12">
        <h2 className="font-bold font-[Space_Grotesk] tracking-widest text-3xl md:text-5xl">Our Exceptional Team</h2>
        <p className="mt-2 text-white/80">A Growing Team designed around One aligned system. I K I G A I.</p>
        <p className="mt-2 text-sm md:text-base text-white/20">Tap a character to see more about them.</p>
      </header>

      <div className="md:hidden mx-auto max-w-[380px] px-1">
        <div className="relative overflow-hidden rounded-[30px] border border-white/15 bg-[linear-gradient(180deg,#070d1f_0%,#0b1328_45%,#070d1f_100%)] px-2 pb-6 pt-3 shadow-[inset_0_0_90px_rgba(255,255,255,0.05)]">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(140% 85% at 50% 0%, rgba(59,130,246,0.18), transparent 58%), radial-gradient(120% 70% at 50% 42%, rgba(168,85,247,0.18), transparent 65%)",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ background: "linear-gradient(180deg, transparent 45%, rgba(6,10,24,0.35) 66%, rgba(6,10,24,0.75) 100%)" }}
          />

          <div
            className={`relative h-[560px] transition-opacity duration-[560ms] ease-out ${isMobileFading ? "opacity-30" : "opacity-100"}`}
            onTouchStart={handleStageTouchStart}
            onTouchEnd={handleStageTouchEnd}
          >
            <div className="pointer-events-none absolute inset-x-[22%] bottom-[20%] h-12 rounded-full bg-blue-500/15 blur-[22px]" />
            {mobileOrbitMembers.map((member, idx) => {
              const imageSrc = typeof member.imageUrl === "string" ? member.imageUrl : member.imageUrl.src
              const slot = mobileOrbitSlots[idx]
              return (
                <button
                  key={member.key}
                  type="button"
                  onClick={() => selectMobileByKey(member.key)}
                  style={{ left: `${slot.x}%`, top: `${slot.y}%` }}
                  className={`absolute ${slot.z} -translate-x-1/2 -translate-y-1/2 rounded-2xl ${slot.opacity}`}
                  aria-label={`Select ${member.name}`}
                >
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-violet-500/25 blur-xl" />
                    <img
                      src={imageSrc}
                      alt={`${member.name} action figure`}
                      className={`relative ${slot.height} w-auto object-contain`}
                      style={{ filter: "drop-shadow(0 0 8px rgba(88,28,135,0.35)) drop-shadow(0 14px 20px rgba(0,0,0,0.45))" }}
                    />
                  </div>
                </button>
              )
            })}

            <div
              style={{ left: "50%", top: "66%" }}
              className="absolute z-30 -translate-x-1/2 -translate-y-1/2"
            >
              <div className="absolute inset-0 rounded-full bg-violet-500/25 blur-2xl" />
              <img
                src={mobileSelectedImage}
                alt={`${mobileSelected.name} action figure`}
                className={`relative ${mobileSelectedHeight} w-auto object-contain`}
                style={{ filter: "drop-shadow(0 0 10px rgba(88,28,135,0.45)) drop-shadow(0 24px 24px rgba(0,0,0,0.55))" }}
              />
            </div>
          </div>

          <div className="relative mt-2 grid grid-cols-[48px_minmax(0,1fr)_48px] items-center gap-3">
            <button
              type="button"
              onClick={() => moveMobile(-1)}
              className="z-20 h-12 w-12 rounded-2xl border border-white/25 bg-[#0b1328]/85 backdrop-blur text-white transition hover:bg-gradient-to-r hover:from-blue-600/90 hover:to-violet-600/90"
              aria-label="Previous character"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="mx-auto">
                <path strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <div
              className={`mx-auto max-w-[218px] rounded-2xl border border-white/20 bg-white/[0.05] px-3 py-2 text-center backdrop-blur-sm transition-opacity duration-[560ms] ease-out ${isMobileFading ? "opacity-40" : "opacity-100"}`}
            >
              <p className="text-[27px] leading-none font-bold tracking-[0.07em] uppercase text-white">{mobileSelected.name}</p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.24em] text-white/60">{mobileSelected.role}</p>
              <button
                type="button"
                onClick={() => setActiveFigure(mobileSelected.key)}
                className="mt-1.5 inline-flex items-center rounded-full border border-white/25 bg-white/[0.06] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/85 transition hover:bg-gradient-to-r hover:from-blue-600/90 hover:to-violet-600/90"
                aria-label={`See more about ${mobileSelected.name}`}
              >
                See more
              </button>
            </div>

            <button
              type="button"
              onClick={() => moveMobile(1)}
              className="z-20 h-12 w-12 rounded-2xl border border-white/25 bg-[#0b1328]/85 backdrop-blur text-white transition hover:bg-gradient-to-r hover:from-blue-600/90 hover:to-violet-600/90"
              aria-label="Next character"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="mx-auto">
                <path strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {activeMember && (
        <div className="fixed inset-0 z-[160] md:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />

          <div className="absolute inset-4 rounded-3xl border border-white/15 bg-[linear-gradient(180deg,rgba(255,255,255,0.10)_0%,rgba(255,255,255,0.04)_100%)] p-4 shadow-[0_30px_100px_rgba(0,0,0,0.55)]">
            <button
              type="button"
              onClick={() => setActiveFigure(null)}
              className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-xl border border-white/25 bg-[#0b1328]/90 px-3 py-2 text-white/90 transition hover:bg-gradient-to-r hover:from-blue-600/90 hover:to-violet-600/90"
              aria-label="Back to team view"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
              </svg>
              <span className="text-sm font-medium">Back</span>
            </button>

            <div className="mt-12 h-[calc(100%-3rem)] overflow-y-auto">
              <div className="rounded-2xl border border-white/15 bg-black/20 p-2">
                <img
                  src={typeof activeMember.profileImageUrl === "string" ? activeMember.profileImageUrl : activeMember.profileImageUrl.src}
                  alt={`${activeMember.name} portrait`}
                  className="h-[280px] w-full rounded-xl object-cover object-center"
                  style={{
                    filter: "drop-shadow(0 0 10px rgba(88,28,135,0.45)) drop-shadow(0 18px 24px rgba(0,0,0,0.55))",
                  }}
                />
              </div>

              <div className="mt-4">
                <p className="text-[11px] uppercase tracking-[0.24em] text-white/60">Team Profile</p>
                <h3 className="mt-2 text-3xl font-bold tracking-[0.08em] uppercase text-white">{activeMember.name}</h3>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-white/65">{activeMember.role}</p>
                <p className="mt-4 text-base leading-relaxed text-white/86">{activeMember.about}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="relative mx-auto max-w-[920px]">
        <div
          className={[
            "relative overflow-visible hidden md:block md:h-[680px] transition-[filter,opacity] duration-500",
            activeMember ? "blur-[6px] opacity-35 pointer-events-none select-none" : "blur-0 opacity-100",
          ].join(" ")}
        >
          <div className="pointer-events-none hidden md:block absolute inset-x-[24%] bottom-[9%] h-16 rounded-full bg-black/45 blur-[34px]" />

          {ACTION_FIGURE_TEAM.map((member, idx) => {
            const imageSrc = typeof member.imageUrl === "string" ? member.imageUrl : member.imageUrl.src

            return (
              <article
                key={member.key}
                className={[
                  "relative md:absolute md:-translate-x-1/2",
                  member.clusterClass,
                ].join(" ")}
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    setActiveFigure(member.key)
                  }}
                  aria-label={`Show ${member.name} profile`}
                  className={[
                    "group relative transition-transform duration-300 will-change-transform",
                    "hover:scale-[1.04]",
                  ].join(" ")}
                >
                  <div
                    className={[
                      "absolute -inset-2 rounded-[28px] transition-opacity duration-300",
                      "opacity-0 group-hover:opacity-100",
                    ].join(" ")}
                    style={{
                      background:
                        "radial-gradient(80% 70% at 50% 50%, rgba(88,28,135,0.36), rgba(88,28,135,0.06) 70%, transparent)",
                    }}
                  />

                  <div className="relative">
                    <img
                      src={imageSrc}
                      alt={`${member.name} action figure`}
                      className={`${member.heightClass} w-auto object-contain`}
                      style={{
                        filter: "drop-shadow(0 0 12px rgba(88,28,135,0.62)) drop-shadow(0 22px 26px rgba(0,0,0,0.65))",
                      }}
                    />
                  </div>
                </button>
              </article>
            )
          })}
        </div>

        {activeMember && (
          <div className="pointer-events-none absolute inset-0 hidden md:block z-[140]">
            <div className="absolute inset-0 rounded-[28px] bg-black/35 backdrop-blur-sm" />

            <button
              type="button"
              onClick={() => setActiveFigure(null)}
              className="pointer-events-auto absolute right-4 top-4 inline-flex items-center gap-2 rounded-xl border border-white/25 bg-[#0b1328]/90 px-3 py-2 text-white/90 transition hover:bg-gradient-to-r hover:from-blue-600/90 hover:to-violet-600/90"
              aria-label="Back to team view"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
              </svg>
              <span className="text-sm font-medium">Back</span>
            </button>

            <div className="absolute inset-0 flex items-center justify-center px-14">
              <div
                className="pointer-events-auto w-full max-w-[760px] rounded-3xl border border-white/15 bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.04)_100%)] p-7 shadow-[0_30px_100px_rgba(0,0,0,0.55)]"
                role="dialog"
                aria-label={`${activeMember.name} profile`}
              >
                <div className="grid grid-cols-[280px_minmax(0,1fr)] items-center gap-8">
                  <div className="overflow-hidden rounded-2xl border border-white/15 bg-black/25">
                    <img
                      src={
                        typeof activeMember.profileImageUrl === "string"
                          ? activeMember.profileImageUrl
                          : activeMember.profileImageUrl.src
                      }
                      alt={`${activeMember.name} portrait`}
                      className="h-[320px] w-full object-cover object-center"
                      style={{
                        filter: "drop-shadow(0 0 12px rgba(88,28,135,0.45)) drop-shadow(0 18px 24px rgba(0,0,0,0.55))",
                      }}
                    />
                  </div>

                  <div>
                    <p className="text-[11px] uppercase tracking-[0.24em] text-white/60">Team Profile</p>
                    <h3 className="mt-2 text-4xl font-bold tracking-[0.08em] uppercase text-white">{activeMember.name}</h3>
                    <p className="mt-1 text-sm uppercase tracking-[0.22em] text-white/65">{activeMember.role}</p>
                    <p className="mt-6 text-[17px] leading-relaxed text-white/86">{activeMember.about}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
