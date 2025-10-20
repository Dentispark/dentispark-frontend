"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus } from "lucide-react";
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
import Image from "next/image";

const workEntrySchema = z.object({
  organization: z.string().min(1, "Organization name is required"),
  fromDate: z.string().min(1, "From date is required"),
  toDate: z.string().min(1, "To date is required"),
  description: z.string().optional(),
});

const editWorkSchema = z.object({
  workExperiences: z
    .array(workEntrySchema)
    .min(1, "At least one work experience is required"),
});

type EditWorkFormData = z.infer<typeof editWorkSchema>;

interface EditWorkModalProps {
  onSave: (data: EditWorkFormData) => void;
  onCancel: () => void;
  initialData?: Partial<EditWorkFormData>;
}

export function EditWorkModal({
  onSave,
  onCancel,
  initialData,
}: EditWorkModalProps) {
  const [wordCounts, setWordCounts] = useState<number[]>([0]);

  const form = useForm<EditWorkFormData>({
    resolver: zodResolver(editWorkSchema),
    defaultValues: {
      workExperiences: initialData?.workExperiences || [
        {
          organization: "",
          fromDate: "",
          toDate: "",
          description: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "workExperiences",
  });

  const onSubmit = (data: EditWorkFormData) => {
    onSave(data);
  };

  const addNewWorkExperience = () => {
    append({
      organization: "",
      fromDate: "",
      toDate: "",
      description: "",
    });
    setWordCounts([...wordCounts, 0]);
  };

  const countWords = (text: string) => {
    return text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  };

  const handleDescriptionChange = (value: string, index: number) => {
    const newWordCounts = [...wordCounts];
    newWordCounts[index] = countWords(value);
    setWordCounts(newWordCounts);
    return value;
  };

  const removeWorkExperience = (index: number) => {
    remove(index);
    const newWordCounts = [...wordCounts];
    newWordCounts.splice(index, 1);
    setWordCounts(newWordCounts);
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">
          Edit work experience information
        </h2>
        <Button
          type="button"
          onClick={addNewWorkExperience}
          className="flex items-center gap-2"
          variant="outline"
          size="sm"
        >
          <Plus className="h-4 w-4" />
          Add
        </Button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="space-y-4 rounded-lg border border-gray-200 p-4"
            >
              {/* Organization Field */}
              <FormField
                control={form.control}
                name={`workExperiences.${index}.organization`}
                render={({ field: orgField }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Organization
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...orgField}
                          className="h-12 pr-12"
                          placeholder="Enter organization name"
                        />
                        <div className="absolute top-1/2 right-3 -translate-y-1/2">
                          <Image
                            src="/images/uni-svg.png"
                            alt="Organization"
                            width={24}
                            height={24}
                            className="h-6 w-6 object-contain"
                          />
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Date Fields */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name={`workExperiences.${index}.fromDate`}
                  render={({ field: fromField }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        From
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...fromField}
                          type="date"
                          className="h-12"
                          placeholder="DD-MM-YYYY"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`workExperiences.${index}.toDate`}
                  render={({ field: toField }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        To
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...toField}
                          type="date"
                          className="h-12"
                          placeholder="DD-MM-YYYY"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Description Field */}
              <FormField
                control={form.control}
                name={`workExperiences.${index}.description`}
                render={({ field: descField }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Description of work experience
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...descField}
                        placeholder="Tell us about your experience"
                        className="min-h-[120px] resize-none"
                        onChange={(e) => {
                          const value = handleDescriptionChange(
                            e.target.value,
                            index,
                          );
                          descField.onChange(value);
                        }}
                      />
                    </FormControl>
                    <div className="font-sora text-xs text-gray-500">
                      Word count: {wordCounts[index] || 0}/1000
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Remove button for additional work experiences */}
              {fields.length > 1 && (
                <div className="flex justify-end">
                  <Button
                    type="button"
                    onClick={() => removeWorkExperience(index)}
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                  >
                    Remove
                  </Button>
                </div>
              )}
            </div>
          ))}

          {/* Action Buttons */}
          <div className="font-sora flex w-full gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="flex-1 px-6"
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1 px-6">
              Save changes
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
