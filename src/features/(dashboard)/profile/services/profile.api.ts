import { BaseAPI } from "@/src/connection/base-api";
import type { AcademicProfile } from "@/src/connection/api-types";

export interface UpdateStudentProfileRequest {
  fullName?: string;
  mobileNumber?: string;
  profilePicture?: string;
  linkedinUrl?: string;
  biography?: string;
}

export interface StudentProfileData {
  fullName: string;
  emailAddress: string;
  mobileNumber?: string;
  profilePicture?: string;
  linkedinProfileUrl?: string;
  biography?: string;
}

class ProfileAPIService extends BaseAPI {
  constructor() {
    super();
  }

  async GETACADEMICPROFILE(): Promise<AcademicProfile> {
    return this.get<AcademicProfile>("/student/academic-profile");
  }

  async UPDATESTUDENTPROFILE(
    payload: UpdateStudentProfileRequest,
  ): Promise<StudentProfileData> {
    return this.patch<StudentProfileData>("/student/profile", payload);
  }
}

const profileAPIService = new ProfileAPIService();

export { profileAPIService };
