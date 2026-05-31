"use client";

import { Badge } from "@repo/design-system/components/ui/badge";
import { Button } from "@repo/design-system/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/design-system/components/ui/card";
import { cn } from "@repo/design-system/lib/utils";
import {
  BookmarkIcon,
  BriefcaseIcon,
  ExternalLinkIcon,
  FileTextIcon,
  MapPinIcon,
  SparklesIcon,
  TargetIcon,
  WifiIcon,
} from "lucide-react";
import Link from "next/link";
import type { Job } from "@/lib/jobs";

interface JobCardProps {
  job: Job;
}

const remoteIcon: Record<string, React.ReactNode> = {
  Remote: <WifiIcon className="size-3.5" />,
  Hybrid: <WifiIcon className="size-3.5" />,
  "On-site": <MapPinIcon className="size-3.5" />,
};

const matchColor = (score: number) => {
  if (score >= 90) {
    return "text-emerald-500";
  }
  if (score >= 75) {
    return "text-amber-500";
  }
  return "text-muted-foreground";
};

export const JobCard = ({ job }: JobCardProps) => (
  <Card className="group transition-all duration-150 ease-out hover:shadow-md active:scale-[0.99]">
    <CardHeader>
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <CardTitle className="text-base">
            <Link
              className="transition-colors hover:text-foreground/80"
              href={`/jobs/${job.id}`}
            >
              {job.title}
            </Link>
          </CardTitle>
          <p className="text-muted-foreground text-sm">{job.company}</p>
        </div>
        {job.matchScore !== undefined && (
          <div
            className={cn(
              "flex shrink-0 items-center gap-1 rounded-full border bg-muted/50 px-2.5 py-1 font-medium text-xs",
              matchColor(job.matchScore)
            )}
          >
            <TargetIcon className="size-3" />
            <span>{job.matchScore}% match</span>
          </div>
        )}
      </div>
    </CardHeader>
    <CardContent className="space-y-3">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-muted-foreground text-xs">
        <span className="flex items-center gap-1">
          <MapPinIcon className="size-3.5" />
          {job.location}
        </span>
        <span className="flex items-center gap-1">
          {remoteIcon[job.remoteType] ?? <MapPinIcon className="size-3.5" />}
          {job.remoteType}
        </span>
        <span className="flex items-center gap-1">
          <BriefcaseIcon className="size-3.5" />
          {job.employmentType}
        </span>
        {job.salary && (
          <span className="flex items-center gap-1 font-medium text-foreground/80">
            {job.salary}
          </span>
        )}
      </div>

      <p className="line-clamp-2 text-muted-foreground text-sm leading-relaxed">
        {job.description}
      </p>

      <div className="flex flex-wrap gap-1.5">
        {job.skills.map((skill) => (
          <Badge className="text-[11px]" key={skill} variant="secondary">
            {skill}
          </Badge>
        ))}
      </div>
    </CardContent>
    <CardFooter className="flex items-center justify-between gap-2 border-t pt-4">
      <div className="flex items-center gap-1.5">
        <Button disabled size="icon-sm" title="Save job" variant="ghost">
          <BookmarkIcon className="size-4" />
          <span className="sr-only">Save job</span>
        </Button>
        <Button disabled size="icon-sm" title="Tailor resume" variant="ghost">
          <FileTextIcon className="size-4" />
          <span className="sr-only">Tailor resume</span>
        </Button>
        <Button
          disabled
          size="icon-sm"
          title="Generate cover letter"
          variant="ghost"
        >
          <SparklesIcon className="size-4" />
          <span className="sr-only">Generate cover letter</span>
        </Button>
      </div>
      <Button asChild size="sm" variant="outline">
        <a href={job.applyUrl} rel="noreferrer" target="_blank">
          Apply
          <ExternalLinkIcon className="size-3.5" />
        </a>
      </Button>
    </CardFooter>
  </Card>
);
