import { InfoGridProps } from "../_components/InfoGrid";
import { SectionCardProps } from "./profile.types";

export interface LoyaltyNumber {
  company: string;
  number: string;
}

export interface LinkedLoyaltyNumbersProps {
  loyaltyHeading: string;
  loyaltyNumbers?: LoyaltyNumber[];
}

export interface PreferencesCardProps extends SectionCardProps, InfoGridProps {
  loyaltyHeading?: string;
  loyaltyNumbers?: LoyaltyNumber[];
}
