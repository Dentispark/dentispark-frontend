"use client";

import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";
import Chat from "@/src/components/icons/Chat";

interface MentorAvailabilityProps {
  mentor: {
    id: string;
    name: string;
    availability: {
      nextAvailable: string;
      responseTime: string;
      status: "available" | "busy" | "offline";
    };
  };
  className?: string;
}

export function MentorAvailability({
  mentor,
  className,
}: MentorAvailabilityProps) {
  return (
    <div className={cn("w-full lg:sticky lg:top-20 lg:z-10", className)}>
      <div className="border-greys-300 rounded-[32px] border bg-white p-4">
        {/* Availability Status */}
        <div className="flex max-w-sm items-center justify-between rounded-2xl border border-gray-200 bg-white p-3">
          <div>
            <p className="font-sora text-sm font-semibold text-gray-900">
              {mentor.availability.nextAvailable}
            </p>
            <p className="font-sora mt-1 text-xs text-gray-600">
              Usually responds within {mentor.availability.responseTime}
            </p>
          </div>
          <div className="relative">
            <div className="relative flex size-4 items-center justify-center">
              <span className="bg-primary-200 absolute h-full w-full animate-ping rounded-full" />
              <span className="bg-primary z-10 size-2 rounded-full" />
            </div>
          </div>
        </div>

        {/* Coordination Message */}
        <div className="font-sora my-6">
          <p className="text-black-500 text-xs leading-relaxed">
            If none of the times on my calendar work for you, you can send me a
            message to coordinate a more convenient time.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mb-6 space-y-3">
          <Button
            className="bg-primary hover:bg-primary-700 font-sora w-full py-3 text-sm font-normal text-white"
            size="lg"
          >
            Schedule a free call
          </Button>

          <Button
            variant="outline"
            className="border-primary-300 font-sora text-primary-300 hover:bg-primary-100 w-full py-3 text-sm font-normal"
            size="lg"
          >
            Book a session
          </Button>
        </div>

        {/* Questions Section */}
        <div className="border-greys-200 rounded-2xl border">
          <div className="relative flex items-stretch gap-3">
            <div className="bg-primary-100 flex w-[30%] items-center justify-center rounded-l-2xl">
              <Chat className="size-16 text-white" />
            </div>
            <div className="flex-1 p-3">
              <p className="text-black-600 font-sora mb-1 text-xs">
                <span className="font-sora font-semibold">Got questions?</span>{" "}
                Start chatting with this coach before you get started.
              </p>
              <button className="text-primary-300 hover:text-primary-400 font-sora text-sm font-light underline">
                Send {mentor.name.split(" ")[0]} a message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
