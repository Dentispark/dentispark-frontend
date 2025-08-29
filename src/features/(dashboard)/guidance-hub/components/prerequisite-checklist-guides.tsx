"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Breadcrumb } from "@/src/components/ui/breadcrumb";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/src/components/ui/carousel";
import Image from "next/image";

interface Guide {
  id: string;
  title: string;
  description: string;
  date: string;
  image: string;
  category: string;
}

const mockGuides: Guide[] = [
  {
    id: "1",
    title: "M7 MBA Programs – What They Are & How to Get In",
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
    image: "/images/resource-3.png",
    category: "GMAT",
  },
];

interface PrerequisiteChecklistGuidesProps {
  className?: string;
}

export default function PrerequisiteChecklistGuides({
  className,
}: PrerequisiteChecklistGuidesProps) {
  const router = useRouter();

  const handleGoBack = () => {
    router.push("/guidance-hub");
  };

  const breadcrumbItems = [
    { label: "Guidance Hub", href: "/guidance-hub" },
    { label: "Guides", isActive: true },
  ];

  return (
    <div className={`min-h-screen bg-white ${className || ""}`}>
      {/* Breadcrumb Navigation */}
      <div className="bg-white py-4">
        <Breadcrumb items={breadcrumbItems} onBack={handleGoBack} />
      </div>

      <div className="py-8">
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-text-color text-xl font-semibold">
            Prerequisite Checklist Guides
          </h1>
        </motion.div>

        {/* Guides Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-16"
        >
          <div className="block">
            <Carousel
              opts={{
                align: "start",
                loop: false,
                dragFree: false,
                containScroll: "trimSnaps",
              }}
              className="w-full"
            >
              <CarouselContent className="">
                {mockGuides.map((guide, index) => (
                  <CarouselItem
                    key={guide.id}
                    className="basis-[85%] pl-4 sm:basis-[70%] md:basis-1/2 lg:basis-[35%] [@media(min-width:1800px)]:basis-1/4 [@media(min-width:2300px)]:basis-1/5 [@media(min-width:2800px)]:basis-1/6"
                  >
                    <motion.div
                      className="flex h-full cursor-pointer flex-col rounded-xl transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      onClick={() =>
                        router.push(
                          `/guidance-hub/prerequisite-checklist-guides/${guide.id}`,
                        )
                      }
                    >
                      <div className="relative">
                        <Image
                          src={guide.image}
                          alt={guide.title}
                          className="h-[200px] w-full rounded-xl object-cover md:h-[250px]"
                          width={1000}
                          height={1000}
                          priority
                          quality={90}
                        />
                      </div>
                      <div className="flex flex-1 flex-col pt-4">
                        <p className="text-black-500 font-sora mb-2 text-xs">
                          {guide.date}
                        </p>
                        <h3 className="text-black-800 mb-2 line-clamp-2 text-sm font-semibold md:text-base">
                          {guide.title}
                        </h3>
                        <p className="text-black-600 font-sora line-clamp-3 flex-1 text-xs md:text-sm">
                          {guide.description}
                        </p>
                      </div>
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="hidden md:block">
                <CarouselPrevious className="border-greys-300 hover:bg-greys-50 absolute top-1/2 left-2 size-10 -translate-y-1/2 border bg-white shadow-lg" />
                <CarouselNext className="border-greys-300 hover:bg-greys-50 absolute top-1/2 -right-2 size-10 -translate-y-1/2 border bg-white shadow-lg" />
              </div>
            </Carousel>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
