import { getUserOverViewTrips, getUserTripsStats } from "../_actions/tripsApi";
import MyTrips from "./MyTrips";
import { ApiResponse } from "@/app/api/axios/ApiResponse";
import { Trip, TripStas } from "./types";

export default async function MyTripsSection() {
  const results = await Promise.allSettled([
    getUserOverViewTrips(),
    getUserTripsStats(),
  ]);

  // Normalize results to always return ApiResponse
  const trips: ApiResponse<Trip[]> =
    results[0].status === "fulfilled"
      ? results[0].value
      : { success: false, data: [], message: "Failed to load trips" };

  const stats: ApiResponse<TripStas> =
    results[1].status === "fulfilled"
      ? results[1].value
      : {
          success: false,
          data: {
            total: 0,
            booked: 0,
            completed: 0,
            pending_approval: 0,
            total_spent: 0,
            avg_cost: 0,
          },
          message: "Failed to load stats",
        };

  // Optionally log failures
  if (results[0].status === "rejected")
    console.error("❌ Failed to load trips:", results[0].reason);
  if (results[1].status === "rejected")
    console.error("❌ Failed to load stats:", results[1].reason);

  return <MyTrips tripsResponse={trips} statsResponse={stats} />;
}
