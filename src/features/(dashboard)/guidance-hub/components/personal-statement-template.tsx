"use client";

import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { useRouter } from "next/navigation";
import { Breadcrumb } from "@/src/components/ui/breadcrumb";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/src/components/ui/carousel";
import { Template, RECENT_TEMPLATES, TOP_TEMPLATES } from "../constants";

interface TemplateCardProps {
  template: Template;
}

function TemplateCard({ template }: TemplateCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group bg-greys-100 relative z-20 flex h-40 w-full flex-col rounded-xl border border-gray-200 transition-all duration-200"
    >
      {/* Main content area with gray background */}
      <div className="flex flex-1 flex-col items-center justify-center p-4">
        {template.icon}
      </div>

      {/* Bottom section with white background */}
      <div className="bg-white-100 relative z-0 flex items-center justify-between rounded-b-xl border-t border-gray-200 px-3 py-2.5">
        <h3 className="flex-1 truncate pr-2 text-sm font-medium text-gray-800">
          {template.name}
        </h3>

        <button className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded transition-colors hover:bg-gray-100">
          <Download className="h-3.5 w-3.5 text-gray-500" />
        </button>
      </div>
    </motion.div>
  );
}

interface PersonalStatementTemplateProps {
  className?: string;
}

export default function PersonalStatementTemplate({
  className,
}: PersonalStatementTemplateProps) {
  const router = useRouter();

  const handleGoBack = () => {
    router.push("/guidance-hub");
  };

  const breadcrumbItems = [
    { label: "Guidance Hub", href: "/guidance-hub" },
    { label: "Personal Statement Template", isActive: true },
  ];

  return (
    <div className={`min-h-screen bg-white ${className || ""}`}>
      {/* Breadcrumb Navigation */}
      <div className="bg-white py-4">
        <Breadcrumb items={breadcrumbItems} onBack={handleGoBack} />
      </div>

      <div className="py-8">
        {/* Recent Templates Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-text-color mb-6 text-xl font-semibold">
            Recent Templates
          </h2>

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
              <CarouselContent className="">
                {RECENT_TEMPLATES.map((template, index) => (
                  <CarouselItem
                    key={template.id}
                    className="basis-[85%] pl-4 sm:basis-[35%]"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <TemplateCard template={template} />
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>

          {/* Desktop: Grid */}
          <div className="hidden grid-cols-3 gap-4 md:grid lg:grid-cols-4 xl:grid-cols-5">
            {RECENT_TEMPLATES.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <TemplateCard template={template} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Top Templates Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-text-color mb-6 text-xl font-semibold">
            Top Templates
          </h2>

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
              <CarouselContent className="">
                {TOP_TEMPLATES.map((template, index) => (
                  <CarouselItem
                    key={template.id}
                    className="basis-[85%] pl-4 sm:basis-[35%]"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <TemplateCard template={template} />
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>

          {/* Desktop: Grid */}
          <div className="hidden grid-cols-3 gap-4 md:grid lg:grid-cols-4 xl:grid-cols-5">
            {TOP_TEMPLATES.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <TemplateCard template={template} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
