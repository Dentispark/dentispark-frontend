"use client";

import { Button } from "@/src/components/ui/button";
import { CompareSchoolsProps } from "../types";

export function CompareSchoolsButton({
  selectedCount = 0,
  onCompare,
}: CompareSchoolsProps) {
  return (
    <Button
      onClick={onCompare}
      className="font-sora flex items-center space-x-2 border border-gray-300 bg-white text-xs text-black transition-colors"
      disabled={selectedCount === 0}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.3984 8.70781L17.4984 5.60779L14.3984 2.50781"
          stroke="#4F4F4F"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2.5 5.60938H17.5"
          stroke="#4F4F4F"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5.59998 11.2891L2.5 14.3891L5.59998 17.4891"
          stroke="#4F4F4F"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17.5 14.3906H2.5"
          stroke="#4F4F4F"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <span>Compare Schools</span>
      {selectedCount > 0 && (
        <span className="bg-primary ml-1 rounded-full px-2 py-0.5 text-xs text-white">
          {selectedCount}
        </span>
      )}
    </Button>
  );
}
