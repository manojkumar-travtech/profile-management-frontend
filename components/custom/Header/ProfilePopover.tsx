"use client";

import React, { useRef, useEffect, useState } from "react";
import { User, Settings, LogOut } from "lucide-react";

type UserDetails = {
  name: string;
  email: string;
  role: string;
  avatarUrl?: string | null;
};

const ProfilePopover: React.FC<{ onMouseLeave: () => void }> = ({ onMouseLeave }) => {
  const user: UserDetails = {
    name: "John Doe",
    email: "john.doe@email.com",
    role: "Product Designer",
    avatarUrl: null,
  };

  const popoverRef = useRef<HTMLDivElement>(null);
  const [imgError, setImgError] = useState(false);

  const getInitials = (name: string) => {
    const names = name.trim().split(" ");
    return names.length === 1
      ? names[0].charAt(0).toUpperCase()
      : (names[0].charAt(0) + names[1].charAt(0)).toUpperCase();
  };

  useEffect(() => {
    const focusTargets = popoverRef.current?.querySelectorAll<HTMLElement>(
      "button, [tabindex]:not([tabindex='-1'])"
    );
    focusTargets?.[0]?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onMouseLeave();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onMouseLeave]);

  return (
    <div
      ref={popoverRef}
      role="menu"
      aria-label="User Profile"
      onMouseLeave={onMouseLeave}
      tabIndex={-1}
      className="absolute right-6 top-20 w-72 rounded-2xl bg-white/90 backdrop-blur-md border border-gray-200 ring-1 ring-black/5 shadow-lg overflow-hidden z-50 transition-all"
    >
      {/* Header section */}
      <div className="flex items-center gap-4 px-6 py-5 bg-gradient-to-br from-blue-600 to-purple-700">
        {user.avatarUrl && !imgError ? (
          <img
            src={user.avatarUrl}
            alt={`${user.name} avatar`}
            className="h-16 w-16 rounded-full border-4 border-white shadow-md object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 border-4 border-white shadow-md flex items-center justify-center text-white font-bold text-xl select-none">
            {getInitials(user.name)}
          </div>
        )}
        <div>
          <h3 className="text-white text-lg font-semibold leading-tight">{user.name}</h3>
          <p className="text-blue-200 text-sm leading-tight">{user.email}</p>
          <p className="text-blue-200 text-xs mt-1 italic">{user.role}</p>
        </div>
      </div>

      {/* Action buttons */}
      <div className="py-2 flex flex-col gap-1 px-2 bg-white">
        {[
          { icon: User, label: "My Profile" },
          { icon: Settings, label: "Settings" },
        ].map(({ icon: Icon, label }) => (
          <button
            key={label}
            tabIndex={0}
            className="cursor-pointer flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 transition-all duration-200 group"
          >
            <Icon className="h-5 w-5 text-gray-700 group-hover:text-blue-600 transition-colors" />
            <span className="text-gray-900 font-medium group-hover:text-blue-600 transition-colors">
              {label}
            </span>
          </button>
        ))}

        <div className="h-px bg-gray-200 my-2" />

        <button
          tabIndex={0}
          className="cursor-pointer flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 transition-all duration-200 group"
        >
          <LogOut className="h-5 w-5 text-red-600 group-hover:text-red-700 transition-colors" />
          <span className="text-gray-900 font-medium group-hover:text-red-700 transition-colors">
            Sign Out
          </span>
        </button>
      </div>
    </div>
  );
};

export default ProfilePopover;
