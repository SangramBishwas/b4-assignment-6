"use client";

import * as React from "react";
import { FolderKanban, HomeIcon, UserCog, FolderHeart } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { TeamSwitcher } from "./team-switcher";
import { NavUser } from "./nav-user";

const data = {
  navMain: [
    {
      title: "Home",
      url: "/",
      icon: HomeIcon,
    },
    {
      title: "My Account",
      url: "/dashboard/my-account",
      icon: UserCog,
    },
    {
      title: "My Listings",
      url: "/dashboard/my-listings",
      icon: FolderKanban,
      isActive: true,
    },
    {
      title: "My Favourits",
      url: "/dashboard/my-favourites",
      icon: FolderHeart,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser/>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
