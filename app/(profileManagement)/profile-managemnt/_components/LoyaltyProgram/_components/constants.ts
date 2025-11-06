import { LoyaltyProgram } from "../../../_types/profileManagement";

export type ProviderType = "airline" | "hotel" | "car_rental";

export const PROVIDER_CONFIG: Record<
  ProviderType,
  { icon: string; label: string }
> = {
  airline: { icon: "✈️", label: "Flights" },
  hotel: { icon: "🏨", label: "Hotels" },
  car_rental: { icon: "🚗", label: "Car Rentals" },
};

export const TIER_COLORS: Record<string, string> = {
  Gold: "bg-amber-100 text-amber-700 border-amber-200",
  Platinum: "bg-indigo-100 text-indigo-700 border-indigo-200",
  Silver: "bg-gray-100 text-gray-700 border-gray-200",
  Diamond: "bg-purple-100 text-purple-700 border-purple-200",
};

export const TABS = [
  { id: "all", label: "All Programs" },
  { id: "airline", label: "Flights" },
  { id: "hotel", label: "Hotels" },
  { id: "car_rental", label: "Car Rentals" },
];

export const getTierColor = (tier: string): string =>
  TIER_COLORS[tier] || "bg-gray-100 text-gray-700 border-gray-200";

export const formatBalance = (program: LoyaltyProgram): string | null => {
  if (program.miles_balance)
    return `${program.miles_balance.toLocaleString()} miles`;
  if (program.points_balance)
    return `${program.points_balance.toLocaleString()} points`;
  return null;
};

export const formatDate = (dateString?: string | null): string | null => {
  if (!dateString) return null;
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
};
