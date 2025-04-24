"use client";

import CategoryCard from "@/components/ui/CategoryCard";
import { IProduct } from "@/types/product";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const Categories = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("/products.json")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => console.error(err));
  }, []);
  return (
    <div className="my-4 md:my-10 font-madimi mx-auto">
        <div className="flex items-center justify-between">
          <h2 className=" text-lg font-semibold">Top Selling Categories</h2>
          <Link href="/products">
            <>
              View All <ArrowRight />
            </>
          </Link>
        </div>
        <div className="mt-5 grid grid-cols-2 md:flex md:flex-wrap items-center justify-center gap-4">
          {products?.map((product: IProduct, idx: number) => (
            <CategoryCard key={idx} product={product} />
          ))}
        </div>
    </div>
  );
};

export default Categories;
