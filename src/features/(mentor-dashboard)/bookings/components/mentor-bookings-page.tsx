"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent } from "@/src/components/ui/tabs";
import { BookingCalendar } from "./booking-calendar";
import { BookingSession } from "../types";
import { SAMPLE_BOOKINGS } from "../constants";
import { cn } from "@/src/lib/utils";

interface MentorBookingsPageProps {
  className?: string;
}

export function MentorBookingsPage({ className }: MentorBookingsPageProps) {
  const [bookings] = useState<BookingSession[]>(SAMPLE_BOOKINGS);
  const [activeTab, setActiveTab] = useState<"calendar" | "list">("calendar");

  // const handleEventClick = (booking: BookingSession) => {
  //   console.log("Event clicked:", booking);
  //   // TODO: Open booking details modal or navigate to booking details
  // };

  // const handleDateClick = (date: string) => {
  //   console.log("Date clicked:", date);
  //   // TODO: Open create booking modal for the selected date
  // };

  // const handleBookingClick = (booking: BookingSession) => {
  //   console.log("Booking clicked:", booking);
  //   // TODO: Open booking details modal
  // };

  // const handleBookingAction = (
  //   bookingId: string,
  //   action: "reschedule" | "cancel" | "complete",
  // ) => {
  //   console.log("Booking action:", bookingId, action);
  //   // TODO: Implement booking actions
  // };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn("space-y-8 py-6", className)}
    >
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 md:text-2xl">
            Bookings
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as "calendar" | "list")}
      >
        <div className="mt-6">
          <TabsContent value="calendar" className="mt-0">
            <BookingCalendar bookings={bookings} />
          </TabsContent>
        </div>
      </Tabs>
    </motion.div>
  );
}
