"use client";

import { useState } from "react";
import {
  Calendar,
  Clock,
  User,
  Video,
  Phone,
  Mail,
  MoreVertical,
  Filter,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Card } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { Input } from "@/src/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { cn } from "@/src/lib/utils";
import { BookingSession, BookingFilters } from "../types";
import { BOOKING_STATUS_COLORS, SAMPLE_BOOKINGS } from "../constants";

interface BookingListProps {
  className?: string;
  bookings?: BookingSession[];
  onBookingClick?: (booking: BookingSession) => void;
  onBookingAction?: (
    bookingId: string,
    action: "reschedule" | "cancel" | "complete",
  ) => void;
}

export function BookingList({
  className,
  bookings = SAMPLE_BOOKINGS,
  onBookingClick,
  onBookingAction,
}: BookingListProps) {
  const [filters, setFilters] = useState<BookingFilters>({});
  const [searchTerm, setSearchTerm] = useState("");

  // Filter bookings based on current filters and search term
  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      searchTerm === "" ||
      booking.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.title.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = !filters.status || booking.status === filters.status;
    const matchesType = !filters.type || booking.type === filters.type;

    return matchesSearch && matchesStatus && matchesType;
  });

  // Sort bookings by date and time
  const sortedBookings = filteredBookings.sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.startTime}`);
    const dateB = new Date(`${b.date}T${b.startTime}`);
    return dateA.getTime() - dateB.getTime();
  });

  const handleBookingAction = (
    bookingId: string,
    action: "reschedule" | "cancel" | "complete",
  ) => {
    onBookingAction?.(bookingId, action);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(":");
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleTimeString("en-GB", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Filters and Search */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center gap-4">
          <div className="relative max-w-sm flex-1">
            <Input
              placeholder="Search bookings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-4"
            />
          </div>

          <Select
            value={filters.status || "all"}
            onValueChange={(value) =>
              setFilters((prev) => ({
                ...prev,
                status:
                  value === "all"
                    ? undefined
                    : (value as BookingSession["status"]),
              }))
            }
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filters.type || "all"}
            onValueChange={(value) =>
              setFilters((prev) => ({
                ...prev,
                type:
                  value === "all"
                    ? undefined
                    : (value as BookingSession["type"]),
              }))
            }
          >
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="UCAT Mentoring">UCAT Mentoring</SelectItem>
              <SelectItem value="PS Mentoring">PS Mentoring</SelectItem>
              <SelectItem value="Interview Prep">Interview Prep</SelectItem>
              <SelectItem value="General Consultation">
                General Consultation
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            More Filters
          </Button>
        </div>
      </div>

      {/* Booking List */}
      <div className="space-y-4">
        {sortedBookings.length === 0 ? (
          <Card className="p-8 text-center">
            <Calendar className="mx-auto mb-4 h-12 w-12 text-gray-300" />
            <h3 className="mb-2 text-lg font-medium text-gray-900">
              No bookings found
            </h3>
            <p className="text-gray-500">
              {searchTerm || filters.status || filters.type
                ? "Try adjusting your filters to see more results."
                : "You don't have any bookings yet."}
            </p>
          </Card>
        ) : (
          sortedBookings.map((booking) => (
            <Card
              key={booking.id}
              className="cursor-pointer p-6 transition-shadow hover:shadow-md"
              onClick={() => onBookingClick?.(booking)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-3">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {booking.title}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          <span>{booking.studentName}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(booking.date)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>
                            {formatTime(booking.startTime)} -{" "}
                            {formatTime(booking.endTime)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Badge className={BOOKING_STATUS_COLORS[booking.status]}>
                        {booking.status.charAt(0).toUpperCase() +
                          booking.status.slice(1)}
                      </Badge>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {booking.status === "confirmed" && (
                            <>
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleBookingAction(booking.id, "complete");
                                }}
                              >
                                Mark as Complete
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleBookingAction(booking.id, "reschedule");
                                }}
                              >
                                Reschedule
                              </DropdownMenuItem>
                            </>
                          )}
                          {booking.status !== "cancelled" &&
                            booking.status !== "completed" && (
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleBookingAction(booking.id, "cancel");
                                }}
                                className="text-red-600"
                              >
                                Cancel Booking
                              </DropdownMenuItem>
                            )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  {/* Notes */}
                  {booking.notes && (
                    <p className="line-clamp-2 text-sm text-gray-600">
                      {booking.notes}
                    </p>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-3 pt-2">
                    {booking.meetingLink && booking.status === "confirmed" && (
                      <Button size="sm" variant="outline" className="text-xs">
                        <Video className="mr-1 h-3 w-3" />
                        Join Meeting
                      </Button>
                    )}
                    {booking.studentPhone && (
                      <Button size="sm" variant="ghost" className="text-xs">
                        <Phone className="mr-1 h-3 w-3" />
                        Call
                      </Button>
                    )}
                    {booking.studentEmail && (
                      <Button size="sm" variant="ghost" className="text-xs">
                        <Mail className="mr-1 h-3 w-3" />
                        Email
                      </Button>
                    )}
                    <span className="ml-auto text-xs text-gray-500">
                      {booking.duration} minutes
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
