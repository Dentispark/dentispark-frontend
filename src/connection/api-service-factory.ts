import { apiClient } from "./api-client";
import type BaseAPI from "./base-api";

/**
 * API Service Factory - Creates consistent API services with common patterns
 */
export class ApiServiceFactory {
  private baseApi: BaseAPI;

  constructor(apiInstance = apiClient) {
    this.baseApi = apiInstance;
  }

  /**
   * Creates a basic CRUD service for a resource
   */
  createCrudService<T, CreateT = Partial<T>, UpdateT = Partial<T>>(
    resourcePath: string,
  ) {
    return {
      // Get all items with optional filters
      getAll: async (params?: Record<string, unknown>): Promise<T[]> => {
        const queryString = params
          ? new URLSearchParams(params as Record<string, string>).toString()
          : "";
        const url = queryString
          ? `${resourcePath}?${queryString}`
          : resourcePath;
        return this.baseApi.get<T[]>(url);
      },

      // Get paginated items
      getPaginated: async (params?: Record<string, unknown>) => {
        const queryString = params
          ? new URLSearchParams(params as Record<string, string>).toString()
          : "";
        const url = queryString
          ? `${resourcePath}?${queryString}`
          : resourcePath;
        return this.baseApi.get(url);
      },

      // Get single item by ID
      getById: async (id: string): Promise<T> => {
        return this.baseApi.get<T>(`${resourcePath}/${id}`);
      },

      // Create new item
      create: async (data: CreateT): Promise<T> => {
        return this.baseApi.post<T>(
          resourcePath,
          data as Record<string, unknown>,
        );
      },

      // Update existing item
      update: async (id: string, data: UpdateT): Promise<T> => {
        return this.baseApi.put<T>(
          `${resourcePath}/${id}`,
          data as Record<string, unknown>,
        );
      },

      // Partially update existing item
      patch: async (id: string, data: Partial<UpdateT>): Promise<T> => {
        return this.baseApi.patch<T>(`${resourcePath}/${id}`, data);
      },

      // Delete item
      delete: async (id: string): Promise<void> => {
        return this.baseApi.delete<void>(`${resourcePath}/${id}`);
      },
    };
  }

  /**
   * Creates an authentication service
   */
  createAuthService() {
    return {
      login: async (credentials: {
        email: string;
        password: string;
        remember_me?: boolean;
      }) => {
        return this.baseApi.post("/auth/login", credentials);
      },

      register: async (userData: {
        first_name: string;
        last_name: string;
        email: string;
        password: string;
        password_confirmation: string;
        terms_accepted: boolean;
      }) => {
        return this.baseApi.post("/auth/register", userData);
      },

      logout: async () => {
        try {
          await this.baseApi.post("/auth/logout");
        } finally {
          // Always clear token even if logout fails
          this.baseApi.clearToken();
        }
      },

      forgotPassword: async (email: string) => {
        return this.baseApi.post("/auth/forgot-password", { email });
      },

      resetPassword: async (data: {
        token: string;
        email: string;
        password: string;
        password_confirmation: string;
      }) => {
        return this.baseApi.post("/auth/reset-password", data);
      },

      verifyEmail: async (data: { token: string; email: string }) => {
        return this.baseApi.post("/auth/verify-email", data);
      },

      resendVerification: async (email: string) => {
        return this.baseApi.post("/auth/resend-verification", { email });
      },

      getCurrentUser: async () => {
        return this.baseApi.get("/auth/me");
      },

      updatePassword: async (data: {
        current_password: string;
        password: string;
        password_confirmation: string;
      }) => {
        return this.baseApi.put("/auth/password", data);
      },
    };
  }

  /**
   * Creates a file upload service
   */
  createFileUploadService() {
    return {
      uploadSingle: async (
        file: File,
        path: string = "/files/upload",
        onProgress?: (progress: number) => void,
      ) => {
        const formData = new FormData();
        formData.append("file", file);

        return this.baseApi.axiosInstance.post(path, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            if (onProgress && progressEvent.total) {
              const progress = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total,
              );
              onProgress(progress);
            }
          },
        });
      },

      uploadMultiple: async (
        files: File[],
        path: string = "/files/upload/multiple",
        onProgress?: (progress: number) => void,
      ) => {
        const formData = new FormData();
        files.forEach((file, index) => {
          formData.append(`files[${index}]`, file);
        });

        return this.baseApi.axiosInstance.post(path, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            if (onProgress && progressEvent.total) {
              const progress = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total,
              );
              onProgress(progress);
            }
          },
        });
      },

      deleteFile: async (filePath: string) => {
        return this.baseApi.delete("/files", { data: { file_path: filePath } });
      },
    };
  }

  /**
   * Creates a search service
   */
  createSearchService() {
    return {
      search: async <T>(
        endpoint: string,
        query: string,
        filters?: Record<string, unknown>,
      ): Promise<T[]> => {
        const params = new URLSearchParams({
          q: query,
          ...filters,
        } as Record<string, string>);

        return this.baseApi.get<T[]>(`${endpoint}/search?${params.toString()}`);
      },

      advancedSearch: async <T>(
        endpoint: string,
        searchCriteria: Record<string, unknown>,
      ): Promise<T[]> => {
        return this.baseApi.post<T[]>(
          `${endpoint}/advanced-search`,
          searchCriteria,
        );
      },

      getSuggestions: async (
        endpoint: string,
        query: string,
      ): Promise<string[]> => {
        const params = new URLSearchParams({ q: query });
        return this.baseApi.get<string[]>(
          `${endpoint}/suggestions?${params.toString()}`,
        );
      },
    };
  }

  /**
   * Creates a notification service
   */
  createNotificationService() {
    return {
      getAll: async (params?: {
        page?: number;
        per_page?: number;
        unread_only?: boolean;
      }) => {
        const queryString = params
          ? new URLSearchParams(params as Record<string, string>).toString()
          : "";
        const url = queryString
          ? `/notifications?${queryString}`
          : "/notifications";
        return this.baseApi.get(url);
      },

      markAsRead: async (id: string) => {
        return this.baseApi.patch(`/notifications/${id}/read`);
      },

      markAllAsRead: async () => {
        return this.baseApi.patch("/notifications/read-all");
      },

      delete: async (id: string) => {
        return this.baseApi.delete(`/notifications/${id}`);
      },

      getUnreadCount: async (): Promise<number> => {
        const response = await this.baseApi.get<{ count: number }>(
          "/notifications/unread-count",
        );
        return response.count;
      },
    };
  }

  /**
   * Creates a custom service with provided methods
   */
  createCustomService<
    T extends Record<string, (...args: unknown[]) => Promise<unknown>>,
  >(serviceMethods: (api: BaseAPI) => T): T {
    return serviceMethods(this.baseApi);
  }
}

// Create default factory instance
export const apiServiceFactory = new ApiServiceFactory();

// Export factory class for custom instances
export default ApiServiceFactory;
