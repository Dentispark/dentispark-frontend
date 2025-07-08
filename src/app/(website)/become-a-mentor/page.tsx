import { HeroSection } from "@/src/features/(website)/become-a-mentor/hero-section";
import { FeaturesSection } from "@/src/features/(website)/become-a-mentor/features-section";
import { MentorSection } from "@/src/features/(website)/become-a-mentor/mentor-section";
import { WaitlistSection } from "@/src/features/(website)/become-a-mentor/waitlist-section";

export default function BecomeMentorPage() {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <MentorSection />
      <WaitlistSection />
    </div>
  );
}
