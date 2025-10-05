"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
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
import { StepProps, PaymentSetupStep1Data } from "../types";

const step1Schema = z.object({
  academicYear: z.coerce.number().min(9).max(13),
  gcseGrades: z.string().optional(),
  takenUCAT: z.boolean().optional(),
  whyDentistry: z.string().min(10, "Please provide at least 10 characters"),
});

type Step1FormData = z.infer<typeof step1Schema>;

const academicYears = [
  { value: 9, label: "Year 9" },
  { value: 10, label: "Year 10" },
  { value: 11, label: "Year 11" },
  { value: 12, label: "Year 12" },
  { value: 13, label: "Year 13" },
];

export function PaymentSetupStep1({ data, onNext, isLoading }: StepProps) {
  const form = useForm<Step1FormData>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      academicYear: data.academicYear || undefined,
      gcseGrades: data.gcseGrades || "",
      takenUCAT: data.takenUCAT || false,
      whyDentistry: data.whyDentistry || "",
    },
  });

  const onSubmit = (formData: Step1FormData) => {
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

          {/* Current/predicted GCSE or A-Level grades */}
          <FormField
            control={form.control}
            name="gcseGrades"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-sora text-sm font-normal text-gray-700">
                  Current/predicted GCSE or A-Level grades?{" "}
                  <span className="text-gray-500">
                    (e.g., Biology, Chemistry)
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

          {/* Taken or planning UCAT */}
          <FormField
            control={form.control}
            name="takenUCAT"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-sora text-sm font-normal text-gray-700">
                  Taken or planning UCAT?{" "}
                  <span className="text-gray-500">(Yes/No, with date)</span>
                </FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(value === "yes")}
                  value={field.value ? "yes" : "no"}
                >
                  <FormControl>
                    <SelectTrigger className="h-12 w-full text-gray-500">
                      <SelectValue placeholder="Select an option" />
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

          {/* Why dentistry */}
          <FormField
            control={form.control}
            name="whyDentistry"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-sora text-sm font-normal text-gray-700">
                  Why dentistry?
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter your reason(s)..."
                    className="min-h-[120px] resize-none text-gray-500 placeholder:text-gray-400"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end pt-4">
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
