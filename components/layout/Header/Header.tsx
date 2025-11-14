'use client';

import React, { useState } from 'react';
import {
  Bell, ChevronDown, User, Settings, HelpCircle, LogOut, X
} from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface HeaderProps {
  alertsSection?: React.ReactNode; // Pass the complete alerts component here
  notifications?: Array<{ id: number; title: string; message: string; time: string }>;
}

const Header: React.FC<HeaderProps> = ({ 
  alertsSection,
  notifications = []
}) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // === Toggles ===
  const toggleUserMenu = () => setIsUserMenuOpen((prev) => !prev);
  const toggleNotificationsMenu = () => {
    setIsNotificationsOpen((prev) => !prev);
  };

  const unreadNotifications = notifications.length;

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 md:px-6 h-[72px] gap-3 md:gap-6">

        {/* ===== Left side (Alert section from parent) ===== */}
        {alertsSection && (
          <div className="hidden lg:flex flex-1">
            {alertsSection}
          </div>
        )}

        {/* ===== Right side icons ===== */}
        <div className="flex items-center gap-2 md:gap-4 ml-auto flex-shrink-0">

          {/* Alerts Icon - visible on mobile only (passed from parent) */}
          {alertsSection && (
            <div className="lg:hidden">
              {alertsSection}
            </div>
          )}

          {/* Notifications Icon */}
          <div className="relative">
            <button
              onClick={toggleNotificationsMenu}
              className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Bell className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
              {unreadNotifications > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 md:w-5 md:h-5 bg-blue-500 rounded-full flex items-center justify-center text-white text-[10px] md:text-xs font-semibold">
                  {unreadNotifications}
                </span>
              )}
            </button>

            {isNotificationsOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={toggleNotificationsMenu} />
                <div className="fixed md:absolute right-2 md:right-0 left-2 md:left-auto top-16 md:top-auto md:mt-2 bg-white rounded-lg shadow-xl border border-gray-200 z-50 md:w-96">
                  <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                    <button onClick={toggleNotificationsMenu} className="p-1 hover:bg-gray-100 rounded">
                      <X className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                  <div className="max-h-[70vh] overflow-y-auto">
                    {notifications.map((note) => (
                      <div
                        key={note.id}
                        className="px-4 py-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
                      >
                        <p className="text-sm font-medium text-gray-900">{note.title}</p>
                        <p className="text-xs text-gray-600 mt-1">{note.message}</p>
                        <p className="text-xs text-gray-400 mt-1.5">{note.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={toggleUserMenu}
              className="flex items-center gap-1 md:gap-2 p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Avatar className="w-8 h-8 md:w-9 md:h-9">
                <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-white font-semibold text-xs md:text-sm">
                  DU
                </AvatarFallback>
              </Avatar>
              <ChevronDown
                className={`hidden sm:block w-4 h-4 text-gray-400 transition-transform duration-200 ${
                  isUserMenuOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {isUserMenuOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={toggleUserMenu} />
                <div className="fixed md:absolute right-2 md:right-0 left-auto top-16 md:top-auto md:mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-9 h-9">
                        <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-white font-semibold">
                          DU
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-sm font-semibold text-gray-900">Demo User</div>
                        <div className="text-xs text-gray-500">demo@apex.com</div>
                      </div>
                    </div>
                  </div>

                  <div className="py-2">
                    {[
                      { icon: User, label: 'My Profile' },
                      { icon: Settings, label: 'Settings' },
                      { icon: HelpCircle, label: 'Help & Support' },
                    ].map(({ icon: Icon, label }) => (
                      <button
                        key={label}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 hover:text-primary flex items-center gap-3 transition-colors"
                      >
                        <Icon className="w-4 h-4" /> {label}
                      </button>
                    ))}
                  </div>

                  <div className="border-t border-gray-200" />
                  <div className="py-2">
                    <button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors">
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;