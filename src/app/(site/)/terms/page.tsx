import type { Metadata } from "next";
import { getDictionary } from "@/locales";
import { siteConfig } from "@/config/site";
import { LegalPage } from "@/components/legal/legal-page";

const dict = getDictionary(siteConfig.defaultLocale);

export const metadata: Metadata = {
  title: dict.legal.terms.title,
  description: dict.legal.terms.intro,
};

export default function TermsPage() {
  return <LegalPage {...dict.legal.terms} />;
}
