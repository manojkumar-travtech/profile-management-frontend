"use client";
import { Trip, TripCard } from "./TripCard";

export const TravelRecentTrips: React.FC<{ trips: Trip[] }> = ({ trips }) => {
  if (!trips.length) {
    return <p className="text-center text-slate-500 py-10">No recent trips.</p>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {trips.map((trip) => (
        <TripCard key={trip.id} trip={trip} type="recent" />
      ))}
    </div>
  );
};
