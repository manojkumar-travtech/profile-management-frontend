import { Typography } from "@/components/custom/Typography";
import React from "react";

interface TravelerMainPageLayoutrProps {
  title: string;
  subtitle?: string;
  className?: string;
  children?: React.ReactNode;
}

const TravelerMainPageLayout: React.FC<TravelerMainPageLayoutrProps> = ({
  title,
  subtitle,
  className = "",
  children,
}) => {
  return (
    <div className={`max-w-6xl mx-auto px-4 pb-4 ${className}`}>
      <div
        className={`flex flex-col items-center justify-center text-center gap-4`}
      >
        <Typography
          variant="display"
          size="sm"
          weight="bold"
          className="break-words w-full"
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography
            variant="text"
            size="sm"
            weight="regular"
            className="break-words w-full max-w-2xl mx-auto"
          >
            {subtitle}
          </Typography>
        )}
      </div>
      {children && <div className="mt-8">{children}</div>}
    </div>
  );
};

export default TravelerMainPageLayout;
