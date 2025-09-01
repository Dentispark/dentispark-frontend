"use client";

import { Breadcrumb } from "@/src/components/ui/breadcrumb";
import { useRouter } from "next/navigation";

// Example 1: Basic breadcrumb with back button
export function BasicBreadcrumbExample() {
  const breadcrumbItems = [
    { label: "Overview", href: "/overview" },
    { label: "Popular Resources", isActive: true },
  ];

  return (
    <div className="p-4">
      <Breadcrumb items={breadcrumbItems} />
    </div>
  );
}

// Example 2: Multi-level breadcrumb
export function MultiLevelBreadcrumbExample() {
  const breadcrumbItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Overview", href: "/overview" },
    { label: "Resources", href: "/overview/resources" },
    { label: "Medical School Guide", isActive: true },
  ];

  return (
    <div className="p-4">
      <Breadcrumb items={breadcrumbItems} />
    </div>
  );
}

// Example 3: Breadcrumb without back button
export function NoBackButtonExample() {
  const breadcrumbItems = [
    { label: "Profile", href: "/profile" },
    { label: "Settings", isActive: true },
  ];

  return (
    <div className="p-4">
      <Breadcrumb items={breadcrumbItems} showBackButton={false} />
    </div>
  );
}

// Example 4: Breadcrumb with custom back handler
export function CustomBackHandlerExample() {
  const router = useRouter();

  const breadcrumbItems = [
    { label: "Community", href: "/community" },
    { label: "Discussion", isActive: true },
  ];

  const handleCustomBack = () => {
    // Custom logic before going back
    console.log("Custom back logic executed");
    router.push("/community");
  };

  return (
    <div className="p-4">
      <Breadcrumb items={breadcrumbItems} onBack={handleCustomBack} />
    </div>
  );
}

// Example 5: Breadcrumb with custom styling
export function StyledBreadcrumbExample() {
  const breadcrumbItems = [
    { label: "Guidance Hub", href: "/guidance-hub" },
    { label: "Application Timeline", isActive: true },
  ];

  return (
    <div className="p-4">
      <Breadcrumb
        items={breadcrumbItems}
        className="rounded-lg bg-gray-50 p-3"
      />
    </div>
  );
}

// Example 6: Dynamic breadcrumb (for use in actual pages)
export function DynamicBreadcrumbExample({
  currentPage,
  parentPage,
}: {
  currentPage: string;
  parentPage?: { label: string; href: string };
}) {
  const breadcrumbItems = [
    { label: "Overview", href: "/overview" },
    ...(parentPage ? [parentPage] : []),
    { label: currentPage, isActive: true },
  ];

  return (
    <div className="mb-6">
      <Breadcrumb items={breadcrumbItems} />
    </div>
  );
}
