"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaRegHeart } from "react-icons/fa";
import { LuCircleUser } from "react-icons/lu";
import Sidebar from "../ui/AntdSidebar";
import { IUser } from "@/types";
import { getMyProfile } from "@/services/users";
import { useUser } from "@/context/UserContext";
import Image from "next/image";

const Navbar = () => {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isUser, setIsUser] = useState<IUser | null>(null);
  console.log("🚀 ~ Navbar ~ isUser:", isUser);
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

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== "undefined") {
        if (window.scrollY > lastScrollY && window.scrollY > 50) {
          setShow(false);
        } else {
          setShow(true);
        }
        setLastScrollY(window.scrollY);
      }
    };

    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  const navOptions = [
    { name: "Products", path: "/products" },
    { name: "About", path: "/about" },
  ];

  return (
    <div
      className={`bg-white shadow-[0_1px_6px_rgba(0,0,0,0.5)] font-madimi items-center px-3 sm:px-5 h-16 w-full flex justify-between fixed top-0 transition-transform duration-300 z-50 ${
        show ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex gap-3 items-center">
        <Sidebar />
        <Link href="/" className="mr-5 font-lobster font-bold text-3xl">
          <span>As</span>
          <span>Mart</span>
        </Link>
        <div className="md:flex gap-3 hidden">
          {navOptions.map((option) => (
            <Link
              key={option.name}
              className="hover:text-primary"
              href={option.path}
            >
              {option.name}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-5">
        {isUser?.profileImage ? (
          <div className="sm:flex hidden gap-2 items-center">
            <Image
              src={isUser?.profileImage}
              alt={isUser?.name}
              width={24}
              height={24}
              className="rounded-full border-2 border-black"
            />
            <Link href="/dashboard/my-account">Dashboard</Link>
          </div>
        ) : (
          <Link href="/login" className="sm:flex hidden gap-2 items-center">
            <LuCircleUser className="size-6" />
            <p>Login</p>
          </Link>
        )}
        <Link href="/dashboard/my-favourites">
          <FaRegHeart className="size-5 sm:block hidden" />
        </Link>
        <Link href={"/dashboard/add-product"}>
          <button className="bg-black cursor-pointer text-white text-sm sm:text-base md:text-md px-3 sm:px-4 py-1 rounded-lg transition-all duration-300 hover:opacity-80 active:scale-95 shadow-md hover:shadow-xl w-full sm:w-auto">
            Add product +
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
