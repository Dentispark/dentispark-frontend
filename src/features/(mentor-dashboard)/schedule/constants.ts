import { SessionType, ScheduleSlot } from "./types";

export const SESSION_TYPES: SessionType[] = [
  {
    id: "ucat",
    name: "UCAT Session",
    color: "#F97316", // orange-500
    duration: 60,
  },
  {
    id: "personal-statement",
    name: "Personal statement session",
    color: "#8B5CF6", // violet-500
    duration: 45,
  },
];

export const TIME_SLOTS = [
  "08:00 AM",
  "08:30 AM",
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "01:00 PM",
  "01:30 PM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
  "04:30 PM",
  "05:00 PM",
  "05:30 PM",
  "06:00 PM",
  "06:30 PM",
  "07:00 PM",
  "07:30 PM",
  "08:00 PM",
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

export const SAMPLE_SCHEDULE_SLOTS: ScheduleSlot[] = [
  {
    id: "1",
    date: "2025-07-02",
    startTime: "08:00 AM",
    endTime: "10:00 AM",
    sessionType: SESSION_TYPES[0],
    isAvailable: true,
  },
  {
    id: "2",
    date: "2025-07-02",
    startTime: "08:00 AM",
    endTime: "09:30 AM",
    sessionType: SESSION_TYPES[1],
    isAvailable: true,
  },
  {
    id: "3",
    date: "2025-07-02",
    startTime: "10:00 AM",
    endTime: "12:00 PM",
    sessionType: SESSION_TYPES[0],
    isAvailable: true,
  },
  {
    id: "4",
    date: "2025-07-02",
    startTime: "08:00 AM",
    endTime: "10:00 AM",
    sessionType: SESSION_TYPES[0],
    isAvailable: true,
  },
];

export const DEFAULT_SCHEDULE_SETTINGS = {
  defaultSessionDuration: 60,
  bufferTime: 15,
  maxAdvanceBooking: 30,
  minAdvanceBooking: 24,
  timeZone: "UTC",
};
