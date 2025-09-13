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
  const isSignUpPage = pathname === "/sign-up";
  const isForgotPasswordPage = pathname === "/forgot-password";
  const isVerifyEmailPage = pathname === "/verify-email";
  const isNewPasswordPage = pathname === "/new-password";
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
                !isForgotPasswordPage &&
                !isVerifyEmailPage &&
                !isNewPasswordPage &&
                !isProfileSetupPage && (
                  <div>
                    <Link href="/login">
                      <Button className="font-sora" variant="outline">
                        Log In
                      </Button>
                    </Link>
                  </div>
                )}
              {!isSignUpPage &&
                !isForgotPasswordPage &&
                !isVerifyEmailPage &&
                !isNewPasswordPage &&
                !isProfileSetupPage && (
                  <div>
                    <Link href="/sign-up">
                      <Button className="font-sora">Sign Up</Button>
                    </Link>
                  </div>
                )}
            </div>

            {/* Mobile - conditionally show button */}
            <div className="block md:hidden">
              {!isSignUpPage &&
                !isForgotPasswordPage &&
                !isVerifyEmailPage &&
                !isNewPasswordPage &&
                !isProfileSetupPage && (
                  <Link href="/sign-up">
                    <Button className="font-sora h-auto px-5 py-2 text-sm">
                      Sign Up
                    </Button>
                  </Link>
                )}
              {!isLoginPage && isSignUpPage && (
                <Link href="/login">
                  <Button
                    className="font-sora h-auto px-5 py-2 text-sm"
                    variant="outline"
                  >
                    Log In
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
