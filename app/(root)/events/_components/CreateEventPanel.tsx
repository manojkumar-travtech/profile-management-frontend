"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/custom/Typography";

interface CreateEventPanelProps {
  triggerText: string;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export const CreateEventPanel: React.FC<CreateEventPanelProps> = ({
  triggerText,
  title,
  children,
  footer,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{triggerText}</Button>
      </DialogTrigger>

      <DialogContent
        style={{ maxWidth: "none", padding: 0 }}
        className="max-w-none w-[95vw] h-[95vh] overflow-hidden flex flex-col"
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
