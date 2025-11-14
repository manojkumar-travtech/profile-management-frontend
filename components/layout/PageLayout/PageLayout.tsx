import { Typography } from "@/components/custom/Typography";
import React from "react";

interface PageLayoutProps {
  title: string;
  subtitle?: string;
  rightSection?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  title,
  subtitle,
  rightSection,
  className = "",
  children,
}) => {
  return (
    <div className={`mx-auto px-4 pb-4 ${className}`}>
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Left Section */}
        <div className="flex flex-col gap-2">
          <Typography
            variant="display"
            size="sm"
            weight="bold"
            className="break-words w-full text-gray-900"
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography
              variant="text"
              size="sm"
              weight="regular"
              className="break-words w-full text-gray-500"
            >
              {subtitle}
            </Typography>
          )}
        </div>

        {/* Right Section */}
        {rightSection && <div className="flex-shrink-0">{rightSection}</div>}
      </div>

      {/* Page Content */}
      {children && <div className="mt-8">{children}</div>}
    </div>
  );
};

export default PageLayout;
