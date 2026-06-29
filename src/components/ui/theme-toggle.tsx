"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useThemeStore } from "@/stores";

export function ThemeSwitcher() {
  const { theme, setTheme } = useThemeStore();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div
        className="flex items-center gap-1 p-1 rounded-xl"
        style={{
          background: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.25)",
        }}
      >
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
    <div
      className="flex items-center gap-1 p-1 rounded-xl transition-all duration-300"
      style={{
        background: "rgba(255, 255, 255, 0.2)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255,255,255,0.3)",
      }}
    >
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
                style={{
                  background: "rgba(12, 123, 123, 0.85)",
                  boxShadow: "0 4px 15px rgba(12, 123, 123, 0.35)",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              />
            )}
            <mode.icon
              className={`relative z-10 h-3.5 w-3.5 transition-colors duration-300 ${
                isActive ? "text-white" : "text-white/70"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}

export function ThemeSwitcherDark() {
  const { theme, setTheme } = useThemeStore();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div
        className="flex items-center gap-1 p-1 rounded-xl"
        style={{
          background: "rgba(15, 23, 42, 0.6)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
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
    <div
      className="flex items-center gap-1 p-1 rounded-xl transition-all duration-300"
      style={{
        background: "rgba(15, 23, 42, 0.6)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
      }}
    >
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
                layoutId="theme-active-bg-dark"
                className="absolute inset-0 rounded-lg"
                style={{
                  background: "rgba(12, 123, 123, 0.7)",
                  boxShadow: "0 4px 15px rgba(12, 123, 123, 0.4)",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              />
            )}
            <mode.icon
              className={`relative z-10 h-3.5 w-3.5 transition-colors duration-300 ${
                isActive ? "text-white" : "text-dark-400"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}