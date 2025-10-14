import { FormConfig } from "@/components/custom/Form";

export interface TravelRestrictionsFormFields {
  prefferedCar: string;
  prefferedHotel: string;
  prefferedAir: boolean;
}

export const travelRestrictionsConfig: FormConfig<TravelRestrictionsFormFields> =
  {
    gridCols: 4,
    sections: [
      {
        fields: [
          {
            name: "prefferedCar",
            label: "Preffered Car",
            type: "select",
            placeholder: "Select Car Vendor",
            options: [],
            validation: { required: "Preffered Car is required" },
            colSpan: 4,
          },
          {
            name: "prefferedHotel",
            label: "Preffered Hotel",
            type: "select",
            options: [],
            placeholder: "Select Client Company",
            colSpan: 4,
          },
          {
            name: "prefferedAir",
            label: "Preffered Air Line",
            type: "select",
            colSpan: 4,
            placeholder: "Select Client Company",
            options: [],
          },
        ],
      },
    ],
  };
