"use server";

import APIKit, { safeAPICaller } from "@/app/api/axios/apikit";
import { EventPreviewCardProps } from "@/app/(root)/events/_components/CreateEventSteps/StepsJson";

type EventResponse = { success: true } | { error: string };

export async function createEventApi(
  data: EventPreviewCardProps
): Promise<EventResponse> {
  const { formData } = data;
  try {
    const response: any = await safeAPICaller(
      APIKit.post("/createEvent", formData)
    );
    if (!response?.success) {
      return { error: response?.message ?? "Failed to create a event" };
    }
    return { success: true };
  } catch (err: any) {
    return { error: err.message ?? "Unexpected error" };
  }
}
