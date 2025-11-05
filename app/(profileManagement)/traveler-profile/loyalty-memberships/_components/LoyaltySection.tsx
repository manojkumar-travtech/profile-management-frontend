import React from "react";
import { SectionCard } from "@/app/(travelerProfile)/_components/SectionCard";
import { SectionCardProps } from "@/app/(travelerProfile)/_types/profile.types";
import DataTable from "@/components/custom/DataTable/DataTable";
import { DataTableProps } from "@/components/custom/DataTable/DataTable.types";
import { Button } from "@/components/ui/button";
import { LinkButton } from "@/components/custom/CustomButtons";

interface LoyaltySectionProps<T>
  extends Omit<SectionCardProps, "onEdit" | "actions">,
    DataTableProps<T> {
  onAddMore?: () => void;
}

function LoyaltySection<T>({
  title,
  description,
  onAddMore,
  ...tableProps
}: LoyaltySectionProps<T>) {
  return (
    <SectionCard
      title={title}
      description={description}
      actions={
        onAddMore ? (
          <LinkButton onClick={onAddMore}>Add More</LinkButton>
        ) : (
          <></>
        )
      }
    >
      <DataTable {...tableProps} withBorder={false} withExtraPadding={true} />
    </SectionCard>
  );
}

export default LoyaltySection;
