"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  ChevronDown,
  ChevronUp,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";
import Container from "@/src/components/layouts/container";
import resourceDetailImage from "@/public/images/resource-detail.png";
import resourceContentImage from "@/public/images/resource-content-img.png";
import type { Resource } from "../data/resources";
import { ResourcesGridSecondary } from "./resources-grid-secondary";

interface ResourceDetailProps {
  resource: Resource;
}

export function ResourceDetail({ resource }: ResourceDetailProps) {
  const [isTocCollapsed, setIsTocCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("section-0");

  const tableOfContents = [
    "Lorem Ipsum dolor sit amet consectetur.",
    "Lorem Ipsum dolor sit amet consectetur.",
    "Lorem Ipsum dolor sit amet consectetur.",
    "Lorem Ipsum dolor sit amet consectetur.",
    "Lorem Ipsum dolor sit amet consectetur.",
    "Lorem Ipsum dolor sit amet consectetur.",
    "Lorem Ipsum dolor sit amet consectetur.",
  ];

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = tableOfContents.map((_, index) => `section-${index}`);
      const scrollPosition = window.scrollY + 100; // Offset for header

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-white py-16">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto"
        >
          {/* Header */}
          <div className="mb-8 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-black-700 mb-4 text-3xl leading-[120%] font-semibold sm:text-4xl"
            >
              {resource.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-black-400 font-sora"
            >
              {resource.date}
            </motion.p>
          </div>

          {/* Featured Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-12 overflow-hidden rounded-2xl"
          >
            <Image
              src={resourceDetailImage}
              alt={resource.title}
              width={1000}
              height={1000}
              className="w-full object-cover"
              quality={90}
              placeholder="blur"
              priority
            />
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid gap-24 lg:grid-cols-6"
          >
            {/* Table of Contents - Left Sidebar */}
            <div className="lg:col-span-2">
              <div className="sticky top-20 space-y-6">
                {/* Table of Contents */}
                <div className="bg-whites-200 rounded-2xl p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-black-700 text-base font-medium">
                      Table of Content
                    </h3>
                    <button
                      onClick={() => setIsTocCollapsed(!isTocCollapsed)}
                      className="hover:bg-greys-100 rounded-full p-1 transition-colors"
                      aria-label={
                        isTocCollapsed
                          ? "Expand table of contents"
                          : "Collapse table of contents"
                      }
                    >
                      {isTocCollapsed ? (
                        <ChevronDown className="text-black-600 h-5 w-5" />
                      ) : (
                        <ChevronUp className="text-black-600 h-5 w-5" />
                      )}
                    </button>
                  </div>

                  <motion.div
                    initial={false}
                    animate={{
                      height: isTocCollapsed ? 0 : "auto",
                      opacity: isTocCollapsed ? 0 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <ul className="space-y-3">
                      {tableOfContents.map((item, index) => {
                        const sectionId = `section-${index}`;
                        const isActive = activeSection === sectionId;
                        return (
                          <li key={index}>
                            <button
                              onClick={() => scrollToSection(sectionId)}
                              className={`font-sora text-left text-sm transition-colors hover:text-black ${
                                isActive
                                  ? "font-medium text-black"
                                  : "text-black-400"
                              }`}
                            >
                              {item}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </motion.div>
                </div>

                {/* Share Section */}
                <div className="bg-whites-200 rounded-2xl p-6">
                  <h3 className="text-black-600 mb-4 text-sm font-medium">
                    Share this article
                  </h3>
                  <div className="flex items-center gap-3">
                    {/* Instagram */}
                    <a
                      href="#"
                      className="bg-greys-100 hover:bg-primary-100 flex h-10 w-10 items-center justify-center rounded-full transition-colors"
                      aria-label="Share on Instagram"
                    >
                      <Instagram className="text-black-600 h-5 w-5" />
                    </a>

                    {/* Facebook */}
                    <a
                      href="#"
                      className="bg-greys-100 hover:bg-primary-100 flex h-10 w-10 items-center justify-center rounded-full transition-colors"
                      aria-label="Share on Facebook"
                    >
                      <Facebook className="text-black-600 h-5 w-5" />
                    </a>

                    {/* Twitter */}
                    <a
                      href="#"
                      className="bg-greys-100 hover:bg-primary-100 flex h-10 w-10 items-center justify-center rounded-full transition-colors"
                      aria-label="Share on Twitter"
                    >
                      <Twitter className="text-black-600 h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content - Right Side */}
            <div className="space-y-8 lg:col-span-4">
              <div className="space-y-8" id="section-0">
                {/* Introduction Section */}
                <div>
                  <h2
                    className={`mb-6 text-2xl font-semibold transition-colors lg:text-3xl ${
                      activeSection === "section-0"
                        ? "text-black"
                        : "text-black-700"
                    }`}
                  >
                    Introduction: Careers in Medicine
                  </h2>
                  <p className="font-sora text-sm leading-relaxed text-black">
                    So, you're interested in pursuing a medical degree! That's
                    an exciting journey ahead of you. Whether you're drawn to
                    the fast-paced environment of emergency medicine, where
                    every second counts and quick decision-making is crucial,
                    the intricacies of surgical procedures that require
                    precision and skill, the continuous care provided in family
                    practice that builds long-term relationships with patients,
                    or perhaps the fascinating world of research that drives
                    medical advancements, the medical field encompasses a
                    diverse spectrum of roles. Each specialty offers unique
                    challenges and rewards, aligning with many different
                    passions and skill sets. You might find yourself captivated
                    by pediatrics, where you can make a difference in the lives
                    of children, or by psychiatry, where understanding the human
                    mind can lead to profound changes in people's lives.
                    Whatever your interests may be, rest assured that there is a
                    fulfilling career in medicine waiting for you, one that not
                    only allows you to grow professionally but also enables you
                    to contribute meaningfully to society.
                  </p>
                </div>

                {/* Content Image */}
                <div className="overflow-hidden rounded-2xl">
                  <Image
                    src={resourceContentImage}
                    alt="Medical professionals in surgical scrubs"
                    width={800}
                    height={500}
                    className="w-full object-cover"
                    quality={90}
                    placeholder="blur"
                  />
                </div>
              </div>

              <div className="space-y-8" id="section-1">
                <div>
                  <h2
                    className={`mb-6 text-2xl font-semibold transition-colors lg:text-3xl ${
                      activeSection === "section-1"
                        ? "text-black"
                        : "text-black-700"
                    }`}
                  >
                    Lorem Ipsum dolor sit amet consectetur.
                  </h2>
                  <p className="font-sora text-sm leading-relaxed text-black">
                    So, you're interested in pursuing a medical degree! That's
                    an exciting journey ahead of you. Whether you're drawn to
                    the fast-paced environment of emergency medicine, where
                    every second counts and quick decision-making is crucial,
                    the intricacies of surgical procedures that require
                    precision and skill, the continuous care provided in family
                    practice that builds long-term relationships with patients,
                    or perhaps the fascinating world of research that drives
                    medical advancements, the medical field encompasses a
                    diverse spectrum of roles. Each specialty offers unique
                    challenges and rewards, aligning with many different
                    passions and skill sets. You might find yourself captivated
                    by pediatrics, where you can make a difference in the lives
                    of children, or by psychiatry, where understanding the human
                    mind can lead to profound changes in people's lives.
                    Whatever your interests may be, rest assured that there is a
                    fulfilling career in medicine waiting for you, one that not
                    only allows you to grow professionally but also enables you
                    to contribute meaningfully to society.
                  </p>
                </div>
              </div>

              {/* Add more sections */}
              {tableOfContents.slice(2).map((item, index) => {
                const sectionId = `section-${index + 2}`;
                const isActive = activeSection === sectionId;
                return (
                  <div key={sectionId} className="space-y-8" id={sectionId}>
                    <div>
                      <h2
                        className={`mb-6 text-2xl font-semibold transition-colors lg:text-3xl ${
                          isActive ? "text-black" : "text-black-700"
                        }`}
                      >
                        {item}
                      </h2>
                      <p className="font-sora text-sm leading-relaxed text-black">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit
                        anim id est laborum.
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      </Container>

      <div className="mt-32">
        <Container>
          <h2 className="mb-8 text-2xl font-semibold transition-colors lg:text-3xl">
            You might also like
          </h2>
        </Container>

        <ResourcesGridSecondary />
      </div>
    </main>
  );
}
