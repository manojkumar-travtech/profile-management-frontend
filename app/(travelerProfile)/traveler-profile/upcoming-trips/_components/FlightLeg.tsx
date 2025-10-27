import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Typography } from "@/components/custom/Typography";

export default function FlightCard() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-5xl bg-white border border-gray-300 rounded-md shadow-sm transition-all">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4">
          {/* Left: Logo + Return */}
          <div className="flex items-center gap-2 min-w-[100px]">
            <div className="w-6 h-6">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path
                  d="M50 10 L80 50 L50 50 L20 90 L35 50 L50 50 Z"
                  fill="#C41230"
                />
              </svg>
            </div>
            <Typography className="text-blue-600 font-semibold text-sm">
              Return
            </Typography>
          </div>

          {/* Center: Flight info */}
          <div className="flex-1 px-6">
            <div className="grid grid-cols-3 text-sm text-gray-800">
              <Typography className="text-gray-700">
                Delta Airline - DL1941
              </Typography>
              <Typography className="text-center text-gray-700">
                PNR - D5PMOH
              </Typography>
              <Typography className="text-right text-gray-700">
                Nonstop, 4h 25m
              </Typography>

              <div className="flex items-center gap-2 font-semibold">
                <Typography className="text-gray-900">IAH</Typography>
                <Typography className="text-gray-600">→</Typography>
                <Typography className="text-gray-900">NYC</Typography>
              </div>
              <Typography className="text-center text-blue-600 font-semibold">
                Mon, Sept. 28, 2025 &nbsp; 6:00am–10:25am
              </Typography>
              <Typography className="text-right text-gray-700 font-medium">
                First
              </Typography>
            </div>
          </div>

          {/* Right: Chevron */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-blue-600 hover:text-blue-700 transition-transform duration-300"
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
              <li>Aircraft: Boeing 737-900</li>
              <li>Terminal: B, Gate 22</li>
              <li>Seat: 2A (Window)</li>
              <li>Meal: Breakfast Included</li>
              <li>Baggage: 2 Checked Bags</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
