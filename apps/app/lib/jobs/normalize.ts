import type { UpcubeJobPosting } from "./types";

export interface RawJobData {
  category?: string;
  company?: string;
  description?: string;
  expiresAt?: string;
  externalId: string;
  location?: string;
  postedAt?: string;
  salary?: string;
  source: string;
  title?: string;
  type?: string;
  url?: string;
}

function inferStatus(data: RawJobData): UpcubeJobPosting["status"] {
  if (!(data.title && data.company)) {
    return "Planned";
  }
  return "Foundation";
}

export function normalizeJobPosting(
  raw: RawJobData,
  index: number
): UpcubeJobPosting {
  const id = `${raw.source}-${raw.externalId}-${index}`;

  return {
    id,
    title: raw.title ?? "Untitled Position",
    company: raw.company ?? "Unknown Company",
    location: raw.location ?? "Location not provided",
    description: raw.description ?? "",
    url: raw.url ?? "",
    source: raw.source,
    externalId: raw.externalId,
    salary: raw.salary,
    type: raw.type,
    category: raw.category,
    postedAt: raw.postedAt,
    expiresAt: raw.expiresAt,
    status: inferStatus(raw),
  };
}

interface DedupeKey {
  company: string;
  externalId: string;
  location: string;
  source: string;
  title: string;
}

function buildDedupeKey(job: UpcubeJobPosting): DedupeKey {
  return {
    source: job.source,
    externalId: job.externalId,
    title: job.title.toLowerCase().trim(),
    company: job.company.toLowerCase().trim(),
    location: job.location.toLowerCase().trim(),
  };
}

function keyToString(key: DedupeKey): string {
  return `${key.source}::${key.externalId}::${key.title}::${key.company}::${key.location}`;
}

export function dedupeJobs(jobs: UpcubeJobPosting[]): UpcubeJobPosting[] {
  const seen = new Set<string>();

  return jobs.filter((job) => {
    const key = keyToString(buildDedupeKey(job));

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}
