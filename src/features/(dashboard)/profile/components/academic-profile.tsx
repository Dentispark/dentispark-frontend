"use client";

import { useState } from "react";
import { Edit, Loader2 } from "lucide-react";

import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";

import { type AcademicFormData } from "../types";
import { defaultAcademicData } from "../constants";
import { AcademicProfileModal } from "./academic-profile-modal";
import { useAcademicProfileQuery } from "../services";

interface AcademicProfileProps {
  initialData?: Partial<AcademicFormData>;
}

type AcademicProfileData = AcademicFormData & {
  courseOfInterest?:
    | "dental-science"
    | "dental-hygiene-therapy"
    | "dental-nursing";
};

export function AcademicProfile({ initialData }: AcademicProfileProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch academic profile data
  const {
    data: academicProfileData,
    isLoading,
    error,
    refetch,
  } = useAcademicProfileQuery();

  const data: AcademicProfileData = {
    ...defaultAcademicData,
    courseOfInterest: "dental-science",
    ...initialData,
    ...(academicProfileData && {
      yearOfStudy: academicProfileData.yearOfStudy,
      gcseResult: academicProfileData.gcseResult,
      ucatScore: academicProfileData.casperScore || "",
      biologyGrade:
        academicProfileData?.aLevelGrades?.find(
          (grade) => grade.subject.toLowerCase() === "biology",
        )?.grade || "",
      chemistryGrade:
        academicProfileData?.aLevelGrades?.find(
          (grade) => grade.subject.toLowerCase() === "chemistry",
        )?.grade || "",
      otherSubject:
        academicProfileData?.aLevelGrades?.find(
          (grade) =>
            !["biology", "chemistry"].includes(grade.subject.toLowerCase()),
        )?.subject || "",
      otherSubjectGrade:
        academicProfileData?.aLevelGrades?.find(
          (grade) =>
            !["biology", "chemistry"].includes(grade.subject.toLowerCase()),
        )?.grade || "",
    }),
  };

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = () => {
    setIsModalOpen(false);
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="mx-auto max-w-4xl bg-white pb-16">
        <div className="flex items-center justify-center p-8">
          <Loader2 className="text-primary h-8 w-8 animate-spin" />
          <span className="ml-2 text-gray-600">
            Loading academic profile...
          </span>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="mx-auto max-w-4xl bg-white pb-16">
        <div className="p-6">
          <div className="rounded-md bg-red-50 p-4">
            <div className="text-sm text-red-700">
              Failed to load academic profile: {error.message}
            </div>
            <Button
              onClick={() => refetch()}
              className="mt-2"
              size="sm"
              variant="outline"
            >
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl bg-white pb-16">
      <div className="flex items-center justify-between px-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Academic Profile
        </h2>
        <Button
          onClick={handleEditClick}
          className="flex items-center gap-2"
          size="sm"
        >
          <Edit className="h-4 w-4" />
          Edit
        </Button>
      </div>

      <div className="max-w-3xl p-3 pb-8 md:p-6">
        <div className="space-y-8">
          <div className="grid gap-6 sm:grid-cols-3">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Year of study
              </label>
              <div className="border-greys-300 bg-white-100 mt-1 flex h-12 items-center rounded-md border px-3 text-sm">
                {data.yearOfStudy}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                GCSE Result
              </label>
              <div className="border-greys-300 bg-white-100 mt-1 flex h-12 items-center rounded-md border px-3 text-sm">
                {data.gcseResult}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                UCAT Score
              </label>
              <div className="border-greys-300 bg-white-100 mt-1 flex h-12 items-center rounded-md border px-3 text-sm">
                {data.ucatScore || "Not provided"}
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-base font-medium text-gray-900">
              What are your achieved/predicted A-Level grades?
            </h3>
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Biology
                </label>
                <div className="border-greys-300 bg-white-100 mt-1 flex h-12 items-center rounded-md border px-3 text-sm">
                  {data.biologyGrade}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Chemistry
                </label>
                <div className="border-greys-300 bg-white-100 mt-1 flex h-12 items-center rounded-md border px-3 text-sm">
                  {data.chemistryGrade}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Other subject
                </label>
                <div className="border-greys-300 bg-white-100 mt-1 flex h-12 items-center rounded-md border px-3 text-sm">
                  {data.otherSubject || "Not specified"}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Subject grade
                </label>
                <div className="border-greys-300 bg-white-100 mt-1 flex h-12 items-center rounded-md border px-3 text-sm">
                  {data.otherSubjectGrade || "Not specified"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="mx-auto max-h-[95vh] max-w-2xl overflow-hidden p-0 sm:max-h-[90vh]">
          <div className="flex h-full max-h-[calc(95vh-2rem)] flex-col sm:max-h-[calc(90vh-4rem)]">
            <DialogHeader className="flex-shrink-0 border-b px-4 py-4 sm:px-6">
              <DialogTitle className="text-lg font-semibold">
                Update Academic Profile
              </DialogTitle>
            </DialogHeader>
            <div className="hidden-scrollbar flex-1 touch-pan-y overflow-y-auto overscroll-contain px-4 py-4 sm:px-6">
              <AcademicProfileModal
                initialData={data}
                onSubmit={handleSubmit}
                onCancel={handleModalClose}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
