export interface ScheduleSlot {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  sessionType: SessionType;
  isAvailable: boolean;
  isRecurring?: boolean;
  recurringPattern?: "weekly" | "daily" | "monthly";
}

export interface SessionType {
  id: string;
  name: string;
  color: string;
  duration: number; // in minutes
}

export interface ScheduleDay {
  date: string;
  dayName: string;
  slots: ScheduleSlot[];
}

export interface ScheduleWeek {
  weekStart: string;
  weekEnd: string;
  days: ScheduleDay[];
}

export interface ScheduleAvailability {
  id: string;
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  startTime: string;
  endTime: string;
  isActive: boolean;
  sessionTypes: string[]; // Array of session type IDs
}

export interface ScheduleSettings {
  defaultSessionDuration: number;
  bufferTime: number; // minutes between sessions
  maxAdvanceBooking: number; // days
  minAdvanceBooking: number; // hours
  timeZone: string;
}

export interface SchedulePageProps {
  className?: string;
}

export interface TimeSlotProps {
  slot: ScheduleSlot;
  onEdit?: (slot: ScheduleSlot) => void;
  onDelete?: (slotId: string) => void;
  className?: string;
}

export interface ScheduleFormData {
  date: string;
  startTime: string;
  endTime: string;
  sessionType: string;
  timezone?: string;
}
