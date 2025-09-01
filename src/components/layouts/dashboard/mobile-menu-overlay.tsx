"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MobileMenuOverlayProps } from "./types";

export default function MobileMenuOverlay({
  isOpen,
  onClose,
}: MobileMenuOverlayProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}
    </AnimatePresence>
  );
}
