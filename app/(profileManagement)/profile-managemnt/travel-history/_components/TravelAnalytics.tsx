"use client";

import { BarChart3, Leaf, Zap, TrendingUp } from "lucide-react";
import React from "react";
import { TravelStats } from "./types";

export const TravelAnalytics: React.FC<{ stats: TravelStats }> = ({ stats }) => {
  const analytics = [
    {
      icon: BarChart3,
      gradient: "from-blue-500 to-indigo-600",
      title: "Booking Patterns",
      metrics: [
        { label: "Average Booking Window", value: `${stats.preferredBookingWindow} days` },
        { label: "Most Active Month", value: "May (4 trips)" },
        { label: "Business vs Leisure", value: "60% / 40%" },
      ],
    },
    {
      icon: Leaf,
      gradient: "from-emerald-500 to-teal-600",
      title: "Environmental Impact",
      metrics: [
        { label: "Annual CO₂ Footprint", value: `${stats.carbonFootprint} tons` },
        { label: "Offset Opportunities", value: "Available", color: "text-green-600" },
        { label: "Eco-Friendly Options", value: "25% of trips" },
      ],
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {analytics.map(({ icon: Icon, gradient, title, metrics }, index) => (
        <div
          key={title}
          className={`relative overflow-hidden rounded-2xl bg-white/90 backdrop-blur-sm border border-slate-200/50 p-6 shadow-sm hover:shadow-xl transition-all duration-500`}
          style={{
            animation: `fadeIn 0.6s ease-out ${index * 0.1}s both`,
          }}
        >
          {/* Decorative gradient blob */}
          <div
            className={`absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br ${gradient} rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity`}
          />

          <div className="relative">
            <div className="flex items-center gap-3 mb-5">
              <div
                className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center`}
              >
                <Icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">{title}</h3>
            </div>

            <div className="space-y-4">
              {metrics.map((metric, i) => (
                <div
                  key={metric.label}
                  className="flex justify-between items-center"
                  style={{
                    animation: `slideUp 0.4s ease-out ${i * 0.1}s both`,
                  }}
                >
                  <span className="text-sm font-medium text-slate-600">{metric.label}</span>
                  <span
                    className={`text-sm font-semibold text-slate-900 ${
                      metric.color || ""
                    }`}
                  >
                    {metric.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};
