import type { Metadata } from "next";
import { getDictionary } from "@/locales";
import { siteConfig } from "@/config/site";
import { LegalPage } from "@/components/legal/legal-page";

const dict = getDictionary(siteConfig.defaultLocale);

export const metadata: Metadata = {
  title: dict.legal.privacy.title,
  description: dict.legal.privacy.intro,
};

export default function PrivacyPage() {
  return <LegalPage {...dict.legal.privacy} />;
}
