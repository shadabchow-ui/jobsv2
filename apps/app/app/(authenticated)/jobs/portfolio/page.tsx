import { Badge } from "@repo/design-system/components/ui/badge";
import { Button } from "@repo/design-system/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/design-system/components/ui/card";
import { cn } from "@repo/design-system/lib/utils";
import {
  CheckIcon,
  FileTextIcon,
  GlobeIcon,
  PlusIcon,
  SparklesIcon,
  TargetIcon,
} from "lucide-react";
import Link from "next/link";
import {
  mockPortfolioProjects,
  mockPortfolioReadiness,
  mockRecruiterSummary,
} from "@/lib/jobs/portfolio-data";
import { Header } from "../../components/header";

const PortfolioPage = () => {
  const readinessScore = Math.round(
    (mockPortfolioReadiness.filter((r) => r.done).length /
      mockPortfolioReadiness.length) *
      100
  );

  return (
    <>
      <Header page="Portfolio" pages={["Jobs Console", "Jobs"]} />
      <div className="flex flex-1 flex-col gap-6 p-6 pt-0">
        <div className="space-y-1">
          <h1 className="font-semibold text-2xl tracking-tight">Portfolio</h1>
          <p className="text-muted-foreground text-sm">
            Showcase your work and projects to stand out to recruiters.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Portfolio Readiness</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                  <TargetIcon className="size-5 text-primary" />
                </div>
                <div className="space-y-0.5">
                  <p className="font-medium text-sm">{readinessScore}% ready</p>
                  <p className="text-muted-foreground text-xs">
                    {mockPortfolioReadiness.filter((r) => r.done).length} of{" "}
                    {mockPortfolioReadiness.length} items complete
                  </p>
                </div>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-500"
                  style={{ width: `${readinessScore}%` }}
                />
              </div>
              <ul className="space-y-2">
                {mockPortfolioReadiness.map((item) => (
                  <li
                    className={cn(
                      "flex items-start gap-2.5 rounded-lg border p-3 text-sm transition-colors",
                      item.done
                        ? "border-transparent bg-muted/30"
                        : "border-dashed"
                    )}
                    key={item.id}
                  >
                    <span
                      className={cn(
                        "flex size-5 shrink-0 items-center justify-center rounded-full",
                        item.done
                          ? "bg-emerald-500/10 text-emerald-500"
                          : "bg-muted text-muted-foreground/40"
                      )}
                    >
                      {item.done ? (
                        <CheckIcon className="size-3" />
                      ) : (
                        <span className="font-medium text-[10px]">—</span>
                      )}
                    </span>
                    <div className="flex-1 space-y-0.5">
                      <span
                        className={cn(
                          "font-medium",
                          item.done && "text-muted-foreground/70"
                        )}
                      >
                        {item.label}
                      </span>
                      <p
                        className={cn(
                          "text-xs",
                          item.done
                            ? "text-muted-foreground/50"
                            : "text-muted-foreground"
                        )}
                      >
                        {item.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recruiter Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {mockRecruiterSummary}
                </p>
                <Button
                  className="w-full gap-1.5"
                  disabled
                  size="sm"
                  variant="outline"
                >
                  <SparklesIcon className="size-3.5" />
                  Generate Case Study
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link href="/jobs/resume">
                  <Button
                    className="w-full justify-start gap-2"
                    size="sm"
                    variant="outline"
                  >
                    <FileTextIcon className="size-3.5" />
                    Update Resume
                  </Button>
                </Link>
                <Link href="/jobs/portfolio/preview">
                  <Button
                    className="w-full justify-start gap-2"
                    size="sm"
                    variant="outline"
                  >
                    <GlobeIcon className="size-3.5" />
                    Preview Portfolio
                  </Button>
                </Link>
                <Button
                  className="w-full justify-start gap-2"
                  disabled
                  size="sm"
                  variant="outline"
                >
                  <PlusIcon className="size-3.5" />
                  Add Project
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="font-medium text-muted-foreground text-xs uppercase tracking-wider">
            Projects
          </h2>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {mockPortfolioProjects.map((project) => (
              <Card
                className="group transition-all duration-150 ease-out hover:shadow-md"
                key={project.id}
              >
                <CardHeader>
                  <div className="space-y-1.5">
                    <CardTitle className="text-base">{project.title}</CardTitle>
                    <p className="text-muted-foreground text-xs">
                      {project.subtitle}
                    </p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-muted-foreground text-xs">
                    <span className="rounded-md border bg-muted/50 px-1.5 py-0.5 font-medium">
                      {project.role}
                    </span>
                    <span>{project.duration}</span>
                  </div>

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

                  <div className="space-y-2">
                    <p className="font-medium text-muted-foreground text-xs uppercase tracking-wider">
                      Highlights
                    </p>
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
                  </div>

                  {project.caseStudySections.length > 0 && (
                    <details className="group rounded-lg border bg-muted/20">
                      <summary className="flex cursor-pointer items-center gap-2 px-3 py-2 font-medium text-muted-foreground text-xs transition-colors hover:text-foreground">
                        <FileTextIcon className="size-3.5" />
                        Case Study
                        <span className="ml-auto font-mono text-[10px] opacity-40">
                          {project.caseStudySections.length} sections
                        </span>
                      </summary>
                      <div className="space-y-3 border-t px-3 py-3">
                        {project.caseStudySections.map((section) => (
                          <div key={section.title}>
                            <p className="mb-1 font-medium text-muted-foreground text-xs uppercase tracking-wider">
                              {section.title}
                            </p>
                            <p className="text-muted-foreground text-xs leading-relaxed">
                              {section.content}
                            </p>
                          </div>
                        ))}
                      </div>
                    </details>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PortfolioPage;
