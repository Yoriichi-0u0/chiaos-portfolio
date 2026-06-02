"use client";

import { useCallback, useEffect, useState } from "react";
import type { PortfolioMode } from "@/types/portfolio";

const STORAGE_KEY = "chiaos-mode";

export function usePortfolioMode() {
  const [mode, setModeState] = useState<PortfolioMode>("builder");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const storedMode = window.localStorage.getItem(STORAGE_KEY);

    window.setTimeout(() => {
      if (storedMode === "builder" || storedMode === "signal") {
        setModeState(storedMode);
      }

      setMounted(true);
    }, 0);
  }, []);

  const setMode = useCallback((nextMode: PortfolioMode) => {
    setModeState(nextMode);
    window.localStorage.setItem(STORAGE_KEY, nextMode);
  }, []);

  return { mode, setMode, mounted };
}
