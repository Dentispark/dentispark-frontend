// Store file for new-password feature
// Currently using React state in the component
// Can be enhanced with global state management when needed

export interface NewPasswordState {
  email: string;
  token: string;
  password: string;
  confirmPassword: string;
  isComplete: boolean;
  error: string | null;
}

export const initialNewPasswordState: NewPasswordState = {
  email: "",
  token: "",
  password: "",
  confirmPassword: "",
  isComplete: false,
  error: null,
};
