import AddProductForm from "@/components/modules/listings/AddProductForm";

const PostAdPage = () => {
  return (
    <>
      <section className="font-madimi p-6">
        <div>
          <h2 className=" text-3xl font-semibold">Add Product</h2>
        </div>
        <div className=" w-full border-b border-neutral-300 py-4" />
        <AddProductForm/>
      </section>
    </>
  );
};

export default PostAdPage;
