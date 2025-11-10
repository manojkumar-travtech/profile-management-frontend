"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { DrawerFormDialog } from "@/app/(profileManagement)/_components/DrawerFormDialog";
import { preferencesFormConfig } from "./preferencesFormConfig";
import { updateProfile } from "../../_actions/profileManagementApi";

interface PreferencesData {
  airline?: any;
  hotel?: any;
  car?: any;
  [key: string]: any;
}

interface AddPreferencesProps {
  defaultValues: PreferencesData;
  onUpdated?: (updated: PreferencesData) => void;
}

export const AddPreferences = ({ defaultValues, onUpdated }: AddPreferencesProps) => {
  const [open, setOpen] = useState(false);

  const handleSave = async (values: any) => {
    const request = {
      preferences: {
        airline: {
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
    setOpen(false);
    onUpdated?.(request.preferences);
  };

  // Safely map backend data → form default values
  const formDefaults = {
    preferredAirline: defaultValues?.preferredAirline || defaultValues?.airline?.preferredAirline || "",
    seatPreference: defaultValues?.seatPreference || defaultValues?.airline?.seat_preference || "",
    mealPreference: defaultValues?.mealPreference || defaultValues?.airline?.meal_preference || "",
    specialAssistance:
      defaultValues?.specialAssistance ||
      defaultValues?.airline?.special_assistance?.join(", ") ||
      "",
    preferredHotelChain: defaultValues?.preferredHotelChain || "",
    roomType: defaultValues?.roomType || defaultValues?.hotel?.room_type || "",
    bedType: defaultValues?.bedType || "",
    smokingPreference: defaultValues?.smokingPreference || "",
    carType: defaultValues?.carType || defaultValues?.car?.vehicle_type || "",
    transmission: defaultValues?.transmission || defaultValues?.car?.transmission || "",
    fuelType: defaultValues?.fuelType || "petrol",
    gpsRequired: defaultValues?.gpsRequired ?? false,
  };

  return (
    <>
      <Button size="sm" icon={<Edit />} onClick={() => setOpen(true)}>
        Edit Preferences
      </Button>

      {open && (
        <DrawerFormDialog
          open={open}
          onOpenChange={setOpen}
          title="Edit Preferences"
          subtitle="Update your travel preferences to personalize your experience."
          formConfig={preferencesFormConfig}
          defaultValues={formDefaults}
          onSubmit={handleSave}
          width="550px"
          submitText="Save Changes"
        />
      )}
    </>
  );
};
