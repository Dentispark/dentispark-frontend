"use client";

import { useCallback } from "react";
import { toast } from "sonner";

declare global {
  interface Window {
    google: {
      accounts: {
        oauth2: {
          initCodeClient: (config: {
            client_id: string;
            scope: string;
            ux_mode: string;
            callback: (response: GoogleAuthResponse) => void;
            error_callback: (error: unknown) => void;
          }) => {
            requestCode: () => void;
          };
        };
      };
    };
  }
}

interface GoogleAuthResponse {
  code: string;
  scope: string;
  authuser: string;
  prompt: string;
}

interface UseGoogleAuthProps {
  onSuccess: (authorizationCode: string) => void;
  onError?: (error: unknown) => void;
}

export const useGoogleAuth = ({ onSuccess, onError }: UseGoogleAuthProps) => {
  const signInWithGoogle = useCallback(() => {
    if (typeof window === "undefined" || !window.google) {
      toast.error("Google authentication is not available");
      return;
    }

    try {
      const client = window.google.accounts.oauth2.initCodeClient({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
        scope: "openid email profile",
        ux_mode: "popup",
        // redirect_uri: `http://localhost:3000/profile-setup`,
        callback: (response: GoogleAuthResponse) => {
          if (response.code) {
            onSuccess(response.code);
          } else {
            const error = new Error("Failed to get authorization code");
            onError?.(error);
            toast.error("Google authentication failed");
          }
        },
        error_callback: (error: unknown) => {
          console.error("Google OAuth error:", error);
          onError?.(error);
          toast.error("Google authentication failed");
        },
      });

      client.requestCode();
    } catch (error) {
      console.error("Error initializing Google OAuth:", error);
      onError?.(error);
      toast.error("Failed to initialize Google authentication");
    }
  }, [onSuccess, onError]);

  return {
    signInWithGoogle,
  };
};
