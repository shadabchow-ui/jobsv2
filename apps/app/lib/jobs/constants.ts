import type { ApplicationStatus } from "./types";

export const APPLICATION_STATUS_LABELS: Record<ApplicationStatus, string> = {
  saved: "Saved",
  "resume-tailored": "Resume Tailored",
  "cover-letter-ready": "Cover Letter Ready",
  applied: "Applied",
  "recruiter-contacted": "Recruiter Contacted",
  interviewing: "Interviewing",
  offer: "Offer",
  rejected: "Rejected",
  "follow-up-needed": "Follow-up Needed",
};

export const APPLICATION_STATUS_CLASSES: Record<ApplicationStatus, string> = {
  saved: "bg-muted text-muted-foreground border-border",
  "resume-tailored":
    "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800",
  "cover-letter-ready":
    "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950 dark:text-purple-300 dark:border-purple-800",
  applied:
    "bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800",
  "recruiter-contacted":
    "bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-950 dark:text-cyan-300 dark:border-cyan-800",
  interviewing:
    "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800",
  offer:
    "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800",
  rejected:
    "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800",
  "follow-up-needed":
    "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950 dark:text-orange-300 dark:border-orange-800",
};

export const APPLICATION_STATUSES: ApplicationStatus[] = [
  "saved",
  "resume-tailored",
  "cover-letter-ready",
  "applied",
  "recruiter-contacted",
  "interviewing",
  "offer",
  "rejected",
  "follow-up-needed",
];

export const PIPELINE_STATUSES: ApplicationStatus[] = [
  "saved",
  "resume-tailored",
  "cover-letter-ready",
  "applied",
  "recruiter-contacted",
  "interviewing",
  "offer",
];

export const TERMINAL_STATUSES: ApplicationStatus[] = [
  "rejected",
  "follow-up-needed",
];
