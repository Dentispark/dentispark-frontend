import type { ApiResponse } from "@/src/connection/api-types";

export interface SignupRequest {
  emailAddress: string;
  firstName: string;
  lastName: string;
  memberType:
    | "ACADEMIC_MENTOR"
    | "STUDENT"
    | "PLATFORM_ADMIN"
    | "PLATFORM_SYSTEM";
  password: string;
}

export type SignupResponse = ApiResponse<string>;

export interface OAuth2SignupRequest {
  oauth2ProviderAuthorizationCode: string;
  authProvider: "GOOGLE" | "LINKEDIN" | "FACEBOOK";
  memberType:
    | "ACADEMIC_MENTOR"
    | "STUDENT"
    | "PLATFORM_ADMIN"
    | "PLATFORM_SYSTEM";
}

export type OAuth2SignupResponse = ApiResponse<string>;

export interface LoginRequest {
  emailAddress: string;
  password: string;
}

export interface LoginResponseData {
  profilePicture: string;
  fullName: string;
  guid: string;
  emailAddress: string;
  roles: string[];
  linkedinUrl: string;
  mobileNumber: string;
  biography: string;
  memberType:
    | "ACADEMIC_MENTOR"
    | "STUDENT"
    | "PLATFORM_ADMIN"
    | "PLATFORM_SYSTEM";
  memberStatus: "ACTIVE" | "SUSPENDED" | "DEACTIVATED";
  profileStatus: "PENDING" | "COMPLETED";
  profileSetupStep: "STEP1" | "STEP2" | "STEP3";
  auth: {
    accessToken: string;
    type: string;
    tokenIssuedAt: string;
    tokenExpiredAt: string;
  };
}

export type LoginResponse = ApiResponse<LoginResponseData>;

export interface ProfileSetupRequest {
  emailAddress?: string;
  academicYear?: number;
  targetSchools?: string[];
  county?: string;
  takenUCAT?: boolean;
  takenCasper?: boolean;
  category?: "DENTAL_HYGIENE" | "BDS" | "DENTAL_NURSING";
}

export type ProfileSetupResponse = ApiResponse<string>;

export interface ForgotPasswordRequest {
  emailAddress: string;
}

export type ForgotPasswordResponse = ApiResponse<string>;

export interface ResetPasswordRequest {
  token: string;
  emailAddress: string;
  password: string;
  passwordConfirmation: string;
}

export type ResetPasswordResponse = ApiResponse<string>;

export interface VerifyEmailRequest {
  emailAddress: string;
  verificationCode: string;
}

export type VerifyEmailResponse = ApiResponse<string>;

export interface ResendCodeRequest {
  emailAddress: string;
}

export type ResendCodeResponse = ApiResponse<string>;
