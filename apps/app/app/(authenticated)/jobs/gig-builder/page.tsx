"use client";

import { Badge } from "@repo/design-system/components/ui/badge";
import { Button } from "@repo/design-system/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/design-system/components/ui/card";
import { cn } from "@repo/design-system/lib/utils";
import {
  CheckCircleIcon,
  CircleCheckIcon,
  CircleXIcon,
  ClockIcon,
  FileTextIcon,
  GlobeIcon,
  LayersIcon,
  LightbulbIcon,
  ListChecksIcon,
  MessageSquareIcon,
  PackageIcon,
  PlusIcon,
  SparklesIcon,
  StoreIcon,
  TargetIcon,
  UsersIcon,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import type { GigListingDraft } from "@/lib/jobs/gig-listing-data";
import { gigReadinessItems, mockGigDraft } from "@/lib/jobs/gig-listing-data";
import { Header } from "../../components/header";

const projectNames: Record<string, string> = {
  "proj-1": "Jobs Console",
  "proj-2": "AI Job Match Engine",
  "proj-3": "Design System — Prism",
};

const GigBuilderPage = () => {
  const [draft] = useState<GigListingDraft>(mockGigDraft);
  const [expandedPkg, setExpandedPkg] = useState<string | null>(
    draft.packages[1]?.id ?? null
  );

  const checkedCount = gigReadinessItems.filter((i) => i.checked).length;
  const readinessScore = Math.round(
    (checkedCount / gigReadinessItems.length) * 100
  );

  return (
    <>
      <Header page="Gig Listing Builder" pages={["Jobs Console", "Jobs"]} />
      <div className="flex flex-1 animate-fade-in flex-col gap-6 p-6 pt-0">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <h1 className="font-semibold text-2xl tracking-tight">
                Gig Listing Builder
              </h1>
              <Badge className="text-[10px]" variant="outline">
                Draft
              </Badge>
            </div>
            <p className="text-muted-foreground text-sm">
              Package your skills and portfolio into a freelance service
              listing. Publishing and payments are not yet available.
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Button
              className="gap-1.5 text-xs"
              disabled
              size="sm"
              variant="outline"
            >
              <SparklesIcon className="size-3.5" />
              Improve Title
            </Button>
            <Button className="gap-1.5 text-xs" disabled size="sm">
              <StoreIcon className="size-3.5" />
              Publish Later
            </Button>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-3">
          <div className="flex flex-col gap-6 xl:col-span-2">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
                    <StoreIcon className="size-4 text-primary" />
                  </div>
                  <div className="space-y-0.5">
                    <CardTitle className="text-sm">Listing Details</CardTitle>
                    <CardDescription className="text-[11px]">
                      Position your service for your target clients.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1.5">
                  <span className="text-muted-foreground text-xs">
                    Listing Title
                  </span>
                  <div className="rounded-md border bg-muted/20 px-3 py-2">
                    <p className="font-medium text-sm">{draft.title}</p>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="text-muted-foreground text-xs">
                    Positioning Statement
                  </span>
                  <div className="rounded-md border bg-muted/20 px-3 py-2">
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {draft.description}
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <span className="text-muted-foreground text-xs">
                      Service Category
                    </span>
                    <div className="rounded-md border bg-muted/20 px-3 py-2">
                      <p className="text-sm">{draft.category}</p>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <span className="text-muted-foreground text-xs">
                      Target Client
                    </span>
                    <div className="rounded-md border bg-muted/20 px-3 py-2">
                      <p className="text-sm">{draft.targetClient}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
                    <PackageIcon className="size-4 text-primary" />
                  </div>
                  <div className="space-y-0.5">
                    <CardTitle className="text-sm">
                      Packages &amp; Pricing
                    </CardTitle>
                    <CardDescription className="text-[11px]">
                      {draft.packages.length} tier
                      {draft.packages.length !== 1 ? "s" : ""} configured.
                      Prices are placeholders.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {draft.packages.map((pkg) => (
                  <div
                    className={cn(
                      "rounded-lg border transition-all",
                      expandedPkg === pkg.id
                        ? "border-primary/30 bg-card"
                        : "bg-muted/10"
                    )}
                    key={pkg.id}
                  >
                    <button
                      className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left"
                      onClick={() =>
                        setExpandedPkg(expandedPkg === pkg.id ? null : pkg.id)
                      }
                      type="button"
                    >
                      <div className="min-w-0 flex-1 space-y-0.5">
                        <p className="font-medium text-sm">{pkg.label}</p>
                        <p className="truncate text-muted-foreground text-xs">
                          {pkg.description}
                        </p>
                      </div>
                      <div className="shrink-0 text-right">
                        <p className="font-medium text-xs">{pkg.priceLabel}</p>
                        <p className="text-[11px] text-muted-foreground">
                          {pkg.timelineDays} days
                        </p>
                      </div>
                    </button>
                    {expandedPkg === pkg.id && (
                      <div className="border-t px-4 py-3">
                        <div className="space-y-2">
                          {pkg.deliverables.map((del) => (
                            <div
                              className="flex items-start gap-2.5"
                              key={del.id}
                            >
                              <CheckCircleIcon className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                              <div className="space-y-0.5">
                                <p className="font-medium text-xs">
                                  {del.label}
                                </p>
                                <p className="text-[11px] text-muted-foreground leading-relaxed">
                                  {del.description}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-3 flex items-center gap-4 text-[11px] text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <ClockIcon className="size-3" />
                            {pkg.timelineDays} days
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageSquareIcon className="size-3" />
                            {pkg.revisionCount} revision
                            {pkg.revisionCount !== 1 ? "s" : ""}
                          </span>
                          <span className="flex items-center gap-1">
                            <StoreIcon className="size-3" />
                            {pkg.priceLabel}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
                    <FileTextIcon className="size-4 text-primary" />
                  </div>
                  <div className="space-y-0.5">
                    <CardTitle className="text-sm">Deliverables</CardTitle>
                    <CardDescription className="text-[11px]">
                      {draft.deliverables.length} core deliverable
                      {draft.deliverables.length !== 1 ? "s" : ""}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 sm:grid-cols-2">
                  {draft.deliverables.map((del) => (
                    <div className="rounded-lg border bg-card p-3" key={del.id}>
                      <p className="flex items-center gap-1.5 font-medium text-xs">
                        <LayersIcon className="size-3 text-primary" />
                        {del.label}
                      </p>
                      <p className="mt-1 text-[11px] text-muted-foreground leading-relaxed">
                        {del.description}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
                    <TargetIcon className="size-4 text-primary" />
                  </div>
                  <div className="space-y-0.5">
                    <CardTitle className="text-sm">
                      Portfolio Proof References
                    </CardTitle>
                    <CardDescription className="text-[11px]">
                      {draft.portfolioProofIds.length} project
                      {draft.portfolioProofIds.length !== 1 ? "s" : ""} linked
                      from portfolio
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {draft.portfolioProofIds.map((id) => (
                    <Badge
                      className="gap-1 text-[11px]"
                      key={id}
                      variant="secondary"
                    >
                      <CheckCircleIcon className="size-3 text-emerald-500" />
                      {projectNames[id] ?? id}
                    </Badge>
                  ))}
                </div>
                <Button
                  className="mt-3 gap-1.5 text-xs"
                  disabled
                  size="sm"
                  variant="outline"
                >
                  <PlusIcon className="size-3.5" />
                  Add Portfolio Proof
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
                    <MessageSquareIcon className="size-4 text-primary" />
                  </div>
                  <div className="space-y-0.5">
                    <CardTitle className="text-sm">
                      FAQ ({draft.faq.length})
                    </CardTitle>
                    <CardDescription className="text-[11px]">
                      Frequently asked questions for this listing.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {draft.faq.map((item) => (
                  <details
                    className="group rounded-lg border bg-card"
                    key={item.id}
                  >
                    <summary className="flex cursor-pointer items-center gap-2 px-3 py-2.5 font-medium text-xs transition-colors hover:bg-accent/30">
                      <LightbulbIcon className="size-3.5 shrink-0 text-muted-foreground" />
                      {item.question}
                    </summary>
                    <div className="border-t px-3 py-2.5">
                      <p className="text-[11px] text-muted-foreground leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </details>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col gap-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <ListChecksIcon className="size-4" />
                  Readiness Checklist
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                    <TargetIcon className="size-5 text-primary" />
                  </div>
                  <div className="space-y-0.5">
                    <p className="font-medium text-sm">
                      {readinessScore}% ready
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {checkedCount} of {gigReadinessItems.length} items
                      complete
                    </p>
                  </div>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary transition-all duration-500"
                    style={{ width: `${readinessScore}%` }}
                  />
                </div>
                <ul className="space-y-1.5">
                  {gigReadinessItems.map((item) => (
                    <li
                      className={cn(
                        "flex items-start gap-2 rounded-lg p-2 text-xs transition-colors",
                        item.checked ? "text-muted-foreground/70" : ""
                      )}
                      key={item.id}
                    >
                      {item.checked ? (
                        <CircleCheckIcon className="mt-0.5 size-3.5 shrink-0 text-emerald-500" />
                      ) : (
                        <CircleXIcon className="mt-0.5 size-3.5 shrink-0 text-muted-foreground/40" />
                      )}
                      <span
                        className={
                          item.checked ? "line-through" : "text-foreground"
                        }
                      >
                        {item.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <SparklesIcon className="size-4" />
                  Suggested Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  className="w-full justify-start gap-2 text-xs"
                  disabled
                  size="sm"
                  variant="outline"
                >
                  <SparklesIcon className="size-3.5" />
                  Improve Title
                </Button>
                <Button
                  className="w-full justify-start gap-2 text-xs"
                  disabled
                  size="sm"
                  variant="outline"
                >
                  <GlobeIcon className="size-3.5" />
                  Add Portfolio Proof
                </Button>
                <Button
                  asChild
                  className="w-full justify-start gap-2 text-xs"
                  size="sm"
                  variant="outline"
                >
                  <Link href="/jobs/proposals">
                    <FileTextIcon className="size-3.5" />
                    Draft Proposal
                  </Link>
                </Button>
                <Button
                  className="w-full justify-start gap-2 text-xs"
                  disabled
                  size="sm"
                  variant="outline"
                >
                  <UsersIcon className="size-3.5" />
                  Define Target Client
                </Button>
              </CardContent>
            </Card>

            <div className="rounded-lg border border-dashed bg-muted/20 px-4 py-3">
              <p className="text-center text-[10px] text-muted-foreground leading-relaxed">
                Gig listings are local drafts. Publishing, marketplace
                integration, payments, client proposals, and AI title generation
                are not provided.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GigBuilderPage;
