import { SidebarProvider } from "@repo/design-system/components/ui/sidebar";
import { secure } from "@repo/security";
import type { ReactNode } from "react";
import { env } from "@/env";
import { NotificationsProvider } from "./components/notifications-provider";
import { Search } from "./components/search";
import { GlobalSidebar } from "./components/sidebar";

interface AppLayoutProperties {
  readonly children: ReactNode;
}

const AppLayout = async ({ children }: AppLayoutProperties) => {
  if (env.ARCJET_KEY) {
    await secure(["CATEGORY:PREVIEW"]);
  }

  const userId = "";

  return (
    <NotificationsProvider userId={userId}>
      <SidebarProvider>
        <GlobalSidebar>{children}</GlobalSidebar>
      </SidebarProvider>
      <Search />
    </NotificationsProvider>
  );
};

export default AppLayout;
