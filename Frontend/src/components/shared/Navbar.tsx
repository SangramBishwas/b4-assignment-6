"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaRegHeart } from "react-icons/fa";
import { LuCircleUser } from "react-icons/lu";
import Sidebar from "../ui/sidebar";

const Navbar = () => {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

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
    { name: "Ads", path: "/ads" },
    { name: "Offer", path: "/offer" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <div
      className={`bg-white shadow-[0_1px_6px_rgba(0,0,0,0.5)] font-madimi items-center px-3 sm:px-5 h-16 w-full flex justify-between fixed top-0 transition-transform duration-300 z-50 ${
        show ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex gap-3 items-center">
        <Sidebar />
        <div className="mr-5 font-lobster font-bold text-xl">
          <span>As</span>
          <span>Mart</span>
        </div>
        <div className="md:flex gap-3 hidden">
          {navOptions.map((option) => (
            <Link key={option.name} className="hover:text-primary" href={option.path}>
              {option.name}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-5">
        <div className="sm:flex hidden gap-2 items-center">
          <LuCircleUser className="size-6" />
          <Link href="/login">Login</Link>
        </div>
        <FaRegHeart className="size-5 sm:block hidden" />
        <button className="bg-black cursor-pointer text-white text-sm sm:text-base md:text-md px-3 sm:px-4 py-1 rounded-lg transition-all duration-300 hover:opacity-80 active:scale-95 shadow-md hover:shadow-xl w-full sm:w-auto">
          Post Free Ad +
        </button>
      </div>
    </div>
  );
};

export default Navbar;
