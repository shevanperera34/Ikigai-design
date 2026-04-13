// src/lib/api.ts

const RAW_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.NEXT_PUBLIC_API_BASE ||
  "";

// Normalize (remove trailing slash)
const API_BASE = RAW_BASE.replace(/\/+$/, "");

type ApiErrorShape = { detail?: any; message?: string; error?: string } | any;

/**
 * Enhanced error so callers can read err.status (super useful for 404/409 etc).
 */
export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

async function parseError(res: Response): Promise<string> {
  const contentType = res.headers.get("content-type") || "";
  try {
    if (contentType.includes("application/json")) {
      const data: ApiErrorShape = await res.json();
      if (typeof data?.detail === "string") return data.detail;
      if (Array.isArray(data?.detail)) return JSON.stringify(data.detail);
      return data?.message || data?.error || `Request failed (${res.status})`;
    }
    const text = await res.text();
    return text || `Request failed (${res.status})`;
  } catch {
    return `Request failed (${res.status})`;
  }
}

async function requestJSON<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      Accept: "application/json",
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    const msg = await parseError(res);
    throw new ApiError(msg, res.status);
  }

  const text = await res.text();
  return text ? (JSON.parse(text) as T) : ({} as T);
}

async function requestBlob(path: string, options: RequestInit = {}): Promise<Blob> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    const msg = await parseError(res);
    throw new ApiError(msg, res.status);
  }

  return await res.blob();
}

/* -------------------- Types (match backend intake.py) -------------------- */

export type IntakeQuotePayload = {
  quote_id: string;
  name: string;
  email: string;
  company?: string | null;
  website?: string | null;
  bundles: string[];
  items: any[];
  subtotal_cents: number;
  complexity_fee_cents: number;
  tax_cents: number;
  total_cents: number;
  tier?: string | null;
  eta_weeks?: number | null;
  calendly_url?: string | null;

  // ✅ NEW: discounts (stored in DB)
  bundle_discount_cents?: number;            // auto bundle discount amount in cents
  discount_code?: string | null;             // manual code applied (if any)
  discount_code_percentage?: number | null;  // snapshot at time of quote (10 for 10%)
  discount_code_cents?: number;              // computed discount amount in cents
};

export type ContactPayload = {
  purpose: "call" | "quote" | "question";
  name: string;
  email: string;
  company?: string | null;
  project_types?: string[];
  budget?: string | null;
  timeline?: string | null;
  subject?: string | null;
  message: string;
};

export type ValidateDiscountResponse =
  | { ok: true; code: string; discount_percentage: number }
  | { ok: false; reason?: string };

/* -------------------- API -------------------- */

export const api = {
  baseUrl: API_BASE,

  // basic
  health: () => requestJSON<{ ok: boolean }>("/health"),
  whoami: () => requestJSON<{ ok: boolean; service: string; cors: string }>("/whoami"),

  // intake endpoints (FastAPI router prefix="/api")
  createQuote: (payload: IntakeQuotePayload) =>
    requestJSON<{ ok: true; quote_id: string; id: string; existing: boolean }>("/api/quotes", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  listQuotes: (limit = 50) => requestJSON<any[]>(`/api/quotes?limit=${limit}`),

  createContact: (payload: ContactPayload) =>
    requestJSON<{ ok: true; id: string }>("/api/contact", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  listContacts: (limit = 50) => requestJSON<any[]>(`/api/contact?limit=${limit}`),

  // ✅ NEW: validate discount code (your endpoint you tested)
  validateDiscount: (code: string) =>
    requestJSON<ValidateDiscountResponse>("/api/discounts/validate", {
      method: "POST",
      body: JSON.stringify({ code }),
    }),

  // PDF endpoints (blob)
  quotePdf: (payload: any) =>
    requestBlob("/api/quote/pdf", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  testPdf: () => requestBlob("/api/test/pdf"),
};
