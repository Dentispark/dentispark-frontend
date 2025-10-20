"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, Loader2 } from "lucide-react";

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
import { useLogin } from "@/src/features/(auth)/services";

const loginSchema = z.object({
  emailAddress: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function MentorLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, startTransition] = useTransition();
  const loginMutation = useLogin();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      emailAddress: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    startTransition(() => {
      loginMutation.mutate(data);
    });
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
          <h1 className="text-3xl leading-[160%] font-semibold text-gray-900">
            Log in to your Dentispark account
          </h1>
          <p className="font-sora mt-2 text-sm text-gray-600">
            Log in to your mentor account here
          </p>
        </motion.div>

        {/* Login Form */}
        <motion.div variants={itemVariants}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="emailAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                          <Input
                            type="email"
                            placeholder="Enter your email address"
                            className="h-12 pl-10"
                            aria-invalid={!!form.formState.errors.emailAddress}
                            disabled={isPending || loginMutation.isPending}
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            className="h-12 pr-10 pl-10"
                            aria-invalid={!!form.formState.errors.password}
                            disabled={isPending || loginMutation.isPending}
                            {...field}
                          />
                          <button
                            type="button"
                            className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3 disabled:cursor-not-allowed disabled:opacity-50"
                            onClick={() => setShowPassword(!showPassword)}
                            disabled={isPending || loginMutation.isPending}
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
              </div>

              <div className="flex items-center justify-end">
                <Link
                  href="/mentor/forgot-password"
                  className="text-primary font-sora cursor-pointer text-xs hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full py-5 text-sm font-medium"
                disabled={isPending || loginMutation.isPending}
              >
                {isPending || loginMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  "Log in to Mentor Dashboard"
                )}
              </Button>
            </form>
          </Form>
        </motion.div>

        {/* Sign Up Link */}
        <motion.div className="text-center" variants={itemVariants}>
          <p className="font-sora text-xs text-gray-600">
            Don&apos;t have an account?{" "}
            <Link
              href="/mentor/onboarding"
              className="text-primary font-sora cursor-pointer text-xs underline"
            >
              Sign up
            </Link>
          </p>
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
