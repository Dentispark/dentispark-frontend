"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/src/components/ui/button";
import Container from "@/src/components/layouts/container";

import waitlistImage from "@/public/images/waitlist.png";

export function WaitlistSection() {
  return (
    <section className="bg-primary-100 relative mb-12 overflow-hidden py-8 md:p-0">
      <Container className="relative z-10">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            {/* Waitlist Image Container */}
            <div className="relative mx-auto flex items-center justify-center md:size-[400px]">
              <motion.div
                className="rounded-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: 0.4,
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
                  src={waitlistImage}
                  alt="Your Mentees are waiting for you"
                  className="h-full w-full rounded-lg object-cover"
                  width={1000}
                  height={1000}
                  quality={85}
                  priority
                  placeholder="blur"
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Content Section */}
          <div className="order-1 space-y-6 lg:order-2">
            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-5xl leading-[150%] font-bold text-black sm:text-4xl md:text-5xl md:leading-[120%]">
                Your Mentees are waiting for you.
              </h2>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Link href="/become-a-mentor/apply" className="cursor-pointer">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary-700 font-sora rounded-md px-6 py-6 text-base font-light text-white"
                >
                  Become a Mentor
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
