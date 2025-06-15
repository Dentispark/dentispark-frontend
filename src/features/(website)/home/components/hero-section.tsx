// components/Hero.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowDown, ArrowRight } from "lucide-react";
import { motion, TargetAndTransition, Variants } from "framer-motion";

import Container from "@/src/components/layouts/container";
import heroImg1 from "@/public/images/hero-1.png";
import heroImg2 from "@/public/images/hero-2.png";
import UniversityPartner from "./university-partner";

const MotionLink = motion(Link);

const createBounceVariants = (axis: "x" | "y"): Variants => ({
  rest: { [axis]: 0 },
  hover: {
    [axis]: axis === "y" ? 5 : 5,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 12,
      repeat: 1,
      repeatType: "reverse",
    },
  } as TargetAndTransition,
});

const bounceY = createBounceVariants("y");
const bounceX = createBounceVariants("x");

export function Hero() {
  return (
    <section className="relative overflow-hidden py-20">
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        aria-hidden="true"
      >
        <div className="from-primary to-primary h-[1000px] w-[1000px] bg-gradient-to-r opacity-10 mix-blend-plus-darker blur-3xl filter" />
      </div>

      {/* Dotted square pattern */}
      <div
        className="absolute inset-0 z-0 opacity-60"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              #E5E7EB,
              #E5E7EB .5px,
              transparent .5px,
              transparent 200px
            ),
            repeating-linear-gradient(
              90deg,
              #E5E7EB,
              #E5E7EB .5px,
              transparent .5px,
              transparent 200px
            )
          `,
          backgroundSize: "200px 200px",
        }}
      />

      <Container className="relative z-10 flex flex-col items-center space-y-8 text-center">
        <h1 className="text-black-700 max-w-5xl text-4xl leading-[120%] font-extrabold sm:text-5xl">
          Empowering
          <span className="relative inline-block">
            <span className="border-primary bg-primary-100 pointer-events-none absolute inset-0 -rotate-[1.5deg] transform rounded-full border-2 border-dotted" />
            <span className="text-primary relative inline-block px-5 py-2">
              underprivileged
            </span>
          </span>{" "}
          students to achieve dental school dreams
        </h1>
        <p className="text-black-400 text-lg md:max-w-5xl">
          Free guidance, expert mentorship, and AI-driven success for
          underprivileged students.
        </p>

        <div className="flex flex-col gap-6 sm:flex-row">
          <MotionLink
            href="/signup"
            initial="rest"
            whileHover="hover"
            animate="rest"
            className="bg-primary font-sora hover:bg-primary/90 inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 text-sm font-normal text-white shadow transition"
          >
            <span>Start for Free</span>
            <motion.span variants={bounceX} className="flex">
              <ArrowRight size={20} />
            </motion.span>
          </MotionLink>

          <MotionLink
            href="/resources"
            initial="rest"
            whileHover="hover"
            animate="rest"
            className="border-primary font-sora text-primary inline-flex items-center justify-center gap-2 rounded-md border px-6 py-3 text-sm font-normal transition hover:bg-green-50"
          >
            <span>Explore Free Resources</span>
            <motion.span variants={bounceY} className="flex">
              <ArrowDown size={20} />
            </motion.span>
          </MotionLink>
        </div>

        {/* Hero images */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="overflow-hidden rounded-4xl shadow-lg">
            <Image
              src={heroImg1}
              alt="Student receiving mentorship online"
              className="h-full w-full object-cover"
              width={600}
              height={400}
              quality={80}
              priority
              placeholder="blur"
            />
          </div>
          <div className="w-full overflow-hidden rounded-4xl shadow-lg">
            <Image
              src={heroImg2}
              alt="One-on-one tutoring session"
              className="h-full w-full object-cover"
              width={600}
              height={400}
              quality={80}
              priority
              placeholder="blur"
            />
          </div>
        </div>

        <UniversityPartner />
      </Container>
    </section>
  );
}
