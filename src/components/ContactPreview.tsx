// src/components/ContactPreview.tsx
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

type Purpose = "call" | "quote" | "question";
type ProjectType = "Brand" | "Web" | "Growth";

export default function ContactPreview() {
  const navigate = useNavigate();
  const [sent, setSent] = useState(false);

  const [purpose, setPurpose] = useState<Purpose>("quote");
  const [types, setTypes] = useState<Set<ProjectType>>(new Set());
  const [agree, setAgree] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const isNameValid = name.trim().length > 1;
  const isEmailValid = /.+@.+\..+/.test(email);

  const canSubmit = useMemo(() => {
    if (!isNameValid || !isEmailValid || !agree) return false;
    if (purpose === "quote") return types.size > 0 && !!timeline;
    return true;
  }, [purpose, isNameValid, isEmailValid, agree, types, timeline]);

  const calendlyUrl = useMemo(() => {
    const base = "https://calendly.com/theikigaiproject-ca/30min";
    const params = new URLSearchParams({ name, email, purpose });
    return `${base}?${params.toString()}`;
  }, [name, email, purpose]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSent(true);
    setTimeout(() => setSent(false), 2500);
  };

  const inputBase =
    "w-full bg-transparent text-white placeholder-white/60 " +
    "border border-white/15 rounded-lg px-4 py-3 outline-none " +
    "focus:border-white/50 focus:ring-2 focus:ring-white/20 transition";

  const chip = (label: ProjectType) => {
    const active = types.has(label);
    return (
      <button
        type="button"
        onClick={() => {
          const next = new Set(types);
          next.has(label) ? next.delete(label) : next.add(label);
          setTypes(next);
        }}
        className={
          "rounded-full px-3 py-1.5 text-sm transition border " +
          (active
            ? "text-white shadow-sm bg-gradient-to-r from-[rgba(0,51,255,0.9)] to-[rgba(108,0,255,0.9)] border-white/0 hover:from-[rgba(0,51,255,1)] hover:to-[rgba(108,0,255,1)]"
            : "border-white/20 text-white/85 hover:border-white/40")
        }
        aria-pressed={active}
      >
        {label}
      </button>
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-6">
      <header className="text-center">
        <h2 className="text-3xl tracking-widest uppercase">Let’s Build</h2>
        <p className="mt-4 text-slate-300">
          Tell us what you’re building. We’ll help align it.
        </p>
      </header>

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_380px] gap-6">
        {/* Form tile */}
        <form
          onSubmit={onSubmit}
          className="relative rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md
                     shadow-[0_20px_80px_rgba(0,0,0,0.35)] p-6 md:p-8 overflow-hidden"
        >
          {/* subtle brand wash only (no page background) */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-0"
            style={{
              background:
                "radial-gradient(80% 60% at 20% -10%, rgba(0,51,255,0.08), transparent 60%), radial-gradient(80% 60% at 120% -10%, rgba(108,0,255,0.08), transparent 60%)",
            }}
          />

          {/* Purpose segmented control */}
          <div className="mb-6">
            <span className="block text-sm text-white/80 mb-2">
              What do you want to do today?
            </span>
            <div className="flex flex-wrap gap-2">
              {([
                { k: "call", label: "Book a call" },
                { k: "quote", label: "Get a quote" },
                { k: "question", label: "General question" },
              ] as { k: Purpose; label: string }[]).map(({ k, label }) => {
                const active = purpose === k;
                return (
                  <button
                    key={k}
                    type="button"
                    onClick={() => setPurpose(k)}
                    className={
                      "rounded-full px-3 py-1.5 text-sm transition border " +
                      (active
                        ? "text-white shadow-sm bg-gradient-to-r from-[rgba(0,51,255,0.9)] to-[rgba(108,0,255,0.9)] border-white/0 hover:from-[rgba(0,51,255,1)] hover:to-[rgba(108,0,255,1)]"
                        : "border-white/20 text-white/85 hover:border-white/40")
                    }
                    aria-pressed={active}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            <div>
              <label className="mb-1.5 block text-sm text-white/80">Full name</label>
              <input
                className={inputBase + (isNameValid ? "" : " border-red-500/60")}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
                required
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm text-white/80">Email</label>
              <input
                className={inputBase + (isEmailValid ? "" : " border-red-500/60")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                type="email"
                required
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm text-white/80">Company (optional)</label>
              <input
                className={inputBase}
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Acme Co."
              />
            </div>

            {purpose === "quote" && (
              <div>
                <label className="mb-1.5 block text-sm text-white/80">Budget (optional)</label>
                <select
                  className={inputBase}
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                >
                  <option value="" disabled>
                    Select a range
                  </option>
                  <option>$1k – $5k</option>
                  <option>$5k – $15k</option>
                  <option>$15k – $50k</option>
                  <option>$50k+</option>
                </select>
              </div>
            )}

            {purpose === "quote" && (
              <>
                <div>
                  <label className="mb-1.5 block text-sm text-white/80">Project type</label>
                  <div className="flex flex-wrap gap-2">
                    {chip("Brand")}
                    {chip("Web")}
                    {chip("Growth")}
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm text-white/80">Timeline</label>
                  <select
                    className={inputBase}
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value)}
                    required
                  >
                    <option value="" disabled>
                      Select a timeline
                    </option>
                    <option>ASAP (0–2 weeks)</option>
                    <option>Soon (2–4 weeks)</option>
                    <option>Planning (1–2 months)</option>
                    <option>Later (3+ months)</option>
                  </select>
                </div>
              </>
            )}

            {purpose === "question" && (
              <div className="md:col-span-2">
                <label className="mb-1.5 block text-sm text-white/80">Subject</label>
                <input
                  className={inputBase}
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Quick question about…"
                />
              </div>
            )}

            <div className="md:col-span-2">
              <label className="mb-1.5 block text-sm text-white/80">
                {purpose === "question" ? "Your question / details" : "Project details"}
              </label>
              <textarea
                className={inputBase + " min-h-[140px]"}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={
                  purpose === "question"
                    ? "What can we help with? Links and context welcome…"
                    : "What are you building? Timelines, goals, links…"
                }
                rows={6}
                required
              />
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 text-sm">
            <input
              id="agree-home"
              type="checkbox"
              className="h-4 w-4 rounded border-white/30 bg-transparent"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
            />
            <label htmlFor="agree-home" className="text-white/80 select-none">
              I agree to be contacted about my inquiry. We’ll never share your info.
            </label>
          </div>

          <div className="mt-6 md:mt-8 flex flex-wrap items-center gap-3">
            <button
              type="submit"
              disabled={!canSubmit}
              className="rounded-lg px-5 py-3 text-sm font-medium text-white shadow-sm transition-all
                         bg-gradient-to-r from-[rgba(0,51,255,0.9)] to-[rgba(108,0,255,0.9)]
                         hover:from-[rgba(0,51,255,1)] hover:to-[rgba(108,0,255,1)]
                         focus:outline-none focus:ring-2 focus:ring-white/20 disabled:opacity-50"
            >
              Send message
            </button>

            <a
              className={
                "rounded-lg border border-white/20 text-white/90 px-4 py-3 hover:border-white/40 transition " +
                (!(isNameValid && isEmailValid) ? "pointer-events-none opacity-50" : "")
              }
              href={isNameValid && isEmailValid ? calendlyUrl : undefined}
              target="_blank"
              rel="noopener noreferrer"
            >
              Find a time
            </a>

            <button
              type="button"
              onClick={() => navigate("/contact")}
              className="rounded-lg border border-white/20 text-white/90 px-4 py-3 hover:border-white/40 transition"
            >
              Full contact page →
            </button>

            {sent && (
              <span className="text-emerald-300/90 text-sm">
                Sent. We’ll be in touch.
              </span>
            )}

            <span className="ml-auto text-xs text-white/60">
              Prefer email?{" "}
              <a className="underline hover:text-white" href="mailto:hello@example.com">
                hello@example.com
              </a>
            </span>
          </div>
        </form>

        {/* Right rail tile */}
        <aside
          className="relative rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md
                     shadow-[0_20px_80px_rgba(0,0,0,0.35)] p-6 md:p-7 overflow-hidden"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-0"
            style={{
              background:
                "radial-gradient(80% 60% at 20% -10%, rgba(0,51,255,0.08), transparent 60%), radial-gradient(80% 60% at 120% -10%, rgba(108,0,255,0.08), transparent 60%)",
            }}
          />
          <div className="relative">
            <div className="text-white/90 font-medium">No quote yet</div>
            <p className="mt-2 text-white/75">
              Unsure what you need? Start your Custom Alignment to pick services and get an instant quote.
            </p>
            <a
              className="mt-4 inline-flex rounded-lg px-4 py-2 text-sm font-medium
                         text-white shadow-sm transition-all
                         bg-gradient-to-r from-[rgba(0,51,255,0.9)] to-[rgba(108,0,255,0.9)]
                         hover:from-[rgba(0,51,255,1)] hover:to-[rgba(108,0,255,1)]
                         focus:outline-none focus:ring-2 focus:ring-white/20"
              href="/services#custom"
            >
              Start Custom Alignment
            </a>

            <button
              type="button"
              onClick={() => navigate("/contact")}
              className="mt-3 w-full rounded-lg border border-white/20 text-white/90 px-4 py-2 hover:border-white/40 transition"
            >
              Go to Contact →
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}

