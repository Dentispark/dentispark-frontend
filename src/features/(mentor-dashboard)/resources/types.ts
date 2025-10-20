export interface MentorResource {
  id: string;
  title: string;
  description: string;
  date: string;
  image: string;
  category: string;
}

export interface ResourcesPageProps {
  className?: string;
}

export interface ResourceCardProps {
  resource: MentorResource;
  index?: number;
}
