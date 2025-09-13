"use client";

import Logo from "@/src/components/icons/Logo";
import { DashboardHeaderProps } from "./types";
import Image from "next/image";
import { useAuth } from "@/src/providers/auth-provider";

export default function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  const { user } = useAuth();

  return (
    <header className="border-greys-300 bg-whites-200 fixed top-0 right-0 left-0 z-50 border-b">
      <div className="flex h-18 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo and mobile menu */}
        <div className="flex items-center space-x-4 lg:hidden">
          {/* Mobile menu button */}
          <button className="" onClick={onMenuClick}>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Logo */}
        <div>
          <Logo className="h-16 w-32 md:h-20 md:w-48" />
        </div>

        {/*  notifications and profile */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <span className="text-black-500 relative cursor-pointer rounded-full">
            <svg
              className="size-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            {/* Notification dot */}
            <span className="absolute top-px right-1.5 size-2.5 rounded-full bg-[#FE4648]"></span>
          </span>

          {/* Profile dropdown - hidden on mobile, shown on desktop */}
          <div className="hidden items-center space-x-3 lg:flex">
            {user?.profilePicture ? (
              <div className="flex size-10 items-center justify-center rounded-full">
                <Image
                  src={user?.profilePicture}
                  alt="Profile"
                  width={1000}
                  height={1000}
                  priority
                  quality={85}
                  className="size-10 rounded-full object-cover"
                />
              </div>
            ) : (
              <div className="bg-primary font-sora flex size-10 items-center justify-center rounded-full font-medium text-white">
                {user?.fullName
                  .split(" ")
                  .map((name) => name[0])
                  .join("")}
              </div>
            )}
            <div className="font-sora">
              <p className="text-black-700 text-sm font-medium">
                {user?.fullName}
              </p>
              <p className="text-black-500 text-[10px]">{user?.emailAddress}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
