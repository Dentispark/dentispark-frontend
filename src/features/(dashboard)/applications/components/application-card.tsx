"use client";

import { cn } from "@/src/lib/utils";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ApplicationCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  backgroundColor: string;
  titleColor: string;
  onClick?: () => void;
}

export function ApplicationCard({
  icon,
  title,
  description,
  backgroundColor,
  titleColor,
  onClick,
}: ApplicationCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${backgroundColor} cursor-pointer rounded-[10px] px-6 py-10 transition-all duration-200 hover:shadow-sm`}
      onClick={onClick}
    >
      <div className="mb-8">{icon}</div>

      <h3 className={cn(titleColor, "mb-2 text-xl font-semibold")}>{title}</h3>

      <p className="font-sora text-sm leading-relaxed text-[#585858]">
        {description}
      </p>
    </motion.div>
  );
}
