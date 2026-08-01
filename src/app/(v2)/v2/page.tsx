import { HeroV2 } from "@/components/marketing/v2/hero-v2";
import { FeaturesV2 } from "@/components/marketing/v2/features-v2";
import { HowItWorksV2 } from "@/components/marketing/v2/how-it-works-v2";
import { TemplatesTeaserV2 } from "@/components/marketing/v2/templates-teaser-v2";
import { PricingTeaserV2 } from "@/components/marketing/v2/pricing-teaser-v2";
import { FaqV2 } from "@/components/marketing/v2/faq-v2";
import { CtaBannerV2 } from "@/components/marketing/v2/cta-banner-v2";

export default function V2Home() {
  return (
    <>
      <HeroV2 />
      <FeaturesV2 />
      <HowItWorksV2 />
      <TemplatesTeaserV2 />
      <PricingTeaserV2 />
      <FaqV2 />
      <CtaBannerV2 />
    </>
  );
}
