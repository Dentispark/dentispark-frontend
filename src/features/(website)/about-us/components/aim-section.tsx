"use client";

import { motion } from "framer-motion";
import AimBackground from "@/src/components/icons/AimBackground";
import Container from "@/src/components/layouts/container";

export function AimSection() {
  return (
    <section className="relative bg-white pb-16">
      <Container className="relative z-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Mission Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{
              scale: 1.02,
              y: -8,
              transition: { duration: 0.3, ease: "easeInOut" },
            }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="to-primary-100 border-primary-400 group relative cursor-pointer overflow-hidden rounded-3xl border bg-gradient-to-br from-green-50 p-8 transition-shadow duration-300 hover:shadow-xl hover:shadow-green-100"
          >
            {/* Background Pattern */}
            <motion.div
              whileHover={{
                rotate: 15,
                scale: 0.85,
                transition: { duration: 0.5, ease: "easeInOut" },
              }}
              className="absolute -top-10 -right-16"
            >
              <AimBackground
                fill="#B6E5D4"
                className="scale-75 opacity-30 transition-opacity duration-300 group-hover:opacity-50"
              />
            </motion.div>

            <div className="relative z-10 space-y-8">
              {/* Mission Badge */}
              <motion.div
                className="inline-block"
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 },
                }}
              >
                <span className="bg-primary-200 text-black-700 group-hover:bg-primary-300 rounded-full px-6 py-2 text-sm font-medium transition-colors duration-300">
                  Mission
                </span>
              </motion.div>

              {/* Mission Content */}
              <motion.div
                whileHover={{
                  x: 5,
                  transition: { duration: 0.2 },
                }}
              >
                <p className="text-black-500 text-lg leading-relaxed">
                  To make dental school applications easier, affordable, and
                  accessible for underprivileged students.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Vision Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{
              scale: 1.02,
              y: -8,
              transition: { duration: 0.3, ease: "easeInOut" },
            }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="group relative cursor-pointer overflow-hidden rounded-3xl border border-[#708AFC] bg-gradient-to-br from-blue-50 to-[#EAEEFF] p-8 transition-shadow duration-300 hover:shadow-xl hover:shadow-blue-100"
          >
            {/* Background Pattern */}
            <motion.div
              whileHover={{
                rotate: -15,
                scale: 0.85,
                transition: { duration: 0.5, ease: "easeInOut" },
              }}
              className="absolute -top-10 -right-16"
            >
              <AimBackground
                fill="#BDC9FD"
                className="scale-75 opacity-30 transition-opacity duration-300 group-hover:opacity-50"
              />
            </motion.div>

            <div className="relative z-10 space-y-8">
              {/* Vision Badge */}
              <motion.div
                className="inline-block"
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 },
                }}
              >
                <span className="text-black-700 rounded-full bg-[#BDC9FD] px-6 py-2 text-sm font-medium transition-colors duration-300 group-hover:bg-[#A1B3FC]">
                  Vision
                </span>
              </motion.div>

              {/* Vision Content */}
              <motion.div
                whileHover={{
                  x: 5,
                  transition: { duration: 0.2 },
                }}
              >
                <p className="text-black-700 text-lg leading-relaxed">
                  To be the leading global platform guiding underserved students
                  into dental careers.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
