import { UK_DENTAL_SCHOOLS } from "../constants/universities";
import { University } from "../types";

export function getUniversityBySlug(slug: string): University | null {
  return (
    UK_DENTAL_SCHOOLS.find((university) => university.slug === slug) || null
  );
}

export function getAllUniversitySlugs(): string[] {
  return UK_DENTAL_SCHOOLS.map((university) => university.slug);
}
