import type {
  AlignmentAssessmentAnswers,
  AssetAnswer,
  BusinessModelAnswer,
  PainPointAnswer,
  PriorityAnswer,
} from "./assessment";
import {
  ALIGNMENT_SEQUENCE_ORDER,
  ALIGNMENT_SERVICES,
  SERVICE_BY_ID,
  type AlignmentServiceDefinition,
  type AlignmentServiceId,
} from "./services";

type ScoreMap = Record<AlignmentServiceId, number>;
type ReasonMap = Record<AlignmentServiceId, string[]>;

export interface ServiceReason {
  serviceId: AlignmentServiceId;
  reason: string;
}

export interface AlignmentRecommendationResult {
  neededNow: AlignmentServiceDefinition[];
  helpfulLater: AlignmentServiceDefinition[];
  notNeededYet: AlignmentServiceDefinition[];
  sequence: AlignmentServiceDefinition[];
  startingFocus: string;
  summary: string;
  whyChosen: string[];
  practicalTips: string[];
  deferredReasons: ServiceReason[];
}

const SERVICE_IDS = ALIGNMENT_SERVICES.map((service) => service.id);

const IDENTITY_ASSET_MAP: Partial<Record<AssetAnswer, AlignmentServiceId>> = {
  logo_identity: "logo",
  voice_messaging: "voice",
  website: "site1",
  multi_page_structure: "site5",
  booking_flow: "crm",
  tracking_pixels: "adssetup",
  email_sms_flow: "email",
  domain_setup: "domain_setup",
};

function createNumericMap(initialValue: number): ScoreMap {
  return SERVICE_IDS.reduce((acc, id) => {
    acc[id] = initialValue;
    return acc;
  }, {} as ScoreMap);
}

function createReasonMap(): ReasonMap {
  return SERVICE_IDS.reduce((acc, id) => {
    acc[id] = [];
    return acc;
  }, {} as ReasonMap);
}

function hasAsset(answers: AlignmentAssessmentAnswers, asset: AssetAnswer): boolean {
  return answers.assets.includes(asset);
}

function hasPain(answers: AlignmentAssessmentAnswers, pain: PainPointAnswer): boolean {
  return answers.painPoints.includes(pain);
}

function isGrowthPriority(priority: PriorityAnswer | null): boolean {
  return priority === "launch_growth";
}

function isBookingFocusedModel(model: BusinessModelAnswer | null): boolean {
  return model === "service_business" || model === "local_service" || model === "agency_studio";
}

function isVisualModel(model: BusinessModelAnswer | null): boolean {
  return model === "ecommerce" || model === "saas_product" || model === "personal_brand";
}

function toServiceDefinitions(ids: AlignmentServiceId[]): AlignmentServiceDefinition[] {
  return ids.map((id) => SERVICE_BY_ID[id]);
}

function unique<T>(items: T[]): T[] {
  return Array.from(new Set(items));
}

function sortBySequence(ids: AlignmentServiceId[]): AlignmentServiceId[] {
  const order = new Map(ALIGNMENT_SEQUENCE_ORDER.map((id, index) => [id, index]));
  return [...ids].sort((a, b) => (order.get(a) ?? 999) - (order.get(b) ?? 999));
}

function sortByScore(ids: AlignmentServiceId[], score: ScoreMap): AlignmentServiceId[] {
  return [...ids].sort((a, b) => score[b] - score[a]);
}

function pushReason(map: ReasonMap, serviceId: AlignmentServiceId, reason: string) {
  if (!map[serviceId].includes(reason)) {
    map[serviceId].push(reason);
  }
}

function addScore(score: ScoreMap, reasons: ReasonMap, serviceId: AlignmentServiceId, points: number, reason: string) {
  score[serviceId] += points;
  pushReason(reasons, serviceId, reason);
}

function subtractScore(score: ScoreMap, deferReasons: ReasonMap, serviceId: AlignmentServiceId, points: number, reason: string) {
  score[serviceId] -= points;
  pushReason(deferReasons, serviceId, reason);
}

function hasServiceOrEquivalentAsset(
  answers: AlignmentAssessmentAnswers,
  selectedNow: Set<AlignmentServiceId>,
  serviceId: AlignmentServiceId
): boolean {
  if (selectedNow.has(serviceId)) return true;

  return answers.assets.some((asset) => IDENTITY_ASSET_MAP[asset] === serviceId);
}

function prerequisitesSatisfied(
  answers: AlignmentAssessmentAnswers,
  selectedNow: Set<AlignmentServiceId>,
  serviceId: AlignmentServiceId
): boolean {
  const service = SERVICE_BY_ID[serviceId];
  const dependencyReady = service.dependsOn.every((dependency) =>
    hasServiceOrEquivalentAsset(answers, selectedNow, dependency)
  );
  if (!dependencyReady) return false;

  if (serviceId === "site5" || serviceId === "crm" || serviceId === "seo" || serviceId === "three" || serviceId === "domain_setup") {
    return hasServiceOrEquivalentAsset(answers, selectedNow, "site1");
  }

  if (serviceId === "copy") {
    return hasServiceOrEquivalentAsset(answers, selectedNow, "voice");
  }

  if (serviceId === "ugc" || serviceId === "retarget") {
    return hasServiceOrEquivalentAsset(answers, selectedNow, "adssetup");
  }

  if (serviceId === "email") {
    return (
      hasServiceOrEquivalentAsset(answers, selectedNow, "crm") ||
      hasServiceOrEquivalentAsset(answers, selectedNow, "site1")
    );
  }

  return true;
}

function categoryLabelForSummary(ids: AlignmentServiceId[]): string {
  const categories = ids.map((id) => SERVICE_BY_ID[id].category);
  const categoryCount = categories.reduce((acc, category) => {
    acc[category] = (acc[category] ?? 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const ordered = Object.entries(categoryCount).sort((a, b) => b[1] - a[1]);
  return ordered.length > 0 ? ordered[0][0] : "Foundation";
}

function generatePracticalTips(answers: AlignmentAssessmentAnswers, neededNow: AlignmentServiceId[]): string[] {
  const tips: string[] = [];

  if (neededNow.includes("voice") || neededNow.includes("copy")) {
    tips.push("Lock one clear offer statement before final copy writing starts.");
  }

  if (neededNow.includes("site1") || neededNow.includes("site5")) {
    tips.push("Use one primary CTA per page section to keep conversion intent clear.");
  }

  if (neededNow.includes("crm")) {
    tips.push("Map response ownership before launch so no lead sits unassigned.");
  }

  if (neededNow.includes("adssetup")) {
    tips.push("Define your conversion events before launching ad spend to avoid noisy data.");
  }

  if (neededNow.includes("email")) {
    tips.push("Keep the first nurture sequence short and practical: value, proof, action.");
  }

  if (answers.urgency === "this_month") {
    tips.push("Prioritize execution depth over breadth this month to avoid fragmented delivery.");
  }

  if (answers.stage === "idea" || answers.stage === "early") {
    tips.push("Avoid overbuilding too early. Validate one focused path before adding complexity.");
  }

  if (tips.length < 3) {
    tips.push("Sequence work in layers: clarity, infrastructure, then acceleration.");
  }

  return unique(tips).slice(0, 5);
}

function generateWhyChosen(answers: AlignmentAssessmentAnswers, neededNow: AlignmentServiceId[]): string[] {
  const reasons: string[] = [];

  if (answers.stage === "idea" || answers.stage === "early") {
    reasons.push("Your current stage benefits most from focused foundational moves before expansion layers.");
  }

  if (hasPain(answers, "unclear_positioning") || hasPain(answers, "inconsistent_brand")) {
    reasons.push("Brand and messaging clarity were prioritized to remove ambiguity before scaling channels.");
  }

  if (hasPain(answers, "no_website") || !hasAsset(answers, "website")) {
    reasons.push("A reliable web foundation was prioritized because your current digital destination is limited or missing.");
  }

  if (hasPain(answers, "messy_lead_handoff") || hasPain(answers, "weak_follow_up")) {
    reasons.push("Lead continuity services were included to reduce leakage between inquiry and action.");
  }

  if (isGrowthPriority(answers.priority) || hasPain(answers, "no_tracking")) {
    reasons.push("Growth recommendations were constrained to tracking-first layers so spend decisions stay measurable.");
  }

  if (reasons.length === 0 && neededNow.length > 0) {
    reasons.push("Selections were ranked by immediate business impact and prerequisite readiness.");
  }

  return reasons.slice(0, 4);
}

export function generateAlignmentRecommendation(
  answers: AlignmentAssessmentAnswers
): AlignmentRecommendationResult {
  const score = createNumericMap(0);
  const positiveReasons = createReasonMap();
  const deferReasons = createReasonMap();

  const lacksLogo = !hasAsset(answers, "logo_identity");
  const lacksVoice = !hasAsset(answers, "voice_messaging");
  const hasWebsite = hasAsset(answers, "website");
  const lacksWebsite = !hasWebsite || hasPain(answers, "no_website");
  const hasMultiPage = hasAsset(answers, "multi_page_structure");
  const hasBookingFlow = hasAsset(answers, "booking_flow");
  const hasTracking = hasAsset(answers, "tracking_pixels");
  const hasEmailFlow = hasAsset(answers, "email_sms_flow");
  const hasDomainSetup = hasAsset(answers, "domain_setup");

  const isEarlyStage = answers.stage === "idea" || answers.stage === "early";
  const isScaling = answers.stage === "scaling";

  const wantsGrowth =
    isGrowthPriority(answers.priority) ||
    answers.firstOutcome === "more_qualified_leads" ||
    hasPain(answers, "no_tracking");

  const foundationReadyForGrowth =
    (hasWebsite || score.site1 > 55) && (!lacksVoice || score.voice > 55);

  if (lacksLogo) {
    addScore(score, positiveReasons, "logo", 85, "No stable identity system is in place yet.");
  }
  if (hasPain(answers, "inconsistent_brand")) {
    addScore(score, positiveReasons, "logo", 28, "Brand visuals are inconsistent and need consolidation.");
  }

  if (lacksVoice) {
    addScore(score, positiveReasons, "voice", 88, "Offer and voice clarity should be stabilized first.");
  }
  if (hasPain(answers, "unclear_positioning")) {
    addScore(score, positiveReasons, "voice", 42, "Positioning clarity is currently a bottleneck.");
  }
  if (answers.priority === "clarity" || answers.firstOutcome === "clear_foundation") {
    addScore(score, positiveReasons, "voice", 24, "Current priority is strategic clarity before expansion.");
  }

  if (lacksWebsite) {
    addScore(score, positiveReasons, "site1", 95, "A focused web foundation is required now.");
  }
  if (answers.priority === "credible_presence") {
    addScore(score, positiveReasons, "site1", 25, "A stronger online first impression is a top priority.");
  }

  if ((hasWebsite && !hasMultiPage) || hasPain(answers, "site_not_converting")) {
    addScore(score, positiveReasons, "site5", 45, "Current web structure needs deeper page architecture.");
  }
  if (isScaling) {
    addScore(score, positiveReasons, "site5", 15, "Scaling stage supports expanded page segmentation.");
  }
  if (isEarlyStage) {
    subtractScore(score, deferReasons, "site5", 24, "Multi-page expansion is better after core offer validation.");
  }

  if ((hasWebsite || score.site1 > 45) && (hasPain(answers, "slow_site") || answers.firstOutcome === "better_site_performance")) {
    addScore(score, positiveReasons, "seo", 45, "Technical polish and speed are directly affecting trust.");
  }
  if (!hasWebsite && score.site1 < 45) {
    subtractScore(score, deferReasons, "seo", 30, "Speed and SEO pass is more effective after site foundation exists.");
  }

  if (hasPain(answers, "site_not_converting")) {
    addScore(score, positiveReasons, "copy", 28, "Conversion copy is currently underperforming.");
  }
  if ((score.voice > 40 || hasAsset(answers, "voice_messaging")) && (score.site1 > 35 || hasWebsite)) {
    addScore(score, positiveReasons, "copy", 40, "Landing copy can now reinforce the conversion path.");
  }
  if (lacksVoice && !hasAsset(answers, "voice_messaging")) {
    subtractScore(score, deferReasons, "copy", 20, "Landing copy should follow messaging clarity work.");
  }

  if (isBookingFocusedModel(answers.businessModel) || answers.priority === "book_more_calls") {
    addScore(score, positiveReasons, "crm", 45, "Lead routing and booking operations are high leverage now.");
  }
  if (hasPain(answers, "messy_lead_handoff")) {
    addScore(score, positiveReasons, "crm", 35, "Current lead handoff friction requires operational cleanup.");
  }
  if (!hasWebsite && score.site1 < 40) {
    subtractScore(score, deferReasons, "crm", 20, "CRM routing should launch with a stable form destination.");
  }

  if (!hasDomainSetup && (score.site1 > 35 || !hasWebsite)) {
    addScore(score, positiveReasons, "domain_setup", 34, "A clean launch path typically needs domain setup.");
  }
  if (hasDomainSetup) {
    subtractScore(score, deferReasons, "domain_setup", 30, "Domain is already configured, so this can stay deferred.");
  }

  if (wantsGrowth) {
    addScore(score, positiveReasons, "adssetup", 40, "Growth objective requires tracking-first ad infrastructure.");
  }
  if (hasPain(answers, "no_tracking")) {
    addScore(score, positiveReasons, "adssetup", 45, "Tracking gaps are blocking measurable growth decisions.");
  }
  if (hasTracking) {
    subtractScore(score, deferReasons, "adssetup", 15, "Tracking basics already exist, so this is lower urgency.");
  }

  if (answers.stage === "active" || isScaling) {
    addScore(score, positiveReasons, "adssetup", 15, "Current business stage can support growth instrumentation.");
  }
  if (isEarlyStage && !hasWebsite) {
    subtractScore(score, deferReasons, "adssetup", 30, "Growth setup is deferred until messaging and web foundation are stable.");
  }

  if (score.adssetup > 55) {
    addScore(score, positiveReasons, "retarget", 25, "Retargeting becomes useful after tracking foundations are in place.");
    addScore(score, positiveReasons, "ugc", 22, "Creative assets can compound once growth setup is ready.");
  }
  if (hasPain(answers, "weak_follow_up")) {
    addScore(score, positiveReasons, "retarget", 12, "Follow-up gaps can be reduced with warm audience systems.");
  }
  if (isEarlyStage) {
    subtractScore(score, deferReasons, "retarget", 24, "Retargeting is usually deferred until data volume is healthier.");
    subtractScore(score, deferReasons, "ugc", 22, "UGC creative should follow core offer and tracking readiness.");
  }

  if (answers.priority === "improve_follow_up" || answers.firstOutcome === "better_retention") {
    addScore(score, positiveReasons, "email", 35, "Automation is directly aligned with follow-up goals.");
  }
  if (hasPain(answers, "weak_follow_up") || hasPain(answers, "messy_lead_handoff")) {
    addScore(score, positiveReasons, "email", 34, "Nurture automation can reduce drop-off after inquiry.");
  }
  if (hasEmailFlow) {
    subtractScore(score, deferReasons, "email", 15, "Email/SMS automation is already present.");
  }

  if (answers.priority === "premium_experience" && isVisualModel(answers.businessModel)) {
    addScore(score, positiveReasons, "three", 35, "Interactive visual presentation supports your premium positioning objective.");
  }
  if (!hasWebsite && score.site1 < 50) {
    subtractScore(score, deferReasons, "three", 34, "3D enhancement should follow core website and messaging foundation.");
  }
  if (isEarlyStage) {
    subtractScore(score, deferReasons, "three", 18, "Premium 3D layer is deferred until foundational clarity is stable.");
  }

  const candidateByScore = sortByScore(SERVICE_IDS, score);

  const neededNow: AlignmentServiceId[] = [];
  for (const serviceId of candidateByScore) {
    if (score[serviceId] >= 55 && neededNow.length < 5) {
      neededNow.push(serviceId);
    }
  }

  if (neededNow.length < 3) {
    for (const serviceId of candidateByScore) {
      if (neededNow.includes(serviceId)) continue;
      if (score[serviceId] >= 40 && neededNow.length < 3) {
        neededNow.push(serviceId);
      }
    }
  }

  if (!neededNow.some((id) => id === "logo" || id === "voice" || id === "site1")) {
    const foundationFallback = ["voice", "site1", "logo"] as AlignmentServiceId[];
    const firstFoundation = foundationFallback.find((id) => score[id] > 25);
    if (firstFoundation) neededNow.push(firstFoundation);
  }

  const selectedNow = new Set<AlignmentServiceId>(neededNow);
  const readinessDeferred: ServiceReason[] = [];

  for (const serviceId of [...neededNow]) {
    const service = SERVICE_BY_ID[serviceId];
    if (!service.addOnOnly) continue;

    if (!prerequisitesSatisfied(answers, selectedNow, serviceId)) {
      selectedNow.delete(serviceId);
      readinessDeferred.push({
        serviceId,
        reason: "Deferred because prerequisite foundation layers should be completed first.",
      });
    }
  }

  const refinedNeededNow = sortBySequence(Array.from(selectedNow)).slice(0, 5);

  const helpfulLater: AlignmentServiceId[] = [];
  for (const serviceId of candidateByScore) {
    if (refinedNeededNow.includes(serviceId)) continue;
    if (score[serviceId] >= 28) {
      helpfulLater.push(serviceId);
    }
  }

  const notNeededYet = SERVICE_IDS.filter(
    (serviceId) => !refinedNeededNow.includes(serviceId) && !helpfulLater.includes(serviceId)
  );

  const deferredReasons: ServiceReason[] = [];

  for (const serviceId of [...helpfulLater, ...notNeededYet]) {
    if (deferReasons[serviceId].length > 0) {
      deferredReasons.push({ serviceId, reason: deferReasons[serviceId][0] });
    }
  }

  for (const reason of readinessDeferred) {
    deferredReasons.push(reason);
  }

  const sequence = sortBySequence(refinedNeededNow);
  const primaryFocus = categoryLabelForSummary(refinedNeededNow);

  const summary =
    refinedNeededNow.length > 0
      ? `Your current best move is a focused ${primaryFocus.toLowerCase()} path, then expand into supporting layers once those foundations are active.`
      : "No strong service priority was detected yet. Start with a focused foundation pass before expanding scope.";

  return {
    neededNow: toServiceDefinitions(refinedNeededNow),
    helpfulLater: toServiceDefinitions(sortBySequence(helpfulLater).slice(0, 6)),
    notNeededYet: toServiceDefinitions(sortBySequence(notNeededYet)),
    sequence: toServiceDefinitions(sequence),
    startingFocus: primaryFocus,
    summary,
    whyChosen: generateWhyChosen(answers, refinedNeededNow),
    practicalTips: generatePracticalTips(answers, refinedNeededNow),
    deferredReasons: unique(
      deferredReasons
        .filter((item) => item.reason)
        .map((item) => `${item.serviceId}|${item.reason}`)
    ).map((entry) => {
      const [serviceId, ...reasonParts] = entry.split("|");
      return { serviceId: serviceId as AlignmentServiceId, reason: reasonParts.join("|") };
    }),
  };
}
