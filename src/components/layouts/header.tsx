"use client";

import { usePathname } from "next/navigation";
import Container from "./container";
import Logo from "../icons/Logo";
import Link from "next/link";
import { Button } from "../ui/button";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navItems = [
    { label: "About Us", href: "/about-us" },
    { label: "Become a mentor", href: "/become-a-mentor" },
    { label: "Contact Us", href: "/contact-us" },
  ];

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Check if scrolled for border effect
      setIsScrolled(currentScrollY > 0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        duration: 0.3,
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const mobileItemVariants = {
    closed: { x: 50, opacity: 0 },
    open: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
      },
    },
  };

  return (
    <motion.header
      className={`border-greys-300 sticky top-0 z-50 bg-white/70 backdrop-blur-md transition-all duration-300 ${
        isScrolled ? "border-b" : ""
      }`}
      variants={headerVariants}
      initial="hidden"
      animate="visible"
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
    >
      <Container className="flex items-center justify-between py-4">
        <motion.div
          className="flex items-center space-x-4 md:space-x-16"
          variants={itemVariants}
        >
          {/* Hamburger for mobile */}
          <motion.button
            className="block cursor-pointer p-2 md:hidden"
            aria-label="Open menu"
            onClick={() => setMobileMenuOpen(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {/* Hamburger icon */}
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
              <rect y="5" width="24" height="2" rx="1" fill="#222" />
              <rect y="11" width="24" height="2" rx="1" fill="#222" />
              <rect y="17" width="24" height="2" rx="1" fill="#222" />
            </svg>
          </motion.button>
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <Link href="/" className="cursor-pointer">
              <Logo className="h-[35px] w-[150px]" />
            </Link>
          </motion.div>

          {/* Desktop nav */}
          <motion.nav
            className="hidden space-x-8 md:flex"
            variants={itemVariants}
          >
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                <Link
                  href={item.href}
                  className={
                    "text-black-600 hover:text-primary relative cursor-pointer text-xs font-medium transition-colors duration-300 " +
                    (pathname === item.href ? "text-primary" : "")
                  }
                >
                  <motion.span
                    className="block"
                    whileHover={{
                      y: -2,
                      transition: { duration: 0.2 },
                    }}
                  >
                    {item.label}
                  </motion.span>
                  {pathname === item.href && (
                    <motion.div
                      className="bg-primary absolute -bottom-1 left-0 h-0.5"
                      layoutId="activeTab"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </motion.nav>
        </motion.div>

        {/* Desktop Action buttons */}
        <motion.div
          className="hidden items-center space-x-4 md:flex"
          variants={itemVariants}
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <Link href="/login">
              <Button className="font-sora" variant="outline">
                Log In
              </Button>
            </Link>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <Link href="/sign-up">
              <Button className="font-sora">Sign Up</Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Mobile Sign Up button */}
        <motion.div
          className="block md:hidden"
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link href="/sign-up">
            <Button className="font-sora h-auto px-5 py-2 text-sm">
              Sign Up
            </Button>
          </Link>
        </motion.div>
      </Container>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-x-0 top-0 bottom-0 z-[100] flex h-screen flex-col px-4 pt-4"
            style={{ backgroundColor: "white" }}
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <motion.div
              className="mb-8 flex items-center justify-between"
              variants={mobileItemVariants}
            >
              <motion.button
                className="p-2"
                aria-label="Close menu"
                onClick={() => setMobileMenuOpen(false)}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                {/* Close icon */}
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
                  <line
                    x1="6"
                    y1="6"
                    x2="18"
                    y2="18"
                    stroke="#222"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <line
                    x1="18"
                    y1="6"
                    x2="6"
                    y2="18"
                    stroke="#222"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </motion.button>
            </motion.div>
            <motion.nav
              className="mt-4 flex flex-col gap-8 px-2"
              variants={mobileItemVariants}
            >
              {navItems.map((item) => (
                <motion.div
                  key={item.href}
                  variants={mobileItemVariants}
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    href={item.href}
                    className="text-black-600 cursor-pointer text-base font-medium transition-colors duration-300 hover:text-green-600"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </motion.nav>
            <motion.div className="mt-10 px-2" variants={mobileItemVariants}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <Link href="/login">
                  <Button className="font-sora" variant="outline">
                    Log In
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
