"use client";

import {
  QueryClient,
  QueryClientProvider,
  MutationCache,
  QueryCache,
} from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { toast } from "sonner";
import { ApiError } from "@/src/connection";

// Global error handler for queries and mutations
const handleError = (
  error: Error,
  context?: { queryKey?: unknown; mutationKey?: unknown },
) => {
  console.error("API Error:", error, context);

  // Handle ApiError instances with specific response codes
  if (error instanceof ApiError) {
    // Handle authentication/session errors
    if (error.isAuthError) {
      if (typeof window !== "undefined") {
        // Clear tokens and storage
        document.cookie =
          "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        document.cookie =
          "refresh_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        sessionStorage.clear();

        // Only redirect if we're not already on a public page
        if (
          !window.location.pathname.includes("/login") &&
          !window.location.pathname.includes("/register") &&
          !window.location.pathname.includes("/forgot-password")
        ) {
          toast.error("Your session has expired. Please log in again.");
          window.location.href = "/login";
        }
      }
      return;
    }

    // Handle validation errors differently
    if (error.isValidationError) {
      toast.error(error.message);
      return;
    }

    // Handle business logic errors
    if (error.isBusinessLogicError) {
      toast.error(error.message);
      return;
    }

    // Handle specific response codes with custom messages
    switch (error.responseCode) {
      case "22":
        toast.error(
          "Service is temporarily unavailable. Please try again later.",
        );
        return;
      case "99":
        toast.error(
          "System error occurred. Please contact support if this persists.",
        );
        return;
      default:
        toast.error(error.message);
        return;
    }
  }

  // Handle legacy authentication errors (fallback)
  if (
    error.message.includes("Your session has expired") ||
    error.message.includes("Authentication required")
  ) {
    // Clear authentication data
    if (typeof window !== "undefined") {
      // Clear tokens and storage
      document.cookie =
        "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
      document.cookie =
        "refresh_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      sessionStorage.clear();

      // Only redirect if we're not already on a public page
      if (
        !window.location.pathname.includes("/login") &&
        !window.location.pathname.includes("/register") &&
        !window.location.pathname.includes("/forgot-password")
      ) {
        toast.error("Your session has expired. Please log in again.");
        window.location.href = "/login";
      }
    }
    return;
  }

  // Handle network errors
  if (
    error.message.includes("Network Error") ||
    error.message.includes("ERR_NETWORK")
  ) {
    toast.error("Network error. Please check your connection and try again.");
    return;
  }

  // Handle validation errors
  if (error.message.includes("Validation failed:")) {
    toast.error(error.message.replace("Validation failed: ", ""));
    return;
  }

  // Handle other specific errors
  if (error.message.includes("Too many requests")) {
    toast.error("Too many requests. Please wait a moment before trying again.");
    return;
  }

  // For mutations, show the error message to user
  if (context?.mutationKey) {
    toast.error(
      error.message || "An error occurred while processing your request.",
    );
    return;
  }

  // For queries, only log to console unless it's a critical error
  if (
    error.message.includes("Internal server error") ||
    error.message.includes("Service temporarily unavailable")
  ) {
    toast.error("Service temporarily unavailable. Please try again later.");
  }
};

// Create query client with global configuration
function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000,
        // Cache time: 10 minutes
        gcTime: 10 * 60 * 1000,
        // Retry configuration
        retry: (failureCount, error) => {
          if (error instanceof Error) {
            if (
              error.message.includes("Authentication required") ||
              error.message.includes("Access denied") ||
              error.message.includes("not found")
            ) {
              return false;
            }
          }

          return failureCount < 3;
        },
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
        refetchOnWindowFocus: false,
        refetchOnMount: true,
        refetchOnReconnect: true,
      },
      mutations: {
        retry: 1,
        retryDelay: 1000,
      },
    },
    queryCache: new QueryCache({
      onError: (error, query) => {
        handleError(error as Error, { queryKey: query.queryKey });
      },
    }),
    mutationCache: new MutationCache({
      onError: (error, _variables, _context, mutation) => {
        handleError(error as Error, {
          mutationKey: mutation.options.mutationKey,
        });
      },
      onSuccess: (_data, _variables, _context, mutation) => {
        // Show success message for mutations with specific keys
        const mutationKey = mutation.options.mutationKey;
        if (mutationKey && Array.isArray(mutationKey)) {
          const [entity, action] = mutationKey;

          if (action === "create") {
            toast.success(`${entity} created successfully!`);
          } else if (action === "update") {
            toast.success(`${entity} updated successfully!`);
          } else if (action === "delete") {
            toast.success(`${entity} deleted successfully!`);
          }
        }
      },
    }),
  });
}

export function ReactQueryProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => createQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

// Export the query client creator for testing or custom usage
export { createQueryClient };
