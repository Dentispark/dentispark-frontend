"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";

interface SuggestSlotFormProps {
  onSubmit: (data: {
    date: string;
    startTime: string;
    endTime: string;
  }) => void;
  onCancel: () => void;
}

const TIME_SLOTS = [
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

export function SuggestSlotForm({ onSubmit, onCancel }: SuggestSlotFormProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleSubmit = () => {
    if (selectedDate && startTime && endTime) {
      onSubmit({ date: selectedDate, startTime, endTime });
    }
  };

  // Calendar logic
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDate = (year: number, month: number, day: number) => {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  };

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];
    const today = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    // Previous month days (greyed out)
    const prevMonthDays = firstDay;
    const prevMonth = new Date(currentYear, currentMonth, 0);
    const prevMonthTotal = prevMonth.getDate();

    for (let i = prevMonthDays - 1; i >= 0; i--) {
      const day = prevMonthTotal - i;
      days.push(
        <div
          key={`prev-${day}`}
          className="flex h-10 w-10 items-center justify-center text-sm text-gray-300"
        >
          {day}
        </div>,
      );
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = formatDate(currentYear, currentMonth, day);
      const isSelected = selectedDate === dateString;
      const isPast = new Date(dateString) < new Date(today.toDateString());

      days.push(
        <button
          key={day}
          type="button"
          onClick={() => !isPast && setSelectedDate(dateString)}
          disabled={isPast}
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium transition-colors",
            "hover:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-300",
            isSelected && "bg-primary hover:bg-primary/90 text-white",
            !isSelected && !isPast && "text-gray-900",
          )}
        >
          {day}
        </button>,
      );
    }

    // Next month days to fill the grid
    const totalCells = Math.ceil(days.length / 7) * 7;
    const nextMonthDays = totalCells - days.length;

    for (let day = 1; day <= nextMonthDays; day++) {
      days.push(
        <div
          key={`next-${day}`}
          className="flex h-10 w-10 items-center justify-center text-sm text-gray-300"
        >
          {day}
        </div>,
      );
    }

    return days;
  };

  return (
    <div className="relative w-full max-w-4xl">
      <div className="grid grid-cols-1 gap-8 py-6 md:grid-cols-2">
        {/* Left: Calendar */}
        <div>
          <h3 className="font-sora mb-6 text-lg font-semibold">
            Select new date
          </h3>

          <div className="rounded-lg border border-gray-200 p-4">
            <div className="mb-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => navigateMonth("prev")}
                className="flex h-8 w-8 items-center justify-center rounded hover:bg-gray-100"
              >
                <ChevronLeft className="h-5 w-5 text-gray-600" />
              </button>

              <h4 className="font-sora text-base font-semibold">
                {currentDate.toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </h4>

              <button
                type="button"
                onClick={() => navigateMonth("next")}
                className="bg-primary/10 hover:bg-primary/20 flex h-8 w-8 items-center justify-center rounded"
              >
                <ChevronRight className="text-primary h-5 w-5" />
              </button>
            </div>

            <div className="mb-2 grid grid-cols-7 gap-1">
              {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
                <div
                  key={`${day}-${index}`}
                  className="font-sora flex h-10 items-center justify-center text-sm font-semibold text-gray-600"
                >
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">{renderCalendar()}</div>
          </div>
        </div>

        {/* Right: Time Selection */}
        <div className="space-y-6">
          <h3 className="font-sora text-lg font-semibold">
            Select your new time
          </h3>

          <div className="space-y-4">
            {/* From Time */}
            <div>
              <label className="font-sora mb-2 block text-sm font-medium text-gray-700">
                From
              </label>
              <div className="relative">
                <select
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="font-sora focus:border-primary focus:ring-primary w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-3 pr-10 text-sm focus:ring-1 focus:outline-none"
                >
                  <option value="">Select a time</option>
                  {TIME_SLOTS.map((time) => (
                    <option key={`start-${time}`} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
                <Clock className="pointer-events-none absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {/* To Time */}
            <div>
              <label className="font-sora mb-2 block text-sm font-medium text-gray-700">
                To
              </label>
              <div className="relative">
                <select
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="font-sora focus:border-primary focus:ring-primary w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-3 pr-10 text-sm focus:ring-1 focus:outline-none"
                >
                  <option value="">Select a time</option>
                  {TIME_SLOTS.map((time) => (
                    <option key={`end-${time}`} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
                <Clock className="pointer-events-none absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <p className="font-sora text-xs text-gray-500">
              NB: Choose a minimum duration of 2 hours/week
            </p>
          </div>

          {/* Timezone */}
          <div>
            <h4 className="font-sora mb-2 text-sm font-medium text-gray-700">
              Time zone
            </h4>
            <div className="font-sora flex items-center gap-2 text-sm text-gray-600">
              <svg
                width="14"
                height="15"
                viewBox="0 0 14 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.98226 0.947109C6.01853 0.947109 5.11389 1.12895 4.26835 1.49262C3.41373 1.85629 2.67047 2.35406 2.03859 2.98594C1.40671 3.61782 0.908936 4.36108 0.545264 5.21571C0.181592 6.06124 -0.000244141 6.96588 -0.000244141 7.92961C-0.000244141 8.89334 0.181592 9.79797 0.545264 10.6435C0.908936 11.4981 1.40671 12.2414 2.03859 12.8733C2.67047 13.5052 3.41373 14.0029 4.26835 14.3666C5.11389 14.7303 6.01853 14.9121 6.98226 14.9121C7.94599 14.9121 8.85062 14.7303 9.69616 14.3666C10.5508 14.0029 11.294 13.5052 11.9259 12.8733C12.5578 12.2414 13.0556 11.4981 13.4192 10.6435C13.7829 9.79797 13.9648 8.89334 13.9648 7.92961C13.9648 6.96588 13.7829 6.06124 13.4192 5.21571C13.0556 4.36108 12.5578 3.61782 11.9259 2.98594C11.294 2.35406 10.5508 1.85629 9.69616 1.49262C8.85062 1.12895 7.94599 0.947109 6.98226 0.947109ZM6.28673 13.4665C5.59576 13.3847 4.95479 13.1801 4.36382 12.8528C3.76376 12.5346 3.24553 12.13 2.80912 11.6391C2.37271 11.1481 2.02723 10.5844 1.77266 9.94799C1.51809 9.31156 1.3908 8.63877 1.3908 7.92961C1.3908 7.71141 1.40444 7.49775 1.43171 7.28864C1.45899 7.07953 1.49536 6.87496 1.54082 6.67494L4.88205 10.0298V10.7253C4.88205 11.1072 5.01843 11.4345 5.29118 11.7073C5.56394 11.98 5.89579 12.1164 6.28673 12.1164V13.4665ZM11.1008 11.6936C11.0099 11.4118 10.844 11.1799 10.6031 10.9981C10.3621 10.8163 10.0871 10.7253 9.77798 10.7253H9.08246V8.62513C9.08246 8.4342 9.01427 8.27055 8.8779 8.13417C8.74152 7.9978 8.57332 7.92961 8.3733 7.92961H4.18653V6.53856H5.59121C5.78214 6.53856 5.94579 6.47038 6.08217 6.334C6.21855 6.19762 6.28673 6.02942 6.28673 5.8294V4.43836H7.67778C8.06873 4.43836 8.40058 4.30198 8.67333 4.02923C8.94608 3.75647 9.08246 3.42917 9.08246 3.04731V2.74728C9.5916 2.9564 10.0598 3.2337 10.4871 3.57918C10.9145 3.92467 11.2827 4.32244 11.5918 4.77248C11.9009 5.22253 12.1419 5.71576 12.3146 6.25217C12.4873 6.7795 12.5737 7.33864 12.5737 7.92961C12.5737 8.65695 12.4419 9.34338 12.1782 9.9889C11.9146 10.6344 11.5554 11.2027 11.1008 11.6936Z"
                  fill="#2E2E2E"
                />
              </svg>
              United Kingdom (GMT+1)
            </div>
          </div>

          {/* Actions */}
          <div className="flex w-full items-center gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="font-sora flex-1 rounded-full border-gray-300 text-gray-700 hover:bg-white hover:text-gray-900"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={!selectedDate || !startTime || !endTime}
              className="bg-primary hover:bg-primary/90 font-sora flex-1 rounded-full text-white disabled:opacity-50"
            >
              Apply
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
