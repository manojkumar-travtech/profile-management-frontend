"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/custom/Typography";
import { SectionCardProps } from "../_types/profile.types";

export const SectionCard: React.FC<SectionCardProps> = ({
  title,
  description,
  onEdit,
  children,
  actions,
  leftIcon,
  withBorder = true,
  withExtraPadding = true,
}) => {
  return (
    <div
      className={`w-full ${
        withBorder ? "border border-gray-200" : ""
      } rounded-sm ${withExtraPadding ? "p-4" : "p-0"}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        {/* Left section (icon + text) */}
        <div className="flex items-start gap-3 flex-1">
          {/* Icon at the top, aligned with first line of text */}
          {leftIcon && <div className="flex-shrink-0 pt-0.5">{leftIcon}</div>}

          {/* Title + Description */}
          <div className="flex flex-col flex-1">
            <Typography variant="text" weight="bold" size="xl">
              {title}
            </Typography>
            {description && (
              <Typography
                variant="text"
                weight="medium"
                size="sm"
                className="text-gray-500 mt-1"
              >
                {description}
              </Typography>
            )}
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {actions}
          {onEdit && (
            <Button
              variant="link"
              className="text-blue-600 text-sm p-0 h-auto"
              onClick={onEdit}
            >
              Edit
            </Button>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="w-full">{children}</div>
    </div>
  );
};
