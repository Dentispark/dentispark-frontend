"use client";

import Image from "next/image";
import { Button } from "@/src/components/ui/button";

interface AcceptBookingModalProps {
  student: {
    name: string;
    year: string;
    avatar: string;
  };
  booking: {
    title: string;
    date: string;
  };
  onAccept: () => void;
  onSuggestNewSlot: () => void;
}

export function AcceptBookingModal({
  student,
  booking,
  onAccept,
  onSuggestNewSlot,
}: AcceptBookingModalProps) {
  return (
    <div className="w-full max-w-md px-4">
      <div className="space-y-6">
        {/* Student Info */}
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-full">
            <Image
              src={student.avatar}
              alt={student.name}
              width={64}
              height={64}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-sora text-black-800 text-lg font-semibold">
              {student.name}
            </h3>
            <p className="text-black-400 font-sora text-sm">{student.year}</p>
          </div>
        </div>

        {/* Booking Information */}
        <div>
          <h4 className="font-sora text-black-800 mb-2 text-sm font-semibold">
            Booking Information:
          </h4>
          <div className="flex items-center gap-4">
            <p className="text-black-600 font-sora text-sm">{booking.title}</p>
            <p className="text-black-600 font-sora text-sm">{booking.date}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Button
            onClick={onSuggestNewSlot}
            variant="outline"
            className="font-sora border-greys-300 text-greys-1000 hover:text-greys-1000 h-10 flex-1 rounded-lg hover:bg-white"
          >
            Suggest new slot
          </Button>
          <Button
            onClick={onAccept}
            className="bg-primary hover:bg-primary/90 font-sora h-10 flex-1 rounded-lg text-white"
          >
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}
