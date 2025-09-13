import { notFound } from "next/navigation";
import { UniversityProfile } from "@/src/features/(dashboard)/university-hub/components";
import { getUniversityBySlug } from "@/src/features/(dashboard)/university-hub/utils/get-university";

interface UniversityPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function UniversityPage({ params }: UniversityPageProps) {
  const { slug } = await params;
  const university = getUniversityBySlug(slug);

  if (!university) {
    notFound();
  }

  return <UniversityProfile university={university} />;
}
