"use client";

import { Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TravelOverview } from "./TravelOverview";
import { TravelRecentTrips } from "./TravelRecentTrips";
import { TravelUpcomingTrips } from "./TravelUpcomingTrips";
import { TravelAnalytics } from "./TravelAnalytics";
import { TravelHistoryProps } from "./types";
import CustomTabs, {
  CustomTabItem,
} from "@/components/custom/CustomTabs/CustomTabs";
import ProfileManagementMainPageLayout from "@/app/(profileManagement)/_components/ProfileManagementMainPageLayout";

const TravelHistory = ({ profile }: TravelHistoryProps) => {
  const travelStats = profile?.travelHistory || {
    totalTrips: 24,
    totalMiles: 145000,
    favoriteDestinations: ["London", "Tokyo", "Paris", "New York"],
    averageTripLength: 5.2,
    carbonFootprint: 15.6,
    preferredBookingWindow: 21,
    seasonalPatterns: {
      Jan: 2,
      Feb: 1,
      Mar: 3,
      Apr: 2,
      May: 4,
      Jun: 3,
      Jul: 2,
      Aug: 3,
      Sep: 2,
      Oct: 1,
      Nov: 1,
      Dec: 0,
    },
  };

  const recentTrips = [
      {
      id: "1",
      destination: "Tokyo, Japan",
      dates: "Mar 15-22, 2024",
      flights: 2,
      hotels: 3,
      cost: "$2,450",
      status: "Completed",
      purpose: "Business"
    },
    {
      id: "2",
      destination: "Paris, France",
      dates: "Apr 5-12, 2024",
      flights: 2,
      hotels: 2,
      cost: "$3,200",
      status: "Upcoming",
      purpose: "Leisure"
    },
    {
      id: "3",
      destination: "New York, USA",
      dates: "Feb 20-25, 2024",
      flights: 2,
      hotels: 1,
      cost: "$1,800",
      status: "Completed",
      purpose: "Conference"
    },
    {
      id: "4",
      destination: "Barcelona, Spain",
      dates: "May 10-17, 2024",
      flights: 2,
      hotels: 2,
      cost: "$2,100",
      status: "Upcoming",
      purpose: "Vacation"
    }
  ];

  const upcomingTrips = [
    {
      id: "4",
      destination: "Sydney, Australia",
      dates: "2024-11-15 to 2024-11-25",
      purpose: "Leisure",
      status: "Confirmed",
      flights: 2,
      hotels: 2,
      cost: "$4,100",
    },
  ];

  // --- Define tab items for CustomTabs ---
  const tabs: CustomTabItem[] = [
    {
      value: "overview",
      label: "Overview",
      content: <TravelOverview stats={travelStats} />,
    },
    {
      value: "recent",
      label: "Recent",
      content: <TravelRecentTrips trips={recentTrips} />,
    },
    {
      value: "upcoming",
      label: "Upcoming",
      content: <TravelUpcomingTrips trips={upcomingTrips} />,
    },
    {
      value: "analytics",
      label: "Analytics",
      content: <TravelAnalytics stats={travelStats} />,
    },
  ];

  return (
    <div className="space-y-6">
      <ProfileManagementMainPageLayout
        title="Travel History & Analytics"
        subtitle="View your travel patterns, statistics, and trip history"
      >
        <CustomTabs
          tabs={tabs}
          defaultValue="overview"
          listClassName="bg-gray-100"
          contentClassName="p-6"
        />
      </ProfileManagementMainPageLayout>
    </div>
  );
};

export default TravelHistory;
