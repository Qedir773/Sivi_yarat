import type { Metadata } from "next";
import { PricingView } from "./pricing-view";
import { getDictionary } from "@/locales";
import { siteConfig } from "@/config/site";
import { getProPrice } from "@/lib/db/settings";

const dict = getDictionary(siteConfig.defaultLocale);

export const metadata: Metadata = {
  title: dict.pricingPage.title,
  description: dict.pricingPage.subtitle,
};

export default function PricingPage() {
  const proPrice = getProPrice();
  return <PricingView proPrice={proPrice} />;
}