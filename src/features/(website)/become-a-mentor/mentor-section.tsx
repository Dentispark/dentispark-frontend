"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import Container from "@/src/components/layouts/container";

// Import mentor images
import mentor1 from "@/public/images/mentor-img-1.png";
import mentor2 from "@/public/images/mentor-img-2.png";

const mentors = [
  {
    id: 1,
    name: "Dr. Uzomaka Aaron",
    title: "Mentor & Dental Surgeon",
    quote:
      "When I heard about Leland, I felt an immediate calling to get involved. Education, and the opportunities that it affords, is so vital, especially in bridging the gap between the privileged few and the non-quite-as-privileged many. That is why I coach.",
    image: mentor1,
    profileLink: "#",
  },
  {
    id: 2,
    name: "Dr. Baird James",
    title: "Mentor & Dental Surgeon",
    quote:
      "Building relationships with individuals from outside my typical circle, hearing about their paths and how they're preparing for careers is inspiring and motivating. A little extra money on the side is never a bad perk either. If you're interested and qualified to coach, I'd recommend giving it a try.",
    image: mentor2,
    profileLink: "#",
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

export function MentorSection() {
  return (
    <section className="bg-wgite pb-20">
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-6 lg:grid-cols-2"
        >
          {mentors.map((mentor) => (
            <motion.div
              key={mentor.id}
              variants={cardVariants}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.3 },
              }}
              className="group relative overflow-hidden rounded-2xl"
            >
              {/* Background Image */}
              <div className="relative h-[500px] w-full">
                <Image
                  src={mentor.image}
                  alt={mentor.name}
                  fill
                  className="object-cover"
                  quality={85}
                  placeholder="blur"
                />
              </div>

              {/* Content Overlay */}
              <div className="absolute inset-0 mb-4 flex flex-col justify-end p-10 text-white">
                {/* Quote */}
                <div className="mb-10">
                  <p className="text-sm leading-relaxed opacity-90">
                    &ldquo;{mentor.quote}&rdquo;
                  </p>
                </div>

                <div className="flex flex-col gap-6 md:flex-row md:justify-between">
                  {/* Mentor Info */}
                  <div className="font-sora">
                    <h3 className="text-primary text-lg font-semibold">
                      {mentor.name}
                    </h3>
                    <p className="text-xs">{mentor.title}</p>
                  </div>

                  {/* Profile Button */}
                  <div>
                    <Link href={`/become-a-mentor/${mentor.id}`}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="font-sora border-white bg-transparent text-sm font-light text-white hover:bg-white hover:text-black"
                      >
                        View my Profile
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
