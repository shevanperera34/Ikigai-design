// src/lib/api.ts

const RAW_BASE =
  import.meta.env.VITE_API_BASE_URL ||
  import.meta.env.VITE_API_URL ||
  "http://127.0.0.1:8000";

// Normalize (remove trailing slash)
const API_BASE = RAW_BASE.replace(/\/+$/, "");

type ApiErrorShape =
  | { detail?: any; message?: string; error?: string }
  | any;

async function parseError(res: Response): Promise<string> {
  const contentType = res.headers.get("content-type") || "";
  try {
    if (contentType.includes("application/json")) {
      const data: ApiErrorShape = await res.json();
      // FastAPI typically returns { detail: ... }
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
    throw new Error(await parseError(res));
  }

  // Handle empty responses
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
    throw new Error(await parseError(res));
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

export const api = {
  // basic
  baseUrl: API_BASE,
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

  // PDF endpoints (blob)
  quotePdf: (payload: any) =>
    requestBlob("/api/quote/pdf", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  testPdf: () => requestBlob("/api/test/pdf"),
};
