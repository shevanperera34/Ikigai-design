import type { BundleTag } from "./services";

export type StageAnswer = "idea" | "early" | "active" | "scaling";
export type BusinessModelAnswer =
  | "service_business"
  | "local_service"
  | "ecommerce"
  | "personal_brand"
  | "agency_studio"
  | "saas_product";

export type AssetAnswer =
  | "logo_identity"
  | "voice_messaging"
  | "website"
  | "multi_page_structure"
  | "booking_flow"
  | "tracking_pixels"
  | "email_sms_flow"
  | "domain_setup";

export type PainPointAnswer =
  | "unclear_positioning"
  | "inconsistent_brand"
  | "no_website"
  | "site_not_converting"
  | "messy_lead_handoff"
  | "no_tracking"
  | "slow_site"
  | "weak_follow_up";

export type PriorityAnswer =
  | "clarity"
  | "credible_presence"
  | "book_more_calls"
  | "launch_growth"
  | "improve_follow_up"
  | "premium_experience";

export type UrgencyAnswer = "this_month" | "this_quarter" | "flexible";

export type OutcomeAnswer =
  | "clear_foundation"
  | "better_site_performance"
  | "more_qualified_leads"
  | "higher_conversion"
  | "better_retention";

export interface AlignmentAssessmentAnswers {
  businessModel: BusinessModelAnswer | null;
  stage: StageAnswer | null;
  assets: AssetAnswer[];
  painPoints: PainPointAnswer[];
  priority: PriorityAnswer | null;
  urgency: UrgencyAnswer | null;
  firstOutcome: OutcomeAnswer | null;
}

export interface AssessmentOption<T extends string> {
  value: T;
  label: string;
  description: string;
}

export interface AssessmentQuestion {
  id: "businessModel" | "stage" | "assets" | "painPoints" | "priority" | "urgency" | "firstOutcome";
  title: string;
  subtitle: string;
  selection: "single" | "multiple";
  options: Array<AssessmentOption<string>>;
}

export const INITIAL_ALIGNMENT_ANSWERS: AlignmentAssessmentAnswers = {
  businessModel: null,
  stage: null,
  assets: [],
  painPoints: [],
  priority: null,
  urgency: null,
  firstOutcome: null,
};

export const ALIGNMENT_ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  {
    id: "businessModel",
    title: "What are you building?",
    subtitle: "This helps us match service depth to how your business actually operates.",
    selection: "single",
    options: [
      {
        value: "service_business",
        label: "Service Business",
        description: "Client work, retainers, and conversion from inquiries.",
      },
      {
        value: "local_service",
        label: "Local Service",
        description: "Bookings and location-aware lead flow matter most.",
      },
      {
        value: "ecommerce",
        label: "Ecommerce",
        description: "Product presentation, conversion paths, and post-visit recovery.",
      },
      {
        value: "personal_brand",
        label: "Personal Brand",
        description: "Credibility, positioning, and offer clarity lead the stack.",
      },
      {
        value: "agency_studio",
        label: "Agency / Studio",
        description: "Authority, case proof, and scalable lead operations.",
      },
      {
        value: "saas_product",
        label: "SaaS / Product",
        description: "Structured web messaging and tracked acquisition systems.",
      },
    ],
  },
  {
    id: "stage",
    title: "Where are you right now?",
    subtitle: "Stage controls what should be built now vs deferred.",
    selection: "single",
    options: [
      {
        value: "idea",
        label: "Pre-launch",
        description: "Offer is still forming and direction needs structure.",
      },
      {
        value: "early",
        label: "Early Traction",
        description: "Some activity exists but systems are fragmented.",
      },
      {
        value: "active",
        label: "Operating",
        description: "Business is live and now needs stronger infrastructure.",
      },
      {
        value: "scaling",
        label: "Scaling",
        description: "Core foundation exists; now optimize and compound.",
      },
    ],
  },
  {
    id: "assets",
    title: "What do you already have in place?",
    subtitle: "Select everything that is currently usable.",
    selection: "multiple",
    options: [
      {
        value: "logo_identity",
        label: "Logo / Identity",
        description: "A coherent visual identity already exists.",
      },
      {
        value: "voice_messaging",
        label: "Messaging Guide",
        description: "Positioning and messaging are clear and documented.",
      },
      {
        value: "website",
        label: "Website",
        description: "A live site is currently in use.",
      },
      {
        value: "multi_page_structure",
        label: "Multi-page Structure",
        description: "Site has separate pages for key user paths.",
      },
      {
        value: "booking_flow",
        label: "Booking / CRM Flow",
        description: "Leads are routed and followed up in a structured system.",
      },
      {
        value: "tracking_pixels",
        label: "Tracking / Pixels",
        description: "Core conversion tracking is already configured.",
      },
      {
        value: "email_sms_flow",
        label: "Email / SMS Automation",
        description: "Welcome or nurture automation is already active.",
      },
      {
        value: "domain_setup",
        label: "Domain Setup",
        description: "Domain and DNS setup are already handled.",
      },
    ],
  },
  {
    id: "painPoints",
    title: "What is currently not working?",
    subtitle: "Choose the friction points that are slowing momentum.",
    selection: "multiple",
    options: [
      {
        value: "unclear_positioning",
        label: "Unclear Positioning",
        description: "People do not quickly understand what you do.",
      },
      {
        value: "inconsistent_brand",
        label: "Inconsistent Brand",
        description: "Visuals and messaging feel disconnected.",
      },
      {
        value: "no_website",
        label: "No Real Website",
        description: "No credible destination exists yet.",
      },
      {
        value: "site_not_converting",
        label: "Low Conversion",
        description: "Traffic visits but does not convert consistently.",
      },
      {
        value: "messy_lead_handoff",
        label: "Messy Lead Handling",
        description: "Inquiries are missed, delayed, or unstructured.",
      },
      {
        value: "no_tracking",
        label: "No Tracking",
        description: "Paid and growth decisions lack measurement.",
      },
      {
        value: "slow_site",
        label: "Slow / Unpolished Site",
        description: "Performance and technical quality hurt trust.",
      },
      {
        value: "weak_follow_up",
        label: "Weak Follow-up",
        description: "Leads drop without consistent nurture.",
      },
    ],
  },
  {
    id: "priority",
    title: "What do you need most right now?",
    subtitle: "This determines the starting focus of your aligned path.",
    selection: "single",
    options: [
      {
        value: "clarity",
        label: "Clarity First",
        description: "Define brand direction and remove guesswork.",
      },
      {
        value: "credible_presence",
        label: "Credible Presence",
        description: "Establish a stronger digital foundation quickly.",
      },
      {
        value: "book_more_calls",
        label: "More Bookings",
        description: "Improve inquiry flow and conversion operations.",
      },
      {
        value: "launch_growth",
        label: "Launch Growth",
        description: "Enable paid growth with clean tracking setup.",
      },
      {
        value: "improve_follow_up",
        label: "Better Follow-up",
        description: "Automate nurture and stop lead leakage.",
      },
      {
        value: "premium_experience",
        label: "Premium Experience",
        description: "Increase perceived quality and interaction depth.",
      },
    ],
  },
  {
    id: "urgency",
    title: "How urgent is this alignment?",
    subtitle: "Urgency helps us tighten or expand your immediate stack.",
    selection: "single",
    options: [
      {
        value: "this_month",
        label: "This Month",
        description: "Need a focused path with immediate execution.",
      },
      {
        value: "this_quarter",
        label: "This Quarter",
        description: "Need a practical roadmap for the next 90 days.",
      },
      {
        value: "flexible",
        label: "Flexible",
        description: "Can optimize for sequencing over speed.",
      },
    ],
  },
  {
    id: "firstOutcome",
    title: "What outcome should happen first?",
    subtitle: "Your first desired win determines what gets prioritized now.",
    selection: "single",
    options: [
      {
        value: "clear_foundation",
        label: "Clear Foundation",
        description: "Stronger positioning and business clarity.",
      },
      {
        value: "better_site_performance",
        label: "Better Site",
        description: "Faster, clearer, and more trustworthy website experience.",
      },
      {
        value: "more_qualified_leads",
        label: "More Qualified Leads",
        description: "Bring in better-fit opportunities consistently.",
      },
      {
        value: "higher_conversion",
        label: "Higher Conversion",
        description: "Improve action rate from existing traffic.",
      },
      {
        value: "better_retention",
        label: "Better Follow-through",
        description: "Keep leads warm with automation and follow-up.",
      },
    ],
  },
];

export interface AlignmentOptionalContext {
  websiteUrl: string;
  socialHandle: string;
  businessDescription: string;
  biggestChallenge: string;
  triedSoFar: string;
  targetAudience: string;
}

export const INITIAL_OPTIONAL_CONTEXT: AlignmentOptionalContext = {
  websiteUrl: "",
  socialHandle: "",
  businessDescription: "",
  biggestChallenge: "",
  triedSoFar: "",
  targetAudience: "",
};

export interface AlignmentLeadCapture {
  name: string;
  email: string;
  company: string;
  website: string;
  consent: boolean;
}

export const INITIAL_LEAD_CAPTURE: AlignmentLeadCapture = {
  name: "",
  email: "",
  company: "",
  website: "",
  consent: false,
};

export function bundlesFromServiceIds(serviceIds: string[]): BundleTag[] {
  const ids = new Set(serviceIds);
  const bundles = new Set<BundleTag>();

  if (ids.has("logo") || ids.has("voice") || ids.has("copy")) bundles.add("brand");
  if (ids.has("site1") || ids.has("site5") || ids.has("crm") || ids.has("seo") || ids.has("three") || ids.has("domain_setup")) {
    bundles.add("web");
  }
  if (ids.has("adssetup") || ids.has("ugc") || ids.has("retarget") || ids.has("email")) bundles.add("growth");

  return Array.from(bundles);
}
