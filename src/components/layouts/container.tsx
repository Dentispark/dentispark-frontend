"use client";

import { cn } from "@/src/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        "max-w-2xl sm:max-w-3xl md:max-w-4xl lg:max-w-6xl",
        className,
      )}
    >
      {children}
    </div>
  );
}
