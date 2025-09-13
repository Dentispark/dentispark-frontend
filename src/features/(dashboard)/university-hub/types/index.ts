export interface University {
  id: string;
  name: string;
  location: string;
  fullAddress: string;
  image: string;
  admissionStatus: "open" | "closed";
  slug: string;
}

export interface UniversityCardProps {
  university: University;
  onViewProfile: (university: University) => void;
}

export interface CompareSchoolsProps {
  selectedCount?: number;
  onCompare?: () => void;
}
