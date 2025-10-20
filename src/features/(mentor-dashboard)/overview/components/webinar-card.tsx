"use client";

import { Card, CardContent } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";
import { Star } from "lucide-react";

interface WebinarCardProps {
  webinar: {
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
  };
  className?: string;
  onRegister: () => void;
}

export function WebinarCard({
  webinar,
  className,
  onRegister,
}: WebinarCardProps) {
  return (
    <Card className={cn("border-none shadow-none", className)}>
      <CardContent className="p-0">
        <div className="space-y-4">
          <div className="relative">
            <div className="h-48 w-full overflow-hidden rounded-lg rounded-t-lg">
              <img
                src={webinar.image}
                alt={webinar.title}
                className="h-full w-full object-cover"
              />
            </div>
            {webinar.isPremium && (
              <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-md bg-white px-3 py-1.5 shadow-sm">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.4416 2.92422L12.9083 5.85755C13.1083 6.26589 13.6416 6.65755 14.0916 6.73255L16.7499 7.17422C18.4499 7.45755 18.8499 8.69089 17.6249 9.90755L15.5583 11.9742C15.2083 12.3242 15.0166 12.9992 15.1249 13.4826L15.7166 16.0409C16.1833 18.0659 15.1083 18.8492 13.3166 17.7909L10.8249 16.3159C10.3749 16.0492 9.63326 16.0492 9.17492 16.3159L6.68326 17.7909C4.89992 18.8492 3.81659 18.0576 4.28326 16.0409L4.87492 13.4826C4.98326 12.9992 4.79159 12.3242 4.44159 11.9742L2.37492 9.90755C1.15826 8.69089 1.54992 7.45755 3.24992 7.17422L5.90826 6.73255C6.34992 6.65755 6.88326 6.26589 7.08326 5.85755L8.54992 2.92422C9.34992 1.33255 10.6499 1.33255 11.4416 2.92422Z"
                    stroke="#4F4F4F"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <span className="font-sora text-black-800 text-sm font-medium">
                  Premium
                </span>
              </div>
            )}
          </div>

          <div className="pb-4">
            {/* Title */}
            <h3 className="font-sora text-black-800 line-clamp-2 text-base font-semibold">
              {webinar.title}
            </h3>

            <div className="mt-3 flex items-center gap-2">
              <div className="h-6 w-6 overflow-hidden rounded-full">
                <img
                  src={webinar.instructor.avatar}
                  alt={webinar.instructor.name}
                  className="h-full w-full rounded-full object-cover"
                />
              </div>
              <span className="font-sora text-black-600 text-sm">
                With {webinar.instructor.name}
              </span>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-[#F8BE42] text-[#F8BE42]" />
                <span className="font-sora text-black-800 text-sm font-medium">
                  {webinar.rating}
                </span>
              </div>
            </div>

            <p className="font-sora text-black-400 mt-2 text-sm">
              {webinar.date} @ {webinar.time}
            </p>

            <div className="mt-3 flex items-center gap-2">
              <div className="flex -space-x-1">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="h-5 w-5 overflow-hidden rounded-full border-2 border-white"
                  >
                    <img
                      src="/images/profile.png"
                      alt="Attendee"
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <span className="font-sora text-black-600 text-sm">
                {webinar.attendees} people going
              </span>
            </div>

            <Button
              onClick={onRegister}
              variant="outline"
              className="mt-4 h-10"
            >
              Register Here
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
