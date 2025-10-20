import { useQuery } from "@tanstack/react-query";
import { PaymentSetupApi } from "../services/api";

const paymentSetupApi = new PaymentSetupApi();

export const useVerifyTransaction = (transactionReference: string | null) => {
  return useQuery({
    queryKey: ["transaction-verification", transactionReference],
    queryFn: () => paymentSetupApi.verifyTransaction(transactionReference!),
    enabled: !!transactionReference,
    staleTime: 0,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};
