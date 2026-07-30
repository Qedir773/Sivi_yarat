import type { Metadata } from "next";
import { getDictionary } from "@/locales";
import { siteConfig } from "@/config/site";
import { TemplatesGallery } from "@/components/templates/gallery";
import { getTemplatePricing } from "@/lib/db/templates";
import { discoverTemplates } from "@/lib/templates/discovery";

const dict = getDictionary(siteConfig.defaultLocale);

export const metadata: Metadata = {
  title: dict.templatesPage.title,
  description: dict.templatesPage.subtitle,
};

export default function TemplatesPage() {
  const templates = discoverTemplates();
  const pricing = getTemplatePricing();
  return <TemplatesGallery templates={templates} pricing={pricing} />;
}
