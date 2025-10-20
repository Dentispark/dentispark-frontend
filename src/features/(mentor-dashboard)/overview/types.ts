export interface MentorOverviewStats {
  totalEarnings: number;
  averageRating: number;
  totalHours: number;
  currency: string;
}

export interface PayoutInfo {
  isConnected: boolean;
  bankAccountLast4?: string;
  nextPayoutDate?: string;
  pendingAmount?: number;
}

export interface MentorOverviewPageProps {
  className?: string;
}
