"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { cn } from "@/src/lib/utils";
import { Button } from "@/src/components/ui/button";
import { Breadcrumb } from "@/src/components/ui/breadcrumb";
import { useModal } from "@/src/hooks/use-modal";
import {
  QUIZ_SECTIONS,
  QuizSection,
  QuizQuestion,
  QuizOption,
} from "../constants/quiz-questions";

interface UserAnswer {
  questionId: string;
  selectedOptionId: string;
}

interface SectionScore {
  sectionId: string;
  score: number;
  totalQuestions: number;
  percentage: number;
}

interface QuizProps {
  className?: string;
}

export default function Quiz({ className }: QuizProps) {
  const router = useRouter();
  const { showModal, hideModal } = useModal();
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [quizStarted, setQuizStarted] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [sectionScores, setSectionScores] = useState<SectionScore[]>([]);

  const currentSection = QUIZ_SECTIONS[currentSectionIndex];
  const currentQuestion = currentSection?.questions[currentQuestionIndex];
  const totalQuestionsInSection = currentSection?.questions.length || 0;
  const progress = ((currentQuestionIndex + 1) / totalQuestionsInSection) * 100;

  // Calculate section score
  const calculateSectionScore = (sectionIndex: number): SectionScore => {
    const section = QUIZ_SECTIONS[sectionIndex];
    if (!section)
      return { sectionId: "", score: 0, totalQuestions: 0, percentage: 0 };

    const sectionQuestions = section.questions;
    const sectionAnswers = userAnswers.filter((answer) =>
      sectionQuestions.some((q) => q.id === answer.questionId),
    );

    let correctAnswers = 0;
    sectionAnswers.forEach((answer) => {
      const question = sectionQuestions.find((q) => q.id === answer.questionId);
      if (question) {
        const selectedOption = question.options.find(
          (opt) => opt.id === answer.selectedOptionId,
        );
        if (selectedOption?.isCorrect) {
          correctAnswers++;
        }
      }
    });

    const percentage = Math.round(
      (correctAnswers / sectionQuestions.length) * 100,
    );

    return {
      sectionId: section.id,
      score: correctAnswers,
      totalQuestions: sectionQuestions.length,
      percentage,
    };
  };

  // Show section completion modal
  const showSectionCompletionModal = (sectionScore: SectionScore) => {
    const isGoodScore = sectionScore.percentage >= 70;

    showModal({
      type: "section-completion",
      modalTitle: isGoodScore
        ? "You are doing great!"
        : "There's room for improvement.",
      bodyContent: (
        <span>
          You scored {isGoodScore ? "an impressive" : "a"}{" "}
          {sectionScore.percentage}%!
        </span>
      ),
      action: () => {
        if (isGoodScore) {
          // Move to next section
          if (currentSectionIndex < QUIZ_SECTIONS.length - 1) {
            setCurrentSectionIndex(currentSectionIndex + 1);
            setCurrentQuestionIndex(0);
            setSelectedOption("");
          } else {
            // Quiz completed
            router.push("/guidance-hub");
          }
        } else {
          // Retake section - reset to beginning of current section
          setCurrentQuestionIndex(0);
          setSelectedOption("");
          // Clear answers for current section
          const currentSectionQuestionIds =
            currentSection?.questions.map((q) => q.id) || [];
          const filteredAnswers = userAnswers.filter(
            (answer) => !currentSectionQuestionIds.includes(answer.questionId),
          );
          setUserAnswers(filteredAnswers);

          // Update localStorage
          if (typeof window !== "undefined") {
            try {
              localStorage.setItem(
                "quiz-answers",
                JSON.stringify(filteredAnswers),
              );
            } catch (error) {
              console.error("Error updating localStorage:", error);
            }
          }
        }
        setQuizStarted(true);
      },
      actionTitle: isGoodScore ? "Next" : "Retake",
      secondaryAction: () => {
        hideModal();
        router.push("/guidance-hub");
      },
      secondaryActionTitle: "Cancel",
    });
  };

  // Show section start modal
  const showSectionModal = (sectionIndex: number, sectionTitle: string) => {
    const isFirstSection = sectionIndex === 0;

    showModal({
      type: "section-start",
      modalTitle: isFirstSection
        ? "Know Before You Start"
        : `Starting: ${sectionTitle}`,
      bodyContent: (
        <span>
          {isFirstSection ? (
            <>
              You'll need to score at least 70% to pass this quiz.
              <br />
              Give it your best shot!
            </>
          ) : (
            <>
              You're about to start the {sectionTitle} section.
              <br />
              Answer all 8 questions to continue.
            </>
          )}
        </span>
      ),
      action: () => {
        setQuizStarted(true);
        setIsInitialized(true);
      },
      actionTitle: "Proceed",
      secondaryAction: () => {
        hideModal();
        router.push("/guidance-hub");
      },
      secondaryActionTitle: "Cancel",
    });
  };

  // Show modal on component mount and section changes
  useEffect(() => {
    // Prevent hydration mismatch by checking if we're on client side
    if (typeof window === "undefined") return;

    if (!isInitialized) {
      // Show modal for first section on initial load
      showSectionModal(currentSectionIndex, currentSection?.title || "");
    }
  }, []);

  // Show modal when section changes (except initial load)
  useEffect(() => {
    if (isInitialized && currentSectionIndex > 0) {
      setQuizStarted(false); // Pause quiz to show modal
      showSectionModal(currentSectionIndex, currentSection?.title || "");
    }
  }, [currentSectionIndex]); // Remove showModal and router from dependencies to prevent infinite loop

  // Load saved answers and scores on component mount
  useEffect(() => {
    if (!quizStarted || typeof window === "undefined") return;

    const savedAnswers = localStorage.getItem("quiz-answers");
    if (savedAnswers) {
      try {
        const parsedAnswers = JSON.parse(savedAnswers);
        setUserAnswers(parsedAnswers);
      } catch (error) {
        console.error("Error parsing saved answers:", error);
        localStorage.removeItem("quiz-answers");
      }
    }

    const savedScores = localStorage.getItem("quiz-section-scores");
    if (savedScores) {
      try {
        const parsedScores = JSON.parse(savedScores);
        setSectionScores(parsedScores);
      } catch (error) {
        console.error("Error parsing saved scores:", error);
        localStorage.removeItem("quiz-section-scores");
      }
    }
  }, [quizStarted]); // Only depend on quizStarted, not currentQuestion.id

  // Update selected option when question changes or answers are loaded
  useEffect(() => {
    if (!quizStarted) return;

    const currentAnswer = userAnswers.find(
      (answer) => answer.questionId === currentQuestion.id,
    );
    setSelectedOption(currentAnswer?.selectedOptionId || "");
  }, [currentQuestionIndex, userAnswers, currentQuestion.id, quizStarted]);

  const handleGoBack = () => {
    router.push("/guidance-hub");
  };

  const breadcrumbItems = [
    { label: "Guidance Hub", href: "/guidance-hub" },
    { label: "Basic UCAT Prep", isActive: true },
  ];

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);

    // Save answer
    const newAnswer: UserAnswer = {
      questionId: currentQuestion.id,
      selectedOptionId: optionId,
    };

    const updatedAnswers = [
      ...userAnswers.filter(
        (answer) => answer.questionId !== currentQuestion.id,
      ),
      newAnswer,
    ];

    setUserAnswers(updatedAnswers);

    // Save to localStorage (only on client side)
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("quiz-answers", JSON.stringify(updatedAnswers));
      } catch (error) {
        console.error("Error saving answers to localStorage:", error);
      }
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestionsInSection - 1) {
      // Move to next question in current section
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Section completed - calculate score and show completion modal
      const sectionScore = calculateSectionScore(currentSectionIndex);

      // Save section score
      const updatedScores = [...sectionScores];
      const existingScoreIndex = updatedScores.findIndex(
        (s) => s.sectionId === sectionScore.sectionId,
      );
      if (existingScoreIndex >= 0) {
        updatedScores[existingScoreIndex] = sectionScore;
      } else {
        updatedScores.push(sectionScore);
      }
      setSectionScores(updatedScores);

      // Save scores to localStorage
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem(
            "quiz-section-scores",
            JSON.stringify(updatedScores),
          );
        } catch (error) {
          console.error("Error saving section scores:", error);
        }
      }

      // Pause quiz and show completion modal
      setQuizStarted(false);
      showSectionCompletionModal(sectionScore);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else if (currentSectionIndex > 0) {
      // Go back to previous section's last question
      setCurrentSectionIndex(currentSectionIndex - 1);
      setCurrentQuestionIndex(
        QUIZ_SECTIONS[currentSectionIndex - 1].questions.length - 1,
      );
    }
  };

  const canGoNext = selectedOption !== "";
  const canGoPrev = currentQuestionIndex > 0 || currentSectionIndex > 0;

  // Don't render quiz content until initialized and user has started
  if (!isInitialized || !quizStarted) {
    return (
      <div className={`min-h-screen bg-white ${className || ""}`}>
        {/* Breadcrumb Navigation */}
        <div className="bg-white py-4">
          <Breadcrumb items={breadcrumbItems} onBack={handleGoBack} />
        </div>
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900">
              {!isInitialized
                ? "Preparing your quiz..."
                : currentSectionIndex > 0
                  ? `Starting ${currentSection?.title}...`
                  : "Preparing your quiz..."}
            </h2>
            <p className="mt-2 text-gray-600">
              {!isInitialized
                ? "Loading..."
                : currentSectionIndex > 0
                  ? "Get ready for the next section."
                  : "Please complete the setup to begin."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-white ${className || ""}`}>
      {/* Breadcrumb Navigation */}
      <div className="bg-white py-4">
        <Breadcrumb items={breadcrumbItems} onBack={handleGoBack} />
      </div>

      <div className="max-w-[1440px] py-8 lg:px-0">
        {/* Main Layout - Responsive: Stack on mobile, Side-by-side on desktop */}
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Section List - Top on mobile, Left sidebar on desktop */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:w-80 lg:flex-shrink-0"
          >
            <h1 className="mb-6 text-2xl font-semibold text-gray-900">
              Basic UCAT Prep
            </h1>

            {/* Question Sections List */}
            <div className="space-y-3">
              {QUIZ_SECTIONS.map(
                (section: QuizSection, sectionIndex: number) => (
                  <div
                    key={section.id}
                    className={cn(
                      "flex items-center space-x-3 rounded-lg p-4 transition-colors lg:rounded-none",
                      sectionIndex === currentSectionIndex
                        ? "border-primary bg-primary-100 border lg:border-t-0 lg:border-r-4 lg:border-b-0 lg:border-l-0"
                        : sectionIndex < currentSectionIndex
                          ? "border-primary bg-primary-100 border lg:border-t-0 lg:border-r-4 lg:border-b-0 lg:border-l-0"
                          : "border border-gray-200 bg-gray-50/50 lg:border-t-0 lg:border-r-0 lg:border-b lg:border-l-0",
                    )}
                  >
                    {/* Document Icon */}
                    <div className="flex h-8 w-8 items-center justify-center">
                      {sectionIndex < currentSectionIndex ? (
                        <svg
                          width="26"
                          height="26"
                          viewBox="0 0 26 26"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M18.7075 9.2925C18.8005 9.38537 18.8742 9.49566 18.9246 9.61706C18.9749 9.73846 19.0008 9.86858 19.0008 10C19.0008 10.1314 18.9749 10.2615 18.9246 10.3829C18.8742 10.5043 18.8005 10.6146 18.7075 10.7075L11.7075 17.7075C11.6146 17.8005 11.5043 17.8742 11.3829 17.9246C11.2615 17.9749 11.1314 18.0008 11 18.0008C10.8686 18.0008 10.7385 17.9749 10.6171 17.9246C10.4957 17.8742 10.3854 17.8005 10.2925 17.7075L7.29251 14.7075C7.10486 14.5199 6.99945 14.2654 6.99945 14C6.99945 13.7346 7.10486 13.4801 7.29251 13.2925C7.48015 13.1049 7.73464 12.9994 8.00001 12.9994C8.26537 12.9994 8.51987 13.1049 8.70751 13.2925L11 15.5863L17.2925 9.2925C17.3854 9.19952 17.4957 9.12576 17.6171 9.07544C17.7385 9.02512 17.8686 8.99921 18 8.99921C18.1314 8.99921 18.2615 9.02512 18.3829 9.07544C18.5043 9.12576 18.6146 9.19952 18.7075 9.2925ZM26 13C26 15.5712 25.2376 18.0846 23.8091 20.2224C22.3807 22.3603 20.3503 24.0265 17.9749 25.0104C15.5995 25.9944 12.9856 26.2518 10.4638 25.7502C7.94208 25.2486 5.6257 24.0105 3.80762 22.1924C1.98953 20.3743 0.751405 18.0579 0.249797 15.5362C-0.251811 13.0144 0.0056327 10.4006 0.989572 8.02512C1.97351 5.64968 3.63975 3.61935 5.77759 2.1909C7.91543 0.762437 10.4288 0 13 0C16.4467 0.00363977 19.7512 1.37445 22.1884 3.81163C24.6256 6.24882 25.9964 9.5533 26 13ZM24 13C24 10.8244 23.3549 8.69767 22.1462 6.88873C20.9375 5.07979 19.2195 3.66989 17.2095 2.83733C15.1995 2.00476 12.9878 1.78692 10.854 2.21136C8.72022 2.6358 6.76021 3.68345 5.22183 5.22183C3.68345 6.7602 2.63581 8.72022 2.21137 10.854C1.78693 12.9878 2.00477 15.1995 2.83733 17.2095C3.66989 19.2195 5.07979 20.9375 6.88873 22.1462C8.69767 23.3549 10.8244 24 13 24C15.9164 23.9967 18.7123 22.8367 20.7745 20.7745C22.8367 18.7123 23.9967 15.9164 24 13Z"
                            fill="#12AC75"
                          />
                        </svg>
                      ) : (
                        <svg
                          width="22"
                          height="26"
                          viewBox="0 0 22 26"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M21.7075 7.2925L14.7075 0.2925C14.6146 0.199666 14.5042 0.126052 14.3829 0.0758639C14.2615 0.0256758 14.1314 -0.000102986 14 3.09198e-07H2C1.46957 3.09198e-07 0.960859 0.210714 0.585786 0.585787C0.210714 0.960859 0 1.46957 0 2V24C0 24.5304 0.210714 25.0391 0.585786 25.4142C0.960859 25.7893 1.46957 26 2 26H20C20.5304 26 21.0391 25.7893 21.4142 25.4142C21.7893 25.0391 22 24.5304 22 24V8C22.0001 7.86864 21.9743 7.73855 21.9241 7.61715C21.8739 7.49576 21.8003 7.38544 21.7075 7.2925ZM15 3.41375L18.5863 7H15V3.41375ZM20 24H2V2H13V8C13 8.26522 13.1054 8.51957 13.2929 8.70711C13.4804 8.89464 13.7348 9 14 9H20V24Z"
                            fill="#12AC75"
                          />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">
                        0{sectionIndex + 1}: {section.title}
                      </div>
                      <div className="text-xs text-gray-500">
                        {section.description}
                      </div>
                    </div>
                  </div>
                ),
              )}
            </div>
          </motion.div>

          {/* Question Content Area - Below on mobile, Right side on desktop */}
          <div className="flex-1 lg:mx-auto lg:max-w-2xl">
            {/* Question Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-8"
            >
              <div className="bg-white lg:p-8">
                {/* Question Header */}
                <div className="mb-6 lg:mb-8">
                  <h2 className="mb-6 text-center text-xl font-semibold text-gray-900 lg:mb-12 lg:text-2xl">
                    {currentSection?.title}
                  </h2>
                  <h3 className="font-sora mb-3 text-base font-semibold text-gray-800 lg:mb-4">
                    {currentQuestion?.question}
                  </h3>
                  <p className="font-sora text-sm text-gray-600">
                    Choose only 1 answer:
                  </p>
                </div>

                {/* Options */}
                <div className="space-y-2">
                  <AnimatePresence mode="wait">
                    {currentQuestion?.options.map(
                      (option: QuizOption, index: number) => (
                        <motion.div
                          key={option.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          onClick={() => handleOptionSelect(option.id)}
                          className={cn(
                            "cursor-pointer rounded-[16px] border p-3 transition-all duration-300 hover:scale-[1.015] lg:p-5",
                            selectedOption === option.id
                              ? "border-primary bg-primary-100"
                              : "border-gray-200 bg-gray-50 hover:border-gray-300",
                          )}
                        >
                          <div className="flex items-start space-x-3">
                            <div
                              className={cn(
                                "mt-1 h-4 w-4 rounded-full border-2 transition-colors",
                                selectedOption === option.id
                                  ? "border-primary bg-primary"
                                  : "border-gray-300",
                              )}
                            >
                              {selectedOption === option.id && (
                                <div className="h-full w-full scale-50 rounded-full bg-white" />
                              )}
                            </div>
                            <div className="font-sora flex-1 text-sm text-gray-800 lg:text-base">
                              {option.text}
                            </div>
                          </div>
                        </motion.div>
                      ),
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>

            {/* Progress Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-6 flex items-center justify-center gap-4"
            >
              <div className="bg-primary-100 h-2 w-48 rounded-full">
                <motion.div
                  className="bg-primary h-full rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>

              <span className="font-sora text-sm font-medium text-gray-600">
                {currentQuestionIndex + 1}/{totalQuestionsInSection}
              </span>
            </motion.div>

            {/* Navigation Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-center justify-center gap-4"
            >
              <Button
                variant="outline"
                onClick={handlePrev}
                disabled={!canGoPrev}
                className="hover:text-primary border-none px-6 hover:bg-white lg:px-8"
              >
                Prev
              </Button>

              <Button
                onClick={handleNext}
                disabled={!canGoNext}
                className="px-8 lg:px-16"
              >
                {currentQuestionIndex === totalQuestionsInSection - 1
                  ? currentSectionIndex === QUIZ_SECTIONS.length - 1
                    ? "Finish"
                    : "Next Section"
                  : "Next"}
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
