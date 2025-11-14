import React from 'react';
import { Plane, Hotel, Car, DollarSign, MapPin, Calendar, CheckCircle, User } from 'lucide-react';

export default function TripDetails() {
  const tripData = {
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
    currency: "USD",
    travelers: [
      {
        id: "92be0446-f426-4d2b-9b2f-623c6aaec29f",
        first_name: "Kishan",
        last_name: "Devadiga",
        email: "km.devadiga@gmail.com",
        phone: "+1-555-0101",
        is_primary: true
      }
    ],
    flights: [
      {
        id: "f412535b-3543-4802-b4b6-7bc3aeca7114",
        airline: "United Airlines",
        flight_number: "UA1234",
        departure_airport: "JFK",
        arrival_airport: "SFO",
        departure_time: "2025-11-15T13:00:00.000Z",
        arrival_time: "2025-11-15T19:30:00.000Z",
        cabin_class: "economy",
        seat_number: "12A",
        cost: "450.00"
      },
      {
        id: "d15739c8-bd54-427c-b0ab-5cbe87659905",
        airline: "United Airlines",
        flight_number: "UA5678",
        departure_airport: "SFO",
        arrival_airport: "JFK",
        departure_time: "2025-11-18T23:00:00.000Z",
        arrival_time: "2025-11-19T04:30:00.000Z",
        cabin_class: "economy",
        seat_number: "12A",
        cost: "480.00"
      }
    ],
    hotels: [
      {
        id: "03281be5-948a-4455-aecb-d3538bcd842e",
        hotel_name: "Hilton San Francisco Union Square",
        address: "333 O'Farrell St",
        city: "San Francisco",
        check_in_date: "2025-11-15T18:30:00.000Z",
        check_out_date: "2025-11-18T18:30:00.000Z",
        room_type: "Deluxe King",
        number_of_rooms: 1,
        cost: "900.00"
      }
    ],
    car_rentals: [
      {
        id: "86e9f61c-bd83-48ca-a624-b45636cf8ece",
        rental_company: "Enterprise",
        vehicle_type: "Toyota Camry",
        vehicle_class: "full_size",
        pickup_location: "SFO Airport",
        dropoff_location: "SFO Airport",
        pickup_date: "2025-11-15T20:00:00.000Z",
        dropoff_date: "2025-11-18T22:00:00.000Z",
        insurance_included: false,
        cost: "240.00"
      }
    ]
  };

  // Format date
  const formatDate = (dateString) => {
    try {
      if (!dateString) return 'N/A';
      return new Date(dateString).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch (err) {
      console.error('Error formatting date:', err);
      return 'N/A';
    }
  };

  // Format time
  const formatTime = (dateString) => {
    try {
      if (!dateString) return 'N/A';
      return new Date(dateString).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    } catch (err) {
      console.error('Error formatting time:', err);
      return 'N/A';
    }
  };

  // Format currency
  const formatCurrency = (amount) => {
    try {
      const numAmount = parseFloat(amount) || 0;
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: tripData?.currency || 'USD'
      }).format(numAmount);
    } catch (err) {
      console.error('Error formatting currency:', err);
      return `$${amount || '0.00'}`;
    }
  };

  // Calculate number of nights
  const calculateNights = (checkInDate, checkOutDate) => {
    try {
      if (!checkInDate || !checkOutDate) return 0;
      const checkIn = new Date(checkInDate);
      const checkOut = new Date(checkOutDate);
      const diffTime = Math.abs(checkOut - checkIn);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    } catch (err) {
      console.error('Error calculating nights:', err);
      return 0;
    }
  };

  // Calculate nightly rate
  const calculateNightlyRate = (totalCost, nights) => {
    try {
      if (nights === 0) return 0;
      return parseFloat(totalCost) / nights;
    } catch (err) {
      console.error('Error calculating nightly rate:', err);
      return 0;
    }
  };

  // Calculate totals
  const calculateFlightTotal = () => {
    try {
      return tripData?.flights?.reduce((sum, flight) => sum + (parseFloat(flight?.cost) || 0), 0) || 0;
    } catch (err) {
      console.error('Error calculating flight total:', err);
      return 0;
    }
  };

  const calculateHotelTotal = () => {
    try {
      return tripData?.hotels?.reduce((sum, hotel) => sum + (parseFloat(hotel?.cost) || 0), 0) || 0;
    } catch (err) {
      console.error('Error calculating hotel total:', err);
      return 0;
    }
  };

  const calculateCarTotal = () => {
    try {
      return tripData?.car_rentals?.reduce((sum, car) => sum + (parseFloat(car?.cost) || 0), 0) || 0;
    } catch (err) {
      console.error('Error calculating car total:', err);
      return 0;
    }
  };

  const flightTotal = calculateFlightTotal();
  const hotelTotal = calculateHotelTotal();
  const carTotal = calculateCarTotal();
  const grandTotal = flightTotal + hotelTotal + carTotal;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-5xl mx-auto">
        
        {/* ====== HEADER SECTION ====== */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          {/* Trip Title and Status */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {tripData?.trip_name || 'Trip'}
              </h1>
              <p className="text-gray-600">Trip #{tripData?.trip_number || 'N/A'}</p>
            </div>
            <div className="flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full">
              <CheckCircle size={20} />
              <span className="font-semibold capitalize">{tripData?.status || 'pending'}</span>
            </div>
          </div>

          {/* Trip Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 pb-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <MapPin className="text-indigo-600 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-600">Route</p>
                <p className="font-semibold text-gray-900">
                  {tripData?.origin_city || 'N/A'} → {tripData?.destination_city || 'N/A'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="text-indigo-600 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-600">Travel Dates</p>
                <p className="font-semibold text-gray-900">
                  {formatDate(tripData?.departure_date)} to {formatDate(tripData?.return_date)}
                </p>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Purpose</p>
              <p className="font-semibold text-gray-900">{tripData?.purpose || 'N/A'}</p>
            </div>
          </div>

          {/* Travelers Section */}
          {tripData?.travelers && tripData.travelers.length > 0 && (
            <div className="mt-6">
              <div className="flex items-center gap-2 mb-4">
                <User className="text-indigo-600" size={24} />
                <h3 className="text-lg font-bold text-gray-900">Travelers ({tripData.travelers.length})</h3>
              </div>
              <div className="space-y-3">
                {tripData.travelers.map((traveler) => (
                  <div key={traveler?.id} className="bg-gradient-to-r from-indigo-50 to-blue-50 p-4 rounded-lg border border-indigo-200">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-bold text-gray-900 text-lg">
                          {traveler?.first_name || 'N/A'} {traveler?.last_name || 'N/A'}
                        </p>
                        {traveler?.is_primary && (
                          <span className="inline-block mt-1 text-xs bg-indigo-600 text-white px-2.5 py-1 rounded-full font-semibold">
                            Primary Traveler
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs text-gray-600 uppercase font-semibold">Email</p>
                        <p className="text-sm text-gray-900">{traveler?.email || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 uppercase font-semibold">Phone</p>
                        <p className="text-sm text-gray-900">{traveler?.phone || 'N/A'}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ====== FLIGHTS SECTION ====== */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-4 flex items-center gap-3">
            <Plane className="text-white" size={28} />
            <h2 className="text-2xl font-bold text-white">Flights</h2>
          </div>
          <div className="p-8">
            {tripData?.flights && tripData.flights.length > 0 ? (
              <>
                {tripData.flights.map((flight, idx) => (
                  <div key={flight?.id || idx} className={`pb-6 ${idx < tripData.flights.length - 1 ? 'border-b border-gray-200' : ''}`}>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-lg font-bold text-gray-900">
                          {flight?.flight_number || 'N/A'} • {flight?.airline || 'N/A'}
                        </p>
                        <p className="text-sm text-gray-600">
                          {flight?.departure_airport || 'N/A'} → {flight?.arrival_airport || 'N/A'}
                        </p>
                      </div>
                      <p className="text-2xl font-bold text-blue-600">{formatCurrency(flight?.cost)}</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600 font-semibold">Departure</p>
                        <p className="text-gray-900">{flight?.departure_time ? formatDate(flight.departure_time) : 'N/A'}</p>
                        <p className="text-gray-700 font-semibold">{flight?.departure_time ? formatTime(flight.departure_time) : ''}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 font-semibold">Arrival</p>
                        <p className="text-gray-900">{flight?.arrival_time ? formatDate(flight.arrival_time) : 'N/A'}</p>
                        <p className="text-gray-700 font-semibold">{flight?.arrival_time ? formatTime(flight.arrival_time) : ''}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 font-semibold">Cabin Class</p>
                        <p className="text-gray-900 capitalize">{flight?.cabin_class || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 font-semibold">Seat</p>
                        <p className="text-gray-900">{flight?.seat_number || 'N/A'}</p>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="mt-6 pt-4 border-t-2 border-gray-300 flex justify-between items-center">
                  <p className="font-semibold text-gray-900">Flights Subtotal</p>
                  <p className="text-xl font-bold text-blue-600">{formatCurrency(flightTotal)}</p>
                </div>
              </>
            ) : (
              <p className="text-gray-500 py-4">No flights available</p>
            )}
          </div>
        </div>

        {/* ====== HOTELS SECTION ====== */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-8 py-4 flex items-center gap-3">
            <Hotel className="text-white" size={28} />
            <h2 className="text-2xl font-bold text-white">Accommodations</h2>
          </div>
          <div className="p-8">
            {tripData?.hotels && tripData.hotels.length > 0 ? (
              <>
                {tripData.hotels.map((hotel) => {
                  const nights = calculateNights(hotel?.check_in_date, hotel?.check_out_date);
                  const nightlyRate = calculateNightlyRate(hotel?.cost, nights);
                  
                  return (
                    <div key={hotel?.id} className="pb-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <p className="text-lg font-bold text-gray-900">{hotel?.hotel_name || 'N/A'}</p>
                          <p className="text-sm text-gray-600">{hotel?.address || 'N/A'}, {hotel?.city || 'N/A'}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-3xl font-bold text-purple-600">{formatCurrency(hotel?.cost)}</p>
                          <p className="text-sm font-semibold text-purple-500">{formatCurrency(nightlyRate)}/night</p>
                        </div>
                      </div>
                      
                      {/* Hotel Details Box */}
                      <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg mb-4 border border-purple-200">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div>
                            <p className="text-sm font-semibold text-gray-600">Check-in</p>
                            <p className="text-base font-bold text-gray-900">{hotel?.check_in_date ? formatDate(hotel.check_in_date) : 'N/A'}</p>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-600">Check-out</p>
                            <p className="text-base font-bold text-gray-900">{hotel?.check_out_date ? formatDate(hotel.check_out_date) : 'N/A'}</p>
                          </div>
                          <div className="bg-white p-2 rounded border-2 border-purple-300">
                            <p className="text-sm font-semibold text-gray-600">Number of Nights</p>
                            <p className="text-2xl font-bold text-purple-600">{nights}</p>
                          </div>
                          <div className="bg-white p-2 rounded border-2 border-blue-300">
                            <p className="text-sm font-semibold text-gray-600">Rate per Night</p>
                            <p className="text-2xl font-bold text-blue-600">{formatCurrency(nightlyRate)}</p>
                          </div>
                        </div>
                      </div>

                      {/* Calculation Breakdown */}
                      <div className="bg-indigo-50 border-l-4 border-indigo-600 p-4 rounded mb-4">
                        <p className="text-base font-semibold text-gray-800">
                          <span className="text-indigo-600">{nights} nights</span>
                          <span className="text-gray-600"> × </span>
                          <span className="text-indigo-600">{formatCurrency(nightlyRate)}</span>
                          <span className="text-gray-600"> per night = </span>
                          <span className="text-indigo-600 text-lg">{formatCurrency(hotel?.cost)}</span>
                        </p>
                      </div>

                      {/* Room Details */}
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600 font-semibold">Room Type</p>
                          <p className="text-gray-900">{hotel?.room_type || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 font-semibold">Number of Rooms</p>
                          <p className="text-gray-900">{hotel?.number_of_rooms || 1}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div className="mt-6 pt-4 border-t-2 border-gray-300 flex justify-between items-center">
                  <p className="font-semibold text-gray-900">Hotel Subtotal</p>
                  <p className="text-xl font-bold text-purple-600">{formatCurrency(hotelTotal)}</p>
                </div>
              </>
            ) : (
              <p className="text-gray-500 py-4">No hotels available</p>
            )}
          </div>
        </div>

        {/* ====== CAR RENTALS SECTION ====== */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-orange-600 to-orange-700 px-8 py-4 flex items-center gap-3">
            <Car className="text-white" size={28} />
            <h2 className="text-2xl font-bold text-white">Car Rentals</h2>
          </div>
          <div className="p-8">
            {tripData?.car_rentals && tripData.car_rentals.length > 0 ? (
              <>
                {tripData.car_rentals.map((car) => (
                  <div key={car?.id} className="pb-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-lg font-bold text-gray-900">
                          {car?.vehicle_type || 'N/A'} • {car?.rental_company || 'N/A'}
                        </p>
                        <p className="text-sm text-gray-600">
                          {car?.pickup_location || 'N/A'} → {car?.dropoff_location || 'N/A'}
                        </p>
                      </div>
                      <p className="text-2xl font-bold text-orange-600">{formatCurrency(car?.cost)}</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600 font-semibold">Pickup</p>
                        <p className="text-gray-900">{car?.pickup_date ? formatDate(car.pickup_date) : 'N/A'}</p>
                        <p className="text-gray-700 font-semibold">{car?.pickup_date ? formatTime(car.pickup_date) : ''}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 font-semibold">Dropoff</p>
                        <p className="text-gray-900">{car?.dropoff_date ? formatDate(car.dropoff_date) : 'N/A'}</p>
                        <p className="text-gray-700 font-semibold">{car?.dropoff_date ? formatTime(car.dropoff_date) : ''}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 font-semibold">Vehicle Class</p>
                        <p className="text-gray-900 capitalize">
                          {car?.vehicle_class ? car.vehicle_class.replace('_', ' ') : 'N/A'}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600 font-semibold">Insurance</p>
                        <p className="text-gray-900">{car?.insurance_included ? 'Included' : 'Not Included'}</p>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="mt-6 pt-4 border-t-2 border-gray-300 flex justify-between items-center">
                  <p className="font-semibold text-gray-900">Car Rental Subtotal</p>
                  <p className="text-xl font-bold text-orange-600">{formatCurrency(carTotal)}</p>
                </div>
              </>
            ) : (
              <p className="text-gray-500 py-4">No car rentals available</p>
            )}
          </div>
        </div>

        {/* ====== COST SUMMARY SECTION ====== */}
        <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-lg shadow-lg overflow-hidden">
          <div className="p-8 text-white">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <DollarSign size={32} />
              Cost Summary
            </h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-lg font-semibold bg-indigo-500 bg-opacity-50 p-3 rounded">
                <span>Flights</span>
                <span>{formatCurrency(flightTotal)}</span>
              </div>
              <div className="flex justify-between text-lg font-semibold bg-indigo-500 bg-opacity-50 p-3 rounded">
                <span>Hotels</span>
                <span>{formatCurrency(hotelTotal)}</span>
              </div>
              <div className="flex justify-between text-lg font-semibold bg-indigo-500 bg-opacity-50 p-3 rounded">
                <span>Car Rentals</span>
                <span>{formatCurrency(carTotal)}</span>
              </div>
            </div>
            
            <div className="border-t-2 border-indigo-400 pt-6">
              <div className="flex justify-between text-4xl font-bold mb-6">
                <span>Total Cost</span>
                <span>{formatCurrency(grandTotal)}</span>
              </div>
              
              <div className="bg-indigo-500 bg-opacity-30 p-4 rounded-lg border border-indigo-300">
                <div className="space-y-2 text-indigo-100">
                  <div className="flex justify-between">
                    <span>Estimated Cost:</span>
                    <span className="font-semibold">{formatCurrency(tripData?.estimated_cost)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Actual Cost:</span>
                    <span className="font-semibold">{formatCurrency(tripData?.actual_cost)}</span>
                  </div>
                  <div className="flex justify-between text-green-300 pt-2 border-t border-indigo-300">
                    <span className="font-bold">Total Savings:</span>
                    <span className="font-bold text-lg">
                      {formatCurrency(parseFloat(tripData?.estimated_cost) - parseFloat(tripData?.actual_cost))}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}