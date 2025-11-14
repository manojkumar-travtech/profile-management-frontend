import { Suspense } from "react";
import MyTripsSection from "./_components/MyTripsSection";
import { Skeleton } from "@/components/ui/skeleton";

export function MyTripsSkeleton() {
  return (
    <div className="space-y-6 p-6 bg-white">
      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="border border-gray-200 rounded-2xl p-4 shadow-sm flex items-center justify-between bg-gray-50"
          >
            <div>
              <Skeleton className="h-4 w-24 mb-2 bg-gray-200/80" />
              <Skeleton className="h-6 w-10 bg-gray-300/90" />
            </div>
            <Skeleton className="h-10 w-10 rounded-xl bg-gray-200/90" />
          </div>
        ))}
      </div>

      {/* Filters Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <Skeleton className="h-10 w-full sm:w-1/2 rounded-xl bg-gray-200/90" />
        <div className="flex gap-2">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-10 w-24 rounded-xl bg-gray-200/90" />
          ))}
        </div>
      </div>

      {/* Trips Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="border border-gray-200 rounded-2xl p-5 shadow-sm space-y-4 bg-gray-50"
          >
            <div className="flex justify-between items-start">
              <div>
                <Skeleton className="h-5 w-48 mb-2 bg-gray-300/90" />
                <Skeleton className="h-4 w-24 bg-gray-200/90" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-5 w-16 rounded-full bg-gray-200/80" />
                <Skeleton className="h-5 w-16 rounded-full bg-gray-200/80" />
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Skeleton className="h-4 w-4 rounded-full bg-gray-300/80" />
              <Skeleton className="h-4 w-56 bg-gray-200/80" />
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Skeleton className="h-4 w-4 rounded-full bg-gray-300/80" />
              <Skeleton className="h-4 w-56 bg-gray-200/80" />
            </div>

            <div className="flex gap-4 mt-2">
              {[...Array(3)].map((_, j) => (
                <div key={j} className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4 rounded-full bg-gray-300/80" />
                  <Skeleton className="h-4 w-12 bg-gray-200/80" />
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
              <Skeleton className="h-5 w-24 bg-gray-200/90" />
              <Skeleton className="h-4 w-20 bg-gray-300/80" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function MyTripsPage() {
    
  return (
    <Suspense fallback={<MyTripsSkeleton />}>
      <MyTripsSection />
    </Suspense>
  );
}
