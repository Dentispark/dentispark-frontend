"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AppTabs,
  AppTabsList,
  AppTabsTrigger,
  AppTabsContent,
} from "@/src/components/layouts/tabs";
import { cn } from "@/src/lib/utils";

interface MentorProfileTabsProps {
  mentor: {
    about: string;
    workExperience: {
      company: string;
      role?: string;
      duration?: string;
      description?: string;
    }[];
    education: {
      institution: string;
      program: string;
      duration?: string;
      description?: string;
    }[];
    ratings: {
      average: number;
      total: number;
      reviews: {
        id: string;
        rating: number;
        comment: string;
        date: string;
        studentName: string;
      }[];
    };
  };
  className?: string;
}

export function MentorProfileTabs({
  mentor,
  className,
}: MentorProfileTabsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState("about");

  const handleTabChange = (value: string) => {
    setActiveTab(value);

    // Find the clicked tab element and scroll it into view
    const tabElement = scrollContainerRef.current?.querySelector(
      `[data-state="active"][data-value="${value}"]`,
    ) as HTMLElement;

    if (tabElement && scrollContainerRef.current) {
      // Small delay to ensure the tab state has updated
      setTimeout(() => {
        tabElement.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }, 50);
    }
  };

  const tabVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  const tabs = [
    { id: "about", label: "About" },
    { id: "work-experience", label: "Work Experience" },
    { id: "education", label: "Education" },
    { id: "ratings", label: "Ratings and review" },
  ];

  return (
    <div className={cn("bg-white", className)}>
      <AppTabs
        defaultValue="about"
        className="w-full"
        onValueChange={handleTabChange}
      >
        {/* Tab Navigation */}
        <div
          ref={scrollContainerRef}
          className="border-greys-300 relative overflow-x-auto border-b"
        >
          <AppTabsList className="relative h-auto w-full min-w-max bg-transparent p-0 sm:min-w-0">
            {tabs.map((tab) => (
              <AppTabsTrigger
                key={tab.id}
                value={tab.id}
                className={cn(
                  "text-text-color relative px-3 py-2 text-xs whitespace-nowrap transition-colors duration-200 sm:px-4 sm:py-3",
                  activeTab === tab.id
                    ? "text-primary-700"
                    : "hover:text-primary-400",
                )}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    className="bg-primary-700 absolute right-0 bottom-0 left-0 h-0.5"
                    layoutId="activeTabIndicator"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                    }}
                  />
                )}
              </AppTabsTrigger>
            ))}
          </AppTabsList>
        </div>

        {/* Tab Content */}
        <div className="relative min-h-[400px] overflow-hidden pt-20 md:min-h-[300px]">
          <AnimatePresence mode="wait">
            {/* About Tab */}
            {activeTab === "about" && (
              <motion.div
                key="about"
                variants={tabVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute inset-0 w-full py-6"
              >
                <AppTabsContent value="about" className="">
                  <div className="space-y-6">
                    <div className="flex flex-col gap-2">
                      <h2 className="font-sora text-black-600 text-base font-semibold">
                        Business Owner
                      </h2>
                      <span className="font-sora flex gap-4">
                        <p className="text-black-400 text-xs">
                          Wise Graduate Admission
                        </p>
                        <p className="text-black-400 text-xs">
                          July 2013 - Present
                        </p>
                      </span>
                    </div>

                    <div className="prose text-text-color max-w-none text-sm">
                      <p className="text-black-500 font-sora leading-relaxed whitespace-pre-line">
                        {mentor.about}
                      </p>
                    </div>
                  </div>
                </AppTabsContent>
              </motion.div>
            )}

            {/* Work Experience Tab */}
            {activeTab === "work-experience" && (
              <motion.div
                key="work-experience"
                variants={tabVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute inset-0 w-full py-6"
              >
                <AppTabsContent value="work-experience" className="">
                  <div className="space-y-6">
                    <h2 className="font-sora text-black-600 text-xl font-semibold">
                      Work Experience
                    </h2>
                    <div className="space-y-6">
                      {mentor.workExperience.map((work, index) => (
                        <motion.div
                          key={index}
                          className="border-greys-300 border-l-2 pl-6"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <h3 className="text-black-600 font-medium">
                                {work.role || "Professional"}
                              </h3>
                              <span className="text-black-400">at</span>
                              <span className="text-black-600 font-medium">
                                {work.company}
                              </span>
                            </div>
                            {work.duration && (
                              <p className="text-black-400 text-sm">
                                {work.duration}
                              </p>
                            )}
                            {work.description && (
                              <p className="text-black-500 leading-relaxed">
                                {work.description}
                              </p>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </AppTabsContent>
              </motion.div>
            )}

            {/* Education Tab */}
            {activeTab === "education" && (
              <motion.div
                key="education"
                variants={tabVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute inset-0 w-full py-6"
              >
                <AppTabsContent value="education" className="">
                  <div className="space-y-6">
                    <h2 className="font-sora text-black-600 text-xl font-semibold">
                      Education
                    </h2>
                    <div className="space-y-6">
                      {mentor.education.map((edu, index) => (
                        <motion.div
                          key={index}
                          className="border-greys-300 border-l-2 pl-6"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <h3 className="text-black-600 font-medium">
                                {edu.program}
                              </h3>
                              <span className="text-black-400">at</span>
                              <span className="text-black-600 font-medium">
                                {edu.institution}
                              </span>
                            </div>
                            {edu.duration && (
                              <p className="text-black-400 text-sm">
                                {edu.duration}
                              </p>
                            )}
                            {edu.description && (
                              <p className="text-black-500 leading-relaxed">
                                {edu.description}
                              </p>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </AppTabsContent>
              </motion.div>
            )}

            {/* Ratings Tab */}
            {activeTab === "ratings" && (
              <motion.div
                key="ratings"
                variants={tabVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute inset-0 w-full py-6"
              >
                <AppTabsContent value="ratings" className="">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <h2 className="font-sora text-black-600 text-xl font-semibold">
                        Ratings and reviews
                      </h2>
                      <div className="flex items-center gap-2">
                        <span className="text-black-600 text-lg font-semibold">
                          {mentor.ratings.average}
                        </span>
                        <span className="text-black-400">
                          ({mentor.ratings.total} reviews)
                        </span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {mentor.ratings.reviews.map((review, index) => (
                        <motion.div
                          key={review.id}
                          className="border-greys-200 border-b pb-4 last:border-b-0"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="flex items-start justify-between">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <span className="text-black-600 font-medium">
                                  {review.studentName}
                                </span>
                                <div className="flex items-center">
                                  {Array.from({ length: 5 }, (_, i) => (
                                    <svg
                                      key={i}
                                      className={cn(
                                        "h-4 w-4",
                                        i < review.rating
                                          ? "fill-current text-yellow-400"
                                          : "fill-current text-gray-300",
                                      )}
                                      viewBox="0 0 20 20"
                                    >
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                  ))}
                                </div>
                              </div>
                              <p className="text-black-500 leading-relaxed">
                                {review.comment}
                              </p>
                            </div>
                            <span className="text-black-400 text-sm">
                              {review.date}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </AppTabsContent>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </AppTabs>
    </div>
  );
}
