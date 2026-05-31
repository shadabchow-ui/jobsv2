"use client";

import { useEffect, useState, useTransition } from "react";
import type { SearchResultState } from "@/lib/jobs";
import { searchJobs } from "@/lib/jobs";
import { Header } from "../../components/header";
import { JobFilterSummary } from "../components/job-filter-summary";
import { JobResults } from "../components/job-results";
import { JobSearchForm } from "../components/job-search-form";

const defaultState: SearchResultState = {
  jobs: [],
  provider: "mock",
  status: "loading",
  isStale: false,
};

const JobSearchPage = () => {
  const [filters, setFilters] = useState({
    query: "",
    location: "",
    remoteType: "",
    employmentType: "",
  });
  const [result, setResult] = useState<SearchResultState>(defaultState);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      const state = await searchJobs(filters);
      setResult(state);
    });
  }, [filters]);

  return (
    <>
      <Header page="Job Search" pages={["Jobs Console", "Jobs"]} />
      <div className="flex flex-1 flex-col gap-6 p-6 pt-0">
        <div className="space-y-1">
          <h1 className="font-semibold text-2xl tracking-tight">Job Search</h1>
          <p className="text-muted-foreground text-sm">
            Find your next role from thousands of job listings.
          </p>
        </div>

        <JobSearchForm filters={filters} onFilterChange={setFilters} />

        <JobFilterSummary
          filters={filters}
          onClear={() =>
            setFilters({
              query: "",
              location: "",
              remoteType: "",
              employmentType: "",
            })
          }
          resultCount={result.jobs.length}
        />

        {(() => {
          if (isPending || result.status === "loading") {
            return (
              <div className="flex items-center justify-center py-16">
                <div className="flex flex-col items-center gap-3">
                  <div className="size-8 animate-spin rounded-full border-2 border-muted-foreground/30 border-t-foreground" />
                  <p className="text-muted-foreground text-xs">
                    Searching jobs…
                  </p>
                </div>
              </div>
            );
          }

          if (
            result.status === "error" &&
            !result.message?.includes("cached")
          ) {
            return (
              <div className="flex flex-col items-center gap-3 rounded-lg border border-destructive/30 border-dashed px-6 py-10 text-center">
                <p className="font-medium text-destructive text-sm">
                  {result.message ?? "Failed to search jobs. Please try again."}
                </p>
              </div>
            );
          }

          if (result.status === "rate-limited") {
            return (
              <div className="space-y-4">
                {result.jobs.length > 0 && (
                  <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-amber-800 text-xs dark:border-amber-800 dark:bg-amber-950 dark:text-amber-200">
                    {result.message}
                  </div>
                )}
                {result.jobs.length === 0 && (
                  <div className="flex flex-col items-center gap-3 rounded-lg border border-amber-200 border-dashed bg-amber-50 px-6 py-10 text-center dark:border-amber-800 dark:bg-amber-950">
                    <p className="font-medium text-amber-700 text-sm dark:text-amber-300">
                      {result.message}
                    </p>
                  </div>
                )}
              </div>
            );
          }

          if (result.status === "fallback" && result.message) {
            return (
              <div className="space-y-4">
                <div className="rounded-lg border border-muted-foreground/20 bg-muted/30 px-4 py-3 text-muted-foreground text-xs">
                  {result.message}
                </div>
                <JobResults jobs={result.jobs} />
              </div>
            );
          }

          return <JobResults jobs={result.jobs} />;
        })()}
      </div>
    </>
  );
};

export default JobSearchPage;
