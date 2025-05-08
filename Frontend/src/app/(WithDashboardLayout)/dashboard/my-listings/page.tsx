import ManageListings from "@/components/modules/products";
import { getAllProducts } from "@/services/products";

const UserDashboardPage = async () => {
  const { data } = await getAllProducts();

  return (
    <>
      <ManageListings data={data} />
    </>
  );
};

export default UserDashboardPage;
