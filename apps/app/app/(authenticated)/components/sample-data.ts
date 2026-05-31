export type DeploymentStatus =
  | "ready"
  | "building"
  | "failed"
  | "canceled"
  | "queued";

export interface Deployment {
  author: string;
  branch: string;
  commit: string;
  commitMessage: string;
  createdAt: string;
  duration: string;
  environment: "Production" | "Preview" | "Staging";
  id: string;
  project: string;
  status: DeploymentStatus;
}

export interface Activity {
  id: string;
  message: string;
  project?: string;
  timestamp: string;
  type: "deployment" | "project" | "domain" | "member" | "config";
}

export interface StatItem {
  label: string;
  trend?: "up" | "down" | "neutral";
  trendLabel?: string;
  value: string;
}

export const sampleStats: StatItem[] = [
  {
    label: "Saved Jobs",
    value: "24",
    trend: "up",
    trendLabel: "+3 this week",
  },
  {
    label: "Applications",
    value: "8",
    trend: "up",
    trendLabel: "+5 this week",
  },
  {
    label: "Interviews",
    value: "3",
    trend: "up",
    trendLabel: "Upcoming",
  },
  {
    label: "Resume Readiness",
    value: "75%",
    trend: "up",
    trendLabel: "+15% this month",
  },
  {
    label: "Match Score",
    value: "—",
    trend: "neutral",
    trendLabel: "Upload resume to calculate",
  },
  {
    label: "Skill Gaps",
    value: "5",
    trend: "down",
    trendLabel: "Areas to improve",
  },
];

export interface DashboardCard {
  description: string;
  href?: string;
  icon: string;
  id: string;
  metric?: string;
  metricLabel?: string;
  planned?: boolean;
  title: string;
}

export const dashboardCards: DashboardCard[] = [
  {
    id: "job-search",
    title: "Job Search",
    description: "Find opportunities that match your skills and preferences.",
    icon: "Search",
    href: "/jobs/search",
  },
  {
    id: "ai-match",
    title: "AI Job Match",
    description: "Get personalized job recommendations powered by AI.",
    icon: "Sparkles",
    metric: "—",
    metricLabel: "Match score",
  },
  {
    id: "saved-jobs",
    title: "Saved Jobs",
    description: "Jobs you've bookmarked for later review.",
    icon: "Bookmark",
    metric: "24",
    metricLabel: "Saved",
    href: "/jobs/saved",
  },
  {
    id: "applications",
    title: "Applications",
    description: "Track and manage your job applications.",
    icon: "Send",
    metric: "8",
    metricLabel: "This week",
    href: "/jobs/applications",
  },
  {
    id: "resume",
    title: "Resume Readiness",
    description: "Build and optimize your resume for each application.",
    icon: "FileText",
    metric: "75%",
    metricLabel: "Readiness",
    href: "/jobs/resume",
  },
  {
    id: "cover-letters",
    title: "Cover Letters",
    description: "Create tailored cover letters for your applications.",
    icon: "Pen",
    metric: "2",
    metricLabel: "Drafts",
    href: "/jobs/cover-letters",
  },
  {
    id: "portfolio",
    title: "Portfolio",
    description: "Showcase your work and projects to employers.",
    icon: "FolderOpen",
    href: "/jobs/portfolio",
  },
  {
    id: "skill-gaps",
    title: "Skill Gaps",
    description: "Identify and close skill gaps for your target roles.",
    icon: "Target",
    metric: "5",
    metricLabel: "Gaps",
    href: "/jobs/skill-gaps",
  },
  {
    id: "interview-prep",
    title: "Interview Prep",
    description: "Prepare with practice questions and AI feedback.",
    icon: "MessageSquare",
    metric: "3",
    metricLabel: "Upcoming",
    href: "/jobs/interview-prep",
  },
  {
    id: "salary-research",
    title: "Salary Research",
    description: "Research compensation trends and market rates.",
    icon: "DollarSign",
    href: "/jobs/salary",
  },
  {
    id: "networking",
    title: "Networking",
    description: "Connect with professionals and grow your network.",
    icon: "Users",
    href: "/jobs/networking",
  },
];
