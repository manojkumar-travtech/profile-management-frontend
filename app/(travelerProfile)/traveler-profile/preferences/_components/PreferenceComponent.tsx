import React from "react";
import PreferencesCard, { PreferencesCardProps } from "./PreferencesCard";

const PreferenceComponent = () => {
  const items: PreferencesCardProps[] = [
    {
      title: "Air",
      fields: [
        { label: "Preferred Airline", value: "Emirates" },
        { label: "Seat Preference", value: "Aisle" },
        { label: "Meal Preference", value: "Vegetarian" },
        { label: "Frequent Flyer Status", value: "Gold" },
      ],
      loyaltyHeading: "Airline Loyalty Programs",
      loyaltyNumbers: [
        { company: "Emirates Skywards", number: "EK-45231" },
        { company: "Qatar Privilege Club", number: "QR-10294" },
      ],
      columns: 4,
      onEdit: () => {
        console.log("Editing Air preferences:");
        // you can open modal or navigate here
      },
    },
    {
      title: "Hotel",
      fields: [
        { label: "Preferred Hotel Chain", value: "Marriott" },
        { label: "Room Type", value: "Suite" },
        { label: "Bed Preference", value: "King Size" },
        { label: "Smoking Preference", value: "Non-Smoking" },
      ],
      loyaltyHeading: "Hotel Loyalty Programs",
      loyaltyNumbers: [
        { company: "Marriott Bonvoy", number: "MB-293847" },
        { company: "Hilton Honors", number: "HH-928374" },
      ],
      columns: 4,
      onEdit: () => {
        console.log("Editing Hotel preferences:");
      },
    },
    {
      title: "Car",
      fields: [
        { label: "Preferred Car Type", value: "SUV" },
        { label: "Transmission", value: "Automatic" },
        { label: "Fuel Type", value: "Petrol" },
        { label: "Insurance Preference", value: "Full Coverage" },
      ],
      loyaltyHeading: "Car Rental Loyalty Programs",
      loyaltyNumbers: [
        { company: "Hertz Gold Plus", number: "HZ-839201" },
        { company: "Avis Preferred", number: "AV-238492" },
      ],
      columns: 4,
      onEdit: () => {
        console.log("Editing Car preferences:");
      },
    },
    {
      title: "Cruise",
      fields: [
        { label: "Preferred Cruise Line", value: "Royal Caribbean" },
        { label: "Cabin Type", value: "Ocean View" },
        { label: "Dining Preference", value: "Early Seating" },
        { label: "Excursion Interest", value: "Adventure Tours" },
      ],
      loyaltyHeading: "Cruise Loyalty Programs",
      loyaltyNumbers: [
        { company: "Royal Caribbean Crown & Anchor", number: "RC-102948" },
        { company: "MSC Voyagers Club", number: "MSC-384920" },
      ],
      columns: 4,
      onEdit: () => {
        console.log("Editing Cruise preferences:");
      },
    },
  ];

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <PreferencesCard key={index} {...item} />
      ))}
    </div>
  );
};

export default PreferenceComponent;
