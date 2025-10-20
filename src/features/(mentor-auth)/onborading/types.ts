import type { ApiResponse } from "@/src/connection/api-types";

export type OnboardingStep =
  | "account-registration"
  | "profile-registration"
  | "onboarding";

export interface OnboardingState {
  currentStep: OnboardingStep;
  completedSteps: OnboardingStep[];
  formData: {
    accountRegistration?: AccountRegistrationData;
    profileVerification?: ProfileVerificationData;
    onboarding?: OnboardingTrainingData;
  };
}

export interface AccountRegistrationData {
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  areaOfSpecialization: string;
  yearsInDentistry: string;
  agreeToTerms: boolean;
}

export interface ProfileVerificationData {
  documents: {
    curriculumVitae?: File;
    certifications?: File;
    dbsPvgProof?: File;
    recommendationLetters?: File;
  };
  expertiseArea: string;
  experienceWithUKDentalAdmissions: string;
  interviewScheduling: {
    selectedDate?: Date;
    selectedTime?: string;
    agreeToDataProcessing: boolean;
  };
}

export interface OnboardingTrainingData {
  quizCompleted: boolean;
  quizScore: number;
  correctAnswers: number;
  totalQuestions: number;
}

export interface UploadedFile {
  name: string;
  uploadedAt: Date;
  size: number;
}

export interface DocumentUploadState {
  curriculumVitae?: UploadedFile;
  certifications?: UploadedFile;
  dbsPvgProof?: UploadedFile;
  recommendationLetters?: UploadedFile;
}

export const EXPERTISE_AREAS = [
  { value: "ucat", label: "UCAT" },
  { value: "personal-statements", label: "Personal statements" },
  { value: "mmis", label: "MMIs" },
  { value: "school-specific-advice", label: "School-specific advice" },
];

export interface MentorSignupRequest {
  emailAddress: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  memberType: "ACADEMIC_MENTOR";
  password: string;
  areaOfSpecialization: string;
  yearsInDentistry: string;
}

export type MentorSignupResponse = ApiResponse<string>;

// Form validation schemas will be defined in components
export interface OnboardingFormProps {
  onNextAction: (data: unknown) => void;
  onBackAction?: () => void;
  initialData?: unknown;
  isLoading?: boolean;
}

// Progress bar configuration
export interface StepConfig {
  id: OnboardingStep;
  title: string;
  description: string;
  stepNumber: number;
}

export const ONBOARDING_STEPS: StepConfig[] = [
  {
    id: "account-registration",
    title: "Account Registration",
    description: "Create your mentor account",
    stepNumber: 1,
  },
  {
    id: "profile-registration",
    title: "Profile Verification",
    description: "Upload documents and verify credentials",
    stepNumber: 2,
  },
  {
    id: "onboarding",
    title: "Onboarding",
    description: "Complete training and quiz",
    stepNumber: 3,
  },
];

// Specialization options
export const SPECIALIZATION_OPTIONS = [
  { value: "general-dentistry", label: "General Dentistry" },
  { value: "orthodontics", label: "Orthodontics" },
  { value: "oral-surgery", label: "Oral Surgery" },
  { value: "periodontics", label: "Periodontics" },
  { value: "endodontics", label: "Endodontics" },
  { value: "prosthodontics", label: "Prosthodontics" },
  { value: "pediatric-dentistry", label: "Pediatric Dentistry" },
  { value: "oral-pathology", label: "Oral Pathology" },
  { value: "dental-public-health", label: "Dental Public Health" },
  { value: "oral-radiology", label: "Oral Radiology" },
  { value: "other", label: "Other" },
];

// Years of experience options
export const YEARS_EXPERIENCE_OPTIONS = [
  { value: "1-2", label: "1-2 years" },
  { value: "3-5", label: "3-5 years" },
  { value: "6-10", label: "6-10 years" },
  { value: "11-15", label: "11-15 years" },
  { value: "16-20", label: "16-20 years" },
  { value: "20+", label: "20+ years" },
];

// Interview scheduling time slots
export const TIME_SLOTS = [
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
];

// Calendar utilities
export const DAYS_OF_WEEK = [
  { key: "sun", label: "S" },
  { key: "mon", label: "M" },
  { key: "tue", label: "T" },
  { key: "wed", label: "W" },
  { key: "thu", label: "T" },
  { key: "fri", label: "F" },
  { key: "sat", label: "S" },
];
export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
