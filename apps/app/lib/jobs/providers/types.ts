import type {
  JobSearchQuery,
  JobSearchResult,
  UpcubeJobPosting,
} from "../types";

export interface ProviderConfig {
  name: string;
}

export type ProviderResult<T> =
  | { data: T; provider: string }
  | { error: string; provider: string };

export interface JobSearchProvider {
  getJobById(id: string): Promise<ProviderResult<UpcubeJobPosting | null>>;
  readonly name: string;
  searchJobs(query: JobSearchQuery): Promise<ProviderResult<JobSearchResult>>;
}
