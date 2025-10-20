import { BookingSession, BookingStats, CalendarEvent } from "./types";

export const SAMPLE_BOOKINGS: BookingSession[] = [
  {
    id: "1",
    title: "UCAT Mentoring",
    studentName: "John Doe",
    studentAvatar: "/images/profile.png",
    startTime: "08:00",
    endTime: "10:00",
    date: "2025-07-15",
    type: "UCAT Mentoring",
    status: "confirmed",
    duration: 120,
    meetingLink: "https://zoom.us/j/123456789",
    notes: "Focus on quantitative reasoning section",
    studentEmail: "john.doe@email.com",
    studentPhone: "+44 7123 456789",
  },
  {
    id: "2",
    title: "UCAT Mentoring",
    studentName: "John Doe",
    studentAvatar: "/images/profile.png",
    startTime: "08:00",
    endTime: "10:00",
    date: "2025-07-16",
    type: "UCAT Mentoring",
    status: "confirmed",
    duration: 120,
    meetingLink: "https://zoom.us/j/123456789",
    notes: "Review previous session and work on verbal reasoning",
    studentEmail: "john.doe@email.com",
    studentPhone: "+44 7123 456789",
  },
  {
    id: "3",
    title: "PS Mentoring",
    studentName: "John Doe",
    studentAvatar: "/images/profile.png",
    startTime: "10:00",
    endTime: "12:00",
    date: "2025-07-16",
    type: "PS Mentoring",
    status: "confirmed",
    duration: 120,
    meetingLink: "https://zoom.us/j/987654321",
    notes: "Personal statement review and feedback",
    studentEmail: "john.doe@email.com",
    studentPhone: "+44 7123 456789",
  },
  {
    id: "4",
    title: "PS Mentoring",
    studentName: "John Doe",
    studentAvatar: "/images/profile.png",
    startTime: "01:00",
    endTime: "03:00",
    date: "2025-07-15",
    type: "PS Mentoring",
    status: "confirmed",
    duration: 120,
    meetingLink: "https://zoom.us/j/987654321",
    notes: "Final review before submission",
    studentEmail: "john.doe@email.com",
    studentPhone: "+44 7123 456789",
  },
];

export const BOOKING_STATS: BookingStats = {
  totalBookings: 156,
  upcomingBookings: 12,
  completedBookings: 140,
  cancelledBookings: 4,
  totalHours: 312,
  thisWeekBookings: 8,
  thisMonthBookings: 24,
};

export const BOOKING_TYPE_COLORS = {
  "UCAT Mentoring": {
    backgroundColor: "#FEF3C7",
    borderColor: "#F59E0B",
    textColor: "#92400E",
  },
  "PS Mentoring": {
    backgroundColor: "#DBEAFE",
    borderColor: "#3B82F6",
    textColor: "#1E40AF",
  },
  "Interview Prep": {
    backgroundColor: "#D1FAE5",
    borderColor: "#10B981",
    textColor: "#065F46",
  },
  "General Consultation": {
    backgroundColor: "#F3E8FF",
    borderColor: "#8B5CF6",
    textColor: "#5B21B6",
  },
} as const;

export const BOOKING_STATUS_COLORS = {
  confirmed: "bg-green-100 text-green-800 border-green-200",
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  cancelled: "bg-red-100 text-red-800 border-red-200",
  completed: "bg-blue-100 text-blue-800 border-blue-200",
} as const;

export const TIME_SLOTS = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
];

export const DAYS_OF_WEEK = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Convert bookings to calendar events
export const convertBookingsToEvents = (
  bookings: BookingSession[],
): CalendarEvent[] => {
  return bookings.map((booking) => {
    const colors = BOOKING_TYPE_COLORS[booking.type];
    return {
      id: booking.id,
      title: "", // Empty title since we use custom content
      start: `${booking.date}T${booking.startTime}:00`,
      end: `${booking.date}T${booking.endTime}:00`,
      backgroundColor: colors.backgroundColor,
      borderColor: colors.borderColor,
      textColor: colors.textColor,
      extendedProps: {
        booking,
      },
    };
  });
};
