import BaseAPI from "@/src/connection/base-api";
import {
  BasicDetailsFormData,
  BasicDetailsResponse,
  DentalExperienceFormData,
  DentalExperienceResponse,
  MentorAvailabilityFormData,
  MentorAvailabilityResponse,
  PaymentInitiationFormData,
  PaymentInitiationResponse,
  TransactionVerificationResponse,
  PremiumActivationFormData,
  PremiumActivationResponse,
} from "../types";

export class PaymentSetupApi extends BaseAPI {
  async submitBasicDetails(
    data: BasicDetailsFormData,
  ): Promise<BasicDetailsResponse> {
    return this.post("/student-profile/basic-details", data);
  }

  async submitDentalExperience(
    data: DentalExperienceFormData,
  ): Promise<DentalExperienceResponse> {
    return this.post("/student-profile/dental-experience", data);
  }

  async submitMentorAvailability(
    data: MentorAvailabilityFormData,
  ): Promise<MentorAvailabilityResponse> {
    return this.post("/student-profile/mentor-availability", data);
  }

  async initiatePayment(
    data: PaymentInitiationFormData,
  ): Promise<PaymentInitiationResponse> {
    return this.post("/checkout/initiate", data);
  }

  async verifyTransaction(
    transactionReference: string,
  ): Promise<TransactionVerificationResponse> {
    return this.get(`/checkout/verify/${transactionReference}`);
  }

  async activatePremium(
    payload: PremiumActivationFormData,
  ): Promise<PremiumActivationResponse> {
    return this.post("/user/portfolio/premium/activate", payload);
  }
}
