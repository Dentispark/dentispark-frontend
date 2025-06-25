// import { baseAPI } from "@/src/connection/base-api";

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  agreeToPrivacy: boolean;
}

export interface ContactFormResponse {
  success: boolean;
  message: string;
}

export const contactUsAPI = {
  submitContact: async (
    data: ContactFormData,
  ): Promise<ContactFormResponse> => {
    try {
      // TODO: Replace with actual API call when backend is ready
      // const response = await baseAPI.post("/contact", data);
      // return response.data;

      // Simulate API call for now
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return {
        success: true,
        message: "Contact form submitted successfully",
      };
    } catch (error) {
      console.error("Error submitting contact form:", error);
      throw new Error("Failed to submit contact form");
    }
  },
};
