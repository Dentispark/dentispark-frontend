export interface BookingSession {
  id: string;
  title: string;
  studentName: string;
  studentAvatar?: string;
  startTime: string;
  endTime: string;
  date: string;
  type:
    | "UCAT Mentoring"
    | "PS Mentoring"
    | "Interview Prep"
    | "General Consultation";
  status: "confirmed" | "pending" | "cancelled" | "completed";
  duration: number; // in minutes
  meetingLink?: string;
  notes?: string;
  studentEmail?: string;
  studentPhone?: string;
}

export interface BookingAvailability {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  isRecurring?: boolean;
  recurringPattern?: "weekly" | "daily";
}

export interface BookingStats {
  totalBookings: number;
  upcomingBookings: number;
  completedBookings: number;
  cancelledBookings: number;
  totalHours: number;
  thisWeekBookings: number;
  thisMonthBookings: number;
}

export interface BookingFilters {
  status?: BookingSession["status"];
  type?: BookingSession["type"];
  dateRange?: {
    start: string;
    end: string;
  };
  studentName?: string;
}

export interface BookingPageProps {
  className?: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
  extendedProps?: {
    booking: BookingSession;
  };
}

export interface TimeSlot {
  time: string;
  available: boolean;
  booked?: boolean;
}

export interface DaySchedule {
  date: string;
  slots: TimeSlot[];
}
