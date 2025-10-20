"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/src/lib/utils";
import { StudentMatchingCard } from "@/src/components/molecules/student-matching-card";
import { MOCK_STUDENTS } from "../constants";
import { FilterTab } from "../types";

interface StudentMatchingPageProps {
  className?: string;
}

export function StudentMatchingPage({ className }: StudentMatchingPageProps) {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<FilterTab>("all");

  const filteredStudents = MOCK_STUDENTS.filter((student) => {
    if (activeFilter === "all") return true;
    return student.category === activeFilter;
  });

  const handleProceed = (studentId: string) => {
    console.log("Proceed with student:", studentId);
    // TODO: Implement proceed logic
  };

  const handleViewProfile = (studentId: string) => {
    router.push(`/mentor/student-matching/${studentId}`);
  };

  return (
    <div className={cn("min-h-screen bg-white py-6", className)}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        {/* Page Header with Filters */}
        <div className="flex items-center justify-between">
          <h1 className="font-sora text-black-800 text-xl font-semibold">
            Student Matching
          </h1>

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

        {/* Students Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 [@media(min-width:1800px)]:grid-cols-4 [@media(min-width:2300px)]:grid-cols-5 [@media(min-width:2800px)]:grid-cols-6">
          {filteredStudents.map((student, index) => (
            <motion.div
              key={student.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <StudentMatchingCard
                student={student}
                onProceed={() => handleProceed(student.id)}
                onViewProfile={() => handleViewProfile(student.id)}
              />
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredStudents.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="flex min-h-[400px] items-center justify-center"
          >
            <div className="text-center">
              <div className="mb-4">
                <svg
                  className="mx-auto h-16 w-16 text-gray-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.16 10.87C9.06 10.86 8.94 10.86 8.83 10.87C6.45 10.79 4.56 8.84 4.56 6.44C4.56 3.99 6.54 2 9 2C11.45 2 13.44 3.99 13.44 6.44C13.43 8.84 11.54 10.79 9.16 10.87ZM16.41 4C18.35 4 19.91 5.57 19.91 7.5C19.91 9.39 18.41 10.93 16.54 11C16.46 10.99 16.37 10.99 16.28 11M4.16 14.56C1.74 16.18 1.74 18.82 4.16 20.43C6.91 22.27 11.42 22.27 14.17 20.43C16.59 18.81 16.59 16.17 14.17 14.56C11.43 12.73 6.92 12.73 4.16 14.56ZM18.34 20C19.06 19.85 19.74 19.56 20.3 19.13C21.86 17.96 21.86 16.03 20.3 14.86C19.75 14.44 19.08 14.16 18.37 14"
                  />
                </svg>
              </div>
              <h3 className="text-black-800 mb-2 text-lg font-semibold">
                No students found
              </h3>
              <p className="text-black-400 text-sm">
                No students match the selected filter
              </p>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
