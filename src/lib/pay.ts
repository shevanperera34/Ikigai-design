export type QuoteSummary = {
  quote_id: string
  name: string
  email: string
  paid: boolean
  total_cents: number
  items: Array<Record<string, any>>
}

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE?.replace(/\/+$/, "") ||
  "https://api.theikigaiproject.com"

async function postJSON<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })

  // Try to parse FastAPI errors nicely
  const contentType = res.headers.get("content-type") || ""
  const payload = contentType.includes("application/json")
    ? await res.json().catch(() => null)
    : await res.text().catch(() => null)

  if (!res.ok) {
    const detail =
      (payload && typeof payload === "object" && "detail" in payload && (payload as any).detail) ||
      (typeof payload === "string" ? payload : "Request failed")
    const err = new Error(String(detail))
    ;(err as any).status = res.status
    throw err
  }

  return payload as T
}

export async function resolveQuote(quote_id: string) {
  return postJSON<QuoteSummary>("/api/pay/resolve", { quote_id })
}

export async function createCheckoutSession(quote_id: string) {
  return postJSON<{ ok: boolean; url: string; id: string }>(
    "/api/pay/create-checkout-session",
    { quote_id }
  )
}
