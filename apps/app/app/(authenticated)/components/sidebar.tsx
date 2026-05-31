"use client";

import { OrganizationSwitcher, UserButton } from "@repo/auth/client";
import { ModeToggle } from "@repo/design-system/components/mode-toggle";
import { Button } from "@repo/design-system/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@repo/design-system/components/ui/sidebar";
import { cn } from "@repo/design-system/lib/utils";
import { NotificationsTrigger } from "@repo/notifications/components/trigger";
import {
  AnchorIcon,
  BarChart3Icon,
  BookmarkIcon,
  BriefcaseIcon,
  Building2Icon,
  CommandIcon,
  DollarSignIcon,
  FileTextIcon,
  GraduationCapIcon,
  LayoutDashboardIcon,
  LifeBuoyIcon,
  MailIcon,
  ScrollTextIcon,
  SearchIcon,
  SendIcon,
  SettingsIcon,
  SparklesIcon,
  UserCheckIcon,
  UsersIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { jobsNavItems } from "@/lib/upcube/registry";

interface GlobalSidebarProperties {
  readonly children: ReactNode;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard: LayoutDashboardIcon,
  Search: SearchIcon,
  Sparkles: SparklesIcon,
  Bookmark: BookmarkIcon,
  FileText: FileTextIcon,
  ScrollText: ScrollTextIcon,
  Mail: MailIcon,
  Briefcase: BriefcaseIcon,
  BarChart3: BarChart3Icon,
  GraduationCap: GraduationCapIcon,
  DollarSign: DollarSignIcon,
  UserCheck: UserCheckIcon,
  Users: UsersIcon,
  Building2: Building2Icon,
  Settings: SettingsIcon,
};

export const GlobalSidebar = ({ children }: GlobalSidebarProperties) => {
  const pathname = usePathname();
  const { open } = useSidebar();

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/" && !pathname.startsWith("/search");
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      <Sidebar collapsible="icon" variant="inset">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <div
                className={cn(
                  "h-[36px] overflow-hidden transition-all [&>div]:w-full",
                  open ? "" : "-mx-1"
                )}
              >
                <OrganizationSwitcher
                  afterSelectOrganizationUrl="/"
                  hidePersonal
                />
              </div>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <div className="px-3 py-1.5">
          <Link
            className="flex h-8 items-center gap-2 rounded-md border border-sidebar-border bg-sidebar-accent/50 px-3 text-sidebar-foreground/50 text-xs transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground/80"
            href="/search"
          >
            <SearchIcon size={14} />
            <span className="flex-1">Search</span>
            <kbd className="flex items-center gap-0.5 font-mono text-[10px] text-sidebar-foreground/30">
              <CommandIcon size={10} />
              <span>K</span>
            </kbd>
          </Link>
        </div>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Jobs</SidebarGroupLabel>
            <SidebarMenu>
              {jobsNavItems.map((item) => {
                const Icon = iconMap[item.icon];
                const active = isActive(item.href);
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      asChild
                      isActive={active}
                      tooltip={item.label}
                    >
                      <Link href={item.href}>
                        {Icon && <Icon />}
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
          <SidebarGroup className="mt-auto">
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive("/webhooks")}
                    tooltip="Webhooks"
                  >
                    <Link href="/webhooks">
                      <AnchorIcon />
                      <span>Webhooks</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    className="opacity-40"
                    disabled
                    tooltip="Support"
                  >
                    <LifeBuoyIcon />
                    <span>Support</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    className="opacity-40"
                    disabled
                    tooltip="Feedback"
                  >
                    <SendIcon />
                    <span>Feedback</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem className="flex items-center gap-2">
              <UserButton
                appearance={{
                  elements: {
                    rootBox: "flex overflow-hidden w-full",
                    userButtonBox: "flex-row-reverse",
                    userButtonOuterIdentifier: "truncate pl-0",
                  },
                }}
                showName
              />
              <div className="flex shrink-0 items-center gap-px">
                <ModeToggle />
                <Button
                  asChild
                  className="shrink-0"
                  size="icon"
                  variant="ghost"
                >
                  <div>
                    <NotificationsTrigger />
                  </div>
                </Button>
              </div>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>{children}</SidebarInset>
    </>
  );
};
