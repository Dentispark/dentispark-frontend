"use client";

import { useState, use } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";
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
import { useResetPassword } from "@/src/features/(auth)/services/mutation";

// Form validation schema
const newPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number",
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type NewPasswordFormData = z.infer<typeof newPasswordSchema>;

interface NewPasswordPageProps {
  searchParams: Promise<{
    email?: string;
    token?: string;
  }>;
}

export default function NewPasswordPage({
  searchParams,
}: NewPasswordPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const router = useRouter();
  const resetPasswordMutation = useResetPassword();
  const resolvedSearchParams = use(searchParams);
  const email = resolvedSearchParams.email || "";
  const token = resolvedSearchParams.token || "";

  const form = useForm<NewPasswordFormData>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: NewPasswordFormData) => {
    try {
      await resetPasswordMutation.mutateAsync({
        emailAddress: email,
        token,
        password: data.password,
        passwordConfirmation: data.confirmPassword,
      });
      setIsComplete(true);
      toast.success("Password reset successfully!");

      // Redirect to login after a short delay
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error) {
      console.error("Password reset error:", error);
      toast.error("Failed to reset password. Please try again.");
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

  if (isComplete) {
    return (
      <div className="flex min-h-[calc(100vh-80px)] items-center justify-center py-12">
        <motion.div
          className="w-full max-w-md space-y-8 p-4 text-center md:max-w-lg md:p-0"
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

          {/* Success Message */}
          <motion.div className="space-y-6" variants={itemVariants}>
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <Lock className="h-8 w-8 text-green-600" />
            </div>

            <div>
              <h1 className="text-3xl leading-[160%] font-medium text-gray-900">
                Password Updated!
              </h1>
              <p className="font-sora mt-2 text-sm text-gray-400">
                Your password has been successfully updated. You can now login
                with your new password.
              </p>
            </div>

            <div className="space-y-4">
              <Link href="/login">
                <Button className="w-full py-5 text-sm font-medium">
                  Continue to Login
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Footer Links */}
          <motion.div
            className="font-sora flex justify-center space-x-6 text-xs text-gray-500 underline"
            variants={itemVariants}
          >
            <Link href="/terms" className="cursor-pointer hover:text-gray-700">
              Terms & Conditions
            </Link>
            <Link
              href="/privacy"
              className="cursor-pointer hover:text-gray-700"
            >
              Privacy Policy
            </Link>
          </motion.div>
        </motion.div>
      </div>
    );
  }

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
            Create a new password
          </h1>
          <p className="font-sora mt-2 text-sm text-gray-400">
            Create a new password to continue. This password will be used to log
            into your account
          </p>
        </motion.div>

        {/* New Password Form */}
        <motion.div variants={itemVariants}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* New Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your new Password"
                          className="h-12 pr-10 pl-10"
                          aria-invalid={!!form.formState.errors.password}
                          {...field}
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-400" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-400" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Confirm Password */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm your new Password"
                          className="h-12 pr-10 pl-10"
                          aria-invalid={!!form.formState.errors.confirmPassword}
                          {...field}
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-400" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-400" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full py-5 text-sm font-medium"
                disabled={resetPasswordMutation.isPending}
              >
                {resetPasswordMutation.isPending ? "Updating..." : "Sign in"}
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
