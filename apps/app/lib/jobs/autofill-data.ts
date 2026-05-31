import type {
  ApplicationQuestionAnswer,
  AutofillProfile,
  AutofillReadinessChecklist,
  SupportedJobBoard,
} from "./types";

export const supportedJobBoards: SupportedJobBoard[] = [
  {
    id: "workday",
    name: "Workday",
    domain: "*.myworkdayjobs.com",
    status: "not-installed",
  },
  {
    id: "greenhouse",
    name: "Greenhouse",
    domain: "boards.greenhouse.io",
    status: "not-installed",
  },
  {
    id: "lever",
    name: "Lever",
    domain: "jobs.lever.co",
    status: "not-installed",
  },
  {
    id: "ashby",
    name: "Ashby",
    domain: "jobs.ashbyhq.com",
    status: "not-installed",
  },
  {
    id: "indeed",
    name: "Indeed",
    domain: "indeed.com",
    status: "not-installed",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    domain: "linkedin.com/jobs",
    status: "not-installed",
  },
];

export const commonApplicationAnswers: ApplicationQuestionAnswer[] = [
  {
    field: "cover-letter",
    question: "Why do you want to work here?",
    answer: "not provided — Will generate from profile + job description",
    type: "textarea",
  },
  {
    field: "linkedin",
    question: "LinkedIn Profile URL",
    answer: "not provided",
    type: "text",
  },
  {
    field: "portfolio",
    question: "Portfolio / Personal Website",
    answer: "not provided",
    type: "text",
  },
  {
    field: "github",
    question: "GitHub Profile",
    answer: "not provided",
    type: "text",
  },
  {
    field: "work-authorization",
    question: "Will you require visa sponsorship?",
    answer: "not provided",
    type: "select",
  },
  {
    field: "gender",
    question: "Gender (EEO reporting)",
    answer: "not provided",
    type: "select",
  },
  {
    field: "veteran",
    question: "Veteran status (EEO reporting)",
    answer: "not provided",
    type: "select",
  },
  {
    field: "disability",
    question: "Disability status (EEO reporting)",
    answer: "not provided",
    type: "select",
  },
  {
    field: "resume",
    question: "Resume / CV",
    answer: "not provided — Link resume version on submit",
    type: "file",
  },
  {
    field: "additional-info",
    question: "Additional information",
    answer: "not provided",
    type: "textarea",
  },
];

export const mockAutofillProfile: AutofillProfile = {
  id: "autofill-default",
  name: "Default Autofill Profile",
  resumeVersionId: undefined,
  coverLetterId: undefined,
  customAnswers: [],
};

export const autofillReadinessChecklist: AutofillReadinessChecklist[] = [
  {
    id: "af-1",
    label: "Install Jobs Console browser extension",
    completed: false,
  },
  {
    id: "af-2",
    label: "Connect extension to your account",
    completed: false,
  },
  {
    id: "af-3",
    label: "Upload at least one resume version",
    completed: false,
  },
  {
    id: "af-4",
    label: "Set default resume version",
    completed: false,
  },
  {
    id: "af-5",
    label: "Configure common application answers",
    completed: false,
  },
  {
    id: "af-6",
    label: "Review supported job boards",
    completed: false,
  },
  {
    id: "af-7",
    label: "Grant one-time permissions per job board",
    completed: false,
  },
];
