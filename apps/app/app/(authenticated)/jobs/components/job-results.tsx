import type { Job } from "@/lib/jobs";
import { ConsoleEmptyState } from "../../components/empty-state";
import { JobCard } from "./job-card";

interface JobResultsProps {
  jobs: Job[];
}

export const JobResults = ({ jobs }: JobResultsProps) => {
  if (jobs.length === 0) {
    return (
      <ConsoleEmptyState
        actionHref="/jobs/profile"
        actionLabel="Update Profile"
        description="Try adjusting your filters or search terms. Updating your profile may improve matches."
        title="No jobs found"
      />
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {jobs.map((job) => (
        <JobCard job={job} key={job.id} />
      ))}
    </div>
  );
};
