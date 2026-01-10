import { HeroSection } from "@/components/sections/HeroSection";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { ShowcaseSection } from "@/components/sections/ShowcaseSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { CTASection } from "@/components/sections/CTASection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <HowItWorks />
      <ShowcaseSection />
      <PricingSection />
      <CTASection />
    </>
  );
}
