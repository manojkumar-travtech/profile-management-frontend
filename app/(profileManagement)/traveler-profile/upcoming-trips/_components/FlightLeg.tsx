import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Typography } from "@/components/custom/Typography";
import { SectionCard } from "@/app/(travelerProfile)/_components/SectionCard";

export default function FlightCard() {
  const [isOpen, setIsOpen] = useState(false);

  // Dynamic flight data
  const flightData = {
    logo: "https://upload.wikimedia.org/wikipedia/commons/d/d1/Delta_logo.svg",
    tripType: "Outbound",
    airline: "Delta Airline",
    flightNumber: "DL1753",
    pnr: "C3PLWZ",
    duration: "3h 43m",
    stops: "Nonstop",
    origin: "NYC",
    destination: "IAH",
    date: "Mon, Sept. 22, 2025",
    departureTime: "6:30am",
    arrivalTime: "9:13am",
    class: "First",
    details: {
      aircraft: "Boeing 737-900",
      terminal: "B",
      gate: "22",
      seat: "2A (Window)",
      meal: "Breakfast Included",
      baggage: "2 Checked Bags",
    },
  };

  return (
    <SectionCard className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        {/* Left: Logo + Trip Type */}
        <div className="flex flex-col items-center gap-1 min-w-[100px]">
          <div className="w-30 h-8">
            <img
              src={flightData.logo}
              alt={flightData.airline}
              className="w-full h-full object-contain"
            />
          </div>
          <Typography className="text-primary-600" weight="bold" size="md">
            {flightData.tripType}
          </Typography>
        </div>

        {/* Center: Flight info */}
        <div className="flex-1 px-4">
          {/* First Row */}
          <div className="flex items-center justify-between mb-2">
            <Typography weight="semibold" className="text-fontcol-bodytext">
              {flightData.airline} - {flightData.flightNumber}
            </Typography>
            <Typography weight="semibold" className="text-fontcol-bodytext">
              PNR- {flightData.pnr}
            </Typography>
            <Typography weight="semibold" className="text-fontcol-bodytext">
              {flightData.stops},{flightData.duration}
            </Typography>
          </div>

          {/* Second Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Typography weight="bold">{flightData.origin}</Typography>
              <Typography className="text-gray-600">▸</Typography>
              <Typography weight="bold">{flightData.destination}</Typography>
            </div>
            <Typography
              weight="semibold"
              className="text-sm text-blue-600 font-semibold"
            >
              {flightData.date} &nbsp; {flightData.departureTime}–
              {flightData.arrivalTime}
            </Typography>
            <Typography weight="semibold" className="text-fontcol-bodytext">
              {flightData.class}
            </Typography>
          </div>
        </div>

        {/* Right: Chevron */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-blue-600 hover:text-blue-700 transition-transform duration-300 cursor-pointer"
          aria-label={isOpen ? "Collapse details" : "Expand details"}
        >
          <ChevronDown
            className={`w-5 h-5 transform transition-transform duration-300 ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>
      </div>

      {/* Collapsible Section */}
      <div
        className={`overflow-hidden transition-all duration-500 ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <Typography className="font-semibold text-gray-900 mb-2">
            Flight Details
          </Typography>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>
              <Typography>Aircraft: {flightData.details.aircraft}</Typography>
            </li>
            <li>
              <Typography>
                Terminal: {flightData.details.terminal}, Gate{" "}
                {flightData.details.gate}
              </Typography>
            </li>
            <li>
              <Typography>Seat: {flightData.details.seat}</Typography>
            </li>
            <li>
              <Typography>Meal: {flightData.details.meal}</Typography>
            </li>
            <li>
              <Typography>Baggage: {flightData.details.baggage}</Typography>
            </li>
          </ul>
        </div>
      </div>
    </SectionCard>
  );
}
