"use client";

import { useState, useEffect, use } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

import Logo from "@/src/components/icons/Logo";
import { Button } from "@/src/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/src/components/ui/input-otp";
import {
  useVerifyEmail,
  useResendCode,
} from "@/src/features/(auth)/verify-email/services/mutations";
import { useRouter } from "next/navigation";

const verifyEmailSchema = z.object({
  code: z.string().min(6, "Please enter the 6-digit verification code"),
});

type VerifyEmailFormData = z.infer<typeof verifyEmailSchema>;

interface VerifyEmailPageProps {
  searchParams: Promise<{
    email?: string;
  }>;
}

export default function VerifyEmailPage({
  searchParams,
}: VerifyEmailPageProps) {
  const [timeLeft, setTimeLeft] = useState(59);
  const verifyEmailMutation = useVerifyEmail();
  const resendCodeMutation = useResendCode();
  const resolvedSearchParams = use(searchParams);
  const email = resolvedSearchParams.email || "johndoe@dentispark.co.uk";

  const router = useRouter();

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const form = useForm<VerifyEmailFormData>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = async (data: VerifyEmailFormData) => {
    try {
      await verifyEmailMutation.mutateAsync({
        email,
        code: data.code,
      });
      console.log("code", data.code);
      router.push("/new-password");
      toast.success("Email verified successfully!");
    } catch (error) {
      console.error("Email verification error:", error);
      toast.error("Invalid verification code. Please try again.");
    }
  };

  const handleResendCode = async () => {
    try {
      await resendCodeMutation.mutateAsync({ email });
      setTimeLeft(59);
      toast.success("Verification code sent successfully!");
    } catch (error) {
      console.error("Resend code error:", error);
      toast.error("Failed to resend code. Please try again.");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center py-12">
      <motion.div
        className="w-full max-w-md space-y-8 p-4 md:max-w-lg md:p-0"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Mobile Logo */}
        <motion.div
          className="flex justify-center md:hidden"
          variants={itemVariants}
        >
          <Link href="/">
            <Logo className="h-[35px] w-[150px]" />
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div className="text-center" variants={itemVariants}>
          <h1 className="text-3xl leading-[160%] font-medium text-gray-900">
            We sent a code to your email
          </h1>
          <p className="font-sora mt-2 text-sm text-gray-400">
            To Login, enter the 6 digit verification code that was sent to your
            email: <span className="font-medium text-gray-900">{email}</span>
          </p>
        </motion.div>

        {/* Verify Email Form */}
        <motion.div variants={itemVariants}>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col items-center space-y-6"
            >
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem className="space-y-4">
                    <FormLabel className="sr-only">Verification Code</FormLabel>
                    <FormControl>
                      <InputOTP
                        maxLength={6}
                        value={field.value}
                        onChange={field.onChange}
                        className="justify-center"
                      >
                        <InputOTPGroup>
                          <InputOTPSlot
                            index={0}
                            className="h-12 w-12 border-gray-300 text-lg"
                          />
                          <InputOTPSlot
                            index={1}
                            className="h-12 w-12 border-gray-300 text-lg"
                          />
                          <InputOTPSlot
                            index={2}
                            className="h-12 w-12 border-gray-300 text-lg"
                          />
                          <InputOTPSlot
                            index={3}
                            className="h-12 w-12 border-gray-300 text-lg"
                          />
                          <InputOTPSlot
                            index={4}
                            className="h-12 w-12 border-gray-300 text-lg"
                          />
                          <InputOTPSlot
                            index={5}
                            className="h-12 w-12 border-gray-300 text-lg"
                          />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Resend Code */}
              <div className="text-center">
                <p className="font-sora text-xs text-gray-500">
                  Didn&apos;t get the code?{" "}
                  {timeLeft > 0 ? (
                    <span className="text-primary">
                      Resend Code in 0:{timeLeft.toString().padStart(2, "0")}
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResendCode}
                      className="text-primary underline"
                    >
                      Resend Code
                    </button>
                  )}
                </p>
              </div>

              <Button
                type="submit"
                className="w-full py-5 text-sm font-medium"
                disabled={
                  verifyEmailMutation.isPending ||
                  !form.watch("code") ||
                  form.watch("code").length < 6
                }
              >
                {verifyEmailMutation.isPending ? "Verifying..." : "Continue"}
              </Button>
            </form>
          </Form>
        </motion.div>

        {/* Back to Login Link */}
        <motion.div className="text-center" variants={itemVariants}>
          <Link
            href="/login"
            className="font-sora flex items-center justify-center text-xs text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="mr-1 h-3 w-3" />
            Back to Login
          </Link>
        </motion.div>

        {/* Footer Links */}
        <motion.div
          className="font-sora flex justify-center space-x-6 text-xs text-gray-500 underline"
          variants={itemVariants}
        >
          <Link href="/terms" className="cursor-pointer hover:text-gray-700">
            Terms & Conditions
          </Link>
          <Link href="/privacy" className="cursor-pointer hover:text-gray-700">
            Privacy Policy
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
