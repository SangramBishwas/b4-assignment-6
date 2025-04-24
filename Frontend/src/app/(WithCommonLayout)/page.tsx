"use server";
import Slider from "@/components/ui/slider";
import Product from "../product/page";
import Categories from "@/components/modules/categories";
// import CategoryCard from "@/components/ui/CategoryCard";

const page = () => {
  return (
    <div>
      <Slider />
      <Product />
      <Categories />
      {/* <CategoryCard /> */}
    </div>
  );
};

export default page;
