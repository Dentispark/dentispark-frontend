"use client";

import { cn } from "@/src/lib/utils";
import { WebinarCard } from "./webinar-card";
import { Users } from "lucide-react";

interface Webinar {
  id: string;
  title: string;
  instructor: {
    name: string;
    avatar: string;
  };
  rating: number;
  date: string;
  time: string;
  attendees: number;
  image: string;
  isPremium: boolean;
}

interface WebinarsSectionProps {
  className?: string;
}

const SAMPLE_WEBINARS: Webinar[] = [
  {
    id: "1",
    title: "Acing your UCAT on the first attempt",
    instructor: {
      name: "Andy Pierce",
      avatar: "/images/profile.png",
    },
    rating: 4.5,
    date: "June 27",
    time: "12:00 GMT+1",
    attendees: 12,
    image: "/images/resource-1.png",
    isPremium: true,
  },
  {
    id: "2",
    title: "Acing your UCAT on the first attempt",
    instructor: {
      name: "Andy Pierce",
      avatar: "/images/profile.png",
    },
    rating: 4.5,
    date: "June 27",
    time: "12:00 GMT+1",
    attendees: 12,
    image: "/images/resource-2.png",
    isPremium: true,
  },
  {
    id: "3",
    title: "Acing your UCAT on the first attempt",
    instructor: {
      name: "Andy Pierce",
      avatar: "/images/profile.png",
    },
    rating: 4.5,
    date: "June 27",
    time: "12:00 GMT+1",
    attendees: 12,
    image: "/images/resource-3.png",
    isPremium: true,
  },
];

export function WebinarsSection({ className }: WebinarsSectionProps) {
  const handleRegister = (webinarId: string) => {
    console.log("Register for webinar:", webinarId);
    // TODO: Implement registration logic
  };

  const handleSeeAllWebinars = () => {
    console.log("See all webinars clicked");
    // TODO: Navigate to webinars page
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-sora text-black-800 text-xl font-semibold">
          Webinars
        </h2>

        {/* See All Link */}
        <button
          onClick={handleSeeAllWebinars}
          className="font-sora text-black-600 hover:text-black-800 flex items-center gap-2 text-sm font-medium"
        >
          <Users className="h-4 w-4" />
          See all Webinars
        </button>
      </div>

      {/* Webinars Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 [@media(min-width:1800px)]:grid-cols-4 [@media(min-width:2300px)]:grid-cols-5 [@media(min-width:2800px)]:grid-cols-6">
        {SAMPLE_WEBINARS.map((webinar) => (
          <WebinarCard
            key={webinar.id}
            webinar={webinar}
            onRegister={() => handleRegister(webinar.id)}
          />
        ))}
      </div>
    </div>
  );
}
