"use client";

import React, { useEffect, useState } from "react";
import { Drawer } from "antd";
import { AlignLeft } from "lucide-react";
import { LuCircleUser } from "react-icons/lu";
import Link from "next/link";
import "../../styles/style.css";
import { FaRegHeart } from "react-icons/fa";
import { TiFolderOpen } from "react-icons/ti";
import { TbInfoSquare } from "react-icons/tb";
import Image from "next/image";
import { getAllCategories } from "@/services/category";
import { IUser, TCategory } from "@/types";

const Sidebar = ({ isUser }: { isUser: IUser }) => {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState<TCategory[] | null>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryData = await getAllCategories();
        setCategories(categoryData?.data);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };

    fetchData();
  }, []);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const sidebarOptions = [
    {
      name: "Wishlist",
      path: "/dashboard/my-favourites",
      icon: <FaRegHeart className="size-5.5" />,
    },
    {
      name: "My Listings",
      path: "/dashboard/my-listings",
      icon: <TiFolderOpen className="size-5.5" />,
    },
    {
      name: "About Us",
      path: "/about",
      icon: <TbInfoSquare className="size-5.5" />,
    },
  ];

  return (
    <>
      <div className="cursor-pointer" onClick={showDrawer}>
        <AlignLeft />
      </div>
      <Drawer
        placement="left"
        onClose={onClose}
        open={open}
        title={
          <div className="ml-3 font-bold text-2xl flex">
            <span>As</span>
            <span>Mart</span>
          </div>
        }
      >
        <div className="ml-2.5 py-3 border-b border-b-neutral-400">
          {isUser?.profileImage ? (
            <div onClick={onClose} className="flex gap-2 items-center">
              {isUser.profileImage === "N/A" ? (
                <LuCircleUser className="size-6" />
              ) : (
                <Image
                  src={isUser.profileImage}
                  alt={isUser.name}
                  width={24}
                  height={24}
                  className="rounded-full object-cover h-6 w-6 overflow-hidden border-2 border-black"
                />
              )}
              <Link href="/dashboard/my-account">Dashboard</Link>
            </div>
          ) : (
            <Link href="/login" className="flex gap-2 items-center">
              <LuCircleUser className="size-6" />
              <p>Login</p>
            </Link>
          )}
        </div>

        <div className="space-y-4 ml-2.5 my-5">
          {sidebarOptions.map((option) => (
            <div
              onClick={onClose}
              key={option.name}
              className="flex gap-2 items-center"
            >
              {option.icon}
              <Link href={option.path}>{option.name}</Link>
            </div>
          ))}
        </div>

        <hr className="my-4 border-neutral-400" />
        <div className="mx-2.5">
          <p className="mb-4 font-semibold">CATEGORIES</p>
          {categories?.map((category, index) => (
            <Link
              onClick={onClose}
              href={`/products?categories=${category._id}`}
              key={category._id || index}
              className="flex gap-3 items-center mb-3 cursor-pointer"
            >
              <Image
                src={
                  category?.icon ||
                  "https://punarbay.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdgrg4lmww%2Fimage%2Fupload%2Fv1741143401%2Fuo8vfio3nfe-1741143395090-icon-decor.jpg&w=2048&q=75"
                }
                alt={category.name}
                width={20}
                height={20}
              />
              <p>{category.name}</p>
            </Link>
          ))}
        </div>
      </Drawer>
    </>
  );
};

export default Sidebar;
