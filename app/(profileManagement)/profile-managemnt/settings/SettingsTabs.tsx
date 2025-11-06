"use client";

import { Eye, Bell, Lock, Key, AlertTriangle, Trash2 } from "lucide-react";
import { Typography } from "@/components/custom/Typography";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CustomTabs, {
  CustomTabItem,
} from "@/components/custom/CustomTabs/CustomTabs";
import { SettingsGroup } from "./SettingsGroup";
import { settingGroups } from "./settingGroups";

interface SettingsTabsProps {
  settings: Record<string, any>;
  onChange: (key: string, value: boolean | string | number) => void;
  isEditing: boolean;
  onDeleteClick: () => void;
}

export function SettingsTabs({
  settings,
  onChange,
  isEditing,
  onDeleteClick,
}: SettingsTabsProps) {
  const tabItems: CustomTabItem[] = [
    {
      value: "privacy",
      label: "Privacy",
      icon: <Eye className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <Typography
            variant="display"
            size="sm"
            weight="semibold"
            as="h3"
            className="flex items-center gap-2"
          >
            <Eye className="w-5 h-5" /> Data Sharing
          </Typography>
          <SettingsGroup
            items={settingGroups.privacy}
            settings={settings}
            onChange={onChange}
            disabled={!isEditing}
          />

          <div className="space-y-2 pt-2">
            <Label>Data Retention Period</Label>
            <Select
              value={settings.dataRetentionPeriod.toString()}
              onValueChange={(v) =>
                onChange("dataRetentionPeriod", parseInt(v))
              }
              disabled={!isEditing}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                {[1, 3, 5, 7, 10].map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year} year{year > 1 && "s"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Typography size="sm" color="text-muted-foreground">
              How long to retain your travel data after deletion.
            </Typography>
          </div>
        </div>
      ),
    },
    {
      value: "notifications",
      label: "Notifications",
      icon: <Bell className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <Typography
            variant="display"
            size="sm"
            weight="semibold"
            as="h3"
            className="flex items-center gap-2"
          >
            <Bell className="w-5 h-5" /> Notification Preferences
          </Typography>
          <SettingsGroup
            items={settingGroups.notifications}
            settings={settings}
            onChange={onChange}
            disabled={!isEditing}
          />
        </div>
      ),
    },
    {
      value: "security",
      label: "Security",
      icon: <Lock className="w-5 h-5" />,
      content: (
        <div className="space-y-8">
          <div>
            <Typography
              variant="display"
              size="sm"
              weight="semibold"
              as="h3"
              className="flex items-center gap-2"
            >
              <Lock className="w-5 h-5" /> Security Settings
            </Typography>

            <div className="flex items-center justify-between py-3 border-b">
              <div>
                <Label>Two-Factor Authentication</Label>
                <Typography size="sm" color="text-muted-foreground">
                  Add an extra layer of security to your account.
                </Typography>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant={settings.twoFactorEnabled ? "default" : "secondary"}
                >
                  {settings.twoFactorEnabled ? "Enabled" : "Disabled"}
                </Badge>
                <Button variant="secondary" size="sm">
                  <Key className="w-4 h-4 mr-2" />
                  {settings.twoFactorEnabled ? "Manage" : "Enable"}
                </Button>
              </div>
            </div>

            <SettingsGroup
              items={settingGroups.security}
              settings={settings}
              onChange={onChange}
              disabled={!isEditing}
            />
          </div>

          <div className="pt-4 border-t">
            <Typography
              variant="display"
              size="sm"
              weight="semibold"
              color="text-destructive"
              className="flex items-center gap-2"
            >
              <AlertTriangle className="w-5 h-5" /> Danger Zone
            </Typography>
            <div className="flex items-center justify-between mt-3">
              <div>
                <Label>Delete Profile</Label>
                <Typography size="sm" color="text-muted-foreground">
                  Permanently delete your profile and all related data.
                </Typography>
              </div>
              <Button variant="destructive" size="sm" onClick={onDeleteClick}>
                <Trash2 className="w-4 h-4 mr-2" /> Delete
              </Button>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return <CustomTabs tabs={tabItems} />;
}
