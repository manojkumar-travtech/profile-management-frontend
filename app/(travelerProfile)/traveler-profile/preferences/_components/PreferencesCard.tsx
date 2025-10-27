import { InfoGrid } from "@/app/(travelerProfile)/_components/InfoGrid";
import { SectionCard } from "@/app/(travelerProfile)/_components/SectionCard";
import { LinkedLoyaltyNumbersProps, LoyaltyNumber, PreferencesCardProps } from "@/app/(travelerProfile)/_types/preferences.types";
import { Divider } from "@/components/custom/Divider";
import LinkedLoyaltyNumbers from "./LinkedLoyaltyNumbers";


const PreferencesCard: React.FC<PreferencesCardProps> = ({
  children,
  title,
  actions,
  description,
  onEdit,
  fields,
  columns,
  loyaltyHeading = "Linked Loyalty Numbers",
  loyaltyNumbers,
}) => {
  const hasLoyaltyNumbers = loyaltyNumbers && loyaltyNumbers.length > 0;

  return (
    <SectionCard
      title={title}
      actions={actions}
      description={description}
      onEdit={onEdit}
    >
      <Divider orientation="horizontal" spacing="md" />

      <InfoGrid fields={fields} columns={columns} />

      {hasLoyaltyNumbers && (
        <>
          <Divider orientation="horizontal" />
          <LinkedLoyaltyNumbers
            loyaltyHeading={loyaltyHeading}
            loyaltyNumbers={loyaltyNumbers}
          />
        </>
      )}

      {children && (
        <>
          <Divider orientation="horizontal" />
          <div>{children}</div>
        </>
      )}
    </SectionCard>
  );
};

export default PreferencesCard;
export type { PreferencesCardProps, LoyaltyNumber, LinkedLoyaltyNumbersProps };
