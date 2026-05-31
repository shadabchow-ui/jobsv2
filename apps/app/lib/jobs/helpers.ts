import { getApplicationStore } from "./applications-store";
import {
  APPLICATION_STATUS_CLASSES,
  APPLICATION_STATUS_LABELS,
  APPLICATION_STATUSES,
} from "./constants";
import { mockCandidateProfile, mockJobPostings, mockJobs } from "./data";
import { scoreJob } from "./match-score";
import { mockSavedJobs } from "./mock-data";
import type {
  ApplicationRecord,
  ApplicationStatus,
  Job,
  JobListing,
  MatchResult,
  SavedJob,
  UpcubeJobPosting,
} from "./types";

export function getStatusLabel(status: ApplicationStatus): string {
  return APPLICATION_STATUS_LABELS[status];
}

export function getStatusClass(status: ApplicationStatus): string {
  return APPLICATION_STATUS_CLASSES[status];
}

export function groupApplicationsByStatus(
  applications: ApplicationRecord[]
): Map<ApplicationStatus, ApplicationRecord[]> {
  const groups = new Map<ApplicationStatus, ApplicationRecord[]>();

  for (const status of APPLICATION_STATUSES) {
    groups.set(status, []);
  }

  for (const app of applications) {
    const existing = groups.get(app.status);
    if (existing) {
      existing.push(app);
    }
  }

  return groups;
}

export function getApplicationCounts(
  applications: ApplicationRecord[]
): Record<ApplicationStatus, number> {
  const counts: Record<string, number> = {};

  for (const status of APPLICATION_STATUSES) {
    counts[status] = 0;
  }

  for (const app of applications) {
    counts[app.status]++;
  }

  return counts as Record<ApplicationStatus, number>;
}

export function getTotalCount(
  counts: Record<ApplicationStatus, number>
): number {
  return Object.values(counts).reduce((sum, count) => sum + count, 0);
}

function inferRemoteType(location: string): "Remote" | "Hybrid" | "On-site" {
  if (location.toLowerCase().includes("remote")) {
    return "Remote";
  }
  if (location.toLowerCase().includes("hybrid")) {
    return "Hybrid";
  }
  return "On-site";
}

function toJobDisplay(posting: UpcubeJobPosting): Job {
  return {
    id: posting.id,
    title: posting.title,
    company: posting.company,
    location: posting.location,
    remoteType: inferRemoteType(posting.location),
    employmentType: posting.type ?? "Full-time",
    salary: posting.salary,
    description: posting.description,
    skills: posting.category ? [posting.category] : [],
    applyUrl: posting.url,
  };
}

export interface JobDetailData {
  applications: ApplicationRecord[];
  job: Job | null;
  listing: JobListing | null;
  matchResult: MatchResult | null;
  posting: UpcubeJobPosting | null;
  savedJob: SavedJob | null;
}

export function getJobDetailById(id: string): JobDetailData {
  const posting = mockJobPostings.find((p) => p.id === id) ?? null;
  const listing = mockJobs.find((j) => j.id === id) ?? null;
  const savedJob = mockSavedJobs.find((j) => j.id === id) ?? null;

  let matchResult: MatchResult | null = null;
  if (listing) {
    matchResult = scoreJob(listing, mockCandidateProfile);
  } else if (posting) {
    const found = mockJobs.find(
      (j) =>
        j.title.toLowerCase() === posting.title.toLowerCase() &&
        j.company.toLowerCase() === posting.company.toLowerCase()
    );
    if (found) {
      matchResult = scoreJob(found, mockCandidateProfile);
    }
  }

  const store = getApplicationStore();
  const applications = store
    .list()
    .filter(
      (a) =>
        a.jobId === id ||
        a.jobId === posting?.externalId ||
        a.jobId === savedJob?.id
    );

  let job: Job | null = null;
  if (posting) {
    job = toJobDisplay(posting);
  } else if (listing) {
    job = {
      id: listing.id,
      title: listing.title,
      company: listing.company,
      location: listing.location,
      remoteType: listing.remote ? "Remote" : "On-site",
      employmentType: listing.employmentType,
      salary: listing.salary
        ? `$${listing.salary.min.toLocaleString()} – $${listing.salary.max.toLocaleString()}`
        : undefined,
      description: listing.description ?? "",
      skills: listing.skills.map((s) => s.name),
      applyUrl: "",
    };
  } else if (savedJob) {
    job = {
      id: savedJob.id,
      title: savedJob.title,
      company: savedJob.company,
      location: savedJob.location,
      remoteType: inferRemoteType(savedJob.location),
      employmentType: "not provided",
      description: "not provided",
      skills: [],
      applyUrl: "",
      matchScore: savedJob.matchScore,
    };
  }

  return { job, posting, listing, savedJob, applications, matchResult };
}
