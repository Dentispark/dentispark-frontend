// components/JoinSection.tsx
"use client";

import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import FooterPattern from "@/src/components/icons/FooterPattern";
// Assuming you placed your SVG under /components/ui/, or adjust the path:

export function JoinSection() {
  return (
    <section className="bg-black-800 relative overflow-hidden py-32">
      {/* SVG Pattern */}
      <FooterPattern className="pointer-events-none absolute inset-0 h-full w-full" />

      <div className="relative z-10 flex flex-col items-center space-y-6 text-center">
        <h2 className="w-[70%] text-center text-4xl leading-[72px] font-bold text-white sm:text-4xl md:w-full md:max-w-3xl md:leading-[64px]">
          Join <span className="text-primary-300">5,000+</span> students who
          started their journey this month
        </h2>
        <Link href="/sign-up" className="cursor-pointer">
          <Button size="lg" className="px-8 py-5">
            Start for Free
          </Button>
        </Link>
      </div>
    </section>
  );
}
