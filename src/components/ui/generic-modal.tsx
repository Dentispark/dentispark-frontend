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

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          open={isOpen}
          onOpenChange={(open) => !open && handleSecondaryAction()}
        >
          <DialogContent
            showCloseButton={false}
            className="overflow-hidden border p-0 py-8 sm:max-w-md"
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
              className="p-6"
            >
              <DialogHeader>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                >
                  <DialogTitle className="font-sora text-center text-xl font-semibold">
                    {config.modalTitle}
                  </DialogTitle>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                >
                  <DialogDescription className="font-sora mt-2 text-center leading-7 text-gray-600">
                    {config.bodyContent}
                  </DialogDescription>
                </motion.div>
              </DialogHeader>
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
              >
                <DialogFooter className="font-sora mt-4 flex flex-row gap-3">
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
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
