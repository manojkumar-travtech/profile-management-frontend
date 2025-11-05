"use client";

import React from "react";
import MenuItemComponent from "./MenuItemComponent";
import { SidebarNavigationProps } from "./MenuItems";

const SidebarNavigation: React.FC<SidebarNavigationProps> = ({
  pathname,
  openSubmenu,
  isCollapsed,
  onToggleSubmenu,
  onNavigate,
  MENU_ITEMS,
}) => {
  return (
    <nav
      className={`flex-1 py-4 transition-all duration-300 ${
        isCollapsed ? "px-2" : "px-6"
      }`}
    >
      <ul className="space-y-2">
        {(MENU_ITEMS || []).map((item) => {
          const isOpen = openSubmenu === item.id && !isCollapsed;
          const isActive = item.path
            ? pathname.includes(item.path)
            : item.submenu?.some((sub) => pathname.includes(sub.path)) || false;

          return (
            <li key={item.id}>
              <MenuItemComponent
                item={item}
                isOpen={isOpen}
                isActive={isActive}
                pathname={pathname}
                isCollapsed={isCollapsed}
                onToggle={onToggleSubmenu}
                onNavigate={onNavigate}
              />
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default SidebarNavigation;
