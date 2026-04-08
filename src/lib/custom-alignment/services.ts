export type BundleTag = "brand" | "web" | "growth";

export type AlignmentServiceId =
  | "logo"
  | "voice"
  | "copy"
  | "site1"
  | "site5"
  | "crm"
  | "seo"
  | "three"
  | "domain_setup"
  | "adssetup"
  | "ugc"
  | "retarget"
  | "email";

export type ServiceCategory = "Brand Systems" | "Web Infrastructure" | "Growth Architecture";

export interface AlignmentServiceDefinition {
  id: AlignmentServiceId;
  name: string;
  category: ServiceCategory;
  bundle: BundleTag;
  price: number;
  shortDescription: string;
  purpose: string;
  whenNeeded: string[];
  whenNotNeeded: string[];
  dependsOn: AlignmentServiceId[];
  comesAfter: AlignmentServiceId[];
  tags: string[];
  recommendedTriggers: string[];
  deferTriggers: string[];
  addOnOnly?: boolean;
}

export const ALIGNMENT_SERVICES: AlignmentServiceDefinition[] = [
  {
    id: "logo",
    name: "Logo & Identity",
    category: "Brand Systems",
    bundle: "brand",
    price: 200,
    shortDescription: "Primary logo, marks, colors, typography.",
    purpose:
      "Establish the visual identity of the business through foundational logo and brand styling elements.",
    whenNeeded: [
      "The business has no real identity system.",
      "Current branding looks improvised or inconsistent.",
      "A visual starting point is needed before web or growth work.",
    ],
    whenNotNeeded: [
      "Existing brand identity is already coherent and usable.",
      "The real bottleneck is messaging clarity or web performance.",
    ],
    dependsOn: [],
    comesAfter: [],
    tags: ["identity", "foundational", "visual-system"],
    recommendedTriggers: ["no_brand_identity", "inconsistent_brand", "early_stage"],
    deferTriggers: ["brand_already_strong"],
  },
  {
    id: "voice",
    name: "Voice & Messaging Guide",
    category: "Brand Systems",
    bundle: "brand",
    price: 150,
    shortDescription: "Tone, taglines, brand statements.",
    purpose:
      "Clarify how the business should sound, position itself, and communicate value.",
    whenNeeded: [
      "The offer is hard to explain clearly.",
      "The messaging sounds generic or vague.",
      "Website and ad copy need strategic clarity first.",
    ],
    whenNotNeeded: ["Offer and messaging are already sharp and proven."],
    dependsOn: [],
    comesAfter: ["logo"],
    tags: ["messaging", "positioning", "foundational"],
    recommendedTriggers: ["unclear_messaging", "weak_offer", "conversion_issues"],
    deferTriggers: ["messaging_already_proven"],
  },
  {
    id: "copy",
    name: "Landing Copy",
    category: "Brand Systems",
    bundle: "brand",
    price: 300,
    shortDescription: "Hero, offer, proof, CTA copy.",
    purpose:
      "Write conversion-oriented landing page copy for clear structure and action.",
    whenNeeded: [
      "A site or landing page needs persuasive messaging.",
      "The offer exists but page copy is weak or missing.",
    ],
    whenNotNeeded: [
      "Business is too early-stage to define a clear offer.",
      "Core messaging is unresolved.",
    ],
    dependsOn: ["voice"],
    comesAfter: ["voice"],
    tags: ["conversion", "copywriting", "support-layer"],
    recommendedTriggers: ["needs_landing_copy", "site_build_in_scope", "weak_conversion_copy"],
    deferTriggers: ["messaging_unresolved", "no_offer_clarity"],
    addOnOnly: true,
  },
  {
    id: "site1",
    name: "1-Page Website",
    category: "Web Infrastructure",
    bundle: "web",
    price: 499,
    shortDescription: "High-performance single page + form.",
    purpose:
      "Create a fast digital front door with one focused offer path and conversion flow.",
    whenNeeded: [
      "There is no proper website.",
      "A strong starting web presence is needed quickly.",
      "A simple, focused offer page is the right next step.",
    ],
    whenNotNeeded: [
      "Current website already works and bottleneck is elsewhere.",
      "A larger information architecture is needed immediately.",
    ],
    dependsOn: [],
    comesAfter: ["voice", "copy"],
    tags: ["website", "foundation", "conversion"],
    recommendedTriggers: ["no_website", "needs_launch_surface", "early_stage"],
    deferTriggers: ["site_foundation_already_strong"],
  },
  {
    id: "site5",
    name: "3-5 Page Website",
    category: "Web Infrastructure",
    bundle: "web",
    price: 499,
    shortDescription: "Add 3-5 website pages.",
    purpose:
      "Expand web presence into a fuller multi-page information and conversion structure.",
    whenNeeded: [
      "One page is not enough for the model.",
      "Separate pages are needed for services, about, work, and contact.",
      "The base website exists and now needs structure.",
    ],
    whenNotNeeded: [
      "Business is too early and should not overbuild.",
      "One page is enough for current objective.",
    ],
    dependsOn: ["site1"],
    comesAfter: ["site1"],
    tags: ["website", "scale-layer", "information-architecture"],
    recommendedTriggers: ["needs_more_structure", "multi_service_model", "existing_site_needs_expansion"],
    deferTriggers: ["too_early_for_scale", "single_offer_stage"],
    addOnOnly: true,
  },
  {
    id: "crm",
    name: "Booking/CRM Setup",
    category: "Web Infrastructure",
    bundle: "web",
    price: 205,
    shortDescription: "Forms -> CRM -> notifications.",
    purpose:
      "Connect forms, lead routing, and notifications so inquiries are handled reliably.",
    whenNeeded: [
      "Business books calls, leads, appointments, or inquiries.",
      "Lead handling is messy or missed.",
    ],
    whenNotNeeded: [
      "There is no active lead flow yet.",
      "No routing or booking process is needed right now.",
    ],
    dependsOn: ["site1"],
    comesAfter: ["site1", "site5"],
    tags: ["operations", "lead-routing", "conversion"],
    recommendedTriggers: ["needs_booking_flow", "missed_leads", "ops_gap"],
    deferTriggers: ["no_lead_flow_yet"],
    addOnOnly: true,
  },
  {
    id: "seo",
    name: "Speed & SEO Pass",
    category: "Web Infrastructure",
    bundle: "web",
    price: 200,
    shortDescription: "Performance, meta, basic schema.",
    purpose:
      "Improve technical quality, loading speed, and baseline search readiness.",
    whenNeeded: [
      "A site exists or is being built and needs polish.",
      "Performance and metadata impact credibility and discovery.",
    ],
    whenNotNeeded: ["No site exists yet."],
    dependsOn: ["site1"],
    comesAfter: ["site1", "site5"],
    tags: ["optimization", "technical-seo", "web-polish"],
    recommendedTriggers: ["slow_site", "needs_technical_polish", "site_launch_ready"],
    deferTriggers: ["no_site_yet"],
    addOnOnly: true,
  },
  {
    id: "three",
    name: "3D Component Hook",
    category: "Web Infrastructure",
    bundle: "web",
    price: 250,
    shortDescription: "Embed 3D viewer / model.",
    purpose:
      "Add interactive visual presentation when it materially improves the buying experience.",
    whenNeeded: [
      "Product or offer genuinely benefits from immersive visual interaction.",
      "Interactive presentation supports conversion.",
    ],
    whenNotNeeded: [
      "It is purely decorative.",
      "Foundational clarity and core web structure are not solved yet.",
    ],
    dependsOn: ["site1"],
    comesAfter: ["site1", "site5"],
    tags: ["3d", "premium-enhancement", "interactive"],
    recommendedTriggers: ["needs_visual_demo", "premium_experience", "product_visual_first"],
    deferTriggers: ["foundation_not_ready", "decorative_only"],
    addOnOnly: true,
  },
  {
    id: "domain_setup",
    name: "Domain Setup (est.)",
    category: "Web Infrastructure",
    bundle: "web",
    price: 20,
    shortDescription: "Estimated domain setup cost. Final domain pricing may vary.",
    purpose: "Cover domain connection/setup work when launching a new web presence.",
    whenNeeded: ["A new site is being launched and domain setup is required."],
    whenNotNeeded: ["Domain is already configured and healthy."],
    dependsOn: ["site1"],
    comesAfter: ["site1"],
    tags: ["utility", "launch", "web-add-on"],
    recommendedTriggers: ["new_site_launch", "no_domain_setup"],
    deferTriggers: ["domain_already_working"],
    addOnOnly: true,
  },
  {
    id: "adssetup",
    name: "Ad Account + Pixel Setup",
    category: "Growth Architecture",
    bundle: "growth",
    price: 300,
    shortDescription: "Meta/Google accounts, events.",
    purpose:
      "Set up tracking and ad foundation so growth decisions can be measured and optimized.",
    whenNeeded: [
      "Paid growth is planned.",
      "Tracking is missing or broken.",
      "Retargeting and campaign measurement are needed.",
    ],
    whenNotNeeded: [
      "Business is too early and still lacks messaging/site foundation.",
      "No clear offer or destination exists yet.",
    ],
    dependsOn: ["site1", "voice"],
    comesAfter: ["site1", "voice", "copy"],
    tags: ["tracking", "growth-foundation", "ads"],
    recommendedTriggers: ["needs_growth", "no_tracking", "paid_traffic_plan"],
    deferTriggers: ["foundation_not_ready", "offer_unclear"],
  },
  {
    id: "ugc",
    name: "UGC Ad Creative Pack (3)",
    category: "Growth Architecture",
    bundle: "growth",
    price: 399,
    shortDescription: "Three short videos, captions.",
    purpose:
      "Produce short ad-style creative assets for paid and organic growth execution.",
    whenNeeded: [
      "Paid promotion is active or ready.",
      "Creative assets are missing for campaigns.",
    ],
    whenNotNeeded: [
      "Tracking and funnel fundamentals are not in place.",
      "Offer clarity is still unresolved.",
    ],
    dependsOn: ["adssetup", "voice"],
    comesAfter: ["adssetup", "voice"],
    tags: ["creative", "growth", "ads-assets"],
    recommendedTriggers: ["paid_campaign_ready", "needs_creative_assets"],
    deferTriggers: ["no_tracking_foundation", "message_not_ready"],
    addOnOnly: true,
  },
  {
    id: "retarget",
    name: "Retargeting Setup",
    category: "Growth Architecture",
    bundle: "growth",
    price: 275,
    shortDescription: "Audiences + placements.",
    purpose:
      "Build warm audience follow-up flows to recover otherwise lost traffic and interest.",
    whenNeeded: [
      "Traffic already exists.",
      "Warm audience follow-up is currently missing.",
    ],
    whenNotNeeded: ["There is no audience data yet.", "Business is still pre-foundation."],
    dependsOn: ["adssetup"],
    comesAfter: ["adssetup"],
    tags: ["retargeting", "follow-up", "growth-layer"],
    recommendedTriggers: ["existing_traffic", "needs_follow_up_ad_flow"],
    deferTriggers: ["no_data_yet", "ads_not_ready"],
    addOnOnly: true,
  },
  {
    id: "email",
    name: "Email/SMS Welcome Flow",
    category: "Growth Architecture",
    bundle: "growth",
    price: 299,
    shortDescription: "Welcome + abandon cart/booking.",
    purpose:
      "Create automated follow-up sequences so leads and inquiries are nurtured consistently.",
    whenNeeded: [
      "Lead or booking flow exists and needs automation.",
      "Follow-up is inconsistent or manual.",
    ],
    whenNotNeeded: ["No meaningful lead flow exists yet."],
    dependsOn: ["crm"],
    comesAfter: ["crm", "site1"],
    tags: ["automation", "follow-up", "crm"],
    recommendedTriggers: ["needs_nurture", "lead_leak", "booking_followup_gap"],
    deferTriggers: ["no_lead_flow_yet"],
  },
];

export const SERVICE_BY_ID: Record<AlignmentServiceId, AlignmentServiceDefinition> =
  ALIGNMENT_SERVICES.reduce((acc, service) => {
    acc[service.id] = service;
    return acc;
  }, {} as Record<AlignmentServiceId, AlignmentServiceDefinition>);

export const ALIGNMENT_SEQUENCE_ORDER: AlignmentServiceId[] = [
  "logo",
  "voice",
  "copy",
  "site1",
  "site5",
  "crm",
  "seo",
  "domain_setup",
  "adssetup",
  "ugc",
  "retarget",
  "email",
  "three",
];
