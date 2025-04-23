"use client";
import React from "react";
import { Carousel } from "antd";
import Image from "next/image";

const Slider: React.FC = () => {
  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };

  return (
    <Carousel afterChange={onChange}>
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="mt-[65px] h-[500px] border w-full  relative">
          <Image
            src="https://punarbay.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fb2.ad8fe206.png&w=2048&q=75"
            alt="slider"
            fill
            className="object-cover"
          />
        </div>
      ))}
    </Carousel>
  );
};

export default Slider;
