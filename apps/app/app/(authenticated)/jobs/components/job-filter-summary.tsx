import { Badge } from "@repo/design-system/components/ui/badge";
import { XIcon } from "lucide-react";
import type { JobSearchFilters } from "@/lib/jobs";

interface JobFilterSummaryProps {
  filters: JobSearchFilters;
  onClear: () => void;
  resultCount: number;
}

const activeFilters = (
  filters: JobSearchFilters
): { label: string; key: keyof JobSearchFilters }[] => {
  const entries: { label: string; key: keyof JobSearchFilters }[] = [];
  if (filters.query) {
    entries.push({ label: `"${filters.query}"`, key: "query" });
  }
  if (filters.location) {
    entries.push({ label: `Location: ${filters.location}`, key: "location" });
  }
  if (filters.remoteType && filters.remoteType !== "all") {
    entries.push({ label: filters.remoteType, key: "remoteType" });
  }
  if (filters.employmentType && filters.employmentType !== "all") {
    entries.push({ label: filters.employmentType, key: "employmentType" });
  }
  return entries;
};

export const JobFilterSummary = ({
  filters,
  resultCount,
  onClear,
}: JobFilterSummaryProps) => {
  const tags = activeFilters(filters);

  if (tags.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-2 text-muted-foreground text-sm">
      <span className="text-xs">
        {resultCount} {resultCount === 1 ? "result" : "results"}
      </span>
      {tags.map((tag) => (
        <Badge className="gap-1 pr-1" key={tag.key} variant="secondary">
          {tag.label}
          <button
            className="ml-0.5 rounded-full p-0.5 transition-colors hover:bg-muted-foreground/20"
            onClick={() => onClear()}
            type="button"
          >
            <XIcon className="size-3" />
            <span className="sr-only">Remove {tag.label}</span>
          </button>
        </Badge>
      ))}
    </div>
  );
};
