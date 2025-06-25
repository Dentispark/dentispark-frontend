"use client";

import { Title } from "@/src/components/atoms/title";
import Container from "@/src/components/layouts/container";
import { ContactUsForm } from "@/src/features/(website)/contact-us/components/contact-us-form";
import { FAQ } from "@/src/features/(website)/contact-us/components/faq";

export function ContactUs() {
  return (
    <section className="relative py-20">
      <Container className="relative z-10">
        <div className="mx-auto max-w-xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <Title>Contact us</Title>
            <h1 className="mt-8 mb-4 text-5xl leading-[160%] font-bold text-gray-900">
              Let&apos;s get in touch
            </h1>
            <p className="font-sora text-black-700">
              or just reach out manually at{" "}
              <a
                href="mailto:contact@dentispark.co.uk"
                className="text-primary underline"
              >
                contact@dentispark.co.uk
              </a>
            </p>
          </div>

          {/* Contact Form */}
          <ContactUsForm />
        </div>

        {/* FAQ Section */}
        <FAQ />
      </Container>
    </section>
  );
}
