// _components/EditModal.tsx
"use client";

import React, { useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DynamicForm, DynamicFormRef, FormConfig } from "../Form";
import { FieldValues } from "react-hook-form";

interface EditModalProps<T extends FieldValues> {
  open: boolean;
  onClose: () => void;
  title: string;
  formConfig: FormConfig<T>;
  defaultValues?: Partial<T>;
  onSubmit: (data: T) => void;
  onError?: (errors: any) => void;
  loading?: boolean;
}

function EditModal<T extends FieldValues>({
  open,
  onClose,
  title,
  formConfig,
  defaultValues,
  onSubmit,
  onError,
  loading,
}: EditModalProps<T>) {
  const formRef = useRef<DynamicFormRef<T>>(null);

  const handleSave = () => {
    formRef.current?.submit();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Update the information below and save your changes.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <DynamicForm<T>
            ref={formRef}
            formConfig={formConfig}
            defaultValues={defaultValues}
            onSubmit={onSubmit}
            onError={onError}
            loading={loading}
            externalSubmit={true}
          />
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default EditModal;
