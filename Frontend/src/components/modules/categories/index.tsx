import { Button } from "@/components/ui/button";
import CategoryCard from "@/components/ui/CategoryCard";
import { getAllCategories } from "@/services/category";
import { TCategory } from "@/types";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const Categories = async () => {
  const { data: categories } = await getAllCategories();

  return (
    <div className="my-4 md:my-10 font-madimi mx-auto">
      <div className="flex items-center justify-between">
        <h2 className=" text-lg font-semibold">Categories</h2>
        <Link href="/products">
          <Button size={"sm"}>
            View All <ArrowRight />
          </Button>
        </Link>
      </div>
      <div className="mt-5 grid grid-cols-2 md:flex md:flex-wrap items-center justify-center gap-4">
        {categories?.map((category: TCategory, idx: number) => (
          <CategoryCard key={idx} category={category} />
        ))}
      </div>
    </div>
  );
};

export default Categories;
