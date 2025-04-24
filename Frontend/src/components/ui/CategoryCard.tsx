"use client";

import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "./skeleton";
import { IProduct } from "@/types";

const CategoryCard = ({ product }: { product: IProduct }) => {
  return (
    <Link href={`/ads/${product._id}`}>
      <div className="bg-white group rounded-2xl hover:cursor-pointer md:w-52 md:h-52 flex flex-col items-center justify-evenly p-4 border border-neutral-200">
        <div className="relative w-full h-28 flex items-center justify-center">
          {product ? (
            <Image
              src={product.images}
              alt="Category Icon"
              fill
              className="object-contain transition-transform duration-500 ease-in-out group-hover:scale-110"
            />
          ) : (
            <Skeleton className="w-16 h-16 rounded-full bg-gray-300" />
          )}
        </div>
        <h3 className="font-medium text-center truncate w-full text-gray-800">
          {product?.title || <Skeleton className="w-32 h-4 bg-gray-300" />}
        </h3>
      </div>
    </Link>
  );
};

export default CategoryCard;
