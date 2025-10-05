"use client";

import Link from "next/link";
import Image from "next/image";
import { DashboardSidebarProps } from "./types";
import { useLogout } from "@/src/hooks/use-logout";
import { cn } from "@/src/lib/utils";

import { useAuth } from "@/src/providers/auth-provider";
import { useRouter } from "next/navigation";

export default function DashboardSidebar({
  isOpen,
  onClose,
  menuItems,
  currentPath,
}: DashboardSidebarProps) {
  const { showLogoutModal } = useLogout();

  const router = useRouter();

  const { user, isPremium } = useAuth();

  return (
    <aside
      className={cn(
        "border-greys-300 bg-white-100 fixed inset-y-0 left-0 z-50 w-[300px] transform border-t border-r transition-transform duration-300 ease-in-out lg:top-18 lg:bottom-0 lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full",
      )}
    >
      <div className="flex h-full flex-col">
        <div className="border-greys-300 flex items-center justify-between p-4 lg:hidden">
          <div className="flex items-center space-x-3">
            <div className="bg-primary-100 flex h-10 w-10 items-center justify-center rounded-full">
              {user?.profilePicture ? (
                <Image
                  src={user?.profilePicture}
                  alt="Profile"
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    const nextElement = e.currentTarget
                      .nextElementSibling as HTMLElement;
                    if (nextElement) {
                      nextElement.style.display = "flex";
                    }
                  }}
                />
              ) : (
                <div className="bg-primary font-sora flex size-10 items-center justify-center rounded-full font-medium text-white">
                  {user?.fullName
                    .split(" ")
                    .map((name) => name[0])
                    .join("")}
                </div>
              )}
            </div>
            <div>
              <p className="text-black-700 text-sm font-medium">
                {user?.fullName}
              </p>
              <p className="text-black-500 text-xs">{user?.emailAddress}</p>
            </div>
          </div>
          <button onClick={onClose}>
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="font-sora mt-4 flex-1 space-y-2 px-4 py-6 text-sm md:mt-0">
          {menuItems.map((item) => {
            const isActive =
              currentPath === item.href ||
              currentPath.startsWith(item.href + "/");
            return (
              <Link
                key={item.id}
                href={item.href}
                className={cn(
                  "flex items-center space-x-3 rounded-full px-3 py-2.5 font-medium transition-colors",
                  isActive ? "bg-primary-100" : "hover:bg-greys-100",
                )}
              >
                <span className="text-black-500">
                  {isActive ? item.icon.active : item.icon.inactive}
                </span>
                <span>{item.label}</span>
              </Link>
            );
          })}

          <button
            className="mt-4 flex items-center space-x-3 px-3"
            onClick={showLogoutModal}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.4414 14.62L20.0014 12.06L17.4414 9.5"
                stroke="#D32F2F"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9.76172 12.0586H19.9317"
                stroke="#D32F2F"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11.7617 20C7.34172 20 3.76172 17 3.76172 12C3.76172 7 7.34172 4 11.7617 4"
                stroke="#D32F2F"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-error-600">Logout</span>
          </button>
        </nav>

        {/* Premium Upgrade UI - Only show if user is not premium */}
        {!isPremium && (
          <div className="p-4">
            <div className="bg-primary-100 rounded-2xl p-4">
              {/* Premium Badge */}
              <div className="mb-3 flex items-start gap-4">
                <Image
                  src="/images/premium-badge.png"
                  alt="Premium Badge"
                  width={1000}
                  height={1000}
                  className="w-16 object-cover"
                />

                <div>
                  <h3 className="text-primary text-xl font-semibold">
                    Premium Plan
                  </h3>

                  <p className="text-text-color font-sora mb-4 text-base leading-relaxed">
                    Need More?
                    <br />
                    Upgrade for 1:1 Mentorship and More
                  </p>
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={() => router.push("/payment-setup")}
                className="bg-primary hover:bg-primary-400 w-full rounded-md px-4 py-3 text-sm font-medium text-white transition-colors duration-200"
              >
                Try Premium for 14 days
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
