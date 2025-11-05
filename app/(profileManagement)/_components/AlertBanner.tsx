'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';
import { Typography } from '@/components/custom/Typography';
import { CircularProgress } from '@/components/custom/CircularProgress';

export type AlertVariant = 'info' | 'warning' | 'success';

export interface AlertBannerProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
  variant?: AlertVariant;
  progress?: number; // optional percentage
}

export const AlertBanner: React.FC<AlertBannerProps> = ({
  icon: Icon,
  title,
  description,
  actionText,
  onAction,
  variant = 'info',
  progress,
}) => {
  return (
    <div
      className="border border-gray-100 rounded-[var(--TT-Brand-border-radius-sm,4px)] p-4 flex items-center justify-between gap-6"
      style={{
        background:
          'linear-gradient(90deg, #FFE4E6 0%, #FFFBE3 100%)',
      }}
    >
      <div className="flex items-center gap-4 flex-shrink-0">
        {typeof progress === 'number' ? (
          <CircularProgress value={progress} size="sm" />
        ) : Icon ? (
          <Icon className="w-6 h-6 text-gray-600" />
        ) : null}
      </div>

      <div className="flex-1 min-w-0 flex flex-col gap-1">
        <Typography
          size="md"
          className="font-medium text-gray-900 leading-tight"
        >
          {title}
        </Typography>
        {description && (
          <Typography size="sm" className="text-gray-600 truncate">
            {description}
          </Typography>
        )}
      </div>

      {/* Right: Action Button */}
      {actionText && (
        <Button
          variant="secondary"
          size="sm"
          onClick={onAction}
          className="flex-shrink-0 bg-white text-gray-700 hover:bg-gray-100 w-28"
        >
          {actionText}
        </Button>
      )}
    </div>
  );
};
