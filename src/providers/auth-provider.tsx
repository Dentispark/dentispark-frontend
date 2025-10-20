"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import { authCookies } from "@/src/lib/cookies";
import type { LoginResponseData } from "@/src/features/(auth)/type";

interface AuthContextType {
  user: LoginResponseData | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (userData: LoginResponseData) => void;
  logout: () => void;
  refreshAuth: () => void;
  updateUser: (userData: LoginResponseData) => void;
  hasRole: (role: string) => boolean;
  isPremium: boolean;
  isStudent: boolean;
  isMentor: boolean;
  roles: string[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

// const PUBLIC_ROUTES = [
//   "/",
//   "/about-us",
//   "/contact-us",
//   "/resources",
//   "/become-a-mentor",
//   "/login",
//   "/sign-up",
//   "/forgot-password",
//   "/verify-email",
//   "/new-password",
//   "/profile-setup",
// ];

const AUTH_ROUTES = [
  "/login",
  "/sign-up",
  "/forgot-password",
  "/verify-email",
  "/new-password",
  "/profile-setup",
];

const PROTECTED_ROUTES = [
  "/overview",
  "/profile",
  "/applications",
  "/university-hub",
  "/mentorship",
  "/community-hub",
  "/guidance-hub",
];

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<LoginResponseData | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [tokenExpirationTimer, setTokenExpirationTimer] =
    useState<NodeJS.Timeout | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const isAuthRoute = useMemo(
    () => AUTH_ROUTES.some((route) => pathname.startsWith(route)),
    [pathname],
  );

  const isProtectedRoute = useMemo(
    () => PROTECTED_ROUTES.some((route) => pathname.startsWith(route)),
    [pathname],
  );

  const checkAuthState = useCallback(async () => {
    try {
      const accessToken = authCookies.getAccessToken();
      const userData = authCookies.getUserData() as LoginResponseData | null;

      if (accessToken && userData) {
        const tokenExpiredAt = new Date(userData.auth.tokenExpiredAt);
        const now = new Date();

        if (now < tokenExpiredAt) {
          setUser(userData);
          setIsAuthenticated(true);

          if (userData.auth?.tokenExpiredAt) {
            setupTokenExpirationTimer(userData.auth.tokenExpiredAt);
          }

          return true;
        } else {
          authCookies.clearAll();
          setUser(null);
          setIsAuthenticated(false);
          return false;
        }
      } else {
        setUser(null);
        setIsAuthenticated(false);
        return false;
      }
    } catch (error) {
      console.error("Error checking auth state:", error);
      setUser(null);
      setIsAuthenticated(false);
      return false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenExpirationTimer, router]);

  const setupTokenExpirationTimer = useCallback(
    (expirationTime: string) => {
      if (tokenExpirationTimer) {
        clearTimeout(tokenExpirationTimer);
      }

      const expirationDate = new Date(expirationTime);
      const currentTime = new Date();
      const timeUntilExpiration =
        expirationDate.getTime() - currentTime.getTime();

      if (timeUntilExpiration > 0) {
        // Capture user type before the timeout to determine redirect path
        const isMentor = user?.memberType === "ACADEMIC_MENTOR";

        const timer = setTimeout(() => {
          console.log("Token expired, logging out automatically");
          authCookies.clearAll();
          setUser(null);
          setIsAuthenticated(false);
          // Redirect to appropriate login page based on user type
          router.push(isMentor ? "/mentor/login" : "/login");
        }, timeUntilExpiration);

        setTokenExpirationTimer(timer);
      }
    },
    [tokenExpirationTimer, router, user?.memberType],
  );

  const login = useCallback(
    (userData: LoginResponseData) => {
      setUser(userData);
      setIsAuthenticated(true);

      if (userData.auth?.tokenExpiredAt) {
        setupTokenExpirationTimer(userData.auth.tokenExpiredAt);
      }

      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("auth-state-changed"));
      }
    },
    [setupTokenExpirationTimer],
  );

  const updateUser = useCallback((userData: LoginResponseData) => {
    setUser(userData);
  }, []);

  const logout = useCallback(() => {
    // Check if user is a mentor before clearing state
    const isMentor = user?.memberType === "ACADEMIC_MENTOR";

    if (tokenExpirationTimer) {
      clearTimeout(tokenExpirationTimer);
      setTokenExpirationTimer(null);
    }

    authCookies.clearAll();
    setUser(null);
    setIsAuthenticated(false);

    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("auth-state-changed"));
    }

    // Redirect to appropriate login page based on user type
    router.push(isMentor ? "/mentor/login" : "/login");
  }, [tokenExpirationTimer, router, user?.memberType]);

  const refreshAuth = useCallback(async () => {
    setIsLoading(true);
    await checkAuthState();
    setIsLoading(false);
  }, [checkAuthState]);

  useEffect(() => {
    const initAuth = async () => {
      const isAuth = await checkAuthState();
      setIsLoading(false);

      if (!isLoading) {
        if (isAuth && isAuthRoute) {
          // Determine redirect based on both user type and current path
          const isMentor = user?.memberType === "ACADEMIC_MENTOR";
          const isOnMentorRoute = pathname.startsWith("/mentor");

          let redirectTo: string;

          if (user?.profileStatus === "PENDING") {
            redirectTo = "/profile-setup";
          } else if (isOnMentorRoute || isMentor) {
            // If on mentor route or user is a mentor, go to mentor dashboard
            redirectTo = "/mentor/overview";
          } else {
            // Default to student dashboard
            redirectTo = "/overview";
          }

          router.replace(redirectTo);
        }

        if (!isAuth && isProtectedRoute) {
          // Redirect to appropriate login based on current path
          const loginPath = pathname.startsWith("/mentor")
            ? "/mentor/login"
            : "/login";
          router.replace(loginPath);
        }
      }
    };

    initAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isLoading) return;

    if (isAuthenticated && isAuthRoute) {
      // Determine redirect based on both user type and current path
      const isMentor = user?.memberType === "ACADEMIC_MENTOR";
      const isOnMentorRoute = pathname.startsWith("/mentor");

      let redirectTo: string;

      if (user?.profileStatus === "PENDING") {
        redirectTo = "/profile-setup";
      } else if (isOnMentorRoute || isMentor) {
        // If on mentor route or user is a mentor, go to mentor dashboard
        redirectTo = "/mentor/overview";
      } else {
        // Default to student dashboard
        redirectTo = "/overview";
      }

      router.replace(redirectTo);
      return;
    }

    if (!isAuthenticated && isProtectedRoute) {
      // Redirect to appropriate login based on current path
      const loginPath = pathname.startsWith("/mentor")
        ? "/mentor/login"
        : "/login";
      router.replace(loginPath);
      return;
    }
  }, [
    pathname,
    isAuthenticated,
    isAuthRoute,
    isProtectedRoute,
    router,
    isLoading,
    user?.profileStatus,
    user?.memberType,
  ]);

  useEffect(() => {
    const handleAuthStateChange = () => {
      refreshAuth();
    };

    if (typeof window !== "undefined") {
      window.addEventListener("auth-state-changed", handleAuthStateChange);

      return () => {
        window.removeEventListener("auth-state-changed", handleAuthStateChange);
      };
    }
  }, [refreshAuth]);

  useEffect(() => {
    return () => {
      if (tokenExpirationTimer) {
        clearTimeout(tokenExpirationTimer);
      }
    };
  }, [tokenExpirationTimer]);

  const roles = useMemo(() => user?.roles || [], [user?.roles]);

  const hasRole = useCallback(
    (role: string): boolean => {
      return roles.includes(role);
    },
    [roles],
  );

  const isPremium = useMemo(() => hasRole("PREMIUM"), [hasRole]);

  const isStudent = useMemo(
    () => user?.memberType === "STUDENT",
    [user?.memberType],
  );

  const isMentor = useMemo(
    () => user?.memberType === "ACADEMIC_MENTOR",
    [user?.memberType],
  );

  const value: AuthContextType = useMemo(
    () => ({
      user,
      isAuthenticated,
      isLoading,
      login,
      logout,
      refreshAuth,
      hasRole,
      updateUser,
      isPremium,
      isStudent,
      isMentor,
      roles,
    }),
    [
      user,
      isAuthenticated,
      isLoading,
      login,
      logout,
      refreshAuth,
      hasRole,
      updateUser,
      isPremium,
      isStudent,
      isMentor,
      roles,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export { AuthContext };
