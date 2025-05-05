import React from "react";
import discount from "../../../assets/discount-offer.png"
import customerSupport from "../../../assets/customer-support.png"
import financial from "../../../assets/financial-tools.jpg"
import property from "../../../assets/property-manage.jpg"
import Image from "next/image";
const OurServices = () => {
  return (
    <div className="my-4 md:my-10 font-madimi mx-auto">
      <h2 className="text-lg md:text-xl font-semibold">Our Services</h2>
      <div className="grid-cols-1 md:grid-cols-2 items-center space-y-7 gap-7">
        <div className="flex flex-col lg:flex-row gap-7 mt-10">
          <div className="flex items-center flex-col lg:flex-row bg-gray-200 dark:bg-[#00d16926] hover:bg-gray-100 dark:hover:bg-black shadow-md hover:shadow-lg transition-all duration-200 ease-out gap-7 p-7 w-full lg:w-1/2">
            <Image className="rounded-full w-40 h-40" src={discount} alt="" />
            <div>
              <h3 className="font-bold text-2xl mb-5">Special Discount</h3>
              <p>
                Our land register discounts provide a 30% reduction in fees for
                digital land registration, encouraging cost-effective and
                efficient property transactions while promoting the adoption of
                digital platforms.
              </p>
            </div>
          </div>
          <div className="bg-[#00d16926] flex items-center flex-col lg:flex-row hover:bg-gray-100 dark:hover:bg-black shadow-md hover:shadow-lg transition-all duration-200 ease-out gap-7 p-7 w-full lg:w-1/2">
            <Image className="rounded-full w-40 h-40" src={financial} alt="" />
            <div>
              <h3 className="font-bold text-2xl mb-5">Financial Tools</h3>
              <p>
                Our financial tools provide users with resources such as
                mortgage calculators and investment trackers, enabling them to
                manage finances, plan for the future, and make informed
                decisions.
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-7">
          <div className="bg-[#00d16926] flex items-center flex-col lg:flex-row hover:bg-gray-100 dark:hover:bg-black shadow-md hover:shadow-lg transition-all duration-200 ease-out gap-7 p-7 w-full lg:w-1/2">
            <Image className="rounded-full w-40 h-40" src={property} alt="" />
            <div>
              <h3 className="font-bold text-2xl mb-5">Product Management</h3>
              <p>
                Our product management simplifies tasks like rent collection,
                lease management, and maintenance requests, empowering landlords
                with efficient tools to oversee properties and communicate with
                tenants effectively.
              </p>
            </div>
          </div>
          <div className="bg-gray-200 dark:bg-[#00d16926] flex items-center flex-col lg:flex-row hover:bg-gray-100 dark:hover:bg-black shadow-md hover:shadow-lg transition-all duration-200 ease-out gap-7 p-7 w-full lg:w-1/2">
            <Image
              className="rounded-full w-40 h-40"
              src={customerSupport}
              alt=""
            />
            <div>
              <h3 className="font-bold text-2xl mb-5">Customer Support</h3>
              <p>
                Our customer support delivers assistance via digital channels
                like live chat and email, offering prompt responses and
                solutions to inquiries and issues, enhancing customer
                satisfaction and experience
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurServices;
