export interface Student {
  id: string;
  name: string;
  year: string;
  avatar: string;
  preferredSchool: string;
  ucatScore: string;
  aLevelScore: string;
  category: "all" | "personal-statement" | "ucat";
}

export type FilterTab = "all" | "personal-statement" | "ucat";
