"use client";

import React from "react";
import TravelHistory from "./_components/TravelHistory";

export default function ProfilePage() {
  const profile = {
    name: "John Doe",
    travelHistory: {
      totalTrips: 32,
      totalMiles: 210_500,
      favoriteDestinations: ["Dubai", "London", "Singapore", "Rome"],
      averageTripLength: 6.3,
      carbonFootprint: 12.4,
      preferredBookingWindow: 18,
      seasonalPatterns: {
        Jan: 1,
        Feb: 2,
        Mar: 4,
        Apr: 3,
        May: 5,
        Jun: 3,
        Jul: 2,
        Aug: 4,
        Sep: 3,
        Oct: 1,
        Nov: 2,
        Dec: 1,
      },
    },
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Welcome, {profile.name}</h1>
      {/* Pass the profile to TravelHistory */}
      <TravelHistory profile={profile} />
    </div>
  );
}
