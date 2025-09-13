"use client";

import { useState, useEffect } from "react";
import { authCookies } from "@/src/lib/cookies";
import type { LoginResponseData } from "@/src/features/(auth)/type";

/**
 * Hook to manage authentication state using cookies
 */
export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<LoginResponseData | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAuthState = () => {
      try {
        const token = authCookies.getAccessToken();
        const userData = authCookies.getUserData() as LoginResponseData | null;

        if (token && userData) {
          // Check if token is expired
          const tokenExpiredAt = new Date(userData.auth.tokenExpiredAt);
          const now = new Date();

          if (now < tokenExpiredAt) {
            setIsAuthenticated(true);
            setUser(userData);
            setAccessToken(token);
          } else {
            // Token expired, clear auth data
            authCookies.clearAll();
            setIsAuthenticated(false);
            setUser(null);
            setAccessToken(null);
          }
        } else {
          setIsAuthenticated(false);
          setUser(null);
          setAccessToken(null);
        }
      } catch (error) {
        console.error("Error checking auth state:", error);
        setIsAuthenticated(false);
        setUser(null);
        setAccessToken(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthState();

    // Listen for storage changes (in case auth state changes in another tab)
    const handleStorageChange = () => {
      checkAuthState();
    };

    window.addEventListener("storage", handleStorageChange);

    // Custom event for when cookies are updated
    window.addEventListener("auth-state-changed", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("auth-state-changed", handleStorageChange);
    };
  }, []);

  /**
   * Manually refresh auth state (useful after login/logout)
   */
  const refreshAuthState = () => {
    setIsLoading(true);
    const token = authCookies.getAccessToken();
    const userData = authCookies.getUserData() as LoginResponseData | null;

    if (token && userData) {
      const tokenExpiredAt = new Date(userData.auth.tokenExpiredAt);
      const now = new Date();

      if (now < tokenExpiredAt) {
        setIsAuthenticated(true);
        setUser(userData);
        setAccessToken(token);
      } else {
        authCookies.clearAll();
        setIsAuthenticated(false);
        setUser(null);
        setAccessToken(null);
      }
    } else {
      setIsAuthenticated(false);
      setUser(null);
      setAccessToken(null);
    }
    setIsLoading(false);

    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent("auth-state-changed"));
  };

  return {
    isAuthenticated,
    user,
    accessToken,
    isLoading,
    refreshAuthState,
    // Convenience getters
    userGuid: user?.guid || null,
    userEmail: user?.emailAddress || null,
    userRoles: user?.roles || [],
    memberType: user?.memberType || null,
    memberStatus: user?.memberStatus || null,
    profileStatus: user?.profileStatus || null,
    profileSetupStep: user?.profileSetupStep || null,
  };
};
