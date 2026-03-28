import React, { useEffect, useState } from "react"
import shevanFigure from "../assets/3d_team /Shevan.png"
import seniFigure from "../assets/3d_team /Seni.png"
import sladeFigure from "../assets/3d_team /Slade.png"
import marFigure from "../assets/3d_team /Mar.png"
import dylanFigure from "../assets/3d_team /Dylan.png"

const ACTION_FIGURE_TEAM = [
  {
    key: "Shevan",
    name: "Shevan",
    role: "Marketing and Strategy",
    imageUrl: shevanFigure,
    quote: "I turn positioning into campaigns and content systems that move people and convert with clarity.",
    clusterClass: "md:left-[37.5%] md:top-[16%] md:z-20",
    heightClass: "h-[226px] sm:h-[252px] md:h-[300px]",
    bubbleClass: "md:-translate-x-10",
  },
  {
    key: "Mar",
    name: "Mar",
    role: "Creative Production",
    imageUrl: marFigure,
    quote: "I shape visual direction so every brand touchpoint feels premium, consistent, and alive.",
    clusterClass: "md:left-1/2 md:top-[6%] md:z-30",
    heightClass: "h-[224px] sm:h-[248px] md:h-[294px]",
    bubbleClass: "md:-translate-y-1 md:translate-x-0",
  },
  {
    key: "Dylan",
    name: "Dylan",
    role: "Growth Operations",
    imageUrl: dylanFigure,
    quote: "I keep execution tight so ideas move from concept to measurable growth, fast.",
    clusterClass: "md:left-[62.5%] md:top-[15%] md:z-20",
    heightClass: "h-[228px] sm:h-[256px] md:h-[304px]",
    bubbleClass: "md:translate-x-12",
  },
  {
    key: "Seni",
    name: "Seni",
    role: "IT and Strategy",
    imageUrl: seniFigure,
    quote: "I build the technical backbone so products are fast, secure, and ready to scale without chaos.",
    clusterClass: "md:left-[36.5%] md:top-[35%] md:z-40",
    heightClass: "h-[270px] sm:h-[314px] md:h-[388px]",
    bubbleClass: "md:-translate-x-14",
  },
  {
    key: "Slade",
    name: "Slade",
    role: "Client Relations and Strategy",
    imageUrl: sladeFigure,
    quote: "I keep projects aligned and moving so clients feel supported and outcomes stay sharp.",
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

  useEffect(() => {
    if (initialOpenKey && ACTION_FIGURE_TEAM.some((member) => member.key === initialOpenKey)) {
      setActiveFigure(initialOpenKey as ActionFigureKey)
    }
  }, [initialOpenKey])

  return (
    <section className="mt-16 md:mt-20">
      <header className="text-center mb-8 md:mb-12">
        <h2 className="font-bold font-[Space_Grotesk] tracking-widest text-3xl md:text-5xl">Our Exceptional Team</h2>
        <p className="mt-2 text-white/80">Five specialists. One aligned system.</p>
        <p className="mt-2 text-sm md:text-base text-white/65">Hover to zoom. Click any figure to hear from them.</p>
      </header>

      <div className="mx-auto max-w-[920px]" onClick={() => setActiveFigure(null)}>
        <div className="relative overflow-visible grid grid-cols-2 md:block gap-y-5 sm:gap-y-7 justify-items-center md:h-[680px]">
          <div className="pointer-events-none hidden md:block absolute inset-x-[24%] bottom-[9%] h-16 rounded-full bg-black/45 blur-[34px]" />

          {ACTION_FIGURE_TEAM.map((member, idx) => {
            const isActive = activeFigure === member.key
            const isLastMobile = idx === ACTION_FIGURE_TEAM.length - 1

            return (
              <article
                key={member.key}
                className={[
                  "relative md:absolute md:-translate-x-1/2",
                  isActive ? "z-[90] md:z-[90]" : "",
                  isLastMobile ? "col-span-2" : "",
                  member.clusterClass,
                ].join(" ")}
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    setActiveFigure((prev) => (prev === member.key ? null : member.key))
                  }}
                  aria-expanded={isActive}
                  aria-label={`Show ${member.name} message`}
                  className={[
                    "group relative transition-transform duration-300 will-change-transform",
                    isActive ? "scale-[1.04]" : "hover:scale-[1.04]",
                  ].join(" ")}
                >
                  <div
                    className={[
                      "absolute -inset-2 rounded-[28px] transition-opacity duration-300",
                      isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100",
                    ].join(" ")}
                    style={{
                      background:
                        "radial-gradient(80% 70% at 50% 50%, rgba(88,28,135,0.36), rgba(88,28,135,0.06) 70%, transparent)",
                    }}
                  />

                  <div className="relative">
                    <img
                      src={member.imageUrl}
                      alt={`${member.name} action figure`}
                      className={`${member.heightClass} w-auto object-contain`}
                      style={{
                        filter: "drop-shadow(0 0 12px rgba(88,28,135,0.62)) drop-shadow(0 22px 26px rgba(0,0,0,0.65))",
                      }}
                    />
                  </div>
                </button>

                <div
                  className={[
                    "absolute left-1/2 -translate-x-1/2 bottom-[102%] z-[60] w-[220px] sm:w-[250px] transition-all duration-250",
                    member.bubbleClass,
                    isActive ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-2 pointer-events-none",
                  ].join(" ")}
                >
                  <div className="relative rounded-2xl border border-slate-200/80 bg-white/95 px-4 py-3 text-sm leading-relaxed text-slate-900 shadow-[0_18px_36px_rgba(0,0,0,0.35)]">
                    <p className="mb-1 text-[11px] font-semibold tracking-wide uppercase text-slate-500">{member.name}</p>
                    <p>{member.quote}</p>
                    <div className="absolute left-1/2 -translate-x-1/2 -bottom-2 h-4 w-4 rotate-45 border-r border-b border-slate-200/80 bg-white/95" />
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
