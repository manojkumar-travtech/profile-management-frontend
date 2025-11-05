export interface LoyaltyItem {
  name: string;
  loyaltyNumber: string;
  expDate: string;
}

export interface LoyaltySectionProps {
  title: string;
  items: LoyaltyItem[];
  onAddMore: () => void;
}
