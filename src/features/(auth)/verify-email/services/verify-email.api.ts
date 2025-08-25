// import { baseAPI } from "@/src/connection/base-api";

export interface VerifyEmailData {
  email: string;
  code: string;
}

export interface ResendCodeData {
  email: string;
}

export interface VerifyEmailResponse {
  success: boolean;
  message: string;
}

export interface ResendCodeResponse {
  success: boolean;
  message: string;
}

export const verifyEmailAPI = {
  verifyCode: async (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _data: VerifyEmailData,
  ): Promise<VerifyEmailResponse> => {
    try {
      // TODO: Replace with actual API call when backend is ready
      // const response = await baseAPI.post("/auth/verify-email", data);
      // return response.data;

      // Simulate API call for now
      await new Promise((resolve) => setTimeout(resolve, 1500));

      return {
        success: true,
        message: "Email verified successfully",
      };
    } catch (error) {
      console.error("Error verifying email:", error);
      throw new Error("Failed to verify email");
    }
  },

  resendCode: async (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _data: ResendCodeData,
  ): Promise<ResendCodeResponse> => {
    try {
      // TODO: Replace with actual API call when backend is ready
      // const response = await baseAPI.post("/auth/resend-code", data);
      // return response.data;

      // Simulate API call for now
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return {
        success: true,
        message: "Verification code sent successfully",
      };
    } catch (error) {
      console.error("Error resending verification code:", error);
      throw new Error("Failed to resend verification code");
    }
  },
};
