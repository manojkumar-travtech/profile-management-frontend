"use client";
import { DrawerFormDialog } from "@/app/(profileManagement)/_components/DrawerFormDialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React from "react";
import { delegationConfig } from "./delegationFormConfig";

const AddDelegation = () => {
  const [open, setOpen] = React.useState(false);
  const handleSave = async (values: any) => {
    console.log("Saving delegation data:", values);
    setOpen(false);
  };
  return (
    <>
      <Button
        icon={<Plus />}
        onClick={() => setOpen(true)}
        iconPosition="left"
        size={"sm"}
      >
        Add Delegate
      </Button>
      {
        <DrawerFormDialog
          open={open}
          onOpenChange={setOpen}
          title="Add New Delegate"
          subtitle="Grant access to your travel profile by adding a delegate who can view and manage your travel information."
          formConfig={delegationConfig}
          defaultValues={{}}
          onSubmit={handleSave}
          width="500px"
          submitText="Save Changes"
        />
      }
    </>
  );
};

export default AddDelegation;
