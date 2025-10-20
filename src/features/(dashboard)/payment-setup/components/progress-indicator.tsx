"use client";

import { motion } from "framer-motion";

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressIndicator({
  currentStep,
  totalSteps,
}: ProgressIndicatorProps) {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Progress Bar - simple horizontal bar matching screenshot */}
      <div className="w-full max-w-lg">
        <div className="bg-primary-100 h-2 overflow-hidden rounded-full">
          <motion.div
            className="bg-primary h-full rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>
      </div>

      {/* Step Text */}
      <p className="font-sora text-sm text-gray-400">
        Step {currentStep} of {totalSteps}
      </p>
    </div>
  );
}
