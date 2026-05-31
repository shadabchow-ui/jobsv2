/**
 * Jobs Search diagnostics — provider status, env health, cache, data quality.
 *
 * All status values are derived from internal code structure. No env values
 * or secrets are printed. Missing provider facts are reported as
 * `"not provided"`.
 */

import { mockJobPostings } from "./data";
import { getActiveProviderName, getCacheStats, isMockProvider } from "./search";

// ---------------------------------------------------------------------------
// API Configuration (all "not provided" — no external API is configured)
// ---------------------------------------------------------------------------

export interface ApiConfiguration {
  apiKeyEnvVar: string;
  authMethod: string;
  endpointUrl: string;
  providerName: string;
  rateLimits: string;
  responseSchema: string;
}

function getApiConfiguration(): ApiConfiguration {
  return {
    providerName: "not provided",
    endpointUrl: "not provided",
    authMethod: "not provided",
    apiKeyEnvVar: "not provided",
    rateLimits: "not provided",
    responseSchema: "not provided",
  };
}

// ---------------------------------------------------------------------------
// Provider status
// ---------------------------------------------------------------------------

export interface ProviderStatus {
  activeProvider: string;
  isMock: boolean;
}

function getProviderStatus(): ProviderStatus {
  return {
    activeProvider: getActiveProviderName(),
    isMock: isMockProvider(),
  };
}

// ---------------------------------------------------------------------------
// Search cache status
// ---------------------------------------------------------------------------

export interface SearchCacheStatus {
  entryCount: number;
  oldestEntryAgeMs: number | null;
  ttlMs: number;
}

function getSearchCacheStatus(): SearchCacheStatus {
  return getCacheStats();
}

// ---------------------------------------------------------------------------
// Mock fallback status
// ---------------------------------------------------------------------------

export interface MockFallbackStatus {
  enabled: boolean;
  jobCount: number;
}

function getMockFallbackStatus(): MockFallbackStatus {
  return {
    enabled: !isMockProvider(),
    jobCount: mockJobPostings.length,
  };
}

// ---------------------------------------------------------------------------
// Data quality checks
// ---------------------------------------------------------------------------

export interface DataQualityReport {
  missingApplyUrl: number;
  missingSalary: number;
  missingSkills: number;
  totalJobs: number;
  unknownRemoteType: number;
}

function getDataQuality(): DataQualityReport {
  const jobs = mockJobPostings;
  const total = jobs.length;

  const missingSalary = jobs.filter((j) => !j.salary).length;
  const missingApplyUrl = jobs.filter((j) => !j.url).length;
  const missingSkills = jobs.filter((j) => !j.category).length;

  const locationLower = jobs.map((j) => j.location.toLowerCase());
  const remoteJobs = locationLower.filter(
    (l) => l.includes("remote") || l.includes("hybrid")
  ).length;
  const unknownRemoteType = total - remoteJobs;

  return {
    totalJobs: total,
    missingSalary,
    missingApplyUrl,
    missingSkills,
    unknownRemoteType,
  };
}

// ---------------------------------------------------------------------------
// Troubleshooting checklist
// ---------------------------------------------------------------------------

export interface TroubleshootingItem {
  issue: string;
  resolution: string;
}

function getTroubleshootingChecklist(): TroubleshootingItem[] {
  const items: TroubleshootingItem[] = [];

  if (isMockProvider()) {
    items.push({
      issue: "Active provider is mock — no real job search available",
      resolution:
        "Set up a real provider name and configure the corresponding environment variables. See providers/jobs-search-api-provider.ts for the integration stub.",
    });
  }

  items.push({
    issue: "No external search API is configured",
    resolution:
      "No provider name, endpoint URL, auth method, or API key env var are defined. Implement the provider in providers/jobs-search-api-provider.ts and configure the required env vars.",
  });

  const cache = getCacheStats();
  if (cache.entryCount === 0) {
    items.push({
      issue: "Search cache is empty",
      resolution:
        "Run a job search from the Job Search page to populate the cache. It will be active after the first successful search.",
    });
  }

  const quality = getDataQuality();
  if (quality.missingSalary > 0) {
    items.push({
      issue: `${quality.missingSalary} job(s) missing salary data`,
      resolution:
        "Add salary information to the affected job postings. Jobs without salary may reduce match score accuracy.",
    });
  }

  if (quality.unknownRemoteType > 0) {
    items.push({
      issue: `${quality.unknownRemoteType} job(s) with unclear remote/onsite type`,
      resolution:
        "Remote type is inferred from the location string. Add 'Remote' or 'Hybrid' to the location field of affected postings for accurate filtering.",
    });
  }

  if (quality.missingApplyUrl > 0) {
    items.push({
      issue: `${quality.missingApplyUrl} job(s) missing an apply URL`,
      resolution:
        "Add a valid apply URL to each job posting. Missing URLs prevent users from applying.",
    });
  }

  if (quality.missingSkills > 0) {
    items.push({
      issue: `${quality.missingSkills} job(s) missing skills/category tags`,
      resolution:
        "Add a category or skill tag to affected postings. Skills are used by AI Job Match for scoring.",
    });
  }

  items.push({
    issue: "No admin RBAC is configured for diagnostics",
    resolution:
      "The diagnostics page is unprotected. Add middleware or a layout check to restrict access if needed.",
  });

  return items;
}

// ---------------------------------------------------------------------------
// Full report
// ---------------------------------------------------------------------------

export interface DiagnosticsReport {
  apiConfiguration: ApiConfiguration;
  dataQuality: DataQualityReport;
  mockFallback: MockFallbackStatus;
  provider: ProviderStatus;
  searchCache: SearchCacheStatus;
  troubleshooting: TroubleshootingItem[];
}

export function getFullDiagnostics(): DiagnosticsReport {
  return {
    provider: getProviderStatus(),
    apiConfiguration: getApiConfiguration(),
    searchCache: getSearchCacheStatus(),
    mockFallback: getMockFallbackStatus(),
    dataQuality: getDataQuality(),
    troubleshooting: getTroubleshootingChecklist(),
  };
}
