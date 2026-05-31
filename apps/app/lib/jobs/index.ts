export {
  autofillReadinessChecklist,
  commonApplicationAnswers,
  mockAutofillProfile,
  supportedJobBoards,
} from "./autofill-data";
export {
  APPLICATION_STATUS_CLASSES,
  APPLICATION_STATUS_LABELS,
  APPLICATION_STATUSES,
  PIPELINE_STATUSES,
  TERMINAL_STATUSES,
} from "./constants";
export type {
  CoverLetterInput,
  GeneratedCoverLetter,
} from "./cover-letter-generation";
export {
  aiProviderStatus as coverLetterAiStatus,
  generateCoverLetterChecklist,
  generateMockCoverLetter,
} from "./cover-letter-generation";
export {
  mockCandidateProfile,
  mockCareerProfile,
  mockCoverLetterChecklist,
  mockCoverLetterDrafts,
  mockEducation,
  mockJobPostings,
  mockJobs,
  mockResumeChecklist,
  mockResumeProfile,
  mockResumeSections,
  mockToneOptions,
} from "./data";
export type {
  ApiConfiguration,
  DataQualityReport,
  DiagnosticsReport,
  MockFallbackStatus,
  ProviderStatus,
  SearchCacheStatus,
  TroubleshootingItem,
} from "./diagnostics";
export { getFullDiagnostics } from "./diagnostics";
export type {
  CandidateReadinessScore,
  CandidateSkillSignal,
  EmployerDashboardSummary,
  EmployerJobPostingDraft,
  EmployerPipelineStage,
  RecruiterCandidatePreview,
} from "./employer-data";
export {
  mockCandidatePreviews,
  mockCandidateReadiness,
  mockEmployerSummary,
  mockJobPostingDrafts,
  mockSkillSignals,
} from "./employer-data";
export { freelancePlatformOptions, mockFreelanceGigs } from "./freelance-data";
export type {
  GigDeliverable,
  GigFaqItem,
  GigListingDraft,
  GigListingStatus,
  GigPackage,
} from "./gig-listing-data";
export {
  gigReadinessItems,
  mockGigDraft,
  serviceCategories,
} from "./gig-listing-data";
export type { JobDetailData } from "./helpers";
export {
  getApplicationCounts,
  getJobDetailById,
  getStatusClass,
  getStatusLabel,
  getTotalCount,
  groupApplicationsByStatus,
} from "./helpers";
export type {
  GeneratedStarAnswer,
  InterviewPrepInput,
  StarOutline,
} from "./interview-generation";
export {
  aiProviderStatus as interviewAiStatus,
  generateMockBehavioralQuestions,
  generateMockQuestionsToAsk,
  generateMockStarOutline,
  generateMockTechnicalQuestions,
} from "./interview-generation";
export type {
  BehavioralQuestion,
  InterviewPrepSession,
  QuestionDifficulty,
  QuestionToAsk,
  TechnicalQuestion,
} from "./interview-prep";
export { mockInterviewPrep } from "./interview-prep";
export { scoreJob, scoreJobs } from "./match-score";
export { mockApplications, mockSavedJobs } from "./mock-data";
export type { RawJobData } from "./normalize";
export { dedupeJobs, normalizeJobPosting } from "./normalize";
export {
  mockPortfolioProjects,
  mockPortfolioReadiness,
  mockPublicPortfolioProfile,
  mockRecruiterSummary,
  mockShareSettings,
} from "./portfolio-data";
export {
  getProvider,
  jobsSearchApiProvider,
  mockProvider,
} from "./providers";
export type {
  JobSearchProvider,
  ProviderConfig,
  ProviderResult,
} from "./providers/types";
export type {
  ExportReadyResume,
  ExportReadySection,
  ExportReadySectionItem,
  PlainTextResume,
  SupportedExportFormat,
  UnsupportedExportFormat,
} from "./resume-export";
export {
  generatePlainText,
  normalizeForExport,
  supportedExportFormats,
  unsupportedExportFormats,
} from "./resume-export";
export type { ResumeVersion } from "./resume-store";
export {
  createResumeVersion,
  duplicateResumeVersion,
  getResumeVersionById,
  listResumeVersions,
} from "./resume-store";
export type {
  BulletSuggestion,
  SectionSuggestion,
  TailoringInput,
  TailoringOutput,
} from "./resume-tailoring";
export {
  generateTailoringRecommendations,
  getTailoringServiceStatus,
} from "./resume-tailoring";
export type {
  CompensationComponent,
  NegotiationChecklistItem,
  NegotiationScriptTemplate,
  OfferComparison,
  SalaryQuestion,
  SalaryRangeData,
} from "./salary-data";
export {
  mockCompensationComponents,
  mockNegotiationChecklist,
  mockNegotiationScripts,
  mockOfferComparisons,
  mockSalaryQuestions,
  mockSalaryRanges,
  mockTargetLocation,
  mockTargetRole,
} from "./salary-data";
export {
  clearSearchCache,
  getActiveProviderName,
  getCacheStats,
  getJobById,
  getJobByIdProvider,
  isMockProvider,
  searchJobs,
  searchJobsDeduplicated,
  searchJobsProvider,
  setActiveProvider,
} from "./search";
export type {
  SkillCategory,
  SkillGap,
  SkillGapAnalysis,
  SkillImportance,
  SkillLevel,
} from "./skill-gaps";
export { mockSkillGapAnalysis } from "./skill-gaps";
export type {
  ApplicationQuestionAnswer,
  ApplicationRecord,
  ApplicationStatus,
  AutofillProfile,
  AutofillProviderStatus,
  AutofillReadinessChecklist,
  CandidateProfile,
  CareerProfile,
  ChecklistItem,
  CoverLetterDraft,
  CoverLetterTone,
  CoverLetterToneOption,
  EducationEntry,
  FreelanceOpportunity,
  FreelanceOpportunityStatus,
  GigMatchScore,
  Job,
  JobListing,
  JobMatchScore,
  JobSearchFilters,
  JobSearchQuery,
  JobSearchResult,
  JobSkill,
  MatchLabel,
  MatchResult,
  PortfolioProjectProof,
  PortfolioShareSettings,
  PortfolioVisibilityStatus,
  PublicPortfolioProfile,
  ResumeProfile,
  ResumeSection,
  ResumeSectionItem,
  SalaryRange,
  SavedJob,
  SearchResultState,
  SearchResultStatus,
  SupportedJobBoard,
  UpcubeJobPosting,
} from "./types";
export {
  computeMockMatchLabel,
  countApplicationsByStatus,
  formatSalaryRange,
  normalizeEmploymentTypeLabel,
  normalizeRemoteTypeLabel,
} from "./utils";
