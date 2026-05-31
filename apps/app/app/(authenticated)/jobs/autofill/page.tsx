import { Badge } from "@repo/design-system/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/design-system/components/ui/card";
import { CircleCheckIcon, CircleXIcon } from "lucide-react";
import type { Metadata } from "next";
import {
  autofillReadinessChecklist,
  commonApplicationAnswers,
  supportedJobBoards,
} from "@/lib/jobs";
import { Header } from "../../components/header";

export const metadata: Metadata = {
  title: "Browser Autofill — Jobs",
  description:
    "Apply with Jobs Console — auto-fill job applications from top job boards.",
};

const extensionStatus = {
  label: "Not installed",
  color: "bg-muted text-muted-foreground border-border",
};

const AutofillPage = () => (
  <>
    <Header page="Browser Autofill" pages={["Jobs Console", "Jobs"]} />
    <div className="flex flex-1 flex-col gap-6 p-6 pt-0">
      <div className="space-y-1">
        <div className="flex items-center gap-3">
          <h1 className="font-semibold text-2xl tracking-tight">
            Browser Autofill
          </h1>
          <span
            className={`inline-flex items-center rounded-md border px-2 py-0.5 font-medium text-[11px] uppercase tracking-wide ${extensionStatus.color}`}
          >
            {extensionStatus.label}
          </span>
        </div>
        <p className="text-muted-foreground text-sm">
          Auto-fill job applications from supported boards using profile data
          and AI-generated answers. Your approval is required before any
          submission.
        </p>
      </div>

      <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 dark:border-amber-800 dark:bg-amber-950">
        <p className="text-amber-800 text-xs dark:text-amber-200">
          <strong>No blind auto-apply.</strong> In V1 the extension will never
          submit an application without your explicit review and approval. No
          credentials are stored by the extension. External site automation is
          not currently active.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm">How It Will Work</CardTitle>
            <CardDescription>
              Future flow once the extension is connected
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3">
              {[
                {
                  step: 1,
                  title: "Save job from job board",
                  description:
                    "While browsing a supported job board, click the Jobs Console extension icon to save the listing and import its fields.",
                },
                {
                  step: 2,
                  title: "Pick resume version",
                  description:
                    "Select which resume version to attach, or let the AI recommend the best one for this role.",
                },
                {
                  step: 3,
                  title: "Generate & review answers",
                  description:
                    "AI pre-fills common application fields from your profile. Review and edit each answer before proceeding.",
                },
                {
                  step: 4,
                  title: "You approve before submit",
                  description:
                    "A final summary shows all fields, attachments, and the target job. You must click submit — the extension never submits automatically.",
                },
                {
                  step: 5,
                  title: "Tracker updates after confirmation",
                  description:
                    "After you confirm the application was submitted, the tracker records the date and status automatically.",
                },
              ].map(({ step, title, description }) => (
                <li className="flex gap-3" key={step}>
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-muted font-mono text-muted-foreground text-xs">
                    {step}
                  </span>
                  <div className="space-y-0.5">
                    <p className="font-medium text-sm leading-none">{title}</p>
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      {description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Readiness Checklist</CardTitle>
            <CardDescription>
              Steps to prepare for browser autofill
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {autofillReadinessChecklist.map((item) => (
                <li className="flex items-start gap-2" key={item.id}>
                  {item.completed ? (
                    <CircleCheckIcon className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                  ) : (
                    <CircleXIcon className="mt-0.5 size-4 shrink-0 text-muted-foreground/40" />
                  )}
                  <span
                    className={`text-xs ${item.completed ? "" : "text-muted-foreground"}`}
                  >
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-3">
        <h2 className="font-medium text-muted-foreground text-xs uppercase tracking-wider">
          Supported Job Boards (Planned)
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {supportedJobBoards.map((board) => (
            <div
              className="flex items-center justify-between rounded-lg border bg-card px-4 py-3"
              key={board.id}
            >
              <div className="space-y-0.5">
                <p className="font-medium text-sm leading-none">{board.name}</p>
                <p className="font-mono text-[10px] text-muted-foreground">
                  {board.domain}
                </p>
              </div>
              <Badge className="text-[10px]" variant="secondary">
                Planned
              </Badge>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="font-medium text-muted-foreground text-xs uppercase tracking-wider">
          Common Application Fields
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {commonApplicationAnswers.map((field) => (
            <div
              className="rounded-lg border bg-card px-4 py-3"
              key={field.field}
            >
              <p className="mb-1 font-medium text-xs leading-snup">
                {field.question}
              </p>
              <span className="inline-flex items-center rounded-md bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                {field.type}
              </span>
              <p className="mt-1.5 text-[11px] text-muted-foreground leading-relaxed">
                {field.answer}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-dashed bg-muted/20 px-4 py-3">
        <p className="text-center text-muted-foreground text-xs">
          Browser extension is not provided. No extension ID, store URL,
          permissions, manifest files, or automation capabilities are included
          in this release. This page is a future integration scaffold.
        </p>
      </div>
    </div>
  </>
);

export default AutofillPage;
