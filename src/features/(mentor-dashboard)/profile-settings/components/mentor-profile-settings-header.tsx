"use client";

import Image from "next/image";
import { useAuth } from "@/src/providers/auth-provider";

export function MentorProfileSettingsHeader() {
  const { user } = useAuth();

  return (
    <div className="flex items-center gap-6 rounded-2xl border border-[#F5F5F5] bg-[#FAFAFA] p-12">
      {/* Profile Avatar */}
      <div className="relative">
        <div className="size-24 overflow-hidden rounded-full">
          <Image
            src="/images/profile.png"
            alt="Profile"
            width={96}
            height={96}
            className="size-full object-cover"
          />
        </div>
        <button className="absolute -right-1 -bottom-1 flex size-8 items-center justify-center rounded-full border border-gray-300 bg-white">
          <svg
            width="16"
            height="16"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.1665 1.66797H7.49984C3.33317 1.66797 1.6665 3.33464 1.6665 7.5013V12.5013C1.6665 16.668 3.33317 18.3346 7.49984 18.3346H12.4998C16.6665 18.3346 18.3332 16.668 18.3332 12.5013V10.8346"
              stroke="#4F4F4F"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M13.3666 2.51639L6.7999 9.08306C6.5499 9.33306 6.2999 9.82472 6.2499 10.1831L5.89157 12.6914C5.75823 13.5997 6.3999 14.2331 7.30823 14.1081L9.81657 13.7497C10.1666 13.6997 10.6582 13.4497 10.9166 13.1997L17.4832 6.63306C18.6166 5.49972 19.1499 4.18306 17.4832 2.51639C15.8166 0.849722 14.4999 1.38306 13.3666 2.51639Z"
              stroke="#4F4F4F"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12.4248 3.45703C12.9831 5.4487 14.5415 7.00703 16.5415 7.5737"
              stroke="#4F4F4F"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Profile Info */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">
          {user?.fullName || "Dr. Sara Barrywhite"}
        </h2>
        <p className="font-sora text-gray-600">
          {user?.emailAddress || "johndoe@dentispark.co.uk"}
        </p>
      </div>
    </div>
  );
}
