import type { Metadata } from "next";
import { Faq } from "@/components/marketing/faq";
import { getDictionary } from "@/locales";
import { siteConfig } from "@/config/site";

const dict = getDictionary(siteConfig.defaultLocale);

export const metadata: Metadata = {
  title: dict.home.faq.title,
};

export default function FaqPage() {
  return <Faq />;
}
