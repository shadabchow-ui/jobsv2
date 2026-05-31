export interface EmployerDashboardSummary {
  activeJobPostings: number;
  interviewsScheduled: number;
  newApplications: number;
  offersExtended: number;
  pipelineStages: EmployerPipelineStage[];
  totalCandidates: number;
}

export interface EmployerPipelineStage {
  color: string;
  count: number;
  id: string;
  label: string;
}

export interface EmployerJobPostingDraft {
  candidateCount: number;
  createdAt: string;
  department: string;
  id: string;
  location: string;
  status: "draft" | "published" | "closed";
  title: string;
  updatedAt: string;
}

export interface RecruiterCandidatePreview {
  appliedDate: string;
  currentRole: string;
  hasResume: boolean;
  id: string;
  location: string;
  matchScore: number;
  name: string;
  portfolioUrl?: string;
  stage: string;
  topSkills: string[];
}

export interface CandidateSkillSignal {
  category: string;
  evidenceCount: number;
  evidenceSummary: string;
  id: string;
  skill: string;
}

export interface CandidateReadinessScore {
  experienceRelevance: number;
  overall: number;
  portfolioStrength: number;
  resumeCompleteness: number;
  skillCoverage: number;
}

export const mockEmployerSummary: EmployerDashboardSummary = {
  activeJobPostings: 4,
  totalCandidates: 28,
  newApplications: 7,
  interviewsScheduled: 3,
  offersExtended: 1,
  pipelineStages: [
    { id: "ps-1", label: "New", count: 7, color: "bg-blue-500" },
    { id: "ps-2", label: "Screened", count: 12, color: "bg-cyan-500" },
    { id: "ps-3", label: "Interview", count: 5, color: "bg-amber-500" },
    { id: "ps-4", label: "Offer", count: 2, color: "bg-emerald-500" },
    { id: "ps-5", label: "Hired", count: 1, color: "bg-violet-500" },
    {
      id: "ps-6",
      label: "Rejected",
      count: 6,
      color: "bg-muted-foreground/40",
    },
  ],
};

export const mockJobPostingDrafts: EmployerJobPostingDraft[] = [
  {
    id: "jpd-1",
    title: "Senior Frontend Engineer",
    department: "Engineering",
    location: "San Francisco, CA (Remote)",
    status: "published",
    createdAt: "2026-05-15T00:00:00Z",
    updatedAt: "2026-05-28T00:00:00Z",
    candidateCount: 12,
  },
  {
    id: "jpd-2",
    title: "Staff Frontend Engineer",
    department: "Engineering",
    location: "Los Gatos, CA",
    status: "draft",
    createdAt: "2026-05-20T00:00:00Z",
    updatedAt: "2026-05-25T00:00:00Z",
    candidateCount: 0,
  },
  {
    id: "jpd-3",
    title: "Engineering Manager — Platform",
    department: "Engineering",
    location: "San Francisco, CA",
    status: "published",
    createdAt: "2026-05-10T00:00:00Z",
    updatedAt: "2026-05-26T00:00:00Z",
    candidateCount: 8,
  },
  {
    id: "jpd-4",
    title: "Full Stack Engineer, Growth",
    department: "Growth",
    location: "New York, NY (Remote)",
    status: "closed",
    createdAt: "2026-04-01T00:00:00Z",
    updatedAt: "2026-05-20T00:00:00Z",
    candidateCount: 5,
  },
];

export const mockCandidatePreviews: RecruiterCandidatePreview[] = [
  {
    id: "rcp-1",
    name: "Alex Morgan",
    currentRole: "Senior Frontend Engineer at TechCorp",
    location: "San Francisco, CA",
    matchScore: 88,
    topSkills: ["React", "TypeScript", "Next.js", "System Design"],
    portfolioUrl: "alexmorgan.dev",
    hasResume: true,
    appliedDate: "2026-05-28",
    stage: "Interview",
  },
  {
    id: "rcp-2",
    name: "Jordan Chen",
    currentRole: "Staff Engineer at ScaleFlow",
    location: "Seattle, WA",
    matchScore: 92,
    topSkills: ["React", "GraphQL", "Performance", "Accessibility"],
    portfolioUrl: "jordanchen.io",
    hasResume: true,
    appliedDate: "2026-05-26",
    stage: "Screened",
  },
  {
    id: "rcp-3",
    name: "Riley Patel",
    currentRole: "Full Stack Engineer at Notion",
    location: "New York, NY",
    matchScore: 76,
    topSkills: ["React", "Node.js", "TypeScript", "SQL"],
    hasResume: true,
    appliedDate: "2026-05-24",
    stage: "New",
  },
  {
    id: "rcp-4",
    name: "Sam Rivera",
    currentRole: "Lead Developer Advocate",
    location: "Remote",
    matchScore: 65,
    topSkills: ["Technical Writing", "Public Speaking", "TypeScript"],
    hasResume: false,
    appliedDate: "2026-05-20",
    stage: "New",
  },
];

export const mockSkillSignals: CandidateSkillSignal[] = [
  {
    id: "cs-1",
    skill: "React",
    category: "Frontend",
    evidenceCount: 8,
    evidenceSummary:
      "Portfolio projects, resume mentions, and case studies demonstrate production React experience across multiple employers.",
  },
  {
    id: "cs-2",
    skill: "TypeScript",
    category: "Language",
    evidenceCount: 6,
    evidenceSummary:
      "TypeScript used in all portfolio projects and listed as primary language in current and past roles.",
  },
  {
    id: "cs-3",
    skill: "System Design",
    category: "Architecture",
    evidenceCount: 3,
    evidenceSummary:
      "Two portfolio case studies include architecture diagrams. Mentioned in current role description.",
  },
  {
    id: "cs-4",
    skill: "Accessibility",
    category: "Frontend",
    evidenceCount: 4,
    evidenceSummary:
      "Case study on accessible UI rendering. Contributions to open-source accessibility improvements. Mentioned in resume highlights.",
  },
];

export const mockCandidateReadiness: CandidateReadinessScore = {
  overall: 78,
  resumeCompleteness: 85,
  portfolioStrength: 70,
  skillCoverage: 82,
  experienceRelevance: 75,
};
