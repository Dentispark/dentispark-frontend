"use client";

import { useState } from "react";
import { PaymentSetupStep1 } from "@/src/features/(dashboard)/payment-setup/components/payment-setup-step-1";
import { PaymentSetupStep2 } from "@/src/features/(dashboard)/payment-setup/components/payment-setup-step-2";
import { PaymentSetupStep3 } from "@/src/features/(dashboard)/payment-setup/components/payment-setup-step-3";
import {
  PaymentSetupFormData,
  PAYMENT_SETUP_STEPS,
  PaymentSetupStep,
} from "../types";
import {
  useSubmitBasicDetails,
  useSubmitDentalExperience,
  useSubmitAdditionalDetails,
  useInitiatePayment,
} from "../services/mutations";
import { ProgressIndicator } from "./progress-indicator";
import { useAuth } from "@/src/providers/auth-provider";

export function PaymentSetupForm() {
  const { user } = useAuth();

  const [currentStep, setCurrentStep] = useState<PaymentSetupStep>(
    PAYMENT_SETUP_STEPS.STEP_1,
  );
  const [formData, setFormData] = useState<Partial<PaymentSetupFormData>>({});

  const basicDetailsMutation = useSubmitBasicDetails(() => {
    setCurrentStep(PAYMENT_SETUP_STEPS.STEP_2);
  });

  const dentalExperienceMutation = useSubmitDentalExperience(() => {
    setCurrentStep(PAYMENT_SETUP_STEPS.STEP_3);
  });

  const paymentInitiationMutation = useInitiatePayment((checkoutUrl) => {
    window.location.href = checkoutUrl;
  });

  const additionalDetailsMutation = useSubmitAdditionalDetails(() => {
    handlePaymentInitiation();
  });

  const handleNext = (stepData: Partial<PaymentSetupFormData>) => {
    const updatedData = { ...formData, ...stepData };
    setFormData(updatedData);

    if (currentStep === PAYMENT_SETUP_STEPS.STEP_1) {
      handleStep1Submit(updatedData);
    } else if (currentStep === PAYMENT_SETUP_STEPS.STEP_2) {
      handleStep2Submit(updatedData);
    } else {
      handleStep3Submit(updatedData);
    }
  };

  const handleStep1Submit = async (data: Partial<PaymentSetupFormData>) => {
    try {
      const basicDetailsData = {
        emailAddress: user?.emailAddress || "",
        academicYear: data.academicYear || 0,
        takenOrPlanningCasper: data.takenUCAT || false,
        whyDentistry: data.whyDentistry || "",
        category: "BDS" as const,
        alevelGrades: [
          {
            subject: "Mathematics",
            grade: "A",
          },
          {
            subject: "Physics",
            grade: "B",
          },
          {
            subject: "Chemistry",
            grade: "C",
          },
        ],
      };

      await basicDetailsMutation.mutateAsync(basicDetailsData);
    } catch (error) {
      console.error("Step 1 submission error:", error);
    }
  };

  const handleStep2Submit = async (data: Partial<PaymentSetupFormData>) => {
    try {
      const dentalExperienceData = {
        emailAddress: user?.emailAddress || "",
        hasDentalWorkExperienceOrVolunteering: data.dentalExperience
          ? true
          : false,
        interestedDentalSchools: data.interestedSchools || [],
        biggestApplicationChallenges: data.applicationChallenges
          ? [data.applicationChallenges]
          : [],
      };

      await dentalExperienceMutation.mutateAsync(dentalExperienceData);
    } catch (error) {
      console.error("Step 2 submission error:", error);
    }
  };

  const handleStep3Submit = async (data: Partial<PaymentSetupFormData>) => {
    try {
      const mentorAvailabilityData = {
        emailAddress: user?.emailAddress || "",
        mentorAvailable: data.mentorshipAvailability ? true : false, // Convert string to boolean
        qualifyForFinancialSupport: data.financialSupport || false,
        howDidYouHearAboutUs: data.hearAboutDentispark || "",
      };

      await additionalDetailsMutation.mutateAsync(mentorAvailabilityData);
    } catch (error) {
      console.error("Step 3 submission error:", error);
    }
  };

  const handlePaymentInitiation = async () => {
    try {
      const paymentData = {
        platformUserEmailAddress: user?.emailAddress || "",
        action: "MEMBERSHIP_REGISTRATION" as const,
      };

      console.log("Initiating payment with data:", paymentData);
      await paymentInitiationMutation.mutateAsync(paymentData);
    } catch (error) {
      console.error("Payment initiation error:", error);
    }
  };

  const handlePrevious = () => {
    if (currentStep > PAYMENT_SETUP_STEPS.STEP_1) {
      setCurrentStep((prev) => (prev - 1) as PaymentSetupStep);
    }
  };

  const renderStep = () => {
    const commonProps = {
      data: formData,
      onNext: handleNext,
      onPrevious: handlePrevious,
      isLoading:
        currentStep === PAYMENT_SETUP_STEPS.STEP_1
          ? basicDetailsMutation.isPending
          : currentStep === PAYMENT_SETUP_STEPS.STEP_2
            ? dentalExperienceMutation.isPending
            : currentStep === PAYMENT_SETUP_STEPS.STEP_3
              ? additionalDetailsMutation.isPending ||
                paymentInitiationMutation.isPending
              : false,
    };

    switch (currentStep) {
      case PAYMENT_SETUP_STEPS.STEP_1:
        return <PaymentSetupStep1 {...commonProps} />;
      case PAYMENT_SETUP_STEPS.STEP_2:
        return <PaymentSetupStep2 {...commonProps} />;
      case PAYMENT_SETUP_STEPS.STEP_3:
        return <PaymentSetupStep3 {...commonProps} />;
      default:
        return <PaymentSetupStep1 {...commonProps} />;
    }
  };

  return (
    <div className="w-full">
      <div className="mb-8 text-center">
        <h1 className="mb-4 text-3xl font-semibold text-gray-900">
          Profile Setup
        </h1>
        <ProgressIndicator currentStep={currentStep} totalSteps={3} />
      </div>

      {renderStep()}
    </div>
  );
}
