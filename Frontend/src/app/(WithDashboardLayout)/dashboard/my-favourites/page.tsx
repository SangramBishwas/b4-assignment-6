/* eslint-disable @typescript-eslint/no-explicit-any */
import WishlistProducts from "@/components/modules/wishlist";
import { getAllWishlists } from "@/services/wishlist";
import { TWishlistProduct } from "@/types";

const WishlistProductPage = async () => {
  const wishlists = await getAllWishlists();
  const wishlistsArray =
    wishlists?.data?.flatMap((wishlist: any) => wishlist.products) || [];

  return (
    <div className="p-6 font-madimi">
      <div className="border-b pb-7 mb-10 border-neutral-300">
        <h2 className="text-3xl font-bold">My Wishlist Products</h2>
      </div>

      {wishlistsArray.length === 0 ? (
        <div className="mt-5 text-center text-gray-600 text-lg">
          No wishlist products available.
        </div>
      ) : (
        <div className="mt-5 flex flex-wrap gap-4">
          {wishlistsArray.map((product: TWishlistProduct) => (
            <WishlistProducts key={Math.random()} wishlistItem={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistProductPage;
