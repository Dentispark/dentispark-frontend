"use client";

import { Breadcrumb } from "@/src/components/ui/breadcrumb";
import AllPersonalizedMentors from "@/src/features/(dashboard)/overview/components/all-personalized-mentors";

export default function PersonalizedMentorsPage() {
  const breadcrumbItems = [
    { label: "Overview", href: "/overview" },
    { label: "Personalized Mentors", isActive: true },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden">
      <div className="border-b py-6">
        <div className="mb-6">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        <div className="w-full max-w-full overflow-hidden">
          <AllPersonalizedMentors />
        </div>
      </div>
    </div>
  );
}
