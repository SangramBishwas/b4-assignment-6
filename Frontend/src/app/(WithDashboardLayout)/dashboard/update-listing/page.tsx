// import { getSingleListing } from "@/services/listings";

import UpdateListingForm from "@/components/modules/dashboard/updateListing/UpdateListingForm";
import { TLIsting } from "@/types";

const UpdateListingPage = async ({
  // params,
}: {
  params: Promise<{ id: string }>;
}) => {
  // const { id } = await params;

  // const { data: product } = await getSingleListing(id);

  const product: TLIsting = {
    _id: "listing123",
    title: "MacBook Pro 2021",
    description: "Lightly used MacBook Pro M1 with 16GB RAM and 512GB SSD.",
    price: 1200,
    condition: "used", // ✅ this is acceptable if the whole object is asserted as TListing
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz1zSRoZxMo6DzDWjsf78x4pJr1t3-Z6LF0A&s",
    ],
    status: "available",
    createdAt: "2024-01-01T10:00:00.000Z",
    updatedAt: "2025-04-01T12:00:00.000Z",
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
  };

  

  return (
    <>
      <div className="p-6">
        <div>
          <h2 className="font-madimi text-3xl font-semibold">
            Update Your Ads Now
          </h2>
        </div>
        <div className=" w-full border-b border-neutral-300 py-4" />

        <UpdateListingForm product={product} />
      </div>
    </>
  );
};

export default UpdateListingPage;
