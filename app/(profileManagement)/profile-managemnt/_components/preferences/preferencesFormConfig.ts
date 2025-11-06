import { FormConfig } from "@/components/custom/Form";

export interface PreferencesFormFields {
  // Flight
  preferredAirline: string;
  seatPreference: string;
  mealPreference: string;
  specialAssistance: string;
  frequentFlyerNumber: string;

  // Hotel
  preferredHotelChain: string;
  roomType: string;
  bedType: string;
  smokingPreference: string;
  loyaltyProgramId: string;

  // Car
  carType: string;
  transmission: string;
  fuelType: string;
  gpsRequired: boolean;
  preferredRentalCompany: string;
}

export const preferencesFormConfig: FormConfig<PreferencesFormFields> = {
  gridCols: 2,
  fullWidthButtons: true,
  sections: [
    {
      title: "Flight Preferences",
      collapsible: false,
      fields: [
        {
          name: "preferredAirline",
          label: "Preferred Airline",
          type: "text",
          placeholder: "e.g. Emirates, Delta",
        },
        {
          name: "seatPreference",
          label: "Seat Preference",
          type: "select",
          options: [
            { label: "Window", value: "window" },
            { label: "Aisle", value: "aisle" },
            { label: "Middle", value: "middle" },
          ],
        },
        {
          name: "mealPreference",
          label: "Meal Preference",
          type: "select",
          options: [
            { label: "Vegetarian", value: "vegetarian" },
            { label: "Non-Vegetarian", value: "non_vegetarian" },
            { label: "Vegan", value: "vegan" },
            { label: "Halal", value: "halal" },
            { label: "Kosher", value: "kosher" },
            { label: "No Preference", value: "none" },
          ],
        },
        {
          name: "specialAssistance",
          label: "Special Assistance",
          type: "text",
          placeholder: "Wheelchair, visual aid, etc.",
        },
        {
          name: "frequentFlyerNumber",
          label: "Frequent Flyer Number",
          type: "text",
        },
      ],
    },
    {
      title: "Hotel Preferences",
      collapsible: false,
      fields: [
        {
          name: "preferredHotelChain",
          label: "Preferred Hotel Chain",
          type: "text",
          placeholder: "e.g. Marriott, Hilton",
        },
        {
          name: "roomType",
          label: "Room Type",
          type: "select",
          options: [
            { label: "Single", value: "single" },
            { label: "Double", value: "double" },
            { label: "Suite", value: "suite" },
          ],
        },
        {
          name: "bedType",
          label: "Bed Type",
          type: "select",
          options: [
            { label: "King", value: "king" },
            { label: "Queen", value: "queen" },
            { label: "Twin", value: "twin" },
          ],
        },
        {
          name: "smokingPreference",
          label: "Smoking Preference",
          type: "select",
          options: [
            { label: "Smoking", value: "smoking" },
            { label: "Non-Smoking", value: "non_smoking" },
          ],
        },
        {
          name: "loyaltyProgramId",
          label: "Hotel Loyalty Program ID",
          type: "text",
        },
      ],
    },
    {
      title: "Car Preferences",
      collapsible: false,
      fields: [
        {
          name: "carType",
          label: "Car Type",
          type: "select",
          options: [
            { label: "Economy", value: "economy" },
            { label: "Compact", value: "compact" },
            { label: "SUV", value: "suv" },
            { label: "Luxury", value: "luxury" },
          ],
        },
        {
          name: "transmission",
          label: "Transmission",
          type: "select",
          options: [
            { label: "Automatic", value: "automatic" },
            { label: "Manual", value: "manual" },
          ],
        },
        {
          name: "fuelType",
          label: "Fuel Type",
          type: "select",
          options: [
            { label: "Petrol", value: "petrol" },
            { label: "Diesel", value: "diesel" },
            { label: "Electric", value: "electric" },
            { label: "Hybrid", value: "hybrid" },
          ],
        },
        {
          name: "gpsRequired",
          label: "Need GPS?",
          type: "switch",
        },
        {
          name: "preferredRentalCompany",
          label: "Preferred Rental Company",
          type: "text",
          placeholder: "e.g. Hertz, Avis",
        },
      ],
    },
  ],
};
