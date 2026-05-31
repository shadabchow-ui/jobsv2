import type { Metadata } from "next";
import { mockSkillGapAnalysis } from "@/lib/jobs/skill-gaps";
import { Header } from "../../components/header";
import { ReadinessScore } from "../components/readiness-score";
import { SkillGapCard } from "../components/skill-gap-card";

export const metadata: Metadata = {
  title: "Skill Gaps — Jobs",
  description: "Identify skill gaps and get recommended actions.",
};

const importanceOrder: Record<string, number> = {
  critical: 0,
  important: 1,
  "nice-to-have": 2,
};

const levelOrder: Record<string, number> = {
  none: 0,
  beginner: 1,
  intermediate: 2,
  advanced: 3,
  expert: 4,
};

const SkillGapsPage = () => {
  const analysis = mockSkillGapAnalysis;

  const sortedSkills = [...analysis.skills].sort(
    (a, b) =>
      (importanceOrder[a.importance] ?? 99) -
        (importanceOrder[b.importance] ?? 99) ||
      (levelOrder[a.currentLevel] ?? 99) - (levelOrder[b.currentLevel] ?? 99)
  );

  const gapSkills = sortedSkills.filter((s) => levelOrder[s.currentLevel] < 3);
  const matchedSkills = sortedSkills.filter(
    (s) => levelOrder[s.currentLevel] >= 3
  );

  return (
    <>
      <Header page="Skill Gaps" pages={["Jobs Console", "Jobs"]} />
      <div className="flex flex-1 animate-fade-in flex-col gap-6 p-6 pt-0">
        <div className="space-y-1">
          <h1 className="font-semibold text-2xl tracking-tight">Skill Gaps</h1>
          <p className="text-muted-foreground text-sm">
            Skills analysis for{" "}
            <span className="font-medium text-foreground">
              {analysis.targetRole}
            </span>
            . Use the recommendations to build a targeted learning plan.
          </p>
        </div>

        <ReadinessScore analysis={analysis} />

        <div className="grid gap-6 xl:grid-cols-2">
          <div className="flex flex-col gap-3">
            <h2 className="font-medium text-muted-foreground text-xs uppercase tracking-wider">
              Gaps to Address ({gapSkills.length})
            </h2>
            <div className="flex flex-col gap-3">
              {gapSkills.map((skill) => (
                <SkillGapCard key={skill.skill} skill={skill} />
              ))}
              {gapSkills.length === 0 && (
                <p className="text-muted-foreground text-sm">
                  No significant gaps found — great fit for this role!
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="font-medium text-muted-foreground text-xs uppercase tracking-wider">
              Matched Skills ({matchedSkills.length})
            </h2>
            <div className="flex flex-col gap-3">
              {matchedSkills.map((skill) => (
                <SkillGapCard key={skill.skill} skill={skill} />
              ))}
              {matchedSkills.length === 0 && (
                <p className="text-muted-foreground text-sm">
                  No matched skills yet.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SkillGapsPage;
