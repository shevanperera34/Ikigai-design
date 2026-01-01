"use client"

import React, { useMemo, useState } from "react"
import { BackgroundBeams } from "../components/background-beams"
import { Input } from "../components/input"
import { createCheckoutSession, resolveQuote } from "../lib/pay"
import Aurora from "../components/Aurora"

export default function PayQuote() {
  const [quoteId, setQuoteId] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const cleaned = useMemo(() => quoteId.trim(), [quoteId])

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (!cleaned) {
      setError("Enter your Quote ID.")
      return
    }

    setLoading(true)
    try {
      // 1) Validate quote exists (and also catches paid=true if you want to block later)
      const q = await resolveQuote(cleaned)

      // Optional: block if already paid
      if (q.paid) {
        setError("This quote is already paid. If this is a mistake, contact us.")
        return
      }

      // 2) Create Stripe checkout session and redirect
      const session = await createCheckoutSession(cleaned)
      if (!session?.url) {
        setError("Could not start checkout. Try again.")
        return
      }

      window.location.href = session.url
    } catch (err: any) {
      const status = err?.status
      const msg = String(err?.message || "")

      if (status === 404) {
        setError("Quote ID not found. Double-check it and try again.")
      } else if (msg.toLowerCase().includes("quote already paid") || status === 409) {
        setError("This quote is already paid.")
      } else {
        setError(msg || "Something went wrong. Try again.")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-[40rem] w-full rounded-md bg-background relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-2xl mx-auto p-4 w-full">
        <h1 className="relative z-10 text-lg md:text-6xl bg-clip-text text-transparent bg-gradient-to-b from-foreground to-muted-foreground text-center font-sans font-bold">
          Pay Your Quote
        </h1>

        <p className="text-muted-foreground max-w-lg mx-auto my-3 text-sm text-center relative z-10">
          Enter your Quote ID (example: <span className="font-mono">IQ-2025-502</span>) and we’ll take you to secure checkout.
        </p>

        <form onSubmit={onSubmit} className="relative z-10 mt-6 space-y-3">
          <Input
            type="text"
            value={quoteId}
            onChange={(e) => setQuoteId(e.target.value)}
            placeholder="IQ-2025-502"
            className="w-full"
            autoComplete="off"
            spellCheck={false}
          />

          

          <button
            type="submit"
            disabled={loading}
            className="w-full h-10 rounded-md border border-input bg-foreground text-background text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Starting checkout…" : "Continue to Payment"}
          </button>

          {error && (
            <div className="text-sm text-red-500 text-center mt-2">
              {error}
            </div>
          )}
        </form>
      </div>
          <div className="absolute inset-0 z-0 pointer-events-none">
                  <Aurora colorStops={["#380a65", "#000000", "#380a65"]} blend={0.5} amplitude={1.0} speed={0.5} />
                </div>
      <BackgroundBeams />
    </div>
  )
}
