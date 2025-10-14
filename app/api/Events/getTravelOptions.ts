"use server";

import APIKit, { safeAPICaller } from "@/app/api/axios/apikit";

export type TravelOptionsResponse = {
  carOptions: { label: string; value: string }[];
  hotelOptions: { label: string; value: string }[];
  airOptions: { label: string; value: string }[];
};

export async function getTravelOptions(): Promise<TravelOptionsResponse> {
  try {
    const [airRes,carRes, hotelRes] = await Promise.all([
      safeAPICaller(APIKit.get("/metadata/airlines")),
      safeAPICaller(APIKit.get("/metadata/carVendors")),
      safeAPICaller(APIKit.get("/metadata/hotels")),
    ]);
    console.log('airRes' , airRes ,carRes ,hotelRes  )
    // Normalize results (handle APIKit.safeAPICaller structure)
    const carOptions =
      carRes?.data?.map((item: any) => ({
        label: item.name,
        value: item.id,
      })) ?? [];

    const hotelOptions =
      hotelRes?.data?.map((item: any) => ({
        label: item.name,
        value: item.id,
      })) ?? [];

    const airOptions =
      airRes?.data?.map((item: any) => ({
        label: item.name,
        value: item.id,
      })) ?? [];

    return {
      carOptions,
      hotelOptions,
      airOptions,
    };
  } catch (err: any) {
    console.error("❌ Failed to load travel options:", err);
    return { carOptions: [], hotelOptions: [], airOptions: [] };
  }
}
