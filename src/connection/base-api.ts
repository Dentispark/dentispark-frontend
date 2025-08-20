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


  private initializeInterceptors() {
    this.axiosInstance.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        if (this.token) {
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

  private async handleErrorResponse(
    error: AxiosError<ErrorResponseData>,
  ): Promise<AxiosResponse> {
    const publicRoutes: string[] = [];

    const isPublicRoute = publicRoutes.some((route) =>
      error?.config?.url?.includes(route),
    );

    if (
      error.response?.status === 401 &&
      (error?.config?.url === "/users/login" ||
        error?.config?.url?.includes("login"))
    ) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Authentication failed. Please check your credentials.";

        throw this.formatErrorMessage(error, errorMessage);
    }

    if (
      error.response?.status === 401 &&
      !error?.config?.url?.includes("login") &&
      !isPublicRoute
    ) {
      Cookies.remove("token");
      console.log("Token expired or invalid - redirecting to login");
      window.location.href = "/login";
      throw new Error("Your session has expired. Please log in again.");
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

    const message =
      error?.response?.data?.error ||
      error?.response?.data?.message ||
      (typeof error?.response?.data === "string"
        ? error.response.data
        : null) ||
      error?.message ||
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
