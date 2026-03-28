// src/sections/CareSafe.tsx
import React, { useEffect, useRef, useState } from "react";
import SEO from "../components/SEO";
import { GlowCard } from "../components/Glowcard";

const IKIGAI = {
  black: "#0f0e10",
  blue: "#0033FF",
  purple: "#6C00FF",
  white: "#FFFFFF",
};

const CARESAFE_SPLINE_URL =
  "https://prod.spline.design/1mv3v5NQ3ZNP4llI/scene.splinecode";
const CARESAFE_SPLINE_URL_MOBILE =
  "https://prod.spline.design/poj8iKwI6u7YeG-M/scene.splinecode";

// Avoid TS JSX intrinsic drama by using createElement.
function SplineViewer(props: {
  url: string;
  className?: string;
  loading?: string;
  style?: React.CSSProperties;
}) {
  return React.createElement("spline-viewer", { ...props } as any);
}

function TypewriterText(props: { text: string; start: boolean; delayMs?: number }) {
  const { text, start, delayMs = 0 } = props;
  const [typed, setTyped] = useState("");
  const TYPING_STEP_MS = 36; // 50% slower than original 24ms

  useEffect(() => {
    if (!start) return;

    let timeoutId: number | undefined;
    let kickoffId: number | undefined;
    let cancelled = false;
    let index = 0;

    const tick = () => {
      if (cancelled) return;
      index += 1;
      setTyped(text.slice(0, index));
      if (index < text.length) {
        timeoutId = window.setTimeout(tick, TYPING_STEP_MS);
      }
    };

    kickoffId = window.setTimeout(tick, delayMs);

    return () => {
      cancelled = true;
      if (kickoffId) window.clearTimeout(kickoffId);
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [text, start, delayMs]);

  const isAnimating = start && typed.length < text.length;

  return (
    <>
      <span
        className="font-semibold text-white"
        style={
          isAnimating
            ? {
                fontSize: "calc(1em + 1px)",
                textShadow:
                  "0 0 10px rgba(108,0,255,0.85), 0 0 24px rgba(108,0,255,0.55)",
              }
            : { fontSize: "calc(1em + 1px)" }
        }
      >
        {typed}
      </span>
      {isAnimating && (
        <span className="inline-block w-[1px] h-4 align-middle bg-[#c49bff] ml-1 animate-pulse" />
      )}
    </>
  );
}

export default function CareSafe() {
  const splineWrapRef = useRef<HTMLDivElement | null>(null);
  const processRef = useRef<HTMLDivElement | null>(null);
  const pricingTouchStartRef = useRef<{ x: number; y: number } | null>(null);
  const [isSplineLoaded, setIsSplineLoaded] = useState(false);
  const [startTyping, setStartTyping] = useState(false);
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const [activePricingCard, setActivePricingCard] = useState(0);
  const btnPrimary =
    "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium text-white shadow-sm " +
    "transition-all focus:outline-none focus:ring-2 focus:ring-white/20 " +
    "bg-gradient-to-r from-[#1d2d52] to-[#380A65] " +
    "hover:from-[#380A65] hover:to-black " +
    "hover:-translate-y-[1px] active:translate-y-0";
  const btnSecondary =
    "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium " +
    "border border-white/20 bg-white/5 text-white/90 " +
    "transition-all focus:outline-none focus:ring-2 focus:ring-white/20 " +
    "hover:border-white/35 hover:text-white hover:bg-gradient-to-r hover:from-[#380A65] hover:to-black " +
    "hover:-translate-y-[1px] active:translate-y-0";

  // Load Spline viewer script once
  useEffect(() => {
    const id = "spline-viewer-script";
    if (document.getElementById(id)) return;

    const script = document.createElement("script");
    script.id = id;
    script.type = "module";
    script.src =
      "https://unpkg.com/@splinetool/viewer@1.12.61/build/spline-viewer.js";
    document.body.appendChild(script);
  }, []);

  // Mobile-only Spline scene swap (desktop/tablet keep existing scene)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(max-width: 767px)");

    const syncViewport = () => setIsMobileViewport(media.matches);
    syncViewport();

    media.addEventListener("change", syncViewport);
    return () => media.removeEventListener("change", syncViewport);
  }, []);

  const activeSplineUrl = isMobileViewport
    ? CARESAFE_SPLINE_URL_MOBILE
    : CARESAFE_SPLINE_URL;

  useEffect(() => {
    setIsSplineLoaded(false);
  }, [activeSplineUrl]);

  // Listen for load-complete on spline-viewer (retry until custom element exists)
  useEffect(() => {
    const wrap = splineWrapRef.current;
    if (!wrap) return;

    let el: Element | null = null;
    const onLoadComplete = () => setIsSplineLoaded(true);

    const setup = () => {
      el = wrap.querySelector("spline-viewer");
      if (!el) return false;
      el.addEventListener("load-complete", onLoadComplete);
      return true;
    };

    if (!setup()) {
      const retryId = setInterval(() => {
        if (setup()) clearInterval(retryId);
      }, 100);
      return () => clearInterval(retryId);
    }

    return () => {
      if (el) el.removeEventListener("load-complete", onLoadComplete);
    };
  }, []);

  const handlePricingTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const t = e.touches[0];
    pricingTouchStartRef.current = { x: t.clientX, y: t.clientY };
  };

  const handlePricingTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    const start = pricingTouchStartRef.current;
    if (!start) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    pricingTouchStartRef.current = null;

    // Only treat as a swipe when horizontal intent is clear.
    if (Math.abs(dx) < 42 || Math.abs(dx) <= Math.abs(dy)) return;

    setActivePricingCard((prev) => {
      if (dx < 0) return Math.min(prev + 1, 2);
      return Math.max(prev - 1, 0);
    });
  };

  const renderBasicCard = (
    className: string,
    touchAction: React.CSSProperties["touchAction"] = "pan-y"
  ) => (
    <GlowCard customSize glowHex="#1B2D52" touchAction={touchAction} className={className}>
      <article className="relative p-7 sm:p-8 h-full flex flex-col">
        <h3 className="mt-4 text-4xl font-semibold font-[Space_Grotesk] uppercase tracking-[0.12em] text-white">Basic</h3>
        <p className="mt-4 text-white/70 text-sm sm:text-base leading-7">
          Best suited for smaller teams that need consistent{" "}
          <TypewriterText text="foundational support" start={startTyping} delayMs={0} />.
        </p>
        <p className="mt-5 text-white/70 text-sm sm:text-base leading-7">
          An entry-level support plan focused on{" "}
          <TypewriterText text="day-to-day reliability" start={startTyping} delayMs={420} />
          , visibility, and essential technical coverage.
        </p>
        <ul className="mt-6 space-y-3 text-white/80 text-sm sm:text-[15px]">
          <li>
            • <strong className="font-semibold text-white"><TypewriterText text="Remote helpdesk" start={startTyping} delayMs={860} /></strong> during business hours
          </li>
          <li>• Basic endpoint and printer support</li>
          <li>• Asset and account documentation</li>
          <li>• Monthly issue summary</li>
        </ul>
        <div className="mt-auto pt-8">
          <p className="font-medium text-white/90">From $500-$900/mo</p>
          <a
            href="https://calendly.com/theikigaiproject-ca/30min"
            target="_blank"
            rel="noreferrer noopener"
            className={`mt-6 w-fit ${btnSecondary}`}
          >
            Book intro call
          </a>
        </div>
      </article>
    </GlowCard>
  );

  const renderStandardCard = (
    className: string,
    touchAction: React.CSSProperties["touchAction"] = "pan-y"
  ) => (
    <GlowCard customSize glowHex="#380A65" touchAction={touchAction} className={className}>
      <article className="relative p-7 sm:p-8 h-full flex flex-col">
        <span className="absolute top-5 right-5 rounded-full border border-[#6C00FF]/40 bg-[#6C00FF]/20 px-3 py-1 text-[10px] tracking-[0.08em] uppercase font-[Space_Grotesk] text-[#d8c2ff]">
          Recomended
        </span>
        <h3 className="mt-4 text-4xl font-semibold font-[Space_Grotesk] uppercase tracking-[0.12em] text-white">Standard</h3>
        <p className="mt-4 text-white/75 text-sm sm:text-base leading-7">
          A strong fit for growing organizations that need both support and{" "}
          <TypewriterText text="operational control" start={startTyping} delayMs={120} />.
        </p>
        <p className="mt-5 text-white/75 text-sm sm:text-base leading-7">
          Our{" "}
          <TypewriterText text="core support package" start={startTyping} delayMs={560} />
          , balancing responsiveness, oversight, and a stronger technical foundation.
        </p>
        <ul className="mt-6 space-y-3 text-white/85 text-sm sm:text-[15px]">
          <li>• Everything in Basic</li>
          <li>• <strong className="font-semibold text-white"><TypewriterText text="On-site support" start={startTyping} delayMs={980} /></strong> within allowance</li>
          <li>• Patch cadence and endpoint checks</li>
          <li>• Admin ownership and MFA baseline</li>
          <li>• Monthly reporting and risk summary</li>
        </ul>
        <div className="mt-auto pt-8">
          <p className="font-medium text-white/90">From $900-$1,800/mo</p>
          <a
            href="https://calendly.com/theikigaiproject-ca/30min"
            target="_blank"
            rel="noreferrer noopener"
            className={`mt-6 w-fit ${btnPrimary}`}
          >
            Book intro call
          </a>
        </div>
      </article>
    </GlowCard>
  );

  const renderPremiumCard = (
    className: string,
    touchAction: React.CSSProperties["touchAction"] = "pan-y"
  ) => (
    <GlowCard customSize glowHex="#1B2D52" touchAction={touchAction} className={className}>
      <article className="relative p-7 sm:p-8 h-full flex flex-col">
        <h3 className="mt-4 text-4xl font-semibold font-[Space_Grotesk] uppercase tracking-[0.12em] text-white">Premium</h3>
        <p className="mt-4 text-white/70 text-sm sm:text-base leading-7">
          Designed for organizations that require{" "}
          <TypewriterText text="higher-touch support" start={startTyping} delayMs={240} />
          {" "}and stronger oversight.
        </p>
        <p className="mt-5 text-white/70 text-sm sm:text-base leading-7">
          A more comprehensive engagement with greater visibility, faster support handling, and tighter governance.
        </p>
        <ul className="mt-6 space-y-3 text-white/80 text-sm sm:text-[15px]">
          <li>• Everything in Standard</li>
          <li>• <strong className="font-semibold text-white"><TypewriterText text="Priority on-site scheduling" start={startTyping} delayMs={700} /></strong></li>
          <li>• Quarterly access review</li>
          <li>• Backup verification checks</li>
          <li>• <TypewriterText text="Executive-style reporting" start={startTyping} delayMs={1160} /></li>
        </ul>
        <div className="mt-auto pt-8">
          <p className="font-medium text-white/90">From $1,800-$3,500/mo</p>
          <a
            href="https://calendly.com/theikigaiproject-ca/30min"
            target="_blank"
            rel="noreferrer noopener"
            className={`mt-6 w-fit ${btnSecondary}`}
          >
            Book intro call
          </a>
        </div>
      </article>
    </GlowCard>
  );

  // Start card type animations once the pricing section enters view.
  useEffect(() => {
    if (startTyping) return;

    const node = processRef.current;
    if (!node || !("IntersectionObserver" in window)) {
      setStartTyping(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setStartTyping(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [startTyping]);

  // Optional: stop wheel from zooming inside the Spline canvas while allowing page scroll
  useEffect(() => {
    const wrap = splineWrapRef.current;
    if (!wrap) return;

    const stop = (e: Event) => {
      e.stopPropagation();
      (e as any).stopImmediatePropagation?.();
    };

    const onWheel = (e: WheelEvent) => stop(e);

    wrap.addEventListener("wheel", onWheel, { capture: true });
    wrap.addEventListener("gesturestart", stop as EventListener, {
      capture: true,
    });
    wrap.addEventListener("gesturechange", stop as EventListener, {
      capture: true,
    });

    return () => {
      wrap.removeEventListener("wheel", onWheel, true);
      wrap.removeEventListener("gesturestart", stop as EventListener, true);
      wrap.removeEventListener("gesturechange", stop as EventListener, true);
    };
  }, []);

  return (
    <section
      className="relative overflow-hidden font-[Inter] text-white min-h-screen"
      style={{ backgroundColor: IKIGAI.black }}
    >
      <SEO
        title="Project Infra Care Support | The Ikigai Project"
        description="Ongoing infrastructure care, security hardening, monitoring, and automation support for modern businesses."
        path="/caresafe"
      />

      {!isSplineLoaded && (
        <div
          className="fixed inset-0 z-30 flex items-center justify-center"
          style={{ backgroundColor: IKIGAI.black }}
          aria-hidden
        >
          <div className="h-10 w-10 rounded-full border-2 border-white/20 border-t-white/80 animate-spin" />
        </div>
      )}

      <div
        className={`relative z-10 max-w-6xl mx-auto px-3 sm:px-6 md:px-10 pt-32 sm:pt-28 md:pt-32 pb-16 sm:pb-24 md:pb-28 transition-opacity duration-300 ${
          !isSplineLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <div className="ml-auto text-right text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-[Space_Grotesk] font-semibold tracking-tight leading-none text-white/90">
          InfraCare
        </div>

        <div className="flex flex-col gap-8 sm:gap-10">
          <header className="text-left max-w-3xl">
            <h1 className="mt-6 font-[Space_Grotesk] font-semibold tracking-tight text-5xl sm:text-6xl lg:text-7xl leading-[0.95]">
              IT Support That Provides Stability,{" "}
              <span className="bg-gradient-to-r from-[#0033FF] to-[#6C00FF] bg-clip-text text-transparent">
                Then
              </span>{" "}
              Creates Capacity to{" "}
              <span className="bg-gradient-to-r from-[#0033FF] to-[#6C00FF] bg-clip-text text-transparent">
                Improve.
              </span>
            </h1>

            <p className="mt-6 text-white/70 text-base sm:text-lg leading-relaxed max-w-3xl">
              Infra Care Support is designed for organizations that need
              dependable day-to-day technical support, stronger operational
              control, and a clear path toward smarter infrastructure decisions.
            </p>

          </header>

          <div
            ref={splineWrapRef}
            className="relative -mx-3 sm:mx-0 w-[calc(100%+1.5rem)] sm:w-full h-[430px] sm:h-[500px] lg:h-[580px] overflow-hidden rounded-none border-0 outline-none ring-0"
            style={{ touchAction: "pan-y" }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="relative w-full h-full origin-center transform-gpu"
                style={{
                  transform: isMobileViewport
                    ? "translateY(2%) scale(1.35)"
                    : "translateY(-6px) scale(0.96)",
                }}
              >
                <SplineViewer
                  url={activeSplineUrl}
                  className="absolute inset-0 block w-full h-full"
                  style={{ border: "none", outline: "none" }}
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Content under embed */}
        <div id="process" ref={processRef} className="mt-10 sm:mt-10">
          {/* Pricing */}
          <div className="max-w-6xl mx-auto">
            <div className="text-center">
              <div className="inline-flex items-center rounded-full border border-white/15 bg-white/[0.03] px-4 py-2 text-[11px] tracking-[0.24em] text-white/70 font-[Space_Grotesk] uppercase">
                Support Plans
              </div>

              <h2 className="mt-5 text-white font-[Space_Grotesk] tracking-tight text-3xl sm:text-4xl md:text-5xl leading-tight max-w-4xl mx-auto">
                Clear options for different stages of support maturity.
              </h2>

              <p className="mt-5 text-white/65 text-base sm:text-xl leading-relaxed max-w-4xl mx-auto">
                The purpose of this section is to provide pricing context, qualify
                interest, and make the intro call feel like the natural next step.
              </p>
            </div>

            <div
              className="mt-10 lg:hidden relative min-h-[640px]"
              style={{ touchAction: "pan-y" }}
              onTouchStart={handlePricingTouchStart}
              onTouchEnd={handlePricingTouchEnd}
            >
              {[0, 1, 2].map((idx) => (
                <div
                  key={idx}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    activePricingCard === idx
                      ? "opacity-100 pointer-events-auto"
                      : "opacity-0 pointer-events-none"
                  }`}
                >
                  {idx === 0 && renderBasicCard("w-full h-full min-h-[620px]", "pan-y")}
                  {idx === 1 && renderStandardCard("w-full h-full min-h-[640px]", "pan-y")}
                  {idx === 2 && renderPremiumCard("w-full h-full min-h-[620px]", "pan-y")}
                </div>
              ))}

              <div className="absolute -bottom-5 left-0 right-0 flex items-center justify-center gap-2">
                {[0, 1, 2].map((idx) => (
                  <button
                    key={`dot-${idx}`}
                    type="button"
                    onClick={() => setActivePricingCard(idx)}
                    aria-label={`Show pricing card ${idx + 1}`}
                    className={`h-2.5 rounded-full transition-all ${
                      activePricingCard === idx
                        ? "w-8 bg-white/90"
                        : "w-2.5 bg-white/35 hover:bg-white/55"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="mt-10 hidden lg:grid lg:grid-cols-3 gap-6 md:gap-8 items-stretch">
              {renderBasicCard("w-full h-full min-h-[620px]", "pan-y")}
              {renderStandardCard("w-full h-full min-h-[640px]", "pan-y")}
              {renderPremiumCard("w-full h-full min-h-[620px]", "pan-y")}
            </div>

            <p className="text-center text-xs text-white/55 pt-6">
              Administrative/operational systems only. No advice or
              decisioning.
            </p>
          </div>

          <div className="mt-16 max-w-6xl mx-auto px-2 sm:px-6 md:px-10">
            <div className="space-y-12 sm:space-y-14">
              <div className="w-full text-left">
                <h3
                  className="text-3xl sm:text-4xl font-semibold font-[Space_Grotesk] tracking-tight text-white"
                  style={{ textShadow: "0 0 10px rgba(108,0,255,0.55)" }}
                >
                  Remote-first
                </h3>
                <p className="mt-2 font-[Inter] text-[#A6A6A6] text-lg sm:text-xl leading-8">
                  A remote-first support model built to reduce response times,
                  minimize unnecessary delays, and solve day-to-day issues more
                  efficiently. On-site support remains available when physical
                  intervention is actually needed.
                </p>
              </div>

              <div className="w-full ml-auto text-right">
                <h3
                  className="text-3xl sm:text-4xl font-semibold font-[Space_Grotesk] tracking-tight text-white"
                  style={{ textShadow: "0 0 10px rgba(108,0,255,0.55)" }}
                >
                  Documentation-first
                </h3>
                <p className="mt-2 font-[Inter] text-[#A6A6A6] text-lg sm:text-xl leading-8">
                  We document systems, access, vendors, devices, and support
                  logic from the beginning so the environment becomes easier to
                  manage, maintain, and improve over time.
                </p>
              </div>

              <div className="w-full text-left">
                <h3
                  className="text-3xl sm:text-4xl font-semibold font-[Space_Grotesk] tracking-tight text-white"
                  style={{ textShadow: "0 0 10px rgba(108,0,255,0.55)" }}
                >
                  Security-minded
                </h3>
                <p className="mt-2 font-[Inter] text-[#A6A6A6] text-lg sm:text-xl leading-8">
                  Administrative ownership, access control, MFA baselines, and
                  stronger device hygiene are built into the service model to
                  reduce avoidable risk and create a healthier technical
                  foundation.
                </p>
              </div>

              <div className="w-full ml-auto text-right">
                <h3
                  className="text-3xl sm:text-4xl font-semibold font-[Space_Grotesk] tracking-tight text-white"
                  style={{ textShadow: "0 0 10px rgba(108,0,255,0.55)" }}
                >
                  Growth-ready
                </h3>
                <p className="mt-2 font-[Inter] text-[#A6A6A6] text-lg sm:text-xl leading-8">
                  InfraCare supports organizations that need reliable systems now
                  while creating room for stronger infrastructure, better
                  processes, and smarter improvements as the business evolves.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
