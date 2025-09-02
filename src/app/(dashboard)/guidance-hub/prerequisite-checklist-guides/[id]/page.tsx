import GuideDetail from "@/src/features/(dashboard)/guidance-hub/components/guide-detail";

// Mock guide data - in real app this would come from API/database
const mockGuides = [
  {
    id: "1",
    title: "M7 MBA Programs – What They Are & How to Get In",
    description:
      "An expert admissions coach details how to get into an elite M7 business school with ways to stand out in your application and showcase leadership potential.",
    date: "May 23, 2023",
    image: "/images/resource-1.png",
    category: "MBA",
  },
  {
    id: "2",
    title: "Mastering the GMAT: Strategies for Success",
    description:
      "Discover effective study techniques and time management tips to ace the GMAT, enhancing your chances of admission to top business schools.",
    date: "June 15, 2023",
    image: "/images/resource-2.png",
    category: "GMAT",
  },
  {
    id: "3",
    title: "Mastering the GMAT: Strategies for Success",
    description:
      "Discover effective study techniques and time management tips to ace the GMAT, enhancing your chances of admission to top business schools.",
    date: "June 15, 2023",
    image: "/images/resource-3.png",
    category: "GMAT",
  },
];

interface GuidePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function GuidePage({ params }: GuidePageProps) {
  // Await the params as required by Next.js 15
  const { id } = await params;

  // Find the guide by ID
  const guide = mockGuides.find((guide) => guide.id === id);

  // If guide not found, you might want to redirect or show 404
  if (!guide) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-semibold">Guide Not Found</h1>
          <p className="text-gray-600">
            The guide you&apos;re looking for doesn&apos;t exist.
          </p>
        </div>
      </div>
    );
  }

  return <GuideDetail />;
}
