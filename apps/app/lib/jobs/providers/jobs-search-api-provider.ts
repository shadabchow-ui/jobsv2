import type {
  JobSearchQuery,
  JobSearchResult,
  UpcubeJobPosting,
} from "../types";
import { mockProvider } from "./mock-provider";
import type { JobSearchProvider, ProviderResult } from "./types";

const PROVIDER_NAME = "jobs-search-api";

/*
 * jobs-search-api provider — placeholder stub.
 *
 * No external provider details are present in this repo:
 *   - Provider name:           not provided
 *   - API endpoint URL:        not provided
 *   - Authentication method:   not provided
 *   - API key env var name:    not provided
 *   - Rate limits:             not provided
 *   - Response schema:         not provided
 *   - Pricing:                 not provided
 *
 * To integrate a real job board API, implement the searchJobs and getJobById
 * methods, call the external endpoint, map the response into RawJobData, and
 * pass it through normalizeJobPosting() to produce UpcubeJobPosting.
 *
 * Until then, the mock provider remains the default. Set activeProviderName
 * to "mock" (or leave it undefined) for local/demo use.
 */

export const jobsSearchApiProvider: JobSearchProvider = {
  name: PROVIDER_NAME,

  searchJobs(_query: JobSearchQuery): Promise<ProviderResult<JobSearchResult>> {
    return Promise.resolve({
      error:
        "jobs-search-api: external provider not configured. Provide provider name, endpoint URL, auth method, and schema to enable.",
      provider: PROVIDER_NAME,
    });
  },

  getJobById(_id: string): Promise<ProviderResult<UpcubeJobPosting | null>> {
    return Promise.resolve({
      error:
        "jobs-search-api: external provider not configured. Provide provider name, endpoint URL, auth method, and schema to enable.",
      provider: PROVIDER_NAME,
    });
  },
};

export function getProvider(name?: string): JobSearchProvider {
  if (name && name !== "mock") {
    const known: Record<string, JobSearchProvider> = {
      "jobs-search-api": jobsSearchApiProvider,
    };

    return known[name] ?? jobsSearchApiProvider;
  }

  return mockProvider;
}
