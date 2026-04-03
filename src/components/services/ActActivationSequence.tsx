import type { ActProcessStep } from "../../content/actService";

interface ActActivationSequenceProps {
  steps: ActProcessStep[];
}

export default function ActActivationSequence({
  steps,
}: ActActivationSequenceProps) {
  return (
    <ol className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
      {steps.map((step) => (
        <li
          key={step.id}
          className="rounded-2xl border border-white/15 bg-white/[0.03] p-5 sm:p-6"
        >
          <div className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/25 text-sm font-semibold text-white/90">
            {step.id}
          </div>

          <h3 className="mt-4 font-[Space_Grotesk] text-2xl sm:text-3xl font-semibold uppercase tracking-[0.08em] text-white">
            {step.title}
          </h3>

          <p className="mt-3 text-white/78 text-sm sm:text-[15px] leading-7">
            {step.detail}
          </p>
        </li>
      ))}
    </ol>
  );
}
