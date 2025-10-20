"use client";

import { motion } from "framer-motion";
import { PaymentSetupForm } from "@/src/features/(dashboard)/payment-setup/components";

export default function PaymentSetupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl px-6"
      >
        <PaymentSetupForm />
      </motion.div>
    </div>
  );
}
