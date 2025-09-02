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

export const defaultProfileData = {
  fullName: "John Doe",
  email: "johndoe@dentispark.co.uk",
  phoneNumber: "",
  linkedinUrl: "",
  biography:
    "Hi there! 👋 I'm John Doe, an AI enthusiast and fitness aficionado. When I'm not crunching numbers or optimizing algorithms, you can find me hitting the gym.",
};

export const defaultAcademicData = {
  yearOfStudy: "year-12",
  gcseResult: "7",
  ucatScore: "Unavailable",
  biologyGrade: "A",
  chemistryGrade: "B",
  otherSubject: "Mathematics",
  otherSubjectGrade: "A",
};
