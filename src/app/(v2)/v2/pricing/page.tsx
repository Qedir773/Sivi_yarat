import type { Metadata } from "next";
import { PricingView } from "@/app/(site)/pricing/pricing-view";
import { getDictionary } from "@/locales";
import { siteConfig } from "@/config/site";
import { getProPrice } from "@/lib/db/settings";

const dict = getDictionary(siteConfig.defaultLocale);

export const metadata: Metadata = {
  title: dict.pricingPage.title,
  description: dict.pricingPage.subtitle,
};

export default function V2PricingPage() {
  const proPrice = getProPrice();
  return <PricingView proPrice={proPrice} />;
}
