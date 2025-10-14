// src/sections/Services-GetQuote.tsx
import React, { useEffect, useMemo, useState } from "react";
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
  { id: "logo",  name: "Logo & Identity",          bundle: "brand",  desc: "Primary logo, marks, colors, typography.", basePrice: 900 },
  { id: "voice", name: "Voice & Messaging Guide",  bundle: "brand",  desc: "Tone, taglines, brand statements.",         basePrice: 600 },
  { id: "copy",  name: "Landing Copy",             bundle: "brand",  desc: "Hero, offer, proof, CTA copy.",            basePrice: 450, addon: true },

  // Web
  { id: "site1", name: "1-Page Website",           bundle: "web",    desc: "High-performance single page + form.",     basePrice: 1200 },
  { id: "site5", name: "3-5 Page Website",         bundle: "web",    desc: "Multi-page site with routing.",            basePrice: 2600 },
  { id: "crm",   name: "Booking/CRM Setup",        bundle: "web",    desc: "Forms → CRM → notifications.",             basePrice: 600, addon: true },
  { id: "seo",   name: "Speed & SEO Pass",         bundle: "web",    desc: "Performance, meta, basic schema.",         basePrice: 400, addon: true },
  { id: "three", name: "3D Component Hook",        bundle: "web",    desc: "Embed 3D viewer / model.",                 basePrice: 750, addon: true },

  // Growth
  { id: "adssetup", name: "Ad Account + Pixel Setup", bundle: "growth", desc: "Meta/Google accounts, events.",         basePrice: 350 },
  { id: "ugc",      name: "UGC Ad Creative Pack (3)", bundle: "growth", desc: "Three short videos, captions.",         basePrice: 800, addon: true },
  { id: "retarget", name: "Retargeting Setup",        bundle: "growth", desc: "Audiences + placements.",               basePrice: 450, addon: true },
  { id: "email",    name: "Email/SMS Welcome Flow",   bundle: "growth", desc: "Welcome + abandon cart/booking.",       basePrice: 700 },
];

function currency(n: number) {
  return n.toLocaleString("en-CA", { style: "currency", currency: "CAD" });
}

export default function IkigaiQuoteFlowMockup() {
  const location = useLocation();
  const bundlesFromState = (location.state as { bundles?: BundleTag[] } | null)?.bundles ?? [];

  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [lead, setLead] = useState({
    name: "", email: "", company: "", website: "", niche: "", timeline: "Soon", budget: ""
  });
  const [quoteId, setQuoteId] = useState<string | null>(null);

  // Pre-select NON-add-on items for incoming bundles
  useEffect(() => {
    if (!bundlesFromState.length) return;
    const next: Record<string, boolean> = {};
    CATALOG.forEach(item => {
      if (!item.addon && bundlesFromState.includes(item.bundle)) {
        next[item.id] = true;
      }
    });
    setSelected(next);
  }, [bundlesFromState]);

  const selectedItems = useMemo(() => CATALOG.filter(i => selected[i.id]), [selected]);
  const bundlesUsed = useMemo(
    () => Array.from(new Set(selectedItems.map(i => i.bundle))),
    [selectedItems]
  );

  const breakdown = useMemo(() => {
    const subtotal = selectedItems.reduce((s, i) => s + i.basePrice, 0);
    let discount = 0, complexityFee = 0;

    const counts: Record<BundleTag, number> = { brand: 0, web: 0, growth: 0 };
    selectedItems.forEach(i => { counts[i.bundle]++; });
    if (Object.values(counts).some(c => c >= 3)) discount += subtotal * 0.05;
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
    setSelected(prev => ({ ...prev, [id]: !prev[id] }));
  }
  function allClear() {
    setSelected({});
    setQuoteId(null);
  }

  function generateQuote() {
    if (!lead.name || !lead.email) {
      alert("Enter name and email to generate your quote.");
      return;
    }
    const n = Date.now();
    const seq = (Math.random() * 1000) | 0;
    const id = `IQ-${new Date(n).getFullYear()}-${String(seq).padStart(3, "0")}`;
    setQuoteId(id);

    const lines: string[] = [];
    lines.push("The Ikigai Project — Quote (Mock)");
    lines.push(`Quote ID: ${id}`);
    lines.push(`Client: ${lead.name} | ${lead.company}`);
    lines.push(`Email: ${lead.email}`);
    lines.push("");
    lines.push("Selected Services:");
    selectedItems.forEach(i => lines.push(` - ${i.name} (${i.bundle}) — ${currency(i.basePrice)}`));
    lines.push("");
    lines.push(`Subtotal: ${currency(breakdown.subtotal)}`);
    if (breakdown.discount)      lines.push(`Pack Discount: -${currency(breakdown.discount)}`);
    if (breakdown.complexityFee) lines.push(`Complexity Fee: +${currency(breakdown.complexityFee)}`);
    lines.push(`Adjusted: ${currency(breakdown.adjusted)}`);
    lines.push(`Tax (13%): ${currency(breakdown.tax)}`);
    lines.push(`Total: ${currency(breakdown.total)}`);
    lines.push(`Tier: ${breakdown.tier}`);
    lines.push(`Estimated Timeline: ${breakdown.etaWeeks} weeks`);
    lines.push("");
    lines.push("Next Steps: Book a discovery call.");

    const blob = new Blob([lines.join("\n")], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${id}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
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

  return (
    <div className="min-h-screen bg-neutral-950 text-white px-6 py-10 pt-28 md:pt-25">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-semibold">Custom Alignment Quote Builder</h1>
        <p className="text-neutral-400">
          Select the services you want, then generate a quote and book a call.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {/* Services list */}
          <div className="lg:col-span-2 space-y-6">
            {(["brand", "web", "growth"] as BundleTag[]).map(group => (
              <section
                key={group}
                className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-4"
              >
                <h2 className="text-lg font-semibold capitalize">
                  {group === "brand"
                    ? "Brand Systems"
                    : group === "web"
                    ? "Web Infrastructure"
                    : "Growth Architecture"}
                </h2>
                <div className="mt-3 grid gap-3 md:grid-cols-2">
                  {CATALOG.filter(i => i.bundle === group).map(item => (
                    <label
                      key={item.id}
                      className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3 transition-colors ${
                        selected[item.id]
                          ? "border-purple-400/60 bg-purple-400/5"
                          : "border-neutral-800 hover:border-neutral-700"
                      }`}
                    >
                      <input
                        type="checkbox"
                        className="mt-1"
                        checked={!!selected[item.id]}
                        onChange={() => toggle(item.id)}
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{item.name}</span>
                          <span className="text-sm text-neutral-300">
                            {currency(item.basePrice)}
                          </span>
                        </div>
                        <div className="text-sm text-neutral-400">{item.desc}</div>
                        {item.addon && (
                          <span className="mt-1 inline-block rounded-full border border-neutral-700 px-2 py-0.5 text-[11px] text-neutral-300">
                            Add-on
                          </span>
                        )}
                      </div>
                    </label>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Summary + form */}
          <aside className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4">
            <h3 className="text-lg font-semibold">Summary</h3>
            {selectedItems.length === 0 ? (
              <p className="mt-2 text-neutral-400">Select at least one service to begin.</p>
            ) : (
              <ul className="mt-2 space-y-2 text-sm text-neutral-200">
                {selectedItems.map(i => (
                  <li
                    key={i.id}
                    className="flex items-center justify-between border-b border-neutral-800 pb-1"
                  >
                    <span>{i.name}</span>
                    <span className="text-neutral-300">{currency(i.basePrice)}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Breakdown */}
            <div className="mt-4 space-y-1 text-sm">
              <div className="flex justify-between text-neutral-300">
                <span>Subtotal</span>
                <span>{currency(breakdown.subtotal)}</span>
              </div>
              {breakdown.discount > 0 && (
                <div className="flex justify-between text-emerald-300">
                  <span>Pack discount</span>
                  <span>-{currency(breakdown.discount)}</span>
                </div>
              )}
              {breakdown.complexityFee > 0 && (
                <div className="flex justify-between text-purple-300">
                  <span>Complexity fee</span>
                  <span>+{currency(breakdown.complexityFee)}</span>
                </div>
              )}
              <div className="flex justify-between text-neutral-300">
                <span>Adjusted</span>
                <span>{currency(breakdown.adjusted)}</span>
              </div>
              <div className="flex justify-between text-neutral-300">
                <span>Tax (13%)</span>
                <span>{currency(breakdown.tax)}</span>
              </div>
              <div className="flex justify-between text-white font-semibold pt-1">
                <span>Total</span>
                <span>{currency(breakdown.total)}</span>
              </div>
              <div className="text-xs text-neutral-400">
                Tier: {breakdown.tier} • ETA: {breakdown.etaWeeks} weeks
              </div>
            </div>

            {/* Lead form */}
            <div className="mt-5 space-y-2">
              <input
                className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-2 text-sm"
                placeholder="Your name"
                value={lead.name}
                onChange={e => setLead({ ...lead, name: e.target.value })}
              />
              <input
                className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-2 text-sm"
                placeholder="Email"
                value={lead.email}
                onChange={e => setLead({ ...lead, email: e.target.value })}
              />
              <input
                className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-2 text-sm"
                placeholder="Company (optional)"
                value={lead.company}
                onChange={e => setLead({ ...lead, company: e.target.value })}
              />
              <input
                className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-2 text-sm"
                placeholder="Website (optional)"
                value={lead.website}
                onChange={e => setLead({ ...lead, website: e.target.value })}
              />
            </div>

            <div className="mt-4 flex flex-col gap-2">
              <button
                className="rounded-xl bg-white px-4 py-2 text-black hover:bg-neutral-200 disabled:opacity-50"
                onClick={generateQuote}
                disabled={selectedItems.length === 0}
              >
                Generate Quote (PDF)
              </button>
              <a
                className={`rounded-xl border border-neutral-700 px-4 py-2 text-center text-neutral-200 hover:border-neutral-500 ${
                  !quoteId ? "pointer-events-none opacity-50" : ""
                }`}
                href={calendlyUrl}
                target="_blank"
                rel="noreferrer"
              >
                Book on Calendly
              </a>
              <button
                className="rounded-xl border border-neutral-800 px-4 py-2 text-neutral-300 hover:border-neutral-600"
                onClick={allClear}
              >
                Clear
              </button>
            </div>

            {quoteId && (
              <div className="mt-3 rounded-lg border border-neutral-800 bg-neutral-950 p-3 text-xs text-neutral-400">
                Quote generated: <span className="text-white">{quoteId}</span>. A mock PDF was
                downloaded. Use the Calendly button to continue.
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}

