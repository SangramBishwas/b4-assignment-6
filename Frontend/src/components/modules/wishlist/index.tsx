/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Tag, Clock, Trash2 } from "lucide-react";
import { currencyFormatter } from "@/utils/currencyFormatter";
import { formatDistanceToNow } from "date-fns";
import { TWishlistProduct } from "@/types";
import { Button } from "@/components/ui/button";
import { deleteWishlist } from "@/services/wishlist";
import { toast } from "sonner";

const WishlistProducts = ({
  wishlistItem,
}: {
  wishlistItem: TWishlistProduct;
}) => {
  const { product } = wishlistItem;

  let timeAgo = "Unknown";

  if (product?.createdAt) {
    timeAgo = formatDistanceToNow(new Date(product.createdAt), {
      addSuffix: true,
    });
  }
  const handleDeleteWishlist = async (id: string) => {
    try {
      const res = await deleteWishlist(id);
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (error: any) {
      return Error(error);
    }
  };

  return (
    <>
      <Card className="w-[20rem] py-0 bg-white dark:bg-gray-800 border-neutral-300 rounded-lg overflow-hidden">
        <CardHeader className="p-4">
          <div className="relative w-full h-40">
            <Image
              src={product?.images[0]}
              alt={product?.title}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        </CardHeader>
        <CardContent className="p-4 space-y-3">
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
            {product?.title}
          </CardTitle>
          <p className="text-gray-600 dark:text-white text-sm line-clamp-2">
            {product?.description}
          </p>
          <div className="flex justify-between items-center text-sm text-gray-700 dark:text-white">
            <div className="flex items-center gap-2">
              <Tag size={18} className="text-primary" />
              <span>{product?.condition}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={18} className="text-gray-500" />
              <span>{timeAgo}</span>
            </div>
          </div>
          <div className="flex justify-between items-center mt-3">
            <span className="text-lg font-bold text-primary">
              {currencyFormatter(product?.price)}
            </span>
            <Button
              size={"sm"}
              onClick={() => handleDeleteWishlist(product._id as string)}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 hover:cursor-pointer text-white border-none"
            >
              <Trash2 /> Remove
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default WishlistProducts;
