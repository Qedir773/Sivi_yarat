import type { Metadata } from "next";
import { getDictionary } from "@/locales";
import { siteConfig } from "@/config/site";
import { TemplatesGallery } from "@/components/templates/gallery";

const dict = getDictionary(siteConfig.defaultLocale);

export const metadata: Metadata = {
  title: dict.templatesPage.title,
  description: dict.templatesPage.subtitle,
};

export default function TemplatesPage() {
  return <TemplatesGallery />;
}
