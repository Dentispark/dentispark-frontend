import { useMutation } from "@tanstack/react-query";
import {
  contactUsAPI,
  type ContactFormData,
  type ContactFormResponse,
} from "./contact-us.api";

export const useSubmitContactForm = () => {
  return useMutation<ContactFormResponse, Error, ContactFormData>({
    mutationFn: contactUsAPI.submitContact,
    onSuccess: (data) => {
      console.log("Contact form submitted successfully:", data);
    },
    onError: (error) => {
      console.error("Error submitting contact form:", error);
    },
  });
};
