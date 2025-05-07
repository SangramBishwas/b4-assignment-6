/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { EllipsisVertical, User } from "lucide-react";
import { VscGraph } from "react-icons/vsc";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import MyAddress from "./Myaddress";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IUser } from "@/types";
import { useUser } from "@/context/UserContext";
import { deleteUser, getMyProfile } from "@/services/users";
import { toast } from "sonner";
import { logout } from "@/services/auth";

const MyAccount = () => {
  const [isUser, setIsUser] = useState<IUser | null>(null);
  const { user } = useUser();

  useEffect(() => {
    if (!user?._id) return;

    const fetchData = async () => {
      try {
        const userData = await getMyProfile(user?._id);
        setIsUser(userData.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchData();
  }, [user?._id]);

  const handleDeleteAccount = async (userId: string) => {
    if (!userId) {
      toast.error("User ID is missing!");
      return;
    }

    const confirmDelete = confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (!confirmDelete) return;

    try {
      const res = await deleteUser(user?._id as string);

      if (res.success) {
        logout();
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }

      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } catch (error: any) {
      toast.error(
        error.message || "An error occurred while deleting the account."
      );
    }
  };

  return (
    <>
      <section className="bg-white p-4 md:p-6 rounded-2xl border font-madimi border-neutral-200 dark:bg-gray-800">
        <div className="flex justify-between items-start sm:items-center gap-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
            <div className="bg-gray-100 flex items-center justify-center rounded-full w-20 h-20">
              {isUser?.profileImage && isUser?.profileImage !== "N/A" ? (
                <Image
                  src={isUser?.profileImage}
                  width={80}
                  height={80}
                  alt="avatar"
                  className="object-cover border-2 border-black h-20 w-20 rounded-full"
                />
              ) : (
                <User
                  size={70}
                  className="border-2 border-black rounded-full p-2"
                />
              )}
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-semibold text-black dark:text-white">
                {isUser?.name ?? "Name"}
              </h2>
              <p className="text-sm text-gray-600 mt-1 dark:text-white">
                {isUser?.email ?? "example@gmail.com"}
              </p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none cursor-pointer">
              <EllipsisVertical className="text-black" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-gray-100 font-madimi border-neutral-300">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Button
                  onClick={() => isUser?._id && handleDeleteAccount(isUser._id)}
                  disabled={!isUser?._id}
                  className="w-full text-white hover:cursor-pointer bg-black hover:bg-black/80"
                >
                  Delete
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="border-b border-neutral-200 my-5" />

        <div className="flex items-start sm:items-center gap-3 flex-col sm:flex-row">
          <VscGraph className="text-black size-6" />
          <h3 className="text-md font-2nd text-gray-700 dark:text-white">
            Progress your account by completing your profile
          </h3>
        </div>
      </section>

      <section className="mt-8 bg-white p-4 md:p-6 rounded-2xl border border-neutral-200 dark:bg-gray-800">
        <MyAddress isUser={isUser} />
      </section>
    </>
  );
};

export default MyAccount;
