import { BaseApiResponse } from "@/src/connection/api-types";

export interface ALevelGrade {
  subject: string;
  grade: string;
}

export interface BasicDetailsFormData {
  emailAddress: string;
  academicYear: number;
  takenOrPlanningCasper: boolean;
  whyDentistry: string;
  category: "DENTAL_HYGIENE" | "BDS" | "DENTAL_NURSING";
  alevelGrades: ALevelGrade[];
}

export interface DentalExperienceFormData {
  emailAddress: string;
  hasDentalWorkExperienceOrVolunteering: boolean;
  interestedDentalSchools: string[];
  biggestApplicationChallenges: string[];
}

export interface MentorAvailabilityFormData {
  emailAddress: string;
  mentorAvailable: boolean;
  qualifyForFinancialSupport: boolean;
  howDidYouHearAboutUs: string;
}

export interface PaymentInitiationFormData {
  platformUserEmailAddress: string;
  action: "MEMBERSHIP_REGISTRATION" | "MEMBERSHIP_RENEWAL";
}

export interface PaymentInitiationResponseData {
  checkoutUrl: string;
  customerEmail: string;
  amount: number;
  currency: string;
  transactionReference: string;
}

export interface TransactionVerificationResponseData {
  verified: boolean;
  failed: boolean;
  gatewayStatus: string;
  amount: number;
  provider: string;
  failureReason: string;
  transactionReference: string;
}

export interface PremiumActivationFormData {
  userEmailAddress: string;
  paymentReference: string;
}

export interface PaymentSetupStep1Data {
  academicYear: number;
  gcseGrades?: string;
  takenUCAT?: boolean;
  whyDentistry: string;
}

export interface PaymentSetupStep2Data {
  dentalExperience?: string;
  interestedSchools: string[];
  applicationChallenges?: string;
}

export interface PaymentSetupStep3Data {
  mentorshipAvailability?: string;
  financialSupport?: boolean;
  hearAboutDentispark?: string;
}

export interface PaymentSetupFormData
  extends PaymentSetupStep1Data,
    PaymentSetupStep2Data,
    PaymentSetupStep3Data {}

export type BasicDetailsResponse = BaseApiResponse<string>;
export type DentalExperienceResponse = BaseApiResponse<string>;
export type MentorAvailabilityResponse = BaseApiResponse<string>;
export type AdditionalDetailsResponse = BaseApiResponse<string>;
export type PaymentInitiationResponse = PaymentInitiationResponseData;
export type TransactionVerificationResponse =
  TransactionVerificationResponseData;
export type PremiumActivationResponse = BaseApiResponse<string>;

export type PaymentSetupResponse = BaseApiResponse<{
  setupComplete: boolean;
  redirectUrl?: string;
}>;

export interface StepProps {
  data: Partial<PaymentSetupFormData>;
  onNext: (stepData: Partial<PaymentSetupFormData>) => void;
  onPrevious: () => void;
  isLoading?: boolean;
}

export const PAYMENT_SETUP_STEPS = {
  STEP_1: 1,
  STEP_2: 2,
  STEP_3: 3,
} as const;

export type PaymentSetupStep =
  (typeof PAYMENT_SETUP_STEPS)[keyof typeof PAYMENT_SETUP_STEPS];
