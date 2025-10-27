import React from "react";
import { SectionCard } from "@/app/(travelerProfile)/_components/SectionCard";
import { SectionCardProps } from "@/app/(travelerProfile)/_types/profile.types";
import DataTable from "@/components/custom/DataTable/DataTable";
import { DataTableProps } from "@/components/custom/DataTable/DataTable.types";
import { Button } from "@/components/ui/button";

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
        <Button
          variant="link"
          className="text-blue-600 text-sm p-0 h-auto"
          onClick={onAddMore}
          size="2xl"
        >
          Add More
        </Button>
      }
    >
      <DataTable {...tableProps} withBorder={false} withExtraPadding={true} />
    </SectionCard>
  );
}

export default LoyaltySection;
