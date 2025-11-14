// components/AlertsSection.tsx
"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react"; // Only X used for close button
import { getPublishedNews } from "@/app/(portalManagement)/portalManagement/news/api/newsApi";

// ============ Alert Interface ============
export interface Alert {
  id: string;
  type: "success" | "warning" | "error";
  iconUrl: string; // 🔥 replaced icon component with image URL
  title: string;
  message: string;
  time: string;
  color: string;
  bg: string;
  borderColor: string;
}

// ============ Time Ago Helper ============
const timeAgo = (dateStr: string) => {
  const date = new Date(dateStr);
  const now = new Date();
  const diffSec = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffSec < 60) return `${diffSec}s ago`;
  if (diffSec < 3600) return `${Math.floor(diffSec / 60)} min ago`;
  if (diffSec < 86400) return `${Math.floor(diffSec / 3600)} hrs ago`;
  return `${Math.floor(diffSec / 86400)} days ago`;
};

const AlertsSection: React.FC = () => {
  const [isAlertsOpen, setIsAlertsOpen] = useState(false);
  const [currentAlertIndex, setCurrentAlertIndex] = useState(0);
  const [alertsList, setAlertsList] = useState<Alert[]>([]);

  // ===== Fetch Dynamic Alerts =====
  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const res = await getPublishedNews();

        if (res?.data?.length) {
          const mappedAlerts: Alert[] = res.data.map((item: any) => {
            const isFeatured = item.is_featured === true;

            return {
              id: item.id,
              type: isFeatured ? "success" : "warning",

              // 🔥 API image URL
              iconUrl: item.image_url || "/fallback-alert.png",

              title: item.title,
              message: item.summary || item.content?.slice(0, 120) + "...",
              time: timeAgo(item.published_at),

              color: isFeatured ? "text-green-700" : "text-yellow-700",
              bg: isFeatured ? "bg-green-100" : "bg-yellow-100",
              borderColor: isFeatured
                ? "border-green-200"
                : "border-yellow-200",
            };
          });

          setAlertsList(mappedAlerts);
        }
      } catch (err) {
        console.error("Failed to load alerts:", err);
      }
    };

    fetchAlerts();
  }, []);

  const currentAlert = alertsList[currentAlertIndex];

  // ===== Auto Loop Alerts (every 5 sec) =====
  useEffect(() => {
    if (!alertsList.length) return;

    const timer = setInterval(() => {
      setCurrentAlertIndex((prev) => (prev + 1) % alertsList.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [alertsList.length]);

  // ===== Remove Single Alert =====
  const closeAlert = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setAlertsList((prev) => {
      const newList = prev.filter((a) => a.id !== id);
      if (currentAlertIndex >= newList.length && newList.length > 0) {
        setCurrentAlertIndex(newList.length - 1);
      }
      return newList;
    });
  };

  const toggleAlertsMenu = () => setIsAlertsOpen(!isAlertsOpen);
  const unreadAlerts = alertsList.length;

  return (
    <>
      {/* Desktop Alert Bar */}
      <div className="hidden lg:flex flex-1">
        {alertsList.length > 0 && currentAlert && (
          <div
            className={`flex-1 flex items-center gap-3 px-4 py-2.5 rounded-lg border transition-all duration-300 overflow-hidden ${currentAlert.bg} ${currentAlert.borderColor}`}
          >
            {/* Icon */}
            <div className="flex items-center gap-2 flex-shrink-0 min-w-fit">
              <div className="w-10 h-10 rounded-lg">
                <img
                  src={currentAlert.iconUrl}
                  alt="alert icon"
                  className="w-10 h-10 object-contain"
                />
              </div>

              <span
                className={`text-xs font-bold uppercase tracking-wide ${currentAlert.color}`}
              >
                {currentAlert.type}
              </span>
            </div>

            <div className="w-px h-7 bg-gray-300/50"></div>

            {/* Title + Message */}
            <div className="flex-1 flex flex-col gap-0.5 overflow-hidden">
              <span className="text-sm font-semibold text-gray-900 truncate">
                {currentAlert.title}
              </span>
              <span className="text-xs text-gray-600 truncate">
                {currentAlert.message}
              </span>
            </div>

            {/* Time + Navigation */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <span className="text-xs text-gray-500 whitespace-nowrap">
                {currentAlert.time}
              </span>

              {/* Navigation */}
              <div className="flex items-center gap-1 bg-white/60 rounded-md px-2 py-1">
                <button
                  onClick={() =>
                    setCurrentAlertIndex(
                      (prev) =>
                        (prev - 1 + alertsList.length) % alertsList.length
                    )
                  }
                  className="p-0.5 hover:bg-gray-200 rounded transition-colors"
                >
                  <svg
                    className="w-3.5 h-3.5 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                <span className="text-xs text-gray-700 font-medium min-w-[32px] text-center">
                  {currentAlertIndex + 1}/{alertsList.length}
                </span>

                <button
                  onClick={() =>
                    setCurrentAlertIndex(
                      (prev) => (prev + 1) % alertsList.length
                    )
                  }
                  className="p-0.5 hover:bg-gray-200 rounded transition-colors"
                >
                  <svg
                    className="w-3.5 h-3.5 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>

              {/* Close Button */}
              <button
                onClick={(e) => closeAlert(currentAlert.id, e)}
                className="p-1.5 hover:bg-white/80 rounded-md transition-colors group"
              >
                <X className="w-4 h-4 text-gray-500 group-hover:text-gray-700" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Alert Icon */}
      <div className="relative lg:hidden">
        <button
          onClick={toggleAlertsMenu}
          className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <img
            src={currentAlert?.iconUrl || "/alert.png"}
            alt="alert"
            className="w-6 h-6 object-contain"
          />

          {unreadAlerts > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 md:w-5 md:h-5 bg-yellow-500 rounded-full flex items-center justify-center text-white text-[10px] md:text-xs font-semibold">
              {unreadAlerts}
            </span>
          )}
        </button>

        {isAlertsOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={toggleAlertsMenu} />
            <div className="fixed md:absolute right-2 md:right-0 left-2 md:left-auto top-16 md:top-auto md:mt-2 bg-white rounded-lg shadow-xl border border-gray-200 z-50 md:w-96">
              <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-900">
                  System Alerts
                </h3>
                <button
                  onClick={toggleAlertsMenu}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </div>

              <div className="max-h-[70vh] overflow-y-auto">
                {alertsList.length === 0 ? (
                  <div className="px-4 py-8 text-center text-sm text-gray-500">
                    No alerts at the moment
                  </div>
                ) : (
                  alertsList.map((alert) => {
                    return (
                      <div
                        key={alert.id}
                        className="px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors group"
                      >
                        <div className="flex gap-3">
                          {/* Mobile icon */}
                          <div
                            className={`w-10 h-10 ${alert.bg} rounded-lg flex items-center justify-center`}
                          >
                            <img
                              src={alert.iconUrl}
                              alt="alert icon"
                              className="w-5 h-5 object-contain"
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <p className="text-sm font-medium text-gray-900">
                                {alert.title}
                              </p>

                              <button
                                onClick={(e) => closeAlert(alert.id, e)}
                                className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 rounded transition-all"
                              >
                                <X className="w-3.5 h-3.5 text-gray-500" />
                              </button>
                            </div>

                            <p className="text-xs text-gray-600 mt-1">
                              {alert.message}
                            </p>
                            <p className="text-xs text-gray-400 mt-1.5">
                              {alert.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default AlertsSection;
