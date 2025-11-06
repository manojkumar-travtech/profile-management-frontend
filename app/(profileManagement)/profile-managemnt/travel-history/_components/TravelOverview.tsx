"use client";

import { Calendar, Globe, MapPin, Plane, TrendingUp } from "lucide-react";

interface Stats {
  totalTrips: number;
  totalMiles: number;
  averageTripLength: number;
  carbonFootprint: number;
  favoriteDestinations: string[];
  seasonalPatterns: Record<string, number>;
}

export const TravelOverview: React.FC<{ stats: Stats }> = ({ stats }) => {
  const monthNames = Object.keys(stats.seasonalPatterns);
  const maxTrips = Math.max(...Object.values(stats.seasonalPatterns));

  const statCards = [
    { icon: Plane, gradient: "from-blue-500 to-indigo-600", label: "Total Trips", value: stats.totalTrips, bg: "from-blue-500/10 to-indigo-500/10" },
    { icon: Globe, gradient: "from-purple-500 to-pink-600", label: "Miles Traveled", value: stats.totalMiles.toLocaleString(), bg: "from-purple-500/10 to-pink-500/10" },
    { icon: Calendar, gradient: "from-emerald-500 to-teal-600", label: "Avg Trip Length", value: `${stats.averageTripLength} days`, bg: "from-emerald-500/10 to-teal-500/10" },
    { icon: TrendingUp, gradient: "from-orange-500 to-red-600", label: "CO₂ Tons/Year", value: stats.carbonFootprint, bg: "from-orange-500/10 to-red-500/10" },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map(({ icon: Icon, gradient, label, value, bg }, index) => (
          <div
            key={label}
            className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${bg} backdrop-blur-sm border border-white/20 p-6 transition-all duration-500 hover:scale-105 hover:shadow-2xl`}
            style={{
              animation: `fadeIn 0.6s ease-out ${index * 0.1}s both`
            }}
          >
            {/* Background gradient blob */}
            <div className={`absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br ${gradient} rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-500`} />
            
            <div className="relative">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              
              <div className="space-y-1">
                <p className="text-3xl font-bold text-slate-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-slate-900 group-hover:to-slate-600 transition-all">
                  {value}
                </p>
                <p className="text-sm font-medium text-slate-600">{label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Favorite Destinations */}
      <div
        className="relative overflow-hidden rounded-2xl bg-white/90 backdrop-blur-sm border border-slate-200/50 p-6 shadow-sm hover:shadow-xl transition-all duration-500"
        style={{
          animation: "fadeIn 0.6s ease-out 0.4s both"
        }}
      >
        {/* Decorative element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-100/30 to-purple-100/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Favorite Destinations</h3>
          </div>
          
          <div className="flex flex-wrap gap-2.5">
            {stats.favoriteDestinations.map((destination, i) => (
              <div
                key={i}
                className="group/badge relative overflow-hidden px-4 py-2 rounded-xl bg-gradient-to-r from-slate-100 to-slate-50 border border-slate-200/60 hover:border-indigo-300 hover:shadow-md transition-all duration-300 cursor-pointer"
                style={{
                  animation: `slideUp 0.5s ease-out ${i * 0.05}s both`
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/5 to-purple-500/0 opacity-0 group-hover/badge:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-indigo-600 group-hover/badge:scale-110 transition-transform" />
                  <span className="text-sm font-semibold text-slate-700 group-hover/badge:text-indigo-700 transition-colors">
                    {destination}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Seasonal Travel Patterns */}
      <div
        className="relative overflow-hidden rounded-2xl bg-white/90 backdrop-blur-sm border border-slate-200/50 p-6 shadow-sm hover:shadow-xl transition-all duration-500"
        style={{
          animation: "fadeIn 0.6s ease-out 0.5s both"
        }}
      >
        {/* Decorative element */}
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-blue-100/30 to-emerald-100/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-emerald-600 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Seasonal Travel Patterns</h3>
          </div>
          
          <div className="space-y-4">
            {monthNames.map((month, index) => {
              const percentage = (stats.seasonalPatterns[month] / maxTrips) * 100;
              const tripCount = stats.seasonalPatterns[month];
              
              return (
                <div
                  key={month}
                  className="group/bar"
                  style={{
                    animation: `slideRight 0.6s ease-out ${index * 0.05}s both`
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-slate-700">{month}</span>
                    <span className="text-sm font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-lg">
                      {tripCount} {tripCount === 1 ? 'trip' : 'trips'}
                    </span>
                  </div>
                  
                  <div className="relative h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full transition-all duration-1000 ease-out group-hover/bar:shadow-lg"
                      style={{
                        width: `${percentage}%`,
                        animation: `expandWidth 1s ease-out ${index * 0.05}s both`
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 animate-shimmer" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

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
        
        @keyframes slideRight {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes expandWidth {
          from {
            width: 0%;
          }
        }
        
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
};

// Example usage with demo data
const ExampleOverview = () => {
  const demoStats: Stats = {
    totalTrips: 24,
    totalMiles: 145230,
    averageTripLength: 6,
    carbonFootprint: 12.5,
    favoriteDestinations: ["Tokyo", "Paris", "New York", "Barcelona", "London", "Dubai"],
    seasonalPatterns: {
      "Jan": 2,
      "Feb": 1,
      "Mar": 3,
      "Apr": 4,
      "May": 2,
      "Jun": 3,
      "Jul": 1,
      "Aug": 2,
      "Sep": 3,
      "Oct": 1,
      "Nov": 1,
      "Dec": 1
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-8 min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-blue-50">
      <div className="mb-10">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-900 bg-clip-text text-transparent mb-3">
          Travel Overview
        </h1>
        <p className="text-slate-600 text-lg">Your complete travel statistics and insights</p>
      </div>
      <TravelOverview stats={demoStats} />
    </div>
  );
};

export default ExampleOverview;