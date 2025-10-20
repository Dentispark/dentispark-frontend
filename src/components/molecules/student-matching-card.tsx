"use client";

import { Card, CardContent } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";

interface StudentMatchingCardProps {
  student: {
    name: string;
    year: string;
    avatar: string;
    preferredSchool: string;
    ucatScore: string;
    aLevelScore: string;
  };
  className?: string;
  onProceed: () => void;
  onViewProfile: () => void;
}

export function StudentMatchingCard({
  student,
  className,
  onProceed,
  onViewProfile,
}: StudentMatchingCardProps) {
  return (
    <Card
      className={cn(
        "border-greys-300 rounded-lg border shadow-none",
        className,
      )}
    >
      <CardContent className="pt-0">
        <div className="space-y-8">
          {/* Student Profile Header */}
          <div className="flex items-center gap-3 border-b pb-4">
            <div className="h-12 w-12 overflow-hidden rounded-full">
              <img
                src={student.avatar}
                alt={student.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-sora text-black-800 text-base font-semibold">
                {student.name}
              </h3>
              <p className="font-sora text-black-400 text-sm">{student.year}</p>
            </div>
          </div>

          {/* Preferred School */}
          <div>
            <p className="font-sora text-black-600 text-sm">
              <span className="font-medium">Preferred School:</span>{" "}
              <span className="text-black-400">{student.preferredSchool}</span>
            </p>
          </div>

          {/* Scores Grid */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="font-sora text-black-600 text-sm font-medium">
                UCAT Score
              </p>
              <p className="font-sora text-black-400 border-greys-300 bg-greys-100 mt-1 flex w-fit items-center justify-center rounded-full border p-1 px-3 text-sm">
                {student.ucatScore}
              </p>
            </div>
            <div>
              <p className="font-sora text-black-600 text-sm font-medium">
                A-Level Score
              </p>

              <p className="font-sora text-black-400 border-greys-300 bg-greys-100 mt-1 flex w-fit items-center justify-center rounded-full border p-1 px-3 text-sm">
                {student.aLevelScore}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex w-full gap-3">
            <Button onClick={onProceed} className="h-10 flex-1">
              Proceed
            </Button>
            <Button
              onClick={onViewProfile}
              variant="outline"
              className="h-10 flex-1"
            >
              View Profile
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
