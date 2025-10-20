"use client";

import { useState } from "react";
import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";

interface BankInformationFormProps {
  onSubmit: (data: { sortCode: string; accountNumber: string }) => void;
  onCancel: () => void;
  className?: string;
}

export function BankInformationForm({
  onSubmit,
  onCancel,
  className,
}: BankInformationFormProps) {
  const [formData, setFormData] = useState({
    sortCode: "",
    accountNumber: "",
  });

  const [errors, setErrors] = useState({
    sortCode: "",
    accountNumber: "",
  });

  const validateForm = () => {
    const newErrors = {
      sortCode: "",
      accountNumber: "",
    };

    // Sort code validation (format: XX-XX-XX)
    if (!formData.sortCode) {
      newErrors.sortCode = "Sort code is required";
    } else if (!/^\d{2}-\d{2}-\d{2}$/.test(formData.sortCode)) {
      newErrors.sortCode = "Sort code must be in format XX-XX-XX";
    }

    // Account number validation (8 digits)
    if (!formData.accountNumber) {
      newErrors.accountNumber = "Account number is required";
    } else if (!/^\d{8}$/.test(formData.accountNumber)) {
      newErrors.accountNumber = "Account number must be 8 digits";
    }

    setErrors(newErrors);
    return !newErrors.sortCode && !newErrors.accountNumber;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleSortCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove non-digits

    // Format as XX-XX-XX
    if (value.length >= 2) {
      value = value.substring(0, 2) + "-" + value.substring(2);
    }
    if (value.length >= 5) {
      value = value.substring(0, 5) + "-" + value.substring(5, 7);
    }

    setFormData({ ...formData, sortCode: value });
    if (errors.sortCode) {
      setErrors({ ...errors, sortCode: "" });
    }
  };

  const handleAccountNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value.replace(/\D/g, "").substring(0, 8); // Only digits, max 8
    setFormData({ ...formData, accountNumber: value });
    if (errors.accountNumber) {
      setErrors({ ...errors, accountNumber: "" });
    }
  };

  return (
    <div className={cn("mx-auto w-full max-w-md", className)}>
      <div className="space-y-6">
        {/* Description */}
        <p className="font-sora text-black-600 text-center text-sm">
          Please provide your bank details below to ensure you can receive
          payments promptly and securely.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Sort Code Field */}
          <div className="space-y-4">
            <label className="font-sora text-black-800 text-sm font-medium">
              Sort code
            </label>
            <input
              type="text"
              value={formData.sortCode}
              onChange={handleSortCodeChange}
              placeholder="11-22-33"
              className={cn(
                "font-sora w-full rounded-lg border px-4 py-3 text-sm",
                "focus:ring-primary-500 focus:border-transparent focus:ring-2 focus:outline-none",
                "transition-colors duration-200",
                errors.sortCode
                  ? "border-error-500 bg-error-50"
                  : "border-greys-300 bg-greys-100",
              )}
            />
            {errors.sortCode && (
              <p className="font-sora text-error-500 text-xs">
                {errors.sortCode}
              </p>
            )}
          </div>

          {/* Account Number Field */}
          <div className="space-y-4">
            <label className="font-sora text-black-800 text-sm font-medium">
              Account number
            </label>
            <input
              type="text"
              value={formData.accountNumber}
              onChange={handleAccountNumberChange}
              placeholder="01234567"
              className={cn(
                "font-sora w-full rounded-lg border px-4 py-3 text-sm",
                "focus:ring-primary-500 focus:border-transparent focus:ring-2 focus:outline-none",
                "transition-colors duration-200",
                errors.accountNumber
                  ? "border-error-500 bg-error-50"
                  : "border-greys-300 bg-greys-100",
              )}
            />
            {errors.accountNumber && (
              <p className="font-sora text-error-500 text-xs">
                {errors.accountNumber}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="font-sora flex-1 text-sm font-medium"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="font-sora flex-1 text-sm font-medium text-white"
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
