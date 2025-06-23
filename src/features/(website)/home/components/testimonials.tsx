// components/Testimonials.tsx
"use client";

import Image, { StaticImageData } from "next/image";
import { Button } from "@/src/components/ui/button";
import Container from "@/src/components/layouts/container";

import testimonial1 from "@/public/images/testimonial-1.png";
import testimonial from "@/public/images/testimonial-image.png";
import mTestimonial from "@/public/images/testimonial-image-m.png";

import quoteBg from "@/public/icons/quote.svg";
import LondonLogo from "@/src/components/icons/London";
import storyImg from "@/public/images/story.png";
import bigReadiousBg from "@/public/icons/big-radius-bg.svg";
import smRadiousBg from "@/public/icons/sm-radius-bg.svg";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/src/components/ui/carousel";
import { cn } from "@/src/lib/utils";
import { Title } from "@/src/components/atoms/title";

type Testimonial = {
  quote: string;
  name: string;
  role?: string;
  institution?: string;
  avatar: StaticImageData;
  bgColor: string;
};

const cards: Testimonial[] = [
  {
    quote:
      "Before Dentispark, I had no clue where to begin with my dental school reapplication. My mentor helped me completely reshape my personal statement and prepare for interviews. I’m now starting dental school this fall!",
    name: "Neil Sims",
    role: "London, England",
    avatar: testimonial1,
    bgColor: "bg-warning-100",
  },
  {
    quote:
      "Leading our team in creating groundbreaking solutions has been a thrilling journey. It’s rewarding to see our innovations come to life.",
    name: "Emma Johnson",
    role: "CTO, Tech Innovators",
    avatar: testimonial1,
    bgColor: "bg-error-100",
  },
];

export function Testimonials() {
  return (
    <section className="bg-white py-16">
      <Container className="flex flex-col items-center space-y-10">
        {/* Label + Heading */}

        <Title>Testimonials</Title>
        <h2 className="text-center text-5xl leading-[160%] font-extrabold text-black sm:text-4xl">
          Real Stories. Real Impact.
        </h2>

        {/* Hero testimonial */}
        <div className="relative mt-4 w-full max-w-3xl overflow-hidden rounded-2xl md:h-full">
          <Image
            src={testimonial}
            alt="testimonial"
            width={1000}
            height={1000}
            priority
            placeholder="blur"
            quality={85}
            className="hidden w-full rounded-4xl object-cover sm:h-full md:block"
          />

          <Image
            src={mTestimonial}
            alt="testimonial"
            width={1000}
            height={1000}
            priority
            placeholder="blur"
            quality={85}
            className="w-full rounded-4xl object-cover sm:h-full md:hidden"
          />
          <div
            className={`absolute inset-x-0 bottom-8 flex rounded-2xl text-white md:top-32`}
          >
            <div className="px-8 md:px-16">
              <LondonLogo className="mb-8 h-10 w-10" />

              <p className="mb-12 w-[70%] text-2xl leading-[160%] font-medium sm:text-2xl md:w-[80%] md:text-lg md:leading-[120%]">
                Dentispark's free guides helped me ace my UCAT!
              </p>
              <p className="mt-2 text-lg font-medium text-green-300">
                Aisha Mubarak
              </p>
              <p className="text-lg text-white">University of London</p>
            </div>
          </div>
        </div>

        {/* Two small testimonial cards */}

        <div className="w-full max-w-3xl gap-10">
          <Carousel className="w-full overflow-visible">
            <CarouselContent>
              {cards.map((t) => (
                <CarouselItem
                  key={t.name}
                  className={cn(
                    "flex-shrink-0 basis-[95%] p-4 md:basis-[50%] lg:basis-[40%] xl:basis-[50%]",
                  )}
                >
                  <div
                    className={cn(
                      "border-greys-300 relative h-full rounded-3xl border p-6 pb-16",
                      t.bgColor,
                    )}
                  >
                    <Image
                      src={quoteBg}
                      alt={t.name}
                      width={1000}
                      height={1000}
                      className="absolute right-8 bottom-0 w-28 object-cover"
                    />
                    <p className="font-sora text-sm leading-[160%] text-gray-800">
                      {t.quote}
                    </p>
                    <div className="mt-6 flex items-center space-x-4">
                      <div className="size-10 overflow-hidden">
                        <Image
                          src={t.avatar}
                          alt={t.name}
                          width={1000}
                          height={1000}
                          className="w-full rounded-full object-cover"
                          priority
                          placeholder="blur"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {t.name}
                        </p>
                        {t.role && (
                          <p className="text-xs text-gray-600">{t.role}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        {/* Story highlight */}
        <div className="bg-black-700 group relative flex w-full max-w-3xl flex-col items-center gap-6 overflow-hidden rounded-4xl px-0 py-12 sm:flex-row md:p-12">
          <div className="z-10 flex-shrink-0">
            <div className="size-[300px] -rotate-4 overflow-hidden rounded-2xl border-3 border-white transition-transform duration-500 group-hover:rotate-0">
              <Image
                src={storyImg}
                alt="Aisha story"
                width={1000}
                height={1000}
                className="object-cover"
              />
            </div>
          </div>
          <div className="flex flex-1 flex-col items-start space-y-12 p-6 text-white sm:text-left">
            <h3 className="w-[70%] text-3xl font-bold md:w-full">
              How Aisha Got into King's College London.
            </h3>
            <Button size="lg" className="font-sora">
              Read story
            </Button>
          </div>
          <Image
            src={smRadiousBg}
            alt="quote"
            className="absolute top-0 left-1/2 z-0 w-[280px] transform object-cover opacity-5"
            width={1000}
            height={1000}
          />
          <Image
            src={bigReadiousBg}
            alt="quote"
            className="absolute bottom-0 left-1/2 z-0 w-[400px] -translate-x-1/2 transform object-cover opacity-5"
            width={1000}
            height={1000}
          />
        </div>
      </Container>
    </section>
  );
}
