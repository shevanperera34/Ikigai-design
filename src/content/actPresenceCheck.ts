export type PresenceResultKey =
  | "visible_inconsistent"
  | "good_business_weak_signal"
  | "active_but_unclear"
  | "barely_showing_up";

export type PresenceRecommendation =
  | "Starter"
  | "Growth"
  | "Growth + Ads"
  | "Custom Alignment first";

export interface PresenceOption {
  value: string;
  label: string;
  detail: string;
  score: Record<PresenceResultKey, number>;
}

export interface PresenceQuestion {
  id: string;
  title: string;
  helper: string;
  optional?: boolean;
  options: PresenceOption[];
}

export interface PresenceResultContent {
  title: string;
  diagnosis: string;
  fixes: [string, string, string];
}

const ZERO_SCORE: Record<PresenceResultKey, number> = {
  visible_inconsistent: 0,
  good_business_weak_signal: 0,
  active_but_unclear: 0,
  barely_showing_up: 0,
};

export const PRESENCE_QUESTIONS: PresenceQuestion[] = [
  {
    id: "postingFrequency",
    title: "How often do you currently post?",
    helper: "Think about your actual last 30-60 days, not your ideal plan.",
    options: [
      {
        value: "weekly",
        label: "Most weeks",
        detail: "We usually show up at least once per week.",
        score: {
          visible_inconsistent: 1,
          good_business_weak_signal: 0,
          active_but_unclear: 2,
          barely_showing_up: 0,
        },
      },
      {
        value: "monthly",
        label: "A few times per month",
        detail: "We post, but not on a reliable rhythm.",
        score: {
          visible_inconsistent: 2,
          good_business_weak_signal: 1,
          active_but_unclear: 1,
          barely_showing_up: 0,
        },
      },
      {
        value: "sporadic",
        label: "Sporadic",
        detail: "We disappear for stretches, then post in bursts.",
        score: {
          visible_inconsistent: 2,
          good_business_weak_signal: 1,
          active_but_unclear: 0,
          barely_showing_up: 2,
        },
      },
      {
        value: "rare",
        label: "Almost never",
        detail: "Our pages are mostly quiet.",
        score: {
          visible_inconsistent: 0,
          good_business_weak_signal: 1,
          active_but_unclear: 0,
          barely_showing_up: 3,
        },
      },
    ],
  },
  {
    id: "looksActive",
    title: "If a new customer checks your profile today, does it look active?",
    helper: "Use first-impression reality, not internal effort.",
    options: [
      {
        value: "yes",
        label: "Yes, mostly active",
        detail: "Our pages look alive and current.",
        score: {
          visible_inconsistent: 1,
          good_business_weak_signal: 0,
          active_but_unclear: 2,
          barely_showing_up: 0,
        },
      },
      {
        value: "mixed",
        label: "Mixed",
        detail: "Some parts look current, some outdated.",
        score: {
          visible_inconsistent: 2,
          good_business_weak_signal: 1,
          active_but_unclear: 1,
          barely_showing_up: 1,
        },
      },
      {
        value: "dated",
        label: "Not really",
        detail: "It feels outdated compared to our real business.",
        score: {
          visible_inconsistent: 0,
          good_business_weak_signal: 2,
          active_but_unclear: 0,
          barely_showing_up: 2,
        },
      },
    ],
  },
  {
    id: "matchesReality",
    title: "How closely does your online presence match your real-world quality?",
    helper: "This is about accuracy and trust, not design perfection.",
    options: [
      {
        value: "close",
        label: "Very close",
        detail: "What people see online feels true to the in-person experience.",
        score: {
          visible_inconsistent: 0,
          good_business_weak_signal: 0,
          active_but_unclear: 2,
          barely_showing_up: 0,
        },
      },
      {
        value: "partial",
        label: "Partially",
        detail: "Some parts are accurate, but key proof points are missing.",
        score: {
          visible_inconsistent: 2,
          good_business_weak_signal: 2,
          active_but_unclear: 1,
          barely_showing_up: 0,
        },
      },
      {
        value: "gap",
        label: "Big gap",
        detail: "The business is stronger than what shows up online.",
        score: {
          visible_inconsistent: 0,
          good_business_weak_signal: 3,
          active_but_unclear: 1,
          barely_showing_up: 1,
        },
      },
    ],
  },
  {
    id: "contentSystem",
    title: "Do you have a consistent content system in place?",
    helper: "A system means recurring planning, production, and publishing cadence.",
    options: [
      {
        value: "structured",
        label: "Yes, it is structured",
        detail: "We follow a recurring monthly/weekly workflow.",
        score: {
          visible_inconsistent: 0,
          good_business_weak_signal: 0,
          active_but_unclear: 2,
          barely_showing_up: 0,
        },
      },
      {
        value: "light",
        label: "Light system",
        detail: "We have some structure, but it is not dependable.",
        score: {
          visible_inconsistent: 2,
          good_business_weak_signal: 1,
          active_but_unclear: 1,
          barely_showing_up: 1,
        },
      },
      {
        value: "none",
        label: "No clear system",
        detail: "We mostly post reactively when there is time.",
        score: {
          visible_inconsistent: 1,
          good_business_weak_signal: 1,
          active_but_unclear: 0,
          barely_showing_up: 3,
        },
      },
    ],
  },
  {
    id: "biggestIssue",
    title: "What feels like your biggest online presence issue right now?",
    helper: "Choose the one that would make the biggest difference if solved.",
    options: [
      {
        value: "consistency",
        label: "We cannot stay consistent",
        detail: "We know what to share, but cannot keep cadence.",
        score: {
          visible_inconsistent: 4,
          good_business_weak_signal: 0,
          active_but_unclear: 0,
          barely_showing_up: 1,
        },
      },
      {
        value: "quality_signal",
        label: "Our online presence undersells us",
        detail: "The business is solid, but online proof feels weak.",
        score: {
          visible_inconsistent: 1,
          good_business_weak_signal: 4,
          active_but_unclear: 0,
          barely_showing_up: 0,
        },
      },
      {
        value: "message_unclear",
        label: "Our content is active but unclear",
        detail: "People see activity but may not understand our value.",
        score: {
          visible_inconsistent: 0,
          good_business_weak_signal: 0,
          active_but_unclear: 4,
          barely_showing_up: 0,
        },
      },
      {
        value: "visibility_low",
        label: "We are barely showing up",
        detail: "Low cadence and low visibility are the main issue.",
        score: {
          visible_inconsistent: 0,
          good_business_weak_signal: 0,
          active_but_unclear: 0,
          barely_showing_up: 4,
        },
      },
      {
        value: "unsure_path",
        label: "We are unsure what to focus on first",
        detail: "We need clearer sequence before scaling effort.",
        score: {
          visible_inconsistent: 1,
          good_business_weak_signal: 1,
          active_but_unclear: 3,
          barely_showing_up: 0,
        },
      },
    ],
  },
  {
    id: "businessCategory",
    title: "What type of business are you?",
    helper: "This helps personalize language in your result.",
    options: [
      {
        value: "wellness",
        label: "Wellness / Personal Care",
        detail: "Salon, spa, barbershop, med spa, or similar.",
        score: ZERO_SCORE,
      },
      {
        value: "fitness",
        label: "Fitness / Health",
        detail: "Gym, coach, studio, therapist, nutrition, or similar.",
        score: ZERO_SCORE,
      },
      {
        value: "food",
        label: "Food / Beverage",
        detail: "Cafe, restaurant, bakery, food truck, or similar.",
        score: ZERO_SCORE,
      },
      {
        value: "clinic",
        label: "Healthcare Clinic",
        detail: "Dental, chiro, optometry, skincare, massage, or similar.",
        score: ZERO_SCORE,
      },
      {
        value: "retail",
        label: "Boutique Retail",
        detail: "Local shop, specialty store, gifts, apparel, and similar.",
        score: ZERO_SCORE,
      },
      {
        value: "trades",
        label: "Trades / Field Service",
        detail: "Renovation, landscaping, cleaning, and similar services.",
        score: ZERO_SCORE,
      },
      {
        value: "other",
        label: "Other",
        detail: "A different local service category.",
        score: ZERO_SCORE,
      },
    ],
  },
];

export const PRESENCE_RESULTS: Record<PresenceResultKey, PresenceResultContent> = {
  visible_inconsistent: {
    title: "Visible, But Inconsistent",
    diagnosis:
      "Your business is being seen, but the signal is uneven. Prospects get occasional proof, then quiet periods that reduce trust and recall.",
    fixes: [
      "Lock in a repeating 30-day content calendar with clear weekly slots.",
      "Batch production so posting does not depend on daily energy.",
      "Use one consistent proof format each week (before/after, result, testimonial).",
    ],
  },
  good_business_weak_signal: {
    title: "Good Business, Weak Online Signal",
    diagnosis:
      "Your real-world quality is stronger than your online representation. The gap is not about capability, it is about consistent digital proof.",
    fixes: [
      "Refresh profiles so your offer and credibility are clear in seconds.",
      "Prioritize real work samples over generic promotional posts.",
      "Set a monthly asset capture rhythm to avoid stale pages.",
    ],
  },
  active_but_unclear: {
    title: "Active, But Unclear",
    diagnosis:
      "You are active online, but the message is not sharp enough. People see movement without always understanding what makes you different.",
    fixes: [
      "Clarify your core offer and who it is best for.",
      "Align captions and visuals to one consistent positioning angle.",
      "Map content into clear themes: proof, offer clarity, and trust.",
    ],
  },
  barely_showing_up: {
    title: "Low Signal, High Potential",
    diagnosis:
      "Your online presence is too quiet to support discovery and trust. This is less about perfection and more about establishing visible weekly signals.",
    fixes: [
      "Start with a minimum weekly cadence before pursuing complexity.",
      "Update key profile sections so pages look current immediately.",
      "Use simple repeatable content formats to rebuild momentum fast.",
    ],
  },
};

export const ISSUE_PRIORITY_MAP: Record<string, PresenceResultKey> = {
  consistency: "visible_inconsistent",
  quality_signal: "good_business_weak_signal",
  message_unclear: "active_but_unclear",
  visibility_low: "barely_showing_up",
  unsure_path: "active_but_unclear",
};

export function getOption(
  questionId: string,
  value: string | undefined
): PresenceOption | undefined {
  if (!value) return undefined;
  const question = PRESENCE_QUESTIONS.find((q) => q.id === questionId);
  return question?.options.find((option) => option.value === value);
}
