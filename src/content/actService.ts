export interface ActProcessStep {
  id: number;
  title: string;
  detail: string;
}

export interface ActPackage {
  name: string;
  price: string;
  bestFor: string;
  includes: string[];
}

export const ACT_SERVICE_CARD = {
  title: "A.C.T.",
  coreTag: "Core Solution",
  headline: "ACTIVATE CONSISTENT TRACTION.",
  paragraph:
    "A.C.T. (Activate Consistent Traction) is a productized marketing execution service for local businesses. We translate what your business already is into consistent digital presence through content, social management, and optional paid support.",
  bullets: [
    "Execution-first support: no heavy strategy phase required",
    "Consistency over virality: show up every week, accurately",
    "Built on reflection: we activate what already exists",
  ],
  visualLabel: "A.C.T. Visual Space",
  buttonLabel: "Activate",
};

export const ACT_SERVICE_PAGE = {
  name: "A.C.T.",
  longName: "Activate Consistent Traction",
  signatureLine: "We don't build your brand. We activate what's already there.",
  philosophy: "Reflection",
  summary:
    "A.C.T. is The Ikigai Project's marketing execution service for customer-facing local businesses that need consistent, accurate digital presence without adding internal marketing overhead.",
  valueProposition:
    "Consistent, accurate digital presence built from what your business already is, maintained without the owner having to think about it.",
  idealClient: [
    "3-20 staff local businesses with no dedicated marketing person",
    "Owner-led teams with inconsistent posting and outdated profiles",
    "Service businesses that need reliable visibility across Instagram, Facebook, and Google",
  ],
  notFor: [
    "Businesses looking for strategy-first repositioning",
    "Teams expecting guaranteed leads or follower outcomes",
    "Large enterprise, multi-location procurement environments",
  ],
};

export const ACT_PROCESS_STEPS: ActProcessStep[] = [
  {
    id: 1,
    title: "Onboard",
    detail:
      "Short intake to understand business personality, tone, audience, and real-world operations before activation.",
  },
  {
    id: 2,
    title: "Capture",
    detail:
      "Collect current photos, videos, offers, and brand assets. Identify missing pieces and set asset deadlines.",
  },
  {
    id: 3,
    title: "Build",
    detail:
      "Create the monthly content calendar, captions, and creative direction. Client reviews and approves before launch.",
  },
  {
    id: 4,
    title: "Activate",
    detail:
      "Publish content on schedule so the business shows up online consistently and accurately.",
  },
  {
    id: 5,
    title: "Maintain",
    detail:
      "Refresh monthly content rhythm, incorporate new assets, and keep presence active without owner bottlenecks.",
  },
  {
    id: 6,
    title: "Report",
    detail:
      "Monthly clarity review: what was published, what performed, and what should adjust next month.",
  },
];

export const ACT_PACKAGES: ActPackage[] = [
  {
    name: "Starter",
    price: "$500-$700 / month",
    bestFor: "Businesses that need a reliable baseline presence.",
    includes: [
      "8 social posts per month",
      "4 short-form video edits/reels",
      "Caption writing and monthly content calendar",
      "1 monthly review call",
    ],
  },
  {
    name: "Growth Management",
    price: "$1,000-$1,400 / month",
    bestFor: "Businesses that want full content support with light community management.",
    includes: [
      "12-16 social posts per month",
      "6-8 short-form videos/reels",
      "Full content direction + hashtag strategy",
      "2 monthly review calls",
    ],
  },
  {
    name: "Growth + Ads",
    price: "$1,800-$2,500 / month",
    bestFor: "Businesses that want content plus active paid campaign support.",
    includes: [
      "Everything in Growth Management",
      "Meta ad account setup + management",
      "1 structured ad campaign unit per month",
      "Monthly ad performance review and optimization",
    ],
  },
];
