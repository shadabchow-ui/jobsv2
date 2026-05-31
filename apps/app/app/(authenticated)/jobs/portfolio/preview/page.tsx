import { Badge } from "@repo/design-system/components/ui/badge";
import { Button } from "@repo/design-system/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/design-system/components/ui/card";
import {
  ExternalLinkIcon,
  GlobeIcon,
  LockIcon,
  MailIcon,
  MapPinIcon,
  ShieldCheckIcon,
  WifiIcon,
} from "lucide-react";
import type { Metadata } from "next";
import { mockPublicPortfolioProfile } from "@/lib/jobs/portfolio-data";
import { Header } from "../../../components/header";

export const metadata: Metadata = {
  title: "Portfolio Preview — Jobs Console",
  description: "Preview of your public portfolio profile.",
};

const visibilityConfig: Record<string, { label: string; color: string }> = {
  draft: {
    label: "Draft",
    color: "text-muted-foreground border-border bg-muted",
  },
  preview: {
    label: "Preview",
    color:
      "text-amber-600 border-amber-500/20 bg-amber-500/10 dark:text-amber-400",
  },
  shared: {
    label: "Shared",
    color: "text-blue-600 border-blue-500/20 bg-blue-500/10 dark:text-blue-400",
  },
  public: {
    label: "Public",
    color:
      "text-emerald-600 border-emerald-500/20 bg-emerald-500/10 dark:text-emerald-400",
  },
};

const PortfolioPreviewPage = () => {
  const profile = mockPublicPortfolioProfile;
  const visibility =
    visibilityConfig[profile.shareSettings.visibility] ??
    visibilityConfig.draft;

  return (
    <>
      <Header
        page="Portfolio Preview"
        pages={["Jobs Console", "Jobs", "Portfolio"]}
      />
      <div className="flex flex-1 flex-col gap-6 p-6 pt-0">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="space-y-1">
            <h1 className="font-semibold text-2xl tracking-tight">
              Portfolio Preview
            </h1>
            <p className="text-muted-foreground text-sm">
              This is how your portfolio appears to viewers. No real public
              sharing is active.
            </p>
          </div>
          <span
            className={`inline-flex shrink-0 items-center rounded-md border px-2 py-0.5 font-medium text-[11px] uppercase tracking-wide ${visibility.color}`}
          >
            {visibility.label}
          </span>
        </div>

        <div className="rounded-lg border border-dashed bg-muted/30 p-3">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-muted-foreground text-xs">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheckIcon className="size-3" />
              <span>Public sharing: </span>
              <span className="font-medium text-amber-500">not provided</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <GlobeIcon className="size-3" />
              <span>Share URL: </span>
              <span className="font-mono text-muted-foreground/50">
                {profile.shareSettings.shareUrl ?? "not provided"}
              </span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MailIcon className="size-3" />
              <span>Contact form: </span>
              <span className="font-medium text-amber-500">not provided</span>
            </span>
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="space-y-1.5">
                <CardTitle className="text-xl">{profile.name}</CardTitle>
                <p className="text-muted-foreground">{profile.headline}</p>
                <div className="flex flex-wrap items-center gap-3 text-muted-foreground text-xs">
                  <span className="inline-flex items-center gap-1">
                    <WifiIcon className="size-3" />
                    {profile.availability}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <MapPinIcon className="size-3" />
                    Location not provided
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  className="gap-1.5"
                  disabled
                  size="sm"
                  variant="outline"
                >
                  <MailIcon className="size-3.5" />
                  Contact
                </Button>
                <Button
                  className="gap-1.5"
                  disabled
                  size="sm"
                  variant="outline"
                >
                  <ExternalLinkIcon className="size-3.5" />
                  Share
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-1.5">
              {profile.skills.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {profile.resumeSummary && (
          <Card>
            <CardHeader>
              <CardTitle>Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {profile.resumeSummary}
              </p>
            </CardContent>
          </Card>
        )}

        <div className="space-y-3">
          <h2 className="font-medium text-muted-foreground text-xs uppercase tracking-wider">
            Projects
          </h2>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {profile.projects.map((project) => (
              <Card
                className="group transition-all duration-150 ease-out hover:shadow-md"
                key={project.id}
              >
                <CardHeader>
                  <CardTitle className="text-base">{project.title}</CardTitle>
                  <div className="flex items-center gap-2 text-muted-foreground text-xs">
                    <span className="rounded-md border bg-muted/50 px-1.5 py-0.5 font-medium">
                      {project.role}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="line-clamp-2 text-muted-foreground text-sm leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1">
                    {project.techStack.map((tech) => (
                      <Badge
                        className="text-[11px]"
                        key={tech}
                        variant="secondary"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="rounded-lg border bg-muted/30 p-3">
                    <p className="font-medium text-muted-foreground text-xs uppercase tracking-wider">
                      Key Outcome
                    </p>
                    <p className="mt-1 text-sm leading-relaxed">
                      {project.outcome}
                    </p>
                  </div>

                  <ul className="space-y-1.5">
                    {project.highlights.map((h) => (
                      <li
                        className="flex items-start gap-2 text-muted-foreground text-xs"
                        key={h}
                      >
                        <span className="mt-1 size-1 shrink-0 rounded-full bg-muted-foreground/40" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-dashed bg-muted/20 px-4 py-4">
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="flex size-8 items-center justify-center rounded-lg bg-muted">
              <LockIcon className="size-4 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground text-xs leading-relaxed">
              Public portfolio sharing is <strong>not provided</strong>. This
              preview is visible only to authenticated users. Real user data is
              not exposed publicly. Contact form, custom domain, and share URLs
              are not available.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PortfolioPreviewPage;
