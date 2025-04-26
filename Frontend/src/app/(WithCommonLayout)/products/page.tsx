import FilterSidebar from "@/components/modules/products/filterSidebar";
import SmallDeviceSidebar from "@/components/modules/products/filterSidebar/SmallDeviceSidebar";
import AMPagination from "@/components/ui/core/AMPagination";
import ProductCard from "@/components/ui/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { getAllProducts } from "@/services/products";
import { TLIsting } from "@/types/listings";
import { Suspense } from "react";

type TSearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
type TListingProps = {
  searchParams: TSearchParams;
  params: Promise<{ id: string }>;
};

const ProductsPage = async ({ searchParams }: TListingProps) => {
  const params = await searchParams;
  const page = String(params.page);
  const query = await searchParams;

  const { data: allListings, meta } = await getAllProducts(
    page,
    undefined,
    query
  );

  const availableProduct = allListings?.filter(
    (itm: TLIsting) => itm.status === "available" && itm.userID !== null
  );

  return (
    <div className="mt-20 px-4 sm:px-6 lg:px-10">
      {/* Mobile & md Sidebar */}
      <div className="block lg:hidden mb-4">
        <SmallDeviceSidebar />
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block lg:w-[20rem]">
          <Suspense>
            <FilterSidebar />
          </Suspense>
        </aside>

        <main className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6">
            {availableProduct ? (
              availableProduct.length > 0 ? (
                availableProduct
                  .slice()
                  .reverse()
                  .map((product: TLIsting) => (
                    <ProductCard key={product._id} product={product} />
                  ))
              ) : (
                <p className="font-medium font-madimi text-black text-center col-span-full">
                  No Product Available!
                </p>
              )
            ) : (
              Array.from({ length: 6 }).map((_, index) => (
                <Skeleton
                  key={index}
                  className="h-60 w-full rounded-lg bg-gray-300"
                />
              ))
            )}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center md:justify-end mt-6">
            <AMPagination totalPage={meta?.totalPage} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProductsPage;
