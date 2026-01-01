import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ShinyButton } from "./shiny-button"

type Props = {
  storageKey?: string
}

export default function FirstClientPopup({ storageKey = "ikigai_first_popup_closed" }: Props) {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    // show only once per page load/refresh
    const alreadyClosedThisLoad = sessionStorage.getItem(storageKey)
    if (!alreadyClosedThisLoad) setOpen(true)
  }, [storageKey])

  const close = () => {
    sessionStorage.setItem(storageKey, "1")
    setOpen(false)
  }

  const goDiscount = () => {
    close()
    // change this route to whatever your discount/quote page is
    navigate("/services/get-quote")
  }

  const goExplore = () => {
    close()
    navigate("/")
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
      aria-label="Promo popup"
      onClick={close}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-white/15 bg-white/10 shadow-[0_18px_80px_rgba(0,0,0,0.65)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Soft brand gradient glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 left-1/2 h-64 w-[520px] -translate-x-1/2 rounded-full bg-[#1b2d52]/35 blur-3xl" />
          <div className="absolute -bottom-24 left-1/2 h-64 w-[520px] -translate-x-1/2 rounded-full bg-[#380a65]/35 blur-3xl" />
        </div>

        {/* Close */}
        <button
          onClick={close}
          aria-label="Close popup"
          className="absolute right-3 top-3 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/30 text-white/80 backdrop-blur-md transition hover:bg-black/45 hover:text-white"
        >
          ✕
        </button>

        <div className="relative px-6 py-7 sm:px-8 sm:py-8 text-center">
          <p className="font-[Space_Grotesk] uppercase tracking-widest text-sm text-white/75">
            Limited launch offer
          </p>

          <h2 className="mt-2 text-2xl sm:text-3xl font-semibold text-white">
            Become one of our first 5 clients
          </h2>

          <p className="mt-3 text-white/75 text-base sm:text-lg">
            start building your alignment <span className="font-semibold text-white">100% FREE</span>
          </p>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <ShinyButton className="min-w-[220px]" onClick={goDiscount}>
              Get Discount
            </ShinyButton>

            <ShinyButton
              className="min-w-[220px]"
              onClick={goExplore}
              style={{ filter: "saturate(0.9)", opacity: 0.92 }}
            >
              Explore First
            </ShinyButton>
          </div>

          <div className="mt-4 text-xs text-white/50">
            Discount code provided after meeting
          </div>
        </div>
      </div>
    </div>
  )
}
