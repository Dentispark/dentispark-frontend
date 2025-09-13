import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { authCookies } from "@/src/lib/cookies";

const baseURL = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_HOST;

interface ErrorResponseData {
  message?: string;
  error?: string;
  errors?: Record<string, string[]>;
  [key: string]: unknown;
}

interface ApiResponse<T = unknown> {
  responseCode: string;
  responseMessage: string;
  errors: string[];
  responseData: T;
}

interface TokenData {
  access_token: string;
  token_type?: string;
  expires_in?: number;
}

// Custom API Error class for better error handling
export class ApiError extends Error {
  public responseCode: string;
  public responseMessage: string;
  public errors: string[];
  public isAuthError: boolean;
  public isValidationError: boolean;
  public isBusinessLogicError: boolean;

  constructor(
    message: string,
    responseCode: string,
    responseMessage: string,
    errors: string[] = [],
  ) {
    super(message);
    this.name = "ApiError";
    this.responseCode = responseCode;
    this.responseMessage = responseMessage;
    this.errors = errors;

    // Categorize error types for easier handling
    this.isAuthError = ["93", "94", "95", "97", "98", "32"].includes(
      responseCode,
    );
    this.isValidationError = ["07", "08", "28", "26"].includes(responseCode);
    this.isBusinessLogicError = [
      "02",
      "03",
      "04",
      "10",
      "11",
      "17",
      "20",
      "25",
      "29",
      "30",
      "31",
      "35",
      "36",
    ].includes(responseCode);
  }
}

export class BaseAPI {
  public axiosInstance: AxiosInstance;
  private token?: string;

  constructor(token?: string) {
    this.token = token || this.getStoredToken();

    this.axiosInstance = axios.create({
      baseURL,
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    this.initializeInterceptors();
  }

  private getStoredToken(): string | undefined {
    if (typeof window !== "undefined") {
      // Use our secure cookie implementation
      return authCookies.getAccessToken() || undefined;
    }
    return undefined;
  }

  public setToken(token: string, expiresAt?: string): void {
    this.token = token;
    if (typeof window !== "undefined") {
      // Use our secure cookie implementation
      if (expiresAt) {
        authCookies.setAccessToken(token, expiresAt);
      } else {
        // Default expiration of 7 days if not provided
        const defaultExpiry = new Date();
        defaultExpiry.setDate(defaultExpiry.getDate() + 7);
        authCookies.setAccessToken(token, defaultExpiry.toISOString());
      }
    }
  }

  public clearToken(): void {
    this.token = undefined;
    if (typeof window !== "undefined") {
      // Use our secure cookie implementation
      authCookies.clearAll();

      // Clear any legacy storage for backward compatibility
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userData");
      localStorage.removeItem("tokenExpiredAt");
      sessionStorage.clear();
    }
  }

  private initializeInterceptors() {
    // Request interceptor
    this.axiosInstance.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        if (this.token) {
          config.headers = config.headers || {};
          config.headers.Authorization = `Bearer ${this.token}`;
        }

        const channelId = process.env.NEXT_PUBLIC_CHANNEL_ID;
        const channelSecret = process.env.NEXT_PUBLIC_CHANNEL_SECRET;

        if (channelId && channelSecret) {
          config.headers["Channel-ID"] = channelId;
          config.headers["Channel-Secret"] = channelSecret;
        }

        return config;
      },
      (error) => Promise.reject(error),
    );

    // Response interceptor
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        if (response.data && response.data.responseCode) {
          const { responseCode } = response.data;

          if (["93", "94", "95", "97", "98"].includes(responseCode)) {
            this.clearToken();
            // Notify other components about auth state change
            if (typeof window !== "undefined") {
              window.dispatchEvent(new CustomEvent("auth-state-changed"));
              if (!window.location.pathname.includes("/login")) {
                window.location.href = "/login";
              }
            }
          }
        }

        return response;
      },
      async (error) => this.handleErrorResponse(error),
    );
  }

  private async handleErrorResponse(
    error: AxiosError<ErrorResponseData>,
  ): Promise<AxiosResponse> {
    const publicRoutes = [
      "/auth/login",
      "/auth/register",
      "/auth/forgot-password",
      "/auth/verify-email",
    ];

    const isPublicRoute = publicRoutes.some((route) =>
      error?.config?.url?.includes(route),
    );

    // Handle 401 errors
    if (error.response?.status === 401) {
      if (
        error?.config?.url?.includes("login") ||
        error?.config?.url?.includes("auth/login")
      ) {
        const errorMessage =
          error.response?.data?.message ||
          error.response?.data?.error ||
          "Authentication failed. Please check your credentials.";
        throw this.formatErrorMessage(error, errorMessage);
      }

      // Clear token and redirect for non-public routes
      if (!isPublicRoute) {
        this.clearToken();
        console.log("Token expired or invalid - redirecting to login");
        if (typeof window !== "undefined") {
          // Notify other components about auth state change
          window.dispatchEvent(new CustomEvent("auth-state-changed"));
          window.location.href = "/login";
        }
        throw new Error("Your session has expired. Please log in again.");
      }
    }

    throw this.formatErrorMessage(error);
  }

  private formatErrorMessage(
    error: AxiosError<ErrorResponseData>,
    customMessage?: string,
  ): Error {
    if (customMessage) {
      return new Error(customMessage);
    }

    const statusCode = error?.response?.status;
    const responseData = error?.response?.data;

    // Handle validation errors (typically 422)
    if (statusCode === 422 && responseData?.errors) {
      const validationErrors = Object.entries(responseData.errors)
        .map(([field, messages]) => `${field}: ${messages.join(", ")}`)
        .join("; ");
      return new Error(`Validation failed: ${validationErrors}`);
    }

    // Handle general errors
    const message =
      responseData?.error ||
      responseData?.message ||
      (typeof responseData === "string" ? responseData : null) ||
      error?.message ||
      this.getDefaultErrorMessage(statusCode);

    console.error(`API Error (${statusCode || "unknown status"})`, {
      url: error?.config?.url,
      method: error?.config?.method?.toUpperCase(),
      message,
      response: responseData,
      stack: error.stack,
    });

    return new Error(message);
  }

  private getDefaultErrorMessage(statusCode?: number): string {
    switch (statusCode) {
      case 400:
        return "Bad request. Please check your input and try again.";
      case 401:
        return "Authentication required. Please log in.";
      case 403:
        return "Access denied. You do not have permission to perform this action.";
      case 404:
        return "The requested resource was not found.";
      case 422:
        return "Invalid data provided. Please check your input.";
      case 429:
        return "Too many requests. Please wait a moment and try again.";
      case 500:
        return "Internal server error. Please try again later.";
      case 502:
        return "Service temporarily unavailable. Please try again later.";
      case 503:
        return "Service maintenance in progress. Please try again later.";
      default:
        return "An unexpected error occurred. Please try again.";
    }
  }

  // Check if response is successful based on responseCode
  private isSuccessfulResponse(responseCode: string): boolean {
    return responseCode === "00";
  }

  // Get user-friendly error message based on response code
  private getErrorMessageByCode(
    responseCode: string,
    responseMessage: string,
  ): string {
    const errorMessages: Record<string, string> = {
      "02": "This record already exists",
      "03": "Record not found",
      "04": "Record is inactive or in use",
      "05": "Request is being processed",
      "06": "Transaction could not be completed",
      "07": "Invalid data format provided",
      "08": "Data format error encountered",
      "09": "The provided ID has expired",
      "10": "Customer account is disabled",
      "11": "Incorrect password or PIN entered",
      "12": "Customer successfully onboarded",
      "13": "Maximum customer tier reached",
      "14": "Customer number is required",
      "15": "Mobile number does not match customer records",
      "16": "Mobile number does not match customer name",
      "17": "Account does not belong to the customer",
      "18": "Transaction cannot be reversed",
      "19": "No primary account found",
      "20": "Insufficient balance for transaction",
      "21": "Callback service is missing",
      "22": "Service is currently unavailable",
      "23": "Data corruption detected",
      "24": "Transaction between same account not allowed",
      "25": "Customer has an active loan",
      "26": "Value is out of allowed range",
      "27": "Name does not match records",
      "28": "Incorrect data type provided",
      "29": "Customer record already exists",
      "30": "OTP is required for this transaction",
      "31": "The provided OTP is invalid",
      "32": "User does not have the required role",
      "33": "Transaction does not match the branch",
      "34": "Transaction exceeds the allowed limit",
      "35": "Loan application was declined",
      "36": "Loan does not belong to the customer",
      "37": "Provided date of birth does not match records",
      "38": "Device IMEI does not match records",
      "40": "The provided security answer is incorrect",
      "92": "Data encryption failed",
      "93": "User session does not match app user",
      "94": "User session could not be located",
      "95": "Security issue detected",
      "96": "Access denied or third-party service failed",
      "97": "User is not authorized to access this resource",
      "98": "Action not allowed for this user",
      "99": "Unexpected system error occurred",
    };

    return (
      errorMessages[responseCode] ||
      responseMessage ||
      "An unexpected error occurred"
    );
  }

  // Handle API response and extract data or throw error
  private handleApiResponse<T>(response: ApiResponse<T>): T {
    if (!this.isSuccessfulResponse(response.responseCode)) {
      // Get user-friendly error message based on response code
      let errorMessage = this.getErrorMessageByCode(
        response.responseCode,
        response.responseMessage,
      );

      // Add additional error details if available
      if (response.errors && response.errors.length > 0) {
        errorMessage += ". Additional details: " + response.errors.join(", ");
      }

      // Create custom API error with all response details
      throw new ApiError(
        errorMessage,
        response.responseCode,
        response.responseMessage,
        response.errors || [],
      );
    }

    return response.responseData;
  }

  // Utility methods for making requests
  public async get<T = unknown>(url: string, config = {}): Promise<T> {
    const response = await this.axiosInstance.get<ApiResponse<T>>(url, config);
    return this.handleApiResponse(response.data);
  }

  public async post<T = unknown>(
    url: string,
    data = {},
    config = {},
  ): Promise<T> {
    const response = await this.axiosInstance.post<ApiResponse<T>>(
      url,
      data,
      config,
    );
    return this.handleApiResponse(response.data);
  }

  public async put<T = unknown>(
    url: string,
    data = {},
    config = {},
  ): Promise<T> {
    const response = await this.axiosInstance.put<ApiResponse<T>>(
      url,
      data,
      config,
    );
    return this.handleApiResponse(response.data);
  }

  public async patch<T = unknown>(
    url: string,
    data = {},
    config = {},
  ): Promise<T> {
    const response = await this.axiosInstance.patch<ApiResponse<T>>(
      url,
      data,
      config,
    );
    return this.handleApiResponse(response.data);
  }

  public async delete<T = unknown>(url: string, config = {}): Promise<T> {
    const response = await this.axiosInstance.delete<ApiResponse<T>>(
      url,
      config,
    );
    return this.handleApiResponse(response.data);
  }

  // Method to get the full response (including responseCode, responseMessage, etc.)
  public async getFullResponse<T = unknown>(
    url: string,
    config = {},
  ): Promise<ApiResponse<T>> {
    const response = await this.axiosInstance.get<ApiResponse<T>>(url, config);
    return response.data;
  }

  public async postFullResponse<T = unknown>(
    url: string,
    data = {},
    config = {},
  ): Promise<ApiResponse<T>> {
    const response = await this.axiosInstance.post<ApiResponse<T>>(
      url,
      data,
      config,
    );
    return response.data;
  }
}

// Export types for use in other files
export type { ErrorResponseData, ApiResponse, TokenData };
export default BaseAPI;
