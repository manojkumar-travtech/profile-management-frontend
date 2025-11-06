import React from "react";
import ProfileManagementMainPageLayout from "../_components/ProfileManagementMainPageLayout";
import ProfileTabList from "./_components/ProfileTabs/ProfileTabList";
import BusinessTravelProfile from "./_components/BusinessTravelProfile/BusinessTravelProfile";

const ProfileManagementPage = () => {
  return (
    <ProfileManagementMainPageLayout
      title="Profile Management"
      subtitle="Manage your travel profiles and preferences"
    >
      <div className="space-y-4">
        <BusinessTravelProfile />
        <ProfileTabList />
      </div>
    </ProfileManagementMainPageLayout>
  );
};

export default ProfileManagementPage;
