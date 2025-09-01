"use client";

import { useRouter } from "next/navigation";
import { useModal } from "./use-modal";

export function useLogout() {
  const router = useRouter();
  const { showModal } = useModal();

  const logout = () => {
    // Clear authentication data
    localStorage.removeItem("authToken");
    sessionStorage.clear();
    
    // Redirect to login page
    router.push("/login");
  };

  const showLogoutModal = () => {
    showModal({
      type: "logout",
      modalTitle: "Logging Out?",
      bodyContent: "Are you sure you want to log out from your Dentispark account on this device?",
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
