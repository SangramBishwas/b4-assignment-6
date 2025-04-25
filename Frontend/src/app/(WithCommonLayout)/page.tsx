"use server";
import Slider from "@/components/ui/AntdSlider";
import Categories from "@/components/modules/categories";
import FeaturedProducts from "@/components/modules/featuredProducts";
import { getAllProducts } from "@/services/ptoducts";
import { TLIsting } from "@/types";

const page = async () => {
  const { data: allListings } = await getAllProducts();

  const availableProduct = allListings.filter(
    (itm: TLIsting) => itm.status === "available" && itm.userID !== null
  );
  return (
    <div>
      <Slider />
      <div className="lg:mx-32 mx-5 sm:mx-10">
        <FeaturedProducts data={availableProduct} />
        <Categories />
      </div>
    </div>
  );
};

export default page;
