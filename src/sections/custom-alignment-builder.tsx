import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import SEO from "../components/SEO";
import SEOText from "../components/SEOText";
import { AssessmentQuestionCard } from "../components/custom-alignment/AssessmentQuestionCard";
import { AIPlaceholder } from "../components/custom-alignment/AIPlaceholder";
import { BlurredRecommendationPreview } from "../components/custom-alignment/BlurredRecommendationPreview";
import {
  ALIGNMENT_ASSESSMENT_QUESTIONS,
  INITIAL_ALIGNMENT_ANSWERS,
  INITIAL_LEAD_CAPTURE,
  INITIAL_OPTIONAL_CONTEXT,
  bundlesFromServiceIds,
  type AssetAnswer,
  type AlignmentAssessmentAnswers,
  type AlignmentLeadCapture,
  type AlignmentOptionalContext,
  type PainPointAnswer,
} from "../lib/custom-alignment/assessment";
import { generateAlignmentRecommendation } from "../lib/custom-alignment/recommendation-engine";
import type { AlignmentServiceId } from "../lib/custom-alignment/services";

type BuilderStep = "intro" | "assessment" | "optional" | "preview" | "result";

function progressFor(step: BuilderStep, index: number, totalQuestions: number): number {
  if (step === "intro") return 5;
  if (step === "assessment") {
    const base = ((index + 1) / totalQuestions) * 62;
    return Math.min(68, Math.max(14, base));
  }
  if (step === "optional") return 78;
  if (step === "preview") return 90;
  return 100;
}

function isEmail(email: string): boolean {
  return /.+@.+\..+/.test(email.trim());
}

export default function CustomAlignmentBuilder() {
  const navigate = useNavigate();

  const [step, setStep] = useState<BuilderStep>("intro");
  const [questionIndex, setQuestionIndex] = useState(0);

  const [answers, setAnswers] = useState<AlignmentAssessmentAnswers>(INITIAL_ALIGNMENT_ANSWERS);
  const [optionalContext, setOptionalContext] = useState<AlignmentOptionalContext>(INITIAL_OPTIONAL_CONTEXT);
  const [lead, setLead] = useState<AlignmentLeadCapture>(INITIAL_LEAD_CAPTURE);

  const [leadError, setLeadError] = useState<string | null>(null);
  const [quoteServiceIds, setQuoteServiceIds] = useState<AlignmentServiceId[]>([]);

  const question = ALIGNMENT_ASSESSMENT_QUESTIONS[questionIndex];

  const recommendation = useMemo(() => generateAlignmentRecommendation(answers), [answers]);

  const progress = progressFor(step, questionIndex, ALIGNMENT_ASSESSMENT_QUESTIONS.length);

  const currentQuestionValue =
    question.id === "businessModel"
      ? answers.businessModel
      : question.id === "stage"
        ? answers.stage
        : question.id === "assets"
          ? answers.assets
          : question.id === "painPoints"
            ? answers.painPoints
            : question.id === "priority"
              ? answers.priority
              : question.id === "urgency"
                ? answers.urgency
                : answers.firstOutcome;

  const singleAnswered =
    question.selection === "single" ? Boolean(currentQuestionValue && String(currentQuestionValue).length > 0) : true;

  useEffect(() => {
    if (step !== "result") return;

    setQuoteServiceIds((current) => {
      if (current.length > 0) return current;
      return recommendation.neededNow.map((service) => service.id);
    });
  }, [step, recommendation]);

  function onSelectSingle(value: string) {
    switch (question.id) {
      case "businessModel":
        setAnswers((prev) => ({ ...prev, businessModel: value as AlignmentAssessmentAnswers["businessModel"] }));
        return;
      case "stage":
        setAnswers((prev) => ({ ...prev, stage: value as AlignmentAssessmentAnswers["stage"] }));
        return;
      case "priority":
        setAnswers((prev) => ({ ...prev, priority: value as AlignmentAssessmentAnswers["priority"] }));
        return;
      case "urgency":
        setAnswers((prev) => ({ ...prev, urgency: value as AlignmentAssessmentAnswers["urgency"] }));
        return;
      case "firstOutcome":
        setAnswers((prev) => ({ ...prev, firstOutcome: value as AlignmentAssessmentAnswers["firstOutcome"] }));
        return;
      default:
        return;
    }
  }

  function onToggleMultiple(value: string) {
    if (question.id === "assets") {
      setAnswers((prev) => {
        const normalized = value as AssetAnswer;
        const exists = prev.assets.includes(normalized);
        return {
          ...prev,
          assets: exists ? prev.assets.filter((entry) => entry !== normalized) : [...prev.assets, normalized],
        };
      });
      return;
    }

    if (question.id === "painPoints") {
      setAnswers((prev) => {
        const normalized = value as PainPointAnswer;
        const exists = prev.painPoints.includes(normalized);
        return {
          ...prev,
          painPoints: exists
            ? prev.painPoints.filter((entry) => entry !== normalized)
            : [...prev.painPoints, normalized],
        };
      });
    }
  }

  function moveNextQuestion() {
    if (!singleAnswered) return;

    const isLast = questionIndex === ALIGNMENT_ASSESSMENT_QUESTIONS.length - 1;
    if (isLast) {
      setStep("optional");
      return;
    }

    setQuestionIndex((prev) => prev + 1);
  }

  function movePrevQuestion() {
    if (questionIndex === 0) {
      setStep("intro");
      return;
    }

    setQuestionIndex((prev) => prev - 1);
  }

  function unlockResults() {
    if (!lead.name.trim() || !isEmail(lead.email) || !lead.company.trim() || !lead.consent) {
      setLeadError("Name, valid email, company/brand name, and contact consent are required to unlock your path.");
      return;
    }

    setLeadError(null);
    setStep("result");
  }

  function toggleQuoteService(serviceId: AlignmentServiceId) {
    setQuoteServiceIds((current) =>
      current.includes(serviceId) ? current.filter((id) => id !== serviceId) : [...current, serviceId]
    );
  }

  function goToQuote() {
    const selectedIds = quoteServiceIds.length > 0 ? quoteServiceIds : recommendation.neededNow.map((service) => service.id);

    navigate("/services/get-quote", {
      state: {
        bundles: bundlesFromServiceIds(selectedIds),
        serviceIds: selectedIds,
        lead: {
          name: lead.name,
          email: lead.email,
          company: lead.company,
          website: lead.website || optionalContext.websiteUrl,
        },
        source: "custom_alignment_builder",
      },
    });
  }

  const deferredReasonById = useMemo(() => {
    const map = new Map<string, string>();
    recommendation.deferredReasons.forEach((entry) => map.set(entry.serviceId, entry.reason));
    return map;
  }, [recommendation.deferredReasons]);

  const glassCardClass =
    "relative overflow-hidden rounded-2xl border border-white/15 p-5 sm:p-6 " +
    "shadow-[0_20px_80px_rgba(0,0,0,0.35)]";

  return (
    <section className="relative min-h-screen overflow-hidden font-[Inter] text-white">
      <SEO
        title="Custom Alignment Builder | The Ikigai Project"
        description="Answer a short guided assessment to unlock a selective, structured service path based on your current stage, gaps, and goals."
        path="/services/custom-alignment/builder"
      />
      <SEOText page="services" />

      <div className="pointer-events-none absolute inset-0 -z-20">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-purple-700/5 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(70%_45%_at_50%_-10%,rgba(255,255,255,0.05),transparent)]" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-5 pb-20 pt-28 sm:px-6 md:px-10">
        <div className="mb-6">
          <div className="h-2 w-full overflow-hidden rounded-full border border-white/15 bg-white/[0.04]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[rgba(0,51,255,0.95)] to-[rgba(108,0,255,0.95)] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {step === "intro" && (
          <section
            className={glassCardClass}
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.04) 100%)",
            }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(80% 60% at 20% -10%, rgba(0,51,255,0.16), transparent 60%), radial-gradient(80% 60% at 120% -10%, rgba(108,0,255,0.16), transparent 60%)",
              }}
            />

            <div className="relative text-center">
              <p className="font-[Space_Grotesk] text-[11px] uppercase tracking-[0.25em] text-white/60">Guided Flow</p>
              <h1 className="mt-3 font-[Space_Grotesk] text-4xl uppercase tracking-widest sm:text-5xl">
                Custom Alignment Builder
              </h1>
              <p className="mx-auto mt-4 max-w-3xl text-white/75 text-[15px] leading-8 sm:text-lg">
                Answer a few questions and we&apos;ll recommend the services that make the most sense for your business
                right now, in the right order.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <button
                  type="button"
                  className="rounded-xl px-5 py-2.5 text-sm font-medium text-white transition-all focus:outline-none focus:ring-2 focus:ring-white/20
                             bg-gradient-to-r from-[rgba(0,51,255,0.95)] to-[rgba(108,0,255,0.95)] hover:from-[rgba(0,51,255,1)] hover:to-[rgba(108,0,255,1)]"
                  onClick={() => setStep("assessment")}
                >
                  Start Alignment
                </button>

                <button
                  type="button"
                  className="rounded-xl border border-white/20 px-5 py-2.5 text-sm text-white/90 transition hover:border-white/40"
                  onClick={() => navigate("/services/custom-alignment")}
                >
                  Back
                </button>
              </div>
            </div>
          </section>
        )}

        {step === "assessment" && (
          <>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={question.id}
                initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <AssessmentQuestionCard
                  question={question}
                  value={currentQuestionValue as string | null | string[]}
                  onSelectSingle={onSelectSingle}
                  onToggleMultiple={onToggleMultiple}
                />
              </motion.div>
            </AnimatePresence>

            <div className="mt-5 flex items-center justify-between">
              <button
                type="button"
                className="rounded-xl border border-white/20 px-4 py-2 text-sm text-white/85 transition hover:border-white/40"
                onClick={movePrevQuestion}
              >
                Back
              </button>

              <div className="text-xs text-white/60">
                Question {questionIndex + 1} of {ALIGNMENT_ASSESSMENT_QUESTIONS.length}
              </div>

              <button
                type="button"
                className={[
                  "rounded-xl px-4 py-2 text-sm font-medium text-white transition-all focus:outline-none focus:ring-2 focus:ring-white/20",
                  singleAnswered
                    ? "bg-gradient-to-r from-[rgba(0,51,255,0.95)] to-[rgba(108,0,255,0.95)] hover:from-[rgba(0,51,255,1)] hover:to-[rgba(108,0,255,1)]"
                    : "cursor-not-allowed bg-white/15 text-white/45",
                ].join(" ")}
                onClick={moveNextQuestion}
                disabled={!singleAnswered}
              >
                Continue
              </button>
            </div>
          </>
        )}

        {step === "optional" && (
          <div className="grid grid-cols-1 gap-6">
            <section
              className={glassCardClass}
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.04) 100%)",
              }}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(80% 60% at 20% -10%, rgba(0,51,255,0.12), transparent 60%), radial-gradient(80% 60% at 120% -10%, rgba(108,0,255,0.12), transparent 60%)",
                }}
              />

              <div className="relative">
                <h2 className="font-[Space_Grotesk] text-2xl uppercase tracking-widest sm:text-3xl">
                  Optional context for a more personalized recommendation
                </h2>
                <p className="mt-2 text-sm text-white/70 sm:text-[15px]">
                  This section is optional. It adds richer business context that future AI-enhanced personalization can
                  use for deeper insight.
                </p>

                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <input
                    className="rounded-xl border border-white/15 bg-white/[0.05] px-3 py-2 text-sm text-white placeholder-white/45 focus:border-white/35 focus:outline-none"
                    placeholder="Website URL"
                    value={optionalContext.websiteUrl}
                    onChange={(event) =>
                      setOptionalContext((prev) => ({ ...prev, websiteUrl: event.target.value }))
                    }
                  />
                  <input
                    className="rounded-xl border border-white/15 bg-white/[0.05] px-3 py-2 text-sm text-white placeholder-white/45 focus:border-white/35 focus:outline-none"
                    placeholder="Instagram / social handle"
                    value={optionalContext.socialHandle}
                    onChange={(event) =>
                      setOptionalContext((prev) => ({ ...prev, socialHandle: event.target.value }))
                    }
                  />
                  <textarea
                    className="min-h-[110px] rounded-xl border border-white/15 bg-white/[0.05] px-3 py-2 text-sm text-white placeholder-white/45 focus:border-white/35 focus:outline-none sm:col-span-2"
                    placeholder="Business / project description"
                    value={optionalContext.businessDescription}
                    onChange={(event) =>
                      setOptionalContext((prev) => ({ ...prev, businessDescription: event.target.value }))
                    }
                  />
                  <textarea
                    className="min-h-[110px] rounded-xl border border-white/15 bg-white/[0.05] px-3 py-2 text-sm text-white placeholder-white/45 focus:border-white/35 focus:outline-none"
                    placeholder="Biggest challenge right now"
                    value={optionalContext.biggestChallenge}
                    onChange={(event) =>
                      setOptionalContext((prev) => ({ ...prev, biggestChallenge: event.target.value }))
                    }
                  />
                  <textarea
                    className="min-h-[110px] rounded-xl border border-white/15 bg-white/[0.05] px-3 py-2 text-sm text-white placeholder-white/45 focus:border-white/35 focus:outline-none"
                    placeholder="What have you already tried?"
                    value={optionalContext.triedSoFar}
                    onChange={(event) =>
                      setOptionalContext((prev) => ({ ...prev, triedSoFar: event.target.value }))
                    }
                  />
                  <textarea
                    className="min-h-[90px] rounded-xl border border-white/15 bg-white/[0.05] px-3 py-2 text-sm text-white placeholder-white/45 focus:border-white/35 focus:outline-none sm:col-span-2"
                    placeholder="Target audience"
                    value={optionalContext.targetAudience}
                    onChange={(event) =>
                      setOptionalContext((prev) => ({ ...prev, targetAudience: event.target.value }))
                    }
                  />
                </div>
              </div>
            </section>

            <AIPlaceholder />

            <div className="flex items-center justify-between">
              <button
                type="button"
                className="rounded-xl border border-white/20 px-4 py-2 text-sm text-white/85 transition hover:border-white/40"
                onClick={() => setStep("assessment")}
              >
                Back
              </button>

              <button
                type="button"
                className="rounded-xl px-4 py-2 text-sm font-medium text-white transition-all focus:outline-none focus:ring-2 focus:ring-white/20
                           bg-gradient-to-r from-[rgba(0,51,255,0.95)] to-[rgba(108,0,255,0.95)] hover:from-[rgba(0,51,255,1)] hover:to-[rgba(108,0,255,1)]"
                onClick={() => setStep("preview")}
              >
                Continue to Preview
              </button>
            </div>
          </div>
        )}

        {step === "preview" && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <BlurredRecommendationPreview result={recommendation} />

            <section
              className={glassCardClass}
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.04) 100%)",
              }}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(80% 60% at 20% -10%, rgba(0,51,255,0.10), transparent 60%), radial-gradient(80% 60% at 120% -10%, rgba(108,0,255,0.10), transparent 60%)",
                }}
              />

              <div className="relative">
                <p className="font-[Space_Grotesk] text-[11px] uppercase tracking-[0.24em] text-white/60">Lead Gateway</p>
                <h3 className="mt-2 font-[Space_Grotesk] text-2xl uppercase tracking-widest text-white">
                  Unlock My Alignment Path
                </h3>
                <p className="mt-2 text-sm text-white/70">
                  Complete lead details to reveal your full recommendation, sequence, defer notes, and quote-ready stack.
                </p>

                <div className="mt-5 grid grid-cols-1 gap-3">
                  <input
                    className="rounded-xl border border-white/15 bg-white/[0.05] px-3 py-2 text-sm text-white placeholder-white/45 focus:border-white/35 focus:outline-none"
                    placeholder="Name"
                    value={lead.name}
                    onChange={(event) => {
                      setLeadError(null);
                      setLead((prev) => ({ ...prev, name: event.target.value }));
                    }}
                  />
                  <input
                    className="rounded-xl border border-white/15 bg-white/[0.05] px-3 py-2 text-sm text-white placeholder-white/45 focus:border-white/35 focus:outline-none"
                    placeholder="Email"
                    value={lead.email}
                    onChange={(event) => {
                      setLeadError(null);
                      setLead((prev) => ({ ...prev, email: event.target.value }));
                    }}
                  />
                  <input
                    className="rounded-xl border border-white/15 bg-white/[0.05] px-3 py-2 text-sm text-white placeholder-white/45 focus:border-white/35 focus:outline-none"
                    placeholder="Company / Brand Name"
                    value={lead.company}
                    onChange={(event) => {
                      setLeadError(null);
                      setLead((prev) => ({ ...prev, company: event.target.value }));
                    }}
                  />
                  <input
                    className="rounded-xl border border-white/15 bg-white/[0.05] px-3 py-2 text-sm text-white placeholder-white/45 focus:border-white/35 focus:outline-none"
                    placeholder="Website (optional)"
                    value={lead.website}
                    onChange={(event) =>
                      setLead((prev) => ({ ...prev, website: event.target.value }))
                    }
                  />
                </div>

                <label className="mt-4 flex items-start gap-2 text-xs text-white/70">
                  <input
                    type="checkbox"
                    className="mt-0.5 h-4 w-4 accent-white"
                    checked={lead.consent}
                    onChange={(event) => {
                      setLeadError(null);
                      setLead((prev) => ({ ...prev, consent: event.target.checked }));
                    }}
                  />
                  <span>I agree to be contacted regarding this alignment recommendation.</span>
                </label>

                {leadError && <p className="mt-3 text-xs text-red-300">{leadError}</p>}

                <div className="mt-5 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    className="rounded-xl border border-white/20 px-4 py-2 text-sm text-white/85 transition hover:border-white/40"
                    onClick={() => setStep("optional")}
                  >
                    Back
                  </button>

                  <button
                    type="button"
                    className="rounded-xl px-4 py-2 text-sm font-medium text-white transition-all focus:outline-none focus:ring-2 focus:ring-white/20
                               bg-gradient-to-r from-[rgba(0,51,255,0.95)] to-[rgba(108,0,255,0.95)] hover:from-[rgba(0,51,255,1)] hover:to-[rgba(108,0,255,1)]"
                    onClick={unlockResults}
                  >
                    Unlock My Alignment Path
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {step === "result" && (
          <div className="space-y-6">
            <section
              className={glassCardClass}
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.04) 100%)",
              }}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(80% 60% at 20% -10%, rgba(0,51,255,0.14), transparent 60%), radial-gradient(80% 60% at 120% -10%, rgba(108,0,255,0.14), transparent 60%)",
                }}
              />

              <div className="relative">
                <p className="font-[Space_Grotesk] text-[11px] uppercase tracking-[0.24em] text-white/60">A. Recommended Starting Path</p>
                <h2 className="mt-2 font-[Space_Grotesk] text-3xl uppercase tracking-widest sm:text-4xl">
                  Your best starting point
                </h2>
                <p className="mt-3 text-white/75 text-[15px] leading-7">{recommendation.summary}</p>

                <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {recommendation.neededNow.map((service) => (
                    <article
                      key={service.id}
                      className="rounded-xl border border-white/15 bg-white/[0.05] p-4"
                    >
                      <p className="text-[11px] uppercase tracking-[0.2em] text-white/55">{service.category}</p>
                      <h3 className="mt-2 font-medium text-white">{service.name}</h3>
                      <p className="mt-1 text-sm text-white/70">{service.shortDescription}</p>
                      <p className="mt-2 text-sm font-medium text-white/90">${service.price}</p>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <article
                className={glassCardClass}
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.04) 100%)",
                }}
              >
                <div className="relative">
                  <p className="font-[Space_Grotesk] text-[11px] uppercase tracking-[0.24em] text-white/60">B. Why This Was Chosen</p>
                  <ul className="mt-4 space-y-2 text-sm text-white/80">
                    {recommendation.whyChosen.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white/60" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>

              <article
                className={glassCardClass}
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.04) 100%)",
                }}
              >
                <div className="relative">
                  <p className="font-[Space_Grotesk] text-[11px] uppercase tracking-[0.24em] text-white/60">D. Tips / Notes</p>
                  <ul className="mt-4 space-y-2 text-sm text-white/80">
                    {recommendation.practicalTips.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white/60" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </section>

            <section className="grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <article
                className={glassCardClass}
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.04) 100%)",
                }}
              >
                <div className="relative">
                  <p className="font-[Space_Grotesk] text-[11px] uppercase tracking-[0.24em] text-white/60">C. What to Defer for Later</p>

                  <div className="mt-4 space-y-3">
                    {recommendation.helpfulLater.map((service) => (
                      <div key={service.id} className="rounded-xl border border-white/12 bg-white/[0.04] p-3">
                        <div className="flex items-center justify-between gap-3">
                          <p className="font-medium text-white">{service.name}</p>
                          <span className="text-xs text-white/55">Later layer</span>
                        </div>
                        <p className="mt-1 text-sm text-white/70">
                          {deferredReasonById.get(service.id) ||
                            "Deferred to keep your immediate path focused and credible."}
                        </p>
                      </div>
                    ))}

                    {recommendation.notNeededYet.length > 0 && (
                      <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
                        <p className="text-[11px] uppercase tracking-[0.2em] text-white/55">Not needed yet</p>
                        <ul className="mt-2 space-y-1 text-sm text-white/65">
                          {recommendation.notNeededYet.slice(0, 5).map((service) => (
                            <li key={service.id}>{service.name}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </article>

              <article
                className={glassCardClass}
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.04) 100%)",
                }}
              >
                <div className="relative">
                  <p className="font-[Space_Grotesk] text-[11px] uppercase tracking-[0.24em] text-white/60">E. Recommended Sequence</p>
                  <ol className="mt-4 space-y-2 text-sm text-white/85">
                    {recommendation.sequence.map((service, index) => (
                      <li key={service.id} className="flex items-start gap-3">
                        <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/25 text-xs text-white/85">
                          {index + 1}
                        </span>
                        <div>
                          <p>{service.name}</p>
                          <p className="text-xs text-white/60">{service.shortDescription}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </article>
            </section>

            <section
              className={glassCardClass}
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.04) 100%)",
              }}
            >
              <div className="relative">
                <p className="font-[Space_Grotesk] text-[11px] uppercase tracking-[0.24em] text-white/60">F. Quote Generation</p>
                <h3 className="mt-2 font-[Space_Grotesk] text-2xl uppercase tracking-widest sm:text-3xl">
                  Send recommended stack to quote builder
                </h3>
                <p className="mt-2 text-sm text-white/70">
                  Services selected below will prefill the existing quote builder logic, pricing rules, PDF generation,
                  and submission flow.
                </p>

                <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {[...recommendation.neededNow, ...recommendation.helpfulLater].map((service) => {
                    const checked = quoteServiceIds.includes(service.id);

                    return (
                      <label
                        key={service.id}
                        className={[
                          "flex items-start gap-3 rounded-xl border p-3",
                          checked ? "border-white/30 bg-white/[0.08]" : "border-white/12 bg-white/[0.04]",
                        ].join(" ")}
                      >
                        <input
                          type="checkbox"
                          className="mt-1 h-4 w-4 accent-white"
                          checked={checked}
                          onChange={() => toggleQuoteService(service.id)}
                        />
                        <div>
                          <p className="text-sm font-medium text-white">{service.name}</p>
                          <p className="text-xs text-white/65">${service.price}</p>
                        </div>
                      </label>
                    );
                  })}
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <button
                    type="button"
                    className="rounded-xl px-5 py-2.5 text-sm font-medium text-white transition-all focus:outline-none focus:ring-2 focus:ring-white/20
                               bg-gradient-to-r from-[rgba(0,51,255,0.95)] to-[rgba(108,0,255,0.95)] hover:from-[rgba(0,51,255,1)] hover:to-[rgba(108,0,255,1)]"
                    onClick={goToQuote}
                    disabled={quoteServiceIds.length === 0}
                  >
                    Generate Quote
                  </button>

                  <a
                    href="https://calendly.com/theikigaiproject-ca/30min"
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl border border-white/20 px-5 py-2.5 text-center text-sm text-white/90 transition hover:border-white/40"
                  >
                    Book Intro Call
                  </a>

                  <button
                    type="button"
                    className="rounded-xl border border-white/20 px-5 py-2.5 text-sm text-white/85 transition hover:border-white/40"
                    onClick={() => {
                      setQuoteServiceIds([]);
                      setStep("assessment");
                      setQuestionIndex(0);
                    }}
                  >
                    Back / Edit Answers
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}
      </div>
    </section>
  );
}
