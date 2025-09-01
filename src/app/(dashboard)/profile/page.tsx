"use client";

import { motion } from "framer-motion";

export default function ProfilePage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="border-greys-300 rounded-lg border bg-white p-6 shadow-sm">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <h1 className="text-text-heading mb-2 text-2xl font-bold">Profile</h1>
          <p className="text-text-color">
            Manage your account settings and preferences.
          </p>
        </motion.div>
      </div>

      {/* Placeholder content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="border-greys-300 rounded-lg border bg-white p-8 text-center shadow-sm"
      >
        <div className="mx-auto max-w-md">
          <div className="bg-tertiary-100 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
            <svg
              className="text-tertiary-700 h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <h2 className="text-text-heading mb-2 text-xl font-semibold">
            Profile Content
          </h2>
          <p className="text-text-color">
            This section will contain user profile management, settings,
            preferences, and account information.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
