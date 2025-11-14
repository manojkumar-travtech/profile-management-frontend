"use client";
import React, { useState, useMemo } from "react";
import {
  Plane,
  Calendar,
  DollarSign,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import FilterBar from "./FilterBar";
import StatCard from "./StatCard";
import TripCard from "./TripCard";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Trip, TripStas } from "./types";
import { ApiResponse } from "@/app/api/axios/ApiResponse";

interface MyTripsProps {
  tripsResponse: ApiResponse<Trip[]>;
  statsResponse: ApiResponse<TripStas>;
}

const MyTrips: React.FC<MyTripsProps> = ({ tripsResponse, statsResponse }) => {
  console.log('tripsResponse',tripsResponse)
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Safely extract trips and stats
  const trips: Trip[] = tripsResponse.success ? tripsResponse.data ?? [] : [];
  const stats: TripStas | null = statsResponse.success
    ? statsResponse.data ?? null
    : null;

  const filteredTrips = useMemo(
    () =>
      trips.filter((trip) => {
        const matchesStatus =
          filterStatus === "all" || trip.status === filterStatus;
        const matchesSearch =
          trip.trip_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (trip.destination_city?.toLowerCase() ?? "").includes(
            searchQuery.toLowerCase()
          );
        return matchesStatus && matchesSearch;
      }),
    [trips, filterStatus, searchQuery]
  );

  // Prepare StatCard configs
  const statCards = useMemo(
    () => [
      {
        title: "Total Trips",
        value: stats?.total ?? 0,
        icon: <Plane className="w-5 h-5 text-blue-600" />,
        iconBgColor: "bg-blue-50",
      },
      {
        title: "Upcoming",
        value: stats ? stats.pending_approval + stats.booked : 0,
        icon: <Calendar className="w-5 h-5 text-green-600" />,
        iconBgColor: "bg-green-50",
      },
      {
        title: "Completed",
        value: stats?.completed ?? 0,
        icon: <CheckCircle className="w-5 h-5 text-purple-600" />,
        iconBgColor: "bg-purple-50",
      },
      {
        title: "Total Spend",
        value: `${stats?.total_spent.toLocaleString() ?? 0}`,
        icon: <DollarSign className="w-5 h-5 text-orange-600" />,
        iconBgColor: "bg-orange-50",
      },
    ],
    [stats]
  );

  return (
    <PageLayout
      title="My Trips"
      subtitle="Manage and track all your travel arrangements"
      rightSection={<Button>+ New Trip</Button>}
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {statCards.map((card) => (
          <StatCard
            key={card.title}
            title={card.title}
            value={card.value}
            icon={card.icon}
            iconBgColor={card.iconBgColor}
          />
        ))}
      </div>

      {/* Filter Bar */}
      <FilterBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
      />

      {/* Trip Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredTrips.map((trip) => (
          <TripCard
            key={trip.id}
            trip={trip}
          />
        ))}
      </div>

      {/* No trips placeholder */}
      {filteredTrips.length === 0 && (
        <div className="text-center py-12">
          <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No trips found.</p>
        </div>
      )}
    </PageLayout>
  );
};

export default MyTrips;
