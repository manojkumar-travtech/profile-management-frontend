"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button, ButtonProps } from "@/components/ui/button";
import { Typography } from "@/components/custom/Typography";

interface CreateEventPanelProps {
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  triggerButtonProps?: ButtonProps;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const CreateEventPanel: React.FC<CreateEventPanelProps> = ({
  triggerButtonProps,
  title,
  children,
  footer,
  isOpen,
  onOpenChange,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button
          {...(triggerButtonProps as React.ComponentProps<typeof Button>)}
        />
      </DialogTrigger>

      <DialogContent
        style={{ maxWidth: "none", padding: 0 }}
        className="max-w-none w-[95vw] h-[97vh] overflow-hidden flex flex-col"
      >
        <DialogHeader className="flex-shrink-0 border-b p-4">
          <DialogTitle asChild>
            <Typography size="xl">{title}</Typography>
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-4">{children}</div>

        {footer && (
          <div className="flex-shrink-0 border-t p-4 bg-background">
            {footer}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CreateEventPanel;
