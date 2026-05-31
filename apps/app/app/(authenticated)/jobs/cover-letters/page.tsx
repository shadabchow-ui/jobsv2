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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/design-system/components/ui/select";
import {
  AlertTriangleIcon,
  CircleCheckIcon,
  CircleXIcon,
  FileTextIcon,
  MailIcon,
  MessageSquareIcon,
  SaveIcon,
  SparklesIcon,
} from "lucide-react";
import { useState } from "react";
import type { CoverLetterInput, CoverLetterTone } from "@/lib/jobs";
import {
  coverLetterAiStatus,
  generateCoverLetterChecklist,
  generateMockCoverLetter,
  mockCoverLetterDrafts,
  mockResumeProfile,
  mockToneOptions,
} from "@/lib/jobs";
import { Header } from "../../components/header";

const CoverLettersPage = () => {
  const defaultDraft = mockCoverLetterDrafts[0];
  const [selectedTone, setSelectedTone] = useState<CoverLetterTone>(
    defaultDraft.tone
  );
  const [activeDraftId, setActiveDraftId] = useState(defaultDraft.id);
  const [generationJob, setGenerationJob] = useState("");
  const [generationCompany, setGenerationCompany] = useState("");
  const [showGenerationPanel, setShowGenerationPanel] = useState(false);
  const [generatedDraft, setGeneratedDraft] = useState<{
    body: string;
    checklist: { id: string; label: string; checked: boolean }[];
    warnings: string[];
  } | null>(null);

  const activeDraft =
    mockCoverLetterDrafts.find((d) => d.id === activeDraftId) ?? defaultDraft;

  const toneLabel =
    mockToneOptions.find((t) => t.value === selectedTone)?.label ??
    "Professional";
  const toneDescription =
    mockToneOptions.find((t) => t.value === selectedTone)?.description ?? "";

  const totalChecklist = activeDraft.personalizationNotes.length;
  const checkedChecklist = activeDraft.personalizationNotes.filter(
    (c) => c.checked
  ).length;

  const handleGenerate = () => {
    const profile = mockResumeProfile;
    const resumeSkills =
      profile.sections
        .find((s) => s.title === "Skills")
        ?.items.flatMap((i) => i.highlights) ?? [];
    const input: CoverLetterInput = {
      jobTitle: generationJob,
      company: generationCompany,
      jobDescription: "not provided",
      tone: selectedTone,
      userFullName: profile.fullName,
      userSummary: profile.summary,
      userSkills: resumeSkills,
      userHighlights:
        profile.sections
          .find((s) => s.id === "experience")
          ?.items.flatMap((i) => i.highlights) ?? [],
    };

    const result = generateMockCoverLetter(input);
    const checklist = generateCoverLetterChecklist(input);

    setGeneratedDraft({
      body: result.body,
      checklist,
      warnings: result.warnings,
    });
  };

  return (
    <>
      <Header page="Cover Letters" pages={["Jobs Console", "Jobs"]} />
      <div className="flex flex-1 animate-fade-in flex-col gap-6 p-6 pt-0">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <h1 className="font-semibold text-2xl tracking-tight">
              Cover Letters
            </h1>
            <p className="text-muted-foreground text-sm">
              Write and manage cover letters for your applications.
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Button
              className="gap-1.5 text-xs"
              disabled
              size="sm"
              variant="outline"
            >
              <SaveIcon className="size-3.5" />
              Save to Application
            </Button>
            <Button
              className="gap-1.5 text-xs"
              onClick={() => setShowGenerationPanel(!showGenerationPanel)}
              size="sm"
              variant={showGenerationPanel ? "default" : "outline"}
            >
              <SparklesIcon className="size-3.5" />
              {showGenerationPanel ? "Close Generator" : "Generate Draft"}
            </Button>
          </div>
        </div>

        {showGenerationPanel && (
          <Card className="border-primary/30 bg-primary/[0.03]">
            <CardHeader>
              <div className="flex items-center gap-2">
                <SparklesIcon className="size-4 text-primary" />
                <CardTitle>Generate Cover Letter</CardTitle>
              </div>
              <CardDescription>
                Enter a target job and company. The draft will be based on your
                resume profile and selected tone.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-1.5">
                  <span className="text-muted-foreground text-xs">
                    Job Title
                  </span>
                  <input
                    className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                    onChange={(e) => setGenerationJob(e.target.value)}
                    placeholder="e.g. Senior Frontend Engineer"
                    value={generationJob}
                  />
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="text-muted-foreground text-xs">Company</span>
                  <input
                    className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                    onChange={(e) => setGenerationCompany(e.target.value)}
                    placeholder="e.g. Acme Corp"
                    value={generationCompany}
                  />
                </label>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  className="gap-1.5 text-xs"
                  disabled={!(generationJob && generationCompany)}
                  onClick={handleGenerate}
                  size="sm"
                >
                  <SparklesIcon className="size-3.5" />
                  Generate
                </Button>
                <span className="text-[10px] text-muted-foreground/60">
                  AI provider: {coverLetterAiStatus} — template-based draft will
                  be generated
                </span>
              </div>

              {generatedDraft && (
                <div className="space-y-4">
                  {generatedDraft.warnings.length > 0 && (
                    <div className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-amber-800 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-200">
                      <AlertTriangleIcon className="mt-0.5 size-4 shrink-0" />
                      <div className="space-y-0.5">
                        {generatedDraft.warnings.map((w) => (
                          <p className="text-[11px]" key={w}>
                            {w}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="whitespace-pre-wrap rounded-lg border bg-card p-4 font-sans text-sm leading-relaxed">
                    {generatedDraft.body}
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">
                        Grounding Checklist
                      </CardTitle>
                      <CardDescription>
                        Review each item before using this draft.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {generatedDraft.checklist.map((item) => (
                          <div className="flex items-start gap-2" key={item.id}>
                            {item.checked ? (
                              <CircleCheckIcon className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                            ) : (
                              <CircleXIcon className="mt-0.5 size-4 shrink-0 text-muted-foreground/40" />
                            )}
                            <span
                              className={
                                item.checked
                                  ? "text-muted-foreground text-xs line-through"
                                  : "text-foreground text-xs"
                              }
                            >
                              {item.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        <div className="grid gap-6 xl:grid-cols-3">
          <div className="flex flex-col gap-6 xl:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <CardTitle>
                      {activeDraft.targetJobTitle} at{" "}
                      {activeDraft.targetCompany}
                    </CardTitle>
                    <CardDescription>
                      Tone: {toneLabel} · Draft last updated today
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg bg-muted/30 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="font-medium text-muted-foreground text-xs uppercase tracking-wider">
                      Draft Preview
                    </h3>
                    <div className="flex items-center gap-1.5">
                      <span className="text-muted-foreground text-xs">
                        Version 1
                      </span>
                    </div>
                  </div>
                  <div className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                    {activeDraft.body}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-wrap gap-2">
              <Button disabled size="sm" variant="outline">
                <FileTextIcon className="size-3.5" />
                Short Email Version
              </Button>
              <Button disabled size="sm" variant="outline">
                <MessageSquareIcon className="size-3.5" />
                Copy to Clipboard
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Other Drafts</CardTitle>
                <CardDescription>
                  Switch between cover letter drafts for different applications.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {mockCoverLetterDrafts.length > 1 ? (
                  <div className="grid gap-3 sm:grid-cols-2">
                    {mockCoverLetterDrafts
                      .filter((d) => d.id !== activeDraftId)
                      .map((draft) => (
                        <button
                          className="flex items-start gap-3 rounded-lg border bg-card p-3 text-left transition-colors hover:bg-accent/50"
                          key={draft.id}
                          onClick={() => {
                            setActiveDraftId(draft.id);
                            setSelectedTone(draft.tone);
                          }}
                          type="button"
                        >
                          <MailIcon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                          <div className="min-w-0 flex-1">
                            <p className="truncate font-medium text-sm">
                              {draft.targetCompany}
                            </p>
                            <p className="truncate text-muted-foreground text-xs">
                              {draft.targetJobTitle}
                            </p>
                          </div>
                        </button>
                      ))}
                  </div>
                ) : (
                  <p className="py-4 text-center text-muted-foreground text-xs">
                    Generate additional drafts for your other applications.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Tone</CardTitle>
                <CardDescription>
                  Adjust the writing style of your cover letter.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Select
                  onValueChange={(v) => setSelectedTone(v as CoverLetterTone)}
                  value={selectedTone}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select tone" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockToneOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  {toneDescription}
                </p>
                <p className="font-medium text-[11px] text-amber-600 dark:text-amber-400">
                  Tone selection is a preview. AI provider is{" "}
                  {coverLetterAiStatus}.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Personalization</CardTitle>
                <CardDescription>
                  {checkedChecklist} of {totalChecklist} items done
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {activeDraft.personalizationNotes.map((item) => (
                    <div className="flex items-start gap-2" key={item.id}>
                      {item.checked ? (
                        <CircleCheckIcon className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                      ) : (
                        <CircleXIcon className="mt-0.5 size-4 shrink-0 text-muted-foreground/40" />
                      )}
                      <span
                        className={
                          item.checked
                            ? "text-muted-foreground text-xs line-through"
                            : "text-foreground text-xs"
                        }
                      >
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default CoverLettersPage;
