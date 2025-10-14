import { Calendar, Clock, MapPin } from "lucide-react";
import { EventPreviewCardProps } from "../StepsJson";

const EventPreviewCard = ({ formData }: EventPreviewCardProps) => {
  const {
    aboutEvent,
    eventName,
    eventStartDate,
    eventEndDate,
    startTime,
    endTime,
    venueName,
    venueCompleteAddress,
  } = formData;

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "TBD";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (timeStr: string) => {
    if (!timeStr) return "";
    return new Date(`1970-01-01T${timeStr}`).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 w-full">
      {/* Header with logos */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center space-x-2">
          <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">Ω</span>
          </div>
          <div>
            <div className="text-sm font-semibold text-blue-600">OMEGA</div>
            <div className="text-xs text-gray-500">WORLD TRAVEL</div>
          </div>
        </div>
        <div className="text-xs text-gray-400">[Customer Logo]</div>
      </div>

      {/* User greeting */}
      <div className="mb-4">
        <span className="text-gray-600">Hi </span>
        <span className="font-semibold text-gray-900">[User Name]</span>
        <span className="text-gray-600">,</span>
      </div>

      {/* Banner image placeholder */}
      <div className="mb-6 flex justify-center">
        <div className="w-24 h-24 border-2 border-dashed border-blue-300 rounded-full flex items-center justify-center">
          <span className="text-blue-400 text-xs text-center">
            Banner Image
          </span>
        </div>
      </div>

      {/* Event name */}
      <div className="text-center mb-4">
        <h2 className="text-xl font-bold text-purple-600 mb-2">
          [{eventName || "Event Name"}]
        </h2>

        {/* Date and time */}
        <div className="flex items-center justify-center text-gray-600 mb-1">
          <Calendar className="w-4 h-4 mr-1" />
          <span className="text-sm">
            {formatDate(eventStartDate || "")} -{" "}
            {formatDate(eventEndDate || "")}
          </span>
        </div>

        {startTime && (
          <div className="flex items-center justify-center text-gray-600 mb-3">
            <Clock className="w-4 h-4 mr-1" />
            <span className="text-sm">{formatTime(startTime)}</span>
          </div>
        )}
      </div>

      {/* Address */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center text-gray-700 mb-4">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-sm font-medium">
            [{formData.venueCompleteAddress || "Address/Venue"}]
          </span>
        </div>
      </div>

      {/* CTA Button */}
      <div className="text-center">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200">
          Click Here to Register for the Event
        </button>
      </div>
    </div>
  );
};

export default EventPreviewCard;
