"use client";

import { Card, CardContent } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";
import { useModal } from "@/src/hooks/use-modal";
import { PayoutInfo } from "../types";
import { BankInformationForm } from "./bank-information-form";

interface PayoutSectionProps {
  payoutInfo: PayoutInfo;
  className?: string;
  onConnectBankAccountAction: () => void;
  readonly borderColor?: string;
}

export function PayoutSection({
  className,
  onConnectBankAccountAction,
}: PayoutSectionProps) {
  const { showModal, hideModal } = useModal();

  const handleConnectBankAccount = () => {
    showModal({
      type: "bank-information",
      modalTitle: "Bank information",
      modalTitleClassName: "text-center ",
      size: "md",
      isCustomContent: true,
      bodyContent: (
        <BankInformationForm onSubmit={handleBankSubmit} onCancel={hideModal} />
      ),
      action: () => {},
      actionTitle: "",
    });
  };

  const handleBankSubmit = (data: {
    sortCode: string;
    accountNumber: string;
  }) => {
    console.log("Bank information submitted:", data);
    // TODO: Implement bank information submission
    hideModal();
    onConnectBankAccountAction();
  };
  return (
    <Card
      className={cn(
        "font-sora rounded-lg border text-center shadow-none",
        className,
      )}
    >
      <CardContent className="p-6">
        <div className="space-y-8">
          <div>
            <h3 className="text-black-800 text-lg font-semibold">Payout</h3>
            <p className="text-black-600 mt-1 text-xs">
              Link your bank account to enable withdrawals.
            </p>
          </div>

          <Button
            onClick={handleConnectBankAccount}
            className="w-full text-white"
          >
            Connect your bank account
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
