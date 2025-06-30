import { AdmissionProbabilityCalculator } from "@/src/features/(website)/home/components/admission-probability-calculator";
import { FreeTools } from "@/src/features/(website)/home/components/free-tools";
import { Hero } from "@/src/features/(website)/home/components/hero-section";
import { HowItWorks } from "@/src/features/(website)/home/components/how-it-works";
import { MeetOurMentors } from "@/src/features/(website)/home/components/meet-our-mentors";
import { PricingSection } from "@/src/features/(website)/home/components/pricing";
import { JoinSection } from "@/src/features/(website)/home/components/subscribe";
import { Testimonials } from "@/src/features/(website)/home/components/testimonials";
import WhyChooseUs from "@/src/features/(website)/home/components/why-choose-us";

export default function Home() {
  return (
    <>
      <Hero />
      <FreeTools />
      <HowItWorks />
      <MeetOurMentors />
      <WhyChooseUs />
      <Testimonials />
      <AdmissionProbabilityCalculator />
      <PricingSection />
      <JoinSection />
    </>
  );
}
