"use client";

import Autoplay from "embla-carousel-autoplay";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { testimonials } from "@/utils/testimonial";

const TestimonialSection = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
    <>
      <div className="font-madimi grid grid-cols-6 items-center gap-4">
        <div className=" col-span-full md:col-span-2">
          <div className=" space-y-5">
            <Button>What our users say</Button>
            <h2 className=" text-4xl lg:text-6xl font-bold">
              Why they love us
            </h2>
            <p className=" font-medium">
              Helping millions of users to buy and sell easily!
            </p>
          </div>
        </div>
        <div className=" col-span-full md:col-span-4">
          <Carousel
            plugins={[plugin.current]}
            className="w-full mx-auto"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent>
              {testimonials?.map((testimonial, index) => (
                <CarouselItem
                  key={index}
                  className=" md:basis-1/1 lg:basis-1/3"
                >
                  <div className="p-1">
                    <Card className="w-full max-w-sm p-4 hover:shadow-sm border-none bg-white">
                      <CardContent className="flex flex-col items-start text-start gap-2 mt-5 mb-3">
                        <span className="lg:text-3xl text-xl font-semibold">
                          {testimonial.name}
                        </span>
                        <p className="text-sm text-gray-500">
                          {testimonial.location}
                        </p>
                        <div className="flex gap-1 text-yellow-500">
                          {Array.from({ length: testimonial.rating }).map(
                            (_, index) => (
                              <Star
                                key={index}
                                size={20}
                                fill="currentColor"
                                stroke="none"
                              />
                            )
                          )}
                        </div>
                        <p className="text-gray-700">
                          &quot;{testimonial.comment}&quot;
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </>
  );
};

export default TestimonialSection;
