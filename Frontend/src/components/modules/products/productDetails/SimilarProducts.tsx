import AMLoading from "@/components/ui/AMLoading";
import ProductCard from "@/components/ui/ProductCard";
import { getAllProducts } from "@/services/ptoducts";
import { TLIsting } from "@/types/listings";
import { useEffect, useState } from "react";

const SimilarProducts = ({ category }: { category: string }) => {
  const [similarData, setSimilarData] = useState<TLIsting[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [similarArray] = await Promise.all([getAllProducts()]);
        setSimilarData(similarArray?.data || []);
      } catch (error) {
        console.error("Error fetching similar ads:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const categoryBaseArray = similarData?.filter(
    (itm: TLIsting) => itm?.categories?.name === category
  );

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
        <p className="text-center font-madimi text-gray-500">
          No similar products found.
        </p>
      )}
    </>
  );
};

export default SimilarProducts;
