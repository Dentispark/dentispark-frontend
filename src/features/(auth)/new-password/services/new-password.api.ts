// import { baseAPI } from "@/src/connection/base-api";

export interface ResetPasswordData {
  email: string;
  token: string;
  password: string;
}

export interface ResetPasswordResponse {
  success: boolean;
  message: string;
}

export const newPasswordAPI = {
  resetPassword: async (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _data: ResetPasswordData,
  ): Promise<ResetPasswordResponse> => {
    try {
      // TODO: Replace with actual API call when backend is ready
      // const response = await baseAPI.post("/auth/reset-password", data);
      // return response.data;

      // Simulate API call for now
      await new Promise((resolve) => setTimeout(resolve, 1500));

      return {
        success: true,
        message: "Password reset successfully",
      };
    } catch (error) {
      console.error("Error resetting password:", error);
      throw new Error("Failed to reset password");
    }
  },
};
