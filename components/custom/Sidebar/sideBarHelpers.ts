'use client'

import { useEffect, useState } from "react";
import { MenuItem } from "./MenuItems";

export const useActiveMenu = (pathname: string, MENU_ITEMS: MenuItem[]) => {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  useEffect(() => {
    const activeItem = MENU_ITEMS.find((item) =>
      item.submenu?.some((submenuItem) => pathname.startsWith(submenuItem.path))
    );

    setOpenSubmenu(activeItem?.id || null);
  }, [pathname]);

  return { openSubmenu, setOpenSubmenu };
};


// Constants
export const SIDEBAR_WIDTH_EXPANDED = "w-80";
export const SIDEBAR_WIDTH_COLLAPSED = "w-16";
export const SIDEBAR_WIDTH_MOBILE = "w-80";