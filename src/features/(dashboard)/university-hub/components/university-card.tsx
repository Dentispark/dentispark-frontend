"use client";

import Image from "next/image";
import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";
import { UniversityCardProps } from "../types";

export function UniversityCard({
  university,
  onViewProfile,
}: UniversityCardProps) {
  const isAdmissionOpen = university.admissionStatus === "open";

  return (
    <div className="group relative overflow-hidden bg-white">
      {/* University Image */}
      <div className="relative h-56 w-full overflow-hidden rounded-[12px]">
        <Image
          src={university.image}
          alt={university.name}
          fill
          className="rounded-[12px] object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
      </div>

      {/* Card Content */}
      <div className="flex flex-col py-6">
        {/* University Name */}
        <h3 className="text-text-heading mb-3 text-xl font-semibold">
          {university.name}
        </h3>

        {/* Location */}
        <div className="mb-4 flex items-start space-x-2">
          <div className="mt-1 flex-shrink-0">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.9989 13.4275C13.722 13.4275 15.1189 12.0306 15.1189 10.3075C15.1189 8.58437 13.722 7.1875 11.9989 7.1875C10.2758 7.1875 8.87891 8.58437 8.87891 10.3075C8.87891 12.0306 10.2758 13.4275 11.9989 13.4275Z"
                stroke="#737373"
                strokeWidth="1.5"
              />
              <path
                d="M3.62166 8.49C5.59166 -0.169998 18.4217 -0.159997 20.3817 8.5C21.5317 13.58 18.3717 17.88 15.6017 20.54C13.5917 22.48 10.4117 22.48 8.39166 20.54C5.63166 17.88 2.47166 13.57 3.62166 8.49Z"
                stroke="#737373"
                strokeWidth="1.5"
              />
            </svg>
          </div>
          <p className="font-sora text-sm leading-relaxed text-[#868686] md:w-[70%]">
            {university.fullAddress}
          </p>
        </div>

        {/* Admission Status */}
        <div className="mt-auto mb-4 flex items-center space-x-2">
          {isAdmissionOpen ? (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.44922 14.9688C3.51922 18.4088 6.39923 21.0588 9.97923 21.7888"
                stroke="#737373"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2.05078 10.98C2.56078 5.93 6.82078 2 12.0008 2C17.1808 2 21.4408 5.94 21.9508 10.98"
                stroke="#737373"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14.0117 21.8034C17.5817 21.0734 20.4517 18.4534 21.5417 15.0234"
                stroke="#737373"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.99889 14.2188H3.91889C3.30889 14.2188 2.74889 14.5287 2.42889 15.0487C2.10889 15.5587 2.07889 16.1687 2.33889 16.7087C3.56889 19.2287 5.78889 21.2087 8.42889 22.1387C8.60889 22.1987 8.80889 22.2387 8.99889 22.2387C9.34889 22.2387 9.69889 22.1287 9.99889 21.9187C10.4689 21.5887 10.7489 21.0487 10.7489 20.4787L10.7589 15.9787C10.7589 15.5087 10.5789 15.0687 10.2489 14.7387C9.90889 14.4087 9.46889 14.2188 8.99889 14.2188Z"
                fill="#12AC75"
              />
              <path
                d="M22.4819 9.6C21.3619 4.68 17.0519 1.25 12.0019 1.25C6.95188 1.25 2.64188 4.68 1.52188 9.6C1.40188 10.12 1.52188 10.65 1.86188 11.07C2.20188 11.49 2.70188 11.73 3.24188 11.73H20.7719C21.3119 11.73 21.8119 11.49 22.1519 11.07C22.4819 10.65 22.6019 10.11 22.4819 9.6Z"
                fill="#12AC75"
              />
              <path
                d="M20.06 14.2678L15 14.2578C14.53 14.2578 14.09 14.4378 13.76 14.7678C13.43 15.0978 13.25 15.5378 13.25 16.0078L13.26 20.4878C13.26 21.0578 13.54 21.5978 14.01 21.9278C14.31 22.1378 14.66 22.2478 15.01 22.2478C15.2 22.2478 15.39 22.2178 15.57 22.1478C18.19 21.2278 20.41 19.2578 21.64 16.7678C21.9 16.2378 21.87 15.6178 21.56 15.1178C21.23 14.5778 20.67 14.2678 20.06 14.2678Z"
                fill="#12AC75"
              />
            </svg>
          )}
          <span className={cn("font-sora text-sm font-medium text-[#868686]")}>
            Admission {isAdmissionOpen ? "Open" : "Closed"}
          </span>
        </div>

        {/* View Profile Button */}
        <Button
          variant="outline"
          onClick={() => onViewProfile(university)}
          className="border-text-color text-text-color w-[50%] transition duration-700"
        >
          View Profile
        </Button>
      </div>
    </div>
  );
}
