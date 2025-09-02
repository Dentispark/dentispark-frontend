import type { ProfileFormData, AcademicFormData } from "../types";

// Mock API functions - replace with real API calls
export const profileApi = {
  updateProfile: async (data: ProfileFormData): Promise<ProfileFormData> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock successful response
    return data;
  },

  updateAcademicProfile: async (
    data: AcademicFormData,
  ): Promise<AcademicFormData> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock successful response
    return data;
  },

  getProfile: async (): Promise<ProfileFormData> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Mock profile data
    return {
      fullName: "John Doe",
      email: "johndoe@dentispark.co.uk",
      phoneNumber: "",
      linkedinUrl: "",
      biography:
        "Hi there! 👋 I'm John Doe, an AI enthusiast and fitness aficionado. When I'm not crunching numbers or optimizing algorithms, you can find me hitting the gym.",
    };
  },

  getAcademicProfile: async (): Promise<AcademicFormData> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Mock academic data
    return {
      yearOfStudy: "year-12",
      gcseResult: "7-9",
      ucatScore: "Unavailable",
      biologyGrade: "A",
      chemistryGrade: "B",
      otherSubject: "Mathematics",
      otherSubjectGrade: "A",
    };
  },
};
