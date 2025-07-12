"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Container from "@/src/components/layouts/container";

// Import resource images
import resource1 from "@/public/images/resource-1.png";
import resource2 from "@/public/images/resource-2.png";
import resource3 from "@/public/images/resource-3.png";

const resources = [
  {
    id: 1,
    title: "M7 MBA Programs – What They Are & How to Get In",
    description:
      "An expert admissions coach details how to get into an elite M7 business school with ways to stand out in your application, with deep-dives into all the M7",
    date: "May 23, 2023",
    image: resource1,
    imageAlt: "Student studying with laptop",
  },
  {
    id: 2,
    title: "Top Strategies for MBA Interview Success",
    description:
      "Learn proven techniques from industry leaders to excel in your MBA interviews, including common questions and how to showcase your unique experiences.",
    date: "June 15, 2023",
    image: resource2,
    imageAlt: "MBA interview preparation",
  },
  {
    id: 3,
    title: "Financing Your MBA: Scholarships and Loans Explained",
    description:
      "A comprehensive guide to understanding the financial aspects of pursuing an MBA, with insights on scholarships, student loans, and budgeting for business school.",
    date: "July 10, 2023",
    image: resource3,
    imageAlt: "MBA financing guide",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

export function ResourcesGrid() {
  return (
    <section className="bg-white pb-16">
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {resources.map((resource) => (
            <motion.div
              key={resource.id}
              variants={cardVariants}
              whileHover={{
                y: -5,
                transition: { duration: 0.2 },
              }}
              className="group flex cursor-pointer flex-col overflow-hidden bg-white"
            >
              <div className="mb-2 overflow-hidden rounded-lg">
                <Image
                  src={resource.image}
                  alt={resource.imageAlt}
                  width={1000}
                  height={1000}
                  className="w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                  quality={85}
                  placeholder="blur"
                  priority
                />
              </div>
              <div className="flex flex-col py-6">
                <p className="text-black-400 font-sora mb-2 text-sm">
                  {resource.date}
                </p>
                <h3 className="text-black-700 mb-3 line-clamp-2 text-lg font-semibold">
                  {resource.title}
                </h3>
                <p className="text-text-color font-sora flex-1 text-xs leading-[160%]">
                  {resource.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
