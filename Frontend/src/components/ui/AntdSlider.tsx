"use client";
import React from "react";
import { Carousel } from "antd";
import { images } from "@/utils/sliderUtils";

const Slider: React.FC = () => {
  return (
    <Carousel autoplay={{ dotDuration: true }} autoplaySpeed={5000}>
      {images.map((image, i) => (
        <div key={i} className="mt-[65px] w-full relative">
          <div
            className={`w-full h-[582px] brightness-70  `}
            style={{
              color: "#fff",
              backgroundImage: `url(${image.img})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </div>
      ))}
    </Carousel>
  );
};

export default Slider;
