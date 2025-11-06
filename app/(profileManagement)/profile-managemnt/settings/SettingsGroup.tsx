"use client";

import { Switch } from "@/components/ui/switch";
import { Typography } from "@/components/custom/Typography";

interface SettingsGroupProps {
  items: { key: string; label: string; desc: string }[];
  settings: Record<string, any>;
  onChange: (key: string, value: boolean | string | number) => void;
  disabled?: boolean;
}

export function SettingsGroup({
  items,
  settings,
  onChange,
  disabled,
}: SettingsGroupProps) {
  return (
    <div className="divide-y">
      {items.map((field) => (
        <div key={field.key} className="flex items-center justify-between py-3">
          <div className="flex flex-col">
            <Typography weight="bold" as="span">
              {field.label}
            </Typography>
            <Typography
              size="sm"
              as="span"
              className="break-words w-full text-gray-500"
            >
              {field.desc}
            </Typography>
          </div>
          <Switch
            checked={!!settings[field.key]}
            onCheckedChange={(checked) => onChange(field.key, checked)}
            disabled={disabled}
          />
        </div>
      ))}
    </div>
  );
}
