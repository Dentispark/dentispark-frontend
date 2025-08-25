import { useMutation } from "@tanstack/react-query";
import {
  forgotPasswordAPI,
  type ForgotPasswordData,
  type ForgotPasswordResponse,
} from "./forgot-password.api";

export const useForgotPassword = () => {
  return useMutation<ForgotPasswordResponse, Error, ForgotPasswordData>({
    mutationFn: forgotPasswordAPI.sendResetEmail,
    onSuccess: (data) => {
      console.log("Password reset email sent successfully:", data);
    },
    onError: (error) => {
      console.error("Error sending password reset email:", error);
    },
  });
};
