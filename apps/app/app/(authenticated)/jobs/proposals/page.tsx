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
  ClockIcon,
  CopyIcon,
  DollarSignIcon,
  FileTextIcon,
  LayersIcon,
  MailIcon,
  MessageSquareIcon,
  SendIcon,
  SparklesIcon,
  TargetIcon,
  UsersIcon,
} from "lucide-react";
import { useState } from "react";
import { mockFreelanceGigs } from "@/lib/jobs/freelance-data";
import { generateProposalDraft } from "@/lib/jobs/proposal-generation";
import type {
  ClientProposalDraft,
  FreelanceOpportunity,
  ProposalTone,
} from "@/lib/jobs/types";
import { Header } from "../../components/header";

const toneOptions: { label: string; value: ProposalTone }[] = [
  { label: "Professional", value: "professional" },
  { label: "Friendly", value: "friendly" },
  { label: "Enthusiastic", value: "enthusiastic" },
  { label: "Consultative", value: "consultative" },
];

const portfolioNames: Record<string, string> = {
  "proj-1": "Jobs Console",
  "proj-2": "AI Job Match Engine",
  "proj-3": "Design System \u2014 Prism",
};

const ProposalsPage = () => {
  const [selectedGig, setSelectedGig] = useState<FreelanceOpportunity | null>(
    null
  );
  const [proposalDraft, setProposalDraft] =
    useState<ClientProposalDraft | null>(null);
  const [selectedTone, setSelectedTone] =
    useState<ProposalTone>("professional");
  const [infoCopied, setInfoCopied] = useState(false);

  const openGigs = mockFreelanceGigs.filter((g) => g.status === "open");

  const handleGenerate = () => {
    if (!selectedGig) {
      return;
    }
    setProposalDraft(generateProposalDraft(selectedGig));
  };

  const handleCopy = () => {
    if (!proposalDraft) {
      return;
    }
    const text = proposalDraft.proposalSections
      .map((s) => `${s.title}\n\n${s.body}`)
      .join("\n\n---\n\n");
    navigator.clipboard.writeText(text).then(() => {
      setInfoCopied(true);
      setTimeout(() => setInfoCopied(false), 2000);
    });
  };

  return (
    <>
      <Header
        page="Client Proposal Generator"
        pages={["Jobs Console", "Jobs"]}
      />
      <div className="flex flex-1 animate-fade-in flex-col gap-6 p-6 pt-0">
        <div className="space-y-1">
          <h1 className="font-semibold text-2xl tracking-tight">
            Client Proposal Generator
          </h1>
          <p className="text-muted-foreground text-sm">
            Generate and review client proposals from freelance opportunities.
            Proposals are local drafts only. Sending and publishing are not
            available.
          </p>
        </div>

        <div className="rounded-lg border border-dashed bg-muted/20 px-4 py-2.5">
          <p className="text-center text-muted-foreground text-xs">
            AI-backed generation:{" "}
            <span className="font-medium text-amber-500">not provided</span>
            {" \u2022 "}Proposals use deterministic mock content based on
            opportunity details. No invented client facts.
          </p>
        </div>

        <div className="grid gap-6 xl:grid-cols-3">
          <div className="flex flex-col gap-6 xl:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2.5">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
                    <TargetIcon className="size-4 text-primary" />
                  </div>
                  <div className="space-y-0.5">
                    <CardTitle className="text-sm">
                      Select Opportunity
                    </CardTitle>
                    <CardDescription className="text-[11px]">
                      Choose a freelance gig to build a proposal from.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {openGigs.length === 0 ? (
                  <p className="py-4 text-center text-muted-foreground text-xs">
                    No open freelance opportunities available.
                  </p>
                ) : (
                  <div className="grid gap-2">
                    {openGigs.map((gig) => {
                      const isSelected = selectedGig?.id === gig.id;
                      return (
                        <button
                          className={cn(
                            "flex w-full items-start gap-3 rounded-lg border bg-card p-3 text-left text-xs transition-all hover:bg-accent/50",
                            isSelected
                              ? "border-primary/50 bg-primary/5 shadow-sm"
                              : ""
                          )}
                          key={gig.id}
                          onClick={() => {
                            setSelectedGig(gig);
                            setProposalDraft(null);
                          }}
                          type="button"
                        >
                          <div className="min-w-0 flex-1 space-y-1">
                            <p className="font-medium text-sm">{gig.title}</p>
                            <p className="text-muted-foreground">
                              {gig.client} \u2022{" "}
                              {gig.budget ?? gig.rate ?? "Rate TBD"}
                            </p>
                            <p className="line-clamp-2 text-muted-foreground/60">
                              {gig.description}
                            </p>
                          </div>
                          {gig.matchScore && (
                            <Badge
                              className="shrink-0 text-[10px]"
                              variant="outline"
                            >
                              {gig.matchScore.overall}% match
                            </Badge>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>

            {proposalDraft && (
              <>
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
                          <FileTextIcon className="size-4 text-primary" />
                        </div>
                        <div className="space-y-0.5">
                          <CardTitle className="text-sm">
                            Proposal for {proposalDraft.clientName}
                          </CardTitle>
                          <CardDescription className="text-[11px]">
                            Draft \u2022 Generated{" "}
                            {new Date(
                              proposalDraft.createdAt
                            ).toLocaleDateString()}
                          </CardDescription>
                        </div>
                      </div>
                      <Badge
                        className="text-[10px] uppercase tracking-wider"
                        variant="secondary"
                      >
                        {proposalDraft.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="rounded-lg bg-muted/30 p-4">
                      <h3 className="mb-1 font-medium text-muted-foreground text-xs uppercase tracking-wider">
                        Client Need
                      </h3>
                      <p className="text-sm leading-relaxed">
                        {proposalDraft.clientProblem}
                      </p>
                    </div>

                    <div className="rounded-lg bg-primary/5 p-4">
                      <h3 className="mb-1 font-medium text-muted-foreground text-xs uppercase tracking-wider">
                        Proposed Solution
                      </h3>
                      <p className="text-sm leading-relaxed">
                        {proposalDraft.proposedSolution}
                      </p>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-medium text-muted-foreground text-xs uppercase tracking-wider">
                        Scope &amp; Deliverables
                      </h3>
                      <div className="grid gap-2">
                        {proposalDraft.scopeItems.map((item) => (
                          <div
                            className="flex items-start gap-2.5 rounded-lg border bg-card p-3"
                            key={item.id}
                          >
                            <LayersIcon className="mt-0.5 size-4 shrink-0 text-primary" />
                            <div className="space-y-0.5">
                              <p className="font-medium text-xs">
                                {item.label}
                              </p>
                              <p className="text-muted-foreground text-xs">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h3 className="font-medium text-muted-foreground text-xs uppercase tracking-wider">
                        Timeline
                      </h3>
                      <div className="grid gap-2 sm:grid-cols-2">
                        {proposalDraft.timeline.map((item) => (
                          <div
                            className="flex items-start gap-2.5 rounded-lg border bg-card p-3"
                            key={item.id}
                          >
                            <ClockIcon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                            <div className="min-w-0 flex-1 space-y-0.5">
                              <p className="font-medium text-xs">
                                {item.label}
                              </p>
                              <p className="text-[11px] text-muted-foreground">
                                {item.duration}
                              </p>
                              <p className="text-[11px] text-muted-foreground/60 leading-relaxed">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h3 className="font-medium text-muted-foreground text-xs uppercase tracking-wider">
                        Portfolio References
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {proposalDraft.portfolioRefs.length > 0 ? (
                          proposalDraft.portfolioRefs.map((ref) => (
                            <Badge
                              className="gap-1 text-[11px]"
                              key={ref}
                              variant="secondary"
                            >
                              <CheckCircleIcon className="size-3 text-emerald-500" />
                              {portfolioNames[ref] ?? ref}
                            </Badge>
                          ))
                        ) : (
                          <span className="text-muted-foreground text-xs">
                            No portfolio references linked.
                          </span>
                        )}
                      </div>
                    </div>

                    {proposalDraft.proposalSections.length > 0 && (
                      <div className="space-y-4">
                        {proposalDraft.proposalSections.map((section) => (
                          <div key={section.id}>
                            <h3 className="mb-1.5 font-medium text-muted-foreground text-xs uppercase tracking-wider">
                              {section.title}
                            </h3>
                            <p className="whitespace-pre-wrap text-muted-foreground text-sm leading-relaxed">
                              {section.body}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2.5">
                      <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
                        <DollarSignIcon className="size-4 text-primary" />
                      </div>
                      <div className="space-y-0.5">
                        <CardTitle className="text-sm">
                          Budget Estimate
                        </CardTitle>
                        <CardDescription className="text-[11px]">
                          {proposalDraft.suggestedBudget}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      This is a placeholder budget derived from the opportunity
                      listing. A final quote requires scope clarification.
                      Payments are not processed through this platform.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2.5">
                      <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
                        <SparklesIcon className="size-4 text-primary" />
                      </div>
                      <div className="space-y-0.5">
                        <CardTitle className="text-sm">Next Steps</CardTitle>
                        <CardDescription className="text-[11px]">
                          Review the proposal before sharing. Real sending and
                          publishing are not available.
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button
                      className="w-full gap-1.5"
                      disabled
                      size="sm"
                      variant="default"
                    >
                      <SendIcon className="size-3.5" />
                      Send Proposal (not available)
                    </Button>
                    <Button
                      className="w-full gap-1.5"
                      disabled
                      size="sm"
                      variant="outline"
                    >
                      <MailIcon className="size-3.5" />
                      Email to Client (not available)
                    </Button>
                    <Button
                      className="w-full gap-1.5"
                      disabled
                      size="sm"
                      variant="outline"
                    >
                      <UsersIcon className="size-3.5" />
                      Add Portfolio Proof
                    </Button>
                    <Button
                      className="w-full gap-1.5"
                      disabled
                      size="sm"
                      variant="secondary"
                    >
                      <SparklesIcon className="size-3.5" />
                      Regenerate with AI (not available)
                    </Button>
                  </CardContent>
                </Card>
              </>
            )}

            <div className="flex flex-wrap gap-2">
              {selectedGig && (
                <Button onClick={handleGenerate} size="sm">
                  <FileTextIcon className="size-3.5" />
                  Generate Draft Proposal
                </Button>
              )}
              {proposalDraft && (
                <Button onClick={handleCopy} size="sm" variant="outline">
                  <CopyIcon className="size-3.5" />
                  {infoCopied ? "Copied!" : "Copy Proposal Text"}
                </Button>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <SparklesIcon className="size-4" />
                  Tone
                </CardTitle>
                <CardDescription className="text-[11px]">
                  Proposal voice style (preview only).
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex flex-col gap-1.5">
                  {toneOptions.map((option) => (
                    <button
                      className={cn(
                        "flex items-center gap-2.5 rounded-lg border px-3 py-2 text-left text-xs transition-all",
                        selectedTone === option.value
                          ? "border-primary/50 bg-primary/5"
                          : "hover:bg-accent/50"
                      )}
                      key={option.value}
                      onClick={() => setSelectedTone(option.value)}
                      type="button"
                    >
                      <span
                        className={cn(
                          "flex size-4 shrink-0 items-center justify-center rounded-full border",
                          selectedTone === option.value
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-muted-foreground/30"
                        )}
                      >
                        {selectedTone === option.value && (
                          <span className="size-2 rounded-full bg-current" />
                        )}
                      </span>
                      <span>{option.label}</span>
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-amber-600 dark:text-amber-400">
                  Tone selection is a preview. All proposals currently use a
                  professional voice.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <MessageSquareIcon className="size-4" />
                  AI Provider
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-xs">Status</span>
                  <Badge
                    className="text-[10px] uppercase tracking-wider"
                    variant="outline"
                  >
                    not configured
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <div className="rounded-lg border border-dashed bg-muted/20 px-4 py-3">
              <p className="text-center text-[10px] text-muted-foreground leading-relaxed">
                Proposal drafts are local and not persisted. Sending, email, AI
                generation, and payments are not provided.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProposalsPage;
