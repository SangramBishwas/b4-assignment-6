"use server";
import Slider from "@/components/ui/AntdSlider";
import Categories from "@/components/modules/categories";
import FeaturedProducts from "@/components/modules/featuredProducts";

const page = () => {
  return (
    <div>
      <Slider />
      <div className="lg:mx-32 mx-5 sm:mx-10">
        <FeaturedProducts/>
        <Categories />
      </div>
    </div>
  );
};

export default page;
