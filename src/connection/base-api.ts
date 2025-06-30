import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import Cookies from "js-cookie";

const baseURL = process.env.NEXT_PUBLIC_HOST;

interface ErrorResponseData {
  message?: string;
  error?: string;
  [key: string]: unknown;
}

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export class BaseAPI {
  public axiosInstance: AxiosInstance;
  private token?: string;

  constructor(token?: string) {
    this.token = token;

    this.axiosInstance = axios.create({
      baseURL,
      // timeout: 10000,
    });

    this.initializeInterceptors();
  }

  /**
   * Initializes request and response interceptors.
   */
  private initializeInterceptors() {
    this.axiosInstance.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        if (this.token) {
          // Ensure headers exist before modifying them
          config.headers = config.headers || {};
          config.headers.Authorization = `Bearer ${this.token}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error) => this.handleErrorResponse(error),
    );
  }

  /**
   * Refresh the token by calling the refresh-token endpoint.
   */
  private async refreshToken(): Promise<void> {
    try {
      const response = await axios.post(
        `${baseURL}/refresh-token`,
        {},
        {
          withCredentials: true,
        },
      );

      const refreshedToken = response?.data?.refreshedToken;
      if (refreshedToken) {
        this.token = refreshedToken;
        // Update the token in cookies
        Cookies.set("token", refreshedToken, {
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          expires: 7, // 7 days
        });
      } else {
        throw new Error("No refreshed token received");
      }
    } catch (error: unknown) {
      console.error("Token refresh failed:", error);
      // Clear the token from cookies
      Cookies.remove("token");
      throw new Error("Unable to refresh token");
    }
  }

  /**
   * Handles 401 errors by attempting token refresh and retrying the request.
   */
  private async handleErrorResponse(
    error: AxiosError<ErrorResponseData>,
  ): Promise<AxiosResponse> {
    const originalRequest = error?.config as CustomAxiosRequestConfig;

    // Define public routes that should not trigger authentication redirects
    const publicRoutes: string[] = [];

    // Check if the current URL is a public route
    const isPublicRoute = publicRoutes.some((route) =>
      error?.config?.url?.includes(route),
    );

    // Special handling for login errors
    if (
      error.response?.status === 401 &&
      (error?.config?.url === "/users/login" ||
        error?.config?.url?.includes("login"))
    ) {
      // Directly return the authentication error for login endpoints
      // so the login form can handle it appropriately
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Authentication failed. Please check your credentials.";

      // Return the formatted error with relevant details
      throw this.formatErrorMessage(error, errorMessage);
    }

    // Handle 401 Unauthorized errors for non-login endpoints and non-public routes
    if (
      error.response?.status === 401 &&
      !originalRequest?._retry &&
      !error?.config?.url?.includes("login") &&
      !isPublicRoute
    ) {
      try {
        // Attempt to refresh the token
        await this.refreshToken();

        // If token refresh was successful, retry the original request
        if (originalRequest) {
          originalRequest._retry = true;
          return this.axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        // If token refresh fails, then redirect to logout
        console.log(
          `Token refresh failed - redirecting to login : ${refreshError}`,
        );
        window.location.href = "/logout";
        throw new Error("Your session has expired. Please log in again.");
      }
    }

    // For all other errors, format and return them
    throw this.formatErrorMessage(error);
  }

  private formatErrorMessage(
    error: AxiosError<ErrorResponseData>,
    customMessage?: string,
  ): Error {
    // Use custom message if provided
    if (customMessage) {
      return new Error(customMessage);
    }

    // Extract status code for better error context
    const statusCode = error?.response?.status;

    // Handle different error patterns
    const message =
      // Error in response data error field
      error?.response?.data?.error ||
      // Error in response data message field
      error?.response?.data?.message ||
      // Direct message in response data (if it's a string)
      (typeof error?.response?.data === "string"
        ? error.response.data
        : null) ||
      // Standard error message
      error?.message ||
      // Fallback for truly unexpected errors
      "An unexpected error occurred";

    console.log(`API Error (${statusCode || "unknown status"})`, {
      url: error?.config?.url,
      message,
      response: error?.response?.data,
    });

    return new Error(message);
  }
}

export default BaseAPI;
