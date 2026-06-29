"use client";

import { Providers } from "@/providers/query-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { NotificationProvider } from "@/providers/notification-provider";
import type { ReactNode } from "react";

export function RootProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <Providers>
        <NotificationProvider>
          {children}
        </NotificationProvider>
      </Providers>
    </ThemeProvider>
  );
}