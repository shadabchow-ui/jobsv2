import { groupApplicationsByStatus } from "./helpers";
import type { ApplicationRecord, ApplicationStatus, MatchLabel } from "./types";

export function formatSalaryRange(min: number, max: number): string {
  return `$${min.toLocaleString("en-US")} – $${max.toLocaleString("en-US")}`;
}

export function normalizeEmploymentTypeLabel(type: string): string {
  const normalized = type.toLowerCase().replace(/_/g, "-");
  const labels: Record<string, string> = {
    "full-time": "Full-time",
    "part-time": "Part-time",
    contract: "Contract",
    temporary: "Temporary",
    internship: "Internship",
    freelance: "Freelance",
  };
  return labels[normalized] ?? type;
}

export function normalizeRemoteTypeLabel(
  location: string,
  remote?: boolean
): "Remote" | "Hybrid" | "On-site" {
  if (remote === true) {
    return "Remote";
  }
  const loc = location.toLowerCase();
  if (loc.includes("remote")) {
    return "Remote";
  }
  if (loc.includes("hybrid")) {
    return "Hybrid";
  }
  return "On-site";
}

export function computeMockMatchLabel(score: number): MatchLabel {
  if (score >= 80) {
    return "Strong match";
  }
  if (score >= 60) {
    return "Good match";
  }
  if (score >= 40) {
    return "Stretch role";
  }
  return "Low match";
}

export function countApplicationsByStatus(
  applications: ApplicationRecord[]
): Record<ApplicationStatus, number> {
  const groups = groupApplicationsByStatus(applications);
  const counts: Record<string, number> = {};
  for (const [status, apps] of groups) {
    counts[status] = apps.length;
  }
  return counts as Record<ApplicationStatus, number>;
}
