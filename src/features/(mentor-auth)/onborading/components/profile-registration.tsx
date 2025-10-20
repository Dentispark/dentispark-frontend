"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Clock,
  Calendar,
  Globe,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/src/components/ui/button";
import { Checkbox } from "@/src/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/src/components/ui/radio-group";
import { Textarea } from "@/src/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { useModal } from "@/src/hooks/use-modal";
import { DocumentUploadModal } from "@/src/features/(dashboard)/applications/components/document-upload-modal";
import {
  type OnboardingFormProps,
  type ProfileVerificationData,
  type DocumentUploadState,
  type UploadedFile,
  EXPERTISE_AREAS,
  TIME_SLOTS,
  DAYS_OF_WEEK,
  MONTHS,
} from "../types";
import { cn } from "@/src/lib/utils";

// Form validation schema
const profileVerificationSchema = z.object({
  expertiseArea: z.string().min(1, "Please select an expertise area"),
  experienceWithUKDentalAdmissions: z
    .string()
    .min(10, "Please provide at least 10 characters")
    .max(500, "Experience description must not exceed 500 characters"),
  selectedDate: z.date().optional(),
  selectedTime: z.string().optional(),
  agreeToDataProcessing: z.boolean().refine((val) => val === true, {
    message: "You must agree to data processing for vetting and DBS/PVG checks",
  }),
});

type ProfileVerificationFormData = z.infer<typeof profileVerificationSchema>;

export function ProfileRegistration({
  onNextAction,
  onBackAction,
  initialData,
  isLoading = false,
}: OnboardingFormProps) {
  const { showModal, hideModal } = useModal();
  const [uploadedFiles, setUploadedFiles] = useState<DocumentUploadState>({});
  const [currentMonth, setCurrentMonth] = useState(new Date()); // Use current date
  const [tempSelectedDate, setTempSelectedDate] = useState<Date | null>(null);

  const data = initialData as ProfileVerificationData | undefined;

  const form = useForm<ProfileVerificationFormData>({
    resolver: zodResolver(profileVerificationSchema),
    defaultValues: {
      expertiseArea: data?.expertiseArea || "",
      experienceWithUKDentalAdmissions:
        data?.experienceWithUKDentalAdmissions || "",
      selectedDate: data?.interviewScheduling?.selectedDate || new Date(),
      selectedTime: data?.interviewScheduling?.selectedTime || "",
      agreeToDataProcessing:
        data?.interviewScheduling?.agreeToDataProcessing || false,
    },
  });

  const watchedExperience = form.watch("experienceWithUKDentalAdmissions");
  const characterCount = watchedExperience?.length || 0;

  const openUploadModal = (documentType: string) => {
    showModal({
      modalTitle: "",
      bodyContent: (
        <DocumentUploadModal
          documentType={documentType}
          onCancel={hideModal}
          onConfirm={(file: File) => {
            const uploadedFile: UploadedFile = {
              name: file.name,
              uploadedAt: new Date(),
              size: file.size,
            };

            setUploadedFiles((prev) => ({
              ...prev,
              [getDocumentKey(documentType)]: uploadedFile,
            }));

            hideModal();
            toast.success(`${documentType} uploaded successfully!`);
          }}
        />
      ),
      action: () => {},
      actionTitle: "",
      className: "rounded-[18px]",
      secondaryAction: hideModal,
      secondaryActionTitle: "Cancel",
      type: "document-upload",
      size: "lg",
      isCustomContent: true,
    });
  };

  const getDocumentKey = (documentType: string): keyof DocumentUploadState => {
    switch (documentType) {
      case "Curriculum Vitae":
        return "curriculumVitae";
      case "Certifications":
        return "certifications";
      case "DBS/PVG proof":
        return "dbsPvgProof";
      case "Recommendation letters":
        return "recommendationLetters";
      default:
        return "curriculumVitae";
    }
  };

  const removeUploadedFile = (documentType: string) => {
    const key = getDocumentKey(documentType);
    setUploadedFiles((prev) => ({
      ...prev,
      [key]: undefined,
    }));
    toast.success(`${documentType} removed successfully!`);
  };

  const onSubmit = async (data: ProfileVerificationFormData) => {
    try {
      const profileData: ProfileVerificationData = {
        documents: {
          curriculumVitae: uploadedFiles.curriculumVitae
            ? new File([], uploadedFiles.curriculumVitae.name)
            : undefined,
          certifications: uploadedFiles.certifications
            ? new File([], uploadedFiles.certifications.name)
            : undefined,
          dbsPvgProof: uploadedFiles.dbsPvgProof
            ? new File([], uploadedFiles.dbsPvgProof.name)
            : undefined,
          recommendationLetters: uploadedFiles.recommendationLetters
            ? new File([], uploadedFiles.recommendationLetters.name)
            : undefined,
        },
        expertiseArea: data.expertiseArea,
        experienceWithUKDentalAdmissions: data.experienceWithUKDentalAdmissions,
        interviewScheduling: {
          selectedDate: data.selectedDate,
          selectedTime: data.selectedTime,
          agreeToDataProcessing: data.agreeToDataProcessing,
        },
      };

      onNextAction(profileData);
      toast.success("Profile verification completed successfully!");
    } catch (error) {
      console.error("Profile verification error:", error);
      toast.error("Failed to save profile verification. Please try again.");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const DocumentUploadCard = ({
    title,
    uploadedFile,
  }: {
    title: string;
    uploadedFile?: UploadedFile;
    isRequired?: boolean;
  }) => (
    <div className="space-y-3">
      <h4 className="font-sora text-sm font-medium text-gray-900">{title}</h4>

      <div className="flex items-center space-x-3">
        {/* File Display Area */}
        <div
          className={cn(
            "flex flex-1 items-center space-x-3 rounded-lg border border-gray-300 bg-white px-4 py-3",
            uploadedFile && "py-2",
          )}
        >
          {uploadedFile ? (
            <div className="bg-primary-100 flex items-center rounded-full p-1.5">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10.5 11.5V14.5L11.5 13.5" fill="#12AC75" />
                <path
                  d="M10.5 11.5V14.5L11.5 13.5"
                  stroke="#12AC75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10.5 14.5L9.5 13.5"
                  stroke="#12AC75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M17 11V13.5C17 16 16 17 13.5 17H10.5C8 17 7 16 7 13.5V10.5C7 8 8 7 10.5 7H13"
                  stroke="#12AC75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M17 11H15C13.5 11 13 10.5 13 9V7L17 11Z"
                  stroke="#12AC75"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span className="font-sora flex-1 text-xs text-gray-900">
                {uploadedFile.name}
              </span>
              <button
                onClick={() => removeUploadedFile(title)}
                className="flex-shrink-0 text-gray-400 hover:text-gray-600"
              >
                <X className="ml-4 h-4 w-4 text-black" />
              </button>
            </div>
          ) : (
            <span className="font-sora text-sm text-gray-500">
              Upload your document
            </span>
          )}
        </div>

        {/* Upload Button */}
        <Button
          type="button"
          onClick={() => openUploadModal(title)}
          className="flex h-11 items-center space-x-2 px-4"
          disabled={isLoading}
        >
          <span className="font-sora text-xs text-white">Upload</span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.49998 14.1665V9.1665L5.83331 10.8332"
              stroke="#FEFEFE"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7.5 9.1665L9.16667 10.8332"
              stroke="#FEFEFE"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M18.3334 8.33317V12.4998C18.3334 16.6665 16.6667 18.3332 12.5 18.3332H7.50002C3.33335 18.3332 1.66669 16.6665 1.66669 12.4998V7.49984C1.66669 3.33317 3.33335 1.6665 7.50002 1.6665H11.6667"
              stroke="#FEFEFE"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M18.3334 8.33317H15C12.5 8.33317 11.6667 7.49984 11.6667 4.99984V1.6665L18.3334 8.33317Z"
              stroke="#FEFEFE"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Button>
      </div>

      <p className="font-sora text-xs text-gray-500">Upload a PDF under 5MB</p>
    </div>
  );

  // Calendar utilities
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentMonth((prev) => {
      const newMonth = new Date(prev);
      if (direction === "prev") {
        newMonth.setMonth(prev.getMonth() - 1);
      } else {
        newMonth.setMonth(prev.getMonth() + 1);
      }
      return newMonth;
    });
  };

  const selectDate = (day: number) => {
    const selectedDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day,
    );
    setTempSelectedDate(selectedDate);
  };

  const isDateSelected = (day: number) => {
    // Check temporary selection first, then fall back to form value
    const dateToCheck = tempSelectedDate || form.watch("selectedDate");
    if (!dateToCheck) return false;

    return (
      dateToCheck.getDate() === day &&
      dateToCheck.getMonth() === currentMonth.getMonth() &&
      dateToCheck.getFullYear() === currentMonth.getFullYear()
    );
  };

  const handleApplyDate = () => {
    if (tempSelectedDate) {
      form.setValue("selectedDate", tempSelectedDate);
      toast.success("Date selected successfully!");
    }
  };

  const handleCancelDate = () => {
    setTempSelectedDate(null);
  };

  const formatSelectedDate = () => {
    const selectedDate = form.watch("selectedDate");
    if (!selectedDate) return "Select a date";

    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "Jan.",
      "Feb.",
      "Mar.",
      "Apr.",
      "May",
      "Jun.",
      "Jul.",
      "Aug.",
      "Sep.",
      "Oct.",
      "Nov.",
      "Dec.",
    ];

    const dayName = daysOfWeek[selectedDate.getDay()];
    const monthName = months[selectedDate.getMonth()];
    const year = selectedDate.getFullYear();

    return `${dayName}, ${monthName} ${year}`;
  };

  return (
    <motion.div
      className="mx-auto max-w-2xl"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
          {/* Document Upload Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2 text-xl">
              <span className="text-primary font-semibold">1.</span>
              <h2 className="text-primary font-semibold">Document Upload</h2>
            </div>

            <div className="space-y-6">
              <DocumentUploadCard
                title="Curriculum Vitae"
                uploadedFile={uploadedFiles.curriculumVitae}
                isRequired
              />

              <DocumentUploadCard
                title="Certifications"
                uploadedFile={uploadedFiles.certifications}
              />

              <DocumentUploadCard
                title="DBS/PVG proof"
                uploadedFile={uploadedFiles.dbsPvgProof}
              />

              <DocumentUploadCard
                title="Recommendation letters"
                uploadedFile={uploadedFiles.recommendationLetters}
              />
            </div>
          </div>

          {/* Expertise Details Section */}
          <div className="space-y-0">
            <div className="flex items-center space-x-2 text-xl">
              <span className="text-primary font-semibold">2.</span>
              <h2 className="text-primary font-semibold">Expertise Details</h2>
            </div>

            {/* Expertise Areas */}
            <FormField
              control={form.control}
              name="expertiseArea"
              render={({ field }) => (
                <FormItem className="my-6">
                  <FormLabel className="mb-2 text-sm font-medium text-gray-900">
                    Expertise areas
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-wrap gap-4"
                      disabled={isLoading}
                    >
                      {EXPERTISE_AREAS.map((area) => (
                        <div
                          key={area.value}
                          className="flex items-center space-x-2"
                        >
                          <RadioGroupItem
                            value={area.value}
                            id={area.value}
                            className="border-gray-300"
                          />
                          <label
                            htmlFor={area.value}
                            className="cursor-pointer text-sm font-normal"
                          >
                            {area.label}
                          </label>
                        </div>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Experience with UK dental admissions */}
            <FormField
              control={form.control}
              name="experienceWithUKDentalAdmissions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-sora text-sm font-medium text-gray-900">
                    Experience with UK dental admissions or underprivileged
                    students
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Share your experience here"
                      className="min-h-[120px] resize-none"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <div className="flex justify-between">
                    <FormMessage />
                    <p className="font-sora text-xs text-gray-500">
                      Word count: {characterCount}/500
                    </p>
                  </div>
                </FormItem>
              )}
            />
          </div>

          {/* Interview Scheduling Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2 text-xl">
              <span className="text-primary font-semibold">3.</span>
              <h2 className="text-primary font-semibold">
                Interview Scheduling
              </h2>
            </div>

            <div className="grid grid-cols-3">
              <div className="col-span-2 space-y-10">
                {/* Meeting Info */}
                <div className="font-sora mt-4 space-y-4">
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900">
                      Zoom meeting
                    </h3>
                    <p className="font-sora text-xs text-gray-400">
                      With Dentispark team
                    </p>
                  </div>

                  <div className="flex flex-col space-y-2 space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span>15 min</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span>
                        Web conferencing details provided upon confirmation.
                      </span>
                    </div>
                  </div>
                </div>

                {/* Date & Time Selection */}
                <div className="mt-20 mr-8 grid">
                  {/* Calendar */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-gray-900">
                      Select a Date & Time
                    </h4>

                    <div className="rounded-4xl border border-gray-200 p-4">
                      {/* Calendar Header */}
                      <div className="mb-4 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => navigateMonth("prev")}
                          className="hover:bg-primary-100 rounded-full p-2"
                        >
                          <ChevronLeft className="size-6" />
                        </button>
                        <h5 className="font-semibold">
                          {MONTHS[currentMonth.getMonth()]}{" "}
                          {currentMonth.getFullYear()}
                        </h5>
                        <button
                          type="button"
                          onClick={() => navigateMonth("next")}
                          className="hover:bg-primary-100 rounded-full p-2"
                        >
                          <ChevronRight className="size-6" />
                        </button>
                      </div>

                      {/* Calendar Grid */}
                      <div className="mb-2 grid grid-cols-7 gap-1">
                        {DAYS_OF_WEEK.map((day) => (
                          <div
                            key={day.key}
                            className="py-2 text-center text-xs font-semibold text-black"
                          >
                            {day.label}
                          </div>
                        ))}
                      </div>

                      <div className="grid grid-cols-7 gap-1">
                        {generateCalendarDays().map((day, index) => (
                          <button
                            key={`calendar-day-${index}-${day || "empty"}`}
                            type="button"
                            onClick={() => day && selectDate(day)}
                            disabled={!day}
                            className={cn(
                              "flex h-8 w-8 items-center justify-center rounded-full text-sm",
                              day ? "hover:bg-gray-100" : "",
                              isDateSelected(day || 0)
                                ? "bg-primary text-white"
                                : "",
                              !day ? "cursor-not-allowed" : "cursor-pointer",
                            )}
                          >
                            {day}
                          </button>
                        ))}
                      </div>

                      {/* Apply/Cancel Buttons */}
                      <div className="border-greys-300 mt-4 flex space-x-2 border-t pt-4">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={handleCancelDate}
                          className="h-10 flex-1 rounded-full"
                        >
                          Cancel
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          onClick={handleApplyDate}
                          className="h-10 flex-1 rounded-full"
                        >
                          Apply
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Timezone */}
                <div className="mt-4 pt-4">
                  <span className="font-sora text-sm">Time zone</span>
                  <div className="font-sora mt-2 flex items-center space-x-2 text-xs text-gray-600">
                    <Globe size="16" /> <span>United Kingdom (GMT+1)</span>
                  </div>
                </div>
              </div>

              {/* Time Slots */}
              <div className="space-y-4 border-l border-gray-200 pl-8">
                <div className="text-right">
                  <p className="font-sora text-center text-sm text-gray-900">
                    {formatSelectedDate()}
                  </p>
                </div>

                <div className="space-y-2 overflow-y-auto">
                  {TIME_SLOTS.map((time) => (
                    <FormField
                      key={time}
                      control={form.control}
                      name="selectedTime"
                      render={({ field }) => (
                        <button
                          type="button"
                          onClick={() => field.onChange(time)}
                          className={cn(
                            "border-primary-200 w-full rounded-lg border p-3 text-center",
                            field.value === time
                              ? "border-gray-200 bg-gray-50"
                              : "",
                          )}
                        >
                          <span
                            className={cn(
                              "text-primary text-sm font-medium",
                              field.value === time && "text-gray-300",
                            )}
                          >
                            {time}
                          </span>
                        </button>
                      )}
                    />
                  ))}
                </div>

                <Button type="button" className="mt-4 w-full rounded-full">
                  Book
                </Button>
              </div>
            </div>

            {/* Data Processing Agreement */}
            <FormField
              control={form.control}
              name="agreeToDataProcessing"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-y-0 space-x-3">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isLoading}
                      className="mt-1"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="font-sora text-sm font-normal">
                      I agree to data processing for vetting and{" "}
                      <a
                        href="/terms"
                        className="text-primary underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        DBS/PVG
                      </a>{" "}
                      checks
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between pt-6">
            {onBackAction && (
              <Button
                type="button"
                variant="outline"
                onClick={onBackAction}
                disabled={isLoading}
                className="px-8 py-3"
              >
                Back
              </Button>
            )}
            <Button
              type="submit"
              disabled={isLoading}
              className="ml-auto px-8 py-3"
            >
              {isLoading ? "Saving..." : "Continue"}
            </Button>
          </div>
        </form>
      </Form>
    </motion.div>
  );
}
