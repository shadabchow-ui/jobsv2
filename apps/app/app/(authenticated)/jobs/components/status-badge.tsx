import { getStatusClass, getStatusLabel } from "@/lib/jobs/helpers";
import type { ApplicationStatus } from "@/lib/jobs/types";

interface StatusBadgeProps {
  size?: "sm" | "md";
  status: ApplicationStatus;
}

export const StatusBadge = ({ status, size = "md" }: StatusBadgeProps) => {
  const classes = getStatusClass(status);
  const label = getStatusLabel(status);
  const padding = size === "sm" ? "px-1.5 py-0" : "px-2 py-0.5";
  const fontSize = size === "sm" ? "text-[10px]" : "text-[11px]";

  return (
    <span
      className={`inline-flex items-center rounded-md border font-medium uppercase tracking-wide ${padding} ${fontSize} ${classes}`}
    >
      {label}
    </span>
  );
};
