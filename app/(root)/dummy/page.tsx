'use client'
import React, { useState, useMemo } from 'react';
import { Calendar, MapPin, DollarSign, Plane, Hotel, Car } from 'lucide-react';
import TripDetails from './details';

export default function TripDashboard() {
  const [activeFilter, setActiveFilter] = useState('all');

  // Sample trip data
  const trips = [
    {
      id: "d0000000-0000-0000-0000-000000000001",
      trip_name: "Tech Conference San Francisco",
      trip_number: "TRP-20251115-000001",
      origin_city: "New York",
      destination_city: "San Francisco",
      departure_date: "2025-11-14T18:30:00.000Z",
      return_date: "2025-11-17T18:30:00.000Z",
      purpose: "Attending AWS re:Invent conference",
      status: "booked",
      estimated_cost: "2500.00",
      actual_cost: "2450.00",
      flight_count: "2",
      hotel_count: "1",
      car_rental_count: "1"
    },
    {
      id: "d0000000-0000-0000-0000-000000000002",
      trip_name: "Client Meeting Boston",
      trip_number: "TRP-20251010-000002",
      origin_city: "New York",
      destination_city: "Boston",
      departure_date: "2025-10-10T09:00:00.000Z",
      return_date: "2025-10-12T18:00:00.000Z",
      purpose: "Quarterly business review",
      status: "completed",
      estimated_cost: "1200.00",
      actual_cost: "1150.00",
      flight_count: "2",
      hotel_count: "1",
      car_rental_count: "0"
    },
    {
      id: "d0000000-0000-0000-0000-000000000003",
      trip_name: "Product Launch Miami",
      trip_number: "TRP-20251220-000003",
      origin_city: "New York",
      destination_city: "Miami",
      departure_date: "2025-12-20T14:00:00.000Z",
      return_date: "2025-12-23T18:00:00.000Z",
      purpose: "Product launch event",
      status: "booked",
      estimated_cost: "3500.00",
      actual_cost: null,
      flight_count: "2",
      hotel_count: "1",
      car_rental_count: "1"
    },
    {
      id: "d0000000-0000-0000-0000-000000000004",
      trip_name: "Training Workshop Chicago",
      trip_number: "TRP-20250930-000004",
      origin_city: "New York",
      destination_city: "Chicago",
      departure_date: "2025-09-30T10:00:00.000Z",
      return_date: "2025-10-02T18:00:00.000Z",
      purpose: "Employee training",
      status: "cancelled",
      estimated_cost: "1800.00",
      actual_cost: null,
      flight_count: "2",
      hotel_count: "1",
      car_rental_count: "1"
    }
  ];

  const now = new Date('2025-11-14T00:00:00.000Z');

  const categorizeTrip = (trip) => {
    if (trip.status === 'cancelled') return 'cancelled';
    const departDate = new Date(trip.departure_date);
    const returnDate = new Date(trip.return_date);
    if (departDate > now) return 'upcoming';
    if (departDate <= now && returnDate >= now) return 'ongoing';
    return 'past';
  };

  const filteredTrips = useMemo(() => {
    if (activeFilter === 'all') return trips;
    return trips.filter(trip => categorizeTrip(trip) === activeFilter);
  }, [activeFilter]);

  const tripCounts = useMemo(() => ({
    upcoming: trips.filter(t => categorizeTrip(t) === 'upcoming').length,
    ongoing: trips.filter(t => categorizeTrip(t) === 'ongoing').length,
    past: trips.filter(t => categorizeTrip(t) === 'past').length,
    cancelled: trips.filter(t => categorizeTrip(t) === 'cancelled').length,
  }), []);

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusColor = (tripStatus) => {
    if (tripStatus === 'cancelled') return 'bg-red-100 text-red-800';
    if (tripStatus === 'completed') return 'bg-green-100 text-green-800';
    return 'bg-blue-100 text-blue-800';
  };

  const getFilterColor = (filter) => {
    const base = 'px-4 py-2 rounded-lg font-medium transition';
    if (activeFilter === filter) {
      return `${base} ${filter === 'cancelled' ? 'bg-red-600 text-white' : filter === 'past' ? 'bg-green-600 text-white' : filter === 'ongoing' ? 'bg-purple-600 text-white' : filter === 'all' ? 'bg-indigo-600 text-white' : 'bg-blue-600 text-white'}`;
    }
    return `${base} bg-gray-200 text-gray-700 hover:bg-gray-300`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
        <TripDetails />
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Trip Management</h1>
          <p className="text-gray-600">Filter and manage your business trips</p>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-4 mb-8 flex-wrap">
          <button onClick={() => setActiveFilter('all')} className={getFilterColor('all')}>
            📋 All ({trips.length})
          </button>
          <button onClick={() => setActiveFilter('upcoming')} className={getFilterColor('upcoming')}>
            📅 Upcoming ({tripCounts.upcoming})
          </button>
          <button onClick={() => setActiveFilter('ongoing')} className={getFilterColor('ongoing')}>
            🚀 Ongoing ({tripCounts.ongoing})
          </button>
          <button onClick={() => setActiveFilter('past')} className={getFilterColor('past')}>
            ✓ Past ({tripCounts.past})
          </button>
          <button onClick={() => setActiveFilter('cancelled')} className={getFilterColor('cancelled')}>
            ✕ Cancelled ({tripCounts.cancelled})
          </button>
        </div>

        {/* Trips List */}
        <div className="space-y-4">
          {filteredTrips.length > 0 ? (
            filteredTrips.map(trip => (
              <div key={trip.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{trip.trip_name}</h3>
                    <p className="text-sm text-gray-500">{trip.trip_number}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(trip.status)}`}>
                    {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-gray-700">
                    <MapPin size={18} className="text-blue-600" />
                    <span>{trip.origin_city} → {trip.destination_city}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Calendar size={18} className="text-blue-600" />
                    <span>{formatDate(trip.departure_date)} to {formatDate(trip.return_date)}</span>
                  </div>
                </div>

                <p className="text-gray-600 mb-4"><strong>Purpose:</strong> {trip.purpose}</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Plane size={18} className="text-indigo-600" />
                    <span className="text-sm">{trip.flight_count} Flight{trip.flight_count !== '1' ? 's' : ''}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Hotel size={18} className="text-indigo-600" />
                    <span className="text-sm">{trip.hotel_count} Hotel{trip.hotel_count !== '1' ? 's' : ''}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Car size={18} className="text-indigo-600" />
                    <span className="text-sm">{trip.car_rental_count} Car Rental{trip.car_rental_count !== '1' ? 's' : ''}</span>
                  </div>
                </div>

                <div className="flex justify-between items-end pt-4 border-t border-gray-200">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-gray-700">
                      <DollarSign size={18} className="text-green-600" />
                      <span className="text-sm">Est: ${parseFloat(trip.estimated_cost).toFixed(2)}</span>
                    </div>
                    {trip.actual_cost && (
                      <p className="text-sm text-green-600">Actual: ${parseFloat(trip.actual_cost).toFixed(2)}</p>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <p className="text-gray-500 text-lg">No {activeFilter} trips found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}