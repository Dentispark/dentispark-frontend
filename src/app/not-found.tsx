"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="from-primary-50 via-white-100 to-secondary-50 flex min-h-screen items-center justify-center bg-gradient-to-br px-4">
      <div className="mx-auto max-w-4xl text-center">
        {/* Animated 404 Text */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <h1 className="from-primary-700 via-secondary-500 to-tertiary-500 mb-4 bg-gradient-to-r bg-clip-text text-8xl font-bold text-transparent md:text-9xl">
            404
          </h1>
        </motion.div>

        {/* Floating Elements Animation */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {mounted &&
            [...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="bg-primary-300 absolute h-2 w-2 rounded-full opacity-30"
                initial={{
                  x:
                    Math.random() *
                    (typeof window !== "undefined" ? window.innerWidth : 1200),
                  y:
                    Math.random() *
                    (typeof window !== "undefined" ? window.innerHeight : 800),
                }}
                animate={{
                  y: [0, -30, 0],
                  x: [0, Math.random() * 100 - 50, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "easeInOut",
                }}
              />
            ))}
        </div>

        {/* Animated Dental Tooth Icon */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-8"
        >
          <motion.div
            animate={{
              rotate: [0, -5, 5, -5, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="inline-block"
          >
            <svg
              width="120"
              height="120"
              viewBox="0 0 120 120"
              fill="none"
              className="mx-auto mb-6"
            >
              <motion.path
                d="M60 20C45 20 35 30 35 45C35 60 40 75 50 85C55 90 65 90 70 85C80 75 85 60 85 45C85 30 75 20 60 20Z"
                fill="url(#toothGradient)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
              <defs>
                <linearGradient
                  id="toothGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="rgb(var(--primary-300))" />
                  <stop offset="50%" stopColor="rgb(var(--secondary-400))" />
                  <stop offset="100%" stopColor="rgb(var(--tertiary-400))" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mb-8"
        >
          <h2 className="text-text-heading mb-4 text-3xl font-bold md:text-4xl">
            Oops! Page Not Found
          </h2>
          <p className="text-text-color mx-auto mb-8 max-w-2xl text-lg leading-relaxed">
            It looks like the page you're looking for has taken a dental break!
            Don't worry, we'll help you get back on track to your dental career
            goals.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="from-primary-700 to-primary-800 text-white-100 min-w-[200px] rounded-lg bg-gradient-to-r px-8 py-4 font-semibold shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              🏠 Go Home
            </motion.button>
          </Link>

          <Link href="/resources">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="from-secondary-500 to-secondary-600 text-white-100 min-w-[200px] rounded-lg bg-gradient-to-r px-8 py-4 font-semibold shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              📚 Browse Resources
            </motion.button>
          </Link>
        </motion.div>

        {/* Helpful Links */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="text-center"
        >
          <p className="text-text-color mb-4">
            Or explore these popular sections:
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link
              href="/about-us"
              className="text-primary-700 hover:text-primary-800 transition-colors duration-200 hover:underline"
            >
              About Us
            </Link>
            <Link
              href="/become-a-mentor"
              className="text-primary-700 hover:text-primary-800 transition-colors duration-200 hover:underline"
            >
              Become a Mentor
            </Link>
            <Link
              href="/contact-us"
              className="text-primary-700 hover:text-primary-800 transition-colors duration-200 hover:underline"
            >
              Contact Us
            </Link>
            <Link
              href="/login"
              className="text-primary-700 hover:text-primary-800 transition-colors duration-200 hover:underline"
            >
              Login
            </Link>
          </div>
        </motion.div>

        {/* Animated Background Elements */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <motion.div
            className="bg-primary-100 absolute top-1/4 left-1/4 h-32 w-32 rounded-full opacity-20"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <motion.div
            className="bg-secondary-100 absolute top-3/4 right-1/4 h-24 w-24 rounded-full opacity-20"
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <motion.div
            className="bg-tertiary-100 absolute top-1/2 right-1/3 h-16 w-16 rounded-full opacity-20"
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </div>
    </div>
  );
}
