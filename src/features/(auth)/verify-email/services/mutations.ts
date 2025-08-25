import { useMutation } from "@tanstack/react-query";
import {
  verifyEmailAPI,
  type VerifyEmailData,
  type VerifyEmailResponse,
  type ResendCodeData,
  type ResendCodeResponse,
} from "./verify-email.api";

export const useVerifyEmail = () => {
  return useMutation<VerifyEmailResponse, Error, VerifyEmailData>({
    mutationFn: verifyEmailAPI.verifyCode,
    onSuccess: (data) => {
      console.log("Email verified successfully:", data);
    },
    onError: (error) => {
      console.error("Error verifying email:", error);
    },
  });
};

export const useResendCode = () => {
  return useMutation<ResendCodeResponse, Error, ResendCodeData>({
    mutationFn: verifyEmailAPI.resendCode,
    onSuccess: (data) => {
      console.log("Verification code resent successfully:", data);
    },
    onError: (error) => {
      console.error("Error resending verification code:", error);
    },
  });
};
