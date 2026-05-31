import { Button } from "@repo/design-system/components/ui/button";
import { cn } from "@repo/design-system/lib/utils";
import {
  BriefcaseIcon,
  FileTextIcon,
  GraduationCapIcon,
  ScrollTextIcon,
  SearchIcon,
  UserCheckIcon,
} from "lucide-react";
import Link from "next/link";

interface OnboardingStep {
  actionHref?: string;
  actionLabel?: string;
  description: string;
  icon: typeof SearchIcon;
  id: string;
  number: number;
  title: string;
}

const defaultSteps: OnboardingStep[] = [
  {
    id: "create-profile",
    number: 1,
    icon: UserCheckIcon,
    title: "Create your profile",
    description:
      "Define your target roles, skills, and preferences for personalized job matching.",
    actionLabel: "Set up profile",
    actionHref: "/jobs/profile",
  },
  {
    id: "search-jobs",
    number: 2,
    icon: SearchIcon,
    title: "Search for jobs",
    description:
      "Discover opportunities across your network and beyond with smart filters.",
    actionLabel: "Search jobs",
    actionHref: "/jobs/search",
  },
  {
    id: "review-matches",
    number: 3,
    icon: BriefcaseIcon,
    title: "Review your matches",
    description:
      "See AI-powered recommendations ranked by how well they fit your profile.",
    actionLabel: "View matches",
    actionHref: "/jobs/match",
  },
  {
    id: "build-resume",
    number: 4,
    icon: ScrollTextIcon,
    title: "Build your resume",
    description:
      "Create and tailor resumes with built-in scoring and ATS keyword checking.",
    actionLabel: "Build resume",
    actionHref: "/jobs/resume",
  },
  {
    id: "track-applications",
    number: 5,
    icon: FileTextIcon,
    title: "Track applications",
    description:
      "Monitor your job applications from initial interest through to offer.",
    actionLabel: "View applications",
    actionHref: "/jobs/applications",
  },
  {
    id: "prepare-interviews",
    number: 6,
    icon: GraduationCapIcon,
    title: "Prepare for interviews",
    description:
      "Get ready with behavioral and technical question sets tailored to your applications.",
    actionLabel: "Start prep",
    actionHref: "/jobs/interview-prep",
  },
];

interface OnboardingGuideProps {
  className?: string;
  steps?: OnboardingStep[];
}

export const OnboardingGuide = ({
  className,
  steps = defaultSteps,
}: OnboardingGuideProps) => (
  <div
    className={cn(
      "rounded-xl border bg-card p-5 transition-all duration-150 ease-out",
      className
    )}
  >
    <div className="mb-4 space-y-1">
      <h2 className="font-semibold text-sm">Get Started with Jobs</h2>
      <p className="text-muted-foreground text-xs">
        Follow these steps to set up your job search and start tracking
        applications.
      </p>
    </div>
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {steps.map((step) => {
        const Icon = step.icon;
        return (
          <div
            className="flex flex-col gap-2.5 rounded-lg border bg-background p-3 transition-colors hover:bg-accent/30"
            key={step.id}
          >
            <div className="flex items-center gap-2">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 font-medium font-mono text-[11px] text-primary">
                {step.number}
              </span>
              <Icon className="size-3.5 text-muted-foreground" />
            </div>
            <div className="space-y-1">
              <p className="font-medium text-xs leading-tight">{step.title}</p>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
            {step.actionLabel && step.actionHref && (
              <Button
                asChild
                className="mt-auto h-7 gap-1 px-2.5 text-[11px]"
                size="sm"
                variant="outline"
              >
                <Link href={step.actionHref}>{step.actionLabel}</Link>
              </Button>
            )}
          </div>
        );
      })}
    </div>
  </div>
);
