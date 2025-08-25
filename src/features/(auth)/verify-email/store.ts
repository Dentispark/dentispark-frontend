// Store file for verify-email feature
// Currently using React state in the component
// Can be enhanced with global state management when needed

export interface VerifyEmailState {
  email: string;
  code: string;
  isVerified: boolean;
  timeLeft: number;
  error: string | null;
}

export const initialVerifyEmailState: VerifyEmailState = {
  email: "",
  code: "",
  isVerified: false,
  timeLeft: 59,
  error: null,
};
