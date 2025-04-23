"use client";
import AdsCard from "@/components/ui/AdsCard";
import { IProduct } from "@/types/product.type";
import { useEffect, useState } from "react";

const Product = () => {
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
    <div className="my-10">
      <h2 className="text-xl md:text-3xl font-bold text-center my-6">
        Popular Ads
      </h2>
      <p className="text-center w-[80%] mx-auto mb-6">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint, omnis
        magni! Saepe dolorem possimus provident sapiente aliquid doloremque
        cupiditate nam eveniet perferendis a, delectus expedita architecto
        blanditiis ipsam voluptatibus explicabo? Rerum sequi iure consequatur
        vitae perferendis velit quaerat, deserunt voluptas et ad.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-[80%] mx-auto">
        {products.map((product: IProduct) => (
          <AdsCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Product;
