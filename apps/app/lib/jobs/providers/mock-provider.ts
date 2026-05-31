import { mockJobPostings } from "../data";
import type {
  JobSearchQuery,
  JobSearchResult,
  UpcubeJobPosting,
} from "../types";
import type { JobSearchProvider, ProviderResult } from "./types";

function matchesQuery(job: UpcubeJobPosting, query: string): boolean {
  const q = query.toLowerCase();
  return (
    job.title.toLowerCase().includes(q) ||
    job.company.toLowerCase().includes(q) ||
    job.description.toLowerCase().includes(q) ||
    (job.category?.toLowerCase().includes(q) ?? false)
  );
}

function matchesLocation(job: UpcubeJobPosting, location: string): boolean {
  return job.location.toLowerCase().includes(location.toLowerCase());
}

function matchPostedWithinDays(iso: string, days: number): boolean {
  const posted = new Date(iso).getTime();
  const cutoff = Date.now() - days * 86_400_000;
  return posted >= cutoff;
}

function applyFilters(
  jobs: UpcubeJobPosting[],
  query: JobSearchQuery
): UpcubeJobPosting[] {
  let filtered = [...jobs];
  const searchQuery = query.query;
  const searchLocation = query.location;
  const searchCategory = query.category;
  const searchType = query.type;
  const postedDays = query.postedWithinDays;

  if (searchQuery) {
    filtered = filtered.filter((j) => matchesQuery(j, searchQuery));
  }

  if (searchLocation) {
    filtered = filtered.filter((j) => matchesLocation(j, searchLocation));
  }

  if (searchCategory) {
    filtered = filtered.filter(
      (j) => j.category?.toLowerCase() === searchCategory.toLowerCase()
    );
  }

  if (searchType) {
    filtered = filtered.filter(
      (j) => j.type?.toLowerCase() === searchType.toLowerCase()
    );
  }

  if (postedDays && postedDays > 0) {
    filtered = filtered.filter((j) =>
      j.postedAt ? matchPostedWithinDays(j.postedAt, postedDays) : true
    );
  }

  return filtered;
}

function paginate(
  jobs: UpcubeJobPosting[],
  page: number,
  pageSize: number
): JobSearchResult {
  const total = jobs.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const start = (page - 1) * pageSize;
  const paged = jobs.slice(start, start + pageSize);

  return {
    jobs: paged,
    total,
    page,
    pageSize,
    totalPages,
  };
}

export const mockProvider: JobSearchProvider = {
  name: "mock",

  searchJobs(query: JobSearchQuery): Promise<ProviderResult<JobSearchResult>> {
    const page = Math.max(1, query.page ?? 1);
    const pageSize = Math.max(1, Math.min(100, query.pageSize ?? 20));
    const filtered = applyFilters(mockJobPostings, query);
    return Promise.resolve({
      data: paginate(filtered, page, pageSize),
      provider: "mock",
    });
  },

  getJobById(id: string): Promise<ProviderResult<UpcubeJobPosting | null>> {
    const job = mockJobPostings.find((j) => j.id === id) ?? null;
    return Promise.resolve({ data: job, provider: "mock" });
  },
};
