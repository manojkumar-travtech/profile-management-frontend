"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Download, Edit, MapPin, Share2, Loader2 } from "lucide-react";
import {
  CarRentalSection,
  FlightSection,
  HotelSection,
  TravelerSection,
} from "./Sections";
import { TripWithDetails } from "./types";
import { formatDate, getStatusColor, getTypeColor } from "./helpers";
import { CustomDrawer } from "@/components/custom/CustomDrawer";
import { getUserTripFullDetails } from "../_actions/tripsApi";
import { Skeleton } from "@/components/ui/skeleton"; // 👈 using shadcn Skeleton

interface TripDrawerProps {
  tripId: string;
  orgId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  width?: string;
}

const TripDrawer = ({
  tripId,
  orgId,
  open,
  onOpenChange,
  width = "700px",
}: TripDrawerProps) => {
  const [trip, setTrip] = useState<TripWithDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTripDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getUserTripFullDetails(tripId, orgId);
      console.log('response' , response.data)
      if (response?.success && response.data) {
        setTrip(response.data);
      } else {
        setError("Failed to load trip details.");
      }
    } catch (err: any) {
      setError("Error loading trip details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!open || !tripId || !orgId) return;
    fetchTripDetails();
  }, [open, tripId, orgId]);

  return (
    <CustomDrawer
      open={open}
      onOpenChange={onOpenChange}
      title={
        trip ? (
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {trip.trip_name}
            </h2>
            <p className="text-gray-600 text-xs">
              Confirmation: {trip.trip_number}
            </p>

            <div className="flex flex-wrap gap-2 mt-2">
              <span
                className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(
                  trip.status
                )}`}
              >
                {trip.status}
              </span>
              <span
                className={`px-2 py-1 rounded text-xs font-medium ${getTypeColor(
                  trip.type || ""
                )}`}
              >
                {trip.type}
              </span>
              <span className="px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700">
                {trip.purpose}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-3 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {trip.origin_city}, {trip.destination_city}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {formatDate(trip.departure_date)} - {formatDate(trip.return_date)}
              </div>
            </div>
          </div>
        ) : (
          "Trip Details"
        )
      }
      footer={
        <div className="flex gap-2 flex-wrap">
          <Button variant="ghost" size="sm" className="flex items-center gap-1">
            <Download className="w-3 h-3" /> Download
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center gap-1">
            <Share2 className="w-3 h-3" /> Share
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center gap-1">
            <Edit className="w-3 h-3" /> Edit
          </Button>
        </div>
      }
      width={width}
      position="right"
    >
      {loading ? (
        // ✅ Skeleton Loader Section
        <div className="space-y-6 p-4">
          {/* Header Skeleton */}
          <div>
            <Skeleton className="h-5 w-1/3 mb-2" />
            <Skeleton className="h-3 w-1/4" />
            <div className="flex gap-2 mt-3">
              <Skeleton className="h-5 w-12 rounded-md" />
              <Skeleton className="h-5 w-20 rounded-md" />
              <Skeleton className="h-5 w-16 rounded-md" />
            </div>
          </div>

          {/* Location and Dates */}
          <div className="grid grid-cols-2 gap-3">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-2/3" />
          </div>

          {/* Flights Section Skeleton */}
          <div className="space-y-4 mt-5">
            {[1, 2].map((i) => (
              <div key={i} className="border rounded-lg p-4 space-y-3">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-3 w-1/3" />
                <Skeleton className="h-3 w-1/2" />
                <div className="flex gap-2 mt-2">
                  <Skeleton className="h-3 w-12" />
                  <Skeleton className="h-3 w-12" />
                  <Skeleton className="h-3 w-12" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : error ? (
        <div className="text-red-500 text-center py-10">{error}</div>
      ) : trip ? (
        <div className="space-y-5">
          {trip.flights?.length ? (
            <FlightSection flights={trip.flights} />
          ) : null}
          {trip.hotels?.length ? <HotelSection hotels={trip.hotels} /> : null}
          {trip.car_rentals?.length ? (
            <CarRentalSection carRentals={trip.car_rentals} />
          ) : null}
          {trip.travelers?.length ? (
            <TravelerSection travelers={trip.travelers} />
          ) : null}
        </div>
      ) : (
        <div className="text-gray-500 text-center py-10">
          No trip data available.
        </div>
      )}
    </CustomDrawer>
  );
};

export default TripDrawer;
