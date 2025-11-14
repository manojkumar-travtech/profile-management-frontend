"use client";

import React, { ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { DialogTitle } from "@radix-ui/react-dialog";

interface CustomDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string | ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  width?: string;
  position?: "right" | "left";
}

const CustomDrawer: React.FC<CustomDrawerProps> = ({
  open,
  onOpenChange,
  title,
  children,
  footer,
  width = "500px",
  position = "right",
}) => {
  const drawerPosition =
    position === "right"
      ? { right: 0, left: "auto" }
      : { left: 0, right: "auto" };

  const drawerStyles: React.CSSProperties & { [key: string]: any } = {
    ...drawerPosition,
    "--drawer-width": width, // ✅ custom CSS variable allowed
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        {/* Overlay */}
        <Dialog.Overlay className="fixed inset-0 bg-black/30 z-50" />

        {/* Drawer */}
        <Dialog.Content
          className={`fixed top-0 h-full bg-white shadow-lg flex flex-col overflow-hidden z-50 
                      w-full sm:w-[var(--drawer-width)] transition-transform duration-300`}
          style={drawerStyles}
        >
          {/* Header */}
          {title && (
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <DialogTitle className="text-lg font-semibold text-gray-900">
                {title}
              </DialogTitle>
              <Dialog.Close className="text-gray-400 hover:text-gray-600 cursor-pointer text-xl">
                ✕
              </Dialog.Close>
            </div>
          )}

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 relative">{children}</div>

          {/* Footer */}
          {footer && <div className="border-t border-gray-200 p-1">{footer}</div>}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default CustomDrawer;
