"use client";

import React, { useState, forwardRef } from "react";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

const FAQItem = forwardRef<HTMLDivElement, FAQItemProps>(
  ({ question, answer, isOpen, onToggle }, ref) => {
    return (
      <div
        ref={ref}
        className="border-b-[.5px] border-gray-200 last:border-b-0"
      >
        <button
          onClick={onToggle}
          className="flex w-full items-center justify-between py-6 text-left transition-colors hover:bg-gray-50"
        >
          <h3 className="font-sora pr-4 text-lg font-medium text-gray-900">
            {question}
          </h3>
          {isOpen ? (
            <Minus className="h-5 w-5 flex-shrink-0 text-gray-500 transition-all duration-200" />
          ) : (
            <Plus className="h-5 w-5 flex-shrink-0 text-gray-500 transition-all duration-200" />
          )}
        </button>
        <div
          className={cn(
            "overflow-hidden transition-all duration-300 ease-in-out",
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
          )}
        >
          <div className="pr-8 pb-6">
            <p className="leading-relaxed font-normal text-gray-600">
              {answer}
            </p>
          </div>
        </div>
      </div>
    );
  },
);

FAQItem.displayName = "FAQItem";

const faqData = [
  {
    id: 1,
    question: "What sectors have we built for?",
    answer:
      "We've created products in all sorts of areas like Finance, Health, Telecom, Agriculture, Fashion, Transportation, data management, and a bunch more.",
  },
  {
    id: 2,
    question: "How long does the dental school application process take?",
    answer:
      "The dental school application process typically takes 12-18 months from start to finish. This includes preparation time for entrance exams, gathering required documents, submitting applications, attending interviews, and waiting for admission decisions.",
  },
  {
    id: 3,
    question: "What qualifications do I need for dental school?",
    answer:
      "Most dental schools require a bachelor's degree with prerequisite courses in biology, chemistry, physics, and mathematics. You'll also need to take the DAT (Dental Admission Test), have relevant experience through shadowing or volunteering, and demonstrate strong academic performance.",
  },
  {
    id: 4,
    question: "How much does dental school cost?",
    answer:
      "Dental school tuition varies significantly depending on whether you attend a public or private institution. Public schools typically range from $40,000-$60,000 per year for residents, while private schools can cost $70,000-$100,000+ annually. This doesn't include living expenses and equipment costs.",
  },
  {
    id: 5,
    question: "What support services do you offer?",
    answer:
      "We provide comprehensive support including application guidance, interview preparation, personal statement review, course selection advice, mentorship programs, and ongoing academic support throughout your dental school journey.",
  },
  {
    id: 6,
    question: "Can you help with international dental school applications?",
    answer:
      "Yes, we have experience with international dental school applications and can help you navigate the specific requirements for different countries, including credential evaluations, language requirements, and visa processes.",
  },
];

export function FAQ() {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set([1]));

  const toggleItem = (id: number) => {
    setOpenItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <section className="mt-16 py-16">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12">
          <h2 className="mb-4 text-5xl leading-[160%] font-bold text-gray-900">
            Frequently asked questions
          </h2>
          <p className="font-sora text-sm text-gray-600">
            Find answers to your questions right here, and don&apos;t hesitate
            to{" "}
            <a
              href="mailto:contact@dentispark.co.uk"
              className="text-primary underline"
            >
              contact us
            </a>{" "}
            if you couldn&apos;t find what you&apos;re looking for.
          </p>
        </div>

        <div className="bg-white">
          {faqData.map((item) => (
            <FAQItem
              key={item.id}
              question={item.question}
              answer={item.answer}
              isOpen={openItems.has(item.id)}
              onToggle={() => toggleItem(item.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
