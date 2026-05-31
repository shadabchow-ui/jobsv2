export interface PortfolioProject {
  caseStudySections: CaseStudySection[];
  description: string;
  duration: string;
  highlights: string[];
  id: string;
  outcome: string;
  role: string;
  subtitle: string;
  techStack: string[];
  thumbnail?: string;
  title: string;
  url?: string;
}

export interface CaseStudySection {
  content: string;
  title: string;
}

export interface PortfolioReadinessItem {
  description: string;
  done: boolean;
  id: string;
  label: string;
}

export const mockPortfolioReadiness: PortfolioReadinessItem[] = [
  {
    id: "pr-1",
    label: "Project list populated",
    done: true,
    description: "At least 3 projects with descriptions",
  },
  {
    id: "pr-2",
    label: "Tech stack listed",
    done: true,
    description: "Technologies and tools used per project",
  },
  {
    id: "pr-3",
    label: "Outcome metrics included",
    done: true,
    description: "Quantifiable results for each project",
  },
  {
    id: "pr-4",
    label: "Case study written",
    done: false,
    description: "In-depth walkthrough for top project",
  },
  {
    id: "pr-5",
    label: "Recruiter summary ready",
    done: false,
    description: "2-3 sentence project summary",
  },
  {
    id: "pr-6",
    label: "Live demo or screenshots",
    done: false,
    description: "Visual proof of your work",
  },
];

export const mockPortfolioProjects: PortfolioProject[] = [
  {
    id: "proj-1",
    title: "Jobs Console",
    subtitle: "Unified job search and career platform",
    description:
      "Designed and built a comprehensive platform for job searching, application tracking, resume building, interview prep, and career development.",
    role: "Lead Frontend Engineer",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Radix UI", "Clerk"],
    duration: "Jan 2026 – Present",
    outcome:
      "Reduced job search friction and improved application tracking for thousands of users.",
    highlights: [
      "Architected a modular system with AI-powered job matching",
      "Built real-time collaboration features with Liveblocks",
      "Achieved 98+ Lighthouse performance score",
    ],
    caseStudySections: [
      {
        title: "Problem",
        content:
          "Job seekers were juggling multiple disconnected tools for searching, tracking, resume building, and interview prep, leading to missed opportunities and disorganized workflows.",
      },
      {
        title: "Approach",
        content:
          "Adopted a modular architecture where each product domain is self-contained. Used Turborepo for shared packages and Next.js App Router for server-rendered dashboards. Built a registry-driven sidebar and command palette for rapid navigation.",
      },
      {
        title: "Results",
        content:
          "The platform consolidated 7 tools into one interface. Teams reported 40% faster incident resolution and 60% reduction in onboarding time for new engineers.",
      },
    ],
  },
  {
    id: "proj-2",
    title: "AI Job Match Engine",
    subtitle: "Intelligent candidate-job matching system",
    description:
      "Developed an AI-powered matching engine that scores job candidates against open positions using skill analysis, experience alignment, and semantic similarity.",
    role: "Full Stack Developer",
    techStack: ["Python", "PyTorch", "PostgreSQL", "React", "FastAPI"],
    duration: "Sep 2025 – Dec 2025",
    outcome:
      "Improved match accuracy by 35% over keyword-only baselines and reduced screening time by 50%.",
    highlights: [
      "Built a skill extraction pipeline using NLP",
      "Designed a weighted scoring algorithm for job matching",
      "Created interactive radar charts for match visualization",
    ],
    caseStudySections: [
      {
        title: "Problem",
        content:
          "Recruiters spent hours manually screening resumes against job descriptions, with inconsistent criteria and high false-positive rates.",
      },
      {
        title: "Approach",
        content:
          "Built a two-stage pipeline: first extract skills and experience from resumes using NLP, then compute a multi-dimensional match score considering skills, seniority, location, and salary preferences.",
      },
      {
        title: "Results",
        content:
          "35% improvement in match accuracy. Screening time dropped from 15 minutes to under 2 minutes per candidate.",
      },
    ],
  },
  {
    id: "proj-3",
    title: "Design System — Prism",
    subtitle: "Component library for enterprise SaaS",
    description:
      "Created a comprehensive design system with 50+ accessible React components, dark mode support, and Figma integration used across 4 product teams.",
    role: "Design Engineer",
    techStack: ["React", "TypeScript", "Storybook", "Figma API", "Radix UI"],
    duration: "Mar 2025 – Aug 2025",
    outcome:
      "Design-to-dev handoff time reduced by 60% and visual consistency issues dropped by 80%.",
    highlights: [
      "Authored 50+ production-grade UI components",
      "Integrated Figma design tokens with automated code generation",
      "Wrote comprehensive Storybook documentation and tests",
    ],
    caseStudySections: [
      {
        title: "Problem",
        content:
          "Four product teams were building UI in silos, resulting in inconsistent patterns, duplicated effort, and slow design-to-development handoffs.",
      },
      {
        title: "Approach",
        content:
          "Partnered with design to define a shared token system. Built components incrementally, starting with the most-used patterns. Each component included accessibility, theming, and Storybook documentation.",
      },
      {
        title: "Results",
        content:
          "Design-to-dev handoff reduced by 60%. UI consistency scores improved from 45% to 92% in quarterly audits.",
      },
    ],
  },
];

export const mockRecruiterSummary =
  "Full-stack engineer specializing in cloud platform UI, design systems, and AI-powered tooling. Built production systems serving 10K+ users. Strong track record of shipping premium user experiences in fast-paced startup environments.";

export interface PortfolioShareSettings {
  allowContact: boolean;
  id: string;
  shareUrl?: string;
  showContactForm: boolean;
  showResume: boolean;
  visibility: "draft" | "preview" | "shared" | "public";
}

export interface PublicPortfolioProfile {
  availability: string;
  contactEmail?: string;
  headline: string;
  id: string;
  name: string;
  projects: {
    description: string;
    highlights: string[];
    id: string;
    outcome: string;
    role: string;
    techStack: string[];
    title: string;
    url?: string;
  }[];
  resumeSummary?: string;
  shareSettings: PortfolioShareSettings;
  skills: string[];
}

export const mockShareSettings: PortfolioShareSettings = {
  id: "share-1",
  visibility: "preview",
  shareUrl: "not provided",
  showResume: true,
  allowContact: false,
  showContactForm: false,
};

export const mockPublicPortfolioProfile: PublicPortfolioProfile = {
  id: "profile-public-1",
  name: "Alex Chen",
  headline: "Full-Stack Engineer · Platform UI & AI Tooling",
  availability: "Open to freelance and full-time opportunities",
  skills: [
    "React",
    "TypeScript",
    "Next.js",
    "Node.js",
    "PostgreSQL",
    "Tailwind CSS",
    "Python",
    "System Design",
  ],
  resumeSummary: mockRecruiterSummary,
  contactEmail: "not provided",
  shareSettings: mockShareSettings,
  projects: mockPortfolioProjects.map((p) => ({
    id: p.id,
    title: p.title,
    description: p.description,
    role: p.role,
    techStack: p.techStack,
    outcome: p.outcome,
    highlights: p.highlights,
    url: p.url,
  })),
};
