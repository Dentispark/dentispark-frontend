"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { cn } from "@/src/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/src/components/ui/carousel";

interface GuidanceMenuItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  bgColor: string;
  textColor: string;
  borderColor: string;
  href?: string;
}

const guidanceMenuItems: GuidanceMenuItem[] = [
  {
    id: "basic-ucat-prep",
    title: "Basic UCAT Prep",
    description: "Take our short quiz to boost your chances",
    href: "/guidance-hub/quiz",
    icon: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          opacity="0.4"
          d="M24 10.5994V42.6594C23.66 42.6594 23.3 42.5994 23.02 42.4394L22.94 42.3994C19.1 40.2994 12.4 38.0994 8.06 37.5194L7.48 37.4394C5.56 37.1994 4 35.3994 4 33.4794V9.3194C4 6.9394 5.94 5.1394 8.32 5.3394C12.52 5.6794 18.88 7.7994 22.44 10.0194L22.94 10.3194C23.24 10.4994 23.62 10.5994 24 10.5994Z"
          fill="#2A50FA"
        />
        <path
          d="M44 9.33908V33.4791C44 35.3991 42.44 37.1991 40.52 37.4391L39.86 37.5191C35.5 38.0991 28.78 40.3191 24.94 42.4391C24.68 42.5991 24.36 42.6591 24 42.6591V10.5991C24.38 10.5991 24.76 10.4991 25.06 10.3191L25.4 10.0991C28.96 7.85908 35.34 5.71908 39.54 5.35908H39.66C42.04 5.15908 44 6.93908 44 9.33908Z"
          fill="#2A50FA"
        />
        <path
          d="M15.5 18.4805H11C10.18 18.4805 9.5 17.8005 9.5 16.9805C9.5 16.1605 10.18 15.4805 11 15.4805H15.5C16.32 15.4805 17 16.1605 17 16.9805C17 17.8005 16.32 18.4805 15.5 18.4805Z"
          fill="#2A50FA"
        />
        <path
          d="M17 24.4805H11C10.18 24.4805 9.5 23.8005 9.5 22.9805C9.5 22.1605 10.18 21.4805 11 21.4805H17C17.82 21.4805 18.5 22.1605 18.5 22.9805C18.5 23.8005 17.82 24.4805 17 24.4805Z"
          fill="#2A50FA"
        />
      </svg>
    ),
    bgColor: "bg-secondary-50",
    textColor: "text-secondary-700",
    borderColor: "border-secondary-100",
  },
  {
    id: "personal-statement",
    title: "Personal Statement Templates",
    description: "Explore your application success!",
    href: "/guidance-hub/personal-statement-template",
    icon: (
      <svg
        width="49"
        height="48"
        viewBox="0 0 49 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          opacity="0.4"
          d="M42.668 14V34C42.668 40 39.668 44 32.668 44H16.668C9.66797 44 6.66797 40 6.66797 34V14C6.66797 8 9.66797 4 16.668 4H32.668C39.668 4 42.668 8 42.668 14Z"
          fill="#12AC75"
        />
        <path
          d="M37.668 18.5H33.668C30.628 18.5 28.168 16.04 28.168 13V9C28.168 8.18 28.848 7.5 29.668 7.5C30.488 7.5 31.168 8.18 31.168 9V13C31.168 14.38 32.288 15.5 33.668 15.5H37.668C38.488 15.5 39.168 16.18 39.168 17C39.168 17.82 38.488 18.5 37.668 18.5Z"
          fill="#12AC75"
        />
        <path
          d="M24.668 27.5H16.668C15.848 27.5 15.168 26.82 15.168 26C15.168 25.18 15.848 24.5 16.668 24.5H24.668C25.488 24.5 26.168 25.18 26.168 26C26.168 26.82 25.488 27.5 24.668 27.5Z"
          fill="#12AC75"
        />
        <path
          d="M32.668 35.5H16.668C15.848 35.5 15.168 34.82 15.168 34C15.168 33.18 15.848 32.5 16.668 32.5H32.668C33.488 32.5 34.168 33.18 34.168 34C34.168 34.82 33.488 35.5 32.668 35.5Z"
          fill="#12AC75"
        />
      </svg>
    ),
    bgColor: "bg-primary-100",
    textColor: "text-primary-700",
    borderColor: "border-primary-200",
  },
  {
    id: "prerequisite-checklist",
    title: "Prerequisite Checklist Guides",
    description: "Explore our expertly crafted guides!",
    href: "/guidance-hub/prerequisite-checklist-guides",
    icon: (
      <svg
        width="49"
        height="48"
        viewBox="0 0 49 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          opacity="0.4"
          d="M24.332 40C33.1686 40 40.332 32.8366 40.332 24C40.332 15.1634 33.1686 8 24.332 8C15.4955 8 8.33203 15.1634 8.33203 24C8.33203 32.8366 15.4955 40 24.332 40Z"
          fill="#ED6C02"
        />
        <path
          d="M24.3337 30.2417C27.78 30.2417 30.5737 27.448 30.5737 24.0017C30.5737 20.5555 27.78 17.7617 24.3337 17.7617C20.8875 17.7617 18.0938 20.5555 18.0938 24.0017C18.0938 27.448 20.8875 30.2417 24.3337 30.2417Z"
          fill="#ED6C02"
        />
        <path
          d="M25.832 4V8.08H25.812C25.332 8.02 24.832 8 24.332 8C23.832 8 23.332 8.02 22.852 8.08H22.832V4C22.832 3.18 23.512 2.5 24.332 2.5C25.152 2.5 25.832 3.18 25.832 4Z"
          fill="#ED6C02"
        />
        <path
          d="M8.33203 24C8.33203 24.5 8.35203 25.02 8.41203 25.5H4.33203C3.51203 25.5 2.83203 24.82 2.83203 24C2.83203 23.18 3.51203 22.5 4.33203 22.5H8.41203C8.35203 22.98 8.33203 23.5 8.33203 24Z"
          fill="#ED6C02"
        />
        <path
          d="M25.832 39.9219V44.0019C25.832 44.8219 25.152 45.5019 24.332 45.5019C23.512 45.5019 22.832 44.8219 22.832 44.0019V39.9219H22.852C23.332 39.9819 23.832 40.0019 24.332 40.0019C24.832 40.0019 25.332 39.9819 25.812 39.9219H25.832Z"
          fill="#ED6C02"
        />
        <path
          d="M45.8339 24C45.8339 24.82 45.1539 25.5 44.3339 25.5H40.2539C40.3139 25.02 40.3339 24.5 40.3339 24C40.3339 23.5 40.3139 22.98 40.2539 22.5H44.3339C45.1539 22.5 45.8339 23.18 45.8339 24Z"
          fill="#ED6C02"
        />
      </svg>
    ),
    bgColor: "bg-[#FDF0E6]",
    textColor: "text-warning-600",
    borderColor: "border-warning-200",
  },
];

export default function GuidanceHubMenu() {
  const router = useRouter();

  const handleItemClick = (item: GuidanceMenuItem) => {
    if (item.href) {
      router.push(item.href);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-10"
    >
      <div className="mb-6">
        <h1 className="text-black-800 text-2xl font-semibold md:text-2xl">
          Guidance Hub
        </h1>
      </div>

      {/* Mobile: Carousel */}
      <div className="md:hidden">
        <Carousel
          opts={{
            align: "start",
            loop: false,
            dragFree: false,
            containScroll: "trimSnaps",
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {guidanceMenuItems.map((item, index) => (
              <CarouselItem
                key={item.id}
                className="basis-[85%] pl-4 sm:basis-[70%]"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  onClick={() => handleItemClick(item)}
                  className={cn(
                    "flex h-full cursor-pointer flex-col rounded-lg border p-6 transition-all duration-200 hover:scale-[1.01] hover:shadow-lg",
                    item.borderColor,
                    item.bgColor,
                  )}
                >
                  <div className="mb-4">
                    <div
                      className={cn(
                        "inline-flex h-12 w-12 items-center justify-center rounded-xl text-white",
                        item.borderColor,
                      )}
                    >
                      {item.icon}
                    </div>
                  </div>

                  <h3
                    className={cn("mb-2 text-lg font-semibold", item.textColor)}
                  >
                    {item.title}
                  </h3>

                  <p className="font-sora flex-1 text-sm leading-relaxed text-gray-600">
                    {item.description}
                  </p>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      {/* Desktop: Grid */}
      <div className="hidden grid-cols-1 gap-4 md:grid md:grid-cols-3">
        {guidanceMenuItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            onClick={() => handleItemClick(item)}
            className={cn(
              "flex h-full cursor-pointer flex-col rounded-lg border p-6 transition-all duration-200 hover:scale-[1.01] hover:shadow-lg",
              item.borderColor,
              item.bgColor,
            )}
          >
            <div className="mb-4">
              <div
                className={cn(
                  "inline-flex h-12 w-12 items-center justify-center rounded-xl text-white",
                  item.borderColor,
                )}
              >
                {item.icon}
              </div>
            </div>

            <h3 className={cn("mb-2 text-lg font-semibold", item.textColor)}>
              {item.title}
            </h3>

            <p className="font-sora flex-1 text-sm leading-relaxed text-gray-600">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
