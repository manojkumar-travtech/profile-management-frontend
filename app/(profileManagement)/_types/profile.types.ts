import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

export interface InfoFieldData {
  label: string;
  value: string | null;
  icon?: LucideIcon;
  className?: string;
}

export interface DocumentData {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  meta?: string;
  onEdit?: () => void;
}

export interface ProfileData {
  name: string;
  gender: string;
  nationality: string;
  dob: string;
  email: string;
  phone: string;
  emergency: string | null;
  address: string;
  work: string | null;
  verified: string;
  profileCreated: string;
  lastUpdate: string;
}

export interface SectionCardProps {
  title?: string;
  description?: React.ReactNode;
  onEdit?: () => void;
  children?: ReactNode;
  actions?: ReactNode;
  withBorder?: boolean;
  withExtraPadding?: boolean;
  leftIcon?: React.ReactNode;
  className?: string;
  rightSection?: React.ReactNode; // 👈 new prop
}
