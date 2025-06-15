"use client";

import * as React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/src/components/ui/carousel";

import whyUsImage1 from "@/public/images/why-us-1.png";
import whyUsImage2 from "@/public/images/why-us-2.png";
import whyUsImage3 from "@/public/images/why-us-3.png";
import whyUsImage4 from "@/public/images/why-us-4.png";

const features = [
  {
    title: "Free Guides",
    description:
      "Access expert-curated resources designed to support every step of your dental school journey—from application tips and personal statement templates to reapplication strategies and interview preparation.",
    imageSrc: whyUsImage1,
    imageAlt: "Person studying a guide",
  },
  {
    title: "AI-Driven Tools",
    description:
      "Leverage intelligent tools that streamline your application process, generate tailored personal statements, and practice interview questions with instant feedback.",
    imageSrc: whyUsImage2,
    imageAlt: "AI robot on a screen",
  },
  {
    title: "Direct University Partnerships",
    description:
      "Get exclusive access and direct links to partner universities, fast-track your applications, and enjoy priority support from admissions officers.",
    imageSrc: whyUsImage3,
    imageAlt: "Key unlocking a door",
  },
  {
    title: "Direct University Partnerships",
    description:
      "Get exclusive access and direct links to partner universities, fast-track your applications, and enjoy priority support from admissions officers.",
    imageSrc: whyUsImage4,
    imageAlt: "Key unlocking a door",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="mx-auto max-w-2xl bg-white px-4 sm:max-w-3xl sm:px-6 md:max-w-4xl lg:max-w-6xl lg:px-8">
      <h2 className="mb-8 text-center text-4xl font-bold text-black">
        Why choose Us?
      </h2>

      <div className="relative">
        <Carousel className="overflow-visible">
          <CarouselContent className="gap-0">
            {features.map((f, idx) => (
              <CarouselItem
                key={idx}
                className="flex-shrink-0 basis-[95%] p-4 md:basis-[50%] lg:basis-[40%] xl:basis-[40%]"
              >
                <div className="bg-white-100 border-primary-200 p flex h-full flex-col overflow-hidden rounded-t-3xl rounded-b-2xl border">
                  <div className="">
                    <Image
                      src={f.imageSrc}
                      alt={f.imageAlt}
                      width={1000}
                      height={1000}
                      className="w-full object-cover"
                      priority
                      placeholder="blur"
                    />
                  </div>
                  <div className="px-6 pt-8 pb-12">
                    <h3 className="text-primary mb-3 text-xl font-semibold">
                      {f.title}
                    </h3>
                    <p className="font-sora text-text-color flex-1 text-sm leading-[160%]">
                      {f.description}
                    </p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="mt-12 flex items-center gap-6">
            <CarouselPrevious className="hover:bg-primary-100" />
            <CarouselNext className="hover:bg-primary-100" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
