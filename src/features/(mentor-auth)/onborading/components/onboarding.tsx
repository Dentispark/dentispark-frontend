"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/src/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/src/components/ui/radio-group";
import { cn } from "@/src/lib/utils";
import { useModal } from "@/src/hooks/use-modal";
import { ONBOARDING_QUIZ_QUESTIONS } from "../constants/onboarding-quiz";
import type { OnboardingFormProps } from "../types";

interface UserAnswer {
  questionId: string;
  selectedOptionId: string;
}

interface TrainingVideo {
  id: string;
  title: string;
  duration: string;
  thumbnail: string;
}

const TRAINING_VIDEOS: TrainingVideo[] = [
  {
    id: "platform-navigation",
    title: "Platform navigation",
    duration: "4min",
    thumbnail: "/images/mentor-img-1.png",
  },
  {
    id: "mentoring-principles",
    title: "Mentoring principles",
    duration: "5min",
    thumbnail: "/images/mentor-img-2.png",
  },
  {
    id: "cultural-sensitivity",
    title: "Cultural sensitivity",
    duration: "4min",
    thumbnail: "/images/mentor-img-1.png",
  },
];

export function Onboarding({
  onBackAction,
  isLoading = false,
}: OnboardingFormProps) {
  const router = useRouter();
  const { showModal, hideModal } = useModal();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [quizStarted, setQuizStarted] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const currentQuestion = ONBOARDING_QUIZ_QUESTIONS[currentQuestionIndex];
  const totalQuestions = ONBOARDING_QUIZ_QUESTIONS.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  // Show quiz completion modal
  const showQuizCompletionModal = useCallback(
    (score: number) => {
      const isGoodScore = score >= 70;

      showModal({
        type: "section-completion",
        modalTitle: isGoodScore
          ? "Impressive attempt!"
          : "There's room for improvement.",
        bodyContent: (
          <span>
            You scored {isGoodScore ? "an impressive" : "a"} {score}%!
          </span>
        ),
        action: () => {
          if (isGoodScore) {
            // Redirect to mentor login page
            hideModal();
            router.push("/mentor/login");
          } else {
            // Reset quiz to retake
            setCurrentQuestionIndex(0);
            setUserAnswers([]);
            setSelectedOption("");
            setQuizStarted(true);
            hideModal();
          }
        },
        actionTitle: isGoodScore ? "Proceed" : "Retake",
        secondaryAction: () => {
          hideModal();
        },
        secondaryActionTitle: "Cancel",
      });
    },
    [showModal, hideModal, router],
  );

  // Show "Know Before You Start" modal
  const showStartModal = useCallback(() => {
    showModal({
      type: "section-start",
      modalTitle: "Know Before You Start",
      bodyContent: (
        <span>
          You&apos;ll need to score at least 70% to pass this quiz.
          <br />
          Give it your best shot!
        </span>
      ),
      action: () => {
        setQuizStarted(true);
        setIsInitialized(true);
        hideModal();
      },
      actionTitle: "Proceed",
      secondaryAction: () => {
        hideModal();
        if (onBackAction) {
          onBackAction();
        }
      },
      secondaryActionTitle: "Cancel",
    });
  }, [showModal, hideModal, onBackAction]);

  // Show modal on component mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!isInitialized) {
      showStartModal();
    }
  }, [isInitialized, showStartModal]);

  // Set selected option when navigating to a previously answered question
  useEffect(() => {
    if (!quizStarted) return;

    const existingAnswer = userAnswers.find(
      (answer) => answer.questionId === currentQuestion.id,
    );

    if (existingAnswer) {
      setSelectedOption(existingAnswer.selectedOptionId);
    } else {
      setSelectedOption("");
    }
  }, [currentQuestionIndex, currentQuestion.id, userAnswers, quizStarted]);

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);

    // Update or add the answer
    setUserAnswers((prev) => {
      const filtered = prev.filter(
        (answer) => answer.questionId !== currentQuestion.id,
      );
      return [
        ...filtered,
        {
          questionId: currentQuestion.id,
          selectedOptionId: optionId,
        },
      ];
    });
  };

  const handleNext = () => {
    if (!selectedOption) {
      toast.error("Please select an answer before proceeding");
      return;
    }

    if (currentQuestionIndex < totalQuestions - 1) {
      // Move to next question
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption("");

      // Check if next question has been answered
      const nextAnswer = userAnswers.find(
        (answer) =>
          answer.questionId ===
          ONBOARDING_QUIZ_QUESTIONS[currentQuestionIndex + 1].id,
      );
      if (nextAnswer) {
        setSelectedOption(nextAnswer.selectedOptionId);
      }
    } else {
      // Quiz completed - calculate score
      let correctAnswers = 0;
      userAnswers.forEach((answer) => {
        const question = ONBOARDING_QUIZ_QUESTIONS.find(
          (q) => q.id === answer.questionId,
        );
        if (question) {
          const selectedOpt = question.options.find(
            (opt) => opt.id === answer.selectedOptionId,
          );
          if (selectedOpt?.isCorrect) {
            correctAnswers++;
          }
        }
      });

      const percentage = Math.round((correctAnswers / totalQuestions) * 100);

      // Show completion modal
      showQuizCompletionModal(percentage);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);

      // Load the previous question's answer
      const prevAnswer = userAnswers.find(
        (answer) =>
          answer.questionId ===
          ONBOARDING_QUIZ_QUESTIONS[currentQuestionIndex - 1].id,
      );
      if (prevAnswer) {
        setSelectedOption(prevAnswer.selectedOptionId);
      } else {
        setSelectedOption("");
      }
    }
  };

  const canGoNext = selectedOption !== "";
  const canGoPrev = currentQuestionIndex > 0;

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  // Don't render quiz content until user starts
  if (!quizStarted) {
    return (
      <motion.div
        className="mx-auto max-w-4xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900">
              Preparing your training...
            </h2>
            <p className="mt-2 text-gray-600">Please wait...</p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="mx-auto max-w-4xl"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="space-y-10">
        {/* Training Portal Section */}
        <div className="space-y-6">
          <div>
            <h2 className="text-primary mb-2 text-2xl font-semibold">
              Training Portal
            </h2>
            <p className="text-sm text-gray-600">
              Watch the videos and take the quiz
            </p>
          </div>

          {/* Video Grid */}
          <div className="grid grid-cols-3 gap-6">
            {TRAINING_VIDEOS.map((video) => (
              <div key={video.id} className="space-y-3">
                <div className="bg-muted group relative aspect-video overflow-hidden rounded-2xl">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="h-full w-full object-cover"
                  />
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-all group-hover:bg-black/30">
                    <button
                      type="button"
                      className="bg-primary flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-transform hover:scale-110"
                    >
                      <Play className="h-5 w-5 fill-white text-white" />
                    </button>
                  </div>
                </div>
                <div className="space-y-1">
                  <h3 className="font-sora text-sm font-medium text-gray-900">
                    {video.title}
                  </h3>
                  <p className="font-sora text-xs text-gray-500">
                    {video.duration}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quiz Section */}
        <div className="space-y-6">
          <h2 className="text-primary text-2xl font-semibold">
            Quiz: {totalQuestions} Questions
          </h2>

          {/* Question Card */}
          <div className="font-sora space-y-6 rounded-2xl border-gray-200 bg-white py-8">
            <div>
              <h3 className="mb-4 text-lg font-semibold text-gray-900">
                {currentQuestionIndex + 1}. {currentQuestion.question}
              </h3>
              <p className="text-sm text-gray-600">Choose only 1 answer:</p>
            </div>

            {/* Options */}
            <RadioGroup
              value={selectedOption}
              onValueChange={handleOptionSelect}
              className="space-y-3"
            >
              {currentQuestion.options.map((option) => (
                <label
                  key={option.id}
                  htmlFor={option.id}
                  className={cn(
                    "flex cursor-pointer items-start space-x-3 rounded-xl border p-4 transition-all",
                    selectedOption === option.id
                      ? "border-primary-200 bg-primary-100"
                      : "border-gray-200 bg-gray-50 hover:border-gray-300",
                  )}
                >
                  <RadioGroupItem
                    value={option.id}
                    id={option.id}
                    className="mt-0.5"
                  />
                  <span className="flex-1 text-sm text-gray-900">
                    {option.text}
                  </span>
                </label>
              ))}
            </RadioGroup>

            {/* Progress and Navigation */}
            <div className="space-y-4 pt-6">
              {/* Progress Bar */}
              <div className="flex items-center justify-center">
                <div className="flex items-center space-x-3">
                  <div className="bg-primary-100 h-2 w-52 overflow-hidden rounded-full">
                    <div
                      className="bg-primary h-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <span className="font-sora text-sm font-medium text-gray-900">
                    {currentQuestionIndex + 1}/{totalQuestions}
                  </span>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex items-center justify-center space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrev}
                  disabled={!canGoPrev || isLoading}
                  className="min-w-[120px]"
                >
                  Prev
                </Button>
                <Button
                  type="button"
                  onClick={handleNext}
                  disabled={!canGoNext || isLoading}
                  className="bg-primary min-w-[120px]"
                >
                  {currentQuestionIndex < totalQuestions - 1
                    ? "Next"
                    : "Finish"}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between pt-6">
          {onBackAction && (
            <Button
              type="button"
              variant="outline"
              onClick={onBackAction}
              disabled={isLoading}
              className="px-8 py-3"
            >
              Back
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
