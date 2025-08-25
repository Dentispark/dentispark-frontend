// Store file for forgot password feature
// Currently using React state in the component
// Can be enhanced with global state management when needed

export interface ForgotPasswordState {
  email: string;
  isSubmitted: boolean;
  error: string | null;
}

export const initialForgotPasswordState: ForgotPasswordState = {
  email: "",
  isSubmitted: false,
  error: null,
};
