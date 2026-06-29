"use client";

import { Toaster } from "sonner";
import { type ReactNode } from "react";

export function NotificationProvider({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          classNames: {
            toast: "bg-white dark:bg-dark-800 border border-light-200 dark:border-dark-700 shadow-large",
            description: "text-dark-600 dark:text-dark-300",
            actionButton: "bg-primary-700 hover:bg-primary-800",
            cancelButton: "bg-light-200 dark:bg-dark-700 hover:bg-light-300 dark:hover:bg-dark-600",
          },
        }}
      />
    </>
  );
}