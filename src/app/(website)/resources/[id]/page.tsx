import { notFound } from "next/navigation";
import { ResourceDetail } from "@/src/features/(website)/resources/components";
import { getResourceById } from "@/src/features/(website)/resources/data/resources";

interface ResourcePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ResourcePage({ params }: ResourcePageProps) {
  const { id } = await params;
  const resource = getResourceById(id);

  if (!resource) {
    notFound();
  }

  return <ResourceDetail resource={resource} />;
}
