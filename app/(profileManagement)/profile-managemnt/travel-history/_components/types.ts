import { ReactNode } from "react";

export interface TravelStats {
  totalTrips: number;
  totalMiles: number;
  favoriteDestinations: string[];
  averageTripLength: number;
  carbonFootprint: number;
  preferredBookingWindow: number;
  seasonalPatterns: Record<string, number>;
}

export interface Trip {
  id: number;
  destination: string;
  dates: string;
  purpose: string;
  status: string;
  flights: number;
  hotels: number;
  cost: string;
}

export interface TravelHistoryProps {
  profile?: {
    travelHistory?: TravelStats;
  };
}

export interface TabSectionProps {
  stats: TravelStats;
  recentTrips?: Trip[];
  upcomingTrips?: Trip[];
}
