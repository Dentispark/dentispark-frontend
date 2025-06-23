import React from "react";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import { Title } from "@/src/components/atoms/title";
import { cn } from "@/src/lib/utils";

const plans = [
  {
    name: "Free Plan",
    priceHtml: "Free",
    description: "Curious to see how it works?",
    features: ["Access guides", "University data", "AI-driven checklists"],
    highlighted: false,
  },
  {
    name: "Premium Plan",
    priceHtml: "$24<span class='text-sm font-normal'>/month</span>",
    description: "Need More? Upgrade for 1:1 Mentorship and More",
    features: [
      "Access guides",
      "University data",
      "AI-driven checklists",
      "1:1 Mentorship",
    ],
    highlighted: true,
  },
];

export function PricingSection() {
  return (
    <section className="bg-white py-16">
      <div className="flex flex-col items-center space-y-6 px-4 lg:px-0">
        <Title>Pricing</Title>
        <h2 className="w-[70%] max-w-xl text-center text-4xl leading-[150%] font-bold text-black md:w-full md:leading-[120%]">
          Unlock more support when you're ready
        </h2>

        <div className="grid w-full max-w-3xl grid-cols-1 gap-6 md:grid-cols-2">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "rounded-2xl border bg-white p-6",
                plan.highlighted ? "border-primary" : "border-greys-300",
              )}
            >
              <div>
                <h3 className={cn("text-primary mb-1 text-lg font-semibold")}>
                  {plan.name}
                </h3>
                <p className="mb-12 h-8 text-gray-700">{plan.description}</p>
                <div
                  className="mb-10 text-4xl font-bold"
                  dangerouslySetInnerHTML={{ __html: plan.priceHtml }}
                />
                <Button
                  variant={plan.highlighted ? "default" : "outline"}
                  className={cn("font-sora mb-4 w-full")}
                >
                  Get Started
                </Button>
                <p className="font-sora text-primary my-6 font-medium">
                  What&apos;s included:
                </p>
                <ul className="font-sora space-y-4 font-light">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center space-x-4 text-gray-700"
                    >
                      <span className="border-primary flex h-4 w-4 items-center justify-center rounded-full border">
                        <Check size={12} className="text-primary" />
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="border-greys-300 flex-start mt-6 flex w-full max-w-3xl flex-col justify-between gap-4 rounded-2xl border bg-white p-8 md:flex-row md:items-center">
          <div>
            <h3 className="mb-6 text-3xl font-semibold text-green-600">
              Access project
            </h3>
            <p className="font-sora text-gray-700">
              Subsidized pricing available through Access Project
            </p>
          </div>
          <Link
            href="/access-project"
            className="text-primary border-primary md:w- mx-0 mr-auto inline-flex min-w-0 items-center gap-2 rounded border px-8 py-2 font-medium hover:underline md:mr-0"
          >
            Learn more <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
