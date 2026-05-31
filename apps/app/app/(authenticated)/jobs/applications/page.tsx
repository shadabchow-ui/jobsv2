import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/design-system/components/ui/table";
import {
  CircleCheckIcon,
  CircleXIcon,
  DatabaseIcon,
  ListFilterIcon,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { getApplicationStore } from "@/lib/jobs/applications-store";
import { PIPELINE_STATUSES, TERMINAL_STATUSES } from "@/lib/jobs/constants";
import {
  getApplicationCounts,
  getTotalCount,
  groupApplicationsByStatus,
} from "@/lib/jobs/helpers";
import type { ApplicationRecord } from "@/lib/jobs/types";
import { ConsoleEmptyState } from "../../components/empty-state";
import { Header } from "../../components/header";
import { StatusBadge } from "../components/status-badge";

export const metadata: Metadata = {
  title: "Applications — Jobs",
  description: "Job application tracker and status board.",
};

const CoverLetterBadge = ({ app }: { app: ApplicationRecord }) => {
  if (app.coverLetterId) {
    return (
      <Link
        className="inline-flex items-center gap-0.5 text-emerald-600 text-xs hover:underline dark:text-emerald-400"
        href="/jobs/cover-letters"
      >
        <CircleCheckIcon className="size-3" />
        CL
      </Link>
    );
  }
  if (app.hasCoverLetter) {
    return (
      <span className="inline-flex items-center gap-0.5 text-emerald-600 text-xs dark:text-emerald-400">
        <CircleCheckIcon className="size-3" />
        CL
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-0.5 text-muted-foreground text-xs">
      <CircleXIcon className="size-3" />
      CL
    </span>
  );
};

const PipelineSection = () => {
  const store = getApplicationStore();
  const applications = store.list();
  const grouped = groupApplicationsByStatus(applications);
  const counts = getApplicationCounts(applications);
  const total = getTotalCount(counts);

  if (applications.length === 0) {
    return (
      <ConsoleEmptyState
        actionHref="/jobs/search"
        actionLabel="Search Jobs"
        description="Track your job applications from saved to offer."
        title="No applications yet"
      />
    );
  }

  const pipelineStatuses = [...PIPELINE_STATUSES];
  const terminalStatuses = TERMINAL_STATUSES.filter(
    (s) => (grouped.get(s)?.length ?? 0) > 0
  );

  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="font-medium text-muted-foreground text-xs uppercase tracking-wider">
            Pipeline (
            {
              pipelineStatuses.filter((s) => (grouped.get(s)?.length ?? 0) > 0)
                .length
            }{" "}
            active)
          </h2>
          <span className="text-muted-foreground text-xs">{total} total</span>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {pipelineStatuses.map((status) => {
            const apps = grouped.get(status) ?? [];
            if (apps.length === 0) {
              return null;
            }

            return (
              <div
                className="flex flex-col gap-2 rounded-xl border bg-card p-4"
                key={status}
              >
                <div className="flex items-center justify-between">
                  <StatusBadge size="sm" status={status} />
                  <span className="font-mono text-muted-foreground text-xs">
                    {apps.length}
                  </span>
                </div>
                <div className="flex flex-col gap-1.5">
                  {apps.map((app) => (
                    <div
                      className="rounded-lg border border-border/50 bg-background p-2.5 text-xs transition-colors hover:bg-accent/50"
                      key={app.id}
                    >
                      <div className="space-y-1">
                        <p className="font-medium leading-tight">{app.title}</p>
                        <p className="text-muted-foreground">{app.company}</p>
                      </div>
                      <div className="mt-1.5 flex flex-wrap gap-1.5 text-muted-foreground">
                        {app.applicationDate && (
                          <span className="text-[10px]">
                            Applied {app.applicationDate}
                          </span>
                        )}
                        {app.hasResume && (
                          <span className="inline-flex items-center gap-0.5 text-[10px]">
                            <CircleCheckIcon className="size-2.5 text-emerald-500" />
                            Resume
                          </span>
                        )}
                        {app.hasCoverLetter && (
                          <span className="inline-flex items-center gap-0.5 text-[10px]">
                            <CircleCheckIcon className="size-2.5 text-emerald-500" />
                            Cover Letter
                          </span>
                        )}
                      </div>
                      {app.nextAction && (
                        <p className="mt-1.5 border-border/30 border-t pt-1 font-medium text-[10px] text-amber-600 dark:text-amber-400">
                          Next: {app.nextAction}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {terminalStatuses.length > 0 && (
        <div className="flex flex-col gap-3">
          <h2 className="font-medium text-muted-foreground text-xs uppercase tracking-wider">
            Closed
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {terminalStatuses.map((status) => {
              const apps = grouped.get(status) ?? [];

              return (
                <div
                  className="flex flex-col gap-2 rounded-xl border bg-card p-4"
                  key={status}
                >
                  <div className="flex items-center justify-between">
                    <StatusBadge size="sm" status={status} />
                    <span className="font-mono text-muted-foreground text-xs">
                      {apps.length}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    {apps.map((app) => (
                      <div
                        className="rounded-lg border border-border/50 bg-background p-2.5 text-xs transition-colors hover:bg-accent/50"
                        key={app.id}
                      >
                        <div className="space-y-1">
                          <p className="font-medium leading-tight">
                            {app.title}
                          </p>
                          <p className="text-muted-foreground">{app.company}</p>
                        </div>
                        {app.nextAction && (
                          <p className="mt-1.5 border-border/30 border-t pt-1 font-medium text-[10px] text-amber-600 dark:text-amber-400">
                            Next: {app.nextAction}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3">
        <h2 className="font-medium text-muted-foreground text-xs uppercase tracking-wider">
          All Applications
        </h2>
        <div className="overflow-x-auto rounded-lg border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Job</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Applied</TableHead>
                <TableHead>Attachments</TableHead>
                <TableHead>Next Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applications.map((app) => (
                <TableRow key={app.id}>
                  <TableCell className="font-medium">{app.title}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {app.company}
                  </TableCell>
                  <TableCell>
                    <StatusBadge size="sm" status={app.status} />
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {app.applicationDate ?? "—"}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5">
                      {app.hasResume ? (
                        <span className="inline-flex items-center gap-0.5 text-emerald-600 text-xs dark:text-emerald-400">
                          <CircleCheckIcon className="size-3" />
                          Resume
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-0.5 text-muted-foreground text-xs">
                          <CircleXIcon className="size-3" />
                          Resume
                        </span>
                      )}
                      <CoverLetterBadge app={app} />
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-xs">
                    {app.nextAction ? (
                      <span className="text-amber-600 dark:text-amber-400">
                        {app.nextAction}
                      </span>
                    ) : (
                      "—"
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

const ApplicationsPage = () => (
  <>
    <Header page="Applications" pages={["Jobs Console", "Jobs"]} />
    <div className="flex flex-1 animate-fade-in flex-col gap-6 p-6 pt-0">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <h1 className="font-semibold text-2xl tracking-tight">
            Application Tracker
          </h1>
          <p className="text-muted-foreground text-sm">
            Track and manage your job applications from initial interest to
            offer.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-lg border bg-muted/30 px-3 py-1.5 text-muted-foreground text-xs">
          <ListFilterIcon className="size-3.5" />
          <span>9 statuses</span>
        </div>
      </div>

      <div className="flex items-center gap-1.5 rounded-md border border-dashed bg-muted/20 px-3 py-2 text-muted-foreground">
        <DatabaseIcon className="size-3" />
        <span className="text-[11px]">
          Data is stored locally in memory. Applications will reset on page
          reload. Real database persistence is not provided.
        </span>
      </div>

      <PipelineSection />
    </div>
  </>
);

export default ApplicationsPage;
