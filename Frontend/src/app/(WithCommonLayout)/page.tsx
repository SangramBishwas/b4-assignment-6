"use server";
import Slider from "@/components/ui/AntdSlider";
import Product from "../product/page";
import Categories from "@/components/modules/categories";

const page = () => {
  return (
    <div>
      <Slider />
      <div className="lg:mx-32 mx-5 sm:mx-10">
        <Product />
        <Categories />
      </div>
    </div>
  );
};

export default page;
