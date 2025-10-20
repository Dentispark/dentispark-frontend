"use client";

import PersonalizedMentors from "@/src/features/(dashboard)/overview/components/personalized-mentors";
import { motion } from "framer-motion";

export default function MentorshipPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto py-4 md:px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6">
            <h1 className="text-black-800 text-2xl font-semibold md:text-2xl">
              Mentorship
            </h1>
          </div>

          <PersonalizedMentors />
        </motion.h1>
      </div>
    </div>
  );
}
