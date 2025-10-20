"use client";

import { MentorProfileSettingsHeader } from "@/src/features/(mentor-dashboard)/profile-settings/components/mentor-profile-settings-header";
import { MentorPersonalInformation } from "@/src/features/(mentor-dashboard)/profile-settings/components/mentor-personal-information";
import { MentorEducationWork } from "@/src/features/(mentor-dashboard)/profile-settings/components/mentor-education-work";

export default function ProfileSettingsPage() {
  return (
    <div className="space-y-6 py-6">
      <h1 className="text-2xl font-semibold text-gray-900">Profile settings</h1>
      <div className="mx-auto max-w-6xl space-y-6">
        <MentorProfileSettingsHeader />
        <MentorPersonalInformation />
        <MentorEducationWork />
      </div>
    </div>
  );
}
