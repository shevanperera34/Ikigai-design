import type { AssessmentQuestion } from "../../lib/custom-alignment/assessment";

interface AssessmentQuestionCardProps {
  question: AssessmentQuestion;
  value: string | null | string[];
  onSelectSingle: (value: string) => void;
  onToggleMultiple: (value: string) => void;
}

export function AssessmentQuestionCard({
  question,
  value,
  onSelectSingle,
  onToggleMultiple,
}: AssessmentQuestionCardProps) {
  const selectedValues = Array.isArray(value) ? value : value ? [value] : [];

  return (
    <section
      className="relative overflow-hidden rounded-2xl border border-white/15 p-5 sm:p-6"
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
        <h2 className="font-[Space_Grotesk] text-2xl sm:text-3xl uppercase tracking-widest text-white">{question.title}</h2>
        <p className="mt-2 text-sm text-white/70 sm:text-[15px]">{question.subtitle}</p>

        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {question.options.map((option) => {
            const selected = selectedValues.includes(option.value);

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  if (question.selection === "single") {
                    onSelectSingle(option.value);
                    return;
                  }

                  onToggleMultiple(option.value);
                }}
                className={[
                  "group text-left rounded-xl border p-4 transition-all duration-200",
                  selected
                    ? "border-white/35 bg-white/14"
                    : "border-white/15 bg-white/[0.04] hover:border-white/30 hover:bg-white/[0.08]",
                ].join(" ")}
                aria-pressed={selected}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-white">{option.label}</p>
                    <p className="mt-1 text-sm leading-6 text-white/70">{option.description}</p>
                  </div>
                  <span
                    className={[
                      "mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full border text-[11px]",
                      selected ? "border-white/80 text-white" : "border-white/25 text-white/45",
                    ].join(" ")}
                    aria-hidden
                  >
                    {selected ? "✓" : ""}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
