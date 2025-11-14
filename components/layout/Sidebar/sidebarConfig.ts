import { SidebarConfig } from "./sidebar";
import {
  LayoutDashboard,
  Plane,
  MapPin,
  User,
  Clock,
  Info,
  Building2,
  Palmtree,
  LucideIcon,
  Newspaper,
} from "lucide-react";

export const sidebarConfig: SidebarConfig = {
  user: {
    name: "Demo User",
    email: "demo@apex.com",
    avatar: "D",
  },
  menuItems: [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: "LayoutDashboard",
      path: "/dashboard",
      active: true,
    },
    {
      id: "travel",
      label: "Manage Your Travel",
      icon: "Plane",
      expandable: true,
      subItems: [
        {
          id: "trips",
          label: "My Trips",
          icon: "MapPin",
          path: "/trips",
        },
        {
          id: "profile",
          label: "Profile Management",
          icon: "User",
          path: "/profile-managemnt",
        },
      ],
    },
    {
      id: "hours",
      label: "Hours & Contact",
      icon: "Clock",
      path: "/hours&contact",
    },
    {
      id: "info",
      label: "General Information",
      icon: "Info",
      path: "/general-information",
    },
    {
      id: "services",
      label: "Information Services",
      icon: "Building2",
      path: "/services",
      expandable: true,
    },
    {
      id: "leisure",
      label: "Leisure",
      icon: "Palmtree",
      path: "/leisure",
      expandable: true,
    },
  ],
};

export const iconMap: Record<string, LucideIcon> = {
  LayoutDashboard,
  Plane,
  MapPin,
  User,
  Clock,
  Info,
  Building2,
  Palmtree,
  Newspaper
};
