"use client";

import School1 from "@/src/components/icons/Sch1";
import School2 from "@/src/components/icons/Sch2";
import School3 from "@/src/components/icons/Sch3";
import School4 from "@/src/components/icons/Sch4";

import Partner1 from "@/src/components/icons/Partner1";
import Partner2 from "@/src/components/icons/Partner2";

export default function UniversityPartner() {
  return (
    <div className="bg-white-100 mt-24 flex w-full max-w-6xl flex-col divide-gray-200 rounded-[18px] p-8 shadow-[0px_1px_20px_5px_rgba(65,189,145,0.10)] md:flex-row">
      {/* Left column */}
      <div className="flex flex-1 flex-col items-start py-6 text-left md:pl-8">
        <p className="mb-6 font-medium text-[#9F9F9F]">
          The #1 Platform for underprivileged students
          <br />
          applying to dental school.
        </p>
        <div className="flex flex-wrap gap-6 md:justify-start">
          <School1 className="h-24 w-16" />
          <School2 className="h-24 w-18" />
          <School3 className="h-24 w-16" />
          <School4 className="h-24 w-16" />
        </div>
      </div>

      {/* Mobile horizontal divider */}
      <div className="mx-auto my-6 block h-px w-24 bg-gray-200 md:hidden" />

      {/* Custom short divider */}
      <div className="hidden items-center px-4 md:flex">
        <div className="h-24 w-px bg-gray-200" />
      </div>

      {/* Right column */}
      <div className="flex flex-col py-6 text-left md:w-[50%] md:items-start md:pl-28">
        <p className="mb-6 font-medium text-[#9F9F9F]">
          Partnered with leading nonprofits to support
          <br />
          underprivileged students.
        </p>
        <div className="flex flex-wrap gap-8 md:justify-start">
          <Partner1 className="h-10 w-40 md:w-44" />
          <Partner2 className="h-10 w-40 md:w-44" />
        </div>
      </div>
    </div>
  );
}
