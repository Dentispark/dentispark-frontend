"use client";

import { useModal } from "@/src/hooks/use-modal";
import { Button } from "@/src/components/ui/button";
import { useRouter } from "next/navigation";

export function ModalUsageExample() {
  const { showModal } = useModal();
  const router = useRouter();

  const handleLogout = () => {
    // Clear any authentication tokens/session data
    localStorage.removeItem("authToken");
    sessionStorage.clear();
    
    // Redirect to login page
    router.push("/login");
  };

  const handleLogoutModal = () => {
    showModal({
      type: "logout",
      modalTitle: "Logging Out?",
      bodyContent: (
        <span>
          Are you sure you want to log out from your Dentispark account on this device?
        </span>
      ),
      action: handleLogout,
      actionTitle: "Log out",
      secondaryActionTitle: "Cancel",
    });
  };

  const handleDeleteModal = () => {
    showModal({
      type: "delete",
      modalTitle: "Delete Item?",
      bodyContent: (
        <span>
          This action cannot be undone. Are you sure you want to delete this item?
        </span>
      ),
      action: () => {
        // Perform delete logic here
        console.log("Item deleted");
      },
      actionTitle: "Delete",
      secondaryActionTitle: "Cancel",
    });
  };

  const handleCustomModal = () => {
    showModal({
      type: "custom",
      modalTitle: "Custom Action",
      bodyContent: (
        <div>
          <p>This is a custom modal with rich content.</p>
          <ul className="mt-2 list-disc list-inside">
            <li>Feature 1</li>
            <li>Feature 2</li>
            <li>Feature 3</li>
          </ul>
        </div>
      ),
      action: () => {
        console.log("Custom action performed");
      },
      actionTitle: "Confirm",
      secondaryAction: () => {
        console.log("Custom secondary action");
      },
      secondaryActionTitle: "Maybe Later",
    });
  };

  return (
    <div className="space-y-4 p-6">
      <h2 className="text-2xl font-bold">Modal Examples</h2>
      <div className="space-y-2">
        <Button onClick={handleLogoutModal}>Show Logout Modal</Button>
        <Button onClick={handleDeleteModal} variant="destructive">
          Show Delete Modal
        </Button>
        <Button onClick={handleCustomModal} variant="outline">
          Show Custom Modal
        </Button>
      </div>
    </div>
  );
}
