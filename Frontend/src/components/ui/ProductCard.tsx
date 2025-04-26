"use client";

import { TLIsting } from "@/types/listings";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { currencyFormatter } from "@/utils/currencyFormatter";
import { formatDistanceToNow } from "date-fns";
import { Clock4, Heart } from "lucide-react";
import Link from "next/link";
import { Button } from "./button";
import { addWishlist } from "@/services/wishlist";
import { TWishlist } from "@/types/wishlist";
import { toast } from "sonner";

const ProductCard = ({ product }: { product: TLIsting }) => {
  const timeAgo = formatDistanceToNow(new Date(product.createdAt), {
    addSuffix: true,
  });

  const handleWishlist = async (product: TLIsting) => {
    const wishlistProduct: TWishlist = {
      products: [{ product: product._id! }],
    };

    try {
      const res = await addWishlist(wishlistProduct);
      if (res.success) {
        toast.success(res.message);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  return (
    <Card className="relative w-full font-madimi py-0 mx-auto border border-gray-300 rounded-lg overflow-hidden">
      <CardContent className="flex flex-col md:flex-row gap-5 p-4">
        {/* Product Image */}
        <div className="w-full md:w-1/3 flex justify-center items-center">
          <Link
            href={`/product/${product._id}`}
            className="block w-full h-64 md:h-52"
          >
            <Image
              src={product.images[0]}
              alt="Product Image"
              width={250}
              height={250}
              className="w-full h-full object-cover rounded-lg"
            />
          </Link>
        </div>

        {/* Product Info */}
        <div className="w-full md:w-2/3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-start justify-between">
              <Link href={`/product/${product._id}`} className="flex-1">
                <h2 className="text-lg md:text-xl font-semibold text-black break-words">
                  {product.title.length > 40
                    ? product.title.slice(0, 40) + "..."
                    : product.title}
                </h2>
              </Link>
              <Button
                onClick={() => handleWishlist(product)}
                className="ml-2 hover:text-gray-100"
              >
                <Heart />
              </Button>
            </div>

            <p className="text-gray-600 text-sm md:text-base line-clamp-3">
              {product.description}
            </p>
            <p className="text-lg font-bold text-primary">
              {currencyFormatter(product.price)}
            </p>
          </div>

          {/* Time Section */}
          <div className="mt-3 md:mt-4 flex justify-end items-center text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Clock4 size={18} />
              <span>{timeAgo}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
