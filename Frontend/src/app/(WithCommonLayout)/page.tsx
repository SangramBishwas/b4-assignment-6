"use server";
import Slider from "@/components/ui/slider";
import Product from "../product/page";
import Categories from "./category/page";

const page = () => {
  return (
    <div className="">
      <Slider />
      <Product />
      <Categories />
    </div>
  );
};

export default page;
