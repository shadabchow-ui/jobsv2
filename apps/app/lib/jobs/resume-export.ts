import type { ResumeProfile } from "./types";

const WHITESPACE = /\s+/;

export interface ExportReadyResume {
  email: string;
  fullName: string;
  linkedIn?: string;
  location: string;
  phone: string;
  portfolio?: string;
  sections: ExportReadySection[];
  summary: string;
  targetRole: string;
}

export interface ExportReadySection {
  items: ExportReadySectionItem[];
  title: string;
}

export interface ExportReadySectionItem {
  date?: string;
  description: string;
  highlights: string[];
  subtitle?: string;
  title: string;
}

export interface PlainTextResume {
  lineCount: number;
  text: string;
  wordCount: number;
}

export function normalizeForExport(profile: ResumeProfile): ExportReadyResume {
  return {
    fullName: profile.fullName,
    email: profile.email,
    phone: profile.phone,
    location: profile.location,
    linkedIn: profile.linkedIn,
    portfolio: profile.portfolio,
    summary: profile.summary,
    targetRole: profile.targetRole,
    sections: profile.sections.map((section) => ({
      title: section.title,
      items: section.items.map((item) => ({
        title: item.title,
        subtitle: item.subtitle,
        date: item.date,
        description: item.description,
        highlights: [...item.highlights],
      })),
    })),
  };
}

export function generatePlainText(profile: ResumeProfile): PlainTextResume {
  const lines: string[] = [];
  lines.push(profile.fullName.toUpperCase());
  lines.push(
    [profile.email, profile.phone, profile.location].filter(Boolean).join(" | ")
  );
  if (profile.linkedIn) {
    lines.push(profile.linkedIn);
  }
  if (profile.portfolio) {
    lines.push(profile.portfolio);
  }
  lines.push("");
  lines.push(profile.summary);
  lines.push("");

  for (const section of profile.sections) {
    lines.push(section.title.toUpperCase());
    lines.push("");
    for (const item of section.items) {
      const heading = [item.title, item.subtitle, item.date]
        .filter(Boolean)
        .join(" — ");
      lines.push(heading);
      if (item.description) {
        lines.push(item.description);
      }
      for (const highlight of item.highlights) {
        lines.push(`  • ${highlight}`);
      }
      lines.push("");
    }
  }

  const text = lines.join("\n");
  return {
    text,
    lineCount: lines.length,
    wordCount: text.split(WHITESPACE).filter(Boolean).length,
  };
}

export const supportedExportFormats = ["plain-text"] as const;
export const unsupportedExportFormats = ["pdf", "docx"] as const;

export type SupportedExportFormat = (typeof supportedExportFormats)[number];
export type UnsupportedExportFormat = (typeof unsupportedExportFormats)[number];
