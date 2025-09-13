import * as z from "zod";

// Form validation schemas
export const profileSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  emailAddress: z.string().email("Please enter a valid email address"),
  phoneNumber: z.string().optional(),
  linkedinUrl: z.string().optional(),
  biography: z.string().optional(),
});

export const academicSchema = z.object({
  yearOfStudy: z.string().min(1, "Please select your year of study"),
  gcseResult: z.string().min(1, "Please enter your GCSE result"),
  ucatScore: z.string().optional(),
  biologyGrade: z.string().min(1, "Please select Biology grade"),
  chemistryGrade: z.string().min(1, "Please select Chemistry grade"),
  otherSubject: z.string().optional(),
  otherSubjectGrade: z.string().optional(),
});

// Type definitions
export type ProfileFormData = z.infer<typeof profileSchema>;
export type AcademicFormData = z.infer<typeof academicSchema>;

// Option types
export interface SelectOption {
  value: string;
  label: string;
}

export interface ProfileData {
  fullName: string;
  email: string;
  phoneNumber?: string;
  linkedinUrl?: string;
  biography?: string;
}

export interface AcademicData {
  yearOfStudy: string;
  gcseResult: string;
  ucatScore?: string;
  biologyGrade: string;
  chemistryGrade: string;
  otherSubject?: string;
  otherSubjectGrade?: string;
}

// API Response types
export interface AcademicProfileResponse {
  yearOfStudy: string;
  gcseResult: string;
  casperScore: string;
  aLevelGrades: Array<{
    subject: string;
    grade: string;
  }>;
}
