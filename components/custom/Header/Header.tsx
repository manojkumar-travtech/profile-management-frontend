"use client";

import React, { useState, lazy, Suspense } from "react";
import { Grid3x3, Bell, Menu } from "lucide-react";
import { createPortal } from "react-dom";

// Lazy load popovers
const AppsPopover = lazy(() => import("./AppsPopover"));
const ProfilePopover = lazy(() => import("./ProfilePopover"));

interface HeaderProps {
  onMenuClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const [isAppsOpen, setAppsOpen] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);

  const handleAppClick = (url: string) => {
    window.location.href = url;
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-16 flex items-center justify-between px-6 border-b border-gray-200 bg-white shadow z-20">
        {/* Menu Button */}
        <button
          className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
          onClick={onMenuClick}
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5 text-gray-600" />
        </button>

        <div className="flex-1" />

        {/* Right Icons */}
        <div className="flex items-center gap-2 relative">
          <button
            className="relative p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5 text-gray-700" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full ring-2 ring-white" />
          </button>

          <button
            onClick={() => {
              setAppsOpen(!isAppsOpen);
              setProfileOpen(false);
            }}
            className="p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 cursor-pointer"
            aria-label="Open apps"
          >
            <Grid3x3 className="h-5 w-5 text-gray-700" />
          </button>

          <button
            onClick={() => {
              setProfileOpen(!isProfileOpen);
              setAppsOpen(false);
            }}
            className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-100 transition-all duration-200 cursor-pointer"
            aria-label="User menu"
          >
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center shadow-lg ring-2 ring-gray-400">
              <span className="text-white font-semibold text-sm">JD</span>
            </div>
          </button>
        </div>
      </header>

      {/* Popovers rendered in a portal to avoid affecting layout */}
      <Suspense fallback={null}>
        {isAppsOpen &&
          createPortal(
            <AppsPopover handleAppClick={handleAppClick} onMouseLeave={() => setAppsOpen(false)} />,
            document.body
          )}
        {isProfileOpen &&
          createPortal(
            <ProfilePopover onMouseLeave={() => setProfileOpen(false)} />,
            document.body
          )}
      </Suspense>
    </>
  );
};

export default Header;
