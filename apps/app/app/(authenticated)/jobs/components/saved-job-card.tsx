import { Button } from "@repo/design-system/components/ui/button";
import { cn } from "@repo/design-system/lib/utils";
import {
  BookmarkIcon,
  BriefcaseIcon,
  CheckCircleIcon,
  FileTextIcon,
  MapPinIcon,
  SparklesIcon,
} from "lucide-react";
import Link from "next/link";
import type { SavedJob } from "@/lib/jobs/types";

interface SavedJobCardProps {
  job: SavedJob;
}

function matchIconColor(score: number): string {
  if (score >= 90) {
    return "text-emerald-500";
  }
  if (score >= 80) {
    return "text-amber-500";
  }
  return "text-muted-foreground";
}

function matchTextColor(score: number): string {
  if (score >= 90) {
    return "text-emerald-600 dark:text-emerald-400";
  }
  if (score >= 80) {
    return "text-amber-600 dark:text-amber-400";
  }
  return "text-muted-foreground";
}

export const SavedJobCard = ({ job }: SavedJobCardProps) => (
  <div className="group rounded-xl border bg-card p-5 transition-all duration-150 ease-out hover:bg-accent/50 hover:shadow-sm">
    <div className="flex items-start justify-between gap-4">
      <div className="min-w-0 flex-1 space-y-2">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <h3 className="font-semibold leading-none">{job.title}</h3>
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <BriefcaseIcon className="size-3.5 shrink-0" />
              <span>{job.company}</span>
            </div>
          </div>
          <BookmarkIcon className="size-4 shrink-0 text-muted-foreground/40" />
        </div>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-muted-foreground text-xs">
          <span className="flex items-center gap-1">
            <MapPinIcon className="size-3" />
            {job.location}
          </span>
          <span className="flex items-center gap-1">
            <CheckCircleIcon className="size-3" />
            Saved {job.savedDate}
          </span>
        </div>

        {job.matchScore !== undefined && (
          <div className="flex items-center gap-1.5">
            <SparklesIcon
              className={cn("size-3.5", matchIconColor(job.matchScore))}
            />
            <span
              className={cn(
                "font-medium text-xs",
                matchTextColor(job.matchScore)
              )}
            >
              {job.matchScore}% match
            </span>
          </div>
        )}
      </div>
    </div>

    <div className="mt-4 flex flex-wrap items-center gap-2 border-border/50 border-t pt-3">
      <Button asChild size="sm" variant="default">
        <Link href={`/jobs/${job.id}`}>
          <BriefcaseIcon className="size-3.5" />
          View Job
        </Link>
      </Button>
      <Button asChild size="sm" variant="outline">
        <Link href={"/jobs/applications"}>
          <FileTextIcon className="size-3.5" />
          Tailor Resume
        </Link>
      </Button>
      <Button asChild size="sm" variant="outline">
        <Link href={"/jobs/applications"}>
          <SparklesIcon className="size-3.5" />
          Generate Cover Letter
        </Link>
      </Button>
      <Button asChild size="sm" variant="secondary">
        <Link href={"/jobs/applications"}>
          <CheckCircleIcon className="size-3.5" />
          Add to Tracker
        </Link>
      </Button>
    </div>
  </div>
);
