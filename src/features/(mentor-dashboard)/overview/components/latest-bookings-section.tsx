"use client";

import { useState } from "react";
import { cn } from "@/src/lib/utils";
import { StudentMatchingCard } from "@/src/components/molecules/student-matching-card";

interface Student {
  id: string;
  name: string;
  year: string;
  avatar: string;
  preferredSchool: string;
  ucatScore: string;
  aLevelScore: string;
  category: "all" | "personal-statement" | "ucat";
}

interface LatestBookingsSectionProps {
  className?: string;
}

const SAMPLE_STUDENTS: Student[] = [
  {
    id: "1",
    name: "Daniel Sarabia",
    year: "Year 12",
    avatar: "/images/latest-booking.png",
    preferredSchool: "Bristol University",
    ucatScore: "2640",
    aLevelScore: "AAA",
    category: "all",
  },
  {
    id: "2",
    name: "Daniel Sarabia",
    year: "Year 12",
    avatar: "/images/latest-booking.png",
    preferredSchool: "Bristol University",
    ucatScore: "2640",
    aLevelScore: "AAA",
    category: "personal-statement",
  },
  {
    id: "3",
    name: "Daniel Sarabia",
    year: "Year 12",
    avatar: "/images/latest-booking.png",
    preferredSchool: "Bristol University",
    ucatScore: "2640",
    aLevelScore: "AAA",
    category: "ucat",
  },
  {
    id: "4",
    name: "Daniel Sarabia",
    year: "Year 12",
    avatar: "/images/latest-booking.png",
    preferredSchool: "Bristol University",
    ucatScore: "2640",
    aLevelScore: "AAA",
    category: "all",
  },
];

type FilterTab = "all" | "personal-statement" | "ucat";

export function LatestBookingsSection({
  className,
}: LatestBookingsSectionProps) {
  const [activeFilter, setActiveFilter] = useState<FilterTab>("all");

  const filteredStudents = SAMPLE_STUDENTS.filter((student) => {
    if (activeFilter === "all") return true;
    return student.category === activeFilter;
  });

  const handleProceed = (studentId: string) => {
    console.log("Proceed with student:", studentId);
    // TODO: Implement proceed logic
  };

  const handleViewProfile = (studentId: string) => {
    console.log("View profile for student:", studentId);
    // TODO: Implement view profile logic
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-sora text-black-800 text-xl font-semibold">
          Latest bookings
        </h2>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveFilter("all")}
            className={cn(
              "font-sora rounded-lg px-4 py-2 text-sm font-medium transition-colors",
              activeFilter === "all"
                ? "bg-greys-300 text-black-800"
                : "bg-greys-100 text-black-600 hover:bg-greys-200",
            )}
          >
            All
          </button>
          <button
            onClick={() => setActiveFilter("personal-statement")}
            className={cn(
              "font-sora rounded-lg px-4 py-2 text-sm font-medium transition-colors",
              activeFilter === "personal-statement"
                ? "bg-greys-300 text-black-800"
                : "bg-greys-100 text-black-600 hover:bg-greys-200",
            )}
          >
            Personal Statement
          </button>
          <button
            onClick={() => setActiveFilter("ucat")}
            className={cn(
              "font-sora rounded-lg px-4 py-2 text-sm font-medium transition-colors",
              activeFilter === "ucat"
                ? "bg-greys-300 text-black-800"
                : "bg-greys-100 text-black-600 hover:bg-greys-200",
            )}
          >
            UCAT
          </button>
        </div>
      </div>

      {/* Bookings Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 [@media(min-width:1800px)]:grid-cols-4 [@media(min-width:2300px)]:grid-cols-5 [@media(min-width:2800px)]:grid-cols-6">
        {filteredStudents.map((student) => (
          <StudentMatchingCard
            key={student.id}
            student={student}
            onProceed={() => handleProceed(student.id)}
            onViewProfile={() => handleViewProfile(student.id)}
          />
        ))}
      </div>
    </div>
  );
}
