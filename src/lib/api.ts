// src/lib/api.ts
const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    let msg = `Request failed (${res.status})`;
    try {
      const data = await res.json();
      msg = data?.detail || data?.message || msg;
    } catch {}
    throw new Error(msg);
  }

  // Some endpoints might return empty
  const text = await res.text();
  return text ? (JSON.parse(text) as T) : ({} as T);
}

/* -------------------- Types -------------------- */
export type LeadPayload = {
  intent: "get_quote" | "book_call" | "general_question";
  full_name: string;
  email: string;
  company?: string;
  budget_range?: string;
  timeline?: string;
  project_type: "brand" | "web" | "growth";
  details: string;
  consent: boolean;
  source_path?: string;
};

export type QuotePayload = {
  client: {
    name: string;
    email: string;
    company?: string;
    website?: string;
  };
  notes?: string;
  summary: {
    tier: string;
    timeline: string;
    bundles: string[];
  };
  services: Array<{
    name: string;
    category: "Brand" | "Web" | "Growth";
    description?: string;
    scope: string[];
    qty: number;
    amount: string; // "$1,500.00"
  }>;
  pricing: {
    subtotal: string;
    complexity_fee: string;
    adjusted: string;
    hst: string;
    total: string;
    currency: "CAD";
  };
  calendly_url: string;
};

export type OkResponse = { ok: true };

/* -------------------- API calls -------------------- */
export const api = {
  health: () => request<{ ok: boolean }>("/health"),

  createLead: (payload: LeadPayload) =>
    request<{ ok: true; id?: string }>("/api/leads", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  generateQuoteAndEmail: (payload: QuotePayload) =>
    request<{ ok: true; quote_number?: string }>("/api/quotes/generate-and-email", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  // Admin (we’ll wire these later)
  getAdminLeads: () => request<any[]>("/api/admin/leads"),
  getAdminQuotes: () => request<any[]>("/api/admin/quotes"),
};
