import { mockResumeProfile } from "./data";
import type { ResumeProfile } from "./types";

export interface ResumeVersion {
  createdAt: string;
  id: string;
  label: string;
  profile: ResumeProfile;
  targetRole: string;
  updatedAt: string;
}

const mockVersions: ResumeVersion[] = [
  {
    id: "rv-1",
    label: "Senior Frontend Engineer — General",
    targetRole: "Senior Frontend Engineer",
    profile: {
      ...mockResumeProfile,
      fullName: "Alex Morgan",
      email: "alex.morgan@example.com",
      phone: "(415) 555-0123",
      location: "San Francisco, CA",
    },
    createdAt: "2026-05-20T00:00:00Z",
    updatedAt: "2026-05-28T00:00:00Z",
  },
  {
    id: "rv-2",
    label: "Staff Frontend Engineer — Netflix",
    targetRole: "Staff Frontend Engineer",
    profile: {
      ...mockResumeProfile,
      fullName: "Alex Morgan",
      email: "alex.morgan@example.com",
      phone: "(415) 555-0123",
      location: "Los Gatos, CA",
      targetRole: "Staff Frontend Engineer",
      summary:
        "Staff frontend engineer with 8+ years of experience building high-performance, accessible UI systems at scale.",
      resumeScore: 81,
    },
    createdAt: "2026-05-25T00:00:00Z",
    updatedAt: "2026-05-29T00:00:00Z",
  },
  {
    id: "rv-3",
    label: "Engineering Manager — Platform",
    targetRole: "Engineering Manager",
    profile: {
      ...mockResumeProfile,
      fullName: "Alex Morgan",
      email: "alex.morgan@example.com",
      phone: "(415) 555-0123",
      location: "San Francisco, CA",
      targetRole: "Engineering Manager",
      summary:
        "Engineering leader with 8+ years of frontend expertise and 3+ years leading cross-functional platform teams.",
      resumeScore: 67,
    },
    createdAt: "2026-05-27T00:00:00Z",
    updatedAt: "2026-05-30T00:00:00Z",
  },
];

export function listResumeVersions(): ResumeVersion[] {
  return [...mockVersions];
}

export function getResumeVersionById(id: string): ResumeVersion | undefined {
  return mockVersions.find((v) => v.id === id);
}

export function createResumeVersion(
  label: string,
  targetRole: string,
  profile: ResumeProfile
): ResumeVersion {
  const version: ResumeVersion = {
    id: `rv-${Date.now()}`,
    label,
    targetRole,
    profile,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  mockVersions.push(version);
  return version;
}

export function duplicateResumeVersion(
  id: string,
  label: string
): ResumeVersion | undefined {
  const source = mockVersions.find((v) => v.id === id);
  if (!source) {
    return undefined;
  }
  const version: ResumeVersion = {
    id: `rv-${Date.now()}`,
    label,
    targetRole: source.targetRole,
    profile: { ...source.profile },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  mockVersions.push(version);
  return version;
}
