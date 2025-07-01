"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Twitter, Instagram, Facebook, Linkedin } from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  title: string;
  image: string;
  socialLinks: {
    twitter?: string;
    instagram?: string;
    facebook?: string;
    linkedin?: string;
  };
}

const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "John Doe",
    title: "Founder/CEO",
    image: "/images/team-1.png",
    socialLinks: {
      twitter: "#",
      instagram: "#",
      facebook: "#",
      linkedin: "#",
    },
  },
  {
    id: "2",
    name: "Jane Smith",
    title: "CTO",
    image: "/images/team-2.png",
    socialLinks: {
      twitter: "#",
      instagram: "#",
      facebook: "#",
      linkedin: "#",
    },
  },
  {
    id: "3",
    name: "Michael Brown",
    title: "CFO",
    image: "/images/team-3.png",
    socialLinks: {
      twitter: "#",
      instagram: "#",
      facebook: "#",
      linkedin: "#",
    },
  },
  {
    id: "4",
    name: "John Doe",
    title: "Founder/CEO",
    image: "/images/team-4.png",
    socialLinks: {
      twitter: "#",
      instagram: "#",
      facebook: "#",
      linkedin: "#",
    },
  },
  {
    id: "5",
    name: "Jane Smith",
    title: "CTO",
    image: "/images/team-5.png",
    socialLinks: {
      twitter: "#",
      instagram: "#",
      facebook: "#",
      linkedin: "#",
    },
  },
  {
    id: "6",
    name: "Michael Brown",
    title: "CFO",
    image: "/images/team-6.png",
    socialLinks: {
      twitter: "#",
      instagram: "#",
      facebook: "#",
      linkedin: "#",
    },
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

export function TeamSection() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mx-auto w-[70%] text-4xl font-bold text-gray-900 sm:text-5xl">
            Meet the Team
          </h2>
        </motion.div>

        {/* Team Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {teamMembers.map((member) => (
            <motion.div
              key={member.id}
              variants={cardVariants}
              whileHover={{
                y: -5,
                transition: { duration: 0.2 },
              }}
              className="group bg-greys-100 relative overflow-hidden rounded-2xl border border-[#D3D3D3] p-6 transition-shadow duration-300 hover:shadow-lg"
            >
              {/* Profile Image */}
              <div className="mb-6 flex justify-center">
                <div className="relative overflow-hidden rounded-xl">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={1000}
                    height={1000}
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </div>

              {/* Member Info */}
              <div className="">
                <h3 className="text-xl font-medium text-black">
                  {member.name}
                </h3>
                <p className="font-sora mt-1 text-sm text-black">
                  {member.title}
                </p>
              </div>

              {/* Social Links */}
              <div className="mt-2 flex space-x-4">
                {member.socialLinks.twitter && (
                  <Link
                    href={member.socialLinks.twitter}
                    className="text-gray-400 transition-colors duration-200 hover:text-blue-500"
                    aria-label={`${member.name} Twitter`}
                  >
                    <Twitter className="h-5 w-5" />
                  </Link>
                )}
                {member.socialLinks.instagram && (
                  <Link
                    href={member.socialLinks.instagram}
                    className="text-gray-400 transition-colors duration-200 hover:text-pink-500"
                    aria-label={`${member.name} Instagram`}
                  >
                    <Instagram className="h-5 w-5" />
                  </Link>
                )}
                {member.socialLinks.facebook && (
                  <Link
                    href={member.socialLinks.facebook}
                    className="text-gray-400 transition-colors duration-200 hover:text-blue-600"
                    aria-label={`${member.name} Facebook`}
                  >
                    <Facebook className="h-5 w-5" />
                  </Link>
                )}
                {member.socialLinks.linkedin && (
                  <Link
                    href={member.socialLinks.linkedin}
                    className="text-gray-400 transition-colors duration-200 hover:text-blue-700"
                    aria-label={`${member.name} LinkedIn`}
                  >
                    <Linkedin className="h-5 w-5" />
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
