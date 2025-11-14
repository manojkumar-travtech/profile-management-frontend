"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const NewsListSkeleton = () => {
  return (
    <div className="space-y-4 animate-in fade-in duration-500">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="border rounded-xl p-4 md:p-6 bg-gradient-to-br from-white to-slate-50/50"
        >
          <div className="flex flex-col md:grid md:grid-cols-[120px_1fr_auto] gap-4 items-start">
            {/* Image skeleton */}
            <div className="w-full md:w-[120px] h-32 relative rounded-lg overflow-hidden">
              <Skeleton className="w-full h-full" />
            </div>

            {/* Text section */}
            <div className="flex flex-col justify-center min-w-0 w-full">
              <Skeleton className="h-5 w-2/3 mb-2" /> {/* title */}
              <Skeleton className="h-4 w-1/4 mb-2" /> {/* category */}
              <Skeleton className="h-4 w-full mb-1" /> {/* summary line 1 */}
              <Skeleton className="h-4 w-5/6 mb-3" /> {/* summary line 2 */}

              {/* badges */}
              <div className="flex items-center gap-2">
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end md:items-start pt-2 md:pt-0">
              <div className="flex gap-2">
                <Skeleton className="h-8 w-8 rounded-md" />
                <Skeleton className="h-8 w-8 rounded-md" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
