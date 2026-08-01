import type { Metadata } from "next";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { getDictionary } from "@/locales";
import { siteConfig } from "@/config/site";

const dict = getDictionary(siteConfig.defaultLocale);

export const metadata: Metadata = {
  title: dict.home.howItWorks.title,
  description: dict.home.howItWorks.subtitle,
};

export default function V2HowItWorksPage() {
  return <HowItWorks />;
}
