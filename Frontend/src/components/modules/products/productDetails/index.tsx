"use client";

import { TLIsting } from "@/types";
import { currencyFormatter } from "@/utils/currencyFormatter";
import { formatDistanceToNow } from "date-fns";
import { Clock4, Facebook, Linkedin, Twitter } from "lucide-react";
import AMCarousel from "@/components/ui/AMCarousel";
import SimilarProducts from "./SimilarProducts";
import UserCard from "./UserCard";

const ProductDetails = ({ product }: { product: TLIsting }) => {
  const timeAgo = formatDistanceToNow(new Date(product?.createdAt), {
    addSuffix: true,
  });

  return (
    <>
      {/* Main Product Section */}
      <div className="mt-24 font-madimi border border-black/20 py-8 rounded-xl overflow-hidden grid grid-cols-1 md:grid-cols-7 dark:bg-gray-800">
        {/* Left Side: Images and Details */}
        <div className="bg-white dark:bg-gray-800 col-span-1 md:col-span-4 px-6 md:pb-0 pb-8 border-b md:border-b-0 md:border-r border-neutral-300">
          {/* Image Carousel */}
          <AMCarousel images={product?.images} />

          {/* Title, Price, Description */}
          <div className="mt-8 space-y-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
              <h2 className="text-2xl font-semibold text-black dark:text-white">
                {product?.title}
              </h2>
              <p className="text-xl font-bold text-primary mt-2 md:mt-0">
                {currencyFormatter(product?.price)}
              </p>
            </div>

            <p className="text-gray-700 dark:text-white">{product?.description}</p>

            {/* Posted and Product ID */}
            <div className="flex flex-col lg:flex-row md:justify-between items-start lg:items-center border-y border-neutral-300 py-4 gap-4">
              <div className="flex items-center flex-wrap gap-2">
                <p className="text-lg font-semibold">Posted:</p>
                <div className="flex items-center gap-1 text-gray-600 dark:text-white">
                  <Clock4 size={20} />
                  <span>{timeAgo}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <p className="text-lg font-semibold">Product ID:</p>
                <p className="text-gray-600 dark:text-white">{product?._id?.slice(0, 11)}</p>
              </div>
            </div>

            {/* Social Share */}
            <div className="flex flex-wrap items-center gap-4">
              <p className="text-lg font-semibold">Share product:</p>
              <div className="flex gap-2">
                <div className="border-2 border-black rounded-lg p-2 hover:bg-gray-100 cursor-pointer transition">
                  <Facebook size={20} />
                </div>
                <div className="border-2 border-black rounded-lg p-2 hover:bg-gray-100 cursor-pointer transition">
                  <Twitter size={20} />
                </div>
                <div className="border-2 border-black rounded-lg p-2 hover:bg-gray-100 cursor-pointer transition">
                  <Linkedin size={20} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-1 md:col-span-3 bg-white dark:bg-gray-800 py-8 px-6">
          <UserCard user={product?.userID} timeAgo={timeAgo} />
        </div>
      </div>

      <section className="my-10 grid grid-cols-1 md:grid-cols-7 gap-7">
        <div className="col-span-1 md:col-span-5 bg-white dark:bg-gray-800 rounded-lg py-6 md:py-8">
          <SimilarProducts
            product={product?._id}
            category={product?.categories._id}
          />
        </div>

        <div className="col-span-1 md:col-span-2 hidden md:block"></div>
      </section>
    </>
  );
};

export default ProductDetails;
