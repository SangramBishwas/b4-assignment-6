import ProductDetails from "@/components/modules/products/productDetails";
import { getSingleProduct } from "@/services/products";

const ProductDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const { data: product } = await getSingleProduct(id);

  return (
    <div>
      <div className="lg:mx-32 mx-5 sm:mx-10 ">
        <ProductDetails product={product} />
      </div>
    </div>
  );
};

export default ProductDetailsPage;
