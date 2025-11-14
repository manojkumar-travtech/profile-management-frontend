"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Menu, X } from "lucide-react";
import { iconMap } from "./sidebarConfig";
import MenuItem from "./MenuItem";
import { SideBarProps } from "./sidebar";

const AppSideBar: React.FC<SideBarProps> = ({ menuItems }) => {
  const [expandedItems, setExpandedItems] = useState<string[]>(["travel"]);
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);
  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState<boolean>(false);

  const toggleExpand = (id: string) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <>
      <button
        onClick={() => setIsMobileOpen(true)}
        className={`lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg 
          hover:bg-gray-50 transition-all duration-200 hover:scale-105 active:scale-95
          ${isMobileOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}
      >
        <Menu className="w-6 h-6 text-gray-700" />
      </button>

      <div
        className={`lg:hidden fixed inset-0 bg-black/50 z-30 transition-opacity duration-300
          ${isMobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setIsMobileOpen(false)}
      />

      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 bg-white border-r border-gray-200 
        flex flex-col h-screen transition-all duration-300 ease-in-out shadow-lg lg:shadow-none
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        ${isDesktopCollapsed ? "lg:w-20" : "lg:w-80"}`}
      >
        <div className="px-4 py-5 flex items-center justify-between border-b border-gray-100">
          <div
            className={`flex items-center transition-all duration-300 ${
              isDesktopCollapsed ? "justify-center w-full" : ""
            }`}
          >
            <div
              className={`relative overflow-hidden transition-all duration-300 ${
                isDesktopCollapsed ? "w-10 h-10" : "w-auto h-10"
              }`}
            >
              <div
                className={`flex   pl-4 items-center gap-2 transition-all duration-300 ${
                  isDesktopCollapsed
                    ? "opacity-0 scale-75 -translate-x-4"
                    : "opacity-100 scale-100 translate-x-0"
                }`}
              >
                <img
                  src="/logo/omegalogo.svg"
                  alt="App Logo"
                  className="h-8 w-auto object-contain"
                />
              </div>

              <div
                className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                  isDesktopCollapsed
                    ? "opacity-100 scale-100 translate-x-0"
                    : "opacity-0 scale-75 translate-x-4"
                }`}
              >
                <img
                  src="/logo/omega.svg"
                  alt="Collapsed Logo"
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsDesktopCollapsed(!isDesktopCollapsed)}
              className={`hidden lg:flex items-center justify-center p-2 
                text-gray-600 hover:bg-gray-100 rounded-lg 
                transition-all duration-200 hover:scale-105 active:scale-95
                ${isDesktopCollapsed ? "mx-auto" : ""}`}
              title={isDesktopCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              <div className="relative w-5 h-5">
                <ChevronLeft
                  className={`absolute inset-0 transition-all duration-300 ${
                    isDesktopCollapsed
                      ? "opacity-0 rotate-180 scale-75"
                      : "opacity-100 rotate-0 scale-100"
                  }`}
                />
                <ChevronRight
                  className={`absolute inset-0 transition-all duration-300 ${
                    isDesktopCollapsed
                      ? "opacity-100 rotate-0 scale-100"
                      : "opacity-0 -rotate-180 scale-75"
                  }`}
                />
              </div>
            </button>

            <button
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg 
                transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {isDesktopCollapsed ? (
            <div className="hidden lg:flex flex-col items-center gap-2">
              {menuItems.map((item, index) => {
                const Icon = iconMap[item.icon];
                return (
                  <button
                    key={item.id}
                    className={`w-12 h-12 flex items-center justify-center rounded-lg 
                      transition-all duration-200 group relative
                      hover:scale-110 active:scale-95
                      ${
                        item.active
                          ? "bg-primary/10 text-primary shadow-sm"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    title={item.label}
                    style={{
                      transitionDelay: `${index * 30}ms`,
                    }}
                  >
                    {Icon && (
                      <Icon className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
                    )}

                    <div
                      className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none z-50"
                    >
                      {item.label}
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <>
              {menuItems.map((item, index) => (
                <div
                  key={item.id}
                  className="transform transition-all duration-300"
                  style={{
                    transitionDelay: `${index * 40}ms`,
                  }}
                >
                  <MenuItem
                    item={item}
                    expandedItems={expandedItems}
                    toggleExpand={toggleExpand}
                  />
                </div>
              ))}
            </>
          )}
        </nav>
      </aside>
    </>
  );
};

export default AppSideBar;
