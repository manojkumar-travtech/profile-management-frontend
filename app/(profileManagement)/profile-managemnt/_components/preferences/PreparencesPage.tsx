"use client";

import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { useEffect, useState } from "react";
import { DrawerFormDialog } from "@/app/(profileManagement)/_components/DrawerFormDialog";
import { preferencesFormConfig } from "./preferencesFormConfig";
import { updateProfile, getPreferences } from "../../_actions/profileManagementApi";

const PreparencesPage = () => {
  const [open, setOpen] = useState(false);
  const [currentPreferences, setCurrentPreferences] = useState<any>(null);

  const loadPreferences = async () => {
    const response = await getPreferences();
    const pref = response?.data?.preferences || {};

    const normalized = {
      flight: {
        preferredAirline: pref.preferredAirline || pref.airline?.preferredAirline || "",
        seatPreference: pref.seatPreference || pref.airline?.seat_preference || "",
        mealPreference: pref.mealPreference || pref.airline?.meal_preference || "",
        specialAssistance:
          pref.specialAssistance ||
          (Array.isArray(pref.airline?.special_assistance)
            ? pref.airline.special_assistance.join(", ")
            : ""),
      },
      hotel: {
        preferredHotelChain: pref.preferredHotelChain || "",
        roomType: pref.roomType || pref.hotel?.room_type || "",
        bedType: pref.bedType || "",
        smokingPreference: pref.smokingPreference || "",
      },
      car: {
        carType: pref.carType || pref.car?.vehicle_type || "",
        transmission: pref.transmission || pref.car?.transmission || "",
        fuelType: pref.fuelType || "Petrol",
        gpsRequired: pref.gpsRequired ?? false,
      },
    };

    setCurrentPreferences(normalized);
  };

  useEffect(() => {
    loadPreferences();
  }, []);

  const handleSave = async (values: any) => {
    const request = {
      preferences: {
        flight: {
          preferredAirline: values.preferredAirline,
          seatPreference: values.seatPreference,
          mealPreference: values.mealPreference,
          specialAssistance: values.specialAssistance,
        },
        hotel: {
          preferredHotelChain: values.preferredHotelChain,
          roomType: values.roomType,
          bedType: values.bedType,
          smokingPreference: values.smokingPreference,
        },
        car: {
          carType: values.carType,
          transmission: values.transmission,
          fuelType: values.fuelType,
          gpsRequired: values.gpsRequired,
        },
      },
    };

    await updateProfile(request);
    setCurrentPreferences(request.preferences);
    setOpen(false);
  };

  if (!currentPreferences) {
    return (
      <div className="text-sm text-muted-foreground p-4 animate-pulse">
        Loading preferences...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Sticky Header */}
      <div className="flex justify-between items-center sticky top-0 py-3 border-b backdrop-blur-md bg-white/70">
        <h2 className="text-xl font-semibold text-gray-900 tracking-tight">
          Travel Preferences
        </h2>
        <Button
          size="sm"
          onClick={() => setOpen(true)}
          className="gap-2 text-sm font-medium hover:scale-105 transition-all duration-150"
        >
          <Edit className="w-4 h-4" /> Edit Preferences
        </Button>
      </div>

      {/* Preference Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Flight */}
        <PreferenceCard
          title="Flight Preferences"
          icon="✈️"
          color="text-blue-500"
          fields={[
            ["Preferred Airline", currentPreferences.flight.preferredAirline],
            ["Seat Preference", currentPreferences.flight.seatPreference],
            ["Meal Preference", currentPreferences.flight.mealPreference],
            ["Special Assistance", currentPreferences.flight.specialAssistance],
          ]}
        />

        {/* Hotel */}
        <PreferenceCard
          title="Hotel Preferences"
          icon="🏨"
          color="text-yellow-500"
          fields={[
            ["Preferred Hotel Chain", currentPreferences.hotel.preferredHotelChain],
            ["Room Type", currentPreferences.hotel.roomType],
            ["Bed Type", currentPreferences.hotel.bedType],
            ["Smoking Preference", currentPreferences.hotel.smokingPreference],
          ]}
        />

        {/* Car */}
        <PreferenceCard
          title="Car Preferences"
          icon="🚗"
          color="text-green-600"
          fields={[
            ["Car Type", currentPreferences.car.carType],
            ["Transmission", currentPreferences.car.transmission],
            ["Fuel Type", currentPreferences.car.fuelType],
            ["GPS Required", currentPreferences.car.gpsRequired ? "Yes" : "No"],
          ]}
        />
      </div>

      {/* Drawer Form */}
      {open && (
        <DrawerFormDialog
          open={open}
          onOpenChange={setOpen}
          title="Edit Preferences"
          subtitle="You can update your travel preferences here."
          formConfig={preferencesFormConfig}
          defaultValues={{
            ...currentPreferences.flight,
            ...currentPreferences.hotel,
            ...currentPreferences.car,
          }}
          onSubmit={handleSave}
          width="550px"
          submitText="Save Changes"
        />
      )}
    </div>
  );
};

// 💡 Extracted Card Component for cleaner look
const PreferenceCard = ({
  title,
  icon,
  color,
  fields,
}: {
  title: string;
  icon: string;
  color: string;
  fields: [string, string | boolean | undefined][];
}) => {
  return (
    <div className="rounded-2xl bg-white border shadow-sm hover:shadow-md transition-all duration-200 p-5">
      <div className="flex items-center mb-4">
        <span className={`${color} text-2xl mr-2`}>{icon}</span>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
      <div className="space-y-2 text-sm text-gray-700">
        {fields.map(([label, value]) => (
          <div
            key={label}
            className="flex justify-between items-center border-b border-gray-100 pb-1"
          >
            <span className="text-gray-500">{label}</span>
            <span className="font-medium text-gray-900 truncate max-w-[50%] text-right">
              {value || "—"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreparencesPage;
