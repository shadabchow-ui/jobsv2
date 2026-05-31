import { DatabaseIcon } from "lucide-react";
import type { Metadata } from "next";
import { mockSavedJobs } from "@/lib/jobs/mock-data";
import { ConsoleEmptyState } from "../../components/empty-state";
import { Header } from "../../components/header";
import { SavedJobCard } from "../components/saved-job-card";

export const metadata: Metadata = {
  title: "Saved Jobs — Jobs",
  description: "Saved job listings and bookmarks.",
};

const SavedJobsPage = () => (
  <>
    <Header page="Saved Jobs" pages={["Jobs Console", "Jobs"]} />
    <div className="flex flex-1 animate-fade-in flex-col gap-6 p-6 pt-0">
      <div className="space-y-1">
        <h1 className="font-semibold text-2xl tracking-tight">Saved Jobs</h1>
        <p className="text-muted-foreground text-sm">
          Jobs you have saved for later review.
        </p>
      </div>

      {mockSavedJobs.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {mockSavedJobs.map((job) => (
            <SavedJobCard job={job} key={job.id} />
          ))}
        </div>
      ) : (
        <ConsoleEmptyState
          actionHref="/jobs/search"
          actionLabel="Search Jobs"
          description="Save interesting job postings to review and apply later."
          title="No saved jobs yet"
        />
      )}

      <div className="flex items-center gap-1.5 rounded-md border border-dashed bg-muted/20 px-3 py-2 text-muted-foreground">
        <DatabaseIcon className="size-3 shrink-0" />
        <span className="text-[11px] leading-relaxed">
          Saved jobs use mock data. Real save and persistence features are not
          provided.
        </span>
      </div>
    </div>
  </>
);

export default SavedJobsPage;
