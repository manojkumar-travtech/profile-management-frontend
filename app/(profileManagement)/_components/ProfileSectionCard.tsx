"use client";

import React from "react";
import { AlertTriangle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import Card from "./Card";

interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  number?: number | string;
  progress?: number;
  status?: string;
  showStatus?: boolean;
  summary?: boolean;
  onClick?: () => void;
  className?: string;
}

/**
 * Reusable InfoCard built using Tailwind `Card` wrapper
 */
const InfoCard: React.FC<InfoCardProps> = ({
  icon,
  title,
  number,
  progress,
  status,
  showStatus = false,
  summary = false,
  onClick,
  className,
}) => {
  return (
    <Card onClick={onClick} className={cn("flex items-center justify-between", className)}>
      {/* Left section */}
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-md bg-white border">{icon}</div>

        {summary ? (
          // Summary layout
          <div className="flex flex-col items-start leading-tight">
            <p className="text-lg font-semibold">{number}</p>
            <p className="text-xs text-gray-500">{title}</p>
          </div>
        ) : (
          // Section layout
          <div>
            <p className="font-medium text-sm">{title}</p>
            {progress !== undefined && (
              <div className="flex items-center gap-1 text-xs text-gray-500">
                {progress < 50 ? (
                  <AlertTriangle className="w-3 h-3 text-red-500" />
                ) : (
                  <Clock className="w-3 h-3 text-yellow-500" />
                )}
                <span>{progress}%</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Optional right section */}
      {showStatus && status && (
        <p className="text-sm text-gray-600 font-medium">{status}</p>
      )}
    </Card>
  );
};

export default InfoCard;
