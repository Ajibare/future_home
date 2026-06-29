"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionContextValue {
  openItems: Set<string>;
  toggle: (value: string) => void;
  type: "single" | "multiple";
}

const AccordionContext = React.createContext<AccordionContextValue | null>(null);

function useAccordionContext() {
  const context = React.useContext(AccordionContext);
  if (!context) throw new Error("Accordion components must be used within an Accordion provider");
  return context;
}

interface AccordionProps {
  type?: "single" | "multiple";
  defaultValue?: string | string[];
  children: React.ReactNode;
  className?: string;
}

const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  ({ type = "single", defaultValue, children, className }, ref) => {
    const initialOpen = React.useMemo(() => {
      if (!defaultValue) return new Set<string>();
      if (Array.isArray(defaultValue)) return new Set(defaultValue);
      return new Set([defaultValue]);
    }, [defaultValue]);

    const [openItems, setOpenItems] = React.useState<Set<string>>(initialOpen);

    const toggle = React.useCallback(
      (value: string) => {
        setOpenItems((prev) => {
          const next = new Set(prev);
          if (next.has(value)) {
            next.delete(value);
          } else {
            if (type === "single") next.clear();
            next.add(value);
          }
          return next;
        });
      },
      [type]
    );

    return (
      <AccordionContext.Provider value={{ openItems, toggle, type }}>
        <div ref={ref} className={cn("divide-y divide-light-200 dark:divide-dark-700", className)}>
          {children}
        </div>
      </AccordionContext.Provider>
    );
  }
);
Accordion.displayName = "Accordion";

interface AccordionItemProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ value, children, className }, ref) => {
    return (
      <div ref={ref} className={cn("py-2", className)} data-value={value}>
        {React.Children.map(children, (child) =>
          React.isValidElement(child)
            ? React.cloneElement(child as React.ReactElement<{ itemValue: string }>, {
                itemValue: value,
              })
            : child
        )}
      </div>
    );
  }
);
AccordionItem.displayName = "AccordionItem";

interface AccordionTriggerProps {
  itemValue: string;
  children: React.ReactNode;
  className?: string;
}

const AccordionTrigger = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ itemValue, children, className }, ref) => {
    const { openItems, toggle } = useAccordionContext();
    const isOpen = openItems.has(itemValue);

    return (
      <button
        ref={ref}
        onClick={() => toggle(itemValue)}
        aria-expanded={isOpen}
        className={cn(
          "flex w-full items-center justify-between py-4 text-left font-medium transition-all duration-200",
          "hover:text-primary-700 dark:hover:text-primary-400",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-lg",
          className
        )}
      >
        <span>{children}</span>
        <ChevronDown
          className={cn(
            "h-5 w-5 text-light-500 transition-transform duration-300",
            isOpen && "rotate-180"
          )}
        />
      </button>
    );
  }
);
AccordionTrigger.displayName = "AccordionTrigger";

interface AccordionContentProps {
  itemValue: string;
  children: React.ReactNode;
  className?: string;
}

const AccordionContent = React.forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ itemValue, children, className }, ref) => {
    const { openItems } = useAccordionContext();
    const isOpen = openItems.has(itemValue);

    return (
      <div
        ref={ref}
        className={cn(
          "overflow-hidden transition-all duration-300",
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className={cn("pb-4 text-light-600 dark:text-dark-300", className)}>
          {children}
        </div>
      </div>
    );
  }
);
AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };