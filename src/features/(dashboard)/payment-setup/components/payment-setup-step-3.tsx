"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
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
import { StepProps } from "../types";

const step3Schema = z.object({
  mentorshipAvailability: z.string().optional(),
  financialSupport: z.boolean().optional(),
  hearAboutDentispark: z.string().optional(),
});

type Step3FormData = z.infer<typeof step3Schema>;

const mentorshipAvailability = [
  "Weekdays",
  "Weekends",
  "Evenings",
  "Flexible",
  "Not interested",
];

const hearAboutOptions = [
  "Social Media",
  "Google Search",
  "Friend/Family",
  "University",
  "Education Fair",
  "Advertisement",
  "Other",
];

export function PaymentSetupStep3({
  data,
  onNext,
  onPrevious,
  isLoading,
}: StepProps) {
  const form = useForm<Step3FormData>({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      mentorshipAvailability: data.mentorshipAvailability || "",
      financialSupport: data.financialSupport || false,
      hearAboutDentispark: data.hearAboutDentispark || "",
    },
  });

  const onSubmit = (formData: Step3FormData) => {
    onNext(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Mentorship availability */}
          <FormField
            control={form.control}
            name="mentorshipAvailability"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-sora text-sm font-normal text-gray-700">
                  Mentorship availability?{" "}
                  <span className="text-gray-500">
                    (e.g., Weekends, Evenings)
                  </span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your target schools"
                    className="h-12 text-gray-500 placeholder:text-gray-400"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Qualify for financial support */}
          <FormField
            control={form.control}
            name="financialSupport"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-sora text-sm font-normal text-gray-700">
                  Qualify for financial support?{" "}
                  <span className="text-gray-500">(Yes/No, for subsidies)</span>
                </FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(value === "yes")}
                  value={field.value ? "yes" : "no"}
                >
                  <FormControl>
                    <SelectTrigger className="h-12 w-full text-gray-500">
                      <SelectValue placeholder="Select your country" />
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

          {/* How did you hear about Dentispark */}
          <FormField
            control={form.control}
            name="hearAboutDentispark"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-sora text-sm font-normal text-gray-700">
                  How did you hear about Dentispark?{" "}
                  <span className="text-gray-500">
                    (e.g., Nonprofit, Social Media)
                  </span>
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-12 w-full text-gray-500">
                      <SelectValue placeholder="Select your country" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {hearAboutOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-between pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onPrevious}
              className="h-12 px-8 text-sm font-medium"
              disabled={isLoading}
            >
              Previous
            </Button>
            <Button
              type="submit"
              className="bg-primary hover:bg-primary/90 h-12 px-8 text-sm font-medium"
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Proceed to Payment"}
            </Button>
          </div>
        </form>
      </Form>
    </motion.div>
  );
}
