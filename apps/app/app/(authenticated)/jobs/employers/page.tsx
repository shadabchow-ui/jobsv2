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
import {
  AlertTriangleIcon,
  BuildingIcon,
  CheckCircle2Icon,
  ExternalLinkIcon,
  FileTextIcon,
  MessageSquareIcon,
  SearchIcon,
  SparklesIcon,
  UserPlusIcon,
  UsersIcon,
} from "lucide-react";
import {
  mockCandidatePreviews,
  mockCandidateReadiness,
  mockEmployerSummary,
  mockJobPostingDrafts,
  mockSkillSignals,
} from "@/lib/jobs/employer-data";

const statusColor: Record<string, string> = {
  published: "bg-emerald-500/10 text-emerald-500",
  draft: "bg-amber-500/10 text-amber-500",
  closed: "bg-muted text-muted-foreground/60",
};

const stageColor: Record<string, string> = {
  Interview: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  Screened: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
  New: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
};

const EmployersPage = () => {
  const summary = mockEmployerSummary;

  return (
    <div className="flex flex-1 flex-col gap-6 p-6 pt-0">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="font-semibold text-2xl tracking-tight">Employers</h1>
          <p className="text-muted-foreground text-sm">
            Recruiter dashboard — review candidates, job postings, and skill
            evidence. All data is mock/static.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            className="gap-1.5 text-xs"
            disabled
            size="sm"
            variant="outline"
          >
            <UserPlusIcon className="size-3.5" />
            Create Job Post
          </Button>
          <Button
            className="gap-1.5 text-xs"
            disabled
            size="sm"
            variant="outline"
          >
            <SearchIcon className="size-3.5" />
            Search Candidates
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-amber-800 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-200">
        <AlertTriangleIcon className="size-4 shrink-0" />
        <span className="text-[11px] leading-relaxed">
          Employer accounts, RBAC, job posting publishing, and candidate
          messaging are not provided. This is a read-only mock scaffold.
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Active Postings</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="font-bold text-2xl tracking-tight">
              {summary.activeJobPostings}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Candidates</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="font-bold text-2xl tracking-tight">
              {summary.totalCandidates}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>New Applications</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="font-bold text-2xl tracking-tight">
              {summary.newApplications}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Interviews</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="font-bold text-2xl tracking-tight">
              {summary.interviewsScheduled}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <BuildingIcon className="size-4 text-muted-foreground" />
            <CardTitle>Application Pipeline</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {summary.pipelineStages.map((stage) => (
              <div
                className="flex flex-col items-center gap-1.5 rounded-lg border bg-card p-3"
                key={stage.id}
              >
                <span className="font-bold text-xl">{stage.count}</span>
                <span className="text-muted-foreground text-xs">
                  {stage.label}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileTextIcon className="size-4 text-muted-foreground" />
                <CardTitle>Job Posting Drafts</CardTitle>
              </div>
              <Button
                className="gap-1.5 text-xs"
                disabled
                size="sm"
                variant="ghost"
              >
                <ExternalLinkIcon className="size-3.5" />
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockJobPostingDrafts.map((posting) => (
              <div
                className="flex items-start justify-between gap-3 rounded-lg border bg-card p-3 transition-colors hover:bg-accent/30"
                key={posting.id}
              >
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{posting.title}</span>
                    <span
                      className={`inline-flex items-center rounded-full px-1.5 py-0 font-medium text-[10px] ${statusColor[posting.status]}`}
                    >
                      {posting.status}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-xs">
                    {posting.department} · {posting.location}
                  </p>
                  <p className="text-[11px] text-muted-foreground/60">
                    {posting.candidateCount} candidate
                    {posting.candidateCount !== 1 ? "s" : ""} · Updated{" "}
                    {new Date(posting.updatedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UsersIcon className="size-4 text-muted-foreground" />
                <CardTitle>Recent Candidates</CardTitle>
              </div>
              <Button
                className="gap-1.5 text-xs"
                disabled
                size="sm"
                variant="ghost"
              >
                <ExternalLinkIcon className="size-3.5" />
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockCandidatePreviews.map((candidate) => (
              <div
                className="flex items-start justify-between gap-3 rounded-lg border bg-card p-3 transition-colors hover:bg-accent/30"
                key={candidate.id}
              >
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">
                      {candidate.name}
                    </span>
                    <span
                      className={`inline-flex items-center rounded-full px-1.5 py-0 font-medium text-[10px] ${stageColor[candidate.stage] ?? "bg-muted text-muted-foreground"}`}
                    >
                      {candidate.stage}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-xs">
                    {candidate.currentRole}
                  </p>
                  <p className="text-[11px] text-muted-foreground/60">
                    {candidate.location} · Applied {candidate.appliedDate}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {candidate.topSkills.map((skill) => (
                      <Badge
                        className="text-[10px]"
                        key={skill}
                        variant="outline"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1">
                  <span className="font-bold text-lg tabular-nums tracking-tight">
                    {candidate.matchScore}%
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    match
                  </span>
                  <Button
                    className="gap-1 text-[10px]"
                    disabled
                    size="icon-sm"
                    title="Message candidate"
                    variant="ghost"
                  >
                    <MessageSquareIcon className="size-3" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <CheckCircle2Icon className="size-4 text-muted-foreground" />
              <CardTitle>Skill Evidence</CardTitle>
            </div>
            <CardDescription>
              Verified skill signals from the candidate pool — based on
              portfolio projects, resume data, and case studies.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockSkillSignals.map((signal) => (
              <div
                className="rounded-lg border bg-card p-3 transition-colors hover:bg-accent/30"
                key={signal.id}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">
                        {signal.skill}
                      </span>
                      <Badge className="text-[10px]" variant="secondary">
                        {signal.category}
                      </Badge>
                    </div>
                    <p className="mt-1 text-muted-foreground text-xs">
                      {signal.evidenceSummary}
                    </p>
                  </div>
                  <Badge className="shrink-0 text-[10px]" variant="outline">
                    {signal.evidenceCount} evidence
                    {signal.evidenceCount !== 1 ? "s" : ""}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <SparklesIcon className="size-4 text-muted-foreground" />
              <CardTitle>Candidate Readiness</CardTitle>
            </div>
            <CardDescription>
              Aggregate readiness score across the candidate pool. Based on
              available resume, portfolio, and skill data.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex size-16 items-center justify-center rounded-full border-4 border-primary/30">
                <span className="font-bold text-lg">
                  {mockCandidateReadiness.overall}%
                </span>
              </div>
              <div>
                <p className="font-medium text-sm">Overall Readiness</p>
                <p className="text-muted-foreground text-xs">
                  Pool average across all metrics
                </p>
              </div>
            </div>
            <div className="space-y-2">
              {[
                {
                  label: "Resume Completeness",
                  value: mockCandidateReadiness.resumeCompleteness,
                },
                {
                  label: "Portfolio Strength",
                  value: mockCandidateReadiness.portfolioStrength,
                },
                {
                  label: "Skill Coverage",
                  value: mockCandidateReadiness.skillCoverage,
                },
                {
                  label: "Experience Relevance",
                  value: mockCandidateReadiness.experienceRelevance,
                },
              ].map((metric) => (
                <div className="flex items-center gap-3" key={metric.label}>
                  <span className="w-36 text-muted-foreground text-xs">
                    {metric.label}
                  </span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{ width: `${metric.value}%` }}
                    />
                  </div>
                  <span className="w-8 text-right font-mono text-xs">
                    {metric.value}%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Placeholder actions for future employer functionality.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button
              className="gap-1.5 text-xs"
              disabled
              size="sm"
              variant="outline"
            >
              <UserPlusIcon className="size-3.5" />
              Create Job Post
            </Button>
            <Button
              className="gap-1.5 text-xs"
              disabled
              size="sm"
              variant="outline"
            >
              <SearchIcon className="size-3.5" />
              Review Candidates
            </Button>
            <Button
              className="gap-1.5 text-xs"
              disabled
              size="sm"
              variant="outline"
            >
              <MessageSquareIcon className="size-3.5" />
              Message Candidate
            </Button>
            <Button
              className="gap-1.5 text-xs"
              disabled
              size="sm"
              variant="outline"
            >
              <FileTextIcon className="size-3.5" />
              Export Shortlist
            </Button>
          </div>
          <p className="mt-3 text-[10px] text-muted-foreground/50">
            All employer actions are disabled placeholders. Employer accounts,
            RBAC, job publishing, candidate search, and messaging are not
            provided.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployersPage;
