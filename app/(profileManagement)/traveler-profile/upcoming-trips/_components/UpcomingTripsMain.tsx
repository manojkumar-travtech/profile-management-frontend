"use client";
import React, { JSX } from "react";
import { Accordion } from "@/components/ui/accordion";
import {
  BookingData,
  SectionHeaderProps,
} from "@/app/(travelerProfile)/_types/upcomingTrips.types";
import ConfirmationHeader from "./ConfirmationHeader";
import FlightLeg from "./FlightLeg";
import HotelBooking from "./HotelBooking";
import CabBooking from "./CabBooking";
import { Typography } from "@/components/custom/Typography";

const SectionHeader = ({ title }: SectionHeaderProps) => {
  return (
    <div className="mb-4">
      <Typography variant="display" size="xs" weight="bold">
        {title}
      </Typography>
    </div>
  );
};

const UpcomingTripsMain = (): JSX.Element => {
  const bookingData: BookingData = {
    email: "nanda1@gmail.com",
    dateRange: "Sep. 24-28, 2025",
    guests: "1 Guest",
    flights: [
      {
        id: "outbound",
        type: "Outbound",
        airline: "Delta Airline",
        flightNumber: "DL1753",
        route: "PNR- C3PLWZ",
        duration: "Nonstop,3h 43m",
        from: "NYC",
        to: "IAH",
        date: "Mon, Sept. 22, 2025",
        time: "6:30am-9:13am",
        class: "First",
      },
      {
        id: "return",
        type: "Return",
        airline: "Delta Airline",
        flightNumber: "DL1941",
        route: "PNR- D5PMOH",
        duration: "Nonstop,4h 25m",
        from: "IAH",
        to: "NYC",
        date: "Mon, Sept. 28, 2025",
        time: "6:00am-10:25am",
        class: "First",
      },
    ],
    hotel: {
      id: "34265983456",
      name: "Montrose Relaxing Studio | Medical Center 371",
      address: "7700 Renwick Dr Suite 7B, Houston, TX 77081, United States",
      checkIn: "Sept. 22, 2025",
      checkOut: "Sept. 28, 2025 • 4 Nights",
      roomType: "Suite - Room",
      bedType: "1 King Size bed",
      image:
        "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=300&fit=crop",
    },
    cab: {
      id: "34265983456",
      service: "Avis Cab Service",
      pickupDate: "Sept. 25, 2025",
      dropDate: "Sept. 25, 2025",
      pickupLocation:
        "Los Angeles International Airport (LAX), 1 World Wy, Los Angeles, CA 90045, USA",
      dropLocation:
        "Montrose Relaxing Studio | Medical Center 371, 7700 Renwick Dr Suite 7B, Houston, TX 77081, USA",
      vehicle: "Honda Sedan",
    },
  };

  return (
    <div className="space-y-4">
      <ConfirmationHeader title="Booking Confirmed" />
      <>
        <SectionHeader title="Flight" />
        <Accordion type="single" collapsible className="space-y-4">
          {bookingData.flights.map((flight) => (
            <FlightLeg key={flight.id} />
          ))}
        </Accordion>
      </>

      <>
        <SectionHeader title="Hotel" />
        <HotelBooking booking={bookingData.hotel} />
      </>

      <>
        <SectionHeader title="Cab" />
        <CabBooking booking={bookingData.cab} />
      </>
    </div>
  );
};

export default UpcomingTripsMain;
