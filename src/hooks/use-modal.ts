import { useCallback } from "react";
import { useModalStore, type ModalConfig } from "@/src/store/modal-store";

export function useModal() {
  const { openModal, closeModal } = useModalStore();

  const showModal = useCallback(
    (config: ModalConfig) => {
      openModal(config);
    },
    [openModal],
  );

  const hideModal = useCallback(() => {
    closeModal();
  }, [closeModal]);

  return {
    showModal,
    hideModal,
  };
}
