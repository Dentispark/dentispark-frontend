import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { BookingApiService } from "./api";
import { BookingSession, BookingFilters, BookingAvailability } from "../types";

// Query keys
export const bookingKeys = {
  all: ["bookings"] as const,
  lists: () => [...bookingKeys.all, "list"] as const,
  list: (filters?: BookingFilters) =>
    [...bookingKeys.lists(), filters] as const,
  details: () => [...bookingKeys.all, "detail"] as const,
  detail: (id: string) => [...bookingKeys.details(), id] as const,
  stats: () => [...bookingKeys.all, "stats"] as const,
  availability: () => [...bookingKeys.all, "availability"] as const,
};

// Get bookings with filters
export function useBookings(filters?: BookingFilters) {
  return useQuery({
    queryKey: bookingKeys.list(filters),
    queryFn: () => BookingApiService.getBookings(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Get single booking
export function useBooking(bookingId: string) {
  return useQuery({
    queryKey: bookingKeys.detail(bookingId),
    queryFn: () => BookingApiService.getBooking(bookingId),
    enabled: !!bookingId,
  });
}

// Get booking statistics
export function useBookingStats() {
  return useQuery({
    queryKey: bookingKeys.stats(),
    queryFn: () => BookingApiService.getBookingStats(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Get availability
export function useAvailability(startDate?: string, endDate?: string) {
  return useQuery({
    queryKey: [...bookingKeys.availability(), startDate, endDate],
    queryFn: () => BookingApiService.getAvailability(startDate, endDate),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Create booking mutation
export function useCreateBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (bookingData: Omit<BookingSession, "id">) =>
      BookingApiService.createBooking(bookingData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bookingKeys.lists() });
      queryClient.invalidateQueries({ queryKey: bookingKeys.stats() });
      toast.success("Booking created successfully");
    },
    onError: (error: Error) => {
      toast.error(`Failed to create booking: ${error.message}`);
    },
  });
}

// Update booking mutation
export function useUpdateBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      bookingId,
      updates,
    }: {
      bookingId: string;
      updates: Partial<BookingSession>;
    }) => BookingApiService.updateBooking(bookingId, updates),
    onSuccess: (updatedBooking) => {
      queryClient.invalidateQueries({ queryKey: bookingKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: bookingKeys.detail(updatedBooking.id),
      });
      queryClient.invalidateQueries({ queryKey: bookingKeys.stats() });
      toast.success("Booking updated successfully");
    },
    onError: (error: Error) => {
      toast.error(`Failed to update booking: ${error.message}`);
    },
  });
}

// Cancel booking mutation
export function useCancelBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      bookingId,
      reason,
    }: {
      bookingId: string;
      reason?: string;
    }) => BookingApiService.cancelBooking(bookingId, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bookingKeys.lists() });
      queryClient.invalidateQueries({ queryKey: bookingKeys.stats() });
      toast.success("Booking cancelled successfully");
    },
    onError: (error: Error) => {
      toast.error(`Failed to cancel booking: ${error.message}`);
    },
  });
}

// Complete booking mutation
export function useCompleteBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ bookingId, notes }: { bookingId: string; notes?: string }) =>
      BookingApiService.completeBooking(bookingId, notes),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bookingKeys.lists() });
      queryClient.invalidateQueries({ queryKey: bookingKeys.stats() });
      toast.success("Booking marked as completed");
    },
    onError: (error: Error) => {
      toast.error(`Failed to complete booking: ${error.message}`);
    },
  });
}

// Reschedule booking mutation
export function useRescheduleBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      bookingId,
      newDate,
      newStartTime,
      newEndTime,
    }: {
      bookingId: string;
      newDate: string;
      newStartTime: string;
      newEndTime: string;
    }) =>
      BookingApiService.rescheduleBooking(
        bookingId,
        newDate,
        newStartTime,
        newEndTime,
      ),
    onSuccess: (rescheduledBooking) => {
      queryClient.invalidateQueries({ queryKey: bookingKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: bookingKeys.detail(rescheduledBooking.id),
      });
      toast.success("Booking rescheduled successfully");
    },
    onError: (error: Error) => {
      toast.error(`Failed to reschedule booking: ${error.message}`);
    },
  });
}

// Update availability mutation
export function useUpdateAvailability() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (availability: BookingAvailability[]) =>
      BookingApiService.updateAvailability(availability),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bookingKeys.availability() });
      toast.success("Availability updated successfully");
    },
    onError: (error: Error) => {
      toast.error(`Failed to update availability: ${error.message}`);
    },
  });
}
