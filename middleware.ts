import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define route patterns
const publicRoutes = [
  "/",
  "/about-us",
  "/contact-us",
  "/resources",
  "/become-a-mentor",
];

const authRoutes = [
  "/login",
  "/sign-up",
  "/forgot-password",
  "/verify-email",
  "/new-password",
];

const protectedRoutes = [
  "/overview",
  "/profile",
  "/applications",
  "/university-hub",
  "/mentorship",
  "/community-hub",
  "/guidance-hub",
  "/profile-setup",
];

function isRouteMatch(pathname: string, routes: string[]): boolean {
  return routes.some((route) => {
    if (route === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(route);
  });
}

function hasValidToken(request: NextRequest): boolean {
  const accessToken = request.cookies.get("accessToken")?.value;
  const userData = request.cookies.get("userData")?.value;

  if (!accessToken || !userData) {
    return false;
  }

  try {
    const parsedUserData = JSON.parse(userData);
    const tokenExpiredAt = new Date(parsedUserData.auth?.tokenExpiredAt);
    const now = new Date();

    return now < tokenExpiredAt;
  } catch (error) {
    console.error("Error parsing user data:", error);
    return false;
  }
}

function getUserProfileStatus(
  request: NextRequest,
): "PENDING" | "COMPLETED" | null {
  const userData = request.cookies.get("userData")?.value;

  if (!userData) {
    return null;
  }

  try {
    const parsedUserData = JSON.parse(userData);
    return parsedUserData.profileStatus || null;
  } catch (error) {
    console.error("Error parsing user data for profile status:", error);
    return null;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuthenticated = hasValidToken(request);
  const profileStatus = getUserProfileStatus(request);

  // Allow public routes
  if (isRouteMatch(pathname, publicRoutes)) {
    return NextResponse.next();
  }

  // Handle auth routes
  if (isRouteMatch(pathname, authRoutes)) {
    if (isAuthenticated) {
      // Redirect authenticated users away from auth pages
      const redirectTo =
        profileStatus === "PENDING" ? "/profile-setup" : "/overview";
      return NextResponse.redirect(new URL(redirectTo, request.url));
    }
    return NextResponse.next();
  }

  // Handle protected routes
  if (isRouteMatch(pathname, protectedRoutes)) {
    if (!isAuthenticated) {
      // Redirect unauthenticated users to login
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Handle profile setup requirements
    if (pathname === "/profile-setup") {
      if (profileStatus === "COMPLETED") {
        // Redirect to overview if profile is already completed
        return NextResponse.redirect(new URL("/overview", request.url));
      }
    } else {
      // Other protected routes require completed profile
      if (profileStatus === "PENDING") {
        return NextResponse.redirect(new URL("/profile-setup", request.url));
      }
    }

    return NextResponse.next();
  }

  // Default: allow the request
  return NextResponse.next();
}

export const config = {
  /*
   * Match all request paths except for the ones starting with:
   * - api (API routes)
   * - _next/static (static files)
   * - _next/image (image optimization files)
   * - favicon.ico (favicon file)
   * - public folder files
   */
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|favicon.png|favicon.svg|icons|images|fonts).*)",
  ],
};
