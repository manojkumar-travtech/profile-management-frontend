"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DrawerFormDialog } from "@/app/(profileManagement)/_components/DrawerFormDialog";
import { LoyaltyProgram } from "../../_types/profileManagement";

type AddProgramButtonProps = {
  onAdd?: (program: LoyaltyProgram) => void;
  onUpdate?: (program: LoyaltyProgram) => void;
  editingProgram?: LoyaltyProgram | null;
  onCloseEdit?: () => void;
};

export default function AddProgramButton({
  onAdd,
  onUpdate,
  editingProgram,
  onCloseEdit,
}: AddProgramButtonProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  // ✅ open drawer automatically when editing
  useEffect(() => {
    if (editingProgram) {
      setIsEditMode(true);
      setDrawerOpen(true);
    }
  }, [editingProgram]);

  const formConfig = {
    fullWidthButtons: true,
    gridCols: 1,
    sections: [
      {
        collapsible: false,
        fields: [
          {
            name: "provider_type",
            label: "Provider Type",
            type: "select",
            options: [
              { label: "Airline", value: "airline" },
              { label: "Hotel", value: "hotel" },
              { label: "Car Rental", value: "car_rental" },
              { label: "Other", value: "other" },
            ],
            validation: { required: "Provider type is required" },
          },
          {
            name: "provider_name",
            label: "Provider Name",
            type: "text",
            placeholder: "e.g., United Airlines",
            validation: { required: "Provider name is required" },
          },
          {
            name: "member_number",
            label: "Member Number",
            type: "text",
            placeholder: "e.g., UA123456789",
            validation: { required: "Member number is required" },
          },
          {
            name: "tier_status",
            label: "Tier Status",
            type: "select",
            options: [
              { label: "Gold", value: "Gold" },
              { label: "Platinum", value: "Platinum" },
              { label: "Silver", value: "Silver" },
              { label: "Diamond", value: "Diamond" },
            ],
            validation: { required: "Tier status is required" },
          },
          {
            name: "tier_expiry_date",
            label: "Tier Expiry Date",
            type: "date",
          },
        ],
      },
    ],
  };

  const getDefaultValues = (): Record<string, any> => {
    if (isEditMode && editingProgram) {
      return {
        provider_type: editingProgram.provider_type || "",
        provider_name: editingProgram.provider_name || "",
        program_name: editingProgram.program_name || "",
        member_number: editingProgram.member_number || "",
        tier_status: editingProgram.tier_status || "",
        points_balance: editingProgram.points_balance ?? undefined,
        miles_balance: editingProgram.miles_balance ?? undefined,
        member_since: editingProgram.member_since || "",
        tier_expiry_date: editingProgram.tier_expiry_date || "",
      };
    }

    return {
      provider_type: "",
      provider_name: "",
      program_name: "",
      member_number: "",
      tier_status: "",
      points_balance: undefined,
      miles_balance: undefined,
      member_since: "",
      tier_expiry_date: "",
    };
  };

  const handleSubmit = (data: Record<string, any>) => {
    if (isEditMode && editingProgram) {
      const updatedProgram: any = { ...data };
      onUpdate?.(updatedProgram);
    } else {
      const newProgram: any = {
        provider_type: data.provider_type,
        provider_name: data.provider_name,
        program_name: data.program_name,
        member_number: data.member_number,
        tier_status: data.tier_status,
        tier_expiry_date: data.tier_expiry_date || null,
      };
      onAdd?.(newProgram);
    }
    handleClose();
  };

  const handleClose = () => {
    setDrawerOpen(false);
    setIsEditMode(false);
    onCloseEdit?.();
  };

  return (
    <>
      <Button
        onClick={() => setDrawerOpen(true)}
        className="flex items-center gap-2"
      >
        <Plus className="w-4 h-4" />
        Add Loyalty
      </Button>

      <DrawerFormDialog
        open={drawerOpen}
        onOpenChange={(open) => !open && handleClose()}
        title={isEditMode ? "Edit Loyalty" : "Add Loyalty"}
        subtitle={
          isEditMode ? "Update program details" : "Fill in program details"
        }
        formConfig={formConfig}
        defaultValues={getDefaultValues()}
        onSubmit={handleSubmit}
        submitText={isEditMode ? "Update Program" : "Add Program"}
      />
    </>
  );
}
