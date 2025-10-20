"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Container from "@/src/components/layouts/container";
import Logo from "@/src/components/icons/Logo";
import { Button } from "@/src/components/ui/button";
import { PublicRoute } from "@/src/components/auth/public-route";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";
  const isMentorLoginPage = pathname === "/mentor/login";
  const isSignUpPage = pathname === "/sign-up";
  const isMentorSignUpPage = pathname === "/mentor/sign-up";
  // const isMentorOnboardingPage = pathname === "/mentor/onboarding";
  const isForgotPasswordPage = pathname === "/forgot-password";
  const isMentorForgotPasswordPage = pathname === "/mentor/forgot-password";
  const isVerifyEmailPage = pathname === "/verify-email";
  const isMentorVerifyEmailPage = pathname === "/mentor/verify-email";
  const isNewPasswordPage = pathname === "/new-password";
  const isMentorNewPasswordPage = pathname === "/mentor/new-password";
  const isProfileSetupPage = pathname === "/profile-setup";

  return (
    <PublicRoute
      redirectIfAuthenticated={!isProfileSetupPage}
      redirectTo={isProfileSetupPage ? undefined : undefined}
    >
      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="border-grey-300 sticky top-0 z-50 hidden border-b bg-white/80 backdrop-blur-md md:block">
          <Container className="flex items-center justify-between py-4">
            {/* Logo */}
            <div>
              <Link href="/" className="cursor-pointer">
                <Logo className="h-[35px] w-[150px]" />
              </Link>
            </div>

            {/* Desktop Navigation - hidden on mobile */}
            <div className="hidden items-center space-x-4 md:flex">
              {!isLoginPage &&
                !isMentorLoginPage &&
                !isForgotPasswordPage &&
                !isMentorForgotPasswordPage &&
                !isVerifyEmailPage &&
                !isMentorVerifyEmailPage &&
                !isNewPasswordPage &&
                !isMentorNewPasswordPage &&
                !isProfileSetupPage && (
                  <div>
                    <Link href="/login">
                      <Button className="font-sora h-10" variant="outline">
                        Login
                      </Button>
                    </Link>
                  </div>
                )}

              {!isSignUpPage &&
              !isMentorSignUpPage &&
              !isForgotPasswordPage &&
              !isMentorForgotPasswordPage &&
              !isVerifyEmailPage &&
              !isMentorVerifyEmailPage &&
              !isNewPasswordPage &&
              !isMentorNewPasswordPage &&
              !isProfileSetupPage &&
              !isMentorLoginPage ? (
                <div>
                  <Link href="/sign-up">
                    <Button className="font-sora h-10">Sign Up</Button>
                  </Link>
                </div>
              ) : isMentorLoginPage ||
                isMentorForgotPasswordPage ||
                isMentorVerifyEmailPage ||
                isMentorNewPasswordPage ? (
                <div>
                  <Link href="/mentor/onboarding">
                    <Button className="font-sora h-10">Sign Up</Button>
                  </Link>
                </div>
              ) : null}
            </div>

            {/* Mobile - conditionally show button */}
            <div className="block md:hidden">
              {!isSignUpPage &&
                !isMentorSignUpPage &&
                !isForgotPasswordPage &&
                !isMentorForgotPasswordPage &&
                !isVerifyEmailPage &&
                !isMentorVerifyEmailPage &&
                !isNewPasswordPage &&
                !isMentorNewPasswordPage &&
                !isProfileSetupPage &&
                !(
                  isMentorLoginPage ||
                  isMentorForgotPasswordPage ||
                  isMentorVerifyEmailPage ||
                  isMentorNewPasswordPage
                ) && (
                  <Link href="/sign-up">
                    <Button className="font-sora h-10 px-5 py-2 text-sm">
                      Sign Up
                    </Button>
                  </Link>
                )}
              {(isMentorLoginPage ||
                isMentorForgotPasswordPage ||
                isMentorVerifyEmailPage ||
                isMentorNewPasswordPage) && (
                <Link href="/mentor/sign-up">
                  <Button className="font-sora h-10 px-5 py-2 text-sm">
                    Sign Up
                  </Button>
                </Link>
              )}
              {!isLoginPage && !isMentorLoginPage && isSignUpPage && (
                <Link href="/login">
                  <Button
                    className="font-sora h-10 px-5 py-2 text-sm"
                    variant="outline"
                  >
                    Student Login
                  </Button>
                </Link>
              )}
              {(isMentorLoginPage ||
                isLoginPage ||
                isMentorForgotPasswordPage ||
                isMentorVerifyEmailPage ||
                isMentorNewPasswordPage) && (
                <Link href="/login">
                  <Button
                    className="font-sora h-10 px-5 py-2 text-sm"
                    variant="outline"
                  >
                    Login
                  </Button>
                </Link>
              )}
            </div>
          </Container>
        </header>

        {/* Main Content */}
        <main className="flex-1">{children}</main>
      </div>
    </PublicRoute>
  );
}
