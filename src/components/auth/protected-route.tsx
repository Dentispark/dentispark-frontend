"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/providers/auth-provider";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  redirectTo?: string;
  requiresProfile?: boolean;
}

export function ProtectedRoute({
  children,
  fallback,
  redirectTo = "/login",
  requiresProfile = false,
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.replace(redirectTo);
        return;
      }

      // Check if profile setup is required
      if (requiresProfile && user?.profileStatus === "PENDING") {
        router.replace("/profile-setup");
        return;
      }

      // Redirect from profile setup if profile is already completed
      if (
        !requiresProfile &&
        user?.profileStatus === "COMPLETED" &&
        window.location.pathname === "/profile-setup"
      ) {
        router.replace("/overview");
        return;
      }
    }
  }, [
    isAuthenticated,
    isLoading,
    user?.profileStatus,
    requiresProfile,
    redirectTo,
    router,
  ]);

  if (isLoading) {
    return (
      fallback || (
        <div className="flex min-h-screen items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="text-primary h-8 w-8 animate-spin" />
            <p className="text-sm text-gray-600">Loading...</p>
          </div>
        </div>
      )
    );
  }

  if (!isAuthenticated) {
    return null; // Router will handle redirect
  }

  // Check profile requirements
  if (requiresProfile && user?.profileStatus === "PENDING") {
    return null; // Router will handle redirect
  }

  if (
    !requiresProfile &&
    user?.profileStatus === "COMPLETED" &&
    window.location.pathname === "/profile-setup"
  ) {
    return null; // Router will handle redirect
  }

  return <>{children}</>;
}

// Higher-order component version
export function withProtection<P extends object>(
  Component: React.ComponentType<P>,
  options?: Omit<ProtectedRouteProps, "children">,
) {
  return function ProtectedComponent(props: P) {
    return (
      <ProtectedRoute {...options}>
        <Component {...props} />
      </ProtectedRoute>
    );
  };
}
