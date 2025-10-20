"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { Button } from "@/src/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { cn } from "@/src/lib/utils";
import { SESSION_TYPES, TIME_SLOTS } from "../constants";
import { ScheduleFormData } from "../types";

const scheduleFormSchema = z.object({
  date: z.string().min(1, "Date is required"),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  sessionType: z.string().min(1, "Session type is required"),
  timezone: z.string().default("GMT+1"),
});

interface ScheduleFormProps {
  onSubmit: (data: ScheduleFormData) => void;
  onCancel: () => void;
  initialData?: Partial<ScheduleFormData>;
}

export function ScheduleForm({
  onSubmit,
  onCancel,
  initialData,
}: ScheduleFormProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string>(
    initialData?.date || "",
  );

  const form = useForm<ScheduleFormData>({
    resolver: zodResolver(scheduleFormSchema),
    defaultValues: {
      date: initialData?.date || "",
      startTime: initialData?.startTime || "",
      endTime: initialData?.endTime || "",
      sessionType: initialData?.sessionType || "",
      timezone: initialData?.timezone || "GMT+1",
    },
  });

  const handleSubmit = (data: ScheduleFormData) => {
    onSubmit({ ...data, date: selectedDate || data.date });
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

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = formatDate(currentYear, currentMonth, day);
      const isToday =
        today.getDate() === day &&
        today.getMonth() === currentMonth &&
        today.getFullYear() === currentYear;
      const isSelected = selectedDate === dateString;
      const isPast = new Date(dateString) < new Date(today.toDateString());

      days.push(
        <button
          key={day}
          type="button"
          onClick={() => !isPast && setSelectedDate(dateString)}
          disabled={isPast}
          className={cn(
            "h-10 w-10 rounded-full text-sm font-medium transition-colors",
            "hover:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-300",
            isSelected && "bg-green-500 text-white hover:bg-green-600",
            isToday && !isSelected && "bg-blue-50 text-blue-600",
          )}
        >
          {day}
        </button>,
      );
    }

    return days;
  };

  return (
    <div className="w-full max-w-4xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="grid grid-cols-2 gap-8 py-6">
            <div>
              <h3 className="font-sora mb-4 text-base font-medium">
                Select a Date
              </h3>

              <div className="mb-4 flex items-center justify-between">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => navigateMonth("prev")}
                  className="h-8 w-8"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                <h4 className="font-medium">
                  {currentDate.toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </h4>

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => navigateMonth("next")}
                  className="h-8 w-8"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              <div className="mb-2 grid grid-cols-7 gap-1">
                {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
                  <div
                    key={`${day}-${index}`}
                    className="flex h-10 items-center justify-center text-sm font-medium text-gray-500"
                  >
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">{renderCalendar()}</div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-sora mb-4 text-base font-medium">
                  Select your Preferred Time
                </h3>

                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="startTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">
                          From
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a time" />
                              <Clock className="ml-auto h-4 w-4" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {TIME_SLOTS.map((time) => (
                              <SelectItem
                                key={time}
                                className="font-sora text-sm"
                                value={time}
                              >
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="endTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">
                          To
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a time" />
                              <Clock className="ml-auto h-4 w-4" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="font-sora text-sm">
                            {TIME_SLOTS.map((time) => (
                              <SelectItem
                                key={time}
                                className="text-xs"
                                value={time}
                              >
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <p className="font-sora mt-2 text-xs text-gray-500">
                  NB: Choose a minimum duration of 2 hours/week
                </p>
              </div>

              {/* Timezone */}
              <div>
                <h4 className="mb-2 text-sm font-medium">Time zone</h4>
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

              {/* Session Type */}
              <FormField
                control={form.control}
                name="sessionType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      Session Type
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select session type" />
                          <Clock className="ml-auto h-4 w-4" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {SESSION_TYPES.map((type) => (
                          <SelectItem
                            key={type.id}
                            className="font-sora text-sm"
                            value={type.id}
                          >
                            <div className="flex items-center gap-2">
                              <div
                                className="size-3 rounded-full"
                                style={{ backgroundColor: type.color }}
                              />
                              {type.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />

                    {/* Actions */}
                    <div className="flex w-full items-center justify-between gap-3 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={onCancel}
                        className="flex-1 rounded-full border border-gray-300 px-8 text-gray-600 hover:bg-white hover:text-gray-900"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        className="bg-primary hover:bg-primary/90 flex-1 rounded-full text-white"
                        disabled={!selectedDate}
                      >
                        Create
                      </Button>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
