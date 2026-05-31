import { Badge } from "@repo/design-system/components/ui/badge";
import { Button } from "@repo/design-system/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@repo/design-system/components/ui/collapsible";
import {
  ChevronDownIcon,
  LightbulbIcon,
  MicIcon,
  PenIcon,
  SaveIcon,
} from "lucide-react";
import type { TechnicalQuestion } from "@/lib/jobs/interview-prep";

interface TechnicalQuestionCardProps {
  question: TechnicalQuestion;
}

const difficultyColor: Record<string, string> = {
  easy: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800",
  medium:
    "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800",
  hard: "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800",
};

const categoryLabel: Record<string, string> = {
  "system-design": "System Design",
  frontend: "Frontend",
  backend: "Backend",
  "data-structures": "Data Structures & Algorithms",
};

export const TechnicalQuestionCard = ({
  question,
}: TechnicalQuestionCardProps) => (
  <div className="rounded-xl border bg-card p-5 transition-all duration-150 ease-out hover:bg-accent/30">
    <div className="space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center rounded-md border px-1.5 py-0 font-medium text-[10px] uppercase tracking-wide ${difficultyColor[question.difficulty]}`}
            >
              {question.difficulty}
            </span>
            <span className="inline-flex items-center rounded-md border bg-muted px-2 py-0.5 font-medium text-[10px] text-muted-foreground uppercase tracking-wide">
              {categoryLabel[question.category] ?? question.category}
            </span>
          </div>
          <h3 className="font-medium text-sm leading-snug">
            {question.question}
          </h3>
        </div>
      </div>

      <div className="flex flex-wrap gap-1">
        {question.topics.map((topic) => (
          <Badge
            className="font-normal text-[10px] leading-none"
            key={topic}
            variant="secondary"
          >
            {topic}
          </Badge>
        ))}
      </div>

      {question.hints && question.hints.length > 0 && (
        <Collapsible className="space-y-3">
          <div className="flex items-center gap-2">
            <CollapsibleTrigger asChild>
              <Button
                className="h-7 gap-1 px-2.5 text-xs"
                size="sm"
                variant="outline"
              >
                <ChevronDownIcon className="size-3" />
                <LightbulbIcon className="size-3" />
                Hints
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent>
            <div className="space-y-2 rounded-lg border bg-muted/30 p-4">
              {question.hints.map((hint, idx) => (
                <p
                  className="flex items-start gap-2 text-muted-foreground text-xs"
                  key={hint}
                >
                  <span className="font-mono text-[10px] text-muted-foreground/50">
                    {idx + 1}.
                  </span>
                  {hint}
                </p>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      )}

      {question.sampleAnswer && (
        <Collapsible className="space-y-3">
          <div className="flex items-center gap-2">
            <CollapsibleTrigger asChild>
              <Button
                className="h-7 gap-1 px-2.5 text-xs"
                size="sm"
                variant="outline"
              >
                <ChevronDownIcon className="size-3" />
                Sample Answer
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent>
            <div className="rounded-lg border bg-muted/30 p-4">
              <p className="text-muted-foreground text-xs leading-relaxed">
                {question.sampleAnswer}
              </p>
            </div>
          </CollapsibleContent>
        </Collapsible>
      )}

      <div className="flex flex-wrap items-center gap-2 border-border/50 border-t pt-3">
        <Button
          className="h-7 gap-1 px-2.5 text-xs"
          disabled
          size="sm"
          title="Not available — demo placeholder"
          variant="default"
        >
          <MicIcon className="size-3" />
          Practice Answer
        </Button>
        <Button
          className="h-7 gap-1 px-2.5 text-xs"
          disabled
          size="sm"
          title="Not available — demo placeholder"
          variant="outline"
        >
          <PenIcon className="size-3" />
          Write Answer
        </Button>
        <Button
          className="h-7 gap-1 px-2.5 text-xs"
          disabled
          size="sm"
          title="Not available — demo placeholder"
          variant="secondary"
        >
          <SaveIcon className="size-3" />
          Save Notes
        </Button>
      </div>
    </div>
  </div>
);
