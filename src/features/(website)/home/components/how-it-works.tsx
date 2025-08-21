// components/HowItWorks.tsx
"use client";

import Link from "next/link";
import Container from "@/src/components/layouts/container";
import { ArrowRight } from "lucide-react";

import DiscoverYourPath from "@/public/icons/discover-your-path.svg";
import AccessFreeTools from "@/public/icons/access-free-tool.svg";
import ConnectWithScholars from "@/public/icons/connect-with-mentors.svg";
import TrackYourJourney from "@/public/icons/track-your-journey.svg";
import { cn } from "@/src/lib/utils";
import Image, { StaticImageData } from "next/image";

type Card = {
  step: number;
  title: string;
  titleColor: string;
  description: string;
  icon: StaticImageData;
  bgColor: string;
  hasLink?: boolean;
};

const cards: Card[] = [
  {
    step: 1,
    title: "Discover Your Path",
    titleColor: "text-success-600",
    description:
      "Take the quiz to find your category (BDS, Dental Nursing, Dental Hygiene/Therapy).",
    icon: DiscoverYourPath,
    bgColor: "bg-success-200",
  },
  {
    step: 2,
    title: "Access Free Tools",
    titleColor: "text-warning-600",
    description: "Use guides, checklists, and university data.",
    icon: AccessFreeTools,
    bgColor: "bg-warning-200",
  },
  {
    step: 3,
    title: "Connect with Mentors",
    titleColor: "text-secondary-600",
    description: "Meet Black dental professionals.",
    icon: ConnectWithScholars,
    bgColor: "bg-secondary-200",
  },
  {
    step: 4,
    title: "Track Your Journey",
    titleColor: "text-primary",
    description: "Follow year-specific milestones.",
    icon: TrackYourJourney,
    bgColor: "bg-primary-200",
    hasLink: true,
  },
];

export function HowItWorks() {
  return (
    <section className="py-16">
      <Container className="flex flex-col items-center space-y-6">
        <span className="border-primary-700 text-primary-700 bg-primary-100 rounded-full border px-6 py-2 text-base font-medium">
          How it works
        </span>
        <h2 className="mb-12 max-w-lg text-center text-3xl font-extrabold text-black sm:text-4xl">
          Simple. Supportive. Powerful.
        </h2>

        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
          {cards.map(
            (
              {
                step,
                bgColor,
                icon: Icon,
                title,
                titleColor,
                description,
                hasLink,
              },
              index,
            ) => (
              <div
                key={index}
                className="border-greys-300 bg-white-100 rounded-3xl border p-8 shadow-[0_1px_40px_10px_rgba(46,46,46,0.05)]"
              >
                <div className="flex items-center gap-4">
                  <div className={cn(bgColor, "flex-shrink-0 rounded-4xl")}>
                    <Image
                      src={Icon}
                      alt=""
                      width={1000}
                      height={1000}
                      className="w-24 object-contain"
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <h3
                      className={cn(titleColor, "mb-2 text-lg font-semibold")}
                    >
                      {step}. {title}
                    </h3>
                    <p className="text-text-color font-sora text-sm leading-relaxed">
                      {description}
                    </p>
                    {hasLink && (
                      <Link
                        href="/journey"
                        className="hover:text-success-700 mt-3 inline-flex items-center gap-1 text-xs font-medium text-[#12AC75] transition-colors"
                      >
                        Start Your Journey for Free
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ),
          )}
        </div>
      </Container>
    </section>
  );
}
