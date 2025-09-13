"use client";

import { motion } from "framer-motion";

import {
  ProfileSettings,
  AcademicProfile,
} from "@/src/features/(dashboard)/profile";

export default function ProfilePage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-5xl space-y-6"
    >
      <ProfileSettings />
      <AcademicProfile />
    </motion.div>
  );
}
