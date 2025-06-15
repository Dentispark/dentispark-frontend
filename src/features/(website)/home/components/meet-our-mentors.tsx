"use client";

import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/src/components/ui/carousel";

import mentor1 from "@/public/images/mentor-1.png";
import mentor2 from "@/public/images/mentor-2.png";

import UKFlag from "@/src/components/icons/UkFlag";
import Stanford from "@/src/components/icons/Standford";

type Mentor = {
  name: string;
  title: string;
  flag: any;
  avatar: StaticImageData;
  institutions: { name: string; role: string; logo: string }[];
  highlight?: string;
};

const mentors: Mentor[] = [
  {
    name: "Dr. Sarah B.",
    title: "Orthodontist",
    flag: <UKFlag className="size-5" />,
    avatar: mentor1,
    institutions: [
      {
        name: "Stanford University",
        role: "Associate Professor",
        logo: "/images/logos/stanford.png",
      },
      {
        name: "Stanford University",
        role: "Associate Professor",
        logo: "/images/logos/stanford.png",
      },
    ],
    highlight: "Helped 50+ students get accepted",
  },
  {
    name: "Murray H.",
    title: "Dental School and UCAT Coach",
    flag: <UKFlag className="size-5" />,
    avatar: mentor2,
    institutions: [
      {
        name: "Stanford University",
        role: "Associate Professor",
        logo: "/images/logos/stanford.png",
      },
      {
        name: "Stanford University",
        role: "Associate Professor",
        logo: "/images/logos/stanford.png",
      },
    ],
  },

  {
    name: "Murray Z.",
    title: "Dental School and UCAT Coach",
    flag: <UKFlag className="size-5" />,
    avatar: mentor2,
    institutions: [
      {
        name: "Stanford University",
        role: "Associate Professor",
        logo: "/images/logos/stanford.png",
      },
      {
        name: "Stanford University",
        role: "Associate Professor",
        logo: "/images/logos/stanford.png",
      },
    ],
  },

  {
    name: "Murray W.",
    title: "Dental School and UCAT Coach",
    flag: <UKFlag className="size-5" />,
    avatar: mentor2,
    institutions: [
      {
        name: "Stanford University",
        role: "Associate Professor",
        logo: "/images/logos/stanford.png",
      },
      {
        name: "Stanford University",
        role: "Associate Professor",
        logo: "/images/logos/stanford.png",
      },
    ],
  },
];

export function MeetOurMentors() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-2xl px-4 sm:max-w-3xl sm:px-6 md:max-w-4xl lg:max-w-6xl lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
            Meet our Mentors
          </h2>
          <Link
            href=""
            className="font-sora text-primary-800 flex items-center gap-1 text-sm font-medium hover:underline"
          >
            See all <ArrowRight size={18} />
          </Link>
        </div>

        {/* Carousel */}
        <div className="relative">
          <Carousel className="overflow-visible">
            <CarouselContent className="">
              {mentors.map((m) => (
                <CarouselItem
                  key={m.name}
                  className="flex-shrink-0 basis-[95%] md:basis-[50%] lg:basis-[35%] xl:basis-[30%] 2xl:basis-[30%]"
                >
                  <div className="bg-white-100 flex h-full flex-col rounded-2xl border border-[#DFDFDF] px-6 py-10">
                    <div className="flex items-center space-x-4">
                      <div className="size-16 overflow-hidden rounded-full">
                        <Image
                          src={m.avatar}
                          alt={m.name}
                          width={100}
                          height={100}
                          className="rounded-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-1">
                          <span className="text-base font-medium text-gray-900">
                            {m.name}
                          </span>
                          <span className="text-lg">{m.flag}</span>
                        </div>
                        <p className="text-black-400 font-sora w-[60%] text-xs">
                          {m.title}
                        </p>
                      </div>
                    </div>

                    <div className="mx-auto my-6 block h-px w-full bg-gray-200" />

                    <div className="flex-1 space-y-3">
                      {m.institutions.map((inst, i) => (
                        <div
                          key={i}
                          className="flex items-center space-x-3 rounded-lg border border-[#F5F5F5] p-2 transition hover:bg-gray-50"
                        >
                          <div className="size-6 flex-shrink-0">
                            <Stanford className="h-full w-full" />
                          </div>
                          <div className="flex-1 space-y-0.5 text-left">
                            <p className="text-sm font-medium">{inst.name}</p>
                            <p className="text-text-color font-sora text-xs">
                              {inst.role}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    {m.highlight && (
                      <div className="mt-6">
                        <span className="bg-primary-100 text-primary font-sora inline-block rounded-full px-3 py-1 text-xs">
                          {m.highlight}
                        </span>
                      </div>
                    )}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <div className="mt-16 flex items-center gap-8">
              <CarouselPrevious />
              <CarouselNext />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
