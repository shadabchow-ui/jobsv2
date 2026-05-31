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
  CopyIcon,
  DownloadIcon,
  FilePenLineIcon,
  FileTextIcon,
  PlusIcon,
  SparklesIcon,
  TargetIcon,
  TextIcon,
} from "lucide-react";
import { useState } from "react";
import {
  generatePlainText,
  listResumeVersions,
  mockJobPostings,
} from "@/lib/jobs";
import type { TailoringOutput } from "@/lib/jobs/resume-tailoring";
import { generateTailoringRecommendations } from "@/lib/jobs/resume-tailoring";
import { Header } from "../../components/header";
import { TailoringPanel } from "../components/tailoring-panel";

const ResumePage = () => {
  const [selectedVersionId, setSelectedVersionId] = useState("rv-1");
  const [showPlainText, setShowPlainText] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [tailoringOutput, setTailoringOutput] =
    useState<TailoringOutput | null>(null);

  const versions = listResumeVersions();
  const selectedVersion =
    versions.find((v) => v.id === selectedVersionId) ?? versions[0];

  const profile = selectedVersion.profile;
  const plainText = generatePlainText(profile);

  const scoreColor = (score: number) => {
    if (score >= 85) {
      return "text-emerald-500 stroke-emerald-500";
    }
    if (score >= 65) {
      return "text-amber-500 stroke-amber-500";
    }
    return "text-red-500 stroke-red-500";
  };

  const scoreLabel = (score: number): string => {
    if (score >= 85) {
      return "Strong resume — ready for most applications.";
    }
    if (score >= 65) {
      return "Decent foundation — review checklist items to improve.";
    }
    return "Needs work — address the checklist items below.";
  };

  const scoreRing = (score: number) => {
    const r = 54;
    const c = 2 * Math.PI * r;
    const offset = c - (score / 100) * c;
    return { circumference: c, offset };
  };

  const { circumference, offset } = scoreRing(profile.resumeScore);

  const handleTailorToJob = () => {
    const job = mockJobPostings.find((j) => j.id === selectedJobId);
    if (!job) {
      return;
    }
    const output = generateTailoringRecommendations({
      resume: profile,
      targetJob: {
        id: job.id,
        title: job.title,
        company: job.company,
        location: job.location,
        remoteType: job.location.toLowerCase().includes("remote")
          ? "Remote"
          : "On-site",
        employmentType: job.type ?? "Full-time",
        salary: job.salary,
        description: job.description,
        skills: job.category ? [job.category] : [],
        applyUrl: job.url,
      },
    });
    setTailoringOutput(output);
  };

  return (
    <>
      <Header page="Resume Builder" pages={["Jobs Console", "Jobs"]} />
      <div className="flex flex-1 animate-fade-in flex-col gap-6 p-6 pt-0">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <h1 className="font-semibold text-2xl tracking-tight">
              Resume Builder
            </h1>
            <p className="text-muted-foreground text-sm">
              Build, tailor, and manage your resumes for each application.
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Button
              className="gap-1.5 text-xs"
              disabled
              size="sm"
              variant="outline"
            >
              <DownloadIcon className="size-3.5" />
              Export PDF
            </Button>
            <Button className="gap-1.5 text-xs" disabled size="sm">
              <SparklesIcon className="size-3.5" />
              Improve Bullets
            </Button>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-4">
          <div className="flex flex-col gap-4 xl:col-span-1">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Versions</CardTitle>
                  <Button
                    className="gap-1.5 text-xs"
                    disabled
                    size="sm"
                    variant="ghost"
                  >
                    <PlusIcon className="size-3.5" />
                    New
                  </Button>
                </div>
                <CardDescription>
                  {versions.length} resume version
                  {versions.length !== 1 ? "s" : ""}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {versions.map((v) => (
                  <button
                    className={cn(
                      "w-full rounded-lg border bg-card p-3 text-left text-xs transition-all",
                      selectedVersionId === v.id
                        ? "border-primary/50 bg-primary/5 shadow-sm"
                        : "hover:bg-accent/50 hover:shadow-sm"
                    )}
                    key={v.id}
                    onClick={() => {
                      setSelectedVersionId(v.id);
                      setShowPlainText(false);
                    }}
                    type="button"
                  >
                    <p className="font-medium">{v.label}</p>
                    <p className="mt-0.5 text-muted-foreground">
                      {v.targetRole}
                    </p>
                    <p className="mt-1 text-[10px] text-muted-foreground/50">
                      Updated{" "}
                      {new Date(v.updatedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </button>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Export</CardTitle>
                <CardDescription>
                  Download your resume in supported formats.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  className="w-full gap-1.5 text-xs"
                  disabled
                  size="sm"
                  variant="outline"
                >
                  <DownloadIcon className="size-3.5" />
                  Export as PDF
                </Button>
                <div className="rounded-lg border border-dashed bg-muted/20 px-3 py-2">
                  <p className="text-[10px] text-muted-foreground/60 leading-relaxed">
                    PDF and DOCX export are not yet available. A plain text
                    preview is available below.
                  </p>
                </div>
                <Button
                  className="w-full gap-1.5 text-xs"
                  onClick={() => setShowPlainText(!showPlainText)}
                  size="sm"
                  variant={showPlainText ? "default" : "secondary"}
                >
                  <TextIcon className="size-3.5" />
                  {showPlainText ? "Hide Plain Text" : "Preview Plain Text"}
                </Button>
                <Button
                  className="w-full gap-1.5 text-xs"
                  disabled
                  size="sm"
                  variant="outline"
                >
                  <CopyIcon className="size-3.5" />
                  Copy to Clipboard
                </Button>
              </CardContent>
            </Card>

            {showPlainText && (
              <Card>
                <CardHeader>
                  <CardTitle>Plain Text Preview</CardTitle>
                  <CardDescription>
                    {plainText.lineCount} lines · {plainText.wordCount} words
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <pre className="max-h-96 overflow-auto whitespace-pre-wrap rounded-lg bg-muted p-4 font-mono text-[11px] text-foreground/80 leading-relaxed">
                    {plainText.text}
                  </pre>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="flex flex-col gap-6 xl:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <CardTitle>{profile.fullName}</CardTitle>
                      <Badge className="text-[10px]" variant="outline">
                        {selectedVersion.label}
                      </Badge>
                    </div>
                    <CardDescription>
                      {profile.email} · {profile.phone} · {profile.location}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <TargetIcon className="size-3.5 text-muted-foreground" />
                    <span className="font-medium text-muted-foreground text-xs">
                      {profile.targetRole}
                    </span>
                  </div>
                </div>
                <div className="mt-2 text-muted-foreground text-xs">
                  {profile.linkedIn && (
                    <span className="mr-3">{profile.linkedIn}</span>
                  )}
                  {profile.portfolio && <span>{profile.portfolio}</span>}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {profile.summary}
                </p>

                {profile.sections.map((section) => (
                  <div className="space-y-3" key={section.id}>
                    <h3 className="font-medium text-muted-foreground text-xs uppercase tracking-wider">
                      {section.title}
                    </h3>
                    {section.items.map((item) => (
                      <div
                        className="rounded-lg border bg-card p-4"
                        key={item.id}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="font-medium text-sm">{item.title}</p>
                            {item.subtitle && (
                              <p className="text-muted-foreground text-xs">
                                {item.subtitle}
                              </p>
                            )}
                          </div>
                          {item.date && (
                            <span className="shrink-0 text-muted-foreground text-xs">
                              {item.date}
                            </span>
                          )}
                        </div>
                        {item.description && (
                          <p className="mt-1.5 text-muted-foreground text-xs leading-relaxed">
                            {item.description}
                          </p>
                        )}
                        {item.highlights.length > 0 && (
                          <ul className="mt-2 space-y-1">
                            {item.highlights.map((h) => (
                              <li
                                className="flex items-start gap-2 text-muted-foreground text-xs"
                                key={h}
                              >
                                <span className="mt-1.5 block size-1 shrink-0 rounded-full bg-muted-foreground/40" />
                                {h}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="grid gap-6 xl:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Resume Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center gap-3">
                    <div className="relative flex items-center justify-center">
                      <svg
                        aria-label={`Resume score: ${profile.resumeScore}%`}
                        className={scoreColor(profile.resumeScore)}
                        fill="none"
                        height="128"
                        role="img"
                        viewBox="0 0 120 120"
                        width="128"
                      >
                        <title>Resume score: {profile.resumeScore}%</title>
                        <circle
                          className="stroke-muted"
                          cx="60"
                          cy="60"
                          fill="none"
                          r="54"
                          strokeWidth="8"
                        />
                        <circle
                          className={scoreColor(profile.resumeScore)}
                          cx="60"
                          cy="60"
                          fill="none"
                          r="54"
                          strokeDasharray={circumference}
                          strokeDashoffset={offset}
                          strokeLinecap="round"
                          strokeWidth="8"
                          transform="rotate(-90 60 60)"
                        />
                      </svg>
                      <span className="absolute font-bold text-2xl">
                        {profile.resumeScore}%
                      </span>
                    </div>
                    <p className="text-center text-muted-foreground text-xs">
                      {scoreLabel(profile.resumeScore)}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Resume Actions</CardTitle>
                  <CardDescription>
                    Duplicate or tailor this version.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button
                    className="w-full gap-1.5 text-xs"
                    disabled
                    size="sm"
                    variant="outline"
                  >
                    <CopyIcon className="size-3.5" />
                    Duplicate Version
                  </Button>
                  <Button
                    className="w-full gap-1.5 text-xs"
                    disabled
                    size="sm"
                    variant="outline"
                  >
                    <FilePenLineIcon className="size-3.5" />
                    Edit Resume
                  </Button>

                  <div className="space-y-1.5">
                    <label className="sr-only" htmlFor="tailor-job-select">
                      Select a job to tailor resume to
                    </label>
                    <select
                      className="w-full rounded-md border bg-background px-2.5 py-1.5 text-xs"
                      id="tailor-job-select"
                      onChange={(e) => setSelectedJobId(e.target.value || null)}
                      value={selectedJobId ?? ""}
                    >
                      <option value="">Select a job…</option>
                      {mockJobPostings.map((j) => (
                        <option key={j.id} value={j.id}>
                          {j.title} at {j.company}
                        </option>
                      ))}
                    </select>
                    <Button
                      className="w-full gap-1.5 text-xs"
                      disabled={!selectedJobId}
                      onClick={handleTailorToJob}
                      size="sm"
                      variant="secondary"
                    >
                      <SparklesIcon className="size-3.5" />
                      Tailor to Job
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {tailoringOutput && (
                <TailoringPanel
                  onClose={() => setTailoringOutput(null)}
                  output={tailoringOutput}
                  targetCompany={
                    mockJobPostings.find((j) => j.id === selectedJobId)
                      ?.company ?? ""
                  }
                  targetJobTitle={
                    mockJobPostings.find((j) => j.id === selectedJobId)
                      ?.title ?? ""
                  }
                />
              )}
            </div>

            <div className="grid gap-6 xl:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Readiness Checklist</CardTitle>
                  <CardDescription>Track resume quality items.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-3 text-[11px] text-muted-foreground/60">
                    Manage checklist items per version (not yet persisted).
                  </p>
                  <div className="rounded-lg border border-dashed bg-muted/20 px-4 py-6 text-center">
                    <FileTextIcon className="mx-auto mb-2 size-6 text-muted-foreground/40" />
                    <p className="text-muted-foreground text-xs" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>ATS Keyword Check</CardTitle>
                  <CardDescription>
                    Compare your resume against a target job description.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed bg-muted/30 px-4 py-6 text-center">
                    <FilePenLineIcon className="size-8 text-muted-foreground/40" />
                    <p className="text-muted-foreground text-xs">
                      Paste a job description to check keyword match rate and
                      identify missing terms.
                    </p>
                    <Button disabled size="sm" variant="outline">
                      Analyze Job Description
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <p className="text-[10px] text-muted-foreground/50">
              Resume versions and edits are currently stored in-memory and will
              reset on reload. Real persistence and PDF/DOCX export are not yet
              implemented.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResumePage;
