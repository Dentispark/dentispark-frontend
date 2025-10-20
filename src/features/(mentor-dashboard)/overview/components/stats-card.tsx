"use client";

import { Card, CardContent } from "@/src/components/ui/card";
import { cn } from "@/src/lib/utils";

interface StatsCardProps {
  icon: React.ReactNode;
  title: string;
  titleColor: string;
  value: string | number;
  subtitle: string;
  className?: string;
  borderColor?: string;
}

export function StatsCard({
  icon,
  title,
  value,
  subtitle,
  className,
  borderColor = "border-gray-200",
  titleColor,
}: StatsCardProps) {
  return (
    <Card
      className={cn("rounded-lg border shadow-none", borderColor, className)}
    >
      <CardContent className="p-">
        <div className="flex flex-col gap-4">
          <div className={cn("rounded-xl p-3")}>{icon}</div>
          <div className="flex-1">
            <div className="flex items-baseline gap-1">
              <span
                className={cn("text-black-800 text-4xl font-bold", titleColor)}
              >
                {value}
              </span>
              {title.includes("rating") && (
                <span
                  className={cn(
                    "text-black-600 text-xl font-medium",
                    titleColor,
                  )}
                >
                  /5
                </span>
              )}
              {title.includes("hours") && (
                <span className="text-warning-500 text-xl font-medium">
                  hours
                </span>
              )}
            </div>
            <p className="text-black-600 mt-3 text-base font-medium">
              {subtitle}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
