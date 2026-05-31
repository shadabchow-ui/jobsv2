import type {
  CandidateProfile,
  JobListing,
  MatchLabel,
  MatchResult,
} from "./types";

const SPACE_RE = /\s+/;

const WEIGHTS = {
  skillFit: 0.4,
  titleFit: 0.2,
  employmentTypeFit: 0.1,
  locationFit: 0.15,
  salaryFit: 0.1,
  seniorityFit: 0.05,
} as const;

function scoreSkillFit(
  job: JobListing,
  profile: CandidateProfile
): { missingSkills: string[]; score: number } {
  if (profile.skills.length === 0) {
    return { missingSkills: [], score: 0 };
  }
  const requiredNames = job.skills.map((s) => s.name.toLowerCase());
  const profileNames = profile.skills.map((s) => s.toLowerCase());
  const matched = requiredNames.filter((r) =>
    profileNames.some((p) => p.includes(r) || r.includes(p))
  );
  const missingSkills = job.skills
    .filter((_, i) => !matched.includes(requiredNames[i]))
    .map((s) => s.name);
  const score =
    requiredNames.length > 0 ? matched.length / requiredNames.length : 0;
  return { missingSkills, score };
}

function scoreTitleFit(job: JobListing, profile: CandidateProfile): number {
  const desired = profile.desiredRole?.toLowerCase() ?? "";
  const title = job.title.toLowerCase();
  const desiredWords = desired.split(SPACE_RE);
  const titleWords = title.split(SPACE_RE);
  const matchedWords = desiredWords.filter((w) => titleWords.includes(w));
  if (desiredWords.length === 0) {
    return 0.5;
  }
  return matchedWords.length / Math.max(desiredWords.length, titleWords.length);
}

function scoreEmploymentTypeFit(
  job: JobListing,
  profile: CandidateProfile
): number {
  if (!profile.employmentType) {
    return 0.5;
  }
  return job.employmentType === profile.employmentType ? 1 : 0;
}

function scoreLocationFit(job: JobListing, profile: CandidateProfile): number {
  if (profile.remotePreferred && job.remote) {
    return 1;
  }
  if (!profile.location) {
    return 0.5;
  }
  if (job.remote) {
    return 0.8;
  }
  if (job.location.toLowerCase().includes(profile.location.toLowerCase())) {
    return 1;
  }
  if (profile.location.toLowerCase().includes(job.location.toLowerCase())) {
    return 1;
  }
  return 0.2;
}

function scoreSalaryFit(job: JobListing, profile: CandidateProfile): number {
  if (!(job.salary && profile.salaryExpectation)) {
    return 0.5;
  }
  const jobMid = (job.salary.min + job.salary.max) / 2;
  const profileMid =
    (profile.salaryExpectation.min + profile.salaryExpectation.max) / 2;
  const ratio = jobMid / profileMid;
  if (ratio >= 1) {
    return 1;
  }
  if (ratio >= 0.85) {
    return 0.7;
  }
  if (ratio >= 0.7) {
    return 0.4;
  }
  return 0.1;
}

function scoreSeniorityFit(job: JobListing, profile: CandidateProfile): number {
  if (!(job.seniority && profile.seniority)) {
    return 0.5;
  }
  const levels = ["junior", "mid", "senior", "lead", "executive"];
  const jobIdx = levels.indexOf(job.seniority);
  const profileIdx = levels.indexOf(profile.seniority as string);
  if (jobIdx === -1 || profileIdx === -1) {
    return 0.5;
  }
  const diff = Math.abs(jobIdx - profileIdx);
  if (diff === 0) {
    return 1;
  }
  if (diff === 1) {
    return 0.7;
  }
  if (diff === 2) {
    return 0.3;
  }
  return 0;
}

function getLabel(overall: number): MatchLabel {
  if (overall >= 80) {
    return "Strong match";
  }
  if (overall >= 60) {
    return "Good match";
  }
  if (overall >= 40) {
    return "Stretch role";
  }
  return "Low match";
}

function buildReasons(
  job: JobListing,
  _profile: CandidateProfile,
  scores: Record<string, number>
): string[] {
  const reasons: string[] = [];
  if (scores.skillFit >= 0.6) {
    reasons.push("Your skills align well with the requirements");
  } else if (scores.skillFit >= 0.3) {
    reasons.push("You have some of the required skills");
  }
  if (scores.titleFit >= 0.5) {
    reasons.push(`The "${job.title}" role matches your career focus`);
  }
  if (scores.employmentTypeFit === 1) {
    reasons.push(`Preferred ${job.employmentType} position`);
  }
  if (scores.locationFit >= 0.8) {
    reasons.push(job.remote ? "Remote-friendly position" : "Location matches");
  }
  if (scores.salaryFit >= 0.7) {
    reasons.push("Salary range aligns with your expectations");
  }
  if (scores.seniorityFit >= 0.7) {
    reasons.push(`Seniority level (${job.seniority}) matches your experience`);
  }
  return reasons;
}

function buildActions(missingSkills: string[], _job: JobListing): string[] {
  const actions: string[] = [];
  actions.push("Tailor resume");
  actions.push("Generate cover letter");
  actions.push("Add to tracker");
  actions.push("Prepare interview");
  if (missingSkills.length > 0) {
    actions.push(
      `Highlight transferable experience for ${missingSkills.slice(0, 2).join(", ")}`
    );
  }
  return actions;
}

export function scoreJob(
  job: JobListing,
  profile: CandidateProfile
): MatchResult {
  const { missingSkills, score: skillRaw } = scoreSkillFit(job, profile);
  const titleRaw = scoreTitleFit(job, profile);
  const employmentTypeRaw = scoreEmploymentTypeFit(job, profile);
  const locationRaw = scoreLocationFit(job, profile);
  const salaryRaw = scoreSalaryFit(job, profile);
  const seniorityRaw = scoreSeniorityFit(job, profile);

  const overall =
    skillRaw * WEIGHTS.skillFit +
    titleRaw * WEIGHTS.titleFit +
    employmentTypeRaw * WEIGHTS.employmentTypeFit +
    locationRaw * WEIGHTS.locationFit +
    salaryRaw * WEIGHTS.salaryFit +
    seniorityRaw * WEIGHTS.seniorityFit;

  const overallPct = Math.min(Math.round(overall * 100), 100);

  const scores = {
    skillFit: skillRaw,
    titleFit: titleRaw,
    employmentTypeFit: employmentTypeRaw,
    locationFit: locationRaw,
    salaryFit: salaryRaw,
    seniorityFit: seniorityRaw,
  };

  return {
    job,
    overall: overallPct,
    label: getLabel(overallPct),
    reasons: buildReasons(job, profile, scores),
    missingSkills,
    recommendedActions: buildActions(missingSkills, job),
  };
}

export function scoreJobs(
  jobs: JobListing[],
  profile: CandidateProfile
): MatchResult[] {
  return jobs
    .map((job) => scoreJob(job, profile))
    .sort((a, b) => b.overall - a.overall);
}
