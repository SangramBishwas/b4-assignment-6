import { IProduct } from "@/types/product.type";
import Image from "next/image";

const CategoryCard = ({ product }: { product: IProduct }) => {
  return (
    <div className="w-64 p-3">
      <div className="bg-white border shadow-sm hover:bg-black transition duration-300 text-center group cursor-pointer">
        <Image
          src={product.images}
          alt="Product"
          width={250}
          height={250}
          className="mx-auto w-32 h-32 object-contain py-4"
        />

        <div className="pb-4">
          <h3 className="text-md font-medium text-gray-800 group-hover:text-white transition">
            {product.category}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
