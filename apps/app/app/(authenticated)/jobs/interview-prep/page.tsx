"use client";

import { Button } from "@repo/design-system/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/design-system/components/ui/card";
import {
  AlertTriangleIcon,
  MicIcon,
  PenIcon,
  SaveIcon,
  SparklesIcon,
} from "lucide-react";
import { useState } from "react";
import {
  generateMockBehavioralQuestions,
  generateMockQuestionsToAsk,
  generateMockStarOutline,
  generateMockTechnicalQuestions,
  interviewAiStatus,
  mockInterviewPrep,
  mockResumeProfile,
} from "@/lib/jobs";
import type { InterviewPrepInput } from "@/lib/jobs/interview-generation";
import { Header } from "../../components/header";
import { BehavioralQuestionCard } from "../components/behavioral-question-card";
import { TechnicalQuestionCard } from "../components/technical-question-card";

const InterviewPrepPage = () => {
  const prep = mockInterviewPrep;
  const [showGenerator, setShowGenerator] = useState(false);
  const [genCompany, setGenCompany] = useState("");
  const [genRole, setGenRole] = useState("");
  const [generatedQuestions, setGeneratedQuestions] = useState<{
    behavioral: typeof prep.behavioralQuestions;
    technical: typeof prep.technicalQuestions;
    ask: typeof prep.questionsToAsk;
    warnings: string[];
  } | null>(null);
  const [starQuestion, setStarQuestion] = useState("");
  const [starOutline, setStarOutline] = useState<{
    situation: string;
    task: string;
    action: string;
    result: string;
    warnings: string[];
  } | null>(null);

  const handleGenerate = () => {
    const profile = mockResumeProfile;
    const resumeSkills =
      profile.sections
        .find((s) => s.title === "Skills")
        ?.items.flatMap((i) => i.highlights) ?? [];
    const input: InterviewPrepInput = {
      company: genCompany,
      role: genRole,
      jobDescription: "not provided",
      userSkills: resumeSkills,
      userSummary: profile.summary,
      userHighlights:
        profile.sections
          .find((s) => s.id === "experience")
          ?.items.flatMap((i) => i.highlights) ?? [],
    };

    const warnings: string[] = [];
    if (interviewAiStatus === "not provided") {
      warnings.push(
        "AI generation is not configured. Questions are template-based."
      );
    }

    setGeneratedQuestions({
      behavioral: generateMockBehavioralQuestions(input),
      technical: generateMockTechnicalQuestions(input),
      ask: generateMockQuestionsToAsk(input),
      warnings,
    });
  };

  const handleStarOutline = () => {
    const profile = mockResumeProfile;
    const highlights =
      profile.sections
        .find((s) => s.id === "experience")
        ?.items.flatMap((i) => i.highlights) ?? [];

    const result = generateMockStarOutline(starQuestion, highlights);
    setStarOutline({
      situation: result.starOutline.situation,
      task: result.starOutline.task,
      action: result.starOutline.action,
      result: result.starOutline.result,
      warnings: result.warnings,
    });
  };

  const displayBehavioral = generatedQuestions
    ? generatedQuestions.behavioral
    : prep.behavioralQuestions;
  const displayTechnical = generatedQuestions
    ? generatedQuestions.technical
    : prep.technicalQuestions;
  const displayAsk = generatedQuestions
    ? generatedQuestions.ask
    : prep.questionsToAsk;

  return (
    <>
      <Header page="Interview Prep" pages={["Jobs Console", "Jobs"]} />
      <div className="flex flex-1 animate-fade-in flex-col gap-6 p-6 pt-0">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <h1 className="font-semibold text-2xl tracking-tight">
              Interview Prep
            </h1>
            <p className="text-muted-foreground text-sm">
              Prepare for your interview at{" "}
              <span className="font-medium text-foreground">
                {prep.company}
              </span>{" "}
              for{" "}
              <span className="font-medium text-foreground">{prep.role}</span>.
            </p>
          </div>
          <Button
            className="gap-1.5 text-xs"
            onClick={() => setShowGenerator(!showGenerator)}
            size="sm"
            variant={showGenerator ? "default" : "outline"}
          >
            <SparklesIcon className="size-3.5" />
            {showGenerator ? "Close Generator" : "Generate Questions"}
          </Button>
        </div>

        {showGenerator && (
          <Card className="border-primary/30 bg-primary/[0.03]">
            <CardHeader>
              <div className="flex items-center gap-2">
                <SparklesIcon className="size-4 text-primary" />
                <CardTitle>Generate Interview Questions</CardTitle>
              </div>
              <CardDescription>
                Enter a company and role. Questions will be generated based on
                the role type and your resume profile. AI provider:{" "}
                {interviewAiStatus}.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-1.5">
                  <span className="text-muted-foreground text-xs">Company</span>
                  <input
                    className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                    onChange={(e) => setGenCompany(e.target.value)}
                    placeholder="e.g. Stripe"
                    value={genCompany}
                  />
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="text-muted-foreground text-xs">Role</span>
                  <input
                    className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                    onChange={(e) => setGenRole(e.target.value)}
                    placeholder="e.g. Engineering Manager — Platform"
                    value={genRole}
                  />
                </label>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  className="gap-1.5 text-xs"
                  disabled={!(genCompany && genRole)}
                  onClick={handleGenerate}
                  size="sm"
                >
                  <SparklesIcon className="size-3.5" />
                  Generate
                </Button>
                <span className="text-[10px] text-muted-foreground/60">
                  Questions use template patterns based on role type
                </span>
              </div>

              {generatedQuestions?.warnings && (
                <div className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-amber-800 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-200">
                  <AlertTriangleIcon className="mt-0.5 size-4 shrink-0" />
                  <div className="space-y-0.5">
                    {generatedQuestions.warnings.map((w) => (
                      <p className="text-[11px]" key={w}>
                        {w}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        <div className="rounded-xl border bg-card p-4">
          <h2 className="mb-2 font-medium text-[11px] text-muted-foreground uppercase tracking-wider">
            Application Context
          </h2>
          <div className="flex flex-wrap gap-6 text-sm">
            <div>
              <span className="text-muted-foreground text-xs">Company</span>
              <p className="font-medium">{prep.company}</p>
            </div>
            <div>
              <span className="text-muted-foreground text-xs">Role</span>
              <p className="font-medium">{prep.role}</p>
            </div>
            <div>
              <span className="text-muted-foreground text-xs">Status</span>
              <p className="font-medium capitalize">{prep.status}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="space-y-3">
            <h2 className="font-medium text-muted-foreground text-xs uppercase tracking-wider">
              Behavioral Questions ({displayBehavioral.length})
            </h2>
            <div className="grid gap-4">
              {displayBehavioral.map((q) => (
                <BehavioralQuestionCard key={q.id} question={q} />
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="font-medium text-muted-foreground text-xs uppercase tracking-wider">
              Technical Questions ({displayTechnical.length})
            </h2>
            <div className="grid gap-4">
              {displayTechnical.map((q) => (
                <TechnicalQuestionCard key={q.id} question={q} />
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="font-medium text-muted-foreground text-xs uppercase tracking-wider">
              Questions to Ask the Interviewer ({displayAsk.length})
            </h2>
            <div className="rounded-xl border bg-card p-4">
              <div className="flex flex-col gap-2">
                {displayAsk.map((q) => (
                  <div
                    className="flex items-start gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-accent/30"
                    key={q.id}
                  >
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded border bg-muted font-mono text-[10px] text-muted-foreground">
                      {q.id.split("-")[1]}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm">{q.question}</p>
                      <span className="text-muted-foreground text-xs capitalize">
                        {q.category}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <PenIcon className="size-4 text-muted-foreground" />
                <CardTitle>STAR Answer Practice</CardTitle>
              </div>
              <CardDescription>
                Generate a STAR outline for a practice question. Based on your
                resume data — does not invent experience.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <label className="sr-only" htmlFor="star-question">
                  STAR practice question
                </label>
                <input
                  className="min-w-0 flex-1 rounded-md border bg-background px-3 py-2 text-sm"
                  id="star-question"
                  onChange={(e) => setStarQuestion(e.target.value)}
                  placeholder="Paste a behavioral question or type one here..."
                  value={starQuestion}
                />
                <Button
                  className="shrink-0 gap-1.5 text-xs"
                  disabled={!starQuestion}
                  onClick={handleStarOutline}
                  size="sm"
                >
                  <SparklesIcon className="size-3.5" />
                  Generate STAR
                </Button>
              </div>

              {starOutline && (
                <div className="space-y-3">
                  {starOutline.warnings.length > 0 && (
                    <div className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-amber-800 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-200">
                      <AlertTriangleIcon className="mt-0.5 size-4 shrink-0" />
                      <div className="space-y-0.5">
                        {starOutline.warnings.map((w) => (
                          <p className="text-[11px]" key={w}>
                            {w}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-lg border bg-card p-3">
                      <span className="font-bold text-[10px] text-muted-foreground uppercase tracking-wider">
                        Situation
                      </span>
                      <p className="mt-1 text-muted-foreground text-xs">
                        {starOutline.situation}
                      </p>
                    </div>
                    <div className="rounded-lg border bg-card p-3">
                      <span className="font-bold text-[10px] text-muted-foreground uppercase tracking-wider">
                        Task
                      </span>
                      <p className="mt-1 text-muted-foreground text-xs">
                        {starOutline.task}
                      </p>
                    </div>
                    <div className="rounded-lg border bg-card p-3">
                      <span className="font-bold text-[10px] text-muted-foreground uppercase tracking-wider">
                        Action
                      </span>
                      <p className="mt-1 text-muted-foreground text-xs">
                        {starOutline.action}
                      </p>
                    </div>
                    <div className="rounded-lg border bg-card p-3">
                      <span className="font-bold text-[10px] text-muted-foreground uppercase tracking-wider">
                        Result
                      </span>
                      <p className="mt-1 text-muted-foreground text-xs">
                        {starOutline.result}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button
                      className="gap-1.5 text-xs"
                      disabled
                      size="sm"
                      variant="default"
                    >
                      <MicIcon className="size-3.5" />
                      Practice Answer
                    </Button>
                    <Button
                      className="gap-1.5 text-xs"
                      disabled
                      size="sm"
                      variant="outline"
                    >
                      <SaveIcon className="size-3.5" />
                      Save Prep Notes
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default InterviewPrepPage;
