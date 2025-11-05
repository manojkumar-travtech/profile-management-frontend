

import { LucideIcon } from "lucide-react";

export interface StatusBadgeProps {
  completed: boolean;
  className?:string
}

export interface PastTripItemProps {
  icon: LucideIcon;
  label: string;
  completed: boolean;
  details?: string;
  value: string;
}

export interface PastTripCardProps {
  date: string;
  guests: number;
  items: Omit<PastTripItemProps, 'value'>[];
  showPreferences?: boolean;
  allowMultipleOpen?: boolean;
  initialOpenIndices?: number[];
}