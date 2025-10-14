export type { EventDetailsFormFields } from "./eventDetails";
export type { EventHandlersFormFields } from "./eventHandlers";
export type { TravelRestrictionsFormFields } from "./travelRestrictions";
export type { PersonalizingFormFields } from "./personalizing";

import type { EventDetailsFormFields } from "./eventDetails";
import type { EventHandlersFormFields } from "./eventHandlers";
import type { PersonalizingFormFields } from "./personalizing";
import type { TravelRestrictionsFormFields } from "./travelRestrictions";

export type CombinedEventFormData =
  | EventDetailsFormFields
  | EventHandlersFormFields
  | TravelRestrictionsFormFields
  | PersonalizingFormFields;

export interface EventPreviewCardProps {
  formData: Partial<
    EventDetailsFormFields &
      EventHandlersFormFields &
      TravelRestrictionsFormFields &
      PersonalizingFormFields
  >;
}
