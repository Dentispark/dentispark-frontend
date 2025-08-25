import { useMutation } from "@tanstack/react-query";
import { profileSetupApi, ProfileSetupRequest } from "./profile-setup.api";

export const useProfileSetup = () => {
  return useMutation({
    mutationFn: (data: ProfileSetupRequest) =>
      profileSetupApi.setupProfile(data),
    onSuccess: (data) => {
      console.log("Profile setup successful:", data);
    },
    onError: (error) => {
      console.error("Profile setup failed:", error);
    },
  });
};
