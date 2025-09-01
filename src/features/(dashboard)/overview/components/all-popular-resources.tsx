"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface Resource {
  id: string;
  title: string;
  description: string;
  date: string;
  image: string;
  category: string;
}

const mockResources: Resource[] = [
  {
    id: "1",
    title: "M7 MBA Programs - What They Are & How to Get In",
    description:
      "An expert admissions coach details how to get into an elite M7 business school with ways to stand out in your application and showcase leadership potential.",
    date: "May 23, 2023",
    image: "/images/resource-1.png",
    category: "MBA",
  },
  {
    id: "2",
    title: "Mastering the GMAT: Strategies for Success",
    description:
      "Discover effective study techniques and time management tips to ace the GMAT, enhancing your chances of admission to top business schools.",
    date: "June 15, 2023",
    image: "/images/resource-2.png",
    category: "GMAT",
  },
  {
    id: "3",
    title: "Mastering the GMAT: Strategies for Success",
    description:
      "Discover effective study techniques and time management tips to ace the GMAT, enhancing your chances of admission to top business schools.",
    date: "June 15, 2023",
    image: "/images/resource-2.png",
    category: "GMAT",
  },
  {
    id: "4",
    title: "Networking for MBA Success: Building Connections",
    description:
      "Learn how to effectively network with alumni and industry professionals to boost your MBA journey and career prospects.",
    date: "July 10, 2023",
    image: "/images/resource-1.png",
    category: "MBA",
  },
  {
    id: "5",
    title: "Navigating MBA Interviews: Tips and Best Practices",
    description:
      "Get insights on how to prepare for MBA interviews, including common questions and how to present your best self.",
    date: "August 5, 2023",
    image: "/images/resource-2.png",
    category: "MBA",
  },
  {
    id: "6",
    title: "Mastering the GMAT: Strategies for Success",
    description:
      "Discover effective study techniques and time management tips to ace the GMAT, enhancing your chances of admission to top business schools.",
    date: "June 15, 2023",
    image: "/images/resource-2.png",
    category: "GMAT",
  },
  {
    id: "7",
    title: "The Importance of Leadership in MBA Programs",
    description:
      "Explore how leadership skills are cultivated in MBA programs and their impact on career advancement.",
    date: "September 1, 2023",
    image: "/images/resource-1.png",
    category: "MBA",
  },
  {
    id: "8",
    title: "Creating a Strong MBA Application: Key Components",
    description:
      "Understand the essential elements of a compelling MBA application, from essays to letters of recommendation.",
    date: "October 10, 2023",
    image: "/images/resource-2.png",
    category: "MBA",
  },
  {
    id: "9",
    title: "Mastering the GMAT: Strategies for Success",
    description:
      "Discover effective study techniques and time management tips to ace the GMAT, enhancing your chances of admission to top business schools.",
    date: "June 15, 2023",
    image: "/images/resource-2.png",
    category: "GMAT",
  },
];

export default function AllPopularResources() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-full overflow-hidden"
    >
      {/* Title Section */}
      <div className="mb-8">
        <h1 className="text-black-800 text-xl font-semibold md:text-2xl">
          Popular Resources
        </h1>
      </div>

      {/* Resources Grid */}
      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 [@media(min-width:1800px)]:grid-cols-4 [@media(min-width:2300px)]:grid-cols-5 [@media(min-width:2800px)]:grid-cols-6">
        {mockResources.map((resource, index) => (
          <motion.div
            key={resource.id}
            className="flex h-full w-full cursor-pointer flex-col transition-transform hover:scale-[1.02]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <div className="relative">
              <Image
                src={resource.image}
                alt={resource.title}
                className="h-[200px] w-full rounded-xl object-cover"
                width={400}
                height={200}
                priority={index < 6}
                quality={90}
              />
            </div>
            <div className="flex flex-1 flex-col pt-4">
              <p className="text-black-500 font-sora mb-2 text-xs">
                {resource.date}
              </p>
              <h3 className="text-black-800 mb-2 line-clamp-2 text-base leading-tight font-semibold">
                {resource.title}
              </h3>
              <p className="text-black-600 font-sora line-clamp-2 flex-1 text-sm leading-relaxed">
                {resource.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
