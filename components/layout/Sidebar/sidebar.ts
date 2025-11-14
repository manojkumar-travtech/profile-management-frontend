import { ReactNode } from "react";

export interface User {
  name: string;
  email: string;
  avatar: string;
}

export interface SubMenuItem {
  id: string;
  label: string;
  icon: string;
  path: string;
  badge?: number;
}

export interface MenuItem {
  id: string;
  label: string;
  icon: string;
  path?: string;
  active?: boolean;
  expandable?: boolean;
  subItems?: SubMenuItem[];
  badge?: ReactNode;
}

export interface SidebarConfig {
  user?: User;
  menuItems: MenuItem[];
}

export interface SideBarProps {
  menuItems: MenuItem[];
}
