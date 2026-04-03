import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import SEO from "../components/SEO";
import {
  ISSUE_PRIORITY_MAP,
  PRESENCE_QUESTIONS,
  PRESENCE_RESULTS,
  type PresenceRecommendation,
  type PresenceResultKey,
  getOption,
} from "../content/actPresenceCheck";

type Answers = Record<string, string>;

const RESULT_ORDER: PresenceResultKey[] = [
  "visible_inconsistent",
  "good_business_weak_signal",
  "active_but_unclear",
  "barely_showing_up",
];

function evaluateResult(answers: Answers): PresenceResultKey {
  const scores: Record<PresenceResultKey, number> = {
    visible_inconsistent: 0,
    good_business_weak_signal: 0,
    active_but_unclear: 0,
    barely_showing_up: 0,
  };

  for (const question of PRESENCE_QUESTIONS) {
    const option = getOption(question.id, answers[question.id]);
    if (!option) continue;

    for (const key of RESULT_ORDER) {
      scores[key] += option.score[key];
    }
  }

  const issuePreference = ISSUE_PRIORITY_MAP[answers.biggestIssue];

  let winner: PresenceResultKey = RESULT_ORDER[0];
  let winnerScore = -1;

  for (const key of RESULT_ORDER) {
    const score = scores[key];
    if (score > winnerScore) {
      winner = key;
      winnerScore = score;
      continue;
    }

    if (score === winnerScore && issuePreference === key) {
      winner = key;
    }
  }

  if (winnerScore <= 0 && issuePreference) return issuePreference;
  return winner;
}

function getRecommendation(
  result: PresenceResultKey,
  answers: Answers
): { label: PresenceRecommendation; rationale: string } {
  const posting = answers.postingFrequency;
  const looksActive = answers.looksActive;
  const system = answers.contentSystem;
  const issue = answers.biggestIssue;

  if (issue === "unsure_path" || issue === "message_unclear") {
    return {
      label: "Custom Alignment first",
      rationale:
        "Your next gain likely comes from clearer positioning and sequence before scaling execution.",
    };
  }

  if (
    posting === "weekly" &&
    looksActive === "yes" &&
    system === "structured" &&
    result !== "good_business_weak_signal"
  ) {
    return {
      label: "Growth + Ads",
      rationale:
        "You already have baseline activity. Layering paid distribution can convert consistency into stronger demand.",
    };
  }

  if (result === "visible_inconsistent") {
    return {
      label: "Growth",
      rationale:
        "You need a tighter operating rhythm: planning, production, publishing, and monthly optimization.",
    };
  }

  if (result === "good_business_weak_signal") {
    return {
      label: "Starter",
      rationale:
        "The priority is consistent, accurate representation before adding extra complexity.",
    };
  }

  if (result === "barely_showing_up") {
    return {
      label: "Starter",
      rationale:
        "First objective is to rebuild reliable visibility and trust signals week by week.",
    };
  }

  return {
    label: "Growth",
    rationale:
      "A stronger execution cadence is the best immediate move based on your current signal profile.",
  };
}

export default function ActFit() {
  const navigate = useNavigate();

  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [showResult, setShowResult] = useState(false);
  const [email, setEmail] = useState("");
  const [emailSaved, setEmailSaved] = useState(false);

  const totalSteps = PRESENCE_QUESTIONS.length;
  const currentQuestion = PRESENCE_QUESTIONS[stepIndex];
  const selectedValue = answers[currentQuestion.id];

  const progress = showResult
    ? 100
    : Math.round(((stepIndex + 1) / totalSteps) * 100);

  const canContinue = currentQuestion.optional || Boolean(selectedValue);

  const resultKey = useMemo(() => evaluateResult(answers), [answers]);
  const result = PRESENCE_RESULTS[resultKey];
  const recommendation = useMemo(
    () => getRecommendation(resultKey, answers),
    [resultKey, answers]
  );

  const businessCategoryLabel = getOption(
    "businessCategory",
    answers.businessCategory
  )?.label;

  const onSelect = (value: string) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
  };

  const onNext = () => {
    if (!canContinue) return;

    if (stepIndex === totalSteps - 1) {
      setShowResult(true);
      return;
    }

    setStepIndex((prev) => Math.min(prev + 1, totalSteps - 1));
  };

  const onBack = () => {
    if (showResult) {
      setShowResult(false);
      return;
    }
    setStepIndex((prev) => Math.max(prev - 1, 0));
  };

  const onSkipOptional = () => {
    if (!currentQuestion.optional) return;

    if (stepIndex === totalSteps - 1) {
      setShowResult(true);
      return;
    }

    setStepIndex((prev) => Math.min(prev + 1, totalSteps - 1));
  };

  const onSaveEmail = () => {
    const valid = email.includes("@") && email.includes(".");
    if (!valid) return;
    setEmailSaved(true);
  };

  const restart = () => {
    setAnswers({});
    setStepIndex(0);
    setShowResult(false);
    setEmail("");
    setEmailSaved(false);
  };

  return (
    <section className="relative overflow-hidden bg-black font-[Inter] text-white">
      <SEO
        title="Instant Presence Check | A.C.T."
        description="Answer a few quick questions and see what your business may be signaling online right now."
        path="/services/act/fit"
      />

      <style>{`
        @keyframes act-fade-in {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-purple-700/5 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(70%_45%_at_50%_-10%,rgba(255,255,255,0.05),transparent)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-5 sm:px-6 md:px-10 pt-14 sm:pt-16 md:pt-20 pb-20 sm:pb-24 space-y-6 sm:space-y-8">
        <header className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 md:p-10">
          <p className="text-[11px] tracking-[0.22em] text-white/70 font-[Space_Grotesk] uppercase">
            A.C.T. Interactive Tool
          </p>
          <h1 className="mt-3 font-[Space_Grotesk] text-4xl sm:text-5xl md:text-6xl font-semibold uppercase tracking-[0.08em] leading-tight">
            Instant Presence Check
          </h1>
          <p className="mt-4 text-white/80 text-sm sm:text-[15px] leading-7 max-w-3xl">
            Answer a few quick questions and see what your business may be
            signaling online right now.
          </p>
        </header>

        <article className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3 text-xs sm:text-sm text-white/72">
            <span className="font-[Space_Grotesk] uppercase tracking-[0.14em]">
              {showResult
                ? "Assessment Complete"
                : `Question ${stepIndex + 1} of ${totalSteps}`}
            </span>
            <span>{progress}%</span>
          </div>

          <div className="mt-3 h-2 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full transition-all duration-500 bg-gradient-to-r from-[rgba(0,51,255,0.95)] to-[rgba(108,0,255,0.95)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </article>

        {!showResult ? (
          <article
            key={currentQuestion.id}
            className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 md:p-10"
            style={{ animation: "act-fade-in .25s ease both" }}
          >
            <h2 className="font-[Space_Grotesk] text-2xl sm:text-3xl md:text-4xl font-semibold tracking-[0.04em] leading-tight">
              {currentQuestion.title}
            </h2>
            <p className="mt-3 text-white/70 text-sm sm:text-[15px] leading-7">
              {currentQuestion.helper}
            </p>

            <div className="mt-6 grid grid-cols-1 gap-3">
              {currentQuestion.options.map((option) => {
                const active = selectedValue === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => onSelect(option.value)}
                    className={
                      "text-left rounded-2xl border px-4 py-4 transition-all duration-200 " +
                      (active
                        ? "border-white/45 bg-white/14 shadow-[0_0_0_1px_rgba(255,255,255,0.15)]"
                        : "border-white/18 bg-black/30 hover:border-white/30 hover:bg-white/[0.05]")
                    }
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-white text-sm sm:text-base font-medium">
                          {option.label}
                        </p>
                        <p className="mt-1 text-white/70 text-xs sm:text-sm leading-6">
                          {option.detail}
                        </p>
                      </div>
                      {active && (
                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/40 text-white text-xs">
                          ✓
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={onBack}
                disabled={stepIndex === 0}
                className="rounded-xl px-5 py-2.5 text-sm font-medium border border-white/20 bg-white/5 text-white/90
                           transition-all hover:border-white/35 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Back
              </button>

              {currentQuestion.optional && !selectedValue && (
                <button
                  type="button"
                  onClick={onSkipOptional}
                  className="rounded-xl px-5 py-2.5 text-sm font-medium border border-white/20 bg-white/5 text-white/90
                             transition-all hover:border-white/35 hover:text-white"
                >
                  Skip This Step
                </button>
              )}

              <button
                type="button"
                onClick={onNext}
                disabled={!canContinue}
                className="rounded-xl px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all
                           bg-gradient-to-r from-[rgba(0,51,255,0.92)] to-[rgba(108,0,255,0.92)]
                           hover:from-[rgba(0,51,255,1)] hover:to-[rgba(108,0,255,1)]
                           disabled:opacity-45 disabled:cursor-not-allowed"
              >
                {stepIndex === totalSteps - 1
                  ? "See My Presence Result"
                  : "Next"}
              </button>
            </div>
          </article>
        ) : (
          <article
            className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 md:p-10 space-y-6"
            style={{ animation: "act-fade-in .3s ease both" }}
          >
            <div>
              <p className="text-[11px] tracking-[0.22em] text-white/70 font-[Space_Grotesk] uppercase">
                Presence Result
              </p>
              <h2 className="mt-3 font-[Space_Grotesk] text-4xl sm:text-5xl font-semibold uppercase tracking-[0.08em] leading-tight">
                {result.title}
              </h2>
              <p className="mt-4 text-white/82 text-sm sm:text-[15px] leading-7 max-w-3xl">
                {result.diagnosis}
              </p>
              {businessCategoryLabel && (
                <p className="mt-4 inline-flex rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-xs text-white/75">
                  Category context: {businessCategoryLabel}
                </p>
              )}
            </div>

            <div className="rounded-2xl border border-white/15 bg-black/30 p-5 sm:p-6">
              <h3 className="font-[Space_Grotesk] text-xl sm:text-2xl font-semibold uppercase tracking-[0.08em]">
                3 Priority Fixes
              </h3>
              <ul className="mt-4 space-y-2 text-white/82 text-sm sm:text-[15px] leading-7">
                {result.fixes.map((fix) => (
                  <li key={fix}>• {fix}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-white/15 bg-black/30 p-5 sm:p-6">
              <p className="text-[11px] tracking-[0.16em] uppercase text-white/60 font-[Space_Grotesk]">
                Suggested Next Step
              </p>
              <p className="mt-2 text-white text-2xl sm:text-3xl font-semibold">
                {recommendation.label}
              </p>
              <p className="mt-3 text-white/76 text-sm sm:text-[15px] leading-7 max-w-3xl">
                {recommendation.rationale}
              </p>
              <p className="mt-2 text-white/58 text-xs sm:text-sm">
                Guidance based on your answers, not a hard sales filter.
              </p>
            </div>

            <div className="rounded-2xl border border-white/15 bg-black/30 p-5 sm:p-6">
              <p className="text-sm text-white/82">Optional: send this result to your email</p>
              <div className="mt-3 flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailSaved(false);
                  }}
                  placeholder="you@business.com"
                  className="w-full rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/25"
                />
                <button
                  type="button"
                  onClick={onSaveEmail}
                  className="rounded-xl px-4 py-2 text-sm font-medium border border-white/20 bg-white/5 text-white/90 transition-all hover:border-white/35 hover:text-white"
                >
                  Save Result
                </button>
              </div>
              {emailSaved && (
                <p className="mt-2 text-xs text-white/70">
                  Saved locally for now. Your developer can connect this to email automation.
                </p>
              )}
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => navigate("/services/act/intake")}
                className="rounded-xl px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all
                           bg-gradient-to-r from-[rgba(0,51,255,0.92)] to-[rgba(108,0,255,0.92)]
                           hover:from-[rgba(0,51,255,1)] hover:to-[rgba(108,0,255,1)]"
              >
                Continue To Intake
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
                onClick={restart}
                className="rounded-xl px-5 py-2.5 text-sm font-medium border border-white/20 bg-transparent text-white/70
                           transition-all hover:border-white/30 hover:text-white"
              >
                Retake Check
              </button>
            </div>
          </article>
        )}
      </div>
    </section>
  );
}
