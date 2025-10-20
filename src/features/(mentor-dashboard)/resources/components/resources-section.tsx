"use client";

import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { ResourceCard } from "./resource-card";
import { MentorResource } from "../types";

interface ResourcesSectionProps {
  title: string;
  resources: MentorResource[];
  onSeeAll?: () => void;
}

export function ResourcesSection({
  title,
  resources,
  onSeeAll,
}: ResourcesSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-full overflow-hidden"
    >
      {/* Title Section */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-black-800 text-xl font-semibold md:text-2xl">
          {title}
        </h2>
        {onSeeAll && (
          <Button
            variant="ghost"
            onClick={onSeeAll}
            className="text-black-600 hover:text-black-800 flex items-center gap-2 text-sm font-medium"
          >
            <Eye className="h-4 w-4" />
            See all Resources
          </Button>
        )}
      </div>

      {/* Resources Grid */}
      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {resources.map((resource, index) => (
          <ResourceCard key={resource.id} resource={resource} index={index} />
        ))}
      </div>
    </motion.div>
  );
}
