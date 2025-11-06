"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { usePathname, useSearchParams } from "next/navigation";

interface UseUnsavedChangesGuardReturn {
  showUnsavedModal: boolean;
  setShowUnsavedModal: (val: boolean) => void;
  pendingNavigation: string | null;
  confirmLeave: () => void;
  cancelLeave: () => void;
}


export function useUnsavedChangesGuard(
  unsavedChanges: boolean
): UseUnsavedChangesGuardReturn {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [showUnsavedModal, setShowUnsavedModal] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState<string | null>(
    null
  );

  const lastPathRef = useRef(pathname + searchParams.toString());

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (unsavedChanges) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [unsavedChanges]);

  useEffect(() => {
    const currentPath = pathname + searchParams.toString();
    const previousPath = lastPathRef.current;

    if (previousPath !== currentPath && unsavedChanges) {
      setShowUnsavedModal(true);
      setPendingNavigation(currentPath);
      window.history.pushState(null, "", previousPath);
    } else {
      lastPathRef.current = currentPath;
    }
  }, [pathname, searchParams, unsavedChanges]);

  const confirmLeave = useCallback(() => {
    if (pendingNavigation) {
      setShowUnsavedModal(false);
      setPendingNavigation(null);
      lastPathRef.current = pendingNavigation;
      window.location.href = pendingNavigation;
    }
  }, [pendingNavigation]);

  const cancelLeave = useCallback(() => {
    setShowUnsavedModal(false);
    setPendingNavigation(null);
  }, []);

  return {
    showUnsavedModal,
    setShowUnsavedModal,
    pendingNavigation,
    confirmLeave,
    cancelLeave,
  };
}
