"use client";

import React, { useRef } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { DynamicForm, DynamicFormRef } from "@/components/custom/Form";
import type { FieldValues } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { DialogTitle } from "@/components/ui/dialog";

interface DrawerFormDialogProps<T extends FieldValues> {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  subtitle?: string;
  formConfig: any; // DynamicForm config
  defaultValues?: T;
  onSubmit: (values: T) => void | Promise<void>;
  width?: string;
  submitText?: string;
  isLoading?:boolean
}

export function DrawerFormDialog<T extends FieldValues>({
  open,
  onOpenChange,
  title,
  subtitle,
  formConfig,
  defaultValues,
  onSubmit,
  width = "450px",
  submitText = "Submit",
  isLoading
}: DrawerFormDialogProps<T>) {
  const formRef = useRef<DynamicFormRef<T>>(null);

  const handleSubmit = async () => {
    if (!formRef.current) return;
    const isValid = await formRef.current.submit();
    if (!isValid) return;
    const values = formRef.current.getValues();
    onSubmit(values);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/30" />
        <Dialog.Content
          title=""
          className="fixed right-0 top-0 h-full bg-white shadow-lg p-6 overflow-y-auto"
          style={{ width }}
        >
          <DialogTitle></DialogTitle>
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold">{title}</h2>
              {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
            </div>
            <Dialog.Close className="text-gray-400 hover:text-gray-600 cursor-pointer">
              ✕
            </Dialog.Close>
          </div>

          <DynamicForm
            ref={formRef}
            formConfig={formConfig}
            defaultValues={defaultValues}
            externalSubmit
          />

          <div className="pt-4">
            <Button isLoading={isLoading} className="w-full" onClick={handleSubmit}>
              {submitText}
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
