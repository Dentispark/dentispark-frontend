"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";

interface RatingReviewModalProps {
  studentName?: string;
  onSubmit: (rating: number, review: string) => void;
  onCancel: () => void;
}

export function RatingReviewModal({
  onSubmit,
  onCancel,
}: RatingReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [review, setReview] = useState("");
  const MAX_CHARACTERS = 500;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating > 0) {
      onSubmit(rating, review);
    }
  };

  const handleReviewChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    if (text.length <= MAX_CHARACTERS) {
      setReview(text);
    }
  };

  return (
    <div className="w-full max-w-md px-4">
      <div className="space-y-6">
        {/* Star Rating */}
        <div className="flex flex-col items-center">
          <div className="mb-4 flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="transition-transform hover:scale-110"
              >
                <Star
                  className={cn(
                    "h-12 w-12 transition-colors",
                    hoveredRating >= star || rating >= star
                      ? "fill-primary text-primary"
                      : "fill-gray-200 text-gray-200",
                  )}
                />
              </button>
            ))}
          </div>
          <p className="font-sora text-black-800 text-base font-medium">
            Rate this student
          </p>
        </div>

        {/* Review Textarea */}
        <div>
          <label className="font-sora text-black-800 mb-3 block text-sm font-semibold">
            Session review
          </label>
          <textarea
            value={review}
            onChange={handleReviewChange}
            placeholder="Share your experience here"
            rows={6}
            className="font-sora focus:border-primary focus:ring-primary w-full resize-none rounded-lg border border-gray-300 bg-white p-4 text-sm text-gray-900 placeholder:text-gray-400 focus:ring-1 focus:outline-none"
          />
          <p className="font-sora mt-2 text-xs text-gray-500">
            Word count: {review.length}/{MAX_CHARACTERS}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Button
            type="button"
            onClick={onCancel}
            variant="outline"
            className="font-sora text-black-800 hover:text-black-800 h-12 flex-1 rounded-lg border-gray-300 hover:bg-white"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={rating === 0}
            className="bg-primary hover:bg-primary/90 font-sora h-12 flex-1 rounded-lg text-white disabled:opacity-50"
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}
