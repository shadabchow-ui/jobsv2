"use client";

import { Button } from "@repo/design-system/components/ui/button";
import { Input } from "@repo/design-system/components/ui/input";
import { Label } from "@repo/design-system/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/design-system/components/ui/select";
import { EraserIcon, SearchIcon } from "lucide-react";
import type { JobSearchFilters } from "@/lib/jobs";

interface JobSearchFormProps {
  filters: JobSearchFilters;
  onFilterChange: (filters: JobSearchFilters) => void;
}

export const JobSearchForm = ({
  filters,
  onFilterChange,
}: JobSearchFormProps) => {
  const update = (partial: Partial<JobSearchFilters>) => {
    onFilterChange({ ...filters, ...partial });
  };

  const clear = () => {
    onFilterChange({
      query: "",
      location: "",
      remoteType: "",
      employmentType: "",
    });
  };

  const hasAnyFilter =
    filters.query ||
    filters.location ||
    filters.remoteType ||
    filters.employmentType;

  return (
    <div className="space-y-4 rounded-xl border bg-card p-4">
      <h2 className="font-medium text-muted-foreground text-xs uppercase tracking-wider">
        Filters
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-1.5">
          <Label htmlFor="query">Role / Keyword</Label>
          <div className="relative">
            <SearchIcon className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="pl-8"
              id="query"
              onChange={(e) => update({ query: e.target.value })}
              placeholder="Search by title, skill…"
              value={filters.query}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            onChange={(e) => update({ location: e.target.value })}
            placeholder="City, state, or remote…"
            value={filters.location}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="remoteType">Remote Type</Label>
          <Select
            onValueChange={(v) => update({ remoteType: v })}
            value={filters.remoteType}
          >
            <SelectTrigger className="w-full" id="remoteType">
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="Remote">Remote</SelectItem>
              <SelectItem value="Hybrid">Hybrid</SelectItem>
              <SelectItem value="On-site">On-site</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="employmentType">Employment Type</Label>
          <Select
            onValueChange={(v) => update({ employmentType: v })}
            value={filters.employmentType}
          >
            <SelectTrigger className="w-full" id="employmentType">
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="Full-time">Full-time</SelectItem>
              <SelectItem value="Part-time">Part-time</SelectItem>
              <SelectItem value="Contract">Contract</SelectItem>
              <SelectItem value="Internship">Internship</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {hasAnyFilter && (
        <div className="flex justify-end">
          <Button
            className="gap-1.5 text-xs"
            onClick={clear}
            size="sm"
            variant="ghost"
          >
            <EraserIcon className="size-3.5" />
            Clear all filters
          </Button>
        </div>
      )}
    </div>
  );
};
