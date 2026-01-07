// src/components/ServicesPreview.tsx
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { GlowCard } from "./Glowcard.tsx"

type BundleKey = "brand" | "web" | "growth"

interface Bundle {
  key: BundleKey
  title: string
  tagline: string
  includes: string[]
  price: string
}

const BUNDLES: Bundle[] = [
  {
    key: "brand",
    title: "Brand Systems Build",
    tagline: "Define who you are. Then make it unmistakable",
    includes: ["Logo & identity", "Brand messaging", "Copy systems", "Creative direction"],
    price: "From $600",
  },
  {
    key: "web",
    title: "Intelligent Web Infrastructure",
    tagline: "Turn strategy into systems that actually perform",
    includes: ["Web design", "Automation setup", "3D integration", "Performance tracking"],
    price: "From $999",
  },
  {
    key: "growth",
    title: "Growth Architecture",
    tagline: "Scale intentionally, without losing control",
    includes: ["Paid media setup", "Campaign management", "Content funnels", "Analytics & reporting"],
    price: "From $949",
  },
]

// ✅ Exact glow colors (left → right): #1b2d52, #380a65, #1b2d52
const glowHexByKey: Record<BundleKey, string> = {
  brand: "#1b2d52",
  web: "#380a65",
  growth: "#1b2d52",
}

export default function ServicesPreview() {
  const navigate = useNavigate()

  const [customSet, setCustomSet] = useState<Set<BundleKey>>(new Set())
  const [toast, setToast] = useState<{ id: number; message: string } | null>(null)

  const showToast = (message: string) => {
    const id = Date.now()
    setToast({ id, message })
    window.setTimeout(() => {
      setToast((t) => (t && t.id === id ? null : t))
    }, 2000)
  }

  const addToCustom = (key: BundleKey) => {
    if (!customSet.has(key)) {
      const next = new Set(customSet)
      next.add(key)
      setCustomSet(next)
      showToast("Added to Custom Alignment")
    } else {
      showToast("Already in Custom Alignment")
    }
  }

  const goToQuote = (bundles: BundleKey[]) => {
    if (!bundles.length) return
    navigate("/services/get-quote", { state: { bundles } })
  }

  const quoteLabel: Record<BundleKey, string> = {
    brand: "Build the Brand",
    web: "Build the system",
    growth: "Plan growth",
  }

  // ✅ Primary CTA gradient (blue -> purple), hover (purple -> black)
  const btnPrimary =
    "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium text-white shadow-sm " +
    "transition-all focus:outline-none focus:ring-2 focus:ring-white/20 " +
    "bg-gradient-to-r from-[#1d2d52] to-[#380A65] " +
    "hover:from-[#380A65] hover:to-black " +
    "hover:-translate-y-[1px] active:translate-y-0"

  // ✅ Secondary button: glass base, but on hover it “joins the brand”
  const btnSecondary =
    "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium " +
    "border border-white/20 bg-white/5 text-white/90 " +
    "transition-all focus:outline-none focus:ring-2 focus:ring-white/20 " +
    "hover:border-white/35 hover:text-white hover:bg-gradient-to-r hover:from-[#380A65] hover:to-black " +
    "hover:-translate-y-[1px] active:translate-y-0"

  // ✅ Footer-style round button at bottom
  const btnPill =
    "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium " +
    "border border-white/20 bg-white/5 text-white/90 " +
    "transition-all focus:outline-none focus:ring-2 focus:ring-white/20 " +
    "hover:border-white/35 hover:text-white hover:bg-gradient-to-r hover:from-[#380A65] hover:to-black " +
    "hover:-translate-y-[1px] active:translate-y-0"

  return (
    <section className="relative overflow-hidden font-[Inter] text-white">
      {toast && (
        <div className="fixed top-6 left-6 z-[120]">
          <div className="rounded-xl border border-white/15 bg-white/10 backdrop-blur-md px-4 py-2 shadow-[0_8px_40px_rgba(0,0,0,0.5)]">
            <span className="text-sm text-white/95">{toast.message}</span>
          </div>
        </div>
      )}

      <header className="max-w-6xl mx-auto px-6 md:px-12">
        <h2 className="text-center font-[Space_Grotesk] uppercase tracking-widest text-3xl md:text-4xl">
          Services
        </h2>
        <p className="mt-3 text-center text-white/70">
          Three core systems designed to build clarity, confidence, and growth Or Combine services into a single, aligned
          system built around your goals
        </p>
      </header>

      <div className="max-w-6xl mx-auto px-6 md:px-10 pt-10 md:pt-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 items-stretch
             touch-pan-y overscroll-y-contain"style={{
    WebkitOverflowScrolling: "touch",
    touchAction: "pan-y",
  }}>
          {BUNDLES.map((b) => (
            <GlowCard
  key={b.key}
  customSize
  glowHex={glowHexByKey[b.key]}
  className="w-full h-full min-h-[440px] touch-pan-y overscroll-y-contain"
>
              <div
  className="relative p-6 md:p-7 h-full flex flex-col touch-pan-y"
  style={{ touchAction: "pan-y" }}
>
                <div>
                  <h5 className="text-xl md:text-2xl font-semibold mb-1.5 font-[Space_Grotesk] uppercase tracking-widest">
                    {b.title}
                  </h5>

                  <p className="text-white/70 mb-4">{b.tagline}</p>

                  <ul className="text-sm text-white/85 space-y-1.5 mb-5 leading-6">
                    {b.includes.map((item, idx) => (
                      <li key={idx}>• {item}</li>
                    ))}
                  </ul>

                  <p className="font-medium text-white/90">{b.price}</p>
                </div>

                <div className="mt-auto pt-6 flex flex-wrap gap-3">
                  {/* ✅ Primary buttons updated */}
                  <button className={btnPrimary} onClick={() => goToQuote([b.key])}>
                    {quoteLabel[b.key]}
                  </button>

                  {/* ✅ Secondary buttons updated */}
                  <button className={btnSecondary} onClick={() => addToCustom(b.key)}>
                    Add to Custom Alignment
                  </button>

                  <button className={btnSecondary} onClick={() => navigate("/services")}>
                    View full Services →
                  </button>
                </div>
              </div>
            </GlowCard>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <button onClick={() => navigate("/services")} className={btnPill}>
            Explore Services in depth →
          </button>
        </div>
      </div>
    </section>
  )
}
