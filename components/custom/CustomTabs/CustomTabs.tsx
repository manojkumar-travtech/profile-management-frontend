"use client";
import React, { ReactNode } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export interface CustomTabItem {
  value: string;
  label: string;
  icon?: ReactNode;
  content?: ReactNode;
}

interface CustomTabsProps {
  tabs: CustomTabItem[];
  defaultValue?: string;
  listClassName?: string;
  contentClassName?: string;
  variant?: "default" | "outline" | "rounded"; // optional for future styles
}

/**
 * Reusable tab system that matches your ProfileTabList design.
 */
const CustomTabs: React.FC<CustomTabsProps> = ({
  tabs,
  defaultValue,
  listClassName = "",
  contentClassName = "",
  variant = "default",
}) => {
  return (
    <Tabs defaultValue={defaultValue || tabs[0]?.value} className="w-full">
      {/* === Tab Header === */}
      <TabsList
        className={`
          flex w-full bg-gray-100 rounded-md overflow-hidden cursor-pointer
          ${variant === "rounded" ? "rounded-xl" : ""}
          ${listClassName}
        `}
      >
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className={`
              flex flex-1 items-center justify-center gap-2 h-14 text-sm font-medium cursor-pointer
              transition-all duration-200
              data-[state=active]:bg-primary data-[state=active]:text-white
              data-[state=active]:rounded-md
              data-[state=active]:shadow-md data-[state=active]:-mb-[1px]
              data-[state=inactive]:bg-transparent data-[state=inactive]:text-gray-700
              hover:bg-gray-50
            `}
          >
            {tab.icon && <span className="w-5 h-5">{tab.icon}</span>}
            <span>{tab.label}</span>
          </TabsTrigger>
        ))}
      </TabsList>

      {/* === Tab Content === */}
      <div
        className={`
          bg-white border rounded-b-md mt-4 p-4 transition-all duration-200
          ${contentClassName}
        `}
      >
        {tabs.map(
          (tab) =>
            tab.content && (
              <TabsContent key={tab.value} value={tab.value}>
                {tab.content}
              </TabsContent>
            )
        )}
      </div>
    </Tabs>
  );
};

export default CustomTabs;
