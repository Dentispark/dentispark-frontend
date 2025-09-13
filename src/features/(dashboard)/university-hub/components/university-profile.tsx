"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Globe } from "lucide-react";
import { Breadcrumb } from "@/src/components/ui/breadcrumb";
import { University } from "../types";

interface UniversityProfileProps {
  university: University;
}

export function UniversityProfile({ university }: UniversityProfileProps) {
  const breadcrumbItems = [
    { label: "University Hub", href: "/university-hub" },
    { label: "University Profile", isActive: true },
  ];

  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-4 md:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 md:mb-8"
        >
          <Breadcrumb items={breadcrumbItems} />
        </motion.div>

        {/* University Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 md:mb-8"
        >
          <div className="flex flex-col items-center space-y-4 text-center sm:flex-row sm:items-start sm:space-y-0 sm:space-x-6 sm:text-left">
            {/* University Crest/Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="flex-shrink-0"
            >
              <div className="border-greys-300 bg-greys-100 relative size-30 overflow-hidden rounded-full border">
                <Image
                  src="/icons/newcastle-uni.svg"
                  alt={`${university.name} crest`}
                  fill
                  className="object-contain p-4"
                  sizes="(max-width: 640px) 80px, (max-width: 768px) 96px, 112px"
                  priority
                />
              </div>
            </motion.div>

            {/* University Info */}
            <div className="space-y-3 md:space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-text-heading text-xl font-semibold sm:text-2xl lg:text-3xl"
              >
                {university.name}
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="font-sora flex flex-col items-center space-y-2 text-[#868686] sm:flex-row sm:items-center sm:space-y-0 sm:space-x-2"
              >
                <MapPin className="size-5 flex-shrink-0 sm:size-6" />
                <span className="text-center text-sm sm:text-left">
                  {university.fullAddress}
                </span>
              </motion.div>

              <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <Link
                    href="#"
                    className="text-primary font-sora inline-block rounded-md text-sm underline transition-colors"
                  >
                    UCAS Application link
                  </Link>
                </motion.div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Link
                href="#"
                className="text-text-color inline-flex items-center justify-center space-x-2 rounded-md border px-3 py-2 text-sm transition-colors hover:bg-gray-50"
              >
                <Globe className="size-4" />
                <span>Visit our website</span>
              </Link>
            </motion.div>
          </div>
        </motion.div>

        <div className="flex flex-col gap-8 lg:flex-row lg:gap-16">
          {/* About Us Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-6 md:mb-8 lg:basis-1/2"
          >
            <h2 className="mb-4 text-lg font-semibold text-gray-900 md:text-xl">
              About Us
            </h2>
            <div className="prose font-sora max-w-none text-sm leading-relaxed text-gray-700 md:text-base">
              <p className="mb-4">
                With ten years of experience in graduate admissions at Stanford
                University&apos;s School of Engineering and School of Education,
                I can provide valuable insight into the application and review
                process. I am here to address your concerns and answer your
                questions about applying to graduate school.
              </p>
              <p>
                Since 2013, I have worked as a professional graduate admission
                consultant and coach, specializing in helping navigate the
                application process for programs in the
              </p>
            </div>
          </motion.div>

          {/* University Campus Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-6 overflow-hidden md:mb-8 lg:basis-1/2"
          >
            <Image
              src={university.image}
              alt={`${university.name} campus`}
              width={1200}
              height={600}
              className="h-48 w-full rounded-4xl object-cover sm:h-64 md:h-80 md:rounded-xl lg:h-96"
              quality={90}
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw"
            />
            {/* Photo Credit */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="mt-3 md:mt-4"
            >
              <p className="font-sora text-black-400 text-xs md:text-sm">
                Photo Credit:{" "}
                <span className="text-text-color font-semibold">
                  John Donoghue
                </span>
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Mission Statement and Programs Section */}
        <div className="mt-10 flex flex-col gap-8 md:mt-12 lg:mt-16 lg:flex-row lg:gap-16">
          {/* Mission Statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="lg:basis-1/2"
          >
            <h2 className="mb-4 text-lg font-semibold text-gray-900 md:mb-6 md:text-xl">
              Mission Statement
            </h2>
            <div className="font-sora text-sm leading-relaxed text-gray-700 md:text-base">
              <p>
                I coach students to bring clarity and purpose to the graduate
                application process. My goal is to help as many individuals as
                possible achieve their academic objectives. I am passionate
                about empowering students to discover their full potential,
                build self-confidence, and enhance their communication skills.
              </p>
            </div>
          </motion.div>

          {/* Programs Offered */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="lg:basis-1/2"
          >
            <h2 className="mb-4 text-lg font-semibold text-gray-900 md:mb-6 md:text-xl">
              Programs offered
            </h2>
            <div className="font-sora text-sm leading-relaxed text-gray-700 md:text-base">
              <p>
                I coach students to bring clarity and purpose to the graduate
                application process. My goal is to help as many individuals as
                possible achieve their academic objectives. I am passionate
                about empowering students to discover their full potential,
                build self-confidence, and enhance their communication skills.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Social Media Links */}
        <div className="mt-6 md:mt-8">
          <h3 className="mb-3 text-base font-semibold text-gray-900 md:mb-4 md:text-lg">
            Social Media Links
          </h3>
          <div className="flex flex-wrap gap-3 sm:flex-nowrap sm:space-y-0 sm:space-x-3">
            <Link
              href="#"
              className="bg-primary hover:bg-primary-400 flex h-9 w-9 items-center justify-center rounded-full text-gray-600 transition-colors sm:h-10 sm:w-10"
              aria-label="Twitter"
            >
              <svg
                className="h-4 w-4 sm:h-5 sm:w-5"
                viewBox="0 0 18 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.053 0H16.739L10.8723 6.7502L17.7992 15.9036H12.3566L8.11568 10.355L3.23858 15.9036H0.552632L6.84339 8.69398L0.199219 0H5.78315L9.63536 5.08916L14.053 0ZM13.0988 14.2779H14.5832L4.9703 1.51968H3.3446L13.0988 14.2779Z"
                  fill="white"
                />
              </svg>
            </Link>
            <Link
              href="#"
              className="bg-primary hover:bg-primary-400 flex h-9 w-9 items-center justify-center rounded-full text-gray-600 transition-colors sm:h-10 sm:w-10"
              aria-label="Instagram"
            >
              <svg
                className="h-4 w-4 sm:h-5 sm:w-5"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_2052_273036)">
                  <path
                    d="M4.68673 0.0559501C3.83553 0.0961101 3.25425 0.23195 2.74609 0.43163C2.22017 0.63659 1.77441 0.91163 1.33089 1.35675C0.887373 1.80187 0.614253 2.24795 0.410733 2.77467C0.213773 3.28395 0.080333 3.86571 0.042733 4.71739C0.00513298 5.56907 -0.00318703 5.84283 0.000972972 8.01531C0.00513297 10.1878 0.014733 10.4601 0.056013 11.3135C0.096653 12.1646 0.232013 12.7457 0.431693 13.254C0.636973 13.78 0.911693 14.2256 1.35697 14.6692C1.80225 15.1129 2.24801 15.3854 2.77601 15.5892C3.28481 15.7859 3.86673 15.92 4.71825 15.9572C5.56977 15.9945 5.84385 16.0032 8.01569 15.999C10.1875 15.9948 10.461 15.9852 11.3143 15.9448C12.1675 15.9043 12.7456 15.768 13.2541 15.5692C13.78 15.3635 14.2259 15.0892 14.6693 14.6438C15.1127 14.1984 15.3856 13.752 15.589 13.2249C15.7861 12.7161 15.92 12.1342 15.957 11.2833C15.9943 10.4294 16.0031 10.1568 15.9989 7.98459C15.9947 5.81243 15.985 5.54011 15.9445 4.68699C15.904 3.83387 15.7685 3.25451 15.569 2.74587C15.3634 2.21995 15.089 1.77467 14.6439 1.33067C14.1987 0.88667 13.752 0.61387 13.2251 0.41099C12.716 0.21403 12.1344 0.0797901 11.2829 0.0429901C10.4314 0.00619009 10.1573 -0.00324991 7.98465 0.000910089C5.81201 0.00507009 5.54001 0.0143501 4.68673 0.0559501ZM4.78017 14.518C4.00017 14.4841 3.57665 14.3545 3.29441 14.246C2.92065 14.102 2.65441 13.928 2.37313 13.6494C2.09185 13.3708 1.91905 13.1036 1.77313 12.7307C1.66353 12.4484 1.53153 12.0254 1.49505 11.2454C1.45537 10.4024 1.44705 10.1492 1.44241 8.01339C1.43777 5.87755 1.44593 5.62475 1.48289 4.78139C1.51617 4.00203 1.64657 3.57803 1.75489 3.29595C1.89889 2.92171 2.07233 2.65595 2.35153 2.37483C2.63073 2.09371 2.89713 1.92059 3.27041 1.77467C3.55233 1.66459 3.97537 1.53371 4.75505 1.49659C5.59873 1.45659 5.85153 1.44859 7.98705 1.44395C10.1226 1.43931 10.376 1.44731 11.22 1.48443C11.9994 1.51835 12.4235 1.64747 12.7053 1.75643C13.0792 1.90043 13.3453 2.07339 13.6264 2.35307C13.9075 2.63275 14.0808 2.89819 14.2267 3.27227C14.337 3.55339 14.4679 3.97627 14.5047 4.75643C14.5448 5.60011 14.5539 5.85307 14.5578 7.98843C14.5616 10.1238 14.5541 10.3774 14.5171 11.2204C14.4831 12.0004 14.3538 12.4241 14.2451 12.7067C14.1011 13.0803 13.9275 13.3467 13.6482 13.6276C13.3688 13.9086 13.1027 14.0817 12.7293 14.2276C12.4477 14.3376 12.0242 14.4688 11.2451 14.5059C10.4015 14.5456 10.1487 14.5539 8.01233 14.5585C5.87601 14.5632 5.62401 14.5545 4.78033 14.518M11.3019 3.72427C11.3022 3.91415 11.3589 4.09968 11.4646 4.25738C11.5704 4.41508 11.7206 4.53788 11.8961 4.61023C12.0717 4.68259 12.2647 4.70126 12.4509 4.66389C12.6371 4.62651 12.808 4.53476 12.942 4.40025C13.076 4.26573 13.1671 4.09449 13.2038 3.90819C13.2405 3.72189 13.2212 3.52888 13.1481 3.35359C13.0751 3.1783 12.9518 3.0286 12.7937 2.92342C12.6356 2.81823 12.4499 2.76229 12.26 2.76267C12.0055 2.76318 11.7615 2.86477 11.5819 3.04509C11.4022 3.22542 11.3015 3.46972 11.3019 3.72427ZM3.89233 8.00795C3.89681 10.2768 5.73937 12.1118 8.00769 12.1075C10.276 12.1032 12.1123 10.2608 12.108 7.99195C12.1037 5.72315 10.2607 3.88763 7.99201 3.89211C5.72337 3.89659 3.88801 5.73947 3.89233 8.00795ZM5.33329 8.00507C5.33225 7.47764 5.48763 6.96175 5.77978 6.52263C6.07194 6.08352 6.48775 5.74089 6.97462 5.53809C7.4615 5.33529 7.99758 5.28142 8.51508 5.38329C9.03257 5.48516 9.50824 5.7382 9.88192 6.11041C10.2556 6.48262 10.5105 6.95728 10.6145 7.47437C10.7184 7.99145 10.6666 8.52775 10.4658 9.01542C10.2649 9.5031 9.92391 9.92026 9.48595 10.2142C9.04799 10.508 8.53272 10.6655 8.00529 10.6665C7.65508 10.6672 7.30816 10.599 6.98433 10.4656C6.66051 10.3323 6.36612 10.1364 6.118 9.88928C5.86987 9.64213 5.67286 9.34852 5.53822 9.02523C5.40358 8.70193 5.33394 8.35528 5.33329 8.00507Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_2052_273036">
                    <rect width="16" height="16" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </Link>
            <Link
              href="#"
              className="bg-primary hover:bg-primary-400 flex h-9 w-9 items-center justify-center rounded-full text-gray-600 transition-colors sm:h-10 sm:w-10"
              aria-label="Facebook"
            >
              <svg
                className="h-4 w-4 sm:h-5 sm:w-5"
                viewBox="0 0 17 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_2052_273039)">
                  <path
                    d="M16.1992 8.00344C16.1992 3.58515 12.6175 0.00343609 8.19922 0.00343609C3.78094 0.00343609 0.199219 3.58515 0.199219 8.00344C0.199219 11.9965 3.1247 15.3061 6.94922 15.9062V10.3159H4.91797V8.00344H6.94922V6.24094C6.94922 4.23594 8.14356 3.12844 9.97094 3.12844C10.8462 3.12844 11.7617 3.28469 11.7617 3.28469V5.25344H10.7529C9.75914 5.25344 9.44922 5.87011 9.44922 6.50276V8.00344H11.668L11.3133 10.3159H9.44922V15.9062C13.2737 15.3061 16.1992 11.9965 16.1992 8.00344Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_2052_273039">
                    <rect
                      width="16"
                      height="16"
                      fill="white"
                      transform="translate(0.199219)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </Link>
            <Link
              href="#"
              className="bg-primary hover:bg-primary-400 flex h-9 w-9 items-center justify-center rounded-full text-gray-600 transition-colors sm:h-10 sm:w-10"
              aria-label="LinkedIn"
            >
              <svg
                className="h-4 w-4 sm:h-5 sm:w-5"
                viewBox="0 0 17 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.0322 13.6966H11.6267V9.96653C11.6267 9.07707 11.6106 7.93206 10.3755 7.93206C9.12267 7.93206 8.93097 8.90116 8.93097 9.90178V13.6963H6.52545V6.02586H8.83475V7.07411H8.86708C9.09818 6.68286 9.43214 6.36099 9.83337 6.1428C10.2346 5.92461 10.6881 5.81825 11.1456 5.83507C13.5836 5.83507 14.0332 7.42295 14.0332 9.48868L14.0322 13.6966ZM3.81124 4.97736C3.53515 4.97741 3.26523 4.8964 3.03564 4.74456C2.80605 4.59272 2.62711 4.37688 2.5214 4.12434C2.4157 3.87179 2.388 3.59388 2.44182 3.32575C2.49563 3.05762 2.62854 2.81131 2.82373 2.61798C3.01892 2.42464 3.26764 2.29295 3.53841 2.23957C3.80919 2.18619 4.08987 2.21351 4.34496 2.31808C4.60006 2.42265 4.81811 2.59977 4.97154 2.82705C5.12497 3.05432 5.20689 3.32154 5.20694 3.59492C5.20697 3.77643 5.17089 3.95617 5.10077 4.12388C5.03065 4.29159 4.92786 4.44398 4.79826 4.57235C4.66866 4.70072 4.51478 4.80256 4.34542 4.87205C4.17607 4.94155 3.99456 4.97733 3.81124 4.97736ZM5.01399 13.6966H2.60598V6.02586H5.01399V13.6966ZM15.2314 0.00109518H1.39722C1.08322 -0.00241338 0.780645 0.117654 0.556009 0.334914C0.331373 0.552174 0.203051 0.84885 0.199219 1.15975V14.9145C0.20292 15.2256 0.331166 15.5225 0.555795 15.7399C0.780423 15.9574 1.08306 16.0777 1.39722 16.0744H15.2314C15.5462 16.0783 15.8497 15.9584 16.0752 15.7409C16.3007 15.5234 16.4298 15.2262 16.4342 14.9145V1.15876C16.4297 0.847241 16.3005 0.550227 16.075 0.332973C15.8494 0.115718 15.546 -0.00400619 15.2314 0.000102356"
                  fill="white"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
