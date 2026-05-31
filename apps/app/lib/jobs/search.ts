import { dedupeJobs } from "./normalize";
import { getProvider } from "./providers";
import { mockProvider } from "./providers/mock-provider";
import type { ProviderResult } from "./providers/types";
import type {
  Job,
  JobSearchFilters,
  JobSearchQuery,
  JobSearchResult,
  SearchResultState,
  UpcubeJobPosting,
} from "./types";

const CACHE_TTL_MS = 120_000;

interface CacheEntry {
  data: Job[];
  isFallback: boolean;
  provider: string;
  timestamp: number;
}

const searchCache = new Map<string, CacheEntry>();

let activeProviderName: string | undefined;

export function setActiveProvider(name: string): void {
  activeProviderName = name;
  searchCache.clear();
}

export function getActiveProviderName(): string {
  return activeProviderName ?? "mock";
}

export function clearSearchCache(): void {
  searchCache.clear();
}

function buildCacheKey(filters: JobSearchFilters): string {
  return [
    filters.query.toLowerCase().trim(),
    filters.location.toLowerCase().trim(),
    filters.remoteType.toLowerCase().trim(),
    filters.employmentType.toLowerCase().trim(),
  ].join("|");
}

function isExpired(entry: CacheEntry): boolean {
  return Date.now() - entry.timestamp > CACHE_TTL_MS;
}

function isRateLimitedError(error: string): boolean {
  const lower = error.toLowerCase();
  return (
    lower.includes("rate limit") ||
    lower.includes("rate_limit") ||
    lower.includes("too many requests") ||
    lower.includes("429")
  );
}

function searchOnProvider(
  query: JobSearchQuery
): Promise<ProviderResult<JobSearchResult>> {
  const provider = getProvider(activeProviderName);
  return provider.searchJobs(query);
}

function searchOnMock(
  query: JobSearchQuery
): Promise<ProviderResult<JobSearchResult>> {
  return mockProvider.searchJobs(query);
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

function inferRemoteType(location: string): "Remote" | "Hybrid" | "On-site" {
  if (location.toLowerCase().includes("remote")) {
    return "Remote";
  }
  if (location.toLowerCase().includes("hybrid")) {
    return "Hybrid";
  }
  return "On-site";
}

function jobSearchResultToJobs(result: JobSearchResult): Job[] {
  return result.jobs.map(toJobDisplay);
}

function buildQuery(filters: JobSearchFilters): JobSearchQuery {
  return {
    query: filters.query || undefined,
    location: filters.location || undefined,
    type:
      filters.employmentType &&
      filters.employmentType !== "all" &&
      filters.employmentType !== ""
        ? filters.employmentType
        : undefined,
  };
}

function freshResult(
  cached: CacheEntry | undefined
): SearchResultState | undefined {
  if (cached && !isExpired(cached)) {
    return {
      jobs: cached.data,
      message: cached.isFallback
        ? "Showing demo results — provider unavailable"
        : undefined,
      provider: cached.provider,
      status: cached.data.length === 0 ? "empty" : "success",
      isStale: false,
    };
  }
}

function handleSuccess(
  key: string,
  result: JobSearchResult,
  provider: string
): SearchResultState {
  const jobs = jobSearchResultToJobs(result);
  searchCache.set(key, {
    data: jobs,
    provider,
    isFallback: false,
    timestamp: Date.now(),
  });
  return {
    jobs,
    provider,
    status: jobs.length === 0 ? "empty" : "success",
    isStale: false,
  };
}

async function handleProviderError(
  key: string,
  result: ProviderResult<JobSearchResult>,
  query: JobSearchQuery,
  cached: CacheEntry | undefined
): Promise<SearchResultState> {
  if (!("error" in result)) {
    return handleSuccess(key, result.data, result.provider);
  }

  if (isRateLimitedError(result.error)) {
    if (cached) {
      return {
        jobs: cached.data,
        message: "Provider is rate-limited. Showing previously cached results.",
        provider: result.provider,
        status: "rate-limited",
        isStale: true,
      };
    }
    return {
      jobs: [],
      message: "Provider is rate-limited. Please try again later.",
      provider: result.provider,
      status: "rate-limited",
      isStale: false,
    };
  }

  if (getActiveProviderName() === "mock") {
    return {
      jobs: [],
      message: result.error,
      provider: result.provider,
      status: "error",
      isStale: false,
    };
  }

  const mockResult = await searchOnMock(query);

  if ("error" in mockResult) {
    return {
      jobs: [],
      message: "Search is unavailable right now. Please try again later.",
      provider: result.provider,
      status: "error",
      isStale: false,
    };
  }

  const jobs = jobSearchResultToJobs(mockResult.data);

  searchCache.set(key, {
    data: jobs,
    provider: result.provider,
    isFallback: true,
    timestamp: Date.now(),
  });

  return {
    jobs,
    message: "Showing demo results — provider unavailable",
    provider: result.provider,
    status: "fallback",
    isStale: false,
  };
}

function handleException(
  err: unknown,
  cached: CacheEntry | undefined
): SearchResultState {
  const errorMessage =
    err instanceof Error ? err.message : "An unexpected error occurred.";

  if (cached) {
    return {
      jobs: cached.data,
      message: "Search failed. Showing previously cached results.",
      provider: cached.provider,
      status: "error",
      isStale: true,
    };
  }

  return {
    jobs: [],
    message: errorMessage,
    provider: getActiveProviderName(),
    status: "error",
    isStale: false,
  };
}

export async function searchJobs(
  filters: JobSearchFilters
): Promise<SearchResultState> {
  const key = buildCacheKey(filters);
  const cached = searchCache.get(key);
  const fresh = freshResult(cached);

  if (fresh) {
    return fresh;
  }

  const query = buildQuery(filters);

  try {
    const result = await searchOnProvider(query);
    return handleProviderError(key, result, query, cached);
  } catch (err) {
    return handleException(err, cached);
  }
}

export function searchJobsProvider(
  query: JobSearchQuery
): Promise<ProviderResult<JobSearchResult>> {
  return searchOnProvider(query);
}

export async function searchJobsDeduplicated(
  query: JobSearchQuery
): Promise<ProviderResult<JobSearchResult>> {
  const result = await searchOnProvider(query);

  if ("error" in result) {
    return result;
  }

  return {
    data: {
      ...result.data,
      jobs: dedupeJobs(result.data.jobs),
    },
    provider: result.provider,
  };
}

export function getJobByIdProvider(
  id: string
): Promise<ProviderResult<UpcubeJobPosting | null>> {
  const provider = getProvider(activeProviderName);
  return provider.getJobById(id);
}

export async function getJobById(id: string): Promise<Job | null> {
  try {
    const result = await getJobByIdProvider(id);

    if ("error" in result || !result.data) {
      return null;
    }

    return toJobDisplay(result.data);
  } catch {
    return null;
  }
}

export function isMockProvider(): boolean {
  return getActiveProviderName() === "mock";
}

export function getCacheStats(): {
  entryCount: number;
  oldestEntryAgeMs: number | null;
  ttlMs: number;
} {
  if (searchCache.size === 0) {
    return { entryCount: 0, oldestEntryAgeMs: null, ttlMs: CACHE_TTL_MS };
  }
  const entries = Array.from(searchCache.values());
  const oldest = Math.min(...entries.map((e) => Date.now() - e.timestamp));
  return {
    entryCount: searchCache.size,
    oldestEntryAgeMs: oldest,
    ttlMs: CACHE_TTL_MS,
  };
}
