import { mockCoverLetterDrafts, mockToneOptions } from "./data";
import type { CoverLetterTone } from "./types";

export interface CoverLetterInput {
  company: string;
  jobDescription: string;
  jobTitle: string;
  tone: CoverLetterTone;
  userFullName: string;
  userHighlights: string[];
  userSkills: string[];
  userSummary: string;
}

export interface GeneratedCoverLetter {
  aiProvider: string;
  body: string;
  isMock: boolean;
  toneUsed: CoverLetterTone;
  warnings: string[];
}

export function generateMockCoverLetter(
  input: CoverLetterInput
): GeneratedCoverLetter {
  const existing = mockCoverLetterDrafts.find(
    (d) =>
      d.targetJobTitle.toLowerCase() === input.jobTitle.toLowerCase() &&
      d.targetCompany.toLowerCase() === input.company.toLowerCase() &&
      d.tone === input.tone
  );

  if (existing) {
    return {
      body: existing.body,
      toneUsed: input.tone,
      warnings: [
        "This draft uses pre-written mock content. AI generation is not configured.",
      ],
      aiProvider: "not provided",
      isMock: true,
    };
  }

  const toneLabel =
    mockToneOptions.find((t) => t.value === input.tone)?.label ??
    "professional";

  const skillsSection =
    input.userSkills.length > 0
      ? input.userSkills.slice(0, 4).join(", ")
      : "relevant skills";

  const body = `Dear Hiring Manager,

I am writing to express my interest in the ${input.jobTitle} position at ${input.company}. ${input.userSummary}

Throughout my career, I have developed expertise in ${skillsSection}. I am excited about the opportunity to bring my experience to ${input.company} and contribute to your team's success.

I would welcome the chance to discuss how my background aligns with this role. Thank you for your consideration.

Best regards,
${input.userFullName}`;

  return {
    body,
    toneUsed: input.tone,
    warnings: [
      `Tone "${toneLabel}" is a placeholder — draft uses standard professional format.`,
      "AI generation is not configured. This is template-based content.",
      "Review and personalize before use.",
    ],
    aiProvider: "not provided",
    isMock: true,
  };
}

export function generateCoverLetterChecklist(
  input: CoverLetterInput
): { id: string; label: string; checked: boolean }[] {
  const personalizationItems = [
    {
      id: "cl-gen-1",
      label: `Recipient name confirmed for ${input.company}`,
      checked: false,
    },
    {
      id: "cl-gen-2",
      label: `Company and role "${input.jobTitle}" in opening line`,
      checked: true,
    },
    {
      id: "cl-gen-3",
      label: `Mentioned specific project or value at ${input.company}`,
      checked: false,
    },
    {
      id: "cl-gen-4",
      label: "Linked skills from resume to job requirements",
      checked: input.userSkills.length > 0,
    },
    {
      id: "cl-gen-5",
      label: "Addressed potential resume gaps",
      checked: false,
    },
    {
      id: "cl-gen-6",
      label: "Closing includes call to action",
      checked: true,
    },
  ];

  if (input.userHighlights.length > 0) {
    personalizationItems.push({
      id: "cl-gen-7",
      label: `Incorporated specific achievement: "${input.userHighlights[0]}"`,
      checked: false,
    });
  }

  return personalizationItems;
}

export const aiProviderStatus = "not provided" as const;
