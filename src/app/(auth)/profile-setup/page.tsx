"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { motion } from "framer-motion";

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
import { authCookies } from "@/src/lib/cookies";
import { useProfileSetup } from "@/src/features/(auth)/services/mutation";
// Form validation schema - updated to match API requirements
const profileSetupSchema = z.object({
  emailAddress: z
    .string()
    .email("Please enter a valid email address")
    .optional(),
  academicYear: z.coerce.number().int().min(1).max(13).optional(),
  targetSchools: z.array(z.string()).optional(),
  county: z.string().optional(),
  takenUCAT: z.boolean().optional(),
  takenCasper: z.boolean().optional(),
  category: z.enum(["DENTAL_HYGIENE", "BDS", "DENTAL_NURSING"]).optional(),
});

type ProfileSetupFormData = z.infer<typeof profileSetupSchema>;

const academicYears = [
  { value: 9, label: "Year 9" },
  { value: 10, label: "Year 10" },
  { value: 11, label: "Year 11" },
  { value: 12, label: "Year 12" },
  { value: 13, label: "Year 13" },
];

const counties = [
  { value: "london", label: "London" },
  { value: "manchester", label: "Manchester" },
  { value: "birmingham", label: "Birmingham" },
  { value: "glasgow", label: "Glasgow" },
  { value: "edinburgh", label: "Edinburgh" },
  { value: "cardiff", label: "Cardiff" },
  { value: "bristol", label: "Bristol" },
  { value: "leeds", label: "Leeds" },
  { value: "liverpool", label: "Liverpool" },
  { value: "other", label: "Other" },
];

const categoryOptions = [
  { value: "BDS", label: "Bachelor of Dental Surgery (BDS)" },
  { value: "DENTAL_HYGIENE", label: "Dental Hygiene" },
  { value: "DENTAL_NURSING", label: "Dental Nursing" },
];

export default function ProfileSetupPage() {
  const profileSetupMutation = useProfileSetup();
  const user = authCookies.getUserData();

  const form = useForm<ProfileSetupFormData>({
    resolver: zodResolver(profileSetupSchema),
    defaultValues: {
      emailAddress: (user as { emailAddress?: string })?.emailAddress || "",
      academicYear: undefined,
      targetSchools: [],
      county: "",
      takenUCAT: false,
      takenCasper: false,
      category: undefined,
    },
  });

  const onSubmit = async (data: ProfileSetupFormData) => {
    try {
      // Filter out undefined values since all fields are optional
      const filteredData = Object.fromEntries(
        Object.entries(data).filter(
          ([, value]) =>
            value !== undefined &&
            value !== "" &&
            (Array.isArray(value) ? value.length > 0 : true),
        ),
      ) as ProfileSetupFormData;

      await profileSetupMutation.mutateAsync(filteredData);
    } catch (error) {
      console.error("Profile setup error:", error);
      // Error handling is done in the mutation hook
    }
  };

  console.log("user", user);

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
                      onValueChange={(value) => field.onChange(parseInt(value))}
                      value={field.value?.toString()}
                    >
                      <FormControl>
                        <SelectTrigger className="h-12 w-full text-gray-500">
                          <SelectValue placeholder="Select your current academic year" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {academicYears.map((year) => (
                          <SelectItem
                            key={year.value}
                            value={year.value.toString()}
                          >
                            {year.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Target Schools */}
              <FormField
                control={form.control}
                name="targetSchools"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-sora text-sm font-normal text-gray-700">
                      Target Dental Schools
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your target dental schools (comma separated)"
                        className="h-12 text-gray-500 placeholder:text-gray-400"
                        value={field.value?.join(", ") || ""}
                        onChange={(e) => {
                          const schools = e.target.value
                            .split(",")
                            .map((school) => school.trim())
                            .filter((school) => school !== "");
                          field.onChange(schools.length > 0 ? schools : []);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* County */}
              <FormField
                control={form.control}
                name="county"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-sora text-sm font-normal text-gray-700">
                      County
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="h-12 w-full text-gray-500">
                          <SelectValue placeholder="Select your county" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {counties.map((county) => (
                          <SelectItem key={county.value} value={county.value}>
                            {county.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Category */}
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-sora text-sm font-normal text-gray-700">
                      Category
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="h-12 w-full text-gray-500">
                          <SelectValue placeholder="Select your category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categoryOptions.map((category) => (
                          <SelectItem
                            key={category.value}
                            value={category.value}
                          >
                            {category.label}
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
                name="takenUCAT"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-sora text-sm font-normal text-gray-700">
                      Have you taken the UCAT?
                    </FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(value === "yes")}
                      value={field.value ? "yes" : "no"}
                    >
                      <FormControl>
                        <SelectTrigger className="h-12 w-full text-gray-500">
                          <SelectValue placeholder="Select option" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Casper Status */}
              <FormField
                control={form.control}
                name="takenCasper"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-sora text-sm font-normal text-gray-700">
                      Have you taken the Casper test?
                    </FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(value === "yes")}
                      value={field.value ? "yes" : "no"}
                    >
                      <FormControl>
                        <SelectTrigger className="h-12 w-full text-gray-500">
                          <SelectValue placeholder="Select option" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
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
