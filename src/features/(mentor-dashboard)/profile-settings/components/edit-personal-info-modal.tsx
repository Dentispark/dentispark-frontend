"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { Button } from "@/src/components/ui/button";
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

const editPersonalInfoSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  emailAddress: z.string().email("Please enter a valid email address"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  countryCode: z.string().min(1, "Country code is required"),
  aboutMe: z.string().optional(),
  whyDoIMentor: z.string().optional(),
});

type EditPersonalInfoFormData = z.infer<typeof editPersonalInfoSchema>;

interface EditPersonalInfoModalProps {
  onSave: (data: EditPersonalInfoFormData) => void;
  onCancel: () => void;
  initialData?: Partial<EditPersonalInfoFormData>;
}

export function EditPersonalInfoModal({
  onSave,
  onCancel,
  initialData,
}: EditPersonalInfoModalProps) {
  const [aboutMeWordCount, setAboutMeWordCount] = useState(0);
  const [whyMentorWordCount, setWhyMentorWordCount] = useState(0);

  const form = useForm<EditPersonalInfoFormData>({
    resolver: zodResolver(editPersonalInfoSchema),
    defaultValues: {
      firstName: initialData?.firstName || "John",
      lastName: initialData?.lastName || "Doe",
      emailAddress: initialData?.emailAddress || "johndoe@dentispark.co.uk",
      phoneNumber: initialData?.phoneNumber || "+41 1234567",
      countryCode: initialData?.countryCode || "US",
      aboutMe: initialData?.aboutMe || "",
      whyDoIMentor: initialData?.whyDoIMentor || "",
    },
  });

  const countWords = (text: string) => {
    return text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  };

  const handleAboutMeChange = (value: string) => {
    setAboutMeWordCount(countWords(value));
    return value;
  };

  const handleWhyMentorChange = (value: string) => {
    setWhyMentorWordCount(countWords(value));
    return value;
  };

  const onSubmit = (data: EditPersonalInfoFormData) => {
    onSave(data);
  };

  return (
    <div className="w-full space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Name Fields */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    First name
                  </FormLabel>
                  <FormControl>
                    <Input {...field} className="h-12" />
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
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Last name
                  </FormLabel>
                  <FormControl>
                    <Input {...field} className="h-12" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Contact Fields */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="emailAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Email Address
                  </FormLabel>
                  <FormControl>
                    <Input {...field} type="email" className="h-12" />
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
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Phone number
                  </FormLabel>
                  <FormControl>
                    <div className="flex">
                      <FormField
                        control={form.control}
                        name="countryCode"
                        render={({ field: countryField }) => (
                          <Select
                            onValueChange={countryField.onChange}
                            defaultValue={countryField.value}
                          >
                            <SelectTrigger className="w-20 rounded-r-none border-r-0">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="US">US</SelectItem>
                              <SelectItem value="UK">UK</SelectItem>
                              <SelectItem value="CA">CA</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                      <Input
                        {...field}
                        className="h-12 rounded-l-none"
                        placeholder="+41 1234567"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* About Me */}
          <FormField
            control={form.control}
            name="aboutMe"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">
                  About me
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Tell us about yourself"
                    className="min-h-[120px] resize-none"
                    onChange={(e) => {
                      const value = handleAboutMeChange(e.target.value);
                      field.onChange(value);
                    }}
                  />
                </FormControl>
                <div className="font-sora text-xs text-gray-500">
                  Word count: {aboutMeWordCount}/1000
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Why do I mentor */}
          <FormField
            control={form.control}
            name="whyDoIMentor"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">
                  Why do I mentor?
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Tell us about your reasons..."
                    className="min-h-[120px] resize-none"
                    onChange={(e) => {
                      const value = handleWhyMentorChange(e.target.value);
                      field.onChange(value);
                    }}
                  />
                </FormControl>
                <div className="font-sora text-xs text-gray-500">
                  Word count: {whyMentorWordCount}/1000
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Action Buttons */}
          <div className="font-sora flex w-full gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="flex-1/2 px-6"
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1/2 px-6">
              Save changes
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
