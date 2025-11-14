"use client";

import React from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import type { MenuItem as MenuItemType } from "./sidebar";
import { iconMap } from "./sidebarConfig";

interface MenuItemProps {
  item: MenuItemType;
  isSubItem?: boolean;
  expandedItems: string[];
  toggleExpand: (id: string) => void;
}

const MenuItem: React.FC<MenuItemProps> = ({
  item,
  isSubItem = false,
  expandedItems,
  toggleExpand,
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const isExpanded = expandedItems.includes(item.id);
  const hasSubItems = item.subItems && item.subItems.length > 0;
  const Icon = iconMap[item.icon];

  const isActive =
    item.path &&
    (pathname === item.path || pathname.startsWith(`${item.path}/`));

  const handleClick = () => {
    if (hasSubItems) {
      toggleExpand(item.id);
    } else if (item.path) {
      router.push(item.path);
    }
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className={`w-full flex items-center  justify-between px-4 py-3 rounded-lg transition-all duration-200 group cursor-pointer
          ${isSubItem ? "pl-12 text-sm" : ""}
          ${
            isActive
              ? "bg-blue-50 text-primary-600 shadow-sm"
              : "text-gray-700 hover:bg-gray-50"
          }
        `}
      >
        <div className="flex items-center gap-3 w-full">
          {Icon && (
            <Icon
              className={`w-5 h-5 ${
                isActive
                  ? "text-primary-600"
                  : "text-gray-500 group-hover:text-blue-500"
              }`}
            />
          )}
          <span className="font-medium flex-1 text-left">{item.label}</span>

          {item.badge && (
            <span className="ml-auto bg-gray-200 text-gray-700 text-xs px-2 py-0.5 rounded-full font-[lato]">
              {item.badge}
            </span>
          )}
        </div>

        {hasSubItems && (
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${
              isExpanded ? "rotate-180" : ""
            } ${isActive ? "text-blue-500" : "text-gray-400"}`}
          />
        )}
        {item.expandable && !hasSubItems && (
          <ChevronRight
            className={`w-4 h-4 ${
              isActive ? "text-blue-500" : "text-gray-400"
            }`}
          />
        )}
      </button>

      {hasSubItems && isExpanded && (
        <div className="mt-1 space-y-1">
          {item.subItems!.map((subItem) => (
            <MenuItem
              key={subItem.id}
              item={subItem as MenuItemType}
              isSubItem
              expandedItems={expandedItems}
              toggleExpand={toggleExpand}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuItem;
