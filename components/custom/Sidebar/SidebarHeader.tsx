'use client'

import { useRouter } from "next/navigation";
import { PanelLeftClose, PanelLeftOpen, X } from "lucide-react";

const SidebarHeader: React.FC<{
  onClose: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}> = ({ onClose, isCollapsed, onToggleCollapse }) => {
  const router = useRouter();

  const handleLogoClick = () => {
    router.push("/"); // Navigate to the homepage
  };

  return (
    <div
      className={`h-16 flex items-center justify-between border-b border-gray-200 px-4 min-h-[64px]`}
    >
      {!isCollapsed && (
        <>
          <img
            src="/logo/omega_logo.png"
            alt="ICE Logo"
            className="h-8 w-auto cursor-pointer"
            onClick={handleLogoClick}
          />
        </>
      )}

      <div className="flex items-center space-x-2">
        <button
          onClick={onToggleCollapse}
          className="hidden lg:block p-1.5 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <PanelLeftOpen className="h-5 w-5 text-gray-600" />
          ) : (
            <PanelLeftClose className="h-5 w-5 text-gray-600" />
          )}
        </button>

        <button
          onClick={onClose}
          className="lg:hidden p-1 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
          aria-label="Close menu"
        >
          <X className="h-5 w-5 text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export default SidebarHeader;
