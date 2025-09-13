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
  className?: string;
  type: string;
  size?: "sm" | "md" | "lg" | "xl";
  isCustomContent?: boolean; // Flag to indicate if content should not be wrapped in DialogDescription
  isDestructive?: boolean; // Flag to indicate if primary action is destructive (red button)
}

interface ModalStore {
  isOpen: boolean;
  config: ModalConfig | null;
  openModal: (config: ModalConfig) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalStore>((set, get) => ({
  isOpen: false,
  config: null,
  openModal: (config) => {
    const currentState = get();
    // Prevent opening the same modal if it's already open
    if (
      currentState.isOpen &&
      currentState.config?.type === config.type &&
      currentState.config?.modalTitle === config.modalTitle
    ) {
      return;
    }
    set({ isOpen: true, config });
  },
  closeModal: () => set({ isOpen: false, config: null }),
}));
