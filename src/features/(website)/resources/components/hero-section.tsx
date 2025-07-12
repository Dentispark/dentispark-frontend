"use client";

import { motion } from "framer-motion";
import Container from "@/src/components/layouts/container";

export function HeroSection() {
  return (
    <section className="bg-white py-16">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col space-y-6 text-left"
        >
          <h1 className="max-w-4xl text-4xl leading-[120%] font-extrabold text-black sm:text-5xl">
            UCAT Guide resources
          </h1>
          <p className="text-black-600 md:max-w-3x font-sora">
            Concise articles, free resources, and guides to help you achieve
            your goals.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
