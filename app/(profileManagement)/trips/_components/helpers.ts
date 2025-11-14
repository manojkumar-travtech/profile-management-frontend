// Utility Functions
export const formatDate = (dateString: string | null): string => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const formatDateTime = (dateString: string | null): string => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return (
    date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    }) +
    ", " +
    date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  );
};

export const getStatusColor = (status: string): string => {
  switch (status) {
    case "upcoming":
      return "bg-blue-100 text-blue-700";
    case "active":
      return "bg-green-100 text-green-700";
    case "completed":
      return "bg-gray-100 text-gray-700";
    case "cancelled":
      return "bg-red-100 text-red-700";
    case "scheduled":
      return "bg-slate-900 text-white";
    case "confirmed":
      return "bg-green-600 text-white";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

export const getTypeColor = (type: string): string => {
  switch (type) {
    case "business":
      return "bg-purple-100 text-purple-700";
    case "leisure":
      return "bg-orange-100 text-orange-700";
    case "personal":
      return "bg-teal-100 text-teal-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};
