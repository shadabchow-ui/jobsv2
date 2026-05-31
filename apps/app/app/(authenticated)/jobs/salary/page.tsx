"use client";

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
  BarChart3Icon,
  CheckCircle2Icon,
  ChevronDownIcon,
  ChevronRightIcon,
  CircleIcon,
  DownloadIcon,
  HelpCircleIcon,
  MessageSquareIcon,
  PlusCircleIcon,
  SaveIcon,
  ScaleIcon,
  TrendingUpIcon,
} from "lucide-react";
import { useState } from "react";
import {
  mockCompensationComponents,
  mockNegotiationChecklist,
  mockNegotiationScripts,
  mockOfferComparisons,
  mockSalaryQuestions,
  mockSalaryRanges,
  mockTargetLocation,
  mockTargetRole,
} from "@/lib/jobs/salary-data";
import { Header } from "../../components/header";

const usd = (n: number) =>
  `$${n.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;

const percentileBars = [
  { key: "p10", label: "10th", color: "bg-muted-foreground/30" },
  { key: "p25", label: "25th", color: "bg-muted-foreground/50" },
  { key: "p50", label: "50th (Median)", color: "bg-primary" },
  { key: "p75", label: "75th", color: "bg-muted-foreground/50" },
  { key: "p90", label: "90th", color: "bg-muted-foreground/30" },
] as const;

const SalaryResearchPage = () => {
  const [selectedRole, setSelectedRole] = useState(mockTargetRole);
  const [selectedLocation, setSelectedLocation] = useState(mockTargetLocation);
  const [expandedScript, setExpandedScript] = useState<string | null>(null);
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  const roles = [...new Set(mockSalaryRanges.map((r) => r.role))];
  const locations = [
    ...new Set(
      mockSalaryRanges
        .filter((r) => r.role === selectedRole)
        .map((r) => r.location)
    ),
  ];

  const activeRanges = mockSalaryRanges.filter(
    (r) => r.role === selectedRole && r.location === selectedLocation
  );

  const toggleChecked = (id: string) => {
    const next = new Set(checkedItems);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setCheckedItems(next);
  };

  return (
    <>
      <Header page="Salary Research" pages={["Jobs Console", "Jobs"]} />
      <div className="flex flex-1 flex-col gap-6 p-6 pt-0">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <h1 className="font-semibold text-2xl tracking-tight">
              Salary Research
            </h1>
            <p className="text-muted-foreground text-sm">
              Research compensation, compare offers, and prepare for
              negotiation.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              className="gap-1.5 text-xs"
              disabled
              size="sm"
              variant="outline"
            >
              <DownloadIcon className="size-3.5" />
              Export
            </Button>
            <Button
              className="gap-1.5 text-xs"
              disabled
              size="sm"
              variant="default"
            >
              <SaveIcon className="size-3.5" />
              Save Salary Target
            </Button>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-4">
          <h2 className="mb-3 font-medium text-[11px] text-muted-foreground uppercase tracking-wider">
            Target Role &amp; Location
          </h2>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <label className="sr-only" htmlFor="salary-role-select">
                Role
              </label>
              <span aria-hidden className="text-muted-foreground text-xs">
                Role
              </span>
              <select
                className="rounded-md border bg-background px-2.5 py-1.5 text-sm"
                id="salary-role-select"
                onChange={(e) => {
                  setSelectedRole(e.target.value);
                  const locs = [
                    ...new Set(
                      mockSalaryRanges
                        .filter((r) => r.role === e.target.value)
                        .map((r) => r.location)
                    ),
                  ];
                  if (!locs.includes(selectedLocation)) {
                    setSelectedLocation(locs[0] ?? "");
                  }
                }}
                value={selectedRole}
              >
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="sr-only" htmlFor="salary-location-select">
                Location
              </label>
              <span aria-hidden className="text-muted-foreground text-xs">
                Location
              </span>
              <select
                className="rounded-md border bg-background px-2.5 py-1.5 text-sm"
                id="salary-location-select"
                onChange={(e) => setSelectedLocation(e.target.value)}
                value={selectedLocation}
              >
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <BarChart3Icon className="size-4 text-muted-foreground" />
                <CardTitle>Salary Range</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              {activeRanges.length === 0 ? (
                <p className="py-4 text-center text-muted-foreground text-xs">
                  No salary data available for this selection. This is demo
                  data.
                </p>
              ) : (
                <div className="space-y-6">
                  {activeRanges.map((range) => (
                    <div key={`${range.role}-${range.location}`}>
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-muted-foreground text-xs">
                          {range.role}
                        </span>
                        <span className="text-muted-foreground text-xs">
                          {range.location}
                        </span>
                      </div>
                      <div className="space-y-2">
                        {percentileBars.map((p) => {
                          const val = range[
                            p.key as keyof typeof range
                          ] as number;
                          const max =
                            Math.max(
                              range.p90,
                              range.p75,
                              range.p50,
                              range.p25,
                              range.p10
                            ) * 1.1;
                          const width = (val / max) * 100;
                          return (
                            <div
                              className="flex items-center gap-3"
                              key={p.key}
                            >
                              <span className="w-24 shrink-0 text-right font-mono text-[11px] text-muted-foreground">
                                {usd(val)}
                              </span>
                              <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                                <div
                                  className={cn("h-full rounded-full", p.color)}
                                  style={{ width: `${width}%` }}
                                />
                              </div>
                              <span className="w-20 text-[11px] text-muted-foreground">
                                {p.label}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                      <p className="mt-3 text-[11px] text-muted-foreground/60 italic">
                        Demo data only. Not verified market data.
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <TrendingUpIcon className="size-4 text-muted-foreground" />
                <CardTitle>Compensation Components</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockCompensationComponents.map((comp) => (
                <div
                  className="rounded-lg border bg-card p-3 transition-colors hover:bg-accent/30"
                  key={comp.component}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <span className="font-medium text-sm">
                        {comp.component}
                      </span>
                      <p className="text-muted-foreground text-xs">
                        {comp.description}
                      </p>
                    </div>
                    <Badge className="shrink-0 text-[10px]" variant="outline">
                      {comp.typicalRange}
                    </Badge>
                  </div>
                  <p className="mt-1.5 text-[11px] text-muted-foreground/60 leading-relaxed">
                    {comp.notes}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ScaleIcon className="size-4 text-muted-foreground" />
                <CardTitle>Offer Comparison</CardTitle>
              </div>
              <Button
                className="gap-1.5 text-xs"
                disabled
                size="sm"
                variant="outline"
              >
                <PlusCircleIcon className="size-3.5" />
                Add Offer
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {mockOfferComparisons.map((offer) => (
                <div
                  className="flex flex-col rounded-xl border bg-card p-4 transition-all hover:shadow-sm"
                  key={offer.id}
                >
                  <div className="mb-3 flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-sm">{offer.company}</p>
                      <p className="text-muted-foreground text-xs">
                        {offer.role}
                      </p>
                      <p className="text-[11px] text-muted-foreground/60">
                        {offer.location}
                      </p>
                    </div>
                  </div>
                  <div className="mb-3 space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-muted-foreground">Base</span>
                      <span className="font-medium">
                        {usd(offer.baseSalary)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-muted-foreground">Bonus</span>
                      <span className="font-medium">{offer.bonusPercent}%</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-muted-foreground">Equity</span>
                      <span className="font-medium">
                        {usd(offer.equityValue)}/yr
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-muted-foreground">Benefits</span>
                      <span className="font-medium">
                        {usd(offer.benefitsValue)}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center justify-between border-t pt-2 text-xs">
                      <span className="font-semibold text-muted-foreground">
                        Total
                      </span>
                      <span className="font-bold text-primary">
                        {usd(offer.totalComp)}
                      </span>
                    </div>
                  </div>
                  <div className="mt-auto space-y-1">
                    {offer.highlights.map((h) => (
                      <div
                        className="flex items-start gap-1.5 text-[10px] text-muted-foreground leading-tight"
                        key={h}
                      >
                        <CheckCircle2Icon className="mt-[1px] size-2.5 shrink-0 text-emerald-500" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                  <Button
                    className="mt-3 w-full gap-1.5 text-xs"
                    disabled
                    size="sm"
                    variant="outline"
                  >
                    <MessageSquareIcon className="size-3.5" />
                    Compare Offer
                  </Button>
                </div>
              ))}
            </div>
            <p className="mt-3 text-[11px] text-muted-foreground/60 italic">
              Demo comparison data. Not actual offers.
            </p>
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <CheckCircle2Icon className="size-4 text-muted-foreground" />
                <CardTitle>Negotiation Readiness Checklist</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {mockNegotiationChecklist.map((item) => (
                  <button
                    className={cn(
                      "flex w-full items-start gap-3 rounded-lg px-3 py-2 text-left text-xs transition-colors hover:bg-accent/30",
                      checkedItems.has(item.id) ? "opacity-60" : ""
                    )}
                    key={item.id}
                    onClick={() => toggleChecked(item.id)}
                    type="button"
                  >
                    {checkedItems.has(item.id) ? (
                      <CheckCircle2Icon className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                    ) : (
                      <CircleIcon className="mt-0.5 size-4 shrink-0 text-muted-foreground/40" />
                    )}
                    <div className="min-w-0 flex-1">
                      <span
                        className={
                          checkedItems.has(item.id) ? "line-through" : ""
                        }
                      >
                        {item.label}
                      </span>
                      <Badge className="ml-2 text-[10px]" variant="outline">
                        {item.category}
                      </Badge>
                    </div>
                  </button>
                ))}
              </div>
              <p className="mt-3 text-[11px] text-muted-foreground/60 italic">
                {checkedItems.size} of {mockNegotiationChecklist.length}{" "}
                completed
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <MessageSquareIcon className="size-4 text-muted-foreground" />
                <CardTitle>Negotiation Scripts</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {mockNegotiationScripts.map((script) => (
                <div key={script.id}>
                  <button
                    className={cn(
                      "flex w-full items-center justify-between rounded-lg border bg-card p-3 text-left text-xs transition-all hover:bg-accent/50 hover:shadow-sm",
                      expandedScript === script.id
                        ? "border-primary/50 bg-primary/5"
                        : ""
                    )}
                    onClick={() =>
                      setExpandedScript(
                        expandedScript === script.id ? null : script.id
                      )
                    }
                    type="button"
                  >
                    <div className="min-w-0 flex-1">
                      <span className="font-medium">{script.title}</span>
                      <p className="text-[11px] text-muted-foreground">
                        {script.context}
                      </p>
                    </div>
                    {expandedScript === script.id ? (
                      <ChevronDownIcon className="size-4 shrink-0 text-muted-foreground" />
                    ) : (
                      <ChevronRightIcon className="size-4 shrink-0 text-muted-foreground" />
                    )}
                  </button>
                  {expandedScript === script.id && (
                    <div className="mt-1 rounded-lg border bg-muted/30 p-4">
                      <p className="whitespace-pre-wrap text-[11px] text-foreground/80 leading-relaxed">
                        {script.body}
                      </p>
                      <Button
                        className="mt-3 gap-1.5 text-xs"
                        disabled
                        size="sm"
                        variant="outline"
                      >
                        <MessageSquareIcon className="size-3.5" />
                        Draft Negotiation Message
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <HelpCircleIcon className="size-4 text-muted-foreground" />
              <CardTitle>Salary Questions to Ask Recruiter</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2">
              {mockSalaryQuestions.map((q) => (
                <div
                  className="rounded-lg border bg-card p-3 transition-colors hover:bg-accent/30"
                  key={q.id}
                >
                  <div className="mb-1 flex items-center gap-2">
                    <Badge className="text-[10px]" variant="secondary">
                      {q.category}
                    </Badge>
                  </div>
                  <p className="text-xs leading-relaxed">{q.question}</p>
                  <p className="mt-1 text-[11px] text-muted-foreground/60 italic">
                    {q.rationale}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default SalaryResearchPage;
