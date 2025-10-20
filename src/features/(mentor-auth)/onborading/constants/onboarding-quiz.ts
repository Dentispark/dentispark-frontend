export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
}

export const ONBOARDING_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "q1",
    question: "What is the primary goal of mentoring in Dentispark?",
    options: [
      {
        id: "a",
        text: "To provide academic support and career guidance to aspiring dental students.",
        isCorrect: true,
      },
      {
        id: "b",
        text: "To only help students with UCAT preparation.",
        isCorrect: false,
      },
      {
        id: "c",
        text: "To replace formal education with mentorship.",
        isCorrect: false,
      },
      {
        id: "d",
        text: "To provide financial support to students.",
        isCorrect: false,
      },
      {
        id: "e",
        text: "All of the above is correct",
        isCorrect: false,
      },
    ],
  },
  {
    id: "q2",
    question:
      "How should you handle a mentee who is struggling with motivation?",
    options: [
      {
        id: "a",
        text: "Ignore the issue and focus only on academic content.",
        isCorrect: false,
      },
      {
        id: "b",
        text: "Listen empathetically, understand their challenges, and provide encouragement while setting achievable goals.",
        isCorrect: true,
      },
      {
        id: "c",
        text: "Tell them dentistry might not be for them.",
        isCorrect: false,
      },
      {
        id: "d",
        text: "Compare them to other more motivated mentees.",
        isCorrect: false,
      },
      {
        id: "e",
        text: "End the mentorship relationship immediately.",
        isCorrect: false,
      },
    ],
  },
  {
    id: "q3",
    question:
      "Which of the following best describes cultural sensitivity in mentoring?",
    options: [
      {
        id: "a",
        text: "Treating all mentees exactly the same regardless of background.",
        isCorrect: false,
      },
      {
        id: "b",
        text: "Acknowledging and respecting diverse backgrounds, experiences, and perspectives while providing inclusive support.",
        isCorrect: true,
      },
      {
        id: "c",
        text: "Only mentoring students from similar cultural backgrounds.",
        isCorrect: false,
      },
      {
        id: "d",
        text: "Avoiding discussions about cultural differences.",
        isCorrect: false,
      },
      {
        id: "e",
        text: "Making assumptions based on stereotypes.",
        isCorrect: false,
      },
    ],
  },
  {
    id: "q4",
    question:
      "What is an appropriate boundary in a mentor-mentee relationship?",
    options: [
      {
        id: "a",
        text: "Sharing personal phone numbers and socializing outside of mentoring sessions.",
        isCorrect: false,
      },
      {
        id: "b",
        text: "Maintaining professional communication through the platform and scheduled sessions.",
        isCorrect: true,
      },
      {
        id: "c",
        text: "Becoming close friends with your mentee on social media.",
        isCorrect: false,
      },
      {
        id: "d",
        text: "Meeting mentees in private locations without platform knowledge.",
        isCorrect: false,
      },
      {
        id: "e",
        text: "Discussing personal problems instead of focusing on the mentee's goals.",
        isCorrect: false,
      },
    ],
  },
  {
    id: "q5",
    question:
      "How should you respond if a mentee asks for help with something outside your expertise?",
    options: [
      {
        id: "a",
        text: "Provide advice anyway even if you're not certain about the answer.",
        isCorrect: false,
      },
      {
        id: "b",
        text: "Be honest about your limitations and direct them to appropriate resources or other mentors who can help.",
        isCorrect: true,
      },
      {
        id: "c",
        text: "Ignore the question completely.",
        isCorrect: false,
      },
      {
        id: "d",
        text: "Make up an answer to appear knowledgeable.",
        isCorrect: false,
      },
      {
        id: "e",
        text: "Tell them to figure it out themselves.",
        isCorrect: false,
      },
    ],
  },
];
