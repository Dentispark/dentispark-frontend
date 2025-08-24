// import { baseAPI } from "@/src/connection/base-api";

export interface ForgotPasswordData {
  email: string;
}

export interface ForgotPasswordResponse {
  success: boolean;
  message: string;
}

export const forgotPasswordAPI = {
  sendResetEmail: async (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _data: ForgotPasswordData,
  ): Promise<ForgotPasswordResponse> => {
    try {
      // TODO: Replace with actual API call when backend is ready
      // const response = await baseAPI.post("/auth/forgot-password", data);
      // return response.data;

      // Simulate API call for now
      await new Promise((resolve) => setTimeout(resolve, 1500));

      return {
        success: true,
        message: "Password reset email sent successfully",
      };
    } catch (error) {
      console.error("Error sending password reset email:", error);
      throw new Error("Failed to send password reset email");
    }
  },
};
