"use client";

import { motion } from "framer-motion";

export default function CommunityHubPage() {
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
          <h1 className="text-text-heading mb-2 text-2xl font-bold">
            Community Hub
          </h1>
          <p className="text-text-color">
            Connect with fellow dental students and professionals.
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
          <div className="bg-secondary-100 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
            <svg
              className="text-secondary-700 h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <h2 className="text-text-heading mb-2 text-xl font-semibold">
            Community Hub Content
          </h2>
          <p className="text-text-color">
            This section will contain community features, forums, peer
            connections, and collaborative learning opportunities.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
