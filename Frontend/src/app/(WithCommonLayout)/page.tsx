"use server";
import Slider from "@/components/ui/AntdSlider";
import Categories from "@/components/modules/categories";
import FeaturedProducts from "@/components/modules/featuredProducts";
import { getAllProducts } from "@/services/products";
import { TLIsting } from "@/types";
import OurPromises from "@/components/modules/ourPromises";
import TestimonialSection from "@/components/modules/testimonial";
import OurServices from "@/components/modules/OurSevices";

const page = async () => {
  const { data: allListings = [] } = await getAllProducts();

  const availableProduct = allListings.filter(
    (itm: TLIsting) => itm.status === "available" && itm.userID !== null
  );
  return (
    <div className="bg-neutral-100 dark:bg-black">
      <Slider />
      <div className="lg:mx-[7vw] mx-5 sm:mx-10">
        <FeaturedProducts data={availableProduct} />
        <TestimonialSection />
        <Categories />
        <OurServices />
        <OurPromises />
      </div>
    </div>
  );
};

export default page;
