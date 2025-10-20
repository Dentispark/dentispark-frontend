"use client";

import { useState } from "react";
import { Edit } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { useModal } from "@/src/hooks/use-modal";
import { EditEducationModal } from "./edit-education-modal";
import { EditWorkModal } from "./edit-work-modal";
import { toast } from "sonner";
import Image from "next/image";

export function MentorEducationWork() {
  const { showModal, hideModal } = useModal();

  const [educationData, setEducationData] = useState([
    {
      university: "University of Newcastle",
      degree: "Master's, Psychology",
      period: "2019 - 2022",
      logo: "/images/uni-svg.png",
    },
  ]);

  const [workData, setWorkData] = useState([
    {
      company: "Business Owner",
      position: "Wise Graduate Admission",
      period: "July 2013 - Present",
      logo: "/images/uni-svg.png",
      description: [
        "- Independent graduate admissions consultant specializing in helping students navigate the process of applying to graduate programs in the United States, Canada, the UK, and Europe. My services are customized to meet the specific needs of each client. I work collaboratively throughout the entire process and can advise students on the complete process of applying to graduate school in various areas of study.",
        "- Work at UT Austin on various research-related projects related to mindset and goal setting for college students (2021)",
        "- Presented several classes at UT Austin Dell Medical School Psychiatry (Diverse Psychology program) to increase the representation of underrepresented minorities in areas of psychiatry. (2022-23)",
      ],
    },
  ]);

  const handleEditEducation = () => {
    showModal({
      type: "edit-education",
      modalTitle: "",
      size: "xl",
      isCustomContent: true,
      bodyContent: (
        <EditEducationModal
          onSave={handleSaveEducation}
          onCancel={hideModal}
          initialData={{
            schools: educationData.map((edu) => ({
              school: edu.university,
              fromDate: "",
              toDate: "",
            })),
          }}
        />
      ),
      action: () => {
        // The form submission is handled by the modal component
      },
      actionTitle: "",
    });
  };

  const handleSaveEducation = (data: {
    schools: Array<{ school: string; fromDate: string; toDate: string }>;
  }) => {
    // Update the education data state
    const updatedEducation = data.schools.map((school) => ({
      university: school.school,
      degree: "Master's, Psychology",
      period: `${school.fromDate} - ${school.toDate}`,
      logo: "/images/uni-svg.png",
    }));

    setEducationData(updatedEducation);
    toast.success("Educational information updated successfully!");
    hideModal();
  };

  const handleEditWork = () => {
    showModal({
      type: "edit-work",
      modalTitle: "",
      size: "xl",
      isCustomContent: true,
      bodyContent: (
        <EditWorkModal
          onSave={handleSaveWork}
          onCancel={hideModal}
          initialData={{
            workExperiences: workData.map((work) => ({
              organization: work.company,
              fromDate: "",
              toDate: "",
              description: work.description.join("\n\n"),
            })),
          }}
        />
      ),
      action: () => {},
      actionTitle: "",
    });
  };

  const handleSaveWork = (data: {
    workExperiences: Array<{
      organization: string;
      fromDate: string;
      toDate: string;
      description?: string;
    }>;
  }) => {
    const updatedWork = data.workExperiences.map((work) => ({
      company: work.organization,
      position: "Wise Graduate Admission",
      period: `${work.fromDate} - ${work.toDate}`,
      logo: "/images/uni-svg.png",
      description: work.description ? work.description.split("\n\n") : [],
    }));

    setWorkData(updatedWork);
    toast.success("Work experience updated successfully!");
    hideModal();
  };

  return (
    <div className="rounded-2xl border border-[#F5F5F5] bg-[#FAFAFA] p-8">
      <h2 className="mb-8 border-b pb-2 text-lg font-semibold text-gray-900">
        Education and Work experience
      </h2>

      <div className="mb-8">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="font-sora w-full max-w-4xl border-b pb-2 text-base font-semibold text-gray-900">
            Education
          </h3>
          <Button
            onClick={handleEditEducation}
            className="flex items-center gap-2"
            size="sm"
          >
            <Edit className="h-4 w-4" />
            Edit
          </Button>
        </div>

        <div className="space-y-4">
          {educationData.map((education, index) => (
            <div key={index} className="font-sora flex items-start gap-4">
              <div className="flex-shrink-0">
                <Image
                  src={education.logo}
                  alt={education.university}
                  width={32}
                  height={32}
                  className="h-8 w-8 object-contain"
                />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">
                  {education.university}
                </h4>
                <div className="my-2 flex items-center gap-10">
                  <p className="text-sm text-gray-600">{education.degree}</p>
                  <p className="text-sm text-gray-500">{education.period}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-6 flex items-center justify-between">
          <h3 className="font-sora w-full max-w-4xl border-b pb-2 text-base font-semibold text-gray-900">
            Work experience
          </h3>
          <Button
            onClick={handleEditWork}
            className="flex items-center gap-2"
            size="sm"
          >
            <Edit className="h-4 w-4" />
            Edit
          </Button>
        </div>

        <div className="space-y-6">
          {workData.map((work, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <Image
                  src={work.logo}
                  alt={work.company}
                  width={32}
                  height={32}
                  className="h-8 w-8 object-contain"
                />
              </div>
              <div className="font-sora max-w-4xl flex-1">
                <h4 className="font-semibold text-gray-900">{work.company}</h4>
                <div className="my-2 flex items-center gap-10">
                  <p className="text-sm text-gray-600">{work.position}</p>
                  <p className="text-sm text-gray-500">{work.period}</p>
                </div>

                <div className="space-y-3">
                  {work.description.map((paragraph, paragraphIndex) => (
                    <p
                      key={paragraphIndex}
                      className="text-sm leading-relaxed text-gray-700"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
