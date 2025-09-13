"use client";

import WelcomeSection from "@/src/features/(dashboard)/overview/components/welcome-section";
import PopularResources from "@/src/features/(dashboard)/overview/components/popular-resources";
import PersonalizedMentors from "@/src/features/(dashboard)/overview/components/personalized-mentors";
import CalculatorSidebar from "@/src/features/(dashboard)/overview/components/calculator-sidebar";
import { useAuth } from "@/src/providers/auth-provider";
import { useAcademicProfileQuery } from "@/src/features/(dashboard)/profile";

export default function OverviewPage() {
  const { user } = useAuth();
  const { data } = useAcademicProfileQuery();

  return (
    <div className="min-h-screen">
      <div className="flex flex-col gap-3 border-b py-6 lg:flex-row lg:items-stretch">
        {/* Main Content */}
        <div className="flex w-full flex-col lg:w-[70%]">
          <WelcomeSection
            userName={user?.fullName.split(" ")[0] || ""}
            userYear={` Year ${data?.yearOfStudy} `}
          />
          <PopularResources />
          <PersonalizedMentors />
        </div>

        {/* Sidebar - Hidden on mobile */}
        <div className="hidden lg:flex lg:w-[30%]">
          <CalculatorSidebar className="flex-1" />
        </div>
      </div>
    </div>
  );
}
