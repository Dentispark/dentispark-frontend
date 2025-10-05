"use client";

import { motion } from "framer-motion";
import { XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";

export default function PaymentFailurePage() {
  const router = useRouter();

  const handleTryAgain = () => {
    router.push("/payment-setup");
  };

  return (
    <div className="flex min-h-screen items-center justify-center py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md px-6"
      >
        <CardContent className="flex flex-col items-center space-y-6 py-8 text-center">
          {/* Failure Icon with animated background */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
            className="relative"
          >
            <svg
              width="120"
              height="120"
              viewBox="0 0 120 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="5"
                y="5"
                width="110"
                height="110"
                rx="55"
                fill="#F1BFBF"
              />
              <rect
                x="5"
                y="5"
                width="110"
                height="110"
                rx="55"
                stroke="#FBEAEA"
                strokeWidth="10"
              />
              <rect
                x="43"
                y="42"
                width="35"
                height="35"
                rx="17.5"
                fill="#D32F2F"
              />
              <path
                d="M68 53L54 67M54 53L68 67"
                stroke="#FEFEFE"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>

          {/* Failure Message */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="space-y-2"
          >
            <h1 className="font-sora text-2xl font-semibold text-gray-900">
              Payment Unsuccessful
            </h1>
            <p className="font-sora max-w-sm text-sm text-gray-600">
              Your premium subscription activation was unsuccessful due to
              payment issues.
            </p>
          </motion.div>

          {/* Action Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="w-full pt-4"
          >
            <Button
              onClick={handleTryAgain}
              className="font-sora w-full font-medium text-white"
            >
              Try Again
            </Button>
          </motion.div>
        </CardContent>
      </motion.div>
    </div>
  );
}
