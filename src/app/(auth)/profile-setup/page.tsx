"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { useProfileSetup } from "@/src/features/(auth)/profile-setup/services/mutations";
// Form validation schema
const profileSetupSchema = z.object({
  academicYear: z.string().min(1, "Please select your current academic year"),
  targetDentalSchools: z
    .string()
    .min(10, "Please provide at least 10 characters for your target schools"),
  countryOfResidence: z.string().min(1, "Please select your country"),
  ucatStatus: z.string().min(1, "Please select your UCAT status"),
});

type ProfileSetupFormData = z.infer<typeof profileSetupSchema>;

const academicYears = [
  { value: "year-12", label: "Year 12" },
  { value: "year-13", label: "Year 13" },
  { value: "gap-year", label: "Gap Year" },
  { value: "undergraduate", label: "Undergraduate" },
  { value: "graduate", label: "Graduate" },
  { value: "other", label: "Other" },
];

const countries = [
  { value: "uk", label: "United Kingdom" },
  { value: "us", label: "United States" },
  { value: "canada", label: "Canada" },
  { value: "australia", label: "Australia" },
  { value: "ireland", label: "Ireland" },
  { value: "other", label: "Other" },
];

const ucatOptions = [
  { value: "not-taken", label: "Not taken yet" },
  { value: "scheduled", label: "Scheduled to take" },
  { value: "completed", label: "Already completed" },
  { value: "not-applicable", label: "Not applicable" },
];

export default function ProfileSetupPage() {
  const router = useRouter();
  const profileSetupMutation = useProfileSetup();

  const form = useForm<ProfileSetupFormData>({
    resolver: zodResolver(profileSetupSchema),
    defaultValues: {
      academicYear: "",
      targetDentalSchools: "",
      countryOfResidence: "",
      ucatStatus: "",
    },
  });

  const onSubmit = async (data: ProfileSetupFormData) => {
    try {
      await profileSetupMutation.mutateAsync(data);
      router.push("/dashboard");
      toast.success("Profile setup completed successfully!");
    } catch (error) {
      console.error("Profile setup error:", error);
      toast.error("Failed to complete profile setup. Please try again.");
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
          <h1 className="text-3xl leading-[160%] font-semibold text-gray-900">
            Profile Setup
          </h1>
        </motion.div>

        {/* Profile Setup Form */}
        <motion.div variants={itemVariants}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Academic Year */}
              <FormField
                control={form.control}
                name="academicYear"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-sora text-sm font-normal text-gray-700">
                      Academic Year
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="h-12 w-full text-gray-500">
                          <SelectValue placeholder="Select your current academic year" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {academicYears.map((year) => (
                          <SelectItem key={year.value} value={year.value}>
                            {year.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Target Dental Schools */}
              <FormField
                control={form.control}
                name="targetDentalSchools"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-sora text-sm font-normal text-gray-700">
                      What are your target dental schools
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your target schools"
                        className="h-12 text-gray-500 placeholder:text-gray-400"
                        aria-invalid={
                          !!form.formState.errors.targetDentalSchools
                        }
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Country of Residence */}
              <FormField
                control={form.control}
                name="countryOfResidence"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-sora text-sm font-normal text-gray-700">
                      Country of residence
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="h-12 w-full text-gray-500">
                          <SelectValue placeholder="Select your country" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem key={country.value} value={country.value}>
                            {country.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* UCAT Status */}
              <FormField
                control={form.control}
                name="ucatStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-sora text-sm font-normal text-gray-700">
                      Have you taken the UCAT?
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="h-12 w-full text-gray-500">
                          <SelectValue placeholder="Select option" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {ucatOptions.map((option) => (
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

              <Button
                type="submit"
                className="bg-primary hover:bg-primary/90 mt-8 h-12 w-full py-5 text-sm font-medium"
                disabled={profileSetupMutation.isPending}
              >
                {profileSetupMutation.isPending
                  ? "Setting up profile..."
                  : "Go to your Dashboard"}
              </Button>
            </form>
          </Form>
        </motion.div>
      </motion.div>
    </div>
  );
}
