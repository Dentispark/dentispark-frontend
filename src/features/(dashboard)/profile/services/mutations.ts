import { useMutation, useQueryClient } from "@tanstack/react-query";
import { profileAPIService } from "./profile.api";
import type { UpdateStudentProfileRequest } from "./profile.api";
import { toast } from "sonner";
import { useAuth } from "@/src/providers/auth-provider";
import { LoginResponseData } from "@/src/features/(auth)/type";

// Update student profile mutation
export const useUpdateStudentProfileMutation = () => {
  const queryClient = useQueryClient();
  const { updateUser } = useAuth();

  return useMutation({
    mutationFn: (payload: UpdateStudentProfileRequest) =>
      profileAPIService.UPDATESTUDENTPROFILE(payload),

    onSuccess: (data) => {
      // Invalidate any user/profile queries to refetch latest
      updateUser(data as LoginResponseData);
      queryClient.invalidateQueries({ queryKey: ["me"] });
      toast.success("Profile updated successfully!");
    },
    onError: () => {
      toast.error("updating profile failed");
    },
  });
};
