import { Hero } from "@/components/marketing/hero";
import { Features } from "@/components/marketing/features";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { TemplatesTeaser } from "@/components/marketing/templates-teaser";
import { PricingTeaser } from "@/components/marketing/pricing-teaser";
import { Faq } from "@/components/marketing/faq";
import { CtaBanner } from "@/components/marketing/cta-banner";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
      <TemplatesTeaser />
      <PricingTeaser />
      <Faq />
      <CtaBanner />
    </>
  );
}
