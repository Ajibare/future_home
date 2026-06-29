"use client";

import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { type ReactNode, useEffect } from "react";
import { useThemeStore } from "@/stores";

function ThemeSync({ children }: { children: ReactNode }) {
  const { setTheme: setNextTheme } = useTheme();
  const { theme, setTheme } = useThemeStore();

  // Sync Zustand -> next-themes
  useEffect(() => {
    setNextTheme(theme);
  }, [theme, setNextTheme]);

  return <>{children}</>;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange={false}
    >
      <ThemeSync>{children}</ThemeSync>
    </NextThemesProvider>
  );
}