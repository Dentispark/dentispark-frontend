"use client";

import { Breadcrumb } from "@/src/components/ui/breadcrumb";
import AllPopularResources from "@/src/features/(dashboard)/overview/components/all-popular-resources";

export default function PopularResourcesPage() {
  const breadcrumbItems = [
    { label: "Overview", href: "/overview" },
    { label: "Popular Resources", isActive: true },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden">
      <div className="border-b py-6">
        <div className="mb-6">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        <div className="w-full max-w-full overflow-hidden">
          <AllPopularResources />
        </div>
      </div>
    </div>
  );
}
