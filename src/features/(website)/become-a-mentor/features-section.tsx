"use client";

import { motion } from "framer-motion";
import Container from "@/src/components/layouts/container";
import Submit from "@/src/components/icons/Submit";
import Receive from "@/src/components/icons/Receive";
import Start from "@/src/components/icons/Start";
import Grow from "@/src/components/icons/Grow";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/src/components/ui/carousel";
import { cn } from "@/src/lib/utils";

const features = [
  {
    id: 1,
    icon: Submit,
    title: "Submit",
    description:
      "Create your coaching profile and share your areas of expertise with us.",
    bgColor: "bg-primary-100",
  },
  {
    id: 2,
    icon: Receive,
    title: "Receive authorization",
    description:
      "Our dedicated team evaluates your profile to connect you with the most suitable mentors at Dentispark.",
    bgColor: "bg-[#EAEEFF]",
  },
  {
    id: 3,
    icon: Start,
    title: "Start mentoring",
    description:
      "We'll assess your details and provide you with the go-ahead to begin mentoring!",
    bgColor: "bg-[#FDF0E6]",
  },
  {
    id: 4,
    icon: Grow,
    title: "Grow your enterprise",
    description:
      "Generate income, enhance your reputation, and mentor the future leaders of tomorrow.",
    bgColor: "bg-[#FBEAEA]",
  },
];

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

export function FeaturesSection() {
  return (
    <section className="bg-white py-16">
      <Container>
        <div className="w-full">
          <Carousel className="w-full overflow-visible">
            <CarouselContent>
              {features.map((feature) => {
                const IconComponent = feature.icon;
                return (
                  <CarouselItem
                    key={feature.id}
                    className={cn(
                      "flex-shrink-0 basis-[95%] p-3 sm:basis-[50%] lg:basis-[25%] xl:basis-[25%]",
                    )}
                  >
                    <motion.div
                      variants={cardVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      whileHover={{
                        y: -5,
                        transition: { duration: 0.2 },
                      }}
                      className={`${feature.bgColor} group relative h-full overflow-hidden rounded-[12px] p-6 transition-shadow duration-300 hover:shadow-sm`}
                    >
                      {/* Icon */}
                      <div className="mb-6 flex items-center justify-start">
                        <div className="text-4xl">
                          <IconComponent className="size-8" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="space-y-4">
                        <h3 className="text-black-600 text-base font-semibold">
                          {feature.title}
                        </h3>
                        <p className="text-black-500 w-[70%] text-sm leading-relaxed md:w-full">
                          {feature.description}
                        </p>
                      </div>
                    </motion.div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>
        </div>
      </Container>
    </section>
  );
}
