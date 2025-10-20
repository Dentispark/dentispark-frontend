"use client";

import { useRef, useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { ChevronLeft, ChevronRight, Calendar, Clock, User } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Card } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { cn } from "@/src/lib/utils";
import { BookingSession } from "../types";
import {
  BOOKING_STATUS_COLORS,
  convertBookingsToEvents,
  SAMPLE_BOOKINGS,
} from "../constants";

interface BookingCalendarProps {
  className?: string;
  bookings?: BookingSession[];
  onEventClick?: (booking: BookingSession) => void;
  onDateClick?: (date: string) => void;
}

export function BookingCalendar({
  className,
  bookings = SAMPLE_BOOKINGS,
  onEventClick,
  onDateClick,
}: BookingCalendarProps) {
  const calendarRef = useRef<FullCalendar>(null);
  const [currentView, setCurrentView] = useState<
    "dayGridMonth" | "timeGridWeek" | "timeGridDay"
  >("timeGridWeek");
  const [selectedBooking, setSelectedBooking] = useState<BookingSession | null>(
    null,
  );
  const [calendarTitle, setCalendarTitle] = useState<string>("");

  const events = convertBookingsToEvents(bookings);

  // Initialize calendar title when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      updateCalendarTitle();
    }, 100); // Small delay to ensure calendar is rendered

    return () => clearTimeout(timer);
  }, []);

  // Force calendar to update and show now indicator
  useEffect(() => {
    const interval = setInterval(() => {
      const calendarApi = calendarRef.current?.getApi();
      if (calendarApi && currentView.includes("timeGrid")) {
        calendarApi.refetchEvents();
      }
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [currentView]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderEventContent = (eventInfo: any) => {
    const booking = eventInfo.event.extendedProps.booking as BookingSession;

    return (
      <div className="flex h-full min-h-[80px] w-full flex-col justify-between p-3 text-xs">
        <div>
          <div className="mb-1 leading-tight font-semibold text-gray-900">
            {booking.type}
          </div>
          <div className="mb-2 font-medium text-gray-600">
            {eventInfo.timeText}
          </div>
        </div>
        <div className="mt-auto flex items-center gap-2">
          <div className="h-5 w-5 flex-shrink-0 rounded-full border border-white bg-gray-300 shadow-sm"></div>
          <span className="truncate text-xs font-medium text-gray-800">
            {booking.studentName}
          </span>
        </div>
      </div>
    );
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEventClick = (clickInfo: any) => {
    const booking = clickInfo.event.extendedProps.booking as BookingSession;
    setSelectedBooking(booking);
    onEventClick?.(booking);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDateClick = (clickInfo: any) => {
    onDateClick?.(clickInfo.dateStr);
  };

  const updateCalendarTitle = () => {
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) {
      setCalendarTitle(calendarApi.view.title);
    }
  };

  const goToNext = () => {
    const calendarApi = calendarRef.current?.getApi();
    calendarApi?.next();
    updateCalendarTitle();
  };

  const goToPrev = () => {
    const calendarApi = calendarRef.current?.getApi();
    calendarApi?.prev();
    updateCalendarTitle();
  };

  const goToToday = () => {
    const calendarApi = calendarRef.current?.getApi();
    calendarApi?.today();
    updateCalendarTitle();
  };

  const changeView = (
    view: "dayGridMonth" | "timeGridWeek" | "timeGridDay",
  ) => {
    const calendarApi = calendarRef.current?.getApi();
    calendarApi?.changeView(view);
    setCurrentView(view);
    updateCalendarTitle();
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Calendar Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={goToToday}
              className="bg-greys-100 border-greys-300 hover:bg-primary-100 hover:text-primary-700 mr-6 text-sm text-[#4F4F4F]"
            >
              Today
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={goToPrev}
              className="hover:bg-primary-100 hover:text-primary-700 h-8 w-8 rounded-full border-none p-0 shadow-none"
            >
              <ChevronLeft className="size-6" />
            </Button>

            <h2 className="text-lg font-semibold text-gray-900">
              {calendarTitle || "Loading..."}
            </h2>
            <Button
              variant="outline"
              size="sm"
              onClick={goToNext}
              className="hover:bg-primary-100 hover:text-primary-700 h-8 w-8 rounded-full border-none p-0 shadow-none"
            >
              <ChevronRight className="size-6" />
            </Button>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-2">
          <Button
            variant={currentView === "dayGridMonth" ? "default" : "outline"}
            size="sm"
            onClick={() => changeView("dayGridMonth")}
            className="text-sm"
          >
            Month
          </Button>
          <Button
            variant={currentView === "timeGridWeek" ? "default" : "outline"}
            size="sm"
            onClick={() => changeView("timeGridWeek")}
            className="text-sm"
          >
            Week
          </Button>
          <Button
            variant={currentView === "timeGridDay" ? "default" : "outline"}
            size="sm"
            onClick={() => changeView("timeGridDay")}
            className="text-sm"
          >
            Day
          </Button>
        </div>
      </div>

      {/* Calendar */}
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={currentView}
        headerToolbar={false}
        events={events}
        eventClick={handleEventClick}
        dateClick={handleDateClick}
        datesSet={updateCalendarTitle}
        height="auto"
        slotMinTime="06:00:00"
        slotMaxTime="22:00:00"
        allDaySlot={false}
        slotDuration="00:30:00"
        slotLabelInterval="01:00:00"
        eventDisplay="block"
        dayMaxEvents={3}
        moreLinkClick="popover"
        eventClassNames="cursor-pointer hover:opacity-90 transition-all"
        slotLabelFormat={{
          hour: "numeric",
          minute: "2-digit",
          omitZeroMinute: false,
          meridiem: "short",
        }}
        eventTimeFormat={{
          hour: "numeric",
          minute: "2-digit",
          omitZeroMinute: false,
          meridiem: "short",
        }}
        businessHours={{
          daysOfWeek: [1, 2, 3, 4, 5], // Monday - Friday
          startTime: "08:00",
          endTime: "18:00",
        }}
        weekends={true}
        nowIndicator={true}
        now={new Date()}
        selectMirror={true}
        dayHeaderFormat={{
          weekday: "short",
          month: "numeric",
          day: "numeric",
        }}
        eventContent={renderEventContent}
      />

      {/* Selected Booking Details */}
      {selectedBooking && (
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    {new Date(selectedBooking.date).toLocaleDateString(
                      "en-GB",
                      {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      },
                    )}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    {selectedBooking.startTime} - {selectedBooking.endTime}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {selectedBooking.title}
                </h3>
                <div className="mt-1 flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    {selectedBooking.studentName}
                  </span>
                </div>
              </div>

              {selectedBooking.notes && (
                <div>
                  <h4 className="mb-1 text-sm font-medium text-gray-900">
                    Notes
                  </h4>
                  <p className="text-sm text-gray-600">
                    {selectedBooking.notes}
                  </p>
                </div>
              )}

              <div className="flex items-center gap-4">
                <Badge
                  className={BOOKING_STATUS_COLORS[selectedBooking.status]}
                >
                  {selectedBooking.status.charAt(0).toUpperCase() +
                    selectedBooking.status.slice(1)}
                </Badge>
                <span className="text-sm text-gray-500">
                  {selectedBooking.duration} minutes
                </span>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedBooking(null)}
            >
              Close
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
