"use client";

import { Button } from "@/components/ui/button";
import { TLIsting } from "@/types/listings";
import { currencyFormatter } from "@/utils/currencyFormatter";
import clsx from "clsx";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import StatusModal from "./StatusModal";
import { useUser } from "@/context/UserContext";
import { deleteProduct } from "@/services/products";
import { toast } from "sonner";

export type TListingsProps = {
  data: TLIsting[];
};

const ManageListings = ({ data }: TListingsProps) => {
  const { user } = useUser();

  const isMyAds = data.filter((itm) => itm.userID?.email === user?.email);

  if (!isMyAds.length) {
    return (
      <>
        <div className="flex flex-col items-center justify-center h-screen text-center space-y-3">
          <p className="text-lg font-madimi font-semibold text-gray-600">
            No available products!
          </p>
          <Link href="/dashboard/add-product">
            <Button
              size={"sm"}
              className={clsx(
                "bg-black hover:bg-black/80 font-madimi hover:cursor-pointer text-white font-medium px-6 py-2 rounded-lg flex items-center gap-2"
              )}
            >
              <Plus className="w-5 h-5" />
              Create Post
            </Button>
          </Link>
        </div>
      </>
    );
  }

  const handleListingDelete = async (id: string) => {
    try {
      const res = await deleteProduct(id);

      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error("Unexpected error during deletion:", error);
    }
  };

  return (
    <>
      <div className="mb-6 border-neutral-400 p-6 font-madimi">
        <div className="flex border-b pb-7 border-neutral-300 items-center justify-between">
          <h2 className="text-xl sm:text-3xl font-bold">My Products</h2>
          <Link href="/dashboard/add-product">
            <Button
              className={clsx(
                "bg-black hover:bg-black/80 hover:cursor-pointer text-white font-medium px-6 py-2 rounded-lg"
              )}
            >
              Cretae Product <Plus />
            </Button>
          </Link>
        </div>
      </div>
      <div className="space-y-8 px-4 sm:px-6">
        {isMyAds &&
          isMyAds.map(
            (
              {
                title,
                images,
                description,
                _id,
                price,
                condition,
                categories,
                status,
              },
              idx
            ) => (
              <div
                key={`${_id}-${idx}`}
                className="bg-white border font-madimi border-neutral-300 p-4 md:p-5 rounded-2xl flex flex-col-reverse md:flex-row gap-6 md:gap-8 justify-between"
              >
                <div className="flex-1">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-medium">{title}</h2>
                    <p className="text-wrap">{description}</p>
                    <p>{currencyFormatter(price)}</p>
                  </div>
                  <div className="mt-5 flex flex-wrap text-sm items-center">
                    {categories?.name && (
                      <div className="font-medium lg:border-r border-neutral-300 pr-4">
                        Categorie: {categories?.name}
                      </div>
                    )}

                    {condition && (
                      <div className="font-medium lg:border-r border-neutral-300 pr-4 lg:px-4">
                        Condition:
                        <span
                          className={clsx("px-1", {
                            "text-green-500": condition === "new",
                            "text-yellow-500": condition === "used",
                            "text-[#1575B9]": condition === "refurbished",
                          })}
                        >
                          {condition.charAt(0).toUpperCase() +
                            condition.slice(1)}
                        </span>
                      </div>
                    )}

                    {status && (
                      <div className={clsx("font-medium lg:pl-4")}>
                        Status:
                        <span
                          className={clsx("px-1", {
                            "text-green-500": status === "available",
                            "text-yellow-500": status === "sold",
                          })}
                        >
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="mt-6 flex flex-wrap sm:flex-nowrap gap-3">
                    <Button
                      size={"sm"}
                      onClick={() => handleListingDelete(_id!)}
                      className={clsx(
                        "bg-red-500 hover:bg-red-600 hover:cursor-pointer text-white font-medium px-6 py-2 rounded-lg"
                      )}
                    >
                      Remove
                    </Button>

                    <Link href={`/dashboard/update-listing/${_id}`}>
                      <Button
                        size={"sm"}
                        className={clsx(
                          "bg-black hover:bg-black/80 hover:cursor-pointer text-white font-medium px-6 py-2 rounded-lg"
                        )}
                      >
                        Update
                      </Button>
                    </Link>
                    <StatusModal id={_id!} />
                  </div>
                </div>
                <div className="w-full md:w-[200px]">
                  <Image
                    src={images[0]}
                    width={200}
                    height={200}
                    alt="product image"
                    className="w-full h-full max-h-52 rounded-sm object-cover"
                  />
                </div>
              </div>
            )
          )}
      </div>
    </>
  );
};

export default ManageListings;
