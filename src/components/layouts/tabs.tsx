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

function AppTabs({
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

function AppTabsList({ children, className }: TabsListProps) {
  return (
    <div className={cn("flex items-center justify-start", className)}>
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

function AppTabsTrigger({
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
        "font-sora text-black-500 hover:text-black-600 focus-visible:ring-ring border-b-2 border-transparent bg-transparent px-4 py-3 text-base font-medium transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
        isSelected && "border-primary-300 text-black-600",
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

function AppTabsContent({ value, children, className }: TabsContentProps) {
  const { value: currentValue } = useTabsContext();
  const isSelected = currentValue === value;

  if (!isSelected) {
    return null;
  }

  return (
    <div
      className={cn(
        "focus-visible:ring-ring mt-0 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
        className,
      )}
    >
      {children}
    </div>
  );
}

export { AppTabs, AppTabsList, AppTabsTrigger, AppTabsContent };
