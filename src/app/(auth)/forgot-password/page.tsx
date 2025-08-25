"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

import Logo from "@/src/components/icons/Logo";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { useForgotPassword } from "@/src/features/(auth)/forgot-password/services/mutations";

// Form validation schema
const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const router = useRouter();
  const forgotPasswordMutation = useForgotPassword();

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    //TODO: Add a delay before redirecting to verify-email page
    try {
      await forgotPasswordMutation.mutateAsync(data);

      router.push(`/verify-email?email=${encodeURIComponent(data.email)}`);
      toast.success("Verification code sent successfully!");
    } catch (error) {
      console.error("Forgot password error:", error);
      toast.error("Failed to send verification code. Please try again.");
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
            Forgot Password?
          </h1>
          <p className="font-sora mt-2 text-sm text-gray-400">
            Enter the email associated with your account. We will send you a
            verification code
          </p>
        </motion.div>

        {/* Forgot Password Form */}
        <motion.div variants={itemVariants}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          className="h-12 pl-10"
                          aria-invalid={!!form.formState.errors.email}
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full py-5 text-sm font-medium"
                disabled={forgotPasswordMutation.isPending}
              >
                {forgotPasswordMutation.isPending ? "Sending..." : "Continue"}
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
