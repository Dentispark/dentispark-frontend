"use client";

import { motion } from "framer-motion";
import { PostsSection } from "./posts-section";
import { SuccessStories } from "./success-stories";
import { mockPosts, mockSuccessStories } from "../constants";

export function CommunityHub() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Community Hub Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="space-y-6 lg:col-span-2"
        >
          <PostsSection posts={mockPosts} />
        </motion.div>

        {/* Success Stories Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="hidden space-y-6 md:block"
        >
          <SuccessStories stories={mockSuccessStories} />
        </motion.div>
      </div>
    </motion.div>
  );
}
