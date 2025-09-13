import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { profileAPIService } from "./profile.api";
import type { AcademicProfile } from "@/src/connection/api-types";
import { useAcademicProfileStore } from "../store";

// Simple academic profile query hook
export const useAcademicProfileQuery = () => {
  const { setAcademicProfile, setLoading, setError } =
    useAcademicProfileStore();

  const query = useQuery<AcademicProfile, Error>({
    queryKey: ["academicProfile"],
    queryFn: () => profileAPIService.GETACADEMICPROFILE(),
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });

  useEffect(() => {
    setLoading(query.isPending);
  }, [query.isPending, setLoading]);

  useEffect(() => {
    if (query.data) {
      setAcademicProfile(query.data);
    }
  }, [query.data, setAcademicProfile]);

  useEffect(() => {
    if (query.error) {
      setError(query.error.message || "Failed to load academic profile");
    } else {
      setError(null);
    }
  }, [query.error, setError]);

  return query;
};
