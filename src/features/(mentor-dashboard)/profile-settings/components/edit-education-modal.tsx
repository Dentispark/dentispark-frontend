"use client";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus } from "lucide-react";
import { Input } from "@/src/components/ui/input";
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

const educationEntrySchema = z.object({
  school: z.string().min(1, "School name is required"),
  fromDate: z.string().min(1, "From date is required"),
  toDate: z.string().min(1, "To date is required"),
});

const editEducationSchema = z.object({
  schools: z
    .array(educationEntrySchema)
    .min(1, "At least one school is required"),
});

type EditEducationFormData = z.infer<typeof editEducationSchema>;

interface EditEducationModalProps {
  onSave: (data: EditEducationFormData) => void;
  onCancel: () => void;
  initialData?: Partial<EditEducationFormData>;
}

export function EditEducationModal({
  onSave,
  onCancel,
  initialData,
}: EditEducationModalProps) {
  const form = useForm<EditEducationFormData>({
    resolver: zodResolver(editEducationSchema),
    defaultValues: {
      schools: initialData?.schools || [
        {
          school: "University of Newcastle",
          fromDate: "",
          toDate: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "schools",
  });

  const onSubmit = (data: EditEducationFormData) => {
    onSave(data);
  };

  const addNewSchool = () => {
    append({
      school: "University of Newcastle",
      fromDate: "",
      toDate: "",
    });
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">
          Edit educational information
        </h2>
        <Button
          type="button"
          onClick={addNewSchool}
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
              {/* School Field */}
              <FormField
                control={form.control}
                name={`schools.${index}.school`}
                render={({ field: schoolField }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      School
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...schoolField}
                          className="h-12 pr-12"
                          placeholder="Enter school name"
                        />
                        <div className="absolute top-1/2 right-3 -translate-y-1/2">
                          <Image
                            src="/images/uni-svg.png"
                            alt="University"
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
                  name={`schools.${index}.fromDate`}
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
                  name={`schools.${index}.toDate`}
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

              {/* Remove button for additional schools */}
              {fields.length > 1 && (
                <div className="flex justify-end">
                  <Button
                    type="button"
                    onClick={() => remove(index)}
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
