"use client";

import { useModalStore } from "@/src/store/modal-store";
import { Button } from "./button";
import { cn } from "@/src/lib/utils";
import { useEffect, useCallback } from "react";

export function GenericModal() {
  const { isOpen, config, closeModal } = useModalStore();

  const handleSecondaryAction = useCallback(() => {
    if (config?.secondaryAction) {
      config.secondaryAction();
    } else {
      closeModal();
    }
  }, [config, closeModal]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleSecondaryAction();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, handleSecondaryAction]);

  if (!config || !isOpen) return null;

  const handlePrimaryAction = () => {
    config.action();
    closeModal();
  };

  const getSizeClass = (size?: string) => {
    switch (size) {
      case "sm":
        return "sm:max-w-sm";
      case "md":
        return "sm:max-w-md";
      case "lg":
        return "sm:max-w-lg";
      case "xl":
        return "sm:max-w-2xl";
      case "2xl":
        return "sm:max-w-4xl";
      default:
        return "sm:max-w-md";
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleSecondaryAction();
    }
  };

  return (
    <div className="fixed inset-0 z-50">
      {/* Modal Container with backdrop click */}
      <div
        className="fixed inset-0 flex items-center justify-center bg-black/50 p-2 sm:p-4"
        onClick={handleBackdropClick}
      >
        <div
          className={cn(
            "animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-4 relative max-h-[95vh] min-h-0 w-full overflow-hidden rounded-lg border bg-white p-0 py-4 shadow-lg duration-300 ease-out sm:max-h-[90vh] sm:py-8",
            getSizeClass(config.size),
            config.className,
          )}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex h-full max-h-[calc(95vh-2rem)] min-h-0 w-full flex-col sm:max-h-[calc(90vh-4rem)]">
            {/* Fixed Header */}
            <div className="flex-shrink-0 px-4 pb-4 sm:px-6">
              <div className="flex flex-col gap-2 text-center sm:text-left">
                <div>
                  <h2
                    id="modal-title"
                    className={cn(
                      "font-sora text-lg leading-none font-semibold",
                      config.modalTitleClassName,
                    )}
                  >
                    {config.modalTitle}
                  </h2>
                </div>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="hidden-scrollbar flex-1 touch-pan-y overflow-y-auto overscroll-contain px-4 sm:px-6">
              <div className="pb-2">
                {config.isCustomContent ? (
                  <div className="flex w-full justify-center">
                    {config.bodyContent}
                  </div>
                ) : (
                  <div className="font-sora text-center text-sm leading-7 text-gray-600">
                    {config.bodyContent}
                  </div>
                )}
              </div>
            </div>

            {/* Fixed Footer */}
            {!config.isCustomContent && (
              <div className="flex-shrink-0 px-4 pt-4 sm:px-6">
                <div>
                  <div className="font-sora flex flex-row gap-3">
                    <Button
                      variant="outline"
                      onClick={handleSecondaryAction}
                      className={cn(
                        config.isDestructive &&
                          "text-text-color border-gray-400",
                        "hover:text-primary flex-1 hover:bg-white",
                      )}
                    >
                      {config.secondaryActionTitle || "Cancel"}
                    </Button>
                    <Button
                      onClick={handlePrimaryAction}
                      className={cn(
                        "flex-1 text-white",
                        config.isDestructive
                          ? "bg-red-600 hover:bg-red-700"
                          : "bg-primary hover:bg-primary-700",
                      )}
                    >
                      {config.actionTitle}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
