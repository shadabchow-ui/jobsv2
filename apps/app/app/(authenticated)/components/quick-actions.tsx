import { Badge } from "@repo/design-system/components/ui/badge";
import { Button } from "@repo/design-system/components/ui/button";
import { cn } from "@repo/design-system/lib/utils";
import {
  FileTextIcon,
  MessageSquareIcon,
  SearchIcon,
  SendIcon,
  SparklesIcon,
  TargetIcon,
} from "lucide-react";
import Link from "next/link";

interface QuickAction {
  badge?: string;
  description: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

const actions: QuickAction[] = [
  {
    label: "Search Jobs",
    href: "/jobs/search",
    icon: SearchIcon,
    description: "Find job opportunities",
  },
  {
    label: "AI Match",
    href: "/jobs/ai-match",
    icon: SparklesIcon,
    description: "AI-powered job matching",
    badge: "3",
  },
  {
    label: "Build Resume",
    href: "/jobs/resume",
    icon: FileTextIcon,
    description: "Build or optimize your resume",
  },
  {
    label: "Track Applications",
    href: "/jobs/applications",
    icon: SendIcon,
    description: "Manage your applications",
  },
  {
    label: "Practice Interview",
    href: "/jobs/interview",
    icon: MessageSquareIcon,
    description: "Prepare with AI feedback",
  },
  {
    label: "Improve Skills",
    href: "/jobs/skills",
    icon: TargetIcon,
    description: "Close skill gaps",
  },
];

export const QuickActions = ({ className }: { className?: string }) => (
  <div className={cn("flex flex-wrap items-center gap-2", className)}>
    {actions.map((action) => {
      const Icon = action.icon;
      return (
        <Button
          asChild
          className="h-8 gap-1.5 px-3 font-normal text-xs transition-all duration-100 active:scale-95"
          key={action.label}
          size="sm"
          variant="outline"
        >
          <Link href={action.href}>
            <Icon className="size-3.5 shrink-0 text-muted-foreground" />
            <span>{action.label}</span>
            {action.badge && (
              <Badge
                className="ml-0.5 px-1 py-0 font-normal text-[10px] leading-none"
                variant="secondary"
              >
                {action.badge}
              </Badge>
            )}
          </Link>
        </Button>
      );
    })}
  </div>
);
