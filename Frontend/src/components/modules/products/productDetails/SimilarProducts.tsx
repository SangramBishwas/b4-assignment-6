import AMLoading from "@/components/ui/AMLoading";
import ProductCard from "@/components/ui/ProductCard";
import { getAllProducts } from "@/services/products";
import { TLIsting } from "@/types/listings";
import { useEffect, useState } from "react";

const SimilarProducts = ({
  product,
  category,
}: {
  product: string | undefined;
  category: string;
}) => {
  console.log("🚀 ~ product:", product);
  const [similarData, setSimilarData] = useState<TLIsting[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const query = { categories: category };
        const similarArray = await getAllProducts(undefined, undefined, query);

        setSimilarData(similarArray?.data || []);
      } catch (error) {
        console.error("Error fetching similar ads:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [category]);

  const categoryBaseArray = similarData.filter((item) => item._id !== product);
  console.log("🚀 ~ SimilarProducts ~ categoryBaseArray:", categoryBaseArray);

  return (
    <>
      {loading ? (
        <AMLoading />
      ) : categoryBaseArray.length > 0 ? (
        <div>
          <p className="text-lg font-madimi font-semibold mb-4">
            Similar Products
          </p>

          <div className="space-y-6">
            {categoryBaseArray?.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      ) : (
        <p className="text-center font-madimi text-gray-500 dark:text-white">
          No similar products found.
        </p>
      )}
    </>
  );
};

export default SimilarProducts;
