import {
  AlertTriangleIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  FileTextIcon,
} from "lucide-react";
import type { SkillGap } from "@/lib/jobs/skill-gaps";

interface SkillGapCardProps {
  skill: SkillGap;
}

const levelLabel: Record<string, string> = {
  none: "None",
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
  expert: "Expert",
};

const levelColor = (level: string): string => {
  if (level === "expert" || level === "advanced") {
    return "text-emerald-600 dark:text-emerald-400";
  }
  if (level === "intermediate") {
    return "text-amber-600 dark:text-amber-400";
  }
  return "text-red-600 dark:text-red-400";
};

const importanceLabel: Record<string, string> = {
  critical: "Critical",
  important: "Important",
  "nice-to-have": "Nice to Have",
};

const importanceBadge = (imp: string): string => {
  if (imp === "critical") {
    return "border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300";
  }
  if (imp === "important") {
    return "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-300";
  }
  return "border-border bg-muted text-muted-foreground";
};

export const SkillGapCard = ({ skill }: SkillGapCardProps) => {
  const isGap =
    skill.currentLevel === "none" ||
    skill.currentLevel === "beginner" ||
    skill.currentLevel === "intermediate";

  return (
    <div className="rounded-xl border bg-card p-4 transition-all duration-150 ease-out hover:bg-accent/30">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-sm leading-none">
              {skill.skill}
            </h3>
            <span
              className={`inline-flex shrink-0 items-center rounded-md border px-1.5 py-0 font-medium text-[10px] uppercase leading-none tracking-wide ${importanceBadge(skill.importance)}`}
            >
              {importanceLabel[skill.importance]}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs">
            {isGap ? (
              <AlertTriangleIcon className="size-3 text-red-500" />
            ) : (
              <CheckCircleIcon className="size-3 text-emerald-500" />
            )}
            <span className={levelColor(skill.currentLevel)}>
              {levelLabel[skill.currentLevel] ?? "Unknown"}
            </span>
            <span className="text-muted-foreground">·</span>
            <span className="text-muted-foreground capitalize">
              {skill.category}
            </span>
          </div>

          <div className="space-y-1">
            <p className="font-medium text-[11px] text-muted-foreground uppercase tracking-wider">
              Recommended Actions
            </p>
            <ul className="space-y-0.5">
              {skill.recommendedActions.map((action) => (
                <li
                  className="flex items-start gap-1.5 text-muted-foreground text-xs"
                  key={action}
                >
                  <ArrowRightIcon className="mt-0.5 size-3 shrink-0" />
                  <span>{action}</span>
                </li>
              ))}
            </ul>
          </div>

          {skill.portfolioProjectIdeas &&
            skill.portfolioProjectIdeas.length > 0 && (
              <div className="space-y-1">
                <p className="font-medium text-[11px] text-muted-foreground uppercase tracking-wider">
                  Portfolio Ideas
                </p>
                <ul className="space-y-0.5">
                  {skill.portfolioProjectIdeas.map((idea) => (
                    <li
                      className="flex items-start gap-1.5 text-muted-foreground text-xs"
                      key={idea}
                    >
                      <FileTextIcon className="mt-0.5 size-3 shrink-0" />
                      <span>{idea}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};
