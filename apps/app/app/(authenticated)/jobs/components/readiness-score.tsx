import type { SkillGapAnalysis } from "@/lib/jobs/skill-gaps";

interface ReadinessScoreProps {
  analysis: SkillGapAnalysis;
}

const scoreColor = (score: number): string => {
  if (score >= 80) {
    return "text-emerald-500";
  }
  if (score >= 60) {
    return "text-amber-500";
  }
  return "text-red-500";
};

const scoreBg = (score: number): string => {
  if (score >= 80) {
    return "bg-emerald-500";
  }
  if (score >= 60) {
    return "bg-amber-500";
  }
  return "bg-red-500";
};

const scoreLabel = (score: number): string => {
  if (score >= 80) {
    return "Strong match";
  }
  if (score >= 60) {
    return "Moderate fit";
  }
  return "Needs work";
};

export const ReadinessScore = ({ analysis }: ReadinessScoreProps) => (
  <div className="rounded-xl border bg-card p-5">
    <div className="flex flex-wrap items-center gap-6">
      <div className="flex items-center gap-4">
        <div className="relative flex size-20 items-center justify-center">
          <svg
            aria-label={`Readiness score: ${analysis.readinessScore}%`}
            className="size-20 -rotate-90"
            role="img"
            viewBox="0 0 80 80"
          >
            <title>Readiness score: {analysis.readinessScore}%</title>
            <circle
              className="stroke-muted"
              cx="40"
              cy="40"
              fill="none"
              r="34"
              strokeWidth="6"
            />
            <circle
              className={scoreBg(analysis.readinessScore)}
              cx="40"
              cy="40"
              fill="none"
              r="34"
              strokeDasharray={`${2 * Math.PI * 34 * (analysis.readinessScore / 100)} ${2 * Math.PI * 34 * (1 - analysis.readinessScore / 100)}`}
              strokeLinecap="round"
              strokeWidth="6"
            />
          </svg>
          <span
            className={`absolute font-bold text-xl ${scoreColor(analysis.readinessScore)}`}
          >
            {analysis.readinessScore}%
          </span>
        </div>
        <div>
          <p className="font-semibold text-sm">
            {scoreLabel(analysis.readinessScore)}
          </p>
          <p className="text-muted-foreground text-xs">
            for {analysis.targetRole}
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-6 text-sm">
        <div>
          <span className="text-muted-foreground text-xs">Total Skills</span>
          <p className="font-medium">{analysis.totalSkills}</p>
        </div>
        <div>
          <span className="text-muted-foreground text-xs">Matched</span>
          <p className="font-medium text-emerald-600 dark:text-emerald-400">
            {analysis.matchedSkills}
          </p>
        </div>
        <div>
          <span className="text-muted-foreground text-xs">Gaps</span>
          <p className="font-medium text-red-600 dark:text-red-400">
            {analysis.missingSkills}
          </p>
        </div>
      </div>
    </div>
  </div>
);
