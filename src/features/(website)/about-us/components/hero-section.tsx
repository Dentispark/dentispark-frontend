"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Title } from "@/src/components/atoms/title";

import aboutHeroImage from "@/public/images/about-hero-img.png";
import AboutTop from "@/src/components/icons/AboutTop";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white py-16">
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 2xl:px-0">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Content Section */}
          <div className="space-y-6">
            {/* About Us Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block"
            >
              <Title>About Us</Title>
            </motion.div>

            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h1 className="text-black-800 text-4xl leading-[120%] font-bold sm:text-5xl">
                Empowering Tomorrow&apos;s Dentists
              </h1>
            </motion.div>

            {/* Mission Statement */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="text-black-400 text-base leading-relaxed">
                We&apos;re on a mission to break down barriers to dental
                education by providing accessible guidance, mentorship and
                support for underprivileged students—one application at a time.
              </p>
            </motion.div>
          </div>

          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="overflow-hidden rounded-3xl">
              <Image
                src={aboutHeroImage}
                alt="Dental students and professionals working together"
                className="h-full w-full object-cover"
                width={600}
                height={500}
                quality={85}
                priority
                placeholder="blur"
              />
            </div>

            <AboutTop className="absolute -top-7 -left-12 size-36" />

            <div className="bg-primary-100 absolute -top-16 -left-28 -z-10 size-[500px] rounded-full opacity-30" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
