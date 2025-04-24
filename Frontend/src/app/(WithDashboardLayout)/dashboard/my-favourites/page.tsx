import WishlistProducts from "@/components/modules/wishlist";
import { TWishlistProduct } from "@/types";

const WishlistProductPage = async () => {
  const products: TWishlistProduct[] = [
    {
      _id: "6430a7b29cfa32001c7a4e23",
      product: {
        _id: "listing123",
        title: "MacBook Pro 2021",
        description: "Lightly used MacBook Pro M1 with 16GB RAM and 512GB SSD.",
        price: 1200,
        condition: "used",
        images: [
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz1zSRoZxMo6DzDWjsf78x4pJr1t3-Z6LF0A&s",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz1zSRoZxMo6DzDWjsf78x4pJr1t3-Z6LF0A&s",
        ],
        categories: {
          _id: "cat456",
          name: "Electronics",
          description: "Devices, gadgets, and accessories",
          icon: "💻",
          isActive: true,
          parent: null,
          createdBy: "admin123",
          createdAt: "2024-01-01T10:00:00.000Z",
          updatedAt: "2025-04-01T12:00:00.000Z",
        },
        userID: {
          _id: "user789",
          name: "Shuvo Kumar",
          email: "shuvo@example.com",
          lastLogin: "2025-04-23T14:30:00.000Z",
          isActive: true,
        },
        location: "Dhaka, Bangladesh",
        status: "available",
        createdAt: "2025-04-20T09:00:00.000Z",
        updatedAt: "2025-04-22T18:00:00.000Z",
      },
    },
  ];

  return (
    <div className="p-6 font-madimi">
      <div className="border-b pb-7 mb-10 border-neutral-300">
        <h2 className="text-3xl font-bold">My Wishlist Products</h2>
      </div>

      {products.length === 0 ? (
        <div className="mt-5 text-center text-gray-600 text-lg">
          No wishlist products available.
        </div>
      ) : (
        <div className="mt-5 flex flex-wrap gap-4">
          {Array(7)
            .fill(products[0])
            .map((product: TWishlistProduct) => (
              <WishlistProducts key={Math.random()} wishlistItem={product} />
            ))}
        </div>
      )}
    </div>
  );
};

export default WishlistProductPage;
