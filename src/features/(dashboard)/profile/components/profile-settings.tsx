"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit, Mail, User } from "lucide-react";
import { toast } from "sonner";

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

import { profileSchema, type ProfileFormData } from "../types";
import { defaultProfileData } from "../constants";
import { profileApi } from "../services";

interface ProfileSettingsProps {
  initialData?: Partial<ProfileFormData>;
}

export function ProfileSettings({ initialData }: ProfileSettingsProps) {
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      ...defaultProfileData,
      ...initialData,
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    try {
      await profileApi.updateProfile(data);
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch {
      toast.error("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between px-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Profile settings
        </h2>
      </div>

      <div className="border-greys-100 border-b p-3 pb-8 md:p-6">
        {/* Profile Header */}
        <div className="shadow-[0_1px_20px_5px_rgba(65,189,145,0.05);] mb-8 flex flex-col items-center gap-6 rounded-2xl border border-[#F5F5F5] bg-[#FAFAFA] p-6 md:flex-row md:items-start md:justify-between md:p-10">
          <div className="flex flex-col items-center gap-4 md:flex-row">
            <div className="relative">
              <div className="bg-primary-100 border-primary-200 flex size-20 items-center justify-center rounded-full border md:size-28">
                <User className="text-primary size-10 md:size-14" />
              </div>
              <button className="border-greys-300 absolute -right-1 -bottom-1 flex size-8 items-center justify-center rounded-full border bg-white md:size-10">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.1665 1.66797H7.49984C3.33317 1.66797 1.6665 3.33464 1.6665 7.5013V12.5013C1.6665 16.668 3.33317 18.3346 7.49984 18.3346H12.4998C16.6665 18.3346 18.3332 16.668 18.3332 12.5013V10.8346"
                    stroke="#4F4F4F"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M13.3666 2.51639L6.7999 9.08306C6.5499 9.33306 6.2999 9.82472 6.2499 10.1831L5.89157 12.6914C5.75823 13.5997 6.3999 14.2331 7.30823 14.1081L9.81657 13.7497C10.1666 13.6997 10.6582 13.4497 10.9166 13.1997L17.4832 6.63306C18.6166 5.49972 19.1499 4.18306 17.4832 2.51639C15.8166 0.849722 14.4999 1.38306 13.3666 2.51639Z"
                    stroke="#4F4F4F"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12.4248 3.45703C12.9831 5.4487 14.5415 7.00703 16.5415 7.5737"
                    stroke="#4F4F4F"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <div className="text-center md:text-left">
              <div className="flex flex-col items-center gap-2 md:flex-row">
                <h3 className="text-2xl font-bold text-gray-900 md:text-3xl">
                  {form.watch("fullName")}
                </h3>
                <span className="bg-primary-100 border-primary-300 text-primary rounded-full border px-2 py-1 text-xs font-medium">
                  Premium
                </span>
              </div>
              <p className="text-black-500 font-sora">{form.watch("email")}</p>
            </div>
          </div>

          <Button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-2"
            size={"lg"}
            disabled={isEditing}
          >
            <Edit className="h-4 w-4" />
            Edit Profile
          </Button>
        </div>

        {/* Profile Form */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mx-auto max-w-3xl space-y-8"
          >
            <div className="grid gap-6">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem className="flex flex-col md:flex-row md:items-center">
                    <FormLabel className="mb-2 text-sm font-medium text-gray-700 md:mb-0 md:basis-2/4">
                      Full Name
                    </FormLabel>
                    <div className="w-full">
                      <FormControl>
                        <Input
                          {...field}
                          disabled={!isEditing}
                          className="h-12"
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex flex-col md:flex-row md:items-center">
                    <FormLabel className="mb-2 text-sm font-medium text-gray-700 md:mb-0 md:basis-2/4">
                      Email Address
                    </FormLabel>
                    <div className="w-full">
                      <FormControl>
                        <div className="relative w-full">
                          <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                          <Input
                            {...field}
                            type="email"
                            disabled={!isEditing}
                            className="h-12 pl-10"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem className="flex flex-col md:flex-row md:items-center">
                    <FormLabel className="mb-2 text-sm font-medium text-gray-700 md:mb-0 md:basis-2/4">
                      Phone Number
                    </FormLabel>
                    <div className="w-full">
                      <FormControl>
                        <div className="flex w-full">
                          <span className="inline-flex items-center rounded-l border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                            US
                          </span>
                          <Input
                            {...field}
                            placeholder="Enter your phone number"
                            disabled={!isEditing}
                            className="h-12 rounded-l-none pl-3"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="linkedinUrl"
                render={({ field }) => (
                  <FormItem className="flex flex-col md:flex-row md:items-center">
                    <FormLabel className="mb-2 text-sm font-medium text-gray-700 md:mb-0 md:basis-2/4">
                      LinkedIn Profile URL
                    </FormLabel>
                    <div className="w-full">
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Add your LinkedIn profile URL"
                          disabled={!isEditing}
                          className="h-12"
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="biography"
              render={({ field }) => (
                <FormItem className="flex flex-col md:flex-row md:items-start">
                  <FormLabel className="mb-2 text-sm font-medium text-gray-700 md:mb-0 md:basis-2/4">
                    Biography
                  </FormLabel>
                  <div className="w-full">
                    <FormControl>
                      <Textarea
                        {...field}
                        disabled={!isEditing}
                        className="min-h-[100px] resize-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>

      {isEditing && (
        <div className="my-6 flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            className="hover:text-primary h-9 px-12 hover:bg-white"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="h-9 px-12"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Saving..." : "Save"}
          </Button>
        </div>
      )}
    </div>
  );
}
