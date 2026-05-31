import { Button } from "@repo/design-system/components/ui/button";
import { Card } from "@repo/design-system/components/ui/card";
import { cn } from "@repo/design-system/lib/utils";
import {
  BookOpenIcon,
  BriefcaseIcon,
  FileTextIcon,
  GlobeIcon,
  GraduationCapIcon,
  LinkIcon,
  MapPinIcon,
  SearchIcon,
  SparklesIcon,
  TargetIcon,
  UserCheckIcon,
  WrenchIcon,
} from "lucide-react";
import type { CareerProfile } from "@/lib/jobs";

interface ProfileCardProps {
  profile: CareerProfile;
}

const completionColor = (completion: number): string => {
  if (completion >= 80) {
    return "bg-emerald-500";
  }
  if (completion >= 50) {
    return "bg-amber-500";
  }
  return "bg-muted-foreground/30";
};

function completionPercentage(profile: CareerProfile): number {
  let filled = 0;
  const total = 11;
  if (profile.desiredRole) {
    filled++;
  }
  if (profile.targetRoles.length > 0) {
    filled++;
  }
  if (profile.preferredLocations.length > 0) {
    filled++;
  }
  if (profile.remotePreference) {
    filled++;
  }
  if (profile.employmentType) {
    filled++;
  }
  if (profile.salaryExpectation) {
    filled++;
  }
  if (profile.experienceLevel) {
    filled++;
  }
  if (profile.skills.length > 0) {
    filled++;
  }
  if (profile.education.length > 0) {
    filled++;
  }
  if (profile.workAuthorization) {
    filled++;
  }
  if (profile.portfolioLinks.length > 0) {
    filled++;
  }
  return Math.round((filled / total) * 100);
}

function SectionHeading({
  icon: Icon,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex size-7 items-center justify-center rounded-md bg-muted">
        <Icon className="size-3.5 text-muted-foreground" />
      </div>
      <span className="font-medium text-[11px] text-muted-foreground uppercase tracking-wider">
        {label}
      </span>
    </div>
  );
}

export const ProfileCard = ({ profile }: ProfileCardProps) => {
  const completion = completionPercentage(profile);

  return (
    <div className="space-y-4">
      <Card className="overflow-hidden border">
        <div className="p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                <UserCheckIcon className="size-5 text-primary" />
              </div>
              <div>
                <h2 className="font-semibold">Career Profile</h2>
                <p className="text-muted-foreground text-xs">
                  {profile.summary}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-border/50 border-t px-5 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-2 flex-1 overflow-hidden rounded-full bg-muted">
              <div
                className={cn(
                  "h-full rounded-full transition-all duration-500",
                  completionColor(completion)
                )}
                style={{ width: `${completion}%` }}
              />
            </div>
            <span className="shrink-0 font-medium text-[11px] text-muted-foreground">
              {completion}% complete
            </span>
          </div>
        </div>
      </Card>

      <Card className="border p-5">
        <div className="space-y-6">
          <SectionHeading icon={TargetIcon} label="Target Roles" />
          <div className="flex flex-wrap gap-2">
            {profile.targetRoles.map((role) => (
              <span
                className="inline-flex items-center rounded-md border bg-muted px-2.5 py-1 font-medium text-xs"
                key={role}
              >
                {role}
              </span>
            ))}
          </div>
        </div>
      </Card>

      <Card className="border p-5">
        <div className="space-y-4">
          <SectionHeading icon={MapPinIcon} label="Location & Work Type" />
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-1">
              <p className="text-[11px] text-muted-foreground uppercase tracking-wider">
                Preferred Locations
              </p>
              <ul className="space-y-0.5">
                {profile.preferredLocations.map((loc) => (
                  <li className="text-sm" key={loc}>
                    {loc}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-1">
              <p className="text-[11px] text-muted-foreground uppercase tracking-wider">
                Remote Preference
              </p>
              <p className="text-sm capitalize">{profile.remotePreference}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[11px] text-muted-foreground uppercase tracking-wider">
                Employment Type
              </p>
              <p className="text-sm">{profile.employmentType}</p>
            </div>
          </div>
        </div>
      </Card>

      <Card className="border p-5">
        <div className="space-y-4">
          <SectionHeading icon={BriefcaseIcon} label="Salary & Experience" />
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1">
              <p className="text-[11px] text-muted-foreground uppercase tracking-wider">
                Salary Expectation
              </p>
              <p className="font-medium text-sm">
                ${profile.salaryExpectation.min.toLocaleString()} – $
                {profile.salaryExpectation.max.toLocaleString()}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-[11px] text-muted-foreground uppercase tracking-wider">
                Experience Level
              </p>
              <p className="font-medium text-sm">{profile.experienceLevel}</p>
            </div>
          </div>
        </div>
      </Card>

      <Card className="border p-5">
        <div className="space-y-4">
          <SectionHeading icon={WrenchIcon} label="Skills" />
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill) => (
              <span
                className="inline-flex items-center rounded-full bg-muted px-2.5 py-1 font-medium text-xs"
                key={skill}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </Card>

      <Card className="border p-5">
        <div className="space-y-4">
          <SectionHeading icon={GraduationCapIcon} label="Education" />
          {profile.education.length > 0 ? (
            profile.education.map((edu) => (
              <div
                className="space-y-1"
                key={`${edu.institution}-${edu.degree}`}
              >
                <p className="font-medium text-sm">
                  {edu.degree} in {edu.field}
                </p>
                <p className="text-muted-foreground text-xs">
                  {edu.institution}
                  {edu.startYear && edu.endYear
                    ? ` · ${edu.startYear} – ${edu.endYear}`
                    : ""}
                </p>
              </div>
            ))
          ) : (
            <p className="text-muted-foreground text-xs">not provided</p>
          )}
        </div>
      </Card>

      <Card className="border p-5">
        <div className="space-y-4">
          <SectionHeading
            icon={GlobeIcon}
            label="Work Authorization & Sponsorship"
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1">
              <p className="text-[11px] text-muted-foreground uppercase tracking-wider">
                Authorization
              </p>
              <p className="text-sm">{profile.workAuthorization}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[11px] text-muted-foreground uppercase tracking-wider">
                Sponsorship Needed
              </p>
              <p className="text-sm">
                {profile.sponsorshipRequired ? "Yes" : "No"}
              </p>
            </div>
          </div>
        </div>
      </Card>

      <Card className="border p-5">
        <div className="space-y-4">
          <SectionHeading icon={LinkIcon} label="Portfolio Links" />
          {profile.portfolioLinks.length > 0 ? (
            <ul className="space-y-1">
              {profile.portfolioLinks.map((link) => (
                <li key={link}>
                  <a
                    className="text-primary text-sm underline underline-offset-2 hover:text-primary/80"
                    href={link}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground text-xs">not provided</p>
          )}
        </div>
      </Card>

      <div className="flex flex-wrap items-center gap-2">
        <Button
          className="h-8 gap-1.5 px-3 text-xs"
          disabled
          size="sm"
          title="Not available — profile updates are not persisted"
          type="button"
        >
          <FileTextIcon className="size-3.5" />
          Update Profile
        </Button>
        <Button
          className="h-8 gap-1.5 px-3 text-xs"
          disabled
          size="sm"
          title="Not available — match accuracy is static demo data"
          type="button"
          variant="secondary"
        >
          <SparklesIcon className="size-3.5" />
          Improve Match Accuracy
        </Button>
        <Button
          className="h-8 gap-1.5 px-3 text-xs"
          disabled
          size="sm"
          title="Not available — demo data only"
          type="button"
          variant="outline"
        >
          <SearchIcon className="size-3.5" />
          Use Profile for Job Search
        </Button>
        <Button
          className="h-8 gap-1.5 px-3 text-xs"
          disabled
          size="sm"
          title="Not available — match results are static"
          type="button"
          variant="ghost"
        >
          <BookOpenIcon className="size-3.5" />
          View Match Results
        </Button>
      </div>

      <p className="text-[10px] text-muted-foreground/50">
        Profile data is static/demo content. Updates are not persisted.
      </p>
    </div>
  );
};
