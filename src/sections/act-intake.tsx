import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import SEO from "../components/SEO";

export default function ActIntake() {
  const navigate = useNavigate();

  const [businessName, setBusinessName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [vertical, setVertical] = useState("wellness");
  const [platforms, setPlatforms] = useState<string[]>(["Instagram", "Facebook"]);
  const [assetState, setAssetState] = useState("partial");

  const completion = useMemo(() => {
    let score = 0;
    if (businessName.trim().length > 1) score += 1;
    if (ownerName.trim().length > 1) score += 1;
    if (platforms.length > 0) score += 1;
    if (assetState !== "none") score += 1;
    return Math.round((score / 4) * 100);
  }, [businessName, ownerName, platforms, assetState]);

  const baseInput =
    "mt-2 w-full rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/25";

  const togglePlatform = (name: string) => {
    setPlatforms((prev) =>
      prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]
    );
  };

  return (
    <section className="relative overflow-hidden bg-black font-[Inter] text-white">
      <SEO
        title="A.C.T. Intake | Activate Consistent Traction"
        description="A.C.T. onboarding intake for business profile, platform scope, and content asset readiness."
        path="/services/act/intake"
      />

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-purple-700/5 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-5 sm:px-6 md:px-10 pt-14 sm:pt-16 md:pt-20 pb-20 sm:pb-24 space-y-6 sm:space-y-8">
        <header className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <p className="text-[11px] tracking-[0.22em] text-white/70 font-[Space_Grotesk] uppercase">
            Next Step
          </p>
          <h1 className="mt-3 font-[Space_Grotesk] text-4xl sm:text-5xl font-semibold uppercase tracking-[0.08em] leading-tight">
            Intake Setup
          </h1>
          <p className="mt-4 text-white/80 text-sm sm:text-[15px] leading-7">
            If you just ran the Instant Presence Check, this is the handoff
            step. We collect your essentials for Onboard and Capture so your
            first activation month can start cleanly.
          </p>
        </header>

        <article className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <label className="text-sm text-white/80">
              Business Name
              <input
                className={baseInput}
                placeholder="Your business"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
              />
            </label>

            <label className="text-sm text-white/80">
              Owner / Decision Maker
              <input
                className={baseInput}
                placeholder="Owner name"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
              />
            </label>

            <label className="text-sm text-white/80 sm:col-span-2">
              Vertical
              <select
                className={baseInput}
                value={vertical}
                onChange={(e) => setVertical(e.target.value)}
              >
                <option value="wellness" className="text-black">Wellness / Personal Care</option>
                <option value="fitness" className="text-black">Fitness / Health</option>
                <option value="food" className="text-black">Food / Beverage</option>
                <option value="clinic" className="text-black">Healthcare Clinic</option>
                <option value="retail" className="text-black">Boutique Retail</option>
                <option value="trades" className="text-black">Trades</option>
              </select>
            </label>
          </div>

          <div className="mt-6">
            <p className="text-sm text-white/80">Platforms in scope</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {["Instagram", "Facebook", "Google", "TikTok", "LinkedIn"].map((name) => {
                const selected = platforms.includes(name);
                return (
                  <button
                    type="button"
                    key={name}
                    onClick={() => togglePlatform(name)}
                    className={
                      "rounded-full px-3 py-1.5 text-xs border transition-all " +
                      (selected
                        ? "border-white/40 bg-white/15 text-white"
                        : "border-white/20 bg-white/5 text-white/75 hover:text-white")
                    }
                  >
                    {name}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-6">
            <p className="text-sm text-white/80">Current asset readiness</p>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                { key: "none", label: "No usable assets" },
                { key: "partial", label: "Some photos/video" },
                { key: "strong", label: "Strong asset library" },
              ].map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setAssetState(item.key)}
                  className={
                    "rounded-xl border px-3 py-2 text-sm text-left transition-all " +
                    (assetState === item.key
                      ? "border-white/40 bg-white/15 text-white"
                      : "border-white/20 bg-white/5 text-white/75 hover:text-white")
                  }
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </article>

        <article className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <h2 className="font-[Space_Grotesk] text-2xl sm:text-3xl font-semibold uppercase tracking-[0.08em]">
            Intake Health
          </h2>
          <div className="mt-4 h-2 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[rgba(0,51,255,0.92)] to-[rgba(108,0,255,0.92)]"
              style={{ width: `${completion}%` }}
            />
          </div>
          <p className="mt-3 text-white/78 text-sm sm:text-[15px] leading-7">
            Completion: {completion}%
          </p>

          <ul className="mt-4 space-y-2 text-white/80 text-sm sm:text-[15px] leading-7">
            <li>• Day 3 asset deadline for new photo/video submission</li>
            <li>• Day 5 monthly content calendar approval deadline</li>
            <li>• Revision guardrails: 1 round Starter, 2 rounds Growth tiers</li>
          </ul>

          <div className="mt-7 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => navigate("/services/act/thank-you")}
              className="rounded-xl px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all
                         bg-gradient-to-r from-[rgba(0,51,255,0.92)] to-[rgba(108,0,255,0.92)]
                         hover:from-[rgba(0,51,255,1)] hover:to-[rgba(108,0,255,1)]"
            >
              Submit Intake
            </button>

            <button
              type="button"
              onClick={() => navigate("/contact")}
              className="rounded-xl px-5 py-2.5 text-sm font-medium border border-white/20 bg-white/5 text-white/90
                         transition-all hover:border-white/35 hover:text-white"
            >
              Book Intro Call
            </button>

            <button
              type="button"
              onClick={() => navigate("/services/act")}
              className="rounded-xl px-5 py-2.5 text-sm font-medium border border-white/20 bg-white/5 text-white/90
                         transition-all hover:border-white/35 hover:text-white"
            >
              Back To A.C.T.
            </button>
          </div>
        </article>
      </div>
    </section>
  );
}
