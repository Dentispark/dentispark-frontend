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

export interface QuizSection {
  id: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
}

export const QUIZ_SECTIONS: QuizSection[] = [
  {
    id: "verbal-reasoning",
    title: "Verbal reasoning",
    description: "Quiz - 8 Questions",
    questions: [
      {
        id: "vr-1",
        question: "Why does liquid water have such a high heat capacity?",
        options: [
          {
            id: "a",
            text: "The curved surface is a convex meniscus which has formed because of surface tension.",
            isCorrect: true,
          },
          {
            id: "b",
            text: "The curved surface is a concave meniscus which has formed because of surface tension.",
            isCorrect: false,
          },
          {
            id: "c",
            text: "The curved surface is a convex meniscus which has formed because of capillary action.",
            isCorrect: false,
          },
          {
            id: "d",
            text: "The curved surface is a concave meniscus which has formed because of capillary action.",
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
        id: "vr-2",
        question:
          "Which statement best describes the relationship between molecular structure and boiling point?",
        options: [
          {
            id: "a",
            text: "Molecules with stronger intermolecular forces have higher boiling points.",
            isCorrect: true,
          },
          {
            id: "b",
            text: "Smaller molecules always have higher boiling points than larger ones.",
            isCorrect: false,
          },
          {
            id: "c",
            text: "Polar molecules always have lower boiling points than nonpolar molecules.",
            isCorrect: false,
          },
          {
            id: "d",
            text: "Molecular structure has no effect on boiling point.",
            isCorrect: false,
          },
          {
            id: "e",
            text: "Only ionic compounds can have high boiling points.",
            isCorrect: false,
          },
        ],
      },
      {
        id: "vr-3",
        question: "What is the primary reason why oil and water do not mix?",
        options: [
          {
            id: "a",
            text: "Different densities prevent mixing.",
            isCorrect: false,
          },
          {
            id: "b",
            text: "Oil molecules are polar while water molecules are nonpolar.",
            isCorrect: false,
          },
          {
            id: "c",
            text: "Water molecules are polar while oil molecules are nonpolar.",
            isCorrect: true,
          },
          {
            id: "d",
            text: "Oil has a higher boiling point than water.",
            isCorrect: false,
          },
          {
            id: "e",
            text: "Water molecules are too small to interact with oil molecules.",
            isCorrect: false,
          },
        ],
      },
      {
        id: "vr-4",
        question:
          "Which factor most significantly affects the rate of enzyme-catalyzed reactions?",
        options: [
          {
            id: "a",
            text: "The color of the enzyme.",
            isCorrect: false,
          },
          {
            id: "b",
            text: "The temperature and pH of the environment.",
            isCorrect: true,
          },
          {
            id: "c",
            text: "The age of the enzyme preparation.",
            isCorrect: false,
          },
          {
            id: "d",
            text: "The brand of laboratory equipment used.",
            isCorrect: false,
          },
          {
            id: "e",
            text: "The time of day the reaction is performed.",
            isCorrect: false,
          },
        ],
      },
      {
        id: "vr-5",
        question:
          "What happens to the solubility of most solid solutes when temperature increases?",
        options: [
          {
            id: "a",
            text: "Solubility decreases significantly.",
            isCorrect: false,
          },
          {
            id: "b",
            text: "Solubility remains completely unchanged.",
            isCorrect: false,
          },
          {
            id: "c",
            text: "Solubility generally increases.",
            isCorrect: true,
          },
          {
            id: "d",
            text: "Solubility becomes infinite.",
            isCorrect: false,
          },
          {
            id: "e",
            text: "The solute decomposes instead of dissolving.",
            isCorrect: false,
          },
        ],
      },
      {
        id: "vr-6",
        question: "Which statement about acids and bases is most accurate?",
        options: [
          {
            id: "a",
            text: "All acids taste sour and all bases taste bitter.",
            isCorrect: false,
          },
          {
            id: "b",
            text: "Acids release hydrogen ions (H+) in aqueous solution.",
            isCorrect: true,
          },
          {
            id: "c",
            text: "Bases always contain sodium or potassium.",
            isCorrect: false,
          },
          {
            id: "d",
            text: "Strong acids and strong bases cannot be neutralized.",
            isCorrect: false,
          },
          {
            id: "e",
            text: "pH values above 14 indicate extremely strong acids.",
            isCorrect: false,
          },
        ],
      },
      {
        id: "vr-7",
        question: "What is the primary function of hemoglobin in the blood?",
        options: [
          {
            id: "a",
            text: "To fight infections and diseases.",
            isCorrect: false,
          },
          {
            id: "b",
            text: "To help blood clot when injuries occur.",
            isCorrect: false,
          },
          {
            id: "c",
            text: "To transport oxygen from lungs to body tissues.",
            isCorrect: true,
          },
          {
            id: "d",
            text: "To regulate blood pressure throughout the body.",
            isCorrect: false,
          },
          {
            id: "e",
            text: "To produce new red blood cells.",
            isCorrect: false,
          },
        ],
      },
      {
        id: "vr-8",
        question:
          "Which process is responsible for the formation of fossil fuels?",
        options: [
          {
            id: "a",
            text: "Rapid crystallization of minerals under high pressure.",
            isCorrect: false,
          },
          {
            id: "b",
            text: "Decomposition of organic matter over millions of years.",
            isCorrect: true,
          },
          {
            id: "c",
            text: "Chemical reactions between atmospheric gases.",
            isCorrect: false,
          },
          {
            id: "d",
            text: "Volcanic activity creating carbon compounds.",
            isCorrect: false,
          },
          {
            id: "e",
            text: "Solar radiation converting water into hydrocarbons.",
            isCorrect: false,
          },
        ],
      },
    ],
  },
  {
    id: "decision-making",
    title: "Decision making",
    description: "Quiz - 8 Questions",
    questions: [
      // Adding 8 decision making questions...
      {
        id: "dm-1",
        question:
          "A patient presents with chest pain. What is the most appropriate initial action?",
        options: [
          { id: "a", text: "Immediately perform surgery.", isCorrect: false },
          {
            id: "b",
            text: "Conduct a thorough assessment including vital signs and history.",
            isCorrect: true,
          },
          {
            id: "c",
            text: "Prescribe pain medication without further evaluation.",
            isCorrect: false,
          },
          {
            id: "d",
            text: "Discharge the patient immediately.",
            isCorrect: false,
          },
          {
            id: "e",
            text: "Wait for the patient's symptoms to resolve naturally.",
            isCorrect: false,
          },
        ],
      },
      // ... continuing with more questions to reach 8 total
    ],
  },
];
