import React from "react";
import { Users, Clock, Calendar } from "lucide-react";
import { Grid, GridItem } from "@/components/custom/Grid";

const cards = [
  {
    title: "Active Delegates",
    value: "2",
    icon: <Users className="w-6 h-6 text-blue-600" />,
    bg: "bg-blue-50",
  },
  {
    title: "Total Delegates",
    value: "2",
    icon: <Users className="w-6 h-6 text-purple-600" />,
    bg: "bg-purple-50",
  },
  {
    title: "Pending Requests",
    value: "2",
    icon: <Clock className="w-6 h-6 text-orange-600" />,
    bg: "bg-orange-50",
  },
  {
    title: "Recent Access",
    value: "Today",
    icon: <Calendar className="w-6 h-6 text-green-600" />,
    bg: "bg-green-50",
  },
];

const DelegationCards = () => {
  return (
    <Grid cols={{ xs: 1, sm: 2, md: 4, lg: 6 }} gap={4} className="mb-8">
      {cards.map((card, index) => (
        <GridItem key={index}>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">{card.title}</p>
                <p className="text-3xl font-semibold text-gray-900">
                  {card.value}
                </p>
              </div>
              <div
                className={`w-12 h-12 ${card.bg} rounded-lg flex items-center justify-center`}
              >
                {card.icon}
              </div>
            </div>
          </div>
        </GridItem>
      ))}
    </Grid>
  );
};

export default DelegationCards;
