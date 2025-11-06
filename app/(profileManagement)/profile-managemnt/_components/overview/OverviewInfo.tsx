"use client";

import {
  FileText,
  Star,
  CreditCard,
  Shield,
  User,
  Settings,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import InfoCard from "@/app/(profileManagement)/_components/ProfileSectionCard";
import Card from "@/app/(profileManagement)/_components/Card";

export default function OverviewTab() {
  const profileCompletion = 40;

  const summary = [
    {
      icon: <FileText className="text-primary" />,
      number: 1,
      title: "Documents",
    },
    {
      icon: <Star className="text-primary" />,
      number: 2,
      title: "Loyalty Programs",
    },
    {
      icon: <CreditCard className="text-primary" />,
      number: 0,
      title: "Payment Methods",
    },
    {
      icon: <Shield className="text-primary" />,
      number: 0,
      title: "Delegations",
    },
  ];

  const sections = [
    {
      id: 1,
      icon: <User className="w-5 h-5 text-primary" />,
      title: "Personal Information",
      progress: 38,
      status: "Complete",
    },
    {
      id: 2,
      icon: <Star className="w-5 h-5 text-primary" />,
      title: "Loyalty Programs",
      progress: 67,
      status: "Edit",
    },
    {
      id: 3,
      icon: <FileText className="w-5 h-5 text-primary" />,
      title: "Travel Documents",
      progress: 30,
      status: "Complete",
    },
    {
      id: 4,
      icon: <Settings className="w-5 h-5 text-primary" />,
      title: "Travel Preferences",
      progress: 25,
      status: "Complete",
    },
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-white">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-base font-semibold">Profile Completion</h2>
          <span
            className={cn(
              "text-sm font-semibold",
              profileCompletion < 50 ? "text-red-500" : "text-green-600"
            )}
          >
            {profileCompletion}%
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={cn(
              "h-full rounded-full",
              profileCompletion < 50 ? "bg-red-500" : "bg-green-500"
            )}
            style={{ width: `${profileCompletion}%` }}
          />
        </div>

        {/* Summary Grid */}
        <div className="grid grid-cols-4 gap-4 mt-5">
          {summary.map((item, i) => (
            <InfoCard key={i} {...item} summary />
          ))}
        </div>
      </Card>

      {/* Profile Sections */}
      <Card className="bg-white">
        <h2 className="text-base font-semibold mb-4">Profile Sections</h2>
        <div className="grid grid-cols-2 gap-4">
          {sections.map((section) => (
            <InfoCard
              key={section.id}
              {...section}
              showStatus
              onClick={() => console.log(`${section.title} clicked`)}
            />
          ))}
        </div>
      </Card>

      {/* Recent Activity */}
      <Card className="bg-white">
        <h2 className="text-base font-semibold mb-4">Recent Activity</h2>
        <div className="flex items-center gap-3 p-3 rounded-lg bg-green-50 border border-green-200">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <div>
            <p className="text-sm font-medium text-green-700">
              Profile updated
            </p>
            <p className="text-xs text-gray-500">11/5/2025</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
