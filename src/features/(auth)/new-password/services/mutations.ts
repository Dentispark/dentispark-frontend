import { useMutation } from "@tanstack/react-query";
import {
  newPasswordAPI,
  type ResetPasswordData,
  type ResetPasswordResponse,
} from "./new-password.api";

export const useResetPassword = () => {
  return useMutation<ResetPasswordResponse, Error, ResetPasswordData>({
    mutationFn: newPasswordAPI.resetPassword,
    onSuccess: (data) => {
      console.log("Password reset successfully:", data);
    },
    onError: (error) => {
      console.error("Error resetting password:", error);
    },
  });
};
