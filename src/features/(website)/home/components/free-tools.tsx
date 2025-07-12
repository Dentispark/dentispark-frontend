// components/FreeTools.tsx
"use client";

import Link from "next/link";
import Container from "@/src/components/layouts/container";

export function FreeTools() {
  return (
    <section className="py-16">
      <Container className="flex flex-col items-center space-y-6 text-center">
        <h2 className="text-primary text-3xl font-extrabold sm:text-5xl">
          Start with free tools
        </h2>
        <p className="text-text-color font-sora max-w-2xl text-sm leading-[200%] sm:text-base sm:leading-[160%]">
          Jumpstart your dental school journey with free resources designed to
          guide, support, and empower you every step of the way.
        </p>
        <div className="mt-4 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/resources"
            className="bg-primary font-sora hover:bg-primary-700 inline-flex cursor-pointer items-center justify-center rounded-md px-6 py-3 font-normal text-white shadow transition"
          >
            UCAT Prep Guide
          </Link>
          <Link
            href="/personal-statement-template"
            className="border-primary font-sora text-primary hover:bg-primary-100 inline-flex cursor-pointer items-center justify-center rounded-md border px-6 py-3 font-normal transition"
          >
            Personal Statement Template
          </Link>
        </div>
      </Container>
    </section>
  );
}
