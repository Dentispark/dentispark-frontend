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
import { StepProps, PaymentSetupStep2Data } from "../types";

const step2Schema = z.object({
  dentalExperience: z.string().optional(),
  interestedSchools: z
    .array(z.string())
    .min(1, "Please select at least one school"),
  applicationChallenges: z.string().optional(),
});

type Step2FormData = z.infer<typeof step2Schema>;

const ukDentalSchools = [
  "University of Birmingham",
  "University of Bristol",
  "Cardiff University",
  "University of Dundee",
  "University of Edinburgh",
  "University of Glasgow",
  "King's College London",
  "University of Leeds",
  "University of Liverpool",
  "University of Manchester",
  "Newcastle University",
  "Plymouth University",
  "Queen Mary University of London",
  "Queen's University Belfast",
  "University of Sheffield",
];

const applicationChallenges = [
  "UCAT preparation",
  "Personal statement writing",
  "Interview preparation",
  "Work experience requirements",
  "Academic requirements",
  "University selection",
  "Application deadlines",
  "Other",
];

export function PaymentSetupStep2({
  data,
  onNext,
  onPrevious,
  isLoading,
}: StepProps) {
  const form = useForm<Step2FormData>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      dentalExperience: data.dentalExperience || "",
      interestedSchools: data.interestedSchools || [],
      applicationChallenges: data.applicationChallenges || "",
    },
  });

  const onSubmit = (formData: Step2FormData) => {
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
          {/* Dental work experience or volunteering */}
          <FormField
            control={form.control}
            name="dentalExperience"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-sora text-sm font-normal text-gray-700">
                  Dental work experience or volunteering?{" "}
                  <span className="text-gray-500">
                    (Yes/No, details optional)
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

          {/* Interested UK dental schools */}
          <FormField
            control={form.control}
            name="interestedSchools"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-sora text-sm font-normal text-gray-700">
                  Interested UK dental schools?
                </FormLabel>
                <Select
                  onValueChange={(value) => {
                    const currentValues = field.value || [];
                    if (!currentValues.includes(value)) {
                      field.onChange([...currentValues, value]);
                    }
                  }}
                >
                  <FormControl>
                    <SelectTrigger className="h-12 w-full text-gray-500">
                      <SelectValue placeholder="Select your country" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {ukDentalSchools.map((school) => (
                      <SelectItem key={school} value={school}>
                        {school}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Display selected schools */}
                {field.value && field.value.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {field.value.map((school, index) => (
                      <span
                        key={index}
                        className="bg-primary-100 text-primary-700 inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm"
                      >
                        {school}
                        <button
                          type="button"
                          onClick={() => {
                            const newValues = field.value.filter(
                              (_, i) => i !== index,
                            );
                            field.onChange(newValues);
                          }}
                          className="text-primary-500 hover:text-primary-700 ml-1"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Biggest application challenges */}
          <FormField
            control={form.control}
            name="applicationChallenges"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-sora text-sm font-normal text-gray-700">
                  Biggest application challenges?{" "}
                  <span className="text-gray-500">
                    (e.g., UCAT, personal statement)
                  </span>
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-12 w-full text-gray-500">
                      <SelectValue placeholder="Select your country" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {applicationChallenges.map((challenge) => (
                      <SelectItem key={challenge} value={challenge}>
                        {challenge}
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
              Next
            </Button>
          </div>
        </form>
      </Form>
    </motion.div>
  );
}
