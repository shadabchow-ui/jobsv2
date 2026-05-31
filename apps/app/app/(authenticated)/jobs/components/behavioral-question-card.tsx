import { Button } from "@repo/design-system/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@repo/design-system/components/ui/collapsible";
import { ChevronDownIcon, MicIcon, PenIcon, SaveIcon } from "lucide-react";
import type { BehavioralQuestion } from "@/lib/jobs/interview-prep";

interface BehavioralQuestionCardProps {
  question: BehavioralQuestion;
}

const categoryLabel: Record<string, string> = {
  leadership: "Leadership",
  conflict: "Conflict Resolution",
  failure: "Failure & Learning",
  success: "Success Stories",
  teamwork: "Teamwork",
  initiative: "Initiative",
  growth: "Growth & Development",
};

export const BehavioralQuestionCard = ({
  question,
}: BehavioralQuestionCardProps) => (
  <div className="rounded-xl border bg-card p-5 transition-all duration-150 ease-out hover:bg-accent/30">
    <div className="space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <span className="inline-flex items-center rounded-md border bg-muted px-2 py-0.5 font-medium text-[10px] text-muted-foreground uppercase tracking-wide">
            {categoryLabel[question.category] ?? question.category}
          </span>
          <h3 className="font-medium text-sm leading-snug">
            {question.question}
          </h3>
        </div>
      </div>

      <Collapsible className="space-y-3">
        <div className="flex items-center gap-2">
          <CollapsibleTrigger asChild>
            <Button
              className="h-7 gap-1 px-2.5 text-xs"
              size="sm"
              variant="outline"
            >
              <ChevronDownIcon className="size-3" />
              STAR Outline
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent>
          <div className="space-y-3 rounded-lg border bg-muted/30 p-4">
            <p className="text-muted-foreground text-xs italic">
              {question.starPrompt}
            </p>
            {question.sampleSituation && (
              <div>
                <span className="font-bold text-[10px] text-muted-foreground uppercase tracking-wider">
                  Situation
                </span>
                <p className="text-muted-foreground text-xs">
                  {question.sampleSituation}
                </p>
              </div>
            )}
            {question.sampleTask && (
              <div>
                <span className="font-bold text-[10px] text-muted-foreground uppercase tracking-wider">
                  Task
                </span>
                <p className="text-muted-foreground text-xs">
                  {question.sampleTask}
                </p>
              </div>
            )}
            {question.sampleAction && (
              <div>
                <span className="font-bold text-[10px] text-muted-foreground uppercase tracking-wider">
                  Action
                </span>
                <p className="text-muted-foreground text-xs">
                  {question.sampleAction}
                </p>
              </div>
            )}
            {question.sampleResult && (
              <div>
                <span className="font-bold text-[10px] text-muted-foreground uppercase tracking-wider">
                  Result
                </span>
                <p className="text-muted-foreground text-xs">
                  {question.sampleResult}
                </p>
              </div>
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>

      <div className="flex flex-wrap items-center gap-2 border-border/50 border-t pt-3">
        <Button
          className="h-7 gap-1 px-2.5 text-xs"
          disabled
          size="sm"
          title="Not available — demo placeholder"
          variant="default"
        >
          <MicIcon className="size-3" />
          Start Mock Interview
        </Button>
        <Button
          className="h-7 gap-1 px-2.5 text-xs"
          disabled
          size="sm"
          title="Not available — demo placeholder"
          variant="outline"
        >
          <PenIcon className="size-3" />
          Improve Answer
        </Button>
        <Button
          className="h-7 gap-1 px-2.5 text-xs"
          disabled
          size="sm"
          title="Not available — demo placeholder"
          variant="secondary"
        >
          <SaveIcon className="size-3" />
          Save Prep Notes
        </Button>
      </div>
    </div>
  </div>
);
