"use client";

import { motion } from "framer-motion";

interface WelcomeSectionProps {
  userName?: string;
  userYear?: string;
}

export default function WelcomeSection({
  userName = "John",
  userYear = "Year 12",
}: WelcomeSectionProps) {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-sora text-black-800 mb-1 text-sm font-medium md:text-base">
            {getGreeting()}, {userName}
          </h1>
          <p className="text-black-300 font-sora text-xs md:text-sm">
            Your dream school is just a step away.
          </p>
        </div>
        <div className="bg-white-100 border-greys-300 font-sora hidden items-center gap-1 rounded-[8px] border px-3 py-2 text-sm font-semibold text-black md:flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M10.1341 9.05964C10.0508 9.0513 9.95078 9.0513 9.85911 9.05964C7.87578 8.99297 6.30078 7.36797 6.30078 5.36797C6.30078 3.3263 7.95078 1.66797 10.0008 1.66797C12.0424 1.66797 13.7008 3.3263 13.7008 5.36797C13.6924 7.36797 12.1174 8.99297 10.1341 9.05964Z"
              stroke="#4F4F4F"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5.96758 12.132C3.95091 13.482 3.95091 15.682 5.96758 17.0237C8.25924 18.557 12.0176 18.557 14.3092 17.0237C16.3259 15.6737 16.3259 13.4737 14.3092 12.132C12.0259 10.607 8.26758 10.607 5.96758 12.132Z"
              stroke="#4F4F4F"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {userYear}
        </div>
      </div>
    </motion.div>
  );
}
