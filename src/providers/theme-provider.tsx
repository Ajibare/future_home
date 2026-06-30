"use client";

import { type ReactNode, useEffect } from "react";
import { useThemeStore } from "@/stores";

function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function ThemeApply({ children }: { children: ReactNode }) {
  const { theme, setTheme } = useThemeStore();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    const hasUserSetTheme = localStorage.getItem("theme-store");
    if (!hasUserSetTheme) {
      const systemTheme = getSystemTheme();
      setTheme(systemTheme);
    }
  }, [setTheme]);

  return <>{children}</>;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  return <ThemeApply>{children}</ThemeApply>;
}
