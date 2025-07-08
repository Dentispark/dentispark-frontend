// components/Footer.tsx
"use client";

import Link from "next/link";
import Container from "@/src/components/layouts/container";
import { Twitter, Instagram, Facebook, Linkedin } from "lucide-react";
import WhiteLogo from "@/src/components/icons/WhiteLogo";

export function Footer() {
  return (
    <footer className="bg-black-800 py-16 text-gray-300">
      <Container className="font-sora grid grid-cols-1 gap-8 md:grid-cols-4 lg:grid-cols-5">
        {/* Logo & contact */}
        <div className="flex flex-col space-y-6">
          <WhiteLogo className="h-8 w-36" />
          <div className="flex space-x-6">
            <Link href="#" aria-label="Twitter">
              <Twitter className="h-6 w-6 transition hover:text-white" />
            </Link>
            <Link href="#" aria-label="Instagram">
              <Instagram className="h-6 w-6 transition hover:text-white" />
            </Link>
            <Link href="#" aria-label="Facebook">
              <Facebook className="h-6 w-6 transition hover:text-white" />
            </Link>
            <Link href="#" aria-label="LinkedIn">
              <Linkedin className="h-6 w-6 transition hover:text-white" />
            </Link>
          </div>
          <address className="not- space-y-1 text-xs font-extralight not-italic">
            <p>3, Birling Avenue, Rainham,</p>
            <p>Gillingham, ME8 7HB</p>
            <p className="my-6">
              <a
                href="mailto:contact@dentispark.com"
                className="hover:text-white"
              >
                contact@dentispark.com
              </a>
            </p>
            <p>
              <a href="tel:+441634238360" className="hover:text-white">
                +44 1634 238360
              </a>
            </p>
          </address>
        </div>

        {/* Column links */}
        <div className="font-light lg:ml-auto">
          <h4 className="text-primary mb-5 font-normal">Welcome</h4>
          <ul className="space-y-3 text-sm">
            <li>
              <Link href="/free-tools" className="transition hover:text-white">
                Free Tools
              </Link>
            </li>
            <li>
              <Link
                href="/admission-timeline"
                className="transition hover:text-white"
              >
                Admission Timeline
              </Link>
            </li>
            <li>
              <Link
                href="/success-stories"
                className="transition hover:text-white"
              >
                Success Stories
              </Link>
            </li>
          </ul>
        </div>

        <div className="font-light lg:ml-auto">
          <h4 className="text-primary mb-5 font-normal">Company</h4>
          <ul className="space-y-3 text-xs">
            <li>
              <Link href="/about" className="transition hover:text-white">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="transition hover:text-white">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="/faqs" className="transition hover:text-white">
                FAQs
              </Link>
            </li>
          </ul>
        </div>

        <div className="font-light lg:ml-auto">
          <h4 className="text-primary mb-4 font-normal">Get Involved</h4>
          <ul className="space-y-3 text-xs">
            <li>
              <Link
                href="/become-mentor"
                className="transition hover:text-white"
              >
                Become a Mentor
              </Link>
            </li>
            <li>
              <Link
                href="/university-rep"
                className="transition hover:text-white"
              >
                University Representative
              </Link>
            </li>
            <li>
              <Link href="/pricing" className="transition hover:text-white">
                Pricing
              </Link>
            </li>
          </ul>
        </div>

        <div className="font-light lg:ml-auto">
          <h4 className="text-primary mb-4 font-normal">Legal</h4>
          <ul className="space-y-3 text-xs">
            <li>
              <Link href="/terms" className="transition hover:text-white">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="transition hover:text-white">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}
