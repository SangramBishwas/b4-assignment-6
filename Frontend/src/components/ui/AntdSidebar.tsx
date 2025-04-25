"use client";

import React, { useEffect, useState } from "react";
import { Drawer } from "antd";
import { AlignLeft } from "lucide-react";
import { LuCircleUser } from "react-icons/lu";
import Link from "next/link";
import "../../styles/style.css";
import { FaRegHeart } from "react-icons/fa";
import { TiFolderOpen } from "react-icons/ti";
import { BsInfoSquare } from "react-icons/bs";
import Image from "next/image";
import { getAllCategories } from "@/services/category";
import { TCategory } from "@/types";

const Sidebar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState<TCategory[] | null>([]);

  // Fetch categories once on component mount
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
      name: "Login",
      path: "/login",
      icon: <LuCircleUser className="size-4" />,
    },
    {
      name: "Wishlist",
      path: "/dashboard/my-favourites",
      icon: <FaRegHeart className="size-4" />,
    },
    {
      name: "My Listings",
      path: "/dashboard/my-listings",
      icon: <TiFolderOpen className="size-4" />,
    },
    {
      name: "About Us",
      path: "/about",
      icon: <BsInfoSquare className="size-4" />,
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
          <div className="mr-5 font-bold text-xl flex">
            <span>As</span>
            <span>Mart</span>
          </div>
        }
      >
        <div className="space-y-4 m-5">
          {sidebarOptions.map((option) => (
            <div key={option.name} className="flex gap-2 items-center">
              {option.icon}
              <Link href={option.path}>{option.name}</Link>
            </div>
          ))}
        </div>
        <hr className="my-4" />
        <div className="m-5">
          <p className="mb-4 font-semibold">CATEGORIES</p>
          {categories?.map((category, index) => (
            <div
              key={category._id || index}
              className="flex gap-3 items-center mb-3"
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
            </div>
          ))}
        </div>
      </Drawer>
    </>
  );
};

export default Sidebar;
