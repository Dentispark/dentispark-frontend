"use client";

import BaseAPI from "./base-api";

// Create a singleton instance of the API client
class ApiClient {
  private static instance: BaseAPI;

  public static getInstance(): BaseAPI {
    if (!ApiClient.instance) {
      ApiClient.instance = new BaseAPI();
    }
    return ApiClient.instance;
  }

  // Method to reinitialize the API client with a new token
  public static reinitialize(token?: string): BaseAPI {
    ApiClient.instance = new BaseAPI(token);
    return ApiClient.instance;
  }

  // Method to clear the instance (useful for logout)
  public static clearInstance(): void {
    if (ApiClient.instance) {
      ApiClient.instance.clearToken();
    }
    ApiClient.instance = new BaseAPI();
  }
}

// Export the singleton instance
export const apiClient = ApiClient.getInstance();

// Export the class for manual control if needed
export { ApiClient };

// Export default instance
export default apiClient;
