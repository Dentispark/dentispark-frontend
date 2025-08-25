"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import Container from "@/src/components/layouts/container";

import ucatImage from "@/public/images/ucat.png";
import bookletImage from "@/public/images/booklet.png";
import { cn } from "@/src/lib/utils";

const freeResources = [
  {
    id: 1,
    title: "UCAT Prep Guide",
    description: "Master the UCAT with confidence",
    ctaText: "Get it now",
    image: ucatImage,
    imageAlt: "UCAT Prep Guide",
    backgroundColor: "bg-green-50",
    href: "/resources",
  },
  {
    id: 2,
    title: "Dental Schools Council 2025 Booklet",
    description: "Your official guide to UK Dental education",
    ctaText: "Get it now",
    image: bookletImage,
    imageAlt: "Dental Schools Council 2025 Booklet",
    backgroundColor: "bg-secondary-50",
    href: "/resources",
  },
];

const additionalResources = [
  {
    id: 3,
    title: "Personal Statement Template",
    description: "Craft a compelling and structured personal statement",
    ctaText: "Get it now",
    backgroundColor: "bg-[#FDF0E6]",
    href: "/resources",
    icon: (
      <svg width="200" height="200" viewBox="0 0 100 100" fill="none">
        <rect
          x="20"
          y="15"
          width="50"
          height="65"
          rx="3"
          fill="#FFF4E6"
          stroke="#FB923C"
          strokeWidth="2"
        />
        <rect x="25" y="25" width="15" height="2" fill="#FB923C" />
        <rect x="25" y="30" width="25" height="2" fill="#FB923C" />
        <rect x="25" y="35" width="20" height="2" fill="#FB923C" />
        <rect x="45" y="15" width="25" height="40" rx="3" fill="#FB923C" />
        <rect x="50" y="20" width="15" height="2" fill="white" />
        <rect x="50" y="25" width="10" height="2" fill="white" />
      </svg>
    ),
  },
  {
    id: 4,
    title: "Financial Support Guide",
    description: "Understanding funding options for your academic journey",
    ctaText: "Get it now",
    backgroundColor: "bg-[#F8F8F8]",
    href: "/resources",
    icon: (
      <svg width="200" height="200" viewBox="0 0 100 100" fill="none">
        <circle
          cx="50"
          cy="40"
          r="15"
          fill="#DBEAFE"
          stroke="#3B82F6"
          strokeWidth="2"
        />
        <text
          x="50"
          y="45"
          textAnchor="middle"
          fill="#3B82F6"
          fontSize="12"
          fontWeight="bold"
        >
          £
        </text>
        <rect x="35" y="60" width="8" height="8" fill="#F59E0B" />
        <rect x="45" y="60" width="8" height="8" fill="#F59E0B" />
        <rect x="55" y="60" width="8" height="8" fill="#F59E0B" />
        <circle cx="25" cy="30" r="8" fill="#10B981" />
        <circle cx="75" cy="35" r="6" fill="#EF4444" />
      </svg>
    ),
  },
  {
    id: 5,
    title: "Dental Nursing Apprenticeship Guide",
    description: "Your Step-by-Step guide to becoming a qualified Dental Nurse",
    ctaText: "Get it now",
    backgroundColor: "bg-error-50",
    href: "/resources",
    icon: (
      <svg width="200" height="200" viewBox="0 0 100 100" fill="none">
        <rect
          x="30"
          y="20"
          width="40"
          height="55"
          rx="4"
          fill="#FEF2F2"
          stroke="#EF4444"
          strokeWidth="2"
        />
        <rect x="35" y="30" width="30" height="3" fill="#EF4444" />
        <rect x="35" y="37" width="25" height="2" fill="#EF4444" />
        <rect x="35" y="42" width="20" height="2" fill="#EF4444" />
        <rect x="35" y="47" width="28" height="2" fill="#EF4444" />
        <rect x="45" y="15" width="10" height="8" fill="#EF4444" />
      </svg>
    ),
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

export function FreeTools() {
  return (
    <section className="py-16">
      <Container className="flex flex-col items-center space-y-12">
        <div className="space-y-6">
          <h2 className="text-text-heading max-w-3xl text-center text-3xl font-extrabold sm:text-5xl">
            Begin your Dental journey with{" "}
            <span className="text-primary">free resources</span>
          </h2>
          <p className="text-text-color font-sora max-w-3xl text-center text-sm leading-[200%] sm:text-base sm:leading-[160%]">
            Access guides, university data, AI-driven checklists, and financial
            support tailored to your year and goals.
          </p>
        </div>

        {/* Resources Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 md:items-stretch"
        >
          {freeResources.map((resource) => (
            <Link
              key={resource.id}
              href={resource.href}
              className="flex cursor-pointer"
            >
              <motion.div
                variants={cardVariants}
                whileHover={{
                  y: -5,
                  transition: { duration: 0.2 },
                }}
                className={`group flex w-full overflow-hidden rounded-2xl border transition-all duration-300`}
              >
                <div className="flex w-[55%] flex-col justify-center px-4 py-8">
                  <div className="flex w-[90%] flex-col space-y-3">
                    <h3 className="text-text-heading text-base font-semibold md:w-[70%]">
                      {resource.title}
                    </h3>
                    <p className="text-text-color font-sora text-xs leading-relaxed md:w-[70%]">
                      {resource.description}
                    </p>

                    <div className="text-primary group-hover:text-primary-dark mt-4 flex items-center space-x-2 font-medium transition-colors duration-200">
                      <span className="text-xs">{resource.ctaText}</span>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="transition-transform duration-200 group-hover:translate-x-1"
                      >
                        <path
                          d="M5 12h14m-7-7l7 7-7 7"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div
                  className={cn(
                    "flex w-[45%] items-center justify-center p-8",
                    resource.backgroundColor,
                  )}
                >
                  <Image
                    src={resource.image}
                    alt={resource.imageAlt}
                    width={1000}
                    height={1000}
                    className="w-[250px] object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                    quality={85}
                    priority
                  />
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>

        {/* Additional Resources - 3 Card Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-3"
        >
          {additionalResources.map((resource) => (
            <Link
              key={resource.id}
              href={resource.href}
              className="flex cursor-pointer"
            >
              <motion.div
                variants={cardVariants}
                whileHover={{
                  y: -5,
                  transition: { duration: 0.2 },
                }}
                className={`group flex w-full flex-col overflow-hidden rounded-2xl border transition-all duration-300 hover:shadow-lg`}
              >
                {/* Icon Section */}
                <div
                  className={cn(
                    "flex items-center justify-center",
                    resource.backgroundColor,
                  )}
                >
                  <div className="transition-transform duration-300 ease-out group-hover:scale-105">
                    {resource.icon}
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex flex-col justify-center px-6 pt-6 pb-10">
                  <div className="flex flex-col space-y-4">
                    <h3 className="text-text-heading text-base font-semibold">
                      {resource.title}
                    </h3>
                    <p className="text-text-color font-sora text-xs leading-relaxed">
                      {resource.description}
                    </p>
                    <div className="text-primary group-hover:text-primary-dark flex items-center space-x-2 font-medium transition-colors duration-200">
                      <span className="text-xs">{resource.ctaText}</span>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="transition-transform duration-200 group-hover:translate-x-1"
                      >
                        <path
                          d="M5 12h14m-7-7l7 7-7 7"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
