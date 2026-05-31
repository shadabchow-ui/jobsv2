import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/design-system/components/ui/card";
import {
  BellIcon,
  FileTextIcon,
  GanttChartIcon,
  LockIcon,
  PlugIcon,
  PuzzleIcon,
  SearchIcon,
  SlidersHorizontalIcon,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "../../components/header";

export const metadata: Metadata = {
  title: "Jobs Settings",
  description:
    "Job search, match scoring, application tracking, and preferences.",
};

interface SettingsSection {
  icon: React.ComponentType<{ className?: string }>;
  id: string;
  items: { label: string; value: string }[];
  placeholder?: boolean;
  route?: string;
  title: string;
}

const settingsSections: SettingsSection[] = [
  {
    icon: SearchIcon,
    id: "search-preferences",
    items: [
      { label: "Preferred job boards", value: "not provided" },
      { label: "Excluded companies", value: "not provided" },
      { label: "Location preferences", value: "not provided" },
      { label: "Remote preference", value: "not provided" },
    ],
    title: "Job Search Preferences",
  },
  {
    icon: SlidersHorizontalIcon,
    id: "match-scoring",
    items: [
      { label: "Skill weight", value: "not provided" },
      { label: "Experience weight", value: "not provided" },
      { label: "Location weight", value: "not provided" },
      { label: "Salary weight", value: "not provided" },
    ],
    title: "Match Scoring Preferences",
  },
  {
    icon: GanttChartIcon,
    id: "application-tracking",
    items: [
      { label: "Default pipeline statuses", value: "not provided" },
      { label: "Auto-archive after", value: "not provided" },
      { label: "Follow-up cadence", value: "not provided" },
    ],
    title: "Application Tracking Preferences",
  },
  {
    icon: FileTextIcon,
    id: "resume-cover-letter",
    items: [
      { label: "Default resume", value: "not provided" },
      { label: "Default cover letter tone", value: "not provided" },
      { label: "ATS keyword targets", value: "not provided" },
    ],
    title: "Resume & Cover Letter Preferences",
  },
  {
    icon: PuzzleIcon,
    id: "browser-autofill",
    items: [
      { label: "Extension status", value: "not installed" },
      { label: "Supported job boards", value: "6 planned" },
      { label: "Default resume version", value: "not provided" },
    ],
    title: "Browser Autofill",
    route: "/jobs/autofill",
  },
  {
    icon: BellIcon,
    id: "notifications",
    items: [
      { label: "Application reminders", value: "not provided" },
      { label: "Interview reminders", value: "not provided" },
      { label: "New match alerts", value: "not provided" },
      { label: "Follow-up nudges", value: "not provided" },
    ],
    title: "Notification & Reminder Preferences",
    placeholder: true,
  },
  {
    icon: LockIcon,
    id: "privacy",
    items: [
      { label: "Profile visibility", value: "not provided" },
      { label: "Data sharing preferences", value: "not provided" },
    ],
    title: "Privacy & Data Usage",
    placeholder: true,
  },
  {
    icon: PlugIcon,
    id: "api-providers",
    items: [
      { label: "Job board API status", value: "not provided" },
      { label: "AI matching provider", value: "not provided" },
      { label: "Resume parsing service", value: "not provided" },
    ],
    title: "API & Provider Status",
    placeholder: true,
    route: "/jobs/diagnostics",
  },
];

const SettingsPage = () => (
  <>
    <Header page="Settings" pages={["Jobs Console", "Jobs"]} />
    <div className="flex flex-1 animate-fade-in flex-col gap-6 p-6 pt-0">
      <div className="space-y-1">
        <h1 className="font-semibold text-2xl tracking-tight">Jobs Settings</h1>
        <p className="text-muted-foreground text-sm">
          Configure your job search, matching, and application preferences.
          Settings are local and not persisted yet.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {settingsSections.map((section) => {
          const card = (
            <Card
              className={section.placeholder ? "opacity-60" : undefined}
              key={section.id}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-muted">
                    <section.icon className="size-4 text-muted-foreground" />
                  </div>
                  <div className="space-y-0.5">
                    <CardTitle className="text-sm">{section.title}</CardTitle>
                    {section.placeholder && (
                      <CardDescription className="text-[10px] uppercase tracking-wider">
                        Coming soon
                      </CardDescription>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {section.items.map((item) => (
                  <div
                    className="flex items-center justify-between gap-2 rounded-md bg-muted/30 px-2.5 py-1.5"
                    key={item.label}
                  >
                    <span className="text-muted-foreground text-xs">
                      {item.label}
                    </span>
                    <span className="shrink-0 font-mono text-[10px] text-muted-foreground/50">
                      {item.value}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          );

          if (section.route) {
            return (
              <Link
                className="transition-opacity hover:opacity-80"
                href={section.route}
                key={section.id}
              >
                {card}
              </Link>
            );
          }

          return card;
        })}
      </div>

      <div className="rounded-lg border border-dashed bg-muted/20 px-4 py-3">
        <p className="text-center text-muted-foreground text-xs">
          Settings are local previews only. Real configuration, persistence, and
          provider integration are not provided.
        </p>
      </div>
    </div>
  </>
);

export default SettingsPage;
