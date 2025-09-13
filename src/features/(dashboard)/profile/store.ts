import { create } from "zustand";
import type { AcademicProfile } from "@/src/connection/api-types";

interface AcademicProfileStoreState {
  academicProfile: AcademicProfile | null;
  isLoading: boolean;
  error: string | null;
  setAcademicProfile: (profile: AcademicProfile | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (message: string | null) => void;
  reset: () => void;
}

export const useAcademicProfileStore = create<AcademicProfileStoreState>(
  (set) => ({
    academicProfile: null,
    isLoading: false,
    error: null,
    setAcademicProfile: (profile) => set({ academicProfile: profile }),
    setLoading: (loading) => set({ isLoading: loading }),
    setError: (message) => set({ error: message }),
    reset: () => set({ academicProfile: null, isLoading: false, error: null }),
  }),
);
