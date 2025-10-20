export interface StudentFeedback {
  id: string;
  studentName: string;
  studentAvatar?: string;
  year: string;
  rating: number;
  feedback: string;
  date: string;
  bgColor: string;
  borderColor: string;
}

export interface ContactSupportRequest {
  message: string;
  mentorId: string;
}

export interface ContactSupportResponse {
  success: boolean;
  message: string;
}
