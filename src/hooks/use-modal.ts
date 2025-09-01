import { useModalStore, type ModalConfig } from "@/src/store/modal-store";

export function useModal() {
  const { openModal, closeModal } = useModalStore();

  const showModal = (config: ModalConfig) => {
    openModal(config);
  };

  const hideModal = () => {
    closeModal();
  };

  return {
    showModal,
    hideModal,
  };
}
