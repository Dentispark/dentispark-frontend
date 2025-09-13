"use client";

import { motion } from "framer-motion";

export default function MentorshipPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center text-4xl font-bold text-gray-900"
        >
          Mentorship
        </motion.h1>
      </div>
    </div>
  );
}
