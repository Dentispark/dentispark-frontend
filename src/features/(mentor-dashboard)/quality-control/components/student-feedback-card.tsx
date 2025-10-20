import { StudentFeedback } from "../types";
import Image from "next/image";
import { cn } from "@/src/lib/utils";

interface StudentFeedbackCardProps {
  feedback: StudentFeedback;
}

export function StudentFeedbackCard({ feedback }: StudentFeedbackCardProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-md border",
        feedback.bgColor,
        feedback.borderColor,
      )}
    >
      <div className="space-y-4">
        {/* Student Info and Rating */}
        <div
          className={cn(
            "flex items-start justify-between gap-3 border-b bg-white p-4",
            feedback.borderColor,
          )}
        >
          <div className="flex items-center gap-6">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-300">
              {feedback.studentAvatar ? (
                <Image
                  width={48}
                  height={48}
                  src={feedback.studentAvatar}
                  className="h-full w-full object-cover"
                  alt={feedback.studentName}
                />
              ) : (
                <span className="text-sm font-semibold text-gray-700">
                  {feedback.studentName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              )}
            </div>
            <div>
              <p className="text-base font-medium text-gray-900">
                {feedback.studentName}
              </p>
              <div className="mt-1 flex items-center justify-between">
                <p className="font-sora text-sm text-gray-600">
                  {feedback.year}
                </p>
                {/* Star Rating */}
                <div className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="#FFA500"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <span className="text-sm font-semibold text-gray-900">
                    {feedback.rating}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feedback Text */}
        <div className="font-sora p-4 text-sm leading-relaxed text-gray-700">
          {feedback.feedback}
        </div>
      </div>
    </div>
  );
}
