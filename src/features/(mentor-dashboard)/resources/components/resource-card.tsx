"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ResourceCardProps } from "../types";

export function ResourceCard({ resource, index = 0 }: ResourceCardProps) {
  return (
    <motion.div
      className="flex h-full w-full cursor-pointer flex-col transition-transform hover:scale-[1.02]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <div className="relative">
        <Image
          src={resource.image}
          alt={resource.title}
          className="h-[200px] w-full rounded-xl object-cover"
          width={400}
          height={200}
          priority={index < 6}
          quality={90}
        />
      </div>
      <div className="flex flex-1 flex-col pt-4">
        <p className="text-black-500 font-sora mb-2 text-xs">{resource.date}</p>
        <h3 className="text-black-800 mb-2 line-clamp-2 text-base leading-tight font-semibold">
          {resource.title}
        </h3>
        <p className="text-black-600 font-sora line-clamp-2 flex-1 text-sm leading-relaxed">
          {resource.description}
        </p>
      </div>
    </motion.div>
  );
}
