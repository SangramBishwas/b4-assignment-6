/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getAllCategories } from "@/services/category";
import { Slider } from "@/components/ui/slider";
import styles from "./filterSidebar.module.css";
import { Filter } from "lucide-react";
import { bdDivisions } from ".";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SmallDeviceSidebar() {
  const [price, setPrice] = useState([0]);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSearchQuery = (query: string, value: string | number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(query, value.toString());
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [{ data: categoriesData }] = await Promise.all([
          getAllCategories(),
        ]);
        setCategories(categoriesData);
      } catch (error: any) {
        console.error(error);
        toast.error("Failed to fetch filters");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full">
      {/* Toggle Button for sm and md */}
      <div className="block lg:hidden">
        <Button
          onClick={() => setSidebarVisible(!sidebarVisible)}
          size="sm"
          className="text-white bg-black hover:bg-black mb-6"
        >
          <Filter className="mr-2" />
          {sidebarVisible ? "Hide" : "Filters"}
        </Button>
      </div>

      {/* Sidebar */}
      <div
        className={`font-madimi transition-all duration-300 ease-in-out z-50 lg:z-auto
        ${sidebarVisible ? "translate-x-0" : "-translate-x-full"}
        fixed top-0 left-0 w-64 h-full bg-white p-6 overflow-y-auto
        lg:relative lg:translate-x-0 lg:w-80 lg:h-auto lg:bg-transparent lg:p-0 lg:overflow-visible`}
      >
        {/* Close button for sm+md */}
        <div className="block lg:hidden mb-4">
          <Button
            onClick={() => setSidebarVisible(false)}
            size="sm"
            variant="outline"
            className="absolute top-4 right-4 text-black hover:text-white hover:bg-red-600"
          >
            X
          </Button>
        </div>

        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-black">Filter</h2>
          {searchParams.toString().length > 0 && (
            <Button
              onClick={() => router.push(`${pathname}`, { scroll: false })}
              size="sm"
              className="text-white bg-black hover:bg-black ml-5"
            >
              Clear Filters
            </Button>
          )}
        </div>

        {/* Filter by Price */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Price</h2>
          <div className="flex items-center justify-between text-sm mb-2">
            <span>TK 0</span>
            <span>TK 2000</span>
          </div>
          <Slider
            max={2000}
            step={1}
            onValueChange={(value) => {
              setPrice(value);
              handleSearchQuery("price", value[0]);
            }}
            className={`w-full bg-black h-2 rounded-full ${styles.customSlider}`}
          />
          <p className="text-sm mt-2">Selected Price: Tk {price[0]}</p>
        </div>

        {/* Product conditions */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Condition</h2>
          <RadioGroup defaultValue="new" className="space-y-2">
            {["new", "used", "refurbished"].map((cond) => (
              <div key={cond} className="flex items-center space-x-2">
                <RadioGroupItem
                  onClick={() => handleSearchQuery("condition", cond)}
                  value={cond}
                  id={cond}
                />
                <Label
                  htmlFor={cond}
                  className="text-gray-500 font-light capitalize"
                >
                  {cond}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Product Categories */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Product Category</h2>
          {!isLoading && (
            <RadioGroup className="space-y-2">
              {categories?.map((category: { _id: string; name: string }) => (
                <div key={category._id} className="flex items-center space-x-2">
                  <RadioGroupItem
                    onClick={() =>
                      handleSearchQuery("categories", category._id)
                    }
                    value={category._id}
                    id={category._id}
                  />
                  <Label
                    htmlFor={category._id}
                    className="text-gray-500 font-light"
                  >
                    {category.name}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          )}
        </div>

        {/* Product Locations */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Product Location</h2>
          <Select
            onValueChange={(value) => handleSearchQuery("location", value)}
          >
            <SelectTrigger className="w-full border-neutral-300">
              <SelectValue placeholder="Select Location" />
            </SelectTrigger>
            <SelectContent className="bg-gray-100 border-neutral-300">
              {bdDivisions?.map((place, index) => (
                <SelectItem key={index} value={place}>
                  {place}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
