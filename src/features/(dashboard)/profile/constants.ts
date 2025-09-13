import type { SelectOption } from "./types";

export const yearOptions: SelectOption[] = [
  { value: "year-10", label: "Year 10" },
  { value: "year-11", label: "Year 11" },
  { value: "year-12", label: "Year 12" },
  { value: "year-13", label: "Year 13" },
];

export const gradeOptions: SelectOption[] = [
  { value: "A", label: "A" },
  { value: "B", label: "B" },
  { value: "C", label: "C" },
];

export const gcseOptions: SelectOption[] = [
  { value: "A", label: "A" },
  { value: "B", label: "B" },
  { value: "C", label: "C" },
];

export const defaultAcademicData = {
  yearOfStudy: "year-12",
  gcseResult: "7",
  ucatScore: "Unavailable",
  biologyGrade: "A",
  chemistryGrade: "B",
  otherSubject: "Mathematics",
  otherSubjectGrade: "A",
};
