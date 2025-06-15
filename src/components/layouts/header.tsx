"use client";

import { usePathname } from "next/navigation";
import Container from "./container";
import Logo from "../icons/Logo";
import Link from "next/link";
import { Button } from "../ui/button";

export default function Header() {
  const pathname = usePathname();
  const navItems = [
    { label: "About Us", href: "/about" },
    { label: "Become a mentor", href: "/mentors" },
    { label: "Contact Us", href: "/contact" },
  ];

  return (
    <header className="border-greys-300 bg-whites-200 border-b">
      <Container className="flex items-center justify-between py-4">
        <div className="flex items-center space-x-16">
          <Link href="/">
            <Logo className="h-[35px] w-[150px]" />
          </Link>

          <nav className="hidden space-x-8 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={
                  "text-black-600 relative text-xs font-medium hover:text-green-600 " +
                  (pathname === item.href
                    ? "text-green-600 after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:bg-green-600"
                    : "")
                }
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Action buttons */}
        <div className="hidden items-center space-x-4 md:flex">
          <Link href="/login">
            <Button className="font-sora" variant="outline">
              Log In
            </Button>
          </Link>
          <Link href="/signup">
            <Button className="font-sora">Sign Up</Button>
          </Link>
        </div>
      </Container>
    </header>
  );
}
