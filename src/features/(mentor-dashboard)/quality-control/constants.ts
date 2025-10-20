import { StudentFeedback } from "./types";

export const CARD_BG_COLORS = [
  "bg-[#FDF0E6]",
  "bg-[#FBEAEA]",
  "bg-[#EAEEFF]",
] as const;

export const CARD_BORDER_COLORS = [
  "border-[#F9D1B1]",
  "border-[#F1BFBF]",
  "border-[#BDC9FD]",
];

export const getCardBgColor = (index: number): string => {
  return CARD_BG_COLORS[index % CARD_BG_COLORS.length];
};

// Helper function to get border color based on index
export const getCardBorderColor = (index: number): string => {
  return CARD_BORDER_COLORS[index % CARD_BORDER_COLORS.length];
};

export const MOCK_STUDENT_FEEDBACK: Omit<
  StudentFeedback,
  "bgColor" | "borderColor"
>[] = [
  {
    id: "1",
    studentName: "Daniel Sarabia",
    studentAvatar: "/images/student-feedback.png",
    year: "Year 12",
    rating: 5,
    feedback:
      "Before Dentispark, I had no clue where to begin with my dental school reapplication.\n\nMy mentor helped me completely reshape my personal statement and prepare for interviews. I'm now starting dental school this fall!",
    date: "2024-09-15",
  },
  {
    id: "2",
    studentName: "Daniel Sarabia",
    studentAvatar: "/images/student-feedback.png",
    year: "Year 12",
    rating: 4,
    feedback:
      "Before Dentispark, I had no clue where to begin with my dental school reapplication.\n\nMy mentor helped me completely reshape my personal statement and prepare for interviews. I'm now starting dental school this fall!",
    date: "2024-09-14",
  },
  {
    id: "3",
    studentName: "Daniel Sarabia",
    studentAvatar: "/images/student-feedback.png",
    year: "Year 12",
    rating: 5,
    feedback:
      "Before Dentispark, I had no clue where to begin with my dental school reapplication.\n\nMy mentor helped me completely reshape my personal statement and prepare for interviews. I'm now starting dental school this fall!",
    date: "2024-09-13",
  },
  {
    id: "4",
    studentName: "Daniel Sarabia",
    studentAvatar: "/images/student-feedback.png",
    year: "Year 12",
    rating: 3,
    feedback:
      "Before Dentispark, I had no clue where to begin with my dental school reapplication.\n\nMy mentor helped me completely reshape my personal statement and prepare for interviews. I'm now starting dental school this fall!",
    date: "2024-09-12",
  },
  {
    id: "5",
    studentName: "Daniel Sarabia",
    studentAvatar: "/images/student-feedback.png",
    year: "Year 12",
    rating: 4,
    feedback:
      "Before Dentispark, I had no clue where to begin with my dental school reapplication.\n\nMy mentor helped me completely reshape my personal statement and prepare for interviews. I'm now starting dental school this fall!",
    date: "2024-09-11",
  },
  {
    id: "6",
    studentName: "Daniel Sarabia",
    studentAvatar: "/images/student-feedback.png",
    year: "Year 12",
    rating: 5,
    feedback:
      "Before Dentispark, I had no clue where to begin with my dental school reapplication.\n\nMy mentor helped me completely reshape my personal statement and prepare for interviews. I'm now starting dental school this fall!",
    date: "2024-09-10",
  },
];
