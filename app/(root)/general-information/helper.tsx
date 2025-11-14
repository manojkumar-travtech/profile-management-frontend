import { Building, DollarSign, MapPin, Plane, Shield } from "lucide-react";

export const getUpdateTypeColor = (type: string) => {
  switch (type) {
    case "urgent":
      return "bg-red-50 text-red-700 border-red-100";
    case "warning":
      return "bg-yellow-50 text-yellow-700 border-yellow-100";
    case "info":
      return "bg-blue-50 text-blue-700 border-blue-100";
    default:
      return "bg-gray-50 text-gray-700 border-gray-100";
  }
};

export const informationCategories = [
  {
    id: "passport-info",
    title: "Passport Information",
    description: "U.S. passport applications, renewals, and requirements",
    icon: <Shield className="w-6 h-6 text-primary" />,
    links: [
      {
        title: "Apply for a Passport",
        url: "https://travel.state.gov/content/travel/en/passports/how-apply.html",
      },
      {
        title: "Renew Your Passport",
        url: "https://travel.state.gov/content/travel/en/passports/have-passport/renew.html",
      },
      {
        title: "Processing Times",
        url: "https://travel.state.gov/content/travel/en/passports/how-apply/processing-times.html",
      },
      {
        title: "Passport Fees",
        url: "https://travel.state.gov/content/travel/en/passports/how-apply/fees.html",
      },
      {
        title: "Emergency Passport Services",
        url: "https://travel.state.gov/content/travel/en/passports/have-passport/emergency.html",
      },
    ],
    updates: [
      {
        text: "Processing times updated: 6-8 weeks routine, 2-3 weeks expedited",
        type: "info",
      },
      {
        text: "Holiday office closures may affect processing",
        type: "warning",
      },
    ],
  },
  {
    id: "state-department",
    title: "State Department",
    description:
      "Travel advisories, embassy information, and consular services",
    icon: <Building className="w-6 h-6 text-primary" />,
    links: [
      {
        title: "Travel Advisories",
        url: "https://travel.state.gov/content/travel/en/traveladvisories/traveladvisories.html",
      },
      {
        title: "Country Information",
        url: "https://travel.state.gov/content/travel/en/international-travel/International-Travel-Country-Information-Pages.html",
      },
      {
        title: "Embassy & Consulate Finder",
        url: "https://www.usembassy.gov/",
      },
      { title: "STEP Enrollment", url: "https://step.state.gov/step/" },
      {
        title: "Visa Information",
        url: "https://travel.state.gov/content/travel/en/us-visas.html",
      },
    ],
    updates: [
      {
        text: "Russia Travel Advisory updated to Level 4: Do Not Travel",
        type: "urgent",
      },
      {
        text: "China Travel Advisory: Exercise increased caution",
        type: "warning",
      },
    ],
  },
  {
    id: "tsa-info",
    title: "TSA Information",
    description: "Airport security, prohibited items, and travel procedures",
    icon: <Plane className="w-6 h-6 text-primary" />,
    links: [
      {
        title: "What Can I Bring?",
        url: "https://www.tsa.gov/travel/security-screening/whatcanibring/all",
      },
      { title: "TSA PreCheck®", url: "https://www.tsa.gov/precheck" },
      { title: "REAL ID", url: "https://www.tsa.gov/real-id" },
      {
        title: "Checkpoint Wait Times",
        url: "https://www.tsa.gov/travel/passenger-support",
      },
      {
        title: "Special Assistance",
        url: "https://www.tsa.gov/travel/special-procedures",
      },
    ],
    updates: [
      { text: "REAL ID required starting May 7, 2025", type: "urgent" },
      {
        text: "3-1-1 liquid rule still in effect for carry-on bags",
        type: "info",
      },
    ],
  },
  {
    id: "per-diem",
    title: "Per Diem Rates",
    description: "Federal per diem rates for domestic and international travel",
    icon: <DollarSign className="w-6 h-6 text-primary" />,
    links: [
      {
        title: "U.S. Per Diem Rates",
        url: "https://www.gsa.gov/travel/plan-book/per-diem-rates",
      },
      {
        title: "International Per Diem",
        url: "https://aoprals.state.gov/web920/per_diem.asp",
      },
      {
        title: "Lodging Rate Lookup",
        url: "https://www.gsa.gov/travel/plan-book/per-diem-rates/per-diem-rates-lookup",
      },
      {
        title: "Per Diem Calculator",
        url: "https://www.gsa.gov/travel/plan-book/per-diem-rates/per-diem-rates-lookup/?action=perdiems_report",
      },
      {
        title: "FY2024 Rate Changes",
        url: "https://www.gsa.gov/travel/plan-book/per-diem-rates/fy-2024-per-diem-rates",
      },
    ],
    updates: [
      { text: "FY2024 per diem rates now in effect", type: "info" },
      {
        text: "High-cost areas may require additional documentation",
        type: "warning",
      },
    ],
  },
  {
    id: "government-sites",
    title: "Government Travel Sites",
    description:
      "Official government resources for business and leisure travel",
    icon: <MapPin className="w-6 h-6 text-primary" />,
    links: [
      {
        title: "FedRooms (Government Hotel Program)",
        url: "https://www.fedrooms.com/",
      },
      {
        title: "CityPairs (Government Airfares)",
        url: "https://www.gsa.gov/travel/plan-book/transportation-airfare-pov-etc/government-contract-city-pair-program-ccp",
      },
      {
        title: "U.S. Government Car Rental",
        url: "https://www.gsa.gov/travel/plan-book/transportation-airfare-pov-etc/rental-cars",
      },
      {
        title: "Federal Travel Regulation (FTR)",
        url: "https://www.gsa.gov/travel/plan-book/federal-travel-regulation-ftr",
      },
      {
        title: "Government Travel Charge Card",
        url: "https://www.gsa.gov/travel/plan-book/travel-charge-cards",
      },
    ],
    updates: [
      { text: "New CityPairs contracts effective October 1", type: "info" },
      {
        text: "FedRooms expanded to include more hotel brands",
        type: "info",
      },
    ],
  },
];
