"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/custom/Typography";
import { SectionCardProps } from "../_types/profile.types";
import { LinkButton } from "@/components/custom/CustomButtons";

export const SectionCard: React.FC<SectionCardProps> = ({
  title,
  description,
  onEdit,
  children,
  actions,
  leftIcon,
  withBorder = true,
  withExtraPadding = true,
  className,
}) => {
  return (
    <div
      className={`w-full ${
        withBorder ? "border border-gray-200" : ""
      } rounded-sm ${withExtraPadding ? "p-6" : "p-0"} ${className}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        {/* Left section (icon + text) */}
        <div className="flex items-start gap-6 flex-1">
          {/* Icon at the top, aligned with first line of text */}
          {leftIcon && <div className="flex-shrink-0 pt-0.5">{leftIcon}</div>}

          {/* Title + Description */}
          <div className="flex flex-col gap-4">
            <Typography variant="text" weight="bold" size="lg" as="h5">
              {title}
            </Typography>
            {description &&
              (typeof description === "string" ? (
                <Typography
                  variant="text"
                  weight="medium"
                  size="sm"
                  className="text-fontcol-bodytext"
                >
                  {description}
                </Typography>
              ) : (
                <div className="mt-1">{description}</div>
              ))}
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {actions}
          {onEdit && <LinkButton onClick={onEdit}>Edit</LinkButton>}
        </div>
      </div>

      {/* Body */}
      <div className="w-full">{children}</div>
    </div>
  );
};
