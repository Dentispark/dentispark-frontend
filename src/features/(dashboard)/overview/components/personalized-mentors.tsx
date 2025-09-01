"use client";

import { motion } from "framer-motion";
import { Star, Users } from "lucide-react";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/src/components/ui/carousel";
import Image from "next/image";
import { Button } from "@/src/components/ui/button";

interface Mentor {
  id: string;
  name: string;
  title: string;
  rating: number;
  reviewCount: number;
  description: string;
  avatar: string;
  country: string;
  flag: string;
}

const mockMentors: Mentor[] = [
  {
    id: "1",
    name: "Andy J. Pierce",
    title: "Orthodontist",
    rating: 4.5,
    reviewCount: 26,
    description:
      "I help aspiring dentists navigate the path to dental school and build successful careers in orthodontics.",
    avatar: "/images/mentor-2.png",
    country: "UK",
    flag: "🇬🇧",
  },
  {
    id: "2",
    name: "Sarah M. Johnson",
    title: "Dental Surgeon",
    rating: 4.8,
    reviewCount: 34,
    description:
      "Specializing in oral surgery with 10+ years of experience helping students achieve their dental career goals.",
    avatar: "/images/mentor-2.png",
    country: "US",
    flag: "🇺🇸",
  },
  {
    id: "3",
    name: "Dr. Michael Chen",
    title: "Periodontist",
    rating: 4.7,
    reviewCount: 42,
    description:
      "Expert in periodontal therapy and implant dentistry, guiding students through advanced dental specializations.",
    avatar: "/images/mentor-2.png",
    country: "Canada",
    flag: "🇨🇦",
  },
  {
    id: "4",
    name: "Dr. Emma Thompson",
    title: "Pediatric Dentist",
    rating: 4.9,
    reviewCount: 38,
    description:
      "Passionate about children's oral health and mentoring future pediatric dentists with compassionate care approaches.",
    avatar: "/images/mentor-2.png",
    country: "Australia",
    flag: "🇦🇺",
  },
  {
    id: "5",
    name: "Dr. James Rodriguez",
    title: "Oral Maxillofacial Surgeon",
    rating: 4.6,
    reviewCount: 29,
    description:
      "Leading oral surgeon specializing in complex reconstructive procedures and mentoring surgical residents.",
    avatar: "/images/mentor-2.png",
    country: "Spain",
    flag: "🇪🇸",
  },
  {
    id: "6",
    name: "Dr. Lisa Park",
    title: "Endodontist",
    rating: 4.8,
    reviewCount: 31,
    description:
      "Root canal specialist with expertise in pain management and advanced endodontic techniques for complex cases.",
    avatar: "/images/mentor-2.png",
    country: "South Korea",
    flag: "🇰🇷",
  },
];

interface PersonalizedMentorsProps {
  showViewAll?: boolean;
}

export default function PersonalizedMentors({
  showViewAll = true,
}: PersonalizedMentorsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-black-800 font-semibold md:text-xl">
          Personalized Mentors
        </h2>
        {showViewAll && (
          <Link
            href="/overview/personalized-mentors"
            className="text-primary-600 hover:text-primary-700 hidden items-center gap-2 text-xs font-medium md:flex"
          >
            <Users className="h-4 w-4" />
            See all Mentors
          </Link>
        )}

        {showViewAll && (
          <Link
            href="/overview/personalized-mentors"
            className="text-primary-600 hover:text-primary-700 flex items-center gap-2 text-xs font-medium md:hidden"
          >
            <Users className="h-4 w-4" />
            See all
          </Link>
        )}
      </div>

      {/* Mobile & Desktop: Carousel */}
      <div className="block">
        <Carousel
          opts={{
            align: "start",
            loop: false,
            dragFree: false,
            containScroll: "trimSnaps",
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {mockMentors.map((mentor, index) => (
              <CarouselItem
                key={mentor.id}
                className="basis-[85%] pl-4 sm:basis-[70%] md:basis-1/2 lg:basis-[40%] [@media(min-width:1800px)]:basis-1/4 [@media(min-width:2300px)]:basis-1/5 [@media(min-width:2800px)]:basis-1/6"
              >
                <motion.div
                  className="border-greys-200 flex h-full flex-col rounded-xl border bg-white p-6 transition-shadow hover:shadow-md"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="flex h-full flex-col items-center text-center">
                    <div className="relative mb-4">
                      <div className="bg-greys-100 h-20 w-20 overflow-hidden rounded-full md:h-24 md:w-24">
                        <Image
                          src={mentor.avatar}
                          alt={mentor.name}
                          className="h-full w-full object-cover"
                          width={120}
                          height={120}
                        />
                      </div>
                    </div>

                    <h3 className="text-black-800 font-sora mb-1 flex items-center gap-2 text-sm font-normal">
                      {mentor.name}
                      <span className="text-lg">{mentor.flag}</span>
                    </h3>

                    <p className="text-text-color font-sora mb-3 text-xs font-medium">
                      {mentor.title}
                    </p>

                    <div className="mb-4 flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">
                          {mentor.rating}
                        </span>
                      </div>
                      <span className="font-sora text-xs text-[#12AC75] underline">
                        {mentor.reviewCount} reviews
                      </span>
                    </div>

                    <p className="text-text-color font-sora mb-6 line-clamp-1 text-xs font-normal">
                      {mentor.description}
                    </p>

                    <Button
                      variant={"outline"}
                      className="font-sora w-full rounded-lg border text-sm font-medium transition-colors"
                    >
                      View Profile
                    </Button>
                  </div>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:block">
            <CarouselPrevious className="hover:bg-greys-50 border-greys-300 absolute top-1/2 left-0 size-10 -translate-y-1/2 border bg-white shadow-lg" />
            <CarouselNext className="hover:bg-greys-50 border-greys-300 absolute top-1/2 -right-0 size-10 -translate-y-1/2 border bg-white shadow-lg" />
          </div>
        </Carousel>
      </div>
    </motion.div>
  );
}
