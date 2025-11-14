"use client";

import { NewsListSkeleton } from "./NewsListSkeleton";

export default function Loading() {
  return (
    <div className="p-6">
      <NewsListSkeleton />
    </div>
  );
}
