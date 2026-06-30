"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useThemeStore } from "@/stores";

export function ThemeSwitcher() {
  const { theme, setTheme } = useThemeStore();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="flex items-center gap-1 p-1 rounded-xl" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
        <div className="w-8 h-8 rounded-lg" />
        <div className="w-8 h-8 rounded-lg" />
      </div>
    );
  }

  const modes = [
    { value: "light" as const, icon: Sun, label: "Light" },
    { value: "dark" as const, icon: Moon, label: "Dark" },
  ];

  return (
    <div className="flex items-center gap-1 p-1 rounded-xl transition-all duration-300" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
      {modes.map((mode) => {
        const isActive = theme === mode.value;
        return (
          <button
            key={mode.value}
            onClick={() => setTheme(mode.value)}
            className="relative flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-300"
            aria-label={mode.label}
          >
            {isActive && (
              <motion.div
                layoutId="theme-active-bg"
                className="absolute inset-0 rounded-lg"
                style={{ background: "var(--primary)", boxShadow: "0 2px 8px rgba(15,157,148,0.35)" }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              />
            )}
            <mode.icon
              className="relative z-10 h-3.5 w-3.5 transition-colors duration-300"
              style={{ color: isActive ? "#ffffff" : "var(--text-muted)" }}
            />
          </button>
        );
      })}
    </div>
  );
}
