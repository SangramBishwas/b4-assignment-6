/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import AMImageUploader from "@/components/ui/core/AMImageUploader";
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
import { useUser } from "@/context/UserContext";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { getMyProfile, updateProfile } from "@/services/users";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Calendar } from "@/components/ui/calendar";
import ImagePreviewer from "@/components/ui/core/AMImageUploader/AMImagePreviwer";
import { IUser } from "@/types";
import AMLoading from "@/components/ui/AMLoading";

export const bdDivisions = [
  "Barisal",
  "Chattogram",
  "Dhaka",
  "Khulna",
  "Mymensingh",
  "Rajshahi",
  "Rangpur",
  "Sylhet",
  "N/A",
];

const UpdateAddressForm = () => {
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreview, setImagePreview] = useState<string[] | []>([]);
  const [isUser, setIsUser] = useState<IUser | null>(null);
  // console.log("🚀 ~ UpdateAddressForm ~ isUser:", isUser);
  const { user } = useUser();

  const form = useForm({
    defaultValues: {
      name: "",
      profileImage: "",
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      phoneNo: "",
      gender: "",
      dateOfBirth: "",
    },
  });

  const { setValue } = form;

  useEffect(() => {
    if (!user?._id) return;

    const fetchData = async () => {
      try {
        const userData = await getMyProfile(user?._id);
        setIsUser(userData.data);

        // Dynamically set form values after data is fetched
        setValue("name", userData.data.name || "N/A");
        setValue("profileImage", userData.data.profileImage || "N/A");
        setValue("street", userData.data.street || "N/A");
        setValue("city", userData.data.city || "N/A");
        setValue("state", userData.data.state || "N/A");
        setValue("postalCode", userData.data.postalCode || "N/A");
        setValue("country", userData.data.country || "N/A");
        setValue("phoneNo", userData.data.phoneNo || "N/A");
        setValue("gender", userData.data.gender || "N/A");
        setValue("dateOfBirth", "");
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchData();
  }, [user?._id, setValue]);

  const router = useRouter();

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!user?._id) {
      toast.error("User ID is missing!");
      return;
    }

    const modifiedData = {
      ...data,
      dateOfBirth: data.dateOfBirth === "" ? "N/A" : data.dateOfBirth,
    };
    console.log(
      "🚀 ~ constonSubmit:SubmitHandler<FieldValues>= ~ modifiedData:",
      modifiedData
    );

    const formData = new FormData();
    formData.append("data", JSON.stringify(modifiedData));

    if (imageFiles.length > 0) {
      formData.append("profileImage", imageFiles[0] as File);
    }

    console.log(
      "🚀 ~ constonSubmit:SubmitHandler<FieldValues>= ~ formData:",
      formData
    );

    try {
      const res = await updateProfile(user?._id, formData);
      if (res.success) {
        toast.success(res.message);
        router.push("/dashboard/my-account");
      } else {
        toast.error(res.message);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  if (!isUser) {
    return <AMLoading />;
  }

  return (
    <>
      <div className="font-madimi">
        <div>
          <h2 className="text-3xl font-semibold">Update Your Profile</h2>
        </div>
        <div className="w-full border-b border-neutral-300 py-4" />
        <div className="mt-6">
          <h3 className="text-2xl font-medium">
            Change your address details if you need!
          </h3>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="mt-5 border-2 border-gray-200 font-madimi bg-white rounded-xl flex-grow p-5 sm:p-10">
            <div className="grid grid-cols-1 gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
                <div className="flex flex-col gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Profile Name</FormLabel>
                        <FormControl>
                          <Input {...field} value={field.value || ""} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phoneNo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl className="w-full">
                          <Input {...field} value={field.value || ""} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormLabel className="mb-2">Profile Image</FormLabel>
                  {imagePreview.length > 0 ? (
                    <ImagePreviewer
                      setImageFiles={setImageFiles}
                      imagePreview={imagePreview}
                      setImagePreview={setImagePreview}
                    />
                  ) : (
                    <div>
                      <AMImageUploader
                        setImageFiles={setImageFiles}
                        setImagePreview={setImagePreview}
                        label="Upload Image"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4">
                <FormField
                  control={form.control}
                  name="street"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Street</FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value || ""} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your State</FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value || ""} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="postalCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Postal Code</FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value || ""} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Country</FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value || ""} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl className="w-full">
                          <SelectTrigger>
                            <SelectValue placeholder="Select Your Gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-gray-100 font-madimi">
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                          <SelectItem value="N/A">N/A</SelectItem>
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your City</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl className="w-full">
                          <SelectTrigger>
                            <SelectValue placeholder="Select Your City" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="font-madimi bg-gray-100">
                          {bdDivisions?.map((place, index) => (
                            <SelectItem key={index} value={place}>
                              {place}
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
                  name="dateOfBirth"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date of birth</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl className="w-full">
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-auto p-0 bg-gray-100"
                          align="start"
                        >
                          <Calendar
                            className="border border-black rounded-xl font-madimi"
                            mode="single"
                            selected={
                              field.value ? new Date(field.value) : undefined
                            }
                            onSelect={(date) =>
                              field.onChange(date ? date.toISOString() : "")
                            }
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="mt-5 w-full active:scale-95 bg-black text-white hover:bg-black/80 hover:cursor-pointer"
            >
              {isSubmitting ? "Updating...." : "Update Profile"}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default UpdateAddressForm;
