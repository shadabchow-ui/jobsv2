import { mockCandidateProfile } from "./data";
import { scoreJob } from "./match-score";
import type {
  CandidateProfile,
  Job,
  JobListing,
  MatchResult,
  ResumeProfile,
} from "./types";

export interface TailoringInput {
  careerProfile?: CandidateProfile;
  matchResult?: MatchResult;
  resume: ResumeProfile;
  targetJob: Job;
  targetJobListing?: JobListing;
}

export interface BulletSuggestion {
  current: string;
  reason: string;
  suggestion: string;
}

export interface SectionSuggestion {
  bullets: BulletSuggestion[];
  heading: string;
}

export interface TailoringOutput {
  keywordGaps: string[];
  revisedHeadline: string;
  sectionSuggestions: SectionSuggestion[];
  skillGaps: string[];
  suggestedSkillsToAdd: string[];
  summary: string;
  warnings: string[];
}

function findWordOverlap(text: string, keywords: string[]): string[] {
  const lower = text.toLowerCase();
  return keywords.filter((k) => lower.includes(k.toLowerCase()));
}

function buildSectionSuggestions(
  resume: ResumeProfile,
  missing: string[],
  jobKeywords: string[]
): SectionSuggestion[] {
  const suggestions: SectionSuggestion[] = [];

  for (const section of resume.sections) {
    const bullets: BulletSuggestion[] = [];
    for (const item of section.items) {
      for (const highlight of item.highlights) {
        const foundInResume = findWordOverlap(highlight, jobKeywords);
        const missingCount = foundInResume.length;
        if (missingCount < 2 && missing.length > 0) {
          const gap = missing[0];
          const kw = jobKeywords.find(
            (k) => !highlight.toLowerCase().includes(k.toLowerCase())
          );
          bullets.push({
            current: highlight,
            suggestion: kw
              ? `${highlight} with a focus on ${kw.toLowerCase()} outcomes`
              : `${highlight} (consider reframing to emphasize ${gap.toLowerCase()})`,
            reason: `Current bullet does not highlight ${kw ?? gap}, which the target role requires`,
          });
        }
      }
    }
    if (bullets.length > 0) {
      suggestions.push({ heading: section.title, bullets });
    }
  }

  return suggestions.slice(0, 4);
}

function buildSummary(
  resume: ResumeProfile,
  targetRole: string,
  matchResult?: MatchResult
): string {
  const score = matchResult?.overall ?? 75;
  const suggestedSummary = `${
    resume.fullName.split(" ")[0]
  } is a ${resume.summary.split(".")[0].toLowerCase()} with specific strengths in ${resume.skills.slice(0, 3).join(", ")}. The resume currently scores ${score}% for the ${targetRole} role.`;
  return suggestedSummary;
}

function buildRevisedHeadline(
  resume: ResumeProfile,
  targetRole: string
): string {
  if (resume.targetRole.toLowerCase() !== targetRole.toLowerCase()) {
    return `${resume.fullName} — ${targetRole}`;
  }
  return resume.summary;
}

function findKeywordGaps(
  resume: ResumeProfile,
  job: Job,
  matchResult?: MatchResult
): string[] {
  const resumeText = [
    resume.summary,
    ...resume.sections.flatMap((s) =>
      s.items.flatMap((i) => [
        i.title,
        i.subtitle ?? "",
        i.description,
        ...i.highlights,
      ])
    ),
    ...resume.skills,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  const jobKeywords = [
    job.title,
    job.description,
    ...(job.skills ?? []),
    ...(matchResult?.missingSkills ?? []),
  ]
    .filter(Boolean)
    .map((s) => s.toLowerCase());

  const unique = [...new Set(jobKeywords)];
  return unique.filter((kw) => kw.length > 3 && !resumeText.includes(kw));
}

function determineWarnings(): string[] {
  return [
    "Experience and education details are derived from your existing resume — no new roles, degrees, or certifications are fabricated",
    "All suggestions are proposals requiring your review before use — nothing is auto-applied",
    "Tailoring recommendations are based on mock data and deterministic rules; AI-assisted generation is not provided",
  ];
}

export function generateTailoringRecommendations(
  input: TailoringInput
): TailoringOutput {
  const { resume, targetJob, targetJobListing, careerProfile, matchResult } =
    input;

  const profile = careerProfile ?? mockCandidateProfile;
  const listing: JobListing = targetJobListing ?? {
    id: targetJob.id,
    title: targetJob.title,
    company: targetJob.company,
    location: targetJob.location,
    remote: targetJob.remoteType.toLowerCase().includes("remote"),
    employmentType: targetJob.employmentType,
    salary: undefined,
    skills: (targetJob.skills ?? []).map((s) => ({ name: s })),
  };

  const computedMatch: MatchResult = matchResult ?? scoreJob(listing, profile);

  const keywordGaps = findKeywordGaps(resume, targetJob, computedMatch);
  const sectionSuggestions = buildSectionSuggestions(
    resume,
    computedMatch.missingSkills,
    [targetJob.title, ...(targetJob.skills ?? [])]
  );

  const existingSkillNames = new Set(
    resume.sections
      .flatMap((s) =>
        s.items.flatMap((i) => [i.title, i.subtitle ?? "", ...i.highlights])
      )
      .map((s) => s.toLowerCase())
  );

  const suggestedSkillsToAdd = computedMatch.missingSkills.filter(
    (s) => !existingSkillNames.has(s.toLowerCase())
  );

  return {
    summary: buildSummary(resume, targetJob.title, computedMatch),
    revisedHeadline: buildRevisedHeadline(resume, targetJob.title),
    sectionSuggestions,
    keywordGaps: keywordGaps.slice(0, 10),
    suggestedSkillsToAdd,
    skillGaps: computedMatch.missingSkills,
    warnings: determineWarnings(),
  };
}

export interface TailoringServiceStatus {
  available: boolean;
  message: string;
  provider: string;
}

export function getTailoringServiceStatus(): TailoringServiceStatus {
  return {
    available: false,
    provider: "not provided",
    message:
      "AI-assisted tailoring requires an OpenAI API key. Recommendations use deterministic rules based on available mock data.",
  };
}
