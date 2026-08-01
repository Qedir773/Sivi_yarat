import type { Metadata } from "next";
import { getDictionary } from "@/locales";
import { siteConfig } from "@/config/site";
import { CoverLetterGenerator } from "@/components/cover-letter/cover-letter-generator";

const dict = getDictionary(siteConfig.defaultLocale);

export const metadata: Metadata = {
  title: dict.coverLetterPage.title,
  description: dict.coverLetterPage.subtitle,
};

export default function V2CoverLetterPage() {
  return <CoverLetterGenerator />;
}
