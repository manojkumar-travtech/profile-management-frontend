import ProfileManagementMainPageLayout from "@/app/(profileManagement)/_components/ProfileManagementMainPageLayout";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React from "react";
import DelegationCards from "./DelegationCards";
import DelegationGuideLines from "./DelegationGuideLines";
import DelegationTable from "./DelegationTable";
import AddDelegation from "./AddDelegation";

const DelegationManagement = () => {
  return (
    <ProfileManagementMainPageLayout
      title="Delegation Management"
      subtitle="Manage who can access and modify your travel arrangements"
      rightSection={<AddDelegation />}
    >
      <DelegationCards />
      <DelegationTable />
      <DelegationGuideLines />
    </ProfileManagementMainPageLayout>
  );
};

export default DelegationManagement;
