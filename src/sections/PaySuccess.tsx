// src/sections/PaySuccess.tsx
"use client"

import React, { useEffect, useMemo, useState } from "react"
import { useSearchParams, Link } from "react-router-dom"
import { BackgroundBeams } from "../components/background-beams"
import Aurora from "../components/Aurora"
import { resolveQuote } from "../lib/pay"
import { metaPixel } from "../lib/metaPixel"

type QuoteSummary = {
  quote_id: string
  name: string
  email: string
  paid: boolean
  total_cents: number
  items: Array<{ name?: string; id?: string; basePrice?: number }>
}

function formatCADFromCents(cents: number) {
  const dollars = (cents || 0) / 100
  return new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD" }).format(dollars)
}

export default function PaySuccess() {
  const [params] = useSearchParams()
  const quoteId = useMemo(() => (params.get("quote_id") || "").trim(), [params])

  const [loading, setLoading] = useState(true)
  const [polling, setPolling] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [q, setQ] = useState<QuoteSummary | null>(null)

  // ✅ Prevent Lead from firing multiple times due to re-renders/polling
  const leadFiredRef = React.useRef(false)

  async function loadOnce() {
    setError(null)
    if (!quoteId) {
      setError("Missing Quote ID in the URL.")
      setLoading(false)
      return
    }

    try {
      const data = await resolveQuote(quoteId)
      setQ(data)

      // If webhook hasn’t flipped paid=true yet, we’ll poll a bit.
      if (!data.paid) {
        setPolling(true)
      } else {
        setPolling(false)
      }
    } catch (err: any) {
      const status = err?.status
      if (status === 404) setError("Quote ID not found. Double-check it and try again.")
      else setError(String(err?.message || "Something went wrong."))
    } finally {
      setLoading(false)
    }
  }

  // Initial load
  useEffect(() => {
    loadOnce()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quoteId])

  // Poll up to ~30s if paid is still false
  useEffect(() => {
    if (!polling || !quoteId) return

    let tries = 0
    const maxTries = 10 // 10 * 3s = 30s

    const t = setInterval(async () => {
      tries += 1
      try {
        const data = await resolveQuote(quoteId)
        setQ(data)
        if (data.paid) {
          setPolling(false)
          clearInterval(t)
        }
      } catch {
        // ignore transient polling errors
      }
      if (tries >= maxTries) {
        setPolling(false)
        clearInterval(t)
      }
    }, 3000)

    return () => clearInterval(t)
  }, [polling, quoteId])

  // ✅ Meta Lead event (fires ONLY when paid === true, and ONLY once)
  useEffect(() => {
    if (!q || !q.paid) return
    if (leadFiredRef.current) return
    leadFiredRef.current = true

    metaPixel.track("Lead", {
      content_name: "Alignment Quote Paid",
      content_category: "Quote",
      quote_id: q.quote_id,
      value: (q.total_cents || 0) / 100,
      currency: "CAD",
      url: typeof window !== "undefined" ? window.location.href : undefined,
    })
  }, [q])

  return (
    <div className="h-[40rem] w-full rounded-md bg-background relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-2xl mx-auto p-4 w-full relative z-10">
        <h1 className="text-lg md:text-6xl bg-clip-text text-transparent bg-gradient-to-b from-foreground to-muted-foreground text-center font-sans font-bold">
          Payment Successful
        </h1>

        <p className="text-muted-foreground max-w-lg mx-auto my-3 text-sm text-center">
          Thank you, we’ve received your payment and Welcome to the Ikigai Project
        </p>

        <div className="mt-6 rounded-xl border border-input bg-background/60 backdrop-blur p-5">
          {loading && (
            <div className="text-sm text-muted-foreground text-center">Loading your receipt…</div>
          )}

          {!loading && error && (
            <div className="text-sm text-red-500 text-center">
              {error}
              <div className="mt-4">
                <Link
                  to="/pay"
                  className="inline-flex h-10 items-center justify-center rounded-md border border-input px-4 text-sm font-medium"
                >
                  Back to Pay Page
                </Link>
              </div>
            </div>
          )}

          {!loading && !error && q && (
            <div className="space-y-3">
              <div className="text-sm text-muted-foreground">
                Quote ID: <span className="font-mono text-foreground">{q.quote_id}</span>
              </div>

              <div className="text-sm text-muted-foreground">
                Name: <span className="text-foreground">{q.name}</span>
              </div>

              <div className="text-sm text-muted-foreground">
                Email: <span className="text-foreground">{q.email}</span>
              </div>

              <div className="text-sm text-muted-foreground">
                Total: <span className="text-foreground font-semibold">{formatCADFromCents(q.total_cents)}</span>
              </div>

              <div className="pt-2">
                <div className="text-sm font-medium text-foreground">Items</div>
                <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                  {q.items?.length ? (
                    q.items.map((it, idx) => (
                      <li key={idx} className="flex justify-between gap-4">
                        <span className="truncate">{it.name || it.id || "Item"}</span>
                        {typeof it.basePrice === "number" ? (
                          <span className="font-mono text-foreground">${it.basePrice}</span>
                        ) : null}
                      </li>
                    ))
                  ) : (
                    <li>No items found.</li>
                  )}
                </ul>
              </div>

              <div className="pt-4">
                {q.paid ? (
                  <div className="text-sm text-green-500 text-center">Status: Paid</div>
                ) : (
                  <div className="text-sm text-yellow-500 text-center">
                    Payment received — confirming… (this can take a few seconds)
                  </div>
                )}
              </div>

              <div className="pt-4 flex justify-center gap-3">
                <Link
                  to="/"
                  className="inline-flex h-10 items-center justify-center rounded-md border border-input px-4 text-sm font-medium"
                >
                  Back Home
                </Link>

                <Link
                  to="/pay"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-foreground text-background px-4 text-sm font-medium"
                >
                  Pay Another Quote
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="absolute inset-0 z-0 pointer-events-none">
        <Aurora colorStops={["#380a65", "#000000", "#380a65"]} blend={0.5} amplitude={1.0} speed={0.5} />
      </div>

      <BackgroundBeams />
    </div>
  )
}
