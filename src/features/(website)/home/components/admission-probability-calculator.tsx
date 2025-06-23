// components/AdmissionProbabilityCalculator.tsx
"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/src/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/src/components/ui/radio-group";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/src/components/ui/select";
import { Button } from "@/src/components/ui/button";
import { Title } from "@/src/components/atoms/title";

const studentTypes = [
  "All applicants",
  "School Leaver",
  "Graduate Applicant",
  "International Applicant",
  "Widening Participation",
] as const;

const scoreRanges = ["0-20", "21-40", "41-60", "61-80", "81-100"];

type FormValues = {
  studentType: string;
  ucat: string;
  alevel: string;
  hours: string;
  ielts: string;
};

export function AdmissionProbabilityCalculator() {
  const form = useForm<FormValues>({
    defaultValues: {
      studentType: studentTypes[0],
      ucat: "",
      alevel: "",
      hours: "",
      ielts: "",
    },
  });

  const onSubmit = (values: FormValues) => {
    console.log("Form values:", values);
    // You can handle API calls or state updates here
  };

  return (
    <section className="bg-white py-16">
      <div className="mx-auto grid max-w-2xl grid-cols-1 items-center justify-center gap-12 bg-white px-4 sm:max-w-3xl sm:px-6 md:max-w-4xl lg:max-w-5xl lg:grid-cols-2 lg:px-8">
        {/* Left side */}
        <div className="flex flex-col items-center space-y-6 md:items-start">
          <Title>Admission Probability Calculator</Title>
          <h2 className="w-[80%] text-center text-3xl leading-[150%] font-bold text-gray-900 sm:text-4xl md:text-left md:leading-[120%]">
            Check Your Dental School Admission Chances!
          </h2>
        </div>

        {/* Right side: form */}
        <Form {...form}>
          <form
            className="space-y-14 rounded-2xl border bg-white p-8 md:p-10"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            {/* Student type */}
            <FormField
              control={form.control}
              name="studentType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary-700 mb-3 font-medium">
                    Select student type
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      className="flex flex-wrap gap-4"
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      {studentTypes.map((type) => (
                        <label
                          key={type}
                          className="font-sora flex items-center space-x-2"
                        >
                          <RadioGroupItem value={type} id={type} />
                          <span className="text-xs text-gray-700">{type}</span>
                        </label>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Academic info */}
            <div className="space-y-6">
              <h3 className="text-primary-700 text-2xl font-semibold">
                Enter Your Academic Information
              </h3>
              <FormField
                control={form.control}
                name="ucat"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-greys-1000 font-sora text-xs font-light">
                      What is your UCAT score?
                    </FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select score range" />
                        </SelectTrigger>
                        <SelectContent>
                          {scoreRanges.map((r) => (
                            <SelectItem key={r} value={r}>
                              {r}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="alevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-greys-1000 font-sora text-xs font-light">
                      What are your predicted or achieved A-Level grades?
                    </FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select score range" />
                        </SelectTrigger>
                        <SelectContent>
                          {scoreRanges.map((r) => (
                            <SelectItem key={r} value={r}>
                              {r}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="hours"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-greys-1000 font-sora text-xs font-light">
                      How many hours of dental work experience have you
                      completed?
                    </FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select score range" />
                        </SelectTrigger>
                        <SelectContent>
                          {scoreRanges.map((r) => (
                            <SelectItem key={r} value={r}>
                              {r}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ielts"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-greys-1000 font-sora text-xs font-light">
                      What is your IELTS score?
                    </FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select score range" />
                        </SelectTrigger>
                        <SelectContent>
                          {scoreRanges.map((r) => (
                            <SelectItem key={r} value={r}>
                              {r}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="bg-primary hover:bg-primary-700 w-full text-white"
            >
              Calculate Your Chances
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
}
