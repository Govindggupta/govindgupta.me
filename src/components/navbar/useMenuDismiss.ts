"use client";

import { useEffect, type RefObject } from "react";

type UseMenuDismissProps = {
  isOpen: boolean;
  onClose: () => void;
  ref: RefObject<HTMLElement | null>;
};

export default function useMenuDismiss({
  isOpen,
  onClose,
  ref,
}: UseMenuDismissProps) {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handlePointerDown(event: MouseEvent) {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }

      onClose();
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose, ref]);
}
