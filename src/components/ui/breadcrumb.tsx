"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, ArrowLeft } from "lucide-react";
import { cn } from "@/src/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  isActive?: boolean;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  showBackButton?: boolean;
  onBack?: () => void;
  className?: string;
}

const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ items, showBackButton = true, onBack, className }, ref) => {
    const handleBack = () => {
      if (onBack) {
        onBack();
      } else {
        window.history.back();
      }
    };

    return (
      <nav
        ref={ref}
        aria-label="Breadcrumb"
        className={cn(
          "font-sora flex items-center space-x-2 text-xs md:text-sm",
          className,
        )}
      >
        {showBackButton && (
          <button
            onClick={handleBack}
            className="font-sora mr-4 flex items-center text-gray-500 transition-colors hover:text-gray-700"
          >
            <ArrowLeft
              size={20}
              className="border-greys-600 mr-2 rounded-sm border p-0.5"
            />
            Go Back
          </button>
        )}

        {/* Mobile: Simplified breadcrumb with dots */}
        <div className="font-sora flex items-center space-x-2 md:hidden">
          <span className="text-gray-400">...</span>
          <span className="text-gray-400">/</span>
          {items.map(
            (item, index) =>
              item.isActive && (
                <span key={index} className="text-primary font-medium">
                  {item.label}
                </span>
              ),
          )}
        </div>

        {/* Desktop: Full breadcrumb */}
        <ol className="font-sora hidden items-center space-x-2 md:flex">
          {items.map((item, index) => (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="text-greys-600 mr-2 h-4 w-4" />
              )}

              {item.href && !item.isActive ? (
                <Link
                  href={item.href}
                  className="text-greys-600 hover:text-greys-700 transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={cn(
                    item.isActive
                      ? "text-primary font-medium"
                      : "text-greys-600",
                  )}
                >
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    );
  },
);

Breadcrumb.displayName = "Breadcrumb";

export { Breadcrumb };
