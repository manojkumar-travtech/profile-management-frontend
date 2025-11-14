"use server";
import APIKit, { safeAPICaller } from "@/app/api/axios/apikit";
import { ApiResponse } from "@/app/api/axios/ApiResponse";
import { Trip, TripStas, TripWithDetails } from "../_components/types";

const baseUrl = "/trips/user";
const userId = "b0000000-0000-0000-0000-000000000001";

export async function getUserOverViewTrips(): Promise<ApiResponse<Trip[]>> {
  return (await safeAPICaller(
    APIKit.get(`${baseUrl}/${userId}`)
  )) as ApiResponse<Trip[]>;
}

export async function getUserTripsStats(): Promise<ApiResponse<TripStas>> {
  return (await safeAPICaller(
    APIKit.get(`${baseUrl}/stat/${userId}`)
  )) as ApiResponse<TripStas>;
}

export async function getUserTripFullDetails(
  tripId: string,
  orgId: string
): Promise<ApiResponse<TripWithDetails>> {
  return (await safeAPICaller(
    APIKit.get(`${baseUrl}/tripdetails/${tripId}/${orgId}`)
  )) as ApiResponse<TripWithDetails>;
}
