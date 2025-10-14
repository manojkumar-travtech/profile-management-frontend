"use client";
import {Star, Users } from "lucide-react";
import { MenuItem } from "../MenuItems";

export const ERO_MENU_ITEMS: MenuItem[] = [
  { id: "events", title: "Events", icon: Star, path: "/events" },
  {
    id: "user-management",
    title: "User Management",
    icon: Users,
    hasSubmenu: true,
    submenu: [
      { id: "create-user", title: "Create User", path: "/users/create" },
      { id: "manage-users", title: "Manage Users", path: "/users/manage" },
      { id: "user-roles", title: "User Roles", path: "/users/roles" },
    ],
  },
];
