"use client";

import { useModal } from "./use-modal";
import { useAuth } from "@/src/providers/auth-provider";

export function useLogout() {
  const { showModal } = useModal();
  const { logout: authLogout } = useAuth();

  const logout = () => {
    // Use AuthProvider's logout method which handles everything
    authLogout();
  };

  const showLogoutModal = () => {
    showModal({
      type: "logout",
      modalTitle: "Logging Out?",
      modalTitleClassName: "text-center",
      bodyContent:
        "Are you sure you want to log out from your Dentispark account on this device?",
      action: logout,
      actionTitle: "Log out",
      secondaryActionTitle: "Cancel",
    });
  };

  return {
    logout,
    showLogoutModal,
  };
}
