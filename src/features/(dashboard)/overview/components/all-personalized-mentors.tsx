"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
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
    id: "3",
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
    id: "4",
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
    id: "5",
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
    id: "6",
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
    id: "7",
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
    id: "8",
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
    id: "9",
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
];

export default function AllPersonalizedMentors() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-full overflow-hidden"
    >
      {/* Title Section */}
      <div className="mb-8">
        <h1 className="text-black-800 text-xl font-semibold md:text-2xl">
          Personalized Mentors
        </h1>
      </div>

      {/* Mentors Grid */}
      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 [@media(min-width:1800px)]:grid-cols-4 [@media(min-width:2300px)]:grid-cols-5 [@media(min-width:2800px)]:grid-cols-6">
        {mockMentors.map((mentor, index) => (
          <motion.div
            key={mentor.id}
            className="border-greys-200 flex h-full w-full cursor-pointer flex-col rounded-xl border bg-white p-6 transition-all hover:scale-[1.02] hover:shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <div className="flex h-full flex-col items-center text-center">
              <div className="relative mb-4">
                <div className="bg-greys-100 h-24 w-24 overflow-hidden rounded-full">
                  <Image
                    src={mentor.avatar}
                    alt={mentor.name}
                    className="h-full w-full object-cover"
                    width={96}
                    height={96}
                    priority={index < 6}
                    quality={90}
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
                  <span className="text-sm font-medium">{mentor.rating}</span>
                </div>
                <span className="font-sora text-xs text-[#12AC75] underline">
                  {mentor.reviewCount} reviews
                </span>
              </div>

              <p className="text-text-color font-sora mb-6 line-clamp-2 flex-1 text-xs leading-relaxed font-normal">
                {mentor.description}
              </p>

              <Button
                variant={"outline"}
                className="font-sora mt-auto w-full rounded-lg border text-sm font-medium transition-colors"
              >
                View Profile
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
