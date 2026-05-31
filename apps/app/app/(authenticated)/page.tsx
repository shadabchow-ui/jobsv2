import { Button } from "@repo/design-system/components/ui/button";
import {
  BookmarkIcon,
  DollarSignIcon,
  FileTextIcon,
  FolderOpenIcon,
  MessageSquareIcon,
  PenIcon,
  SearchIcon,
  SendIcon,
  SparklesIcon,
  TargetIcon,
  UsersIcon,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  mockApplications,
  mockResumeProfile,
  mockSavedJobs,
  mockSkillGapAnalysis,
} from "@/lib/jobs";
import { Header } from "./components/header";
import { type DashboardCard, dashboardCards } from "./components/sample-data";
import { StatCard } from "./components/stat-card";

export const metadata: Metadata = {
  title: "Jobs Console",
  description: "Job search, applications, and career management dashboard.",
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Bookmark: BookmarkIcon,
  DollarSign: DollarSignIcon,
  FileText: FileTextIcon,
  FolderOpen: FolderOpenIcon,
  MessageSquare: MessageSquareIcon,
  Pen: PenIcon,
  Search: SearchIcon,
  Send: SendIcon,
  Sparkles: SparklesIcon,
  Target: TargetIcon,
  Users: UsersIcon,
};

const DashboardCardView = ({ card }: { card: DashboardCard }) => {
  const Icon = iconMap[card.icon];

  const content = (
    <>
      <div className="flex items-start justify-between gap-3">
        <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
          {Icon && <Icon className="size-5 text-muted-foreground" />}
        </div>
        {card.metric !== undefined && (
          <div className="flex shrink-0 flex-col items-end gap-0.5">
            <span className="font-semibold text-lg tracking-tight">
              {card.metric}
            </span>
            {card.metricLabel && (
              <span className="text-[11px] text-muted-foreground leading-none">
                {card.metricLabel}
              </span>
            )}
          </div>
        )}
      </div>
      <div className="space-y-1">
        <h3 className="font-medium leading-none">{card.title}</h3>
        <p className="text-muted-foreground text-sm leading-snug">
          {card.description}
        </p>
      </div>
    </>
  );

  if (card.planned) {
    return (
      <div className="flex cursor-default flex-col gap-3 rounded-xl border border-dashed bg-card p-5 opacity-60">
        {content}
      </div>
    );
  }

  if (card.href) {
    return (
      <Link
        className="group flex flex-col gap-3 rounded-xl border bg-card p-5 transition-all duration-150 ease-out hover:bg-accent/50 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98] active:bg-accent/70"
        href={card.href}
      >
        {content}
      </Link>
    );
  }

  return (
    <div className="flex flex-col gap-3 rounded-xl border bg-card p-5">
      {content}
    </div>
  );
};

const interviewingCount = mockApplications.filter(
  (a) => a.status === "interviewing"
).length;
const appliedCount = mockApplications.filter(
  (a) => a.status === "applied"
).length;
const avgMatchScore =
  mockSavedJobs.length > 0
    ? Math.round(
        mockSavedJobs.reduce((sum, j) => sum + (j.matchScore ?? 0), 0) /
          mockSavedJobs.length
      )
    : 0;

const derivedStats = [
  {
    label: "Saved Jobs",
    value: String(mockSavedJobs.length),
    trend: "up" as const,
    trendLabel: "Bookmarked positions",
  },
  {
    label: "Applications",
    value: String(mockApplications.length),
    trend: "up" as const,
    trendLabel: `${appliedCount} applied, ${interviewingCount} interviewing`,
  },
  {
    label: "Interviews",
    value: String(interviewingCount),
    trend: "neutral" as const,
    trendLabel: "In progress",
  },
  {
    label: "Resume Readiness",
    value: `${mockResumeProfile.resumeScore}%`,
    trend: "up" as const,
    trendLabel: `${100 - mockResumeProfile.resumeScore}% to improve`,
  },
  {
    label: "Match Score",
    value: avgMatchScore > 0 ? `${avgMatchScore}%` : "—",
    trend: avgMatchScore >= 70 ? ("up" as const) : ("neutral" as const),
    trendLabel:
      avgMatchScore >= 70 ? "Strong alignment" : "Upload resume to calculate",
  },
  {
    label: "Skill Gaps",
    value: String(mockSkillGapAnalysis.missingSkills),
    trend: "down" as const,
    trendLabel: "Areas to improve",
  },
];

const OverviewPage = () => (
  <>
    <Header page="Overview" pages={["Jobs"]} />
    <div className="flex flex-1 flex-col gap-8 p-6 pt-0">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <h1 className="font-semibold text-2xl tracking-tight">
            Jobs Console
          </h1>
          <p className="text-muted-foreground text-sm">
            Job search, applications, and career management dashboard.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            asChild
            className="h-8 gap-1.5 px-3 font-normal text-xs transition-all duration-100 active:scale-95"
            size="sm"
            variant="outline"
          >
            <Link href="/jobs/search">
              <SearchIcon className="size-3.5 shrink-0 text-muted-foreground" />
              <span>Search Jobs</span>
            </Link>
          </Button>
          <Button
            asChild
            className="h-8 gap-1.5 px-3 font-normal text-xs transition-all duration-100 active:scale-95"
            size="sm"
            variant="outline"
          >
            <Link href="/jobs/resume">
              <FileTextIcon className="size-3.5 shrink-0 text-muted-foreground" />
              <span>Build Resume</span>
            </Link>
          </Button>
          <Button
            asChild
            className="h-8 gap-1.5 px-3 font-normal text-xs transition-all duration-100 active:scale-95"
            size="sm"
            variant="outline"
          >
            <Link href="/jobs/applications">
              <SendIcon className="size-3.5 shrink-0 text-muted-foreground" />
              <span>Track Applications</span>
            </Link>
          </Button>
          <Button
            asChild
            className="h-8 gap-1.5 px-3 font-normal text-xs transition-all duration-100 active:scale-95"
            size="sm"
            variant="outline"
          >
            <Link href="/jobs/interview-prep">
              <MessageSquareIcon className="size-3.5 shrink-0 text-muted-foreground" />
              <span>Practice Interview</span>
            </Link>
          </Button>
          <Button
            asChild
            className="h-8 gap-1.5 px-3 font-normal text-xs transition-all duration-100 active:scale-95"
            size="sm"
            variant="outline"
          >
            <Link href="/jobs/skill-gaps">
              <TargetIcon className="size-3.5 shrink-0 text-muted-foreground" />
              <span>Improve Skill Gaps</span>
            </Link>
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {derivedStats.map((stat) => (
            <StatCard item={stat} key={stat.label} />
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="font-medium text-muted-foreground text-xs uppercase tracking-wider">
          Dashboard
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {dashboardCards.map((card) => (
            <DashboardCardView card={card} key={card.id} />
          ))}
        </div>
      </div>
    </div>
  </>
);

export default OverviewPage;
