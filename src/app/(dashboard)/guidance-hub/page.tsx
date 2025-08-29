"use client";

import GuidanceHubMenu from "@/src/features/(dashboard)/guidance-hub/components/guidance-hub-menu";
import PopularResources from "@/src/features/(dashboard)/overview/components/popular-resources";
import PersonalizedMentors from "@/src/features/(dashboard)/overview/components/personalized-mentors";
import CalculatorSidebar from "@/src/features/(dashboard)/overview/components/calculator-sidebar";

export default function GuidanceHubPage() {
  return (
    <div className="min-h-screen">
      <div className="flex flex-col gap-3 border-b py-6 lg:flex-row lg:items-stretch">
        {/* Main Content */}
        <div className="flex w-full flex-col lg:w-[70%]">
          <GuidanceHubMenu />
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
