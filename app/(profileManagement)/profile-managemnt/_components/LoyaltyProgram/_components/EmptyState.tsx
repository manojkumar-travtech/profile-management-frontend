import React from "react";
import { CreditCard } from "lucide-react";

export const EmptyState: React.FC<{ message: string }> = ({ message }) => (
  <div className="text-center py-16 bg-gradient-to-br from-gray-50 to-white rounded-xl border-2 border-dashed border-gray-200">
    <CreditCard className="w-16 h-16 text-gray-300 mx-auto mb-4" />
    <p className="text-gray-600 font-medium">{message}</p>
  </div>
);
