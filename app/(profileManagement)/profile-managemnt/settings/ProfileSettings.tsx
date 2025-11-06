"use client";

import { useState, useEffect } from "react";
import { Shield, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProfileManagementMainPageLayout from "../../_components/ProfileManagementMainPageLayout";
import { SettingsTabs } from "./SettingsTabs";
import { ConfirmationModal } from "@/components/custom/ConfirmationModal";
import { useUnsavedChangesGuard } from "./useUnsavedChangesGuard";

export default function ProfileSettings() {
  const [isEditing, setIsEditing] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [settings, setSettings] = useState({
    shareWithAgencies: true,
    shareWithDelegates: false,
    shareAnalytics: true,
    marketingOptIn: false,
    dataRetentionPeriod: 5,
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    flightUpdates: true,
    hotelConfirmations: true,
    documentExpiry: true,
    weatherAlerts: true,
    priceDrops: false,
    travelDeals: true,
    twoFactorEnabled: false,
    loginAlerts: true,
    securityAlerts: true,
  });

  const [initialSettings, setInitialSettings] = useState(settings);
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  // ✅ Track unsaved changes
  useEffect(() => {
    const changed = JSON.stringify(settings) !== JSON.stringify(initialSettings);
    setUnsavedChanges(changed);
  }, [settings, initialSettings]);

  // ✅ Hook for handling leave confirmation modal
  const {
    showUnsavedModal,
    confirmLeave,
    cancelLeave,
  } = useUnsavedChangesGuard(unsavedChanges);

  const handleChange = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    setInitialSettings(settings);
    setIsEditing(false);
    setUnsavedChanges(false);
  };

  const handleDeleteProfile = () => console.log("Profile deleted");

  return (
    <div className="space-y-6">
      <ProfileManagementMainPageLayout
        title="Settings & Privacy"
        subtitle="Manage your privacy, notifications, and security preferences."
        rightSection={
          !isEditing && (
            <Button size="sm" onClick={() => setIsEditing(true)}>
              <Shield className="w-4 h-4 mr-2" /> Edit Settings
            </Button>
          )
        }
      >
        <SettingsTabs
          settings={settings}
          onChange={handleChange}
          isEditing={isEditing}
          onDeleteClick={() => setDeleteModalOpen(true)}
        />

        {isEditing && (
          <div className="flex justify-end gap-2 mt-6">
            <Button variant="secondary" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" /> Save All Changes
            </Button>
          </div>
        )}
      </ProfileManagementMainPageLayout>

      {/* Delete Confirmation */}
      <ConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteProfile}
        variant="destructive"
        title="Are you absolutely sure?"
        description="This will permanently delete your profile and all associated travel data."
        confirmText="Delete"
        cancelText="Cancel"
      />

      {/* Unsaved Changes Confirmation */}
      <ConfirmationModal
        isOpen={showUnsavedModal}
        onClose={cancelLeave}
        onConfirm={confirmLeave}
        variant="default"
        title="Unsaved Changes"
        description="You have unsaved changes. Are you sure you want to leave this page? Unsaved changes will be lost."
        confirmText="Leave"
        cancelText="Stay"
      />
    </div>
  );
}
