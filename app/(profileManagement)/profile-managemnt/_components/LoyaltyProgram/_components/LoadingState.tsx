import React from "react";
import { Loader2 } from "lucide-react";

export const LoadingState: React.FC = () => (
  <div className="flex flex-col items-center justify-center py-20">
    <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-4" />
    <p className="text-gray-600">Loading your loyalty programs...</p>
  </div>
);
