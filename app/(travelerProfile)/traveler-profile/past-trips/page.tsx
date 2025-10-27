"use client";

import { Plane, Car, Ship } from "lucide-react";

import TravelerMainPageLayout from "../../_components/TravelerMainPageLayout";
import PastTripCard from "./_components/PastTripCard";
import { PastTripCardProps } from "../../_types/past-trips.types";

const PastTravelApp: React.FC = () => {
  const trips: PastTripCardProps[] = [
    {
      date: "Aug. 26–28, 2025",
      guests: 1,
      items: [
        { icon: Plane, label: "Flight", completed: true },
        { icon: Car, label: "Car", completed: true },
        { icon: Ship, label: "Cruise", completed: true },
      ],
    },
    {
      date: "Mar. 12–19, 2025",
      guests: 1,
      items: [
        { icon: Plane, label: "Flight", completed: true },
        { icon: Ship, label: "Cruise", completed: true },
      ],
    },
    {
      date: "Jan. 26, 2025",
      guests: 1,
      items: [
        { icon: Plane, label: "Flight", completed: true },
        { icon: Car, label: "Car", completed: true },
      ],
    },
    {
      date: "Dec. 12–19, 2024",
      guests: 1,
      items: [
        { icon: Plane, label: "Flight", completed: true },
        { icon: Ship, label: "Cruise", completed: true },
      ],
    },
  ];

  return (
    <TravelerMainPageLayout
      title="Past Travel"
      subtitle="Curious to understand your last completed travel. Enabling autocomplete for future bookings is more efficient."
    >
      {trips.map((trip, i) => (
        <PastTripCard key={i} {...trip} allowMultipleOpen={false}/>
      ))}
    </TravelerMainPageLayout>
  );
};

export default PastTravelApp;
