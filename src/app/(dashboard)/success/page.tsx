"use client";

import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { Button } from "@/src/components/ui/button";
import { CardContent } from "@/src/components/ui/card";
import { useAuth } from "@/src/providers/auth-provider";
import { useActivatePremium } from "@/src/features/(dashboard)/payment-setup/services";
import { toast } from "sonner";

export default function PaymentSuccessPage() {
  const { logout, user } = useAuth();
  const searchParams = useSearchParams();
  const transactionReference = searchParams.get("transactionReference");

  console.log("transactionReference", transactionReference);

  const activatePremium = useActivatePremium();

  const handleGoToLogin = () => {
    activatePremium.mutate(
      {
        userEmailAddress: user?.emailAddress || "",
        paymentReference: transactionReference || "",
      },
      {
        onSuccess: () => {
          toast.success("Premium activated successfully");
          logout();
        },
      },
    );
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
                fill="#BAEDCD"
              />
              <rect
                x="5"
                y="5"
                width="110"
                height="110"
                rx="55"
                stroke="#E9F9EF"
                strokeWidth="10"
              />
              <path
                d="M60 42.5C64.6413 42.5 69.0925 44.3437 72.3744 47.6256C75.6563 50.9075 77.5 55.3587 77.5 60C77.5 64.6413 75.6563 69.0925 72.3744 72.3744C69.0925 75.6563 64.6413 77.5 60 77.5C55.3587 77.5 50.9075 75.6563 47.6256 72.3744C44.3437 69.0925 42.5 64.6413 42.5 60C42.5 55.3587 44.3437 50.9075 47.6256 47.6256C50.9075 44.3437 55.3587 42.5 60 42.5ZM57.82 63.4525L53.9325 59.5625C53.7931 59.4231 53.6277 59.3126 53.4456 59.2372C53.2635 59.1617 53.0683 59.1229 52.8713 59.1229C52.6742 59.1229 52.479 59.1617 52.2969 59.2372C52.1148 59.3126 51.9494 59.4231 51.81 59.5625C51.5285 59.844 51.3704 60.2257 51.3704 60.6238C51.3704 61.0218 51.5285 61.4035 51.81 61.685L56.76 66.635C56.899 66.7751 57.0643 66.8862 57.2464 66.9621C57.4286 67.038 57.6239 67.077 57.8212 67.077C58.0186 67.077 58.2139 67.038 58.3961 66.9621C58.5782 66.8862 58.7435 66.7751 58.8825 66.635L69.1325 56.3825C69.2737 56.2437 69.3861 56.0783 69.4631 55.8959C69.5401 55.7135 69.5802 55.5176 69.5811 55.3196C69.582 55.1216 69.5437 54.9254 69.4684 54.7422C69.3931 54.5591 69.2823 54.3927 69.1424 54.2526C69.0025 54.1125 68.8362 54.0015 68.6531 53.926C68.4701 53.8505 68.2739 53.812 68.0759 53.8126C67.8779 53.8133 67.682 53.8532 67.4995 53.93C67.317 54.0068 67.1515 54.1189 67.0125 54.26L57.82 63.4525Z"
                fill="#1FB356"
              />
            </svg>
          </motion.div>

          {/* Success Message */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="space-y-2"
          >
            <h1 className="font-sora text-2xl font-semibold text-gray-900">
              Payment Successful
            </h1>
            <p className="font-sora max-w-sm text-sm text-gray-600">
              Your premium subscription has been successfully activated.
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
              onClick={handleGoToLogin}
              className="font-sora w-full font-medium text-white"
            >
              Continue
            </Button>
          </motion.div>
        </CardContent>
      </motion.div>
    </div>
  );
}
