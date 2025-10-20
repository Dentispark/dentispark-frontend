"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";
import { useModal } from "@/src/hooks/use-modal";
import { ScheduleTimeSlot } from "./schedule-time-slot";
import { ScheduleForm } from "./schedule-form";
import { ScheduleSlot, ScheduleFormData, SchedulePageProps } from "../types";
import { SAMPLE_SCHEDULE_SLOTS, SESSION_TYPES } from "../constants";

export function MentorSchedulePage({ className }: SchedulePageProps) {
  const [scheduleSlots, setScheduleSlots] = useState<ScheduleSlot[]>(
    SAMPLE_SCHEDULE_SLOTS,
  );
  const [editingSlot, setEditingSlot] = useState<ScheduleSlot | null>(null);
  const { showModal, hideModal } = useModal();

  const handleCreateSchedule = () => {
    setEditingSlot(null);
    showModal({
      modalTitle: "Create a schedule",
      bodyContent: (
        <ScheduleForm onSubmit={handleFormSubmit} onCancel={hideModal} />
      ),
      action: () => {},
      actionTitle: "",
      className: "rounded-2xl",
      secondaryAction: hideModal,
      secondaryActionTitle: "Cancel",
      type: "create-schedule",
      size: "2xl",
      isCustomContent: true,
    });
  };

  const handleEditSlot = (slot: ScheduleSlot) => {
    setEditingSlot(slot);
    showModal({
      modalTitle: "Edit schedule",
      bodyContent: (
        <ScheduleForm
          onSubmit={handleFormSubmit}
          onCancel={hideModal}
          initialData={{
            date: slot.date,
            startTime: slot.startTime,
            endTime: slot.endTime,
            sessionType: slot.sessionType.id,
            timezone: "GMT+1",
          }}
        />
      ),
      action: () => {},
      actionTitle: "",
      className: "rounded-lg",
      secondaryAction: hideModal,
      secondaryActionTitle: "Cancel",
      type: "edit-schedule",
      size: "2xl",
      isCustomContent: true,
    });
  };

  const handleDeleteSlot = (slotId: string) => {
    setScheduleSlots((prev) => prev.filter((slot) => slot.id !== slotId));
  };

  const handleFormSubmit = (data: ScheduleFormData) => {
    if (editingSlot) {
      // Update existing slot
      setScheduleSlots((prev) =>
        prev.map((slot) =>
          slot.id === editingSlot.id
            ? {
                ...slot,
                date: data.date,
                startTime: data.startTime,
                endTime: data.endTime,
                sessionType:
                  SESSION_TYPES.find((type) => type.id === data.sessionType) ||
                  SESSION_TYPES[0],
              }
            : slot,
        ),
      );
    } else {
      // Create new slot
      const newSlot: ScheduleSlot = {
        id: Date.now().toString(),
        date: data.date,
        startTime: data.startTime,
        endTime: data.endTime,
        sessionType:
          SESSION_TYPES.find((type) => type.id === data.sessionType) ||
          SESSION_TYPES[0],
        isAvailable: true,
      };
      setScheduleSlots((prev) => [...prev, newSlot]);
    }

    hideModal();
    setEditingSlot(null);
  };

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
            Schedule
          </h1>
        </div>
        <Button
          onClick={handleCreateSchedule}
          className="text-greys-1000 h-10 gap-2 border border-gray-300 bg-white"
        >
          <Plus className="h-4 w-4" />
          Create
        </Button>
      </div>

      {/* Schedule Grid */}
      {scheduleSlots.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {scheduleSlots.map((slot) => (
            <ScheduleTimeSlot
              key={slot.id}
              slot={slot}
              onEdit={handleEditSlot}
              onDelete={handleDeleteSlot}
            />
          ))}
        </div>
      ) : (
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="text-center">
            <div className="mb-4">
              <svg
                className="mx-auto h-16 w-16 text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 2V5M16 2V5M3.5 9.09H20.5M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-medium text-gray-900">
              No schedule slots yet
            </h3>
            <p className="mb-4 text-sm text-gray-600">
              Create your first schedule slot to start managing your
              availability
            </p>
            <Button onClick={handleCreateSchedule} className="gap-2">
              <Plus className="h-4 w-4" />
              Create Schedule
            </Button>
          </div>
        </div>
      )}
    </motion.div>
  );
}
