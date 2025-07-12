"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Container from "@/src/components/layouts/container";

// Import resource images
import resource4 from "@/public/images/resource-4.png";
import resource5 from "@/public/images/resource-5.png";
import resource6 from "@/public/images/resource-6.png";
import resource7 from "@/public/images/resource-7.png";

const resources = [
  {
    id: 4,
    title: "M7 MBA Programs – What They Are & How to Get In",
    description:
      "An expert admissions coach details how to get into an elite M7 business school with ways to stand out in your application, with deep-dives into all the M7",
    date: "May 23, 2023",
    image: resource4,
    imageAlt: "MBA students in collaborative meeting",
  },
  {
    id: 5,
    title: "Mastering the GMAT: Strategies for Success",
    description:
      "Discover effective study techniques and time management tips to ace the GMAT, enhancing your chances of acceptance into top business schools.",
    date: "June 15, 2023",
    image: resource5,
    imageAlt: "Student preparing for GMAT exam",
  },
  {
    id: 6,
    title: "Crafting an Outstanding MBA Resume",
    description:
      "Learn how to highlight your achievements and experiences to create a compelling resume that captures the attention of admissions committees.",
    date: "July 10, 2023",
    image: resource6,
    imageAlt: "Professional working on MBA resume",
  },
  {
    id: 7,
    title: "Networking for MBA Success: Building Your Professional Circle",
    description:
      "Explore the importance of networking in the MBA application process and strategies to connect with alumni and industry professionals.",
    date: "August 5, 2023",
    image: resource7,
    imageAlt: "MBA networking event",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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

export function ResourcesGridSecondary() {
  return (
    <section className="bg-white pb-16">
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {resources.map((resource) => (
            <Link
              key={resource.id}
              href={`/resources/${resource.id}`}
              className="cursor-pointer"
            >
              <motion.div
                variants={cardVariants}
                whileHover={{
                  y: -5,
                  transition: { duration: 0.2 },
                }}
                className="group flex flex-col overflow-hidden bg-white"
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
            </Link>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
