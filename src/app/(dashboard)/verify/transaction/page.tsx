"use client";

import { useVerifyTransaction } from "@/src/features/(dashboard)/payment-setup/services";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function VerifyTransactionClient() {
  const searchParams = useSearchParams();
  const session_id = searchParams.get("session_id");
  const router = useRouter();

  const { data, isLoading, error } = useVerifyTransaction(session_id || "");

  console.log("data", data);

  useEffect(() => {
    if (data && data?.verified) {
      const successParams = new URLSearchParams({
        transactionReference: data.transactionReference || "",
      });

      router.push(`/success?${successParams.toString()}`);
    }
  }, [data, router]);

  useEffect(() => {
    if (error) {
      router.push("/failure");
    }
  }, [error, router]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="text-primary h-8 w-8 animate-spin" />
      </div>
    );
  }

  return null;
}
