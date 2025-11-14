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
} from "lucide-react";

export const portalManagementConfig: SidebarConfig = {
  menuItems: [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: "LayoutDashboard",
      path: "/dashboard",
      active: true,
    },
    {
      id: "contentManagement",
      label: "Content Management",
      icon: "Plane",
      expandable: true,
      subItems: [
        {
          id: "generalInformation",
          label: "General Information",
          icon: "MapPin",
          path: "/trips",
        },
        {
          id: "profile",
          label: "Profile Management",
          icon: "User",
          path: "/profile-managemnt",
        },
        {
          id: "new&announcements",
          label: "News & Announcements",
          icon: "Newspaper",
          path: "portalManagement/news",
        },
      ],
    },
    {
      id: "userManagement",
      label: "User Management",
      icon: "Clock",
      path: "/userManagement",
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
};
