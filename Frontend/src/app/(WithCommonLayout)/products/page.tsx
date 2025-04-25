import FilterSidebar from "@/components/modules/products/filterSidebar";
import SmallDeviceSidebar from "@/components/modules/products/filterSidebar/SmallDeviceSidebar";
import AMPagination from "@/components/ui/core/AMPagination";
import ProductCard from "@/components/ui/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { getAllProducts } from "@/services/ptoducts";
import { TLIsting } from "@/types/listings";

type TSearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
type TListingProps = {
  searchParams: TSearchParams;
  params: Promise<{ id: string }>;
};

const ListingsPage = async ({ searchParams }: TListingProps) => {
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

  console.log("meta", meta);

  return (
    <>
      <div className=" mt-20 ml-5">
        <div className="w-full block md:hidden">
          <SmallDeviceSidebar />
        </div>
        <div className=" flex justify-between gap-8 mx-10">
          <div className=" hidden md:block w-full max-w-[20rem]">
            <FilterSidebar />
          </div>
          <div className="">
            {availableProduct ? (
              availableProduct.length > 0 ? (
                availableProduct
                  .slice()
                  .reverse()
                  .map((product: TLIsting) => (
                    <ProductCard key={product._id} product={product} />
                  ))
              ) : (
                <p className="font-medium font-madimi text-center text-[#1575B9] w-full col-span-full">
                  No Product Available!
                </p>
              )
            ) : (
              // Skeleton Loader
              Array.from({ length: 8 }).map((_, index) => (
                <Skeleton
                  key={index}
                  className="h-60 w-full rounded-lg bg-gray-300"
                />
              ))
            )}

            {/* Pagination */}
            <div className="flex items-center justify-end pb-5">
              <AMPagination totalPage={meta?.totalPage} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListingsPage;
