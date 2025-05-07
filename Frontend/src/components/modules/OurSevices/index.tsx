import React from "react";
import discount from "../../../assets/discount-offer.png";
import customerSupport from "../../../assets/customer-support.png";
import financial from "../../../assets/financial-tools.jpg";
import property from "../../../assets/property-manage.jpg";
import Image from "next/image";

const servicesData = [
  {
    title: "Special Discount",
    description:
      "Our land register discounts provide a 30% reduction in fees for digital land registration, encouraging cost-effective and efficient property transactions while promoting the adoption of digital platforms.",
    image: discount,
    bgColor: "bg-gray-200 dark:bg-[#00d16926]",
  },
  {
    title: "Financial Tools",
    description:
      "Our financial tools provide users with resources such as mortgage calculators and investment trackers, enabling them to manage finances, plan for the future, and make informed decisions.",
    image: financial,
    bgColor: "bg-[#00d16926]",
  },
  {
    title: "Product Management",
    description:
      "Our product management simplifies tasks like rent collection, lease management, and maintenance requests, empowering landlords with efficient tools to oversee properties and communicate with tenants effectively.",
    image: property,
    bgColor: "bg-[#00d16926]",
  },
  {
    title: "Customer Support",
    description:
      "Our customer support delivers assistance via digital channels like live chat and email, offering prompt responses and solutions to inquiries and issues, enhancing customer satisfaction and experience.",
    image: customerSupport,
    bgColor: "bg-gray-200 dark:bg-[#00d16926]",
  },
];

const OurServices = () => {
  return (
    <div className="my-4 md:my-10 font-madimi mx-auto">
      <h2 className="text-lg md:text-xl font-semibold">Our Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mt-5">
        {servicesData.map((service, index) => (
          <div
            key={index}
            className={`${service.bgColor} flex rounded-xl items-center flex-col lg:flex-row hover:bg-gray-100 dark:hover:bg-black border border-neutral-300 transition-all duration-200 ease-out gap-7 p-7 w-full`}
          >
            <Image
              className="rounded-full w-40 h-40"
              src={service.image}
              alt={service.title}
            />
            <div>
              <h3 className="font-bold text-2xl mb-5">{service.title}</h3>
              <p>{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurServices;
