"use client";

import { Clock, Trash2, Edit3 } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { cn } from "@/src/lib/utils";
import { TimeSlotProps } from "../types";

export function ScheduleTimeSlot({
  slot,
  onEdit,
  onDelete,
  className,
}: TimeSlotProps) {
  const handleEdit = () => {
    onEdit?.(slot);
  };

  const handleDelete = () => {
    onDelete?.(slot.id);
  };

  return (
    <div
      className={cn(
        "group relative rounded-lg border border-gray-200 bg-white p-4 pb-10 transition-all hover:shadow-sm",
        className,
      )}
    >
      {/* Header with time and actions */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-900">
            Date and Time
          </span>
        </div>
        <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleEdit}
            className="h-8 w-8 p-0"
          >
            <Edit3 className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* Date */}
      <div className="my-3 mt-6 flex items-center gap-2">
        <label className="w-8 text-xs font-medium text-gray-700">Date</label>
        <div className="mt-1 w-full flex-1 rounded border border-gray-200 px-3 py-2">
          <span className="text-sm text-gray-900">
            {new Date(slot.date).toLocaleDateString("en-US", {
              weekday: "short",
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>
      </div>

      {/* Time Range */}
      <div className="mb-3 grid gap-3">
        <div className="flex items-center gap-2">
          <label className="w-8 text-xs font-medium text-gray-700">From</label>
          <div className="mt-1 flex-1 rounded border border-gray-200 px-3 py-2">
            <span className="text-sm text-gray-900">{slot.startTime}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <label className="w-8 text-xs font-medium text-gray-700">To</label>
          <div className="mt-1 flex-1 rounded border border-gray-200 px-3 py-2">
            <span className="text-sm text-gray-900">{slot.endTime}</span>
          </div>
        </div>
      </div>

      {/* Session Type Badge */}
      <div className="mt-5 flex">
        <Badge
          style={{
            backgroundColor: `${slot.sessionType.color}20`,
            color: slot.sessionType.color,
            borderColor: `${slot.sessionType.color}40`,
          }}
          className="h-9 border"
        >
          {slot.sessionType.name}
        </Badge>
      </div>
    </div>
  );
}
