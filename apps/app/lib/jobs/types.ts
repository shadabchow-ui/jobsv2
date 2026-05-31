import type { UpcubeStatus } from "@/lib/upcube/registry";

export interface UpcubeJobPosting {
  category?: string;
  company: string;
  description: string;
  expiresAt?: string;
  externalId: string;
  id: string;
  location: string;
  postedAt?: string;
  salary?: string;
  source: string;
  status: UpcubeStatus;
  title: string;
  type?: string;
  url: string;
}

export interface JobSearchQuery {
  category?: string;
  location?: string;
  page?: number;
  pageSize?: number;
  postedWithinDays?: number;
  query?: string;
  salaryMax?: number;
  salaryMin?: number;
  type?: string;
}

export interface JobSearchResult {
  jobs: UpcubeJobPosting[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export type ApplicationStatus =
  | "saved"
  | "resume-tailored"
  | "cover-letter-ready"
  | "applied"
  | "recruiter-contacted"
  | "interviewing"
  | "offer"
  | "rejected"
  | "follow-up-needed";

export interface Job {
  applyUrl: string;
  company: string;
  description: string;
  employmentType: string;
  id: string;
  location: string;
  matchScore?: number;
  remoteType: string;
  salary?: string;
  skills: string[];
  title: string;
}

export interface JobSearchFilters {
  employmentType: string;
  location: string;
  query: string;
  remoteType: string;
}

export type SearchResultStatus =
  | "success"
  | "empty"
  | "error"
  | "fallback"
  | "rate-limited"
  | "loading";

export interface SearchResultState {
  isStale: boolean;
  jobs: Job[];
  message?: string;
  provider: string;
  status: SearchResultStatus;
}

export interface SavedJob {
  company: string;
  id: string;
  location: string;
  matchScore?: number;
  savedDate: string;
  title: string;
}

export type CoverLetterStatus = "draft" | "ready" | "linked";

export interface ApplicationRecord {
  applicationDate: string;
  company: string;
  coverLetterId?: string;
  hasCoverLetter: boolean;
  hasResume: boolean;
  id: string;
  jobId: string;
  location: string;
  nextAction?: string;
  reminderDate?: string;
  status: ApplicationStatus;
  title: string;
  userId?: string;
}

export interface SalaryRange {
  max: number;
  min: number;
}

export interface JobSkill {
  name: string;
}

export interface JobListing {
  company: string;
  description?: string;
  employmentType: string;
  id: string;
  location: string;
  remote: boolean;
  salary?: SalaryRange;
  seniority?: string;
  skills: JobSkill[];
  title: string;
}

export interface CandidateProfile {
  desiredRole?: string;
  employmentType?: string;
  location?: string;
  remotePreferred?: boolean;
  salaryExpectation?: SalaryRange;
  seniority?: string;
  skills: string[];
}

export interface EducationEntry {
  degree: string;
  endYear?: number;
  field: string;
  institution: string;
  startYear?: number;
}

export interface CareerProfile {
  desiredRole: string;
  education: EducationEntry[];
  employmentType: string;
  experienceLevel: string;
  portfolioLinks: string[];
  preferredLocations: string[];
  remotePreference: "remote" | "hybrid" | "onsite";
  salaryExpectation: SalaryRange;
  skills: string[];
  sponsorshipRequired: boolean;
  summary: string;
  targetRoles: string[];
  workAuthorization: string;
}

export type MatchLabel =
  | "Strong match"
  | "Good match"
  | "Stretch role"
  | "Low match";

export interface JobMatchScore {
  label: MatchLabel;
  missingSkills: string[];
  overall: number;
  reasons: string[];
  recommendedActions: string[];
}

export interface MatchResult {
  job: JobListing;
  label: MatchLabel;
  missingSkills: string[];
  overall: number;
  reasons: string[];
  recommendedActions: string[];
}

export interface ResumeSection {
  id: string;
  items: ResumeSectionItem[];
  title: string;
}

export interface ResumeSectionItem {
  date?: string;
  description: string;
  highlights: string[];
  id: string;
  subtitle?: string;
  title: string;
}

export interface ResumeProfile {
  email: string;
  fullName: string;
  linkedIn?: string;
  location: string;
  phone: string;
  portfolio?: string;
  resumeScore: number;
  sections: ResumeSection[];
  skills: string[];
  summary: string;
  targetRole: string;
}

export interface ChecklistItem {
  checked: boolean;
  id: string;
  label: string;
}

export type CoverLetterTone =
  | "professional"
  | "conversational"
  | "enthusiastic"
  | "formal";

export interface CoverLetterDraft {
  body: string;
  createdAt: string;
  id: string;
  linkedApplicationId?: string;
  linkedJobId?: string;
  personalizationNotes: ChecklistItem[];
  recipientName?: string;
  status: CoverLetterStatus;
  targetCompany: string;
  targetJobTitle: string;
  tone: CoverLetterTone;
  updatedAt: string;
}

export interface CoverLetterToneOption {
  description: string;
  label: string;
  value: CoverLetterTone;
}

export type AutofillProviderStatus =
  | "not-installed"
  | "installed"
  | "connected"
  | "error";

export interface SupportedJobBoard {
  domain: string;
  id: string;
  name: string;
  status: AutofillProviderStatus;
}

export interface ApplicationQuestionAnswer {
  answer: string;
  field: string;
  question: string;
  type: "text" | "textarea" | "select" | "file" | "date";
}

export interface AutofillProfile {
  coverLetterId?: string;
  customAnswers: ApplicationQuestionAnswer[];
  id: string;
  name: string;
  resumeVersionId?: string;
}

export interface AutofillReadinessChecklist {
  completed: boolean;
  id: string;
  label: string;
}

export type FreelanceOpportunityStatus =
  | "open"
  | "in-progress"
  | "completed"
  | "cancelled";

export interface GigMatchScore {
  label: MatchLabel;
  missingSkills: string[];
  overall: number;
  reasons: string[];
}

export interface FreelanceOpportunity {
  budget?: string;
  client: string;
  deadline?: string;
  description: string;
  id: string;
  location: string;
  matchScore?: GigMatchScore;
  platform: string;
  platformLabel: string;
  postedAt: string;
  rate?: string;
  remote: boolean;
  requiredSkills: string[];
  slug: string;
  status: FreelanceOpportunityStatus;
  title: string;
}

export type ProposalStatus =
  | "draft"
  | "review"
  | "sent"
  | "accepted"
  | "declined";

export type ProposalTone =
  | "professional"
  | "friendly"
  | "enthusiastic"
  | "consultative";

export interface ProposalScopeItem {
  description: string;
  id: string;
  label: string;
}

export interface ProposalTimelineItem {
  description: string;
  duration: string;
  id: string;
  label: string;
}

export interface ProposalSection {
  body: string;
  id: string;
  title: string;
}

export interface ClientProposalDraft {
  clientName: string;
  clientProblem: string;
  createdAt: string;
  id: string;
  opportunityId: string;
  portfolioRefs: string[];
  proposalSections: ProposalSection[];
  proposedSolution: string;
  scopeItems: ProposalScopeItem[];
  status: ProposalStatus;
  suggestedBudget: string;
  timeline: ProposalTimelineItem[];
  tone: ProposalTone;
  updatedAt: string;
}

export type PortfolioVisibilityStatus =
  | "draft"
  | "preview"
  | "shared"
  | "public";

export interface PortfolioShareSettings {
  allowContact: boolean;
  id: string;
  shareUrl?: string;
  showContactForm: boolean;
  showResume: boolean;
  visibility: PortfolioVisibilityStatus;
}

export interface PortfolioProjectProof {
  description: string;
  highlights: string[];
  id: string;
  outcome: string;
  role: string;
  techStack: string[];
  title: string;
  url?: string;
}

export interface PublicPortfolioProfile {
  availability: string;
  contactEmail?: string;
  headline: string;
  id: string;
  name: string;
  projects: PortfolioProjectProof[];
  resumeSummary?: string;
  shareSettings: PortfolioShareSettings;
  skills: string[];
}
