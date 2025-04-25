"use client";

import { TCategory, TLIsting } from "@/types/listings";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import ImagePreviewer from "@/components/ui/core/AMImageUploader/AMImagePreviwer";
import AMImageUploader from "@/components/ui/core/AMImageUploader";
import { useEffect, useState } from "react";
import { updateProduct } from "@/services/ptoducts";
import { toast } from "sonner";
import { getAllCategories } from "@/services/category";
import { useRouter } from "next/navigation";

const UpdateListingForm = ({ product }: { product: TLIsting }) => {
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  console.log("🚀 ~ UpdateListingForm ~ imageFiles:", imageFiles);
  const [imagePreview, setImagePreview] = useState<string[] | []>(
    product.images || []
  );
  const [categories, setCategories] = useState<TCategory[] | []>([]);

  const router = useRouter();

  const form = useForm({
    defaultValues: {
      title: product?.title || "",
      description: product?.description || "",
      price: product?.price || "",
      categories: product?.categories?.name || "",
      condition: product?.condition || "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  useEffect(() => {
    const fetchData = async () => {
      const [categoriesData] = await Promise.all([getAllCategories()]);

      setCategories(categoriesData?.data);
    };

    fetchData();
  }, []);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const modifiedData = {
      ...data,
      price: parseFloat(data.price),
    };

    console.log("modifiedData__", modifiedData);

    const formData = new FormData();
    console.log(
      "🚀 ~ constonSubmit:SubmitHandler<FieldValues>= ~ formData:",
      formData
    );

    for (const file of imageFiles) {
      formData.append("images", file);
    }
    formData.append("data", JSON.stringify(modifiedData));
    try {
      const res = await updateProduct(formData, product._id!);
      console.log("updateListingProduct", res);

      if (res.success) {
        toast.success(res.message);
        router.push("/dashboard/my-listings");
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className=" mt-6">
        <h3 className="font-madimi text-2xl font-medium">
          Change your ad details if you need!
        </h3>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="mt-5 font-madimi border-2 mb-6 bg-white border-gray-200 rounded-xl flex-grow p-6">
            <div className="grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 sm:grid-cols-3 items-center justify-between gap-4 w-full">
                <FormField
                  control={form.control}
                  name="categories"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl className="w-full">
                          <SelectTrigger>
                            <SelectValue placeholder="Select Category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="font-madimi bg-slate-100 w-full">
                          <SelectItem value="Select category" disabled>
                            Select product category
                          </SelectItem>
                          {categories.map((category) => (
                            <SelectItem
                              key={category?._id}
                              value={category?._id}
                            >
                              {category?.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="condition"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select condition</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl className="w-full">
                          <SelectTrigger>
                            <SelectValue placeholder="Select Product condition" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className=" bg-slate-100 font-madimi">
                          <SelectItem value="new">New</SelectItem>
                          <SelectItem value="used">Used</SelectItem>
                          <SelectItem value="refurbished">
                            Refurbished
                          </SelectItem>
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value || ""} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="my-4">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          className="h-36 resize-none"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <div className="flex justify-between items-center border-t border-b py-3 my-5">
                  <p className="text-primary text-xl">Images</p>
                </div>
                <div className="flex gap-4 ">
                  <AMImageUploader
                    setImageFiles={setImageFiles}
                    setImagePreview={setImagePreview}
                    label="Upload Image"
                    className="w-fit mt-0"
                  />
                  <ImagePreviewer
                    className="flex flex-wrap gap-4"
                    setImageFiles={setImageFiles}
                    imagePreview={imagePreview}
                    setImagePreview={setImagePreview}
                  />
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="mt-5 w-full bg-black text-white hover:bg-black/80 hover:cursor-pointer"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Updating Product....." : "Update Product"}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default UpdateListingForm;
