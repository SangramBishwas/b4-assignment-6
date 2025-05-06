"use client";

import { type LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation"; // Import usePathname
import { Collapsible } from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { NavUser } from "./nav-user";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  const pathname = usePathname();

  return (
    <SidebarGroup className="font-madimi">
      <SidebarMenu>
        {items.map((item) => {
          const isActive = pathname === item.url;

          return (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={item.isActive}
              className="border-b border-neutral-300 py-1"
            >
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip={item.title}>
                  <Link
                    className={`text-lg dark:text-white ${isActive ? "text-black/50" : ""}`}
                    href={item.url}
                  >
                    <item.icon />
                    {item.title}
                  </Link>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <Link href={subItem.url}>
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </>
                ) : null}
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>

      <div className="py-3">
        <NavUser />
      </div>
    </SidebarGroup>
  );
}
