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
import { ImSun } from "react-icons/im";
import { RiMoonClearLine } from "react-icons/ri";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { SearchIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import { MdLogin } from "react-icons/md";

const Navbar = () => {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isUser, setIsUser] = useState<IUser | null>(null);
  const { user } = useUser();
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "dark") {
      setDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    if (!user?._id) {
      return;
    }

    const fetchData = async () => {
      try {
        const userData = await getMyProfile(user._id);
        if (userData?.data) {
          setIsUser(userData.data);
        } else {
          console.error("No user data found.");
        }
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

  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearchQuery = (query: string, value: string | number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(query, value.toString());
    router.push(`/products?${params?.toString()}`);
    reset();
  };

  const { handleSubmit, register, reset } = useForm<FormData>();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    handleSearchQuery("searchTerm", data.values);
  };

  return (
    <div
      className={`bg-white shadow-[0_1px_6px_rgba(0,0,0,0.5)] font-madimi items-center px-3 gap-4 sm:px-5 h-16 w-full flex justify-between fixed top-0 transition-transform duration-300 z-50 dark:bg-black ${
        show ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex gap-3 items-center dark:bg-black">
        <Sidebar isUser={isUser!} />
        <Link
          href="/"
          className="sm:mr-5 font-lobster font-bold text-2xl sm:text-3xl"
        >
          <span>As</span>
          <span>Mart</span>
        </Link>
        <div className="md:flex gap-3 hidden">
          {navOptions.map((option) => (
            <Link
              key={option.name}
              className="hover:text-primary text-lg"
              href={option.path}
            >
              {option.name}
            </Link>
          ))}
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="hidden w-full max-w-[30rem] relative sm:flex items-center"
      >
        <Input
          {...register("values")}
          type="serch"
          className="w-full border border-neutral-400 pr-10"
          placeholder="Search for products"
        />

        <button
          type="submit"
          className="absolute right-1 cursor-pointer px-2 py-[2px] dark:bg-white bg-black text-white rounded-md text-sm hover:bg-gray-800 transition-all duration-200"
        >
          <SearchIcon className="w-4 text-white dark:text-black" />
        </button>
      </form>

      <div className="flex items-center sm:gap-5 gap-1">
        <span
          onClick={() => setDark(!dark)}
          className={`inline-block transition-all duration-500 ease-in-out transform ${
            dark ? "rotate-180 scale-100" : "rotate-0 scale-100"
          }`}
        >
          {dark ? (
            <ImSun className="size-6 cursor-pointer" />
          ) : (
            <RiMoonClearLine className="size-6 cursor-pointer" />
          )}
        </span>

        <Link href="/dashboard/my-favourites">
          <FaRegHeart className="size-6 sm:block hidden" />
        </Link>

        {isUser?.profileImage ? (
          <div className="sm:block hidden min-w-7 min-h-7">
            {isUser.profileImage === "N/A" ? (
              <Link href="/dashboard/my-account">
                <LuCircleUser className="size-6" />
              </Link>
            ) : (
              <Link href="/dashboard/my-account">
                <Image
                  src={isUser.profileImage}
                  alt={isUser.name}
                  width={24}
                  height={24}
                  className="rounded-full size-7 cursor-pointer object-cover overflow-hidden border-2 border-black"
                />
              </Link>
            )}
          </div>
        ) : (
          <Link href="/login" className="sm:flex hidden gap-2 items-center">
            <Button size={"sm"}>
              Login
              <MdLogin className="size-4" />
            </Button>
          </Link>
        )}

        <Link href="/dashboard/add-product">
          <Button size={"sm"} className="text-nowrap">
            Add product +
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
