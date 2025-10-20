import {
  BookingSession,
  BookingAvailability,
  BookingStats,
  BookingFilters,
} from "../types";

// Mock API service for bookings
export class BookingApiService {
  private static baseUrl = "/api/mentor/bookings";

  // Get all bookings for the mentor
  static async getBookings(
    filters?: BookingFilters,
  ): Promise<BookingSession[]> {
    try {
      const queryParams = new URLSearchParams();

      if (filters?.status) queryParams.append("status", filters.status);
      if (filters?.type) queryParams.append("type", filters.type);
      if (filters?.dateRange?.start)
        queryParams.append("startDate", filters.dateRange.start);
      if (filters?.dateRange?.end)
        queryParams.append("endDate", filters.dateRange.end);
      if (filters?.studentName)
        queryParams.append("studentName", filters.studentName);

      const url = `${this.baseUrl}${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch bookings: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching bookings:", error);
      throw error;
    }
  }

  // Get a specific booking by ID
  static async getBooking(bookingId: string): Promise<BookingSession> {
    try {
      const response = await fetch(`${this.baseUrl}/${bookingId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch booking: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching booking:", error);
      throw error;
    }
  }

  // Create a new booking
  static async createBooking(
    bookingData: Omit<BookingSession, "id">,
  ): Promise<BookingSession> {
    try {
      const response = await fetch(this.baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        throw new Error(`Failed to create booking: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error creating booking:", error);
      throw error;
    }
  }

  // Update an existing booking
  static async updateBooking(
    bookingId: string,
    updates: Partial<BookingSession>,
  ): Promise<BookingSession> {
    try {
      const response = await fetch(`${this.baseUrl}/${bookingId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error(`Failed to update booking: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error updating booking:", error);
      throw error;
    }
  }

  // Cancel a booking
  static async cancelBooking(
    bookingId: string,
    reason?: string,
  ): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/${bookingId}/cancel`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reason }),
      });

      if (!response.ok) {
        throw new Error(`Failed to cancel booking: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error cancelling booking:", error);
      throw error;
    }
  }

  // Complete a booking
  static async completeBooking(
    bookingId: string,
    notes?: string,
  ): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/${bookingId}/complete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ notes }),
      });

      if (!response.ok) {
        throw new Error(`Failed to complete booking: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error completing booking:", error);
      throw error;
    }
  }

  // Reschedule a booking
  static async rescheduleBooking(
    bookingId: string,
    newDate: string,
    newStartTime: string,
    newEndTime: string,
  ): Promise<BookingSession> {
    try {
      const response = await fetch(`${this.baseUrl}/${bookingId}/reschedule`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: newDate,
          startTime: newStartTime,
          endTime: newEndTime,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to reschedule booking: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error rescheduling booking:", error);
      throw error;
    }
  }

  // Get booking statistics
  static async getBookingStats(): Promise<BookingStats> {
    try {
      const response = await fetch(`${this.baseUrl}/stats`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(
          `Failed to fetch booking stats: ${response.statusText}`,
        );
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching booking stats:", error);
      throw error;
    }
  }

  // Get mentor availability
  static async getAvailability(
    startDate?: string,
    endDate?: string,
  ): Promise<BookingAvailability[]> {
    try {
      const queryParams = new URLSearchParams();
      if (startDate) queryParams.append("startDate", startDate);
      if (endDate) queryParams.append("endDate", endDate);

      const url = `${this.baseUrl}/availability${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch availability: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching availability:", error);
      throw error;
    }
  }

  // Update mentor availability
  static async updateAvailability(
    availability: BookingAvailability[],
  ): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/availability`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ availability }),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to update availability: ${response.statusText}`,
        );
      }
    } catch (error) {
      console.error("Error updating availability:", error);
      throw error;
    }
  }
}
