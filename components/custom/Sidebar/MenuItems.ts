import React from "react";

export interface SubmenuItem {
  id: string;
  title: string;
  path: string;
}

export interface MenuItem {
  id: string;
  title: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  path?: string;
  hasSubmenu?: boolean;
  submenu?: SubmenuItem[];
}

export type NavigateFn = (path: string) => void;
export type ToggleFn = (itemId: string) => void;

interface WithMenuItems {
  MENU_ITEMS?: MenuItem[];
}
export interface SidebarProps extends WithMenuItems {
  children: React.ReactNode;
  renderNavigation?: (ctx: {
    pathname: string;
    openSubmenu: string | null;
    isCollapsed: boolean;
    isMobileMenuOpen: boolean;
    onToggleSubmenu: (id: string) => void;
    onNavigate: (path: string) => void;
    onToggleCollapse: () => void;
    onCloseMobileMenu: () => void;
  }) => React.ReactNode;
}

interface NavigateFunction {
  onNavigate: NavigateFn;
}
export interface MenuItemComponentProps extends NavigateFunction {
  item: MenuItem;
  isOpen: boolean;
  isActive: boolean;
  pathname: string;
  isCollapsed: boolean;
  onToggle: ToggleFn;
}
export interface SidebarNavigationProps
  extends WithMenuItems,
    NavigateFunction {
  pathname: string;
  openSubmenu: string | null;
  isCollapsed: boolean;
  onToggleSubmenu: ToggleFn;
}

export interface SidebarHeaderProps {
  onClose: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}
