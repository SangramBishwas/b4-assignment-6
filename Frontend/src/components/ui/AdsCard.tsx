import { IProduct } from "@/types/product.type";
import Image from "next/image";
import { Button } from "./button";

const AdsCard = ({ product }: { product: IProduct }) => {
  return (
    <div className="max-w-sm mx-auto p-4">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
        <div className="relative group">
          <Image
            src={product.images}
            alt="Product"
            width={500}
            height={500}
            className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-4 space-y-2">
          <h3 className="text-lg font-semibold text-gray-800">{product.title}</h3>
          <p className="text-sm text-gray-500">
           {product.description.slice(0, 60)}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-indigo-600">{product.price}</span>
            <div className="flex items-center space-x-1">
              <svg
                className="w-5 h-5 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.562-.955L10 0l2.95 5.955 6.562.955-4.756 4.635 1.122 6.545z" />
              </svg>
              <span className="text-sm text-gray-600">(4.5)</span>
            </div>
          </div>
        <Button className="flex ml-auto">
          View
        </Button>
          
        </div>
      </div>
    </div>
  );
};

export default AdsCard;
