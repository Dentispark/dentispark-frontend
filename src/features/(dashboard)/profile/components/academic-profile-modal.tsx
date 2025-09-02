"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

import { Button } from "@/src/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";

import { academicSchema } from "../types";
import {
  yearOptions,
  gradeOptions,
  gcseOptions,
  defaultAcademicData,
} from "../constants";
import { profileApi } from "../services";

// Extended schema to include course of interest
const academicModalSchema = academicSchema.extend({
  courseOfInterest: z.enum(
    ["dental-science", "dental-hygiene-therapy", "dental-nursing"],
    {
      required_error: "Please select a course of interest",
    },
  ),
});

type AcademicModalFormData = z.infer<typeof academicModalSchema>;

interface AcademicProfileModalProps {
  initialData?: Partial<AcademicModalFormData>;
  onSubmit: (data: AcademicModalFormData) => void;
  onCancel: () => void;
}

export function AcademicProfileModal({
  initialData,
  onSubmit,
  onCancel,
}: AcademicProfileModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<AcademicModalFormData>({
    resolver: zodResolver(academicModalSchema),
    defaultValues: {
      ...defaultAcademicData,
      courseOfInterest: "dental-science",
      ...initialData,
    },
  });

  const handleSubmit = async (data: AcademicModalFormData) => {
    setIsSubmitting(true);
    try {
      await profileApi.updateAcademicProfile(data);
      onSubmit(data);
      toast.success("Academic profile updated successfully!");
    } catch {
      toast.error("Failed to update academic profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 pb-6">
      <Form {...form}>
        <form
          id="academic-profile-form"
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-6"
        >
          {/* Year of Study and GCSE Result */}
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="yearOfStudy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Year of study
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="h-12 w-full">
                        <SelectValue placeholder="Select your grade" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {yearOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
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
              name="gcseResult"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    GCSE Result
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="h-12 w-full">
                        <SelectValue placeholder="Select your grade" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {gcseOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* A-Level Grades Section */}
          <div className="space-y-4">
            <h3 className="text-base font-medium text-gray-900">
              What are your achieved/predicted A-Level grades?
            </h3>

            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="biologyGrade"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Biology
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="h-12 w-full">
                          <SelectValue placeholder="Select your grade" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {gradeOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
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
                name="chemistryGrade"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Chemistry
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="h-12 w-full">
                          <SelectValue placeholder="Select your grade" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {gradeOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
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
                name="otherSubject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Other subject
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="h-12 w-full">
                          <SelectValue placeholder="Select other subject" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Mathematics">Mathematics</SelectItem>
                        <SelectItem value="Physics">Physics</SelectItem>
                        <SelectItem value="Psychology">Psychology</SelectItem>
                        <SelectItem value="English">English</SelectItem>
                        <SelectItem value="History">History</SelectItem>
                        <SelectItem value="Geography">Geography</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="otherSubjectGrade"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Subject grade
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="h-12 w-full">
                          <SelectValue placeholder="Select your grade" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {gradeOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Course of Interest Section */}
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="courseOfInterest"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium text-gray-900">
                    What is your course of interest?
                  </FormLabel>
                  <div className="mb-4 text-sm text-gray-600">
                    Choose only 1 answer:
                  </div>
                  <FormControl>
                    <div className="space-y-3">
                      <div
                        className={`flex cursor-pointer items-center space-x-3 rounded-lg border p-4 transition-colors ${
                          field.value === "dental-science"
                            ? "border-primary-200 bg-primary-100"
                            : "border-gray-200 bg-white hover:border-gray-300"
                        }`}
                        onClick={() => field.onChange("dental-science")}
                      >
                        <input
                          type="radio"
                          id="dental-science"
                          name="courseOfInterest"
                          value="dental-science"
                          checked={field.value === "dental-science"}
                          onChange={() => field.onChange("dental-science")}
                          className="radio-green size-5"
                        />
                        <label
                          htmlFor="dental-science"
                          className="flex-1 cursor-pointer font-medium text-gray-900"
                        >
                          Dental Science
                        </label>
                      </div>

                      <div
                        className={`flex cursor-pointer items-center space-x-3 rounded-lg border p-4 transition-colors ${
                          field.value === "dental-hygiene-therapy"
                            ? "border-primary-200 bg-primary-100"
                            : "border-gray-200 bg-white hover:border-gray-300"
                        }`}
                        onClick={() => field.onChange("dental-hygiene-therapy")}
                      >
                        <input
                          type="radio"
                          id="dental-hygiene-therapy"
                          name="courseOfInterest"
                          value="dental-hygiene-therapy"
                          checked={field.value === "dental-hygiene-therapy"}
                          onChange={() =>
                            field.onChange("dental-hygiene-therapy")
                          }
                          className="radio-green size-5"
                        />
                        <label
                          htmlFor="dental-hygiene-therapy"
                          className="flex-1 cursor-pointer font-medium text-gray-900"
                        >
                          Dental Hygiene/Therapy
                        </label>
                      </div>

                      <div
                        className={`flex cursor-pointer items-center space-x-3 rounded-lg border p-4 transition-colors ${
                          field.value === "dental-nursing"
                            ? "border-primary-200 bg-primary-100"
                            : "border-gray-200 bg-white hover:border-gray-300"
                        }`}
                        onClick={() => field.onChange("dental-nursing")}
                      >
                        <input
                          type="radio"
                          id="dental-nursing"
                          name="courseOfInterest"
                          value="dental-nursing"
                          checked={field.value === "dental-nursing"}
                          onChange={() => field.onChange("dental-nursing")}
                          className="radio-green size-5"
                        />
                        <label
                          htmlFor="dental-nursing"
                          className="flex-1 cursor-pointer font-medium text-gray-900"
                        >
                          Dental Nursing
                        </label>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex w-full gap-3 pt-6">
            <Button
              type="button"
              variant="outline"
              className="hover:text-primary h-12 flex-1/2 px-8 hover:bg-white"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-primary hover:bg-primary-700 h-12 flex-1/2 px-8"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Updating Profile" : "Update Profile"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
