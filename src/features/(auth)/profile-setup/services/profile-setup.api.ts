// import { baseApi } from "@/src/connection/base-api";

export interface ProfileSetupRequest {
  academicYear: string;
  targetDentalSchools: string;
  countryOfResidence: string;
  ucatStatus: string;
}

export interface ProfileSetupResponse {
  success: boolean;
  message: string;
  userId?: string;
}

export const profileSetupApi = {
  setupProfile: async (
    data: ProfileSetupRequest,
  ): Promise<ProfileSetupResponse> => {
    // const response = await baseApi.post("/auth/profile-setup", data);
    // return response.data;
    
    // Temporary mock response - TODO: Replace with actual API call
    console.log("Profile setup data:", data);
    return {
      success: true,
      message: "Profile setup successfully",
    };
  },
};
