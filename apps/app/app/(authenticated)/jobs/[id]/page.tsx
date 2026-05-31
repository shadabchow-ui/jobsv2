import { Badge } from "@repo/design-system/components/ui/badge";
import { Button } from "@repo/design-system/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/design-system/components/ui/card";
import {
  BookmarkIcon,
  BriefcaseIcon,
  BuildingIcon,
  CalendarIcon,
  ChevronLeftIcon,
  CircleCheckIcon,
  CircleXIcon,
  DatabaseIcon,
  ExternalLinkIcon,
  FileTextIcon,
  GlobeIcon,
  MapPinIcon,
  MessageSquareIcon,
  SparklesIcon,
  TargetIcon,
  TimerIcon,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getJobDetailById } from "@/lib/jobs/helpers";
import { Header } from "../../components/header";
import { AddToTracker } from "../components/add-to-tracker";
import { StatusBadge } from "../components/status-badge";

interface JobDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: JobDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const { job } = getJobDetailById(id);

  if (!job) {
    return { title: "Job Not Found — Jobs" };
  }

  return {
    title: `${job.title} at ${job.company} — Jobs`,
    description: job.description.slice(0, 160),
  };
}

const JobDetailPage = async ({ params }: JobDetailPageProps) => {
  const { id } = await params;
  const { job, posting, savedJob, applications, matchResult, listing } =
    getJobDetailById(id);

  if (!job) {
    notFound();
  }

  const appRecord = applications[0] ?? null;

  const checklistDone = {
    profileReviewed: true,
    resumeTailored: appRecord?.hasResume ?? false,
    coverLetterDrafted: appRecord?.hasCoverLetter ?? false,
    jobSaved: savedJob !== null,
    applicationTracked: appRecord !== null,
    interviewPrepStarted: appRecord?.status === "interviewing",
  };

  const checklist = [
    { label: "Profile reviewed", done: checklistDone.profileReviewed },
    { label: "Resume tailored", done: checklistDone.resumeTailored },
    { label: "Cover letter drafted", done: checklistDone.coverLetterDrafted },
    { label: "Job saved", done: checklistDone.jobSaved },
    { label: "Application tracked", done: checklistDone.applicationTracked },
    {
      label: "Interview prep started",
      done: checklistDone.interviewPrepStarted,
    },
  ];

  const completedCount = checklist.filter((c) => c.done).length;

  const matchAnalysisCard = matchResult ? (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <SparklesIcon className="size-4" />
          Match Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {matchResult.reasons.length > 0 && (
          <div className="space-y-2">
            <h3 className="font-medium text-muted-foreground text-xs uppercase tracking-wider">
              Why this job matches
            </h3>
            <ul className="space-y-1">
              {matchResult.reasons.map((reason) => (
                <li
                  className="flex items-start gap-2 text-muted-foreground text-sm"
                  key={reason}
                >
                  <span className="mt-1.5 block size-1.5 shrink-0 rounded-full bg-emerald-500" />
                  {reason}
                </li>
              ))}
            </ul>
          </div>
        )}
        {matchResult.missingSkills.length > 0 && (
          <div className="space-y-2">
            <h3 className="font-medium text-muted-foreground text-xs uppercase tracking-wider">
              Skill gaps
            </h3>
            <p className="text-muted-foreground text-sm">
              {matchResult.missingSkills.join(", ")}
            </p>
          </div>
        )}
        {matchResult.recommendedActions.length > 0 && (
          <div className="space-y-2">
            <h3 className="font-medium text-muted-foreground text-xs uppercase tracking-wider">
              Recommended next actions
            </h3>
            <ul className="space-y-1">
              {matchResult.recommendedActions.map((action) => (
                <li
                  className="flex items-start gap-2 text-muted-foreground text-sm"
                  key={action}
                >
                  <span className="mt-1.5 block size-1.5 shrink-0 rounded-full bg-amber-500" />
                  {action}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  ) : null;

  const trackerStatusCard = appRecord ? (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <BriefcaseIcon className="size-4" />
          Tracker Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-sm">Status</span>
          <StatusBadge status={appRecord.status} />
        </div>
        {appRecord.applicationDate && (
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-sm">Applied</span>
            <span className="text-sm">{appRecord.applicationDate}</span>
          </div>
        )}
        {appRecord.nextAction && (
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-sm">Next action</span>
            <span className="text-amber-600 text-sm dark:text-amber-400">
              {appRecord.nextAction}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  ) : null;

  const score = matchResult?.overall ?? job.matchScore;

  const matchBadge =
    score !== undefined ? (
      <div className="flex shrink-0 items-center gap-1.5 rounded-full border bg-emerald-500/10 px-3 py-1.5">
        <TargetIcon className="size-4 text-emerald-500" />
        <span className="font-semibold text-emerald-600 text-sm dark:text-emerald-400">
          {score}% match
        </span>
      </div>
    ) : null;

  return (
    <>
      <Header page={job.title} pages={["Jobs Console", "Jobs"]} />
      <div className="flex flex-1 animate-fade-in flex-col gap-6 p-6 pt-0">
        <Link
          className="flex items-center gap-1 text-muted-foreground text-sm transition-colors hover:text-foreground"
          href="/jobs"
        >
          <ChevronLeftIcon className="size-4" />
          Back to Jobs
        </Link>

        <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
          <div className="flex flex-col gap-6">
            <div className="rounded-xl border bg-card p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1.5">
                  <h1 className="font-semibold text-2xl tracking-tight">
                    {job.title}
                  </h1>
                  <p className="flex items-center gap-2 text-base text-muted-foreground">
                    <BuildingIcon className="size-4" />
                    {job.company}
                  </p>
                </div>
                {matchBadge}
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-muted-foreground text-sm">
                <span className="flex items-center gap-1.5">
                  <MapPinIcon className="size-4" />
                  {job.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <GlobeIcon className="size-4" />
                  {job.remoteType}
                </span>
                <span className="flex items-center gap-1.5">
                  <BriefcaseIcon className="size-4" />
                  {job.employmentType}
                </span>
                {job.salary && (
                  <span className="flex items-center gap-1.5 font-medium text-foreground/80">
                    <TimerIcon className="size-4" />
                    {job.salary}
                  </span>
                )}
                {posting?.postedAt && (
                  <span className="flex items-center gap-1.5">
                    <CalendarIcon className="size-4" />
                    Posted{" "}
                    {new Date(posting.postedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                )}
              </div>

              {posting?.source && (
                <p className="mt-3 text-muted-foreground text-xs">
                  Source: {posting.source}
                  {posting.source !== "not provided" ? "" : ""}
                </p>
              )}

              <div className="mt-5 space-y-1.5">
                <h2 className="font-medium text-muted-foreground text-xs uppercase tracking-wider">
                  Description
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {posting?.description ??
                    listing?.description ??
                    job.description}
                </p>
              </div>

              {job.skills.length > 0 && (
                <div className="mt-5 space-y-2">
                  <h2 className="font-medium text-muted-foreground text-xs uppercase tracking-wider">
                    Skills & Tags
                  </h2>
                  <div className="flex flex-wrap gap-1.5">
                    {job.skills.map((skill) => {
                      const isMissing =
                        matchResult?.missingSkills.includes(skill);
                      return (
                        <Badge
                          key={skill}
                          variant={isMissing ? "destructive" : "secondary"}
                        >
                          {isMissing && (
                            <TargetIcon className="mr-1 size-2.5" />
                          )}
                          {skill}
                        </Badge>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {matchAnalysisCard}
          </div>

          <div className="flex flex-col gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <FileTextIcon className="size-4" />
                  Application Packet
                  <span className="ml-auto font-mono text-muted-foreground text-xs">
                    {completedCount}/{checklist.length}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {checklist.map((item) => (
                  <div className="flex items-center gap-3" key={item.label}>
                    {item.done ? (
                      <CircleCheckIcon className="size-4 shrink-0 text-emerald-500" />
                    ) : (
                      <CircleXIcon className="size-4 shrink-0 text-muted-foreground/40" />
                    )}
                    <span
                      className={
                        item.done
                          ? "text-foreground text-sm"
                          : "text-muted-foreground text-sm"
                      }
                    >
                      {item.label}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Actions</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <Button asChild className="w-full" size="sm" variant="default">
                  <Link href={"/jobs/saved"}>
                    <BookmarkIcon className="size-3.5" />
                    Save job
                  </Link>
                </Button>
                <Button asChild className="w-full" size="sm" variant="outline">
                  <Link href={"/jobs/resume"}>
                    <FileTextIcon className="size-3.5" />
                    Tailor resume
                  </Link>
                </Button>
                <Button asChild className="w-full" size="sm" variant="outline">
                  <Link href={"/jobs/cover-letters"}>
                    <MessageSquareIcon className="size-3.5" />
                    Generate cover letter
                  </Link>
                </Button>
                <AddToTracker
                  company={job.company}
                  jobId={id}
                  location={job.location}
                  title={job.title}
                />
                <Button
                  asChild
                  className="w-full"
                  size="sm"
                  variant="secondary"
                >
                  <Link href={"/jobs/interview-prep"}>
                    <SparklesIcon className="size-3.5" />
                    Prepare interview
                  </Link>
                </Button>
                {job.applyUrl && (
                  <Button
                    asChild
                    className="w-full"
                    size="sm"
                    variant="outline"
                  >
                    <a href={job.applyUrl} rel="noreferrer" target="_blank">
                      <ExternalLinkIcon className="size-3.5" />
                      Open external apply link
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>

            {trackerStatusCard}
          </div>
        </div>

        <div className="flex items-center gap-1.5 rounded-md border border-dashed bg-muted/20 px-3 py-2 text-muted-foreground">
          <DatabaseIcon className="size-3 shrink-0" />
          <span className="text-[11px] leading-relaxed">
            Application data is stored locally in memory. Saved jobs,
            applications, and tracked statuses will reset on page reload. Real
            database persistence is not provided.
          </span>
        </div>
      </div>
    </>
  );
};

export default JobDetailPage;
