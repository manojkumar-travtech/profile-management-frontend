"use client";

import { User, Sliders, CalendarCheck, History, Crown } from "lucide-react";
import { MenuItem } from "../MenuItems";

const basePath = "traveler-profile";

export const TRAVELLER_MENU_ITEMS: MenuItem[] = [
  {
    id: "general_info",
    title: "General Info",
    icon: User,
    path: 'general-info',
  },
  {
    id: "preferences",
    title: "Preferences",
    icon: Sliders,
    path: `preferences`,
  },
  {
    id: "upcomingTrips",
    title: "Upcoming Trips",
    icon: CalendarCheck,
    path: `upcoming-trips`,
  },
  {
    id: "pastTrips",
    title: "Past Trips",
    icon: History,
    path: `past-trips`,
  },
  {
    id: "loyalty_memberships",
    title: "Loyalty & Memberships",
    icon: Crown,
    path: `loyalty-memberships`,
  },
];
