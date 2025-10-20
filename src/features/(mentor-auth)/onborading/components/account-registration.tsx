"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Checkbox } from "@/src/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import {
  type AccountRegistrationData,
  type OnboardingFormProps,
  SPECIALIZATION_OPTIONS,
  YEARS_EXPERIENCE_OPTIONS,
} from "../types";

// Form validation schema
const accountRegistrationSchema = z
  .object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    emailAddress: z.string().email("Please enter a valid email address"),
    phoneNumber: z.string().min(10, "Please enter a valid phone number"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "8+ characters. At least one number (0-9). e.g. 'Pelican2Silver'.",
      ),
    confirmPassword: z.string(),
    areaOfSpecialization: z
      .string()
      .min(1, "Please select your area of specialization"),
    yearsInDentistry: z
      .string()
      .min(1, "Please select your years of experience"),
    agreeToTerms: z.boolean().refine((val) => val === true, {
      message: "You must agree to the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type AccountRegistrationFormData = z.infer<typeof accountRegistrationSchema>;

export function AccountRegistration({
  onNextAction,
  initialData,
  isLoading = false,
}: OnboardingFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const data = initialData as AccountRegistrationData | undefined;

  const form = useForm<AccountRegistrationFormData>({
    resolver: zodResolver(accountRegistrationSchema),
    defaultValues: {
      firstName: data?.firstName || "",
      lastName: data?.lastName || "",
      emailAddress: data?.emailAddress || "",
      phoneNumber: data?.phoneNumber || "",
      password: data?.password || "",
      confirmPassword: data?.confirmPassword || "",
      areaOfSpecialization: data?.areaOfSpecialization || "",
      yearsInDentistry: data?.yearsInDentistry || "",
      agreeToTerms: data?.agreeToTerms || false,
    },
  });

  const onSubmit = async (data: AccountRegistrationFormData) => {
    try {
      // Here you would typically call the API to create the mentor account
      // For now, we'll just pass the data to the next step
      const accountData: AccountRegistrationData = {
        ...data,
      };

      onNextAction(accountData);
      toast.success("Account information saved successfully!");
    } catch (error) {
      console.error("Account registration error:", error);
      toast.error("Failed to save account information. Please try again.");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <motion.div
      className="mx-auto max-w-2xl"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* First Name and Last Name */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your first name"
                      className="h-12"
                      aria-invalid={!!form.formState.errors.firstName}
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your last name"
                      className="h-12"
                      aria-invalid={!!form.formState.errors.lastName}
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Password and Confirm Password */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
                        disabled={isLoading}
                        {...field}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3 disabled:cursor-not-allowed"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isLoading}
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
                        placeholder="Re-enter your password"
                        className="h-12 pr-10 pl-10"
                        aria-invalid={!!form.formState.errors.confirmPassword}
                        disabled={isLoading}
                        {...field}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center pr-3 disabled:cursor-not-allowed"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        disabled={isLoading}
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
          </div>

          {/* Email Address and Phone Number */}
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
                        disabled={isLoading}
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
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone number</FormLabel>
                  <FormControl>
                    <div className="flex">
                      <div className="flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3">
                        <span className="text-sm text-gray-600">US</span>
                      </div>
                      <Input
                        type="tel"
                        placeholder="Enter your phone number"
                        className="h-12 rounded-l-none border-l-0"
                        aria-invalid={!!form.formState.errors.phoneNumber}
                        disabled={isLoading}
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Area of Specialization */}
          <FormField
            control={form.control}
            name="areaOfSpecialization"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Area of Specialization in Dentistry</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isLoading}
                >
                  <FormControl>
                    <SelectTrigger className="h-12 w-full">
                      <SelectValue placeholder="Select your an option" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {SPECIALIZATION_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Years in Dentistry */}
          <FormField
            control={form.control}
            name="yearsInDentistry"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Years in Dentistry</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isLoading}
                >
                  <FormControl>
                    <SelectTrigger className="h-12 w-full">
                      <SelectValue placeholder="Select your an option" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {YEARS_EXPERIENCE_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Terms and Conditions */}
          <FormField
            control={form.control}
            name="agreeToTerms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-y-0 space-x-3">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={isLoading}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="font-sora text-sm font-normal">
                    I agree to data processing for vetting and{" "}
                    <a
                      href="/terms"
                      className="text-primary underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      DBS/PVG
                    </a>{" "}
                    checks
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full py-6 text-sm font-medium"
            disabled={isLoading}
          >
            {isLoading ? "Creating account..." : "Create an account"}
          </Button>
        </form>
      </Form>

      {/* Footer Links */}
      <div className="mt-8 text-center">
        <p className="font-sora text-xs text-gray-600">
          Already have an account?{" "}
          <a
            href="/mentor/login"
            className="text-primary font-sora cursor-pointer text-xs underline"
          >
            Log in
          </a>
        </p>
      </div>

      <div className="font-sora mt-4 flex justify-center space-x-6 text-xs text-gray-500 underline">
        <a href="/terms" className="cursor-pointer hover:text-gray-700">
          Terms & Conditions
        </a>
        <a href="/privacy" className="cursor-pointer hover:text-gray-700">
          Privacy Policy
        </a>
      </div>
    </motion.div>
  );
}
