export type UpcubeStatus = "Foundation" | "Planned" | "Scaffold";

export interface JobsNavItem {
  description: string;
  href: string;
  icon: string;
  id: string;
  label: string;
  status: UpcubeStatus;
}

export interface UpcubeModule {
  description: string;
  href: string;
  icon: string;
  id: string;
  label: string;
  status: UpcubeStatus;
}

export interface UpcubeProduct {
  description: string;
  href: string;
  icon: string;
  id: string;
  modules: UpcubeModule[];
  name: string;
  status: UpcubeStatus;
}

export const jobsNavItems: JobsNavItem[] = [
  {
    id: "overview",
    label: "Overview",
    description: "Jobs Console home and activity overview",
    href: "/",
    icon: "LayoutDashboard",
    status: "Foundation",
  },
  {
    id: "job-search",
    label: "Job Search",
    description: "Search and discover job opportunities",
    href: "/jobs/search",
    icon: "Search",
    status: "Foundation",
  },
  {
    id: "ai-match",
    label: "AI Job Match",
    description: "AI-powered job matching and recommendations",
    href: "/jobs/match",
    icon: "Sparkles",
    status: "Foundation",
  },
  {
    id: "saved",
    label: "Saved Jobs",
    description: "Jobs you've saved for later",
    href: "/jobs/saved",
    icon: "Bookmark",
    status: "Foundation",
  },
  {
    id: "applications",
    label: "Applications",
    description: "Track your job applications",
    href: "/jobs/applications",
    icon: "FileText",
    status: "Foundation",
  },
  {
    id: "resume",
    label: "Resume Builder",
    description: "Create and manage your resumes",
    href: "/jobs/resume",
    icon: "ScrollText",
    status: "Foundation",
  },
  {
    id: "cover-letters",
    label: "Cover Letters",
    description: "Write and manage cover letters",
    href: "/jobs/cover-letters",
    icon: "Mail",
    status: "Foundation",
  },
  {
    id: "portfolio",
    label: "Portfolio",
    description: "Showcase your work and projects",
    href: "/jobs/portfolio",
    icon: "Briefcase",
    status: "Foundation",
  },
  {
    id: "skill-gaps",
    label: "Skill Gaps",
    description: "Identify and bridge skill gaps",
    href: "/jobs/skill-gaps",
    icon: "BarChart3",
    status: "Foundation",
  },
  {
    id: "interview-prep",
    label: "Interview Prep",
    description: "Prepare for interviews with AI",
    href: "/jobs/interview-prep",
    icon: "GraduationCap",
    status: "Foundation",
  },
  {
    id: "salary",
    label: "Salary Research",
    description: "Research salaries and compensation",
    href: "/jobs/salary",
    icon: "DollarSign",
    status: "Foundation",
  },
  {
    id: "networking",
    label: "Networking",
    description: "Connect with professionals and peers",
    href: "/jobs/networking",
    icon: "Users",
    status: "Foundation",
  },
  {
    id: "career-profile",
    label: "Career Profile",
    description: "Your career preferences and profile",
    href: "/jobs/profile",
    icon: "UserCheck",
    status: "Foundation",
  },
  {
    id: "autofill",
    label: "Browser Autofill",
    description: "Auto-fill job applications from supported boards",
    href: "/jobs/autofill",
    icon: "Puzzle",
    status: "Planned",
  },
  {
    id: "gig-builder",
    label: "Gig Builder",
    description:
      "Build freelance service listings from your skills and portfolio",
    href: "/jobs/gig-builder",
    icon: "Store",
    status: "Foundation",
  },
  {
    id: "freelance",
    label: "Freelance & Gig Finder",
    description:
      "Discover freelance and gig opportunities matched to your skills",
    href: "/jobs/freelance",
    icon: "Globe",
    status: "Foundation",
  },
  {
    id: "employers",
    label: "Employers",
    description:
      "Recruiter dashboard for reviewing candidates and job postings",
    href: "/jobs/employers",
    icon: "Building2",
    status: "Foundation",
  },
  {
    id: "diagnostics",
    label: "Diagnostics",
    description: "Jobs Search provider and system health diagnostics",
    href: "/jobs/diagnostics",
    icon: "BarChart3",
    status: "Foundation",
  },
  {
    id: "settings",
    label: "Settings",
    description: "Job search and application preferences",
    href: "/jobs/settings",
    icon: "Settings",
    status: "Foundation",
  },
];

export const jobsProduct: UpcubeProduct = {
  id: "jobs",
  name: "Jobs",
  description:
    "Job listings, applications, candidate matching, and hiring workflows.",
  href: "/jobs",
  icon: "Briefcase",
  status: "Foundation",
  modules: [
    {
      id: "jobs-listings",
      label: "Listings",
      description: "Job posting and management",
      href: "/jobs/listings",
      icon: "FileBadge",
      status: "Foundation",
    },
    {
      id: "jobs-applications",
      label: "Applications",
      description: "Candidate applications and tracking",
      href: "/jobs/applications",
      icon: "ClipboardList",
      status: "Foundation",
    },
    {
      id: "jobs-matching",
      label: "Matching",
      description: "AI-powered candidate matching",
      href: "/jobs/matching",
      icon: "Sparkles",
      status: "Planned",
    },
  ],
};

export const upcubeProducts: UpcubeProduct[] = [jobsProduct];

export const platformPages = [
  {
    id: "overview",
    label: "Overview",
    description: "Console home and cross-product status",
    href: "/",
    icon: "LayoutDashboard",
    status: "Foundation" as UpcubeStatus,
  },
  {
    id: "projects",
    label: "Projects",
    description: "Workspace projects and collections",
    href: "/projects",
    icon: "FolderKanban",
    status: "Foundation" as UpcubeStatus,
  },
  {
    id: "settings",
    label: "Settings",
    description: "Account, workspace, and billing settings",
    href: "/settings",
    icon: "Settings",
    status: "Foundation" as UpcubeStatus,
  },
];

export function getProduct(id: string): UpcubeProduct | undefined {
  return upcubeProducts.find((p) => p.id === id);
}
