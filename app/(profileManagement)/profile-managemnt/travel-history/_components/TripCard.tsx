"use client";

import {
  Calendar,
  Clock,
  MapPin,
  Plane,
  Building2,
  DollarSign,
} from "lucide-react";
import React from "react";

export interface Trip {
  id: string;
  destination: string;
  location?: string;
  dates: string;
  flights: number;
  hotels: number;
  cost: string;
  status: string;
  purpose: string;
}

interface TripCardProps {
  trip: Trip;
  type?: "recent" | "upcoming";
}

export const TripCard: React.FC<TripCardProps> = ({
  trip,
  type = "recent",
}) => {
  const isCompleted = trip.status === "Completed";
  const statusColors = isCompleted
    ? {
        bg: "bg-emerald-100",
        text: "text-emerald-700",
        icon: "from-emerald-500 to-green-400",
        arc: "from-emerald-200 to-green-100",
      }
    : {
        bg: "bg-indigo-100",
        text: "text-indigo-700",
        icon: "from-indigo-500 to-blue-500",
        arc: "from-indigo-200 to-blue-100",
      };

  return (
    <div className="relative rounded-2xl bg-white/90 backdrop-blur-sm border border-slate-200/50 shadow-sm hover:shadow-xl transition-all duration-300 p-6 flex flex-col justify-between overflow-hidden">
      {/* Status badge top-right */}
      <span
        className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${statusColors.bg} ${statusColors.text}`}
      >
        {trip.status}
      </span>

      {/* Bottom-right arc */}
      <div className="absolute bottom-0 right-0 w-28 h-16 -z-10">
        <div
          className="w-full h-full bg-gradient-to-tr from-indigo-200 to-blue-100 opacity-30"
          style={{
            borderTopLeftRadius: "100%",
            borderBottomLeftRadius: "100%",
          }}
        />
      </div>

      {/* Top icon + Location */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${statusColors.icon}`}
        >
          <MapPin className="w-6 h-6 text-white" />
        </div>
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold text-slate-900">
            {trip.destination}
          </h3>
          {trip.location && (
            <p className="text-sm text-slate-500 flex items-center gap-1">
              <MapPin className="w-3 h-3" /> {trip.location}
            </p>
          )}
        </div>
      </div>

      {/* Trip Dates */}
      <div className="flex items-center gap-2 text-slate-600 text-sm mb-5">
        {type === "upcoming" ? (
          <Calendar className="w-4 h-4" />
        ) : (
          <Clock className="w-4 h-4" />
        )}
        <span>{trip.dates}</span>
      </div>

      <p className="text-sm text-slate-500 mb-5">{trip.purpose}</p>

      {/* Stats + Amount */}
      <div className="flex items-center gap-6 relative">
        <div className="flex items-center gap-2">
          <Plane className="w-4 h-4 text-blue-500" />
          <span className="text-sm font-medium">{trip.flights}</span>
          <span className="text-slate-400 text-xs">flights</span>
        </div>

        <div className="flex items-center gap-2">
          <Building2 className="w-4 h-4 text-purple-500" />
          <span className="text-sm font-medium">{trip.hotels}</span>
          <span className="text-slate-400 text-xs">hotels</span>
        </div>

        {/* Amount text bottom-right */}
        <div className="ml-auto text-right text-sm font-semibold text-slate-900 relative z-10">
          {trip.cost}
        </div>
      </div>
    </div>
  );
};
