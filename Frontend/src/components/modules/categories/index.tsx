import { Button } from "@/components/ui/button";
import CategoryCard from "@/components/ui/CategoryCard";
import { getAllCategories } from "@/services/category";
import { TCategory } from "@/types";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

const Categories = async () => {
  const { data: categories } = await getAllCategories();

  return (
    <div className="my-4 md:my-10 font-madimi mx-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-lg md:text-xl font-semibold">Categories</h2>
        <Link href="/products">
          <Button size={"sm"}>
            View All <ArrowRight />
          </Button>
        </Link>
      </div>
      <div className="mt-5 grid grid-cols-2 md:flex md:flex-wrap items-center justify-center gap-4">
        {categories?.map((category: TCategory, idx: number) => (
          <Suspense
            key={idx}
            fallback={<div className="w-full h-52 bg-gray-100 rounded-2xl" />}
          >
            <CategoryCard category={category} />
          </Suspense>
        ))}
      </div>
    </div>
  );
};

export default Categories;
