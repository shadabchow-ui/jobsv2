import { Button } from "@repo/design-system/components/ui/button";
import { Card } from "@repo/design-system/components/ui/card";
import { cn } from "@repo/design-system/lib/utils";
import {
  BriefcaseIcon,
  ExternalLinkIcon,
  FileTextIcon,
  ListChecksIcon,
  MessageSquareIcon,
  SparklesIcon,
  TargetIcon,
} from "lucide-react";
import Link from "next/link";
import type { MatchResult } from "@/lib/jobs";

interface MatchCardProps {
  match: MatchResult;
}

const scoreBg = (overall: number) => {
  if (overall >= 80) {
    return "bg-emerald-500/10 border-emerald-500/20";
  }
  if (overall >= 60) {
    return "bg-blue-500/10 border-blue-500/20";
  }
  if (overall >= 40) {
    return "bg-amber-500/10 border-amber-500/20";
  }
  return "bg-muted border-border";
};

const labelBadge = (label: string, overall: number) => {
  const colors: Record<string, string> = {
    "Strong match":
      "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    "Good match":
      "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    "Stretch role":
      "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    "Low match": "bg-muted text-muted-foreground border-border",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-0.5 font-medium text-[11px] uppercase tracking-wide",
        colors[label] ?? colors["Low match"]
      )}
    >
      {label} — {overall}%
    </span>
  );
};

const ActionButton = ({
  icon: Icon,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) => (
  <Button
    className="h-7 gap-1.5 px-2.5 text-xs"
    onClick={() => {
      /* placeholder — no real mutation */
    }}
    size="sm"
    type="button"
    variant="outline"
  >
    <Icon className="size-3" />
    {label}
  </Button>
);

export const MatchCard = ({ match }: MatchCardProps) => {
  const { job, overall, label, reasons, missingSkills, recommendedActions } =
    match;

  return (
    <Card className={cn("overflow-hidden border", scoreBg(overall))}>
      <div className="flex items-start justify-between gap-4 p-5">
        <div className="flex-1 space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <h3 className="font-semibold leading-none">{job.title}</h3>
              <p className="flex items-center gap-1.5 text-muted-foreground text-sm">
                <BriefcaseIcon className="size-3.5" />
                {job.company}
                <span className="text-muted-foreground/50">·</span>
                {job.location}
                {job.remote && (
                  <>
                    <span className="text-muted-foreground/50">·</span>
                    <span className="text-xs">Remote</span>
                  </>
                )}
              </p>
            </div>
            {labelBadge(label, overall)}
          </div>

          <p className="line-clamp-2 text-muted-foreground text-sm leading-snug">
            {job.description}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {job.skills.slice(0, 6).map((skill) => {
              const isMissing = missingSkills.includes(skill.name);
              return (
                <span
                  className={cn(
                    "inline-flex items-center rounded-full px-2 py-0.5 font-medium text-[11px]",
                    isMissing
                      ? "bg-red-500/10 text-red-600 dark:text-red-400"
                      : "bg-muted text-muted-foreground"
                  )}
                  key={skill.name}
                >
                  {isMissing && <TargetIcon className="mr-1 size-2.5" />}
                  {skill.name}
                </span>
              );
            })}
          </div>

          {reasons.length > 0 && (
            <div className="space-y-1">
              <p className="flex items-center gap-1.5 font-medium text-[11px] text-muted-foreground uppercase tracking-wider">
                <SparklesIcon className="size-3" />
                Why you match
              </p>
              <ul className="space-y-0.5">
                {reasons.map((reason) => (
                  <li
                    className="flex items-start gap-2 text-muted-foreground text-xs"
                    key={reason}
                  >
                    <span className="mt-0.5 block size-1 shrink-0 rounded-full bg-muted-foreground/40" />
                    {reason}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {missingSkills.length > 0 && (
            <div className="space-y-1">
              <p className="font-medium text-[11px] text-muted-foreground uppercase tracking-wider">
                Missing skills
              </p>
              <p className="text-muted-foreground text-xs">
                {missingSkills.join(", ")}
              </p>
            </div>
          )}

          <div className="flex flex-wrap gap-1.5 pt-1">
            {recommendedActions.includes("Tailor resume") && (
              <ActionButton icon={FileTextIcon} label="Tailor resume" />
            )}
            {recommendedActions.includes("Generate cover letter") && (
              <ActionButton icon={MessageSquareIcon} label="Cover letter" />
            )}
            {recommendedActions.includes("Add to tracker") && (
              <ActionButton icon={ListChecksIcon} label="Add to tracker" />
            )}
            {recommendedActions.includes("Prepare interview") && (
              <ActionButton icon={SparklesIcon} label="Prepare interview" />
            )}
          </div>

          <div className="flex gap-2 pt-1">
            <Button asChild size="sm" variant="default">
              <Link href={`/jobs/${job.id}`}>
                <ExternalLinkIcon className="size-3" />
                View Details
              </Link>
            </Button>
          </div>

          <p className="text-[10px] text-muted-foreground/50">
            Match score is a local estimate based on your profile data. Not a
            real hiring prediction.
          </p>
        </div>
      </div>
    </Card>
  );
};
