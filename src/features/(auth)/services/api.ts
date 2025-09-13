import { apiClient } from "@/src/connection";
import type { ApiResponse } from "@/src/connection/api-types";
import type {
  OAuth2SignupRequest,
  SignupRequest,
  LoginRequest,
  LoginResponseData,
  ProfileSetupRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  VerifyEmailRequest,
  ResendCodeRequest,
} from "../type";

export const authApi = {
  SIGNUP: async (data: SignupRequest): Promise<ApiResponse<string>> => {
    return apiClient.postFullResponse<string>(
      "/auth/platform-member/signup",
      data,
    );
  },

  OAUTH2_SIGNUP: async (
    data: OAuth2SignupRequest,
  ): Promise<ApiResponse<string>> => {
    return apiClient.postFullResponse<string>(
      "/auth/platform-member/oauth2/signup",
      data,
    );
  },

  LOGIN: async (
    data: LoginRequest,
  ): Promise<ApiResponse<LoginResponseData>> => {
    return apiClient.postFullResponse<LoginResponseData>(
      "/auth/platform-member/login",
      data,
    );
  },

  PROFILE_SETUP: async (
    data: ProfileSetupRequest,
  ): Promise<ApiResponse<string>> => {
    return apiClient.postFullResponse<string>(
      "/student-profile/freemium/profile",
      data,
    );
  },

  FORGOT_PASSWORD: async (
    data: ForgotPasswordRequest,
  ): Promise<ApiResponse<string>> => {
    return apiClient.postFullResponse<string>(
      "/auth/platform-member/forgot-password",
      data,
    );
  },

  RESET_PASSWORD: async (
    data: ResetPasswordRequest,
  ): Promise<ApiResponse<string>> => {
    return apiClient.postFullResponse<string>(
      "/auth/platform-member/reset-password",
      data,
    );
  },

  VERIFY_EMAIL: async (
    data: VerifyEmailRequest,
  ): Promise<ApiResponse<string>> => {
    return apiClient.postFullResponse<string>(
      "/auth/platform-member/verify-email",
      data,
    );
  },

  RESEND_CODE: async (
    data: ResendCodeRequest,
  ): Promise<ApiResponse<string>> => {
    return apiClient.postFullResponse<string>(
      "/auth/platform-member/resend-verification-code",
      data,
    );
  },
};
