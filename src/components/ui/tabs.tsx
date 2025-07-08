"use client";

import * as React from "react";
import { cn } from "@/src/lib/utils";

interface TabsContextValue {
  value: string;
  onValueChange: (value: string) => void;
}

const TabsContext = React.createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error(
      "Tabs compound components cannot be rendered outside the Tabs component",
    );
  }
  return context;
}

interface TabsProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

function Tabs({
  value,
  defaultValue,
  onValueChange,
  children,
  className,
}: TabsProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue || "");

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const handleValueChange = React.useCallback(
    (newValue: string) => {
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    },
    [isControlled, onValueChange],
  );

  const contextValue = React.useMemo(
    () => ({
      value: currentValue,
      onValueChange: handleValueChange,
    }),
    [currentValue, handleValueChange],
  );

  return (
    <TabsContext.Provider value={contextValue}>
      <div className={cn("", className)}>{children}</div>
    </TabsContext.Provider>
  );
}

interface TabsListProps {
  children: React.ReactNode;
  className?: string;
}

function TabsList({ children, className }: TabsListProps) {
  return (
    <div
      className={cn(
        "bg-muted text-muted-foreground inline-flex h-9 items-center justify-center rounded-lg p-1",
        className,
      )}
    >
      {children}
    </div>
  );
}

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

function TabsTrigger({
  value,
  children,
  className,
  disabled,
}: TabsTriggerProps) {
  const { value: currentValue, onValueChange } = useTabsContext();
  const isSelected = currentValue === value;

  return (
    <button
      className={cn(
        "ring-offset-background focus-visible:ring-ring inline-flex items-center justify-center rounded-md px-3 py-1 text-sm font-medium whitespace-nowrap transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
        isSelected
          ? "bg-background text-foreground shadow"
          : "hover:bg-background/50 hover:text-foreground",
        className,
      )}
      onClick={() => !disabled && onValueChange(value)}
      disabled={disabled}
      type="button"
    >
      {children}
    </button>
  );
}

interface TabsContentProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

function TabsContent({ value, children, className }: TabsContentProps) {
  const { value: currentValue } = useTabsContext();
  const isSelected = currentValue === value;

  if (!isSelected) {
    return null;
  }

  return (
    <div
      className={cn(
        "ring-offset-background focus-visible:ring-ring mt-2 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
        className,
      )}
    >
      {children}
    </div>
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
