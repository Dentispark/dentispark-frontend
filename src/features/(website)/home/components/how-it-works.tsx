// components/HowItWorks.tsx
"use client";

import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import Container from "@/src/components/layouts/container";
import { Users, PhoneCall, Headphones, ArrowRight } from "lucide-react";

import howItWorksImage1 from "@/public/images/how-to-work-img-1.png";
import howItWorksImage2 from "@/public/images/how-to-work-img-2.png";
import howItWorksImage3 from "@/public/images/how-to-work-img-3.png";

import HowItWorksIcon1 from "@/src/components/icons/HowItWorksIcon1";
import HowItWorksIcon2 from "@/src/components/icons/HowItWorksIcon2";
import HowItWorksIcon3 from "@/src/components/icons/HowItWorksIcon3";

type Card = {
  title: string;
  description: string;
  image: { src: StaticImageData; alt: string };
  icon: React.ElementType;
  cta?: { text: string; href: string };
};

const cards: Card[] = [
  {
    title: "Apply as a student",
    description:
      "Sign up, share your background, and tell us what kind of guidance you need.",
    image: { src: howItWorksImage1, alt: "Apply as a student" },
    icon: HowItWorksIcon1,
  },
  {
    title: "Access Support",
    description:
      "Receive help with applications, reapplications, personal statements, mock interviews, and where possible, partial funding for test or platform fees.",
    image: { src: howItWorksImage2, alt: "Access Support" },
    icon: HowItWorksIcon2,
  },
  {
    title: "1:1 Mentorship",
    description:
      "Unlock 1:1 Mentorship with a Premium Plan – Try it free for 14 days!",
    image: { src: howItWorksImage3, alt: "1:1 Mentorship" },
    icon: HowItWorksIcon3,
    cta: { text: "Try it now", href: "/premium" },
  },
];

export function HowItWorks() {
  return (
    <section className="bg-primary-100 py-16">
      <Container className="flex flex-col items-center space-y-6">
        <span className="border-primary-700 text-primary-700 bg-primary-100 rounded-full border px-6 py-2 text-base font-medium">
          How it works
        </span>
        <h2 className="mb-12 max-w-lg text-center text-3xl font-extrabold text-black sm:text-4xl">
          Simple. Supportive. Powerful.
        </h2>

        <div className="grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cards.map(({ title, description, image, icon: Icon, cta }) => (
            <div
              key={title}
              className="group flex flex-col overflow-hidden rounded-t-3xl rounded-b-2xl bg-white shadow-[0px_1px_20px_5px_rgba(65,189,145,0.05)]"
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={1000}
                height={250}
                className="transform overflow-hidden rounded-t-3xl object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                quality={80}
                placeholder="blur"
                priority
              />

              <div className="flex flex-col px-8 pt-6 pb-10">
                <div className="text-primary bg-primary-100 border-primary-300 flex size-12 items-center justify-center rounded-full border-[.75px]">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="text-primary mt-2 text-lg font-semibold">
                  {title}
                </h3>
                <p className="font-sora mt-4 flex-1 text-sm leading-[160%] text-gray-700">
                  {description}
                </p>
                {cta && (
                  <Link
                    href={cta.href}
                    className="font-sora text-primary-800 mt-10 inline-flex items-center gap-1 font-medium hover:underline"
                  >
                    {cta.text} <ArrowRight size={18} />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
