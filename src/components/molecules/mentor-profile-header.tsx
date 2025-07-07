"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface MentorProfileHeaderProps {
  className?: string;
}

import UkFlag from "@/src/components/icons/UkFlag";
import NewCastleUni from "@/src/components/icons/NewCastleUni";
import Link from "@/src/components/icons/Link";

export function MentorProfileHeader({ className }: MentorProfileHeaderProps) {
  // Hardcoded mentor data
  const mentor = {
    id: "1",
    name: "Andy J. Pierce",
    profession: "Orthodontist",
    rating: 4.5,
    reviewCount: 26,
    profileImage: "/images/profile.png",
    countryFlag: "🇬🇧",
    education: {
      institution: "American Public University System",
      program: "American Public University System",
    },
    workExperience: {
      company: "Stanford University",
      role: "Orthodontist",
    },
  };
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={cn(
          "size-4",
          index < Math.floor(rating)
            ? "fill-yellow-400 text-yellow-400"
            : "fill-gray-200 text-gray-200",
        )}
      />
    ));
  };

  return (
    <div className={cn("bg-white", className)}>
      <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
        {/* Profile Photo */}
        <div className="flex-shrink-0">
          <div className="relative size-24 overflow-hidden rounded-full">
            <Image
              src={mentor.profileImage}
              alt={mentor.name}
              fill
              className="object-cover"
              quality={85}
            />
          </div>
        </div>
        {/* Profile Info */}
        <div className="flex-1 space-y-2">
          {/* Name and Flag */}
          <div className="flex items-center justify-center gap-3 md:justify-start">
            <h1 className="text-black-600 text-xl font-medium md:text-left">
              {mentor.name}
            </h1>
            <UkFlag className="size-5" />
            <button className="ml-6 flex size-8 items-center justify-center self-start rounded-md border md:hidden">
              <Link />
            </button>
          </div>
          {/* Profession */}
          <div className="flex items-center justify-center gap-6 md:justify-start">
            <p className="text-text-color font-sora text-sm font-light">
              {mentor.profession}
            </p>

            <div className="font-sora flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1">{renderStars(4.5)}</div>
              <span className="text-black-600 mr-3 text-xs">
                {mentor.rating}
              </span>
              <span className="text-primary-300 text-xs underline">
                {mentor.reviewCount} reviews
              </span>
            </div>
          </div>
        </div>

        <button className="hidden size-8 items-center justify-center self-start rounded-md border md:flex">
          <Link />
        </button>
      </div>

      <div className="mt-4 flex flex-col items-center gap-4 md:flex-row">
        <span className="bg-whites-500 font-sora flex items-center justify-center gap-3 rounded-full px-5 py-3 text-[10px]">
          <NewCastleUni className="size-4" />
          <p>Studied in American Public University System</p>
        </span>

        <span className="bg-whites-500 font-sora flex items-center justify-center gap-3 rounded-full px-5 py-3 text-[10px]">
          <NewCastleUni className="size-4" />
          <p>Worked at Stanford University</p>
        </span>
      </div>
    </div>
  );
}
