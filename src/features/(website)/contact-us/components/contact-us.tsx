"use client";

import { motion } from "framer-motion";
import { Title } from "@/src/components/atoms/title";
import Container from "@/src/components/layouts/container";
import { ContactUsForm } from "@/src/features/(website)/contact-us/components/contact-us-form";
import { FAQ } from "@/src/features/(website)/contact-us/components/faq";

export function ContactUs() {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="relative py-20">
      <Container className="relative z-10">
        <motion.div
          className="mx-auto max-w-xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <motion.div className="mb-12 text-center" variants={itemVariants}>
            <Title>Contact us</Title>
            <h1 className="mt-8 mb-4 text-5xl leading-[160%] font-bold text-gray-900">
              Let&apos;s get in touch
            </h1>
            <p className="font-sora text-black-700">
              or just reach out manually at{" "}
              <a
                href="mailto:contact@dentispark.co.uk"
                className="text-primary underline"
              >
                contact@dentispark.co.uk
              </a>
            </p>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={itemVariants}>
            <ContactUsForm />
          </motion.div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
        >
          <FAQ />
        </motion.div>
      </Container>
    </section>
  );
}
