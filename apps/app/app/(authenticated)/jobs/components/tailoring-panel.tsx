"use client";

import { Badge } from "@repo/design-system/components/ui/badge";
import { Button } from "@repo/design-system/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/design-system/components/ui/card";
import { cn } from "@repo/design-system/lib/utils";
import {
  AlertTriangleIcon,
  ArrowRightIcon,
  CheckIcon,
  FileTextIcon,
  LightbulbIcon,
  ListIcon,
  SparklesIcon,
  TargetIcon,
  XIcon,
} from "lucide-react";
import { useState } from "react";
import type { TailoringOutput } from "@/lib/jobs/resume-tailoring";

interface TailoringPanelProps {
  onClose: () => void;
  output: TailoringOutput;
  targetCompany: string;
  targetJobTitle: string;
}

export const TailoringPanel = ({
  output,
  onClose,
  targetJobTitle,
  targetCompany,
}: TailoringPanelProps) => {
  const [acceptedSummary, setAcceptedSummary] = useState(false);

  return (
    <Card className="border-primary/30 transition-all duration-150 ease-out">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
              <SparklesIcon className="size-4.5 text-primary" />
            </div>
            <div className="space-y-0.5">
              <CardTitle className="text-base">Tailoring Suggestions</CardTitle>
              <CardDescription>
                Proposed changes for{" "}
                <span className="font-medium text-foreground">
                  {targetJobTitle}
                </span>{" "}
                at{" "}
                <span className="font-medium text-foreground">
                  {targetCompany}
                </span>
              </CardDescription>
            </div>
          </div>
          <Button
            aria-label="Close tailoring panel"
            onClick={onClose}
            size="icon-sm"
            title="Close tailoring panel"
            variant="ghost"
          >
            <XIcon className="size-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="rounded-lg border bg-muted/20 px-3 py-2">
          <p className="flex items-start gap-2 text-[11px] text-muted-foreground leading-relaxed">
            <AlertTriangleIcon className="mt-0.5 size-3 shrink-0 text-amber-500" />
            These are proposed changes requiring your review. Nothing is
            auto-applied to your resume. AI-assisted generation is not provided.
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <TargetIcon className="size-3.5 text-primary" />
            <h3 className="font-medium text-foreground text-xs uppercase tracking-wider">
              Match Summary
            </h3>
          </div>
          <div className="rounded-lg border bg-card p-3">
            <p className="text-muted-foreground text-xs leading-relaxed">
              {output.summary}
            </p>
          </div>
        </div>

        {output.skillGaps.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <ListIcon className="size-3.5 text-primary" />
              <h3 className="font-medium text-foreground text-xs uppercase tracking-wider">
                Skill Gaps
              </h3>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {output.skillGaps.map((skill) => (
                <Badge key={skill} variant="destructive">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {output.suggestedSkillsToAdd.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <LightbulbIcon className="size-3.5 text-primary" />
              <h3 className="font-medium text-foreground text-xs uppercase tracking-wider">
                Suggested Skills to Highlight
              </h3>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {output.suggestedSkillsToAdd.map((skill) => (
                <Badge
                  className="border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                  key={skill}
                  variant="outline"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {output.keywordGaps.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <FileTextIcon className="size-3.5 text-primary" />
              <h3 className="font-medium text-foreground text-xs uppercase tracking-wider">
                Keyword Gaps
              </h3>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {output.keywordGaps.map((kw) => (
                <Badge key={kw} variant="outline">
                  {kw}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {output.sectionSuggestions.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <FileTextIcon className="size-3.5 text-primary" />
              <h3 className="font-medium text-foreground text-xs uppercase tracking-wider">
                Bullet Point Suggestions
              </h3>
            </div>
            {output.sectionSuggestions.map((section) => (
              <div className="space-y-2" key={section.heading}>
                <p className="font-medium text-muted-foreground text-xs uppercase tracking-wider">
                  {section.heading}
                </p>
                {section.bullets.map((bullet) => (
                  <div
                    className="overflow-hidden rounded-lg border bg-card"
                    key={bullet.current}
                  >
                    <div className="border-b bg-muted/20 px-3 py-2">
                      <p className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                        <span className="size-1.5 rounded-full bg-muted-foreground/40" />
                        Current
                      </p>
                      <p className="mt-0.5 text-muted-foreground text-xs leading-relaxed">
                        {bullet.current}
                      </p>
                    </div>
                    <div className="px-3 py-2">
                      <p className="flex items-center gap-1.5 font-medium text-[11px]">
                        <ArrowRightIcon className="size-3 text-primary" />
                        Suggested rewrite
                      </p>
                      <p className="mt-0.5 text-xs leading-relaxed">
                        {bullet.suggestion}
                      </p>
                    </div>
                    <div className="border-t bg-amber-500/5 px-3 py-1.5">
                      <p className="text-[10px] text-muted-foreground leading-relaxed">
                        {bullet.reason}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-2">
          <Button
            className={cn(
              "gap-1.5 text-xs",
              acceptedSummary && "bg-emerald-600 hover:bg-emerald-700"
            )}
            onClick={() => setAcceptedSummary(!acceptedSummary)}
            size="sm"
            variant={acceptedSummary ? "default" : "outline"}
          >
            {acceptedSummary ? (
              <CheckIcon className="size-3.5" />
            ) : (
              <CheckIcon className="size-3.5" />
            )}
            {acceptedSummary ? "Suggestions Reviewed" : "Mark as Reviewed"}
          </Button>
          <Button
            className="gap-1.5 text-xs"
            disabled
            size="sm"
            variant="ghost"
          >
            Apply to Resume Copy
          </Button>
        </div>

        {output.warnings.length > 0 && (
          <div className="space-y-1.5">
            {output.warnings.map((w) => (
              <p
                className="flex items-start gap-1.5 text-[10px] text-muted-foreground/50 leading-relaxed"
                key={w}
              >
                <span className="mt-0.5 block size-1 shrink-0 rounded-full bg-muted-foreground/30" />
                {w}
              </p>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
