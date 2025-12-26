// src/sections/Services-GetQuote.tsx
import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

type BundleTag = "brand" | "web" | "growth";

interface ServiceItem {
  id: string;
  name: string;
  bundle: BundleTag;
  desc: string;
  basePrice: number;
  addon?: boolean;
}

const CATALOG: ServiceItem[] = [
  // Brand
  { id: "logo", name: "Logo & Identity", bundle: "brand", desc: "Primary logo, marks, colors, typography.", basePrice: 900 },
  { id: "voice", name: "Voice & Messaging Guide", bundle: "brand", desc: "Tone, taglines, brand statements.", basePrice: 600 },
  { id: "copy", name: "Landing Copy", bundle: "brand", desc: "Hero, offer, proof, CTA copy.", basePrice: 450, addon: true },

  // Web
  { id: "site1", name: "1-Page Website", bundle: "web", desc: "High-performance single page + form.", basePrice: 1200 },
  { id: "site5", name: "3-5 Page Website", bundle: "web", desc: "Multi-page site with routing.", basePrice: 2600 },
  { id: "crm", name: "Booking/CRM Setup", bundle: "web", desc: "Forms → CRM → notifications.", basePrice: 600, addon: true },
  { id: "seo", name: "Speed & SEO Pass", bundle: "web", desc: "Performance, meta, basic schema.", basePrice: 400, addon: true },
  { id: "three", name: "3D Component Hook", bundle: "web", desc: "Embed 3D viewer / model.", basePrice: 750, addon: true },

  // Growth
  { id: "adssetup", name: "Ad Account + Pixel Setup", bundle: "growth", desc: "Meta/Google accounts, events.", basePrice: 350 },
  { id: "ugc", name: "UGC Ad Creative Pack (3)", bundle: "growth", desc: "Three short videos, captions.", basePrice: 800, addon: true },
  { id: "retarget", name: "Retargeting Setup", bundle: "growth", desc: "Audiences + placements.", basePrice: 450, addon: true },
  { id: "email", name: "Email/SMS Welcome Flow", bundle: "growth", desc: "Welcome + abandon cart/booking.", basePrice: 700 },
];

function currency(n: number) {
  return n.toLocaleString("en-CA", { style: "currency", currency: "CAD" });
}

/**
 * IMPORTANT:
 * Set VITE_API_URL in your frontend .env
 * Example:
 *   VITE_API_URL=http://192.168.0.73:8000
 */
const API_BASE = (import.meta as any).env?.VITE_API_URL || "http://192.168.0.73:8000";

function fmtDate(d: Date) {
  // YYYY-MM-DD
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function addDays(d: Date, days: number) {
  const x = new Date(d);
  x.setDate(x.getDate() + days);
  return x;
}

// minimal “scope bullets” (backend template expects bullets array)
function bulletsForItem(item: ServiceItem): string[] {
  // You can tune these later; this is sane default mapping.
  // If you want exact copy from your mock PDF, we can tighten it after.
  switch (item.id) {
    case "logo":
      return ["Primary logo + responsive marks", "Color & type system", "Usage sheet (PDF)"];
    case "voice":
      return ["Tone + brand voice rules", "Taglines + positioning notes", "Key messaging pillars"];
    case "copy":
      return ["Hero/offer copy", "CTA + proof sections", "Conversion structure guidance"];
    case "site1":
      return ["Single page build", "Performance-first layout", "Form + basic tracking"];
    case "site5":
      return ["Multi-page routing", "Reusable sections", "SEO-ready structure"];
    case "crm":
      return ["Forms → CRM pipeline", "Auto notifications", "Booking-ready workflow"];
    case "seo":
      return ["Core Web Vitals pass", "Meta + headings cleanup", "Basic schema (where applicable)"];
    case "three":
      return ["3D embed integration", "Model viewer hook", "Interaction + performance tuning"];
    case "adssetup":
      return ["Meta/Google account setup", "Pixel/events wiring", "Baseline conversion tracking"];
    case "ugc":
      return ["3 short ad concepts", "Caption + hook variations", "Delivery-ready pack"];
    case "retarget":
      return ["Audience setup", "Placement strategy", "Retarget funnel wiring"];
    case "email":
      return ["Welcome sequence", "Abandon/booking follow-up", "Copy + automation rules"];
    default:
      return [item.desc];
  }
}

export default function IkigaiQuoteFlowMockup() {
  const location = useLocation();
  const bundlesFromState = (location.state as { bundles?: BundleTag[] } | null)?.bundles ?? [];

  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [lead, setLead] = useState({
    name: "",
    email: "",
    company: "",
    website: "",
    niche: "",
    timeline: "Soon",
    budget: "",
  });

  const [quoteId, setQuoteId] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Pre-select NON-add-on items for incoming bundles
  useEffect(() => {
    if (!bundlesFromState.length) return;
    const next: Record<string, boolean> = {};
    CATALOG.forEach((item) => {
      if (!item.addon && bundlesFromState.includes(item.bundle)) next[item.id] = true;
    });
    setSelected(next);
  }, [bundlesFromState]);

  const selectedItems = useMemo(() => CATALOG.filter((i) => selected[i.id]), [selected]);
  const bundlesUsed = useMemo(() => Array.from(new Set(selectedItems.map((i) => i.bundle))), [selectedItems]);

  const breakdown = useMemo(() => {
    const subtotal = selectedItems.reduce((s, i) => s + i.basePrice, 0);
    let discount = 0,
      complexityFee = 0;

    const counts: Record<BundleTag, number> = { brand: 0, web: 0, growth: 0 };
    selectedItems.forEach((i) => {
      counts[i.bundle]++;
    });
    if (Object.values(counts).some((c) => c >= 3)) discount += subtotal * 0.05;
    if (bundlesUsed.length >= 2) complexityFee += subtotal * 0.10;

    const adjusted = Math.max(0, subtotal - discount + complexityFee);
    const tax = adjusted * 0.13;
    const total = adjusted + tax;

    const tier = total < 1500 ? "Starter" : total < 4500 ? "Core" : total < 9000 ? "System" : "Flagship";
    const baseWeeks = Math.ceil(selectedItems.length / 2) || 1;
    const etaWeeks = Math.min(12, baseWeeks + (bundlesUsed.length - 1));

    return { subtotal, discount, complexityFee, adjusted, tax, total, tier, etaWeeks };
  }, [selectedItems, bundlesUsed]);

  function toggle(id: string) {
    setSelected((prev) => ({ ...prev, [id]: !prev[id] }));
    setQuoteId(null);
    setError(null);
  }

  function allClear() {
    setSelected({});
    setQuoteId(null);
    setError(null);
  }

  async function downloadBlobAsFile(blob: Blob, filename: string) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  function makeQuoteId() {
    const n = Date.now();
    const seq = (Math.random() * 1000) | 0;
    return `IQ-${new Date(n).getFullYear()}-${String(seq).padStart(3, "0")}`;
  }

  function bundleLabel(b: BundleTag) {
    if (b === "brand") return "Brand";
    if (b === "web") return "Web";
    return "Growth";
  }

  async function generateQuote() {
    setError(null);

    if (!lead.name || !lead.email) {
      alert("Enter name and email to generate your quote.");
      return;
    }
    if (selectedItems.length === 0) return;

    const id = makeQuoteId();
    setQuoteId(id);

    // Build backend payload (matches your HTML→PDF template expectations)
    const today = new Date();
    const payload = {
      brand: {
        website: "ikigaiproject.com",
        email: "theikigaiproject@outlook.com",
      },
      quote: {
        number: id,
        date: fmtDate(today),
        valid_until: fmtDate(addDays(today, 14)),
      },
      client: {
        company: lead.company || "",
        name: lead.name,
        email: lead.email,
        website: lead.website || "",
        notes: lead.niche ? `Niche: ${lead.niche}` : "",
      },
      summary: {
        tier: breakdown.tier,
        timeline: `${breakdown.etaWeeks} weeks`,
        bundles: bundlesUsed.map(bundleLabel),
      },
      items: selectedItems.map((item) => ({
        name: item.name,
        bundle: bundleLabel(item.bundle),
        qty: 1,
        amount: item.basePrice,
        bullets: bulletsForItem(item),
      })),
      totals: {
        subtotal: Number(breakdown.subtotal.toFixed(2)),
        complexity_fee: Number(breakdown.complexityFee.toFixed(2)), // backend template uses totals.complexity_fee
        adjusted: Number(breakdown.adjusted.toFixed(2)),
        tax: Number(breakdown.tax.toFixed(2)),
        total: Number(breakdown.total.toFixed(2)),
      },
      next: {
        calendly: "https://calendly.com/theikigaiproject-ca/30min",
      },
    };

    setIsGenerating(true);

    try {
      const res = await fetch(`${API_BASE}/api/quote/pdf`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`PDF generation failed (${res.status}) ${text}`);
      }

      const blob = await res.blob();
      await downloadBlobAsFile(blob, `${id}.pdf`);
    } catch (e: any) {
      console.error(e);
      setError(e?.message || "PDF generation failed");
      // keep quoteId but show error; user can try again
    } finally {
      setIsGenerating(false);
    }
  }

  const calendlyUrl = useMemo(() => {
    const base = "https://calendly.com/theikigaiproject-ca/30min";
    const params = new URLSearchParams({
      quoteId: quoteId || "preview",
      total: String(Math.round(breakdown.total)),
      tier: breakdown.tier,
    }).toString();
    return `${base}?${params}`;
  }, [quoteId, breakdown.total, breakdown.tier]);

  const headerCls = "font-[Space_Grotesk] uppercase tracking-widest";

  return (
    <section className="relative min-h-screen font-[Inter] text-white">
      {/* Brand cinematic layers */}
      <div className="pointer-events-none absolute inset-0 -z-20">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-purple-700/5 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(70%_45%_at_50%_-10%,rgba(255,255,255,0.05),transparent)]" />
      </div>

      <div className="px-4 sm:px-6 lg:px-8 py-16 pt-28 md:pt-28">
        <div className="mx-auto max-w-6xl">
          <header className="text-center">
            <h1 className={`${headerCls} text-3xl sm:text-4xl md:text-5xl`}>Custom Alignment Quote Builder</h1>
            <p className="mt-3 text-white/70">Select the services you want, then generate a quote and book a call.</p>
          </header>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Services list */}
            <div className="lg:col-span-2 space-y-6">
              {(["brand", "web", "growth"] as BundleTag[]).map((group) => (
                <section
                  key={group}
                  className="relative overflow-hidden rounded-2xl border border-white/15 backdrop-blur-sm
                             shadow-[0_20px_80px_rgba(0,0,0,0.35)]"
                  style={{
                    background: "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.04) 100%)",
                  }}
                >
                  {/* subtle brand wash */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(90% 70% at -10% -10%, rgba(0,51,255,0.10), transparent 60%), radial-gradient(90% 70% at 110% -10%, rgba(108,0,255,0.10), transparent 60%)",
                    }}
                  />
                  <div className="relative p-4 sm:p-5">
                    <h2 className="text-lg sm:text-xl font-semibold capitalize">
                      {group === "brand" ? "Brand Systems" : group === "web" ? "Web Infrastructure" : "Growth Architecture"}
                    </h2>

                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      {CATALOG.filter((i) => i.bundle === group).map((item) => (
                        <label
                          key={item.id}
                          className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3 transition-colors
                            ${selected[item.id] ? "border-white/20 bg-white/10" : "border-white/10 hover:border-white/20 bg-white/[0.04]"}
                          `}
                        >
                          <input
                            type="checkbox"
                            className="mt-1 h-4 w-4 accent-white"
                            checked={!!selected[item.id]}
                            onChange={() => toggle(item.id)}
                            aria-label={`Toggle ${item.name}`}
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between gap-3">
                              <span className="font-medium">{item.name}</span>
                              <span className="text-sm text-white/80">{currency(item.basePrice)}</span>
                            </div>
                            <div className="text-sm text-white/70">{item.desc}</div>
                            {item.addon && (
                              <span className="mt-1 inline-block rounded-full border border-white/20 px-2 py-0.5 text-[11px] text-white/80">
                                Add-on
                              </span>
                            )}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </section>
              ))}
            </div>

            {/* Summary + form */}
            <aside
              className="lg:sticky lg:top-24 h-fit rounded-2xl border border-white/15 backdrop-blur-sm
                               shadow-[0_20px_80px_rgba(0,0,0,0.35)] p-4 sm:p-5"
              style={{
                background: "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.04) 100%)",
              }}
            >
              <h3 className="text-lg sm:text-xl font-semibold">Summary</h3>

              {selectedItems.length === 0 ? (
                <p className="mt-2 text-white/70">Select at least one service to begin.</p>
              ) : (
                <ul className="mt-3 space-y-2 text-sm text-white/85">
                  {selectedItems.map((i) => (
                    <li key={i.id} className="flex items-center justify-between border-b border-white/10 pb-1">
                      <span>{i.name}</span>
                      <span className="text-white/70">{currency(i.basePrice)}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Breakdown */}
              <div className="mt-4 space-y-1 text-sm">
                <div className="flex justify-between text-white/80">
                  <span>Subtotal</span>
                  <span>{currency(breakdown.subtotal)}</span>
                </div>
                {breakdown.discount > 0 && (
                  <div className="flex justify-between text-emerald-300/90">
                    <span>Pack discount</span>
                    <span>-{currency(breakdown.discount)}</span>
                  </div>
                )}
                {breakdown.complexityFee > 0 && (
                  <div className="flex justify-between text-purple-300/90">
                    <span>Complexity fee</span>
                    <span>+{currency(breakdown.complexityFee)}</span>
                  </div>
                )}
                <div className="flex justify-between text-white/80">
                  <span>Adjusted</span>
                  <span>{currency(breakdown.adjusted)}</span>
                </div>
                <div className="flex justify-between text-white/80">
                  <span>Tax (13%)</span>
                  <span>{currency(breakdown.tax)}</span>
                </div>
                <div className="flex justify-between text-white font-semibold pt-1">
                  <span>Total</span>
                  <span>{currency(breakdown.total)}</span>
                </div>
                <div className="text-xs text-white/60">
                  Tier: {breakdown.tier} • ETA: {breakdown.etaWeeks} weeks
                </div>
              </div>

              {/* Lead form */}
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  className="w-full rounded-lg border border-white/15 bg-white/[0.04] px-3 py-2 text-sm placeholder-white/60 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
                  placeholder="Your name"
                  value={lead.name}
                  onChange={(e) => setLead({ ...lead, name: e.target.value })}
                />
                <input
                  className="w-full rounded-lg border border-white/15 bg-white/[0.04] px-3 py-2 text-sm placeholder-white/60 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
                  placeholder="Email"
                  value={lead.email}
                  onChange={(e) => setLead({ ...lead, email: e.target.value })}
                />
                <input
                  className="w-full rounded-lg border border-white/15 bg-white/[0.04] px-3 py-2 text-sm placeholder-white/60 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
                  placeholder="Company (optional)"
                  value={lead.company}
                  onChange={(e) => setLead({ ...lead, company: e.target.value })}
                />
                <input
                  className="w-full rounded-lg border border-white/15 bg-white/[0.04] px-3 py-2 text-sm placeholder-white/60 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
                  placeholder="Website (optional)"
                  value={lead.website}
                  onChange={(e) => setLead({ ...lead, website: e.target.value })}
                />
              </div>

              <div className="mt-4 flex flex-col sm:flex-row gap-2">
                <button
                  className="flex-1 rounded-xl px-4 py-2 text-sm font-medium text-white shadow-sm transition-all
                             bg-gradient-to-r from-[rgba(0,51,255,0.9)] to-[rgba(108,0,255,0.9)]
                             hover:from-[rgba(0,51,255,1)] hover:to-[rgba(108,0,255,1)]
                             focus:outline-none focus:ring-2 focus:ring-white/20 disabled:opacity-50"
                  onClick={generateQuote}
                  disabled={selectedItems.length === 0 || isGenerating}
                >
                  {isGenerating ? "Generating..." : "Generate Quote (PDF)"}
                </button>

                <a
                  className={`flex-1 rounded-xl border border-white/20 px-4 py-2 text-sm text-center text-white/90 hover:border-white/40 transition ${
                    !quoteId ? "pointer-events-none opacity-50" : ""
                  }`}
                  href={calendlyUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Book on Calendly
                </a>

                <button
                  className="rounded-xl border border-white/15 px-4 py-2 text-sm text-white/85 hover:border-white/30 transition"
                  onClick={allClear}
                  disabled={isGenerating}
                >
                  Clear
                </button>
              </div>

              {error && (
                <div className="mt-3 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-100">
                  {error}
                </div>
              )}

              {quoteId && !error && (
                <div className="mt-3 rounded-lg border border-white/15 bg-white/[0.04] p-3 text-xs text-white/70">
                  Quote generated: <span className="text-white">{quoteId}</span>. Your PDF was downloaded.
                  Use the Calendly button to continue.
                </div>
              )}

              <div className="mt-4 text-[11px] text-white/45">
                API: <span className="text-white/60">{API_BASE}</span>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
