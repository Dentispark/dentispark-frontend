import { create } from "zustand";
import { ReactNode } from "react";

export interface ModalConfig {
  modalTitle: string;
  modalTitleClassName?: string;
  bodyContent: ReactNode;
  action: () => void;
  actionTitle: string;
  secondaryAction?: () => void;
  secondaryActionTitle?: string;
  type: string;
  size?: "sm" | "md" | "lg" | "xl";
  isCustomContent?: boolean; // Flag to indicate if content should not be wrapped in DialogDescription
}

interface ModalStore {
  isOpen: boolean;
  config: ModalConfig | null;
  openModal: (config: ModalConfig) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  config: null,
  openModal: (config) => set({ isOpen: true, config }),
  closeModal: () => set({ isOpen: false, config: null }),
}));
