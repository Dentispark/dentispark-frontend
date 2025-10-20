import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { PaymentSetupApi } from "./api";
import {
  BasicDetailsFormData,
  DentalExperienceFormData,
  MentorAvailabilityFormData,
  PaymentInitiationFormData,
  PremiumActivationFormData,
} from "../types";

const paymentSetupApi = new PaymentSetupApi();

export const useSubmitBasicDetails = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: BasicDetailsFormData) =>
      paymentSetupApi.submitBasicDetails(data),
    onSuccess: () => {
      toast.success("Basic details submitted successfully!");

      queryClient.invalidateQueries({ queryKey: ["payment-setup"] });

      if (onSuccess) {
        onSuccess();
      }
    },
    onError: (error: unknown) => {
      const err = error as {
        response?: { data?: { message?: string } };
        message?: string;
      };
      const errorMessage =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to submit basic details. Please try again.";
      toast.error(errorMessage);
    },
  });
};

export const useSubmitDentalExperience = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: DentalExperienceFormData) =>
      paymentSetupApi.submitDentalExperience(data),
    onSuccess: () => {
      toast.success("Dental experience submitted successfully!");

      queryClient.invalidateQueries({ queryKey: ["payment-setup"] });

      if (onSuccess) {
        onSuccess();
      }
    },
    onError: (error: unknown) => {
      const err = error as {
        response?: { data?: { message?: string } };
        message?: string;
      };
      const errorMessage =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to submit dental experience. Please try again.";
      toast.error(errorMessage);
    },
  });
};

export const useSubmitMentorAvailability = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: MentorAvailabilityFormData) =>
      paymentSetupApi.submitMentorAvailability(data),
    onSuccess: () => {
      toast.success("Mentor availability submitted successfully!");

      queryClient.invalidateQueries({ queryKey: ["payment-setup"] });

      if (onSuccess) {
        onSuccess();
      }
    },
    onError: (error: unknown) => {
      const err = error as {
        response?: { data?: { message?: string } };
        message?: string;
      };
      const errorMessage =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to submit mentor availability. Please try again.";
      toast.error(errorMessage);
    },
  });
};

export const useSubmitAdditionalDetails = (onSuccess?: () => void) => {
  return useSubmitMentorAvailability(onSuccess);
};

export const useInitiatePayment = (
  onSuccess?: (checkoutUrl: string) => void,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: PaymentInitiationFormData) =>
      paymentSetupApi.initiatePayment(data),
    onSuccess: (response) => {
      toast.success("Payment initiated successfully!");

      queryClient.invalidateQueries({ queryKey: ["payment-setup"] });

      if (onSuccess) {
        const checkoutUrl = response?.checkoutUrl;
        if (checkoutUrl) {
          onSuccess(checkoutUrl);
        } else {
          toast.error("Payment initiated but no checkout URL received");
        }
      }
    },
    onError: (error: unknown) => {
      const err = error as {
        response?: { data?: { message?: string } };
        message?: string;
      };
      const errorMessage =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to initiate payment. Please try again.";
      toast.error(errorMessage);
    },
  });
};

export const useActivatePremium = () => {
  return useMutation({
    mutationFn: (data: PremiumActivationFormData) =>
      paymentSetupApi.activatePremium(data),
    onSuccess: (response) => {
      if (response.responseCode === "00") {
        toast.success("Premium membership activated successfully!");
      } else {
        toast.error(
          response.responseMessage || "Failed to activate premium membership",
        );
      }
    },
    onError: (error: unknown) => {
      const err = error as {
        response?: { data?: { message?: string } };
        message?: string;
      };
      const errorMessage =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to activate premium membership. Please try again.";
      toast.error(errorMessage);
    },
  });
};
