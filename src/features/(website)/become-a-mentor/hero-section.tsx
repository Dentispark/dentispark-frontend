"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import Container from "@/src/components/layouts/container";

import becomeAmenrorImage from "@/public/images/become-a-mentor.png";

const createBounceVariants = () => ({
  rest: { x: 0 },
  hover: {
    x: 5,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 12,
      repeat: 1,
      repeatType: "reverse" as const,
    },
  },
});

const bounceX = createBounceVariants();

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white py-20">
      <Container className="relative z-10">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          {/* Content Section */}
          <div className="space-y-6">
            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="w-[80%] text-4xl leading-[120%] font-bold text-black sm:text-4xl md:w-full lg:text-5xl">
                Utilise your skills to assist those in need.
              </h1>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <p className="text-sm leading-relaxed text-gray-600 lg:text-base">
                Mentoring provides the chance to earn extra income whilst
                nurturing enduring relationships with the leaders of tomorrow.
              </p>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Link href="/become-a-mentor/apply" className="cursor-pointer">
                <motion.div
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                  className="inline-block"
                >
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary px-8 py-4 text-base font-medium text-white"
                  >
                    <span>Become a Mentor</span>
                    <motion.span variants={bounceX} className="flex">
                      <ArrowRight size={20} />
                    </motion.span>
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </div>

          {/* Images Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            {/* Background Circle */}
            <div className="absolute top-8 -right-20 -z-10 md:-top-10 md:-right-32">
              <div className="bg-primary-100 mx-auto size-[300px] min-w-full rounded-full md:size-[500px]" />
            </div>

            {/* Mentor Images Container */}
            <div className="relative mx-auto flex items-center justify-center md:size-[400px]">
              <motion.div
                className="rounded-full"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.6,
                  delay: 0.4 + 1 * 0.1,
                  type: "spring",
                  stiffness: 200,
                }}
                whileHover={{
                  scale: 1.05,
                  zIndex: 10,
                  transition: { duration: 0.2 },
                }}
              >
                <Image
                  src={becomeAmenrorImage}
                  alt="Become a Mentor"
                  className="h-full w-full object-cover"
                  width={1000}
                  height={1000}
                  quality={85}
                  priority
                  placeholder="blur"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
