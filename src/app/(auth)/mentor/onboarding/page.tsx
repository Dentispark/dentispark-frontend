"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import {
  type OnboardingStep,
  type OnboardingState,
  ONBOARDING_STEPS,
} from "@/src/features/(mentor-auth)/onborading/types";
import { AccountRegistration } from "@/src/features/(mentor-auth)/onborading/components/account-registration";
import { ProfileRegistration } from "@/src/features/(mentor-auth)/onborading/components/profile-registration";
import { Onboarding } from "@/src/features/(mentor-auth)/onborading/components/onboarding";

export default function MentorOnboardingPage() {
  const [onboardingState, setOnboardingState] = useState<OnboardingState>({
    currentStep: "account-registration",
    completedSteps: [],
    formData: {},
  });

  const currentStepConfig = ONBOARDING_STEPS.find(
    (step) => step.id === onboardingState.currentStep,
  );

  const handleStepComplete = (stepId: OnboardingStep, data: unknown) => {
    setOnboardingState((prev) => {
      const newCompletedSteps = [...prev.completedSteps];
      if (!newCompletedSteps.includes(stepId)) {
        newCompletedSteps.push(stepId);
      }

      // Determine next step
      let nextStep: OnboardingStep | null = null;
      if (stepId === "account-registration") {
        nextStep = "profile-registration";
      } else if (stepId === "profile-registration") {
        nextStep = "onboarding";
      } else if (stepId === "onboarding") {
        // Onboarding complete - could redirect to dashboard or success page
        nextStep = null;
      }

      // Map step ID to form data key
      let formDataKey: string;
      if (stepId === "account-registration") {
        formDataKey = "accountRegistration";
      } else if (stepId === "profile-registration") {
        formDataKey = "profileVerification";
      } else {
        formDataKey = "onboarding";
      }

      return {
        ...prev,
        currentStep: nextStep || stepId,
        completedSteps: newCompletedSteps,
        formData: {
          ...prev.formData,
          [formDataKey]: data,
        },
      };
    });
  };

  const handleStepBack = () => {
    setOnboardingState((prev) => {
      let previousStep: OnboardingStep | null = null;
      if (prev.currentStep === "profile-registration") {
        previousStep = "account-registration";
      } else if (prev.currentStep === "onboarding") {
        previousStep = "profile-registration";
      }

      return {
        ...prev,
        currentStep: previousStep || prev.currentStep,
      };
    });
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const renderCurrentStep = () => {
    switch (onboardingState.currentStep) {
      case "account-registration":
        return (
          <AccountRegistration
            onNextAction={(data) =>
              handleStepComplete("account-registration", data)
            }
            initialData={onboardingState.formData.accountRegistration}
          />
        );
      case "profile-registration":
        return (
          <ProfileRegistration
            onNextAction={(data) =>
              handleStepComplete("profile-registration", data)
            }
            onBackAction={handleStepBack}
            initialData={onboardingState.formData.profileVerification}
          />
        );
      case "onboarding":
        return (
          <Onboarding
            onNextAction={(data) => handleStepComplete("onboarding", data)}
            onBackAction={handleStepBack}
            initialData={onboardingState.formData.onboarding}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <motion.div
          className="mx-auto max-w-4xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Progress Header */}
          <motion.div className="mb-12 text-center" variants={itemVariants}>
            <h1 className="text-4xl font-semibold text-gray-900">
              {currentStepConfig?.title || "Account Registration"}
            </h1>

            {/* Simple Progress Bar */}
            <div className="mx-auto my-4 max-w-xl">
              <div className="bg-primary-100 h-2 overflow-hidden rounded-full">
                <div
                  className="bg-primary h-full transition-all duration-300 ease-out"
                  style={{
                    width: `${((currentStepConfig?.stepNumber || 1) / ONBOARDING_STEPS.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            <p className="font-sora text-sm text-gray-500">
              Step {currentStepConfig?.stepNumber || 1} of{" "}
              {ONBOARDING_STEPS.length}
            </p>
          </motion.div>

          {/* Step Content */}
          <motion.div variants={itemVariants}>{renderCurrentStep()}</motion.div>
        </motion.div>
      </main>
    </div>
  );
}
