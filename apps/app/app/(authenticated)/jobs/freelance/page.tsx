import type { Metadata } from "next";
import { mockFreelanceGigs } from "@/lib/jobs/freelance-data";
import type { FreelanceOpportunity } from "@/lib/jobs/types";
import { Header } from "../../components/header";

export const metadata: Metadata = {
  title: "Freelance & Gig Finder — Jobs Console",
  description:
    "Discover freelance and gig opportunities matched to your skills.",
};

const matchColor = (score: number) => {
  if (score >= 80) {
    return "text-emerald-500";
  }
  if (score >= 65) {
    return "text-amber-500";
  }
  return "text-muted-foreground";
};

const matchBadge = (score: number) => {
  if (score >= 80) {
    return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400";
  }
  if (score >= 65) {
    return "bg-amber-500/10 text-amber-600 border-amber-500/20 dark:text-amber-400";
  }
  return "bg-muted text-muted-foreground border-border";
};

const GigCard = ({ gig }: { gig: FreelanceOpportunity }) => {
  const score = gig.matchScore;

  return (
    <div className="flex flex-col gap-4 rounded-xl border bg-card p-5 transition-all duration-150 ease-out hover:bg-accent/50 hover:shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <h3 className="font-medium leading-none">{gig.title}</h3>
          <p className="text-muted-foreground text-sm">{gig.client}</p>
        </div>
        {score && (
          <span
            className={`inline-flex shrink-0 items-center rounded-md border px-2 py-0.5 font-medium text-[11px] uppercase tracking-wide ${matchBadge(score.overall)}`}
          >
            {score.overall}% match
          </span>
        )}
      </div>

      <p className="text-muted-foreground text-sm leading-relaxed">
        {gig.description}
      </p>

      <div className="flex flex-wrap gap-1.5">
        {gig.requiredSkills.map((skill) => {
          const missing = score?.missingSkills.includes(skill);
          return (
            <span
              className={`inline-flex items-center rounded-md px-2 py-0.5 font-medium text-[11px] ${
                missing
                  ? "border border-destructive/20 bg-destructive/10 text-destructive"
                  : "border border-border bg-muted text-muted-foreground"
              }`}
              key={skill}
            >
              {missing && "— "}
              {skill}
            </span>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-border border-t pt-3">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-muted-foreground text-xs">
          <span>{gig.budget ?? gig.rate ?? "Rate not provided"}</span>
          <span>{gig.location}</span>
          <span className="capitalize">{gig.platformLabel}</span>
          {gig.deadline && (
            <span>
              Due{" "}
              {new Date(gig.deadline).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>
          )}
        </div>
      </div>

      {score && score.reasons.length > 0 && (
        <div className="space-y-1 rounded-lg bg-muted/50 p-3">
          <span className="font-medium text-[11px] text-muted-foreground uppercase tracking-wider">
            Match reasons
          </span>
          <ul className="space-y-0.5">
            {score.reasons.map((reason) => (
              <li
                className="flex items-start gap-1.5 text-muted-foreground text-xs"
                key={reason}
              >
                <span className={matchColor(score.overall)}>●</span>
                {reason}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const FreelancePage = () => {
  const openGigs = mockFreelanceGigs.filter((g) => g.status === "open");

  return (
    <>
      <Header page="Freelance & Gig Finder" pages={["Jobs Console", "Jobs"]} />
      <div className="flex flex-1 animate-fade-in flex-col gap-6 p-6 pt-0">
        <div className="space-y-1">
          <h1 className="font-semibold text-2xl tracking-tight">
            Freelance &amp; Gig Finder
          </h1>
          <p className="text-muted-foreground text-sm">
            Discover freelance and gig opportunities matched to your skills. All
            data is mock/static. No live freelance provider is connected.
          </p>
        </div>

        <div className="rounded-lg border border-dashed bg-muted/30 p-3">
          <div className="flex items-center gap-2 text-muted-foreground text-xs">
            <span className="inline-flex items-center rounded-md bg-muted px-1.5 py-0.5 font-medium font-mono text-[10px]">
              PROVIDER
            </span>
            <span>freelance provider: </span>
            <span className="font-medium text-amber-500">not provided</span>
            <span className="mx-1">·</span>
            <span>current data: </span>
            <span className="font-medium text-blue-500">mock/static</span>
            <span className="mx-1">·</span>
            <span>{openGigs.length} opportunities</span>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {openGigs.map((gig) => (
            <GigCard gig={gig} key={gig.id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default FreelancePage;
