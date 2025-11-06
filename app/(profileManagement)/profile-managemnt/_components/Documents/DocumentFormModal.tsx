// DocumentFormModal.tsx
import React from "react";
import { DrawerFormDialog } from "@/app/(profileManagement)/_components/DrawerFormDialog";
import { DynamicFormModalProps } from "./types";
import { defaultFormValues, formConfig } from "./documentFormConfig";

export const DocumentFormModal: React.FC<DynamicFormModalProps> = ({
  open,
  onClose,
  onSubmit,
  editData,
  isLoading,
}) => {
  return (
    <DrawerFormDialog
      isLoading={isLoading}
      open={open}
      onOpenChange={onClose}
      title={editData ? "Edit Document" : "Add Program Document"}
      formConfig={formConfig}
      defaultValues={editData || defaultFormValues}
      onSubmit={onSubmit}
      submitText={editData ? "Update Document" : "Add Document"}
    />
  );
};
