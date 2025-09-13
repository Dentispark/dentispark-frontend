"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/providers/auth-provider";
import { Loader2 } from "lucide-react";

interface PublicRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  redirectIfAuthenticated?: boolean;
  redirectTo?: string;
}

export function PublicRoute({
  children,
  fallback,
  redirectIfAuthenticated = false,
  redirectTo,
}: PublicRouteProps) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated && redirectIfAuthenticated) {
      const defaultRedirect =
        user?.profileStatus === "PENDING" ? "/profile-setup" : "/overview";
      router.replace(redirectTo || defaultRedirect);
    }
  }, [
    isAuthenticated,
    isLoading,
    user?.profileStatus,
    redirectIfAuthenticated,
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

  if (isAuthenticated && redirectIfAuthenticated) {
    return null; // Router will handle redirect
  }

  return <>{children}</>;
}

// Higher-order component version
export function withPublicRoute<P extends object>(
  Component: React.ComponentType<P>,
  options?: Omit<PublicRouteProps, "children">,
) {
  return function PublicComponent(props: P) {
    return (
      <PublicRoute {...options}>
        <Component {...props} />
      </PublicRoute>
    );
  };
}
