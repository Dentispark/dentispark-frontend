"use client";

import { useModalStore } from "@/src/store/modal-store";
import { Button } from "./button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./dialog";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/src/lib/utils";

export function GenericModal() {
  const { isOpen, config, closeModal } = useModalStore();

  if (!config) return null;

  const handleSecondaryAction = () => {
    if (config.secondaryAction) {
      config.secondaryAction();
    } else {
      closeModal();
    }
  };

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
      default:
        return "sm:max-w-md";
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          open={isOpen}
          onOpenChange={(open) => !open && handleSecondaryAction()}
        >
          <DialogContent
            showCloseButton={false}
            className={`border p-0 py-8 ${getSizeClass(config.size)} max-h-[90vh] overflow-hidden`}
          >
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.8,
                y: 20,
                rotateX: -15,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
                rotateX: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.9,
                y: -10,
                rotateX: 10,
              }}
              transition={{
                type: "spring",
                duration: 0.5,
                bounce: 0.3,
                stiffness: 300,
                damping: 25,
              }}
              className="flex h-full max-h-[80vh] flex-col"
            >
              {/* Fixed Header */}
              <div className="flex-shrink-0 px-6 pb-4">
                <DialogHeader>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.3 }}
                  >
                    <DialogTitle
                      className={cn(
                        "font-sora text-left text-lg font-semibold",
                        config.modalTitleClassName,
                      )}
                    >
                      {config.modalTitle}
                    </DialogTitle>
                  </motion.div>
                </DialogHeader>
              </div>

              {/* Scrollable Content */}
              <div className="hidden-scrollbar flex-1 overflow-y-auto px-6">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                >
                  {config.isCustomContent ? (
                    <div>{config.bodyContent}</div>
                  ) : (
                    <DialogDescription className="font-sora text-center leading-7 text-gray-600">
                      {config.bodyContent}
                    </DialogDescription>
                  )}
                </motion.div>
              </div>
              {/* Fixed Footer */}
              {!config.isCustomContent && (
                <div className="flex-shrink-0 px-6 pt-4">
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                  >
                    <DialogFooter className="font-sora flex flex-row gap-3">
                      <Button
                        variant="outline"
                        onClick={handleSecondaryAction}
                        className="hover:text-primary flex-1 hover:bg-white"
                      >
                        {config.secondaryActionTitle || "Cancel"}
                      </Button>
                      <Button
                        onClick={handlePrimaryAction}
                        className="bg-primary hover:bg-primary-700 flex-1 text-white"
                      >
                        {config.actionTitle}
                      </Button>
                    </DialogFooter>
                  </motion.div>
                </div>
              )}
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
