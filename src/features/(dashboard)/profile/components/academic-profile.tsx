"use client";

import { useState } from "react";
import { Edit } from "lucide-react";

import { Button } from "@/src/components/ui/button";
import { useModal } from "@/src/hooks/use-modal";

import { type AcademicFormData } from "../types";
import { defaultAcademicData } from "../constants";
import { AcademicProfileModal } from "./academic-profile-modal";

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
  const [data, setData] = useState<AcademicProfileData>({
    ...defaultAcademicData,
    courseOfInterest: "dental-science",
    ...initialData,
  });
  const { showModal, hideModal } = useModal();

  const handleEditClick = () => {
    showModal({
      modalTitle: "Update Academic Profile",
      bodyContent: (
        <AcademicProfileModal
          initialData={data}
          onSubmit={(formData) => {
            setData(formData);
            hideModal();
          }}
          onCancel={hideModal}
        />
      ),
      action: () => {},
      actionTitle: "",
      type: "academic-profile",
      size: "xl",
      isCustomContent: true, // This prevents wrapping in DialogDescription
    });
  };

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
    </div>
  );
}
