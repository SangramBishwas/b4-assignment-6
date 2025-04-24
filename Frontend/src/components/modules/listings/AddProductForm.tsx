"use client";

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
// import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { TCategory } from "@/types/listings";
// import { getAllCategories } from "@/services/category";
// import { addListig } from "@/services/listings";
// import { toast } from "sonner";
// import { useRouter } from "next/navigation";
// import { useUser } from "@/contexts/UserContext";
// import { IUser } from "@/types/user";
import AMImageUploader from "@/components/ui/core/AMImageUploader";
import ImagePreviewer from "@/components/ui/core/AMImageUploader/AMImagePreviwer";
import { useState } from "react";
// import { getMyProfile } from "@/services/users";

export type TPostAddFormProps = {
  category: TCategory[];
};

const AddProductForm = () => {
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreview, setImagePreview] = useState<string[] | []>([]);
//   const [categories, setCategories] = useState<TCategory[] | []>([]);
//   const [isUser, setIsUser] = useState<IUser | null>(null);
//   const { user } = useUser();

  // console.log("isUser__", isUser?.address?.city);

//   const router = useRouter();

  const form = useForm({
    defaultValues: {
      title: "Wooden Dining Table",
      description: "Solid wood dining table with six chairs.",
      price: "15000",
      categories: "Furniture & Home Decor",
      condition: "Used",
      location: "Dhaka",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

//   useEffect(() => {
//     const fetchData = async () => {
//     //   const [categoriesData] = await Promise.all([getAllCategories()]);

//       setCategories(categoriesData?.data);
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     if (!user?._id) return;

//     const fetchData = async () => {
//       try {
//         const userData = await getMyProfile(user?._id);
//         setIsUser(userData.data);
//       } catch (error) {
//         console.error("Error fetching profile:", error);
//       }
//     };

//     fetchData();
//   }, [user?._id]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const modifiedData = {
      ...data,
      price: parseFloat(data.price),
    //   userID: user?._id,
    //   location: isUser?.address?.city || "Dhaka",
    };

    // console.log("modifiedData__", modifiedData);

    const formData = new FormData();
    formData.append("data", JSON.stringify(modifiedData));

    for (const file of imageFiles) {
      formData.append("images", file);
    }
    // try {
    //   const res = await addListig(formData);
    //   // console.log("res", res);

    //   if (res.success) {
    //     toast.success(res.message);
    //     // router.push("/user/dashboard");
    //   } else {
    //     toast.error(res.message);
    //   }
    // } catch (err) {
    //   console.error(err);
    // }
  };

  return (
    <>
      <div className=" mt-6">
        <h3 className=" text-2xl font-medium">Tell Us About Your Products</h3>
      </div>

      <Form {...form}>
        <form className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="mt-5 border border-gray-300 bg-white mb-10 rounded-xl p-5">
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

              <div className="grid  grid-cols-1 sm:grid-cols-3 gap-4 ">
                  <FormField
                    control={form.control}
                    name="categories"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl className="w-full">
                            <SelectTrigger>
                              <SelectValue placeholder="Select Product Category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className=" bg-slate-100">
                            {Array(6).map((category) => (
                              <SelectItem key={category?._id} value={category?._id}>
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
                        <FormLabel>Condition</FormLabel>
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
                            <SelectItem value="refurbished">Refurbished</SelectItem>
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
                        <FormControl className="w-full">
                          <Input {...field} value={field.value || ""} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
              </div>

              <div className="my-5">
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
              {isSubmitting ? "Adding Product....." : "Add Product"}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default AddProductForm;
