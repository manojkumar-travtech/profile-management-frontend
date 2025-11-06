import React from "react";
import { TABS } from "./constants";

interface TabsProps {
  activeTab: string;
  setActiveTab: (id: string) => void;
  getProgramCount: (type: string) => number;
}

export const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab, getProgramCount }) => (
  <div className="flex gap-6 border-b border-gray-200 mb-8 overflow-x-auto">
    {TABS.map((tab) => {
      const count = getProgramCount(tab.id);
      const isActive = activeTab === tab.id;

      return (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`pb-4 px-2 font-medium transition-all whitespace-nowrap relative ${
            isActive ? "text-indigo-600" : "text-gray-500 hover:text-gray-900"
          }`}
        >
          {tab.label}
          <span
            className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
              isActive ? "bg-indigo-100 text-indigo-700" : "bg-gray-100 text-gray-600"
            }`}
          >
            {count}
          </span>
          {isActive && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" />}
        </button>
      );
    })}
  </div>
);
