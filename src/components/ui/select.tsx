"use client";

import * as React from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  hint?: string;
  disabled?: boolean;
  className?: string;
  id?: string;
}

const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  ({ options, value, onChange, placeholder = "Select an option", label, error, hint, disabled, className, id }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const selectId = id || label?.toLowerCase().replace(/\s+/g, "-");
    const errorId = error ? `${selectId}-error` : undefined;
    const hintId = hint ? `${selectId}-hint` : undefined;
    const listboxId = `${selectId}-listbox`;

    const selectedOption = options.find((opt) => opt.value === value);

    const handleSelect = (optionValue: string) => {
      onChange?.(optionValue);
      setIsOpen(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setIsOpen(!isOpen);
      }
    };

    return (
      <div className={cn("w-full", className)} ref={ref}>
        {label && (
          <label htmlFor={selectId} className="block text-sm font-medium text-dark-900 dark:text-light-100 mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          <button
            type="button"
            id={selectId}
            role="combobox"
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            aria-controls={listboxId}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={`${errorId || ""} ${hintId || ""}`.trim() || undefined}
            disabled={disabled}
            onClick={() => setIsOpen(!isOpen)}
            onKeyDown={handleKeyDown}
            className={cn(
              "flex h-11 w-full items-center justify-between rounded-xl border border-light-300 bg-white px-4 py-2.5 text-sm text-dark-950 transition-all duration-200",
              "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent",
              "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-light-100",
              "dark:border-dark-600 dark:bg-dark-800 dark:text-light-50",
              "dark:focus:ring-primary-500",
              error && "border-red-500 focus:ring-red-500",
              isOpen && "ring-2 ring-primary-500 border-transparent"
            )}
          >
            <span className={cn(!selectedOption && "text-light-400 dark:text-dark-500")}>
              {selectedOption?.label || placeholder}
            </span>
            <ChevronDown className={cn("h-4 w-4 text-light-500 transition-transform duration-200", isOpen && "rotate-180")} />
          </button>
          {isOpen && (
            <ul
              id={listboxId}
              role="listbox"
              className="absolute z-50 mt-2 max-h-60 w-full overflow-auto rounded-xl border border-light-200 bg-white py-1 shadow-large dark:border-dark-700 dark:bg-dark-800"
            >
              {options.map((option) => (
                <li
                  key={option.value}
                  role="option"
                  aria-selected={option.value === value}
                  onClick={() => !option.disabled && handleSelect(option.value)}
                  className={cn(
                    "flex items-center justify-between px-4 py-2.5 text-sm cursor-pointer transition-colors",
                    "hover:bg-light-100 dark:hover:bg-dark-700",
                    option.value === value && "bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300",
                    option.disabled && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <span>{option.label}</span>
                  {option.value === value && <Check className="h-4 w-4" />}
                </li>
              ))}
            </ul>
          )}
        </div>
        {error && (
          <p id={errorId} className="mt-1.5 text-sm text-red-600 dark:text-red-400" role="alert">
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={hintId} className="mt-1.5 text-sm text-light-500 dark:text-dark-400">
            {hint}
          </p>
        )}
      </div>
    );
  }
);
Select.displayName = "Select";

export { Select };