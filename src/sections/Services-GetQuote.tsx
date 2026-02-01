// src/sections/Services-GetQuote.tsx
import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { api, ApiError } from "../lib/api";
import { track } from "../lib/plausible";
import { metaPixel } from "../lib/metaPixel";

type BundleTag = "brand" | "web" | "growth";

interface ServiceItem {
  id: string;
  name: string;
  bundle: BundleTag;
  desc: string;
  basePrice: number;
  addon?: boolean;

  // ✅ NEW: items that should NEVER be discounted
  nonDiscountable?: boolean;
}

const CATALOG: ServiceItem[] = [
  // Brand
  { id: "logo", name: "Logo & Identity", bundle: "brand", desc: "Primary logo, marks, colors, typography.", basePrice: 220 },
  { id: "voice", name: "Voice & Messaging Guide", bundle: "brand", desc: "Tone, taglines, brand statements.", basePrice: 150 },
  { id: "copy", name: "Landing Copy", bundle: "brand", desc: "Hero, offer, proof, CTA copy.", basePrice: 300, addon: true },

  // Web
  { id: "site1", name: "1-Page Website", bundle: "web", desc: "High-performance single page + form.", basePrice: 499 },
  { id: "site5", name: "3-5 Page website", bundle: "web", desc: "Add 3-5 website pages", basePrice: 499, addon: true },
  { id: "crm", name: "Booking/CRM Setup", bundle: "web", desc: "Forms → CRM → notifications.", basePrice: 205, addon: true },
  { id: "seo", name: "Speed & SEO Pass", bundle: "web", desc: "Performance, meta, basic schema.", basePrice: 200, addon: true },
  { id: "three", name: "3D Component Hook", bundle: "web", desc: "Embed 3D viewer / model.", basePrice: 250, addon: true },

  // ✅ NEW: Domain setup (non-discountable)
  {
    id: "domain_setup",
    name: "Domain Setup (est.)",
    bundle: "web",
    desc: "Estimated domain setup cost. Final domain pricing may vary.",
    basePrice: 20,
    addon: true,
    nonDiscountable: true,
  },

  // Growth
  { id: "adssetup", name: "Ad Account + Pixel Setup", bundle: "growth", desc: "Meta/Google accounts, events.", basePrice: 300 },
  { id: "ugc", name: "UGC Ad Creative Pack (3)", bundle: "growth", desc: "Three short videos, captions.", basePrice: 399, addon: true },
  { id: "retarget", name: "Retargeting Setup", bundle: "growth", desc: "Audiences + placements.", basePrice: 275, addon: true },
  { id: "email", name: "Email/SMS Welcome Flow", bundle: "growth", desc: "Welcome + abandon cart/booking.", basePrice: 299 },
];

function currency(n: number) {
  return n.toLocaleString("en-CA", { style: "currency", currency: "CAD" });
}

function isoDate(d = new Date()) {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function addDaysISO(days: number) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return isoDate(d);
}

function makeQuoteId() {
  const n = Date.now();
  const seq = (Math.random() * 1000) | 0;
  return `IQ-${new Date(n).getFullYear()}-${String(seq).padStart(3, "0")}`;
}

function toCents(amountCAD: number) {
  return Math.round(amountCAD * 100);
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
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

  // ✅ manual discount code UI state
  const [discountCode, setDiscountCode] = useState("");
  const [discountApplying, setDiscountApplying] = useState(false);
  const [discountError, setDiscountError] = useState<string | null>(null);
  const [discountApplied, setDiscountApplied] = useState<{
    code: string;
    discount_percentage: number; // e.g. 10 for 10%
  } | null>(null);

  // Optional: quick health check in console so you know env is correct
  useEffect(() => {
    api.health()
      .then((r) => console.log("✅ API health:", r))
      .catch((e) => console.error("❌ API health failed:", e));
  }, []);

  useEffect(() => {
    // Plausible
    track("ViewContent", { page: "alignment_builder" });

    // Meta Pixel
    metaPixel.track("ViewContent", {
      content_name: "Alignment Builder",
      content_category: "Quote Builder",
      page: "services/get-quote",
    });
  }, []);

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

  const bundlesUsed = useMemo(
    () => Array.from(new Set(selectedItems.map((i) => i.bundle))),
    [selectedItems]
  );

  /**
   * ✅ pricing with:
   * - auto bundle discount (discountable items only)
   * - manual discount code (discountable items only)
   * - non-discountable items (domain setup) never discounted
   *
   * IMPORTANT: discounts BEFORE tax.
   */
  const breakdown = useMemo(() => {
    const discountableItems = selectedItems.filter((i) => !i.nonDiscountable);
    const nonDiscountableItems = selectedItems.filter((i) => i.nonDiscountable);

    const subtotalDiscountable = discountableItems.reduce((s, i) => s + i.basePrice, 0);
    const subtotalNonDiscountable = nonDiscountableItems.reduce((s, i) => s + i.basePrice, 0);

    const subtotal = subtotalDiscountable + subtotalNonDiscountable;

    // bundle counts should be based on discountable items (domain setup shouldn’t “earn” bundle discount)
    const counts: Record<BundleTag, number> = { brand: 0, web: 0, growth: 0 };
    discountableItems.forEach((i) => {
      counts[i.bundle]++;
    });

    // --- auto bundle discount (only discountable subtotal) ---
    let bundleDiscount = 0;
    if (Object.values(counts).some((c) => c >= 3)) {
      bundleDiscount += subtotalDiscountable * 0.05;
    }

    // --- complexity fee (apply to discountable work only) ---
    let complexityFee = 0;
    if (bundlesUsed.length >= 2) {
      complexityFee += subtotalDiscountable * 0.10;
    }

    // subtotal after bundle discount + complexity (discountable side)
    const discountablePreManual = Math.max(0, subtotalDiscountable - bundleDiscount + complexityFee);

    // --- manual code discount (only on discountable side) ---
    const pct = discountApplied?.discount_percentage ?? 0;
    const pctClamped = clamp(pct, 0, 100);
    const codeDiscount = discountablePreManual * (pctClamped / 100);

    // final adjusted = (discountable after all discounts) + (non-discountable untouched)
    const discountableAdjusted = Math.max(0, discountablePreManual - codeDiscount);
    const adjusted = discountableAdjusted + subtotalNonDiscountable;

    const tax = adjusted * 0.13;
    const total = adjusted + tax;

    const tier =
      total < 1500 ? "Starter" : total < 4500 ? "Core" : total < 9000 ? "System" : "Flagship";

    const baseWeeks = Math.ceil(selectedItems.length / 2) || 1;
    const etaWeeks = Math.min(12, baseWeeks + (bundlesUsed.length - 1));

    return {
      subtotal,
      subtotalDiscountable,
      subtotalNonDiscountable,
      bundleDiscount,
      complexityFee,
      manualDiscount: codeDiscount,
      adjusted,
      tax,
      total,
      tier,
      etaWeeks,
      manualPct: pctClamped,
      manualCode: discountApplied?.code ?? null,
    };
  }, [selectedItems, bundlesUsed, discountApplied]);

  function toggle(id: string) {
    setSelected((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function allClear() {
    setSelected({});
    setQuoteId(null);
    setDiscountCode("");
    setDiscountApplied(null);
    setDiscountError(null);
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

  async function applyDiscountCode() {
    const code = discountCode.trim().toUpperCase();
    setDiscountError(null);

    if (!code) {
      setDiscountApplied(null);
      return;
    }

    setDiscountApplying(true);
    try {
      const res = await api.validateDiscount(code);

      if (!("ok" in res) || res.ok !== true) {
        setDiscountApplied(null);
        setDiscountError("Invalid discount code.");
        return;
      }

      setDiscountApplied({
        code: res.code,
        discount_percentage: res.discount_percentage,
      });
    } catch (e: any) {
      setDiscountApplied(null);

      const status = e instanceof ApiError ? e.status : undefined;
      const msg = String(e?.message || "");

      if (status === 404) setDiscountError("Invalid discount code.");
      else if (status === 409) setDiscountError("This code is not active.");
      else setDiscountError(msg || "Could not validate code.");
    } finally {
      setDiscountApplying(false);
    }
  }

  async function postQuoteToDb(id: string) {
    const dbPayload = {
      quote_id: id,
      name: lead.name,
      email: lead.email,
      company: lead.company || null,
      website: lead.website || null,
      bundles: bundlesUsed,
      items: selectedItems.map((i) => ({
        id: i.id,
        name: i.name,
        bundle: i.bundle,
        basePrice: i.basePrice,
        desc: i.desc,
        addon: !!i.addon,
        nonDiscountable: !!i.nonDiscountable,
      })),

      subtotal_cents: toCents(breakdown.subtotal),
      complexity_fee_cents: toCents(breakdown.complexityFee),
      tax_cents: toCents(breakdown.tax),
      total_cents: toCents(breakdown.total),

      tier: breakdown.tier,
      eta_weeks: breakdown.etaWeeks,
      calendly_url: calendlyUrl,

      // discount snapshots
      bundle_discount_cents: toCents(breakdown.bundleDiscount),
      discount_code: breakdown.manualCode,
      discount_code_percentage: discountApplied?.discount_percentage ?? null,
      discount_code_cents: toCents(breakdown.manualDiscount),

      // ✅ extra visibility (optional, but useful)
      nondiscountable_subtotal_cents: toCents(breakdown.subtotalNonDiscountable),
    };

    return api.createQuote(dbPayload as any);
  }

  async function generateQuote() {
    if (!lead.name || !lead.email) {
      alert("Enter name and email to generate your quote.");
      return;
    }

    const isEmailValid = /.+@.+\..+/.test(lead.email);
    if (!isEmailValid) {
      alert("Enter a valid email (ex: name@email.com).");
      return;
    }

    if (selectedItems.length === 0) return;

    const id = quoteId ?? makeQuoteId();
    setQuoteId(id);
    setIsGenerating(true);

    const pdfPayload = {
      client: {
        name: lead.name,
        email: lead.email,
        company: lead.company,
        website: lead.website,
        notes: "",
      },
      quote: {
        number: id,
        date: isoDate(),
        valid_until: addDaysISO(14),
        tier: breakdown.tier,
        eta_weeks: breakdown.etaWeeks,
        bundles: bundlesUsed,

        items: selectedItems.map((i) => ({
          name: i.name,
          bundle: i.bundle,
          desc: i.desc,
          amount: currency(i.basePrice),
        })),

        subtotal: currency(breakdown.subtotal),

        bundle_discount: breakdown.bundleDiscount > 0 ? `-${currency(breakdown.bundleDiscount)}` : "",
        complexity_fee: currency(breakdown.complexityFee),

        manual_discount:
          breakdown.manualDiscount > 0 && breakdown.manualCode
            ? `-${currency(breakdown.manualDiscount)} (${breakdown.manualCode})`
            : "",

        // ✅ show nondiscountable subtotal line if present
        nondiscountable_note:
          breakdown.subtotalNonDiscountable > 0
            ? `Non-discountable items included: ${currency(breakdown.subtotalNonDiscountable)}`
            : "",

        adjusted: currency(breakdown.adjusted),
        tax: currency(breakdown.tax),
        total: currency(breakdown.total),
        calendly_url: calendlyUrl,
      },
    };

    try {
      try {
        await postQuoteToDb(id);
      } catch (dbErr) {
        console.warn("Quote DB save failed (continuing to PDF):", dbErr);
      }

      const blob = await api.quotePdf(pdfPayload);

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Ikigai_Quote_${id}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e: any) {
      console.error(e);
      alert(e?.message || "Failed to generate PDF.");
    } finally {
      setIsGenerating(false);
    }
  }

  const headerCls = "font-[Space_Grotesk] uppercase tracking-widest";

  return (
    <section className="relative min-h-screen font-[Inter] text-white">
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

                            <div className="mt-1 flex gap-2">
                              {item.addon && (
                                <span className="inline-block rounded-full border border-white/20 px-2 py-0.5 text-[11px] text-white/80">
                                  Add-on
                                </span>
                              )}
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </section>
              ))}
            </div>

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
                      <span className="flex items-center gap-2">
                        {i.name}
                        {i.nonDiscountable && <span className="text-[11px] text-white/50">(not discounted)</span>}
                      </span>
                      <span className="text-white/70">{currency(i.basePrice)}</span>
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-4">
                <div className="flex gap-2">
                  <input
                    className="flex-1 rounded-lg border border-white/15 bg-white/[0.04] px-3 py-2 text-sm placeholder-white/60 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
                    placeholder="Discount code"
                    value={discountCode}
                    onChange={(e) => {
                      setDiscountCode(e.target.value);
                      setDiscountError(null);
                      setDiscountApplied(null);
                    }}
                    autoComplete="off"
                    spellCheck={false}
                  />
                  <button
                    type="button"
                    className="rounded-lg border border-white/20 px-3 py-2 text-sm text-white/90 hover:border-white/40 transition disabled:opacity-50"
                    onClick={applyDiscountCode}
                    disabled={discountApplying || !discountCode.trim()}
                  >
                    {discountApplying ? "Checking…" : "Apply"}
                  </button>
                </div>

                {discountApplied && (
                  <div className="mt-2 text-xs text-emerald-300/90">
                    Applied <span className="font-mono">{discountApplied.code}</span> — {discountApplied.discount_percentage}% off (discountable items only)
                  </div>
                )}

                {discountError && <div className="mt-2 text-xs text-red-400">{discountError}</div>}
              </div>

              <div className="mt-4 space-y-1 text-sm">
                <div className="flex justify-between text-white/80">
                  <span>Subtotal</span>
                  <span>{currency(breakdown.subtotal)}</span>
                </div>

                {breakdown.bundleDiscount > 0 && (
                  <div className="flex justify-between text-emerald-300/90">
                    <span>Bundle discount</span>
                    <span>-{currency(breakdown.bundleDiscount)}</span>
                  </div>
                )}

                {breakdown.complexityFee > 0 && (
                  <div className="flex justify-between text-purple-300/90">
                    <span>Complexity fee</span>
                    <span>+{currency(breakdown.complexityFee)}</span>
                  </div>
                )}

                {breakdown.manualDiscount > 0 && breakdown.manualCode && (
                  <div className="flex justify-between text-emerald-300/90">
                    <span>
                      Code discount <span className="font-mono text-white/70">({breakdown.manualCode})</span>
                    </span>
                    <span>-{currency(breakdown.manualDiscount)}</span>
                  </div>
                )}

                {breakdown.subtotalNonDiscountable > 0 && (
                  <div className="flex justify-between text-white/60">
                    <span>Non-discountable</span>
                    <span>{currency(breakdown.subtotalNonDiscountable)}</span>
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
                >
                  Clear
                </button>
              </div>

              {quoteId && (
                <div className="mt-3 rounded-lg border border-white/15 bg-white/[0.04] p-3 text-xs text-white/70">
                  Quote ID: <span className="text-white">{quoteId}</span>
                </div>
              )}
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
