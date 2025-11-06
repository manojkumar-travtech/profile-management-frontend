import React from "react";
import {
  Home,
  User,
  Star,
  FileText,
  CreditCard,
  Users,
  Settings,
} from "lucide-react";
import OverviewTab from "./OverviewTab";
import PersonalTab from "./PersonalTab";
import LoyaltyTab from "./LoyaltyTab";
import DocumentsTab from "./DocumentsTab";
import PaymentsTab from "./PaymentsTab";
import DelegationTab from "./DelegationTab";
import PreferencesTab from "./PreferencesTab";
import CustomTabs from "@/components/custom/CustomTabs/CustomTabs";

const ProfileTabList = () => {
  const tabs = [
    { value: "overview", label: "Overview", icon: <Home />, content: <OverviewTab /> },
    { value: "personal", label: "Personal", icon: <User />, content: <PersonalTab /> },
    { value: "loyalty", label: "Loyalty", icon: <Star />, content: <LoyaltyTab /> },
    { value: "documents", label: "Documents", icon: <FileText />, content: <DocumentsTab /> },
    { value: "payments", label: "Payments", icon: <CreditCard />, content: <PaymentsTab /> },
    { value: "delegation", label: "Delegation", icon: <Users />, content: <DelegationTab /> },
    { value: "preferences", label: "Preferences", icon: <Settings />, content: <PreferencesTab /> },
  ];

  return (
    <div className="w-full">
      <CustomTabs tabs={tabs} defaultValue="overview" />
    </div>
  );
};

export default ProfileTabList;
