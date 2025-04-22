import React, { useState } from "react";
import { Drawer } from "antd";
import { AlignRight } from "lucide-react";
import { LuCircleUser } from "react-icons/lu";
import Link from "next/link";
import  "../../styles/style.css";
import { FaRegHeart } from "react-icons/fa";
import Image from "next/image";

const Sidebar: React.FC = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const sidebarOptions = [
    { name: "Login", path: "/login", icon: <LuCircleUser className="size-4"/> },
    { name: "Wishlist", path: "/wishlist", icon: <FaRegHeart className="size-4"/> },
    { name: "My Listings", path: "/my-listings", icon: <FaRegHeart className="size-4"/> },
    { name: "Offers", path: "/offers", icon: <FaRegHeart className="size-4"/> },
    { name: "About Us", path: "/about-us", icon: <FaRegHeart className="size-4"/> },
  ];

  return (
    <>
      <div className="cursor-pointer" onClick={showDrawer}>
        <AlignRight />
      </div>
      <Drawer
        placement="left"
        title=<div className="mr-5 font-bold text-xl">
          <span>As</span>
          <span>Mart</span>
        </div>
        onClose={onClose}
        open={open}
      >
        <div className="space-y-2 m-5">
          {sidebarOptions.map((option) => (
            <div key={option.name} className="flex gap-2 items-center">
              {option.icon}
              <Link href={option.path}>{option.name}</Link>
            </div>
          ))}
        </div>
        <hr />
        <div className="m-5">
          <p className="mb-4">CATEGORIES</p>
          {Array(10)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="flex gap-3 items-center">
                <Image
                  src={
                    "https://punarbay.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdgrg4lmww%2Fimage%2Fupload%2Fv1741143401%2Fuo8vfio3nfe-1741143395090-icon-decor.jpg&w=2048&q=75"
                  }
                  alt="category"
                  width={20}
                  height={20}
                />
                <p>Category {index + 1}</p>
              </div>
            ))}
        </div>
      </Drawer>
    </>
  );
};

export default Sidebar;
