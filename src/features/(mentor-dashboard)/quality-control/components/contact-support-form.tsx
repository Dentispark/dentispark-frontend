"use client";

import { useState } from "react";
import { Textarea } from "@/src/components/ui/textarea";
import { Button } from "@/src/components/ui/button";
import { ArrowRight } from "lucide-react";

interface ContactSupportFormProps {
  onSubmit?: (message: string) => void;
  isSubmitting?: boolean;
}

export function ContactSupportForm({
  onSubmit,
  isSubmitting = false,
}: ContactSupportFormProps) {
  const [message, setMessage] = useState("");
  const maxLength = 500;

  const handleSubmit = () => {
    if (message.trim() && onSubmit) {
      onSubmit(message);
    }
  };

  return (
    <div className="sticky top-4 h-fit">
      <div className="px-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <h2 className="text-black-800 text-2xl font-semibold">
              Contact Support
            </h2>
            <p className="font-sora text-sm text-gray-600">
              Do you have any questions/challenges?
            </p>
          </div>

          <div className="space-y-6">
            <label className="font-sora text-sm font-medium text-gray-700">
              Send us a message
            </label>
            <div>
              <Textarea
                placeholder="Enter a message..."
                value={message}
                onChange={(e) => {
                  if (e.target.value.length <= maxLength) {
                    setMessage(e.target.value);
                  }
                }}
                className="focus:border-success-600 focus:ring-success-600 mt-4 min-h-[120px] resize-none rounded-xl border-gray-300"
                disabled={isSubmitting}
              />
              <div className="font-sora mt-2 text-xs text-gray-500">
                Word count: {message.length}/{maxLength}
              </div>
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={!message.trim() || isSubmitting}
            className="mt-6 w-full py-6 text-base font-medium text-white"
          >
            {isSubmitting ? (
              "Submitting..."
            ) : (
              <>
                Submit Form
                <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
