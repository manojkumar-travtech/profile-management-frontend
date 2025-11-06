"use client";

import React from "react";
import { Typography } from "@/components/custom/Typography";
import { SectionCardProps } from "../_types/profile.types";

export const SectionCard: React.FC<
  Omit<SectionCardProps, "actions" | "onEdit">
> = ({
  title,
  description,
  children,
  leftIcon,
  rightSection, // 👈 new prop
  withBorder = true,
  withExtraPadding = false,
  className = "",
}) => {
  return (
    <div
      className={`w-full ${
        withBorder ? "border border-gray-200" : ""
      } rounded-sm ${withExtraPadding ? "p-6" : "p-2"} ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        {/* Left section (icon + text) */}
        <div className="flex items-center gap-4 flex-1">
          {leftIcon && (
            <div className="flex items-center justify-center w-10 h-10 rounded-md bg-primary-400 text-white">
              {leftIcon}
            </div>
          )}

          {/* Title + Description */}
          <div className="flex flex-col justify-center">
            <Typography variant="text" weight="bold" size="lg" as="h5">
              {title}
            </Typography>

            {description &&
              (typeof description === "string" ? (
                <Typography
                  variant="text"
                  weight="medium"
                  size="sm"
                  className="text-fontcol-bodytext pt-1"
                >
                  {description}
                </Typography>
              ) : (
                <div className="mt-1">{description}</div>
              ))}
          </div>
        </div>

        {/* Right section aligned to text (center vertically) */}
        {rightSection && (
          <div className="flex items-center ml-4">{rightSection}</div>
        )}
      </div>

      {/* Body */}
      <div className="w-full mt-4">{children}</div>
    </div>
  );
};
