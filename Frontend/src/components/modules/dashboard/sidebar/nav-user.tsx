/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { IoLogOutSharp } from "react-icons/io5";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useUser } from "@/context/UserContext";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/services/auth";
import { protectedRoutes } from "@/constants";
import { toast } from "sonner";

export function NavUser() {
  const { setIsLoading, setUser } = useUser();

  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    const toastId = toast.loading("Logging out...");
    try {
      setIsLoading(true);
      await logout();
      setUser(null);
      toast.success("Logout successful!", { id: toastId });

      if (protectedRoutes.some((route) => pathname.match(route))) {
        router.push("/");
      }
    } catch (error: any) {
      toast.error("Logout failed. Please try again.", { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
              <div
                onClick={handleLogout}
                className="flex gap-2 items-center cursor-pointer"
              >
                <IoLogOutSharp className="text-2xl" />
                <p className="font-bold text-lg font-madimi">Logout</p>
              </div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
