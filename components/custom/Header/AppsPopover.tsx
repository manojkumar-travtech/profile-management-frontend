"use client";
import React, { useState } from "react";

interface AppsPopoverProps {
  handleAppClick: (url: string) => void;
  onMouseLeave: () => void;
}

const apps: Array<{ id: number; name: string; icon: string; color: string; url: string }> = [
  { id: 1, name: "Event Management", icon: "📊", color: "bg-blue-500", url: "/events" },
  { id: 2, name: "Ero App", icon: "📈", color: "bg-purple-500", url: "/eroApp" },
  { id: 3, name: "Traveller Profile", icon: "🧳", color: "bg-green-500", url: "/traveler-profile" },
  { id: 4, name: "Calendar", icon: "📅", color: "bg-red-500", url: "/calendar" },
  { id: 5, name: "Tasks", icon: "✓", color: "bg-yellow-500", url: "/tasks" },
  { id: 6, name: "Files", icon: "📁", color: "bg-indigo-500", url: "/files" },
  { id: 7, name: "Settings", icon: "⚙️", color: "bg-gray-500", url: "/settings" },
  { id: 8, name: "Reports", icon: "📋", color: "bg-pink-500", url: "/reports" },
  { id: 9, name: "Team", icon: "👥", color: "bg-teal-500", url: "/team" },
  { id: 10, name: "Docs", icon: "📚", color: "bg-orange-500", url: "/docs" },
  { id: 11, name: "Support", icon: "🛠️", color: "bg-lime-500", url: "/support" },
];

const AppsPopover: React.FC<AppsPopoverProps> = ({ handleAppClick, onMouseLeave }) => {
  const [showAll, setShowAll] = useState(false);

  const visibleApps = showAll ? apps : apps.slice(0, 6);

  return (
    <div
      className="fixed right-6 top-20 shadow-lg rounded-2xl border border-gray-200 p-4 sm:p-6 w-72 sm:w-80 z-50 bg-white"
      onMouseLeave={onMouseLeave}
    >
      <h3 className="text-sm font-semibold text-gray-800 mb-3 px-2">Quick Access</h3>

      <div
        className={`grid grid-cols-3 gap-3 transition-all duration-300 ${
          showAll ? "max-h-80 overflow-y-auto pr-2" : "max-h-[13.5rem] overflow-hidden"
        }`}
      >
        {visibleApps.map((app) => (
          <button
            key={app.id}
            onClick={() => handleAppClick(app.url)}
            className="flex flex-col items-center justify-center p-3 cursor-pointer hover:bg-gray-100 rounded-xl transition-all duration-200 group"
          >
            <div
              className={`h-12 w-12 ${app.color} rounded-2xl flex items-center justify-center mb-2 shadow-md group-hover:scale-110 transition-transform duration-200`}
            >
              <span className="text-2xl">{app.icon}</span>
            </div>
            <span className="text-xs text-gray-700 text-center font-medium">{app.name}</span>
          </button>
        ))}
      </div>

      {!showAll && apps.length > 6 && (
        <div className="flex justify-center mt-3">
          <button
            onClick={() => setShowAll(true)}
            className="text-xs text-blue-600 font-medium hover:underline transition-colors duration-200 cursor-pointer"
          >
            View More
          </button>
        </div>
      )}
    </div>
  );
};

export default AppsPopover;
