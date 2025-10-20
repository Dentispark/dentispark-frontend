"use client";

import { useState } from "react";
import { Edit } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { useAuth } from "@/src/providers/auth-provider";
import { useModal } from "@/src/hooks/use-modal";
import { EditPersonalInfoModal } from "./edit-personal-info-modal";
import { toast } from "sonner";

export function MentorPersonalInformation() {
  const { user } = useAuth();
  const { showModal, hideModal } = useModal();

  // Sample data matching the screenshot
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "Sara",
    lastName: "Barrywhite",
    email: user?.emailAddress || "johndoe@dentispark.co.uk",
    phone: "+41 1234567",
    aboutMe: `With ten years of experience in graduate admissions at Stanford University's School of Engineering and School of Education, I can provide valuable insight into the application and review process. I am here to address your concerns and answer your questions about applying to graduate school.

Since 2013, I have worked as a professional graduate admission consultant and coach, specializing in helping navigate the application process for programs in the

Why do I mentor?
I mentor students to bring clarity and purpose to the graduate application process. My goal is to help as many individuals as possible achieve their academic objectives. I am passionate about empowering students to discover their full potential, build self-confidence, and enhance their communication skills.`,
  });

  const handleEditClick = () => {
    showModal({
      type: "edit-personal-info",
      modalTitle: "Edit personal information",
      size: "xl",
      isCustomContent: true,
      bodyContent: (
        <EditPersonalInfoModal
          onSave={handleSave}
          onCancel={hideModal}
          initialData={{
            firstName: personalInfo.firstName,
            lastName: personalInfo.lastName,
            emailAddress: personalInfo.email,
            phoneNumber: personalInfo.phone,
            aboutMe: personalInfo.aboutMe,
          }}
        />
      ),
      action: () => {
        // The form submission is handled by the modal component
      },
      actionTitle: "",
    });
  };

  const handleSave = (data: {
    firstName: string;
    lastName: string;
    emailAddress: string;
    phoneNumber: string;
    aboutMe?: string;
    whyDoIMentor?: string;
    countryCode?: string;
  }) => {
    // Update the personal info state
    setPersonalInfo({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.emailAddress,
      phone: data.phoneNumber,
      aboutMe:
        (data.aboutMe || "") +
        (data.whyDoIMentor ? `\n\nWhy do I mentor?\n${data.whyDoIMentor}` : ""),
    });

    toast.success("Personal information updated successfully!");
    hideModal();
  };

  return (
    <div className="rounded-2xl border border-[#F5F5F5] bg-[#FAFAFA] p-8">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-sora text-lg font-semibold text-gray-900">
          Personal information
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

      {/* Form Fields */}
      <div className="space-y-6">
        {/* Name and Contact Row */}
        <div className="grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-4">
          <div>
            <label className="font-sora mb-1 block text-xs font-medium text-[#737373]">
              First name
            </label>
            <div className="font-sora text-gray-900">
              {personalInfo.firstName}
            </div>
          </div>
          <div>
            <label className="font-sora mb-1 block text-xs font-medium text-[#737373]">
              Last name
            </label>
            <div className="font-sora text-gray-900">
              {personalInfo.lastName}
            </div>
          </div>
          <div>
            <label className="font-sora mb-1 block text-xs font-medium text-[#737373]">
              Email address
            </label>
            <div className="font-sora text-gray-900">{personalInfo.email}</div>
          </div>
          <div>
            <label className="font-sora mb-1 block text-xs font-medium text-[#737373]">
              Phone number
            </label>
            <div className="font-sora text-gray-900">{personalInfo.phone}</div>
          </div>
        </div>

        {/* About Me Section */}
        <div>
          <label className="font-sora mb-1 block text-xs font-medium text-[#737373]">
            About me
          </label>
          <div className="max-w-4xl text-sm leading-relaxed text-gray-700">
            {personalInfo.aboutMe.split("\n\n").map((paragraph, index) => (
              <p key={index} className="font-sora mb-4 last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
