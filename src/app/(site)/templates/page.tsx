import type { Metadata } from "next";
import { getDictionary } from "@/locales";
import { siteConfig } from "@/config/site";
import { TemplatesGallery } from "@/components/templates/gallery";
import { getTemplatePricing, getTemplateOrder } from "@/lib/db/templates";
import { discoverTemplates } from "@/lib/templates/discovery";

const dict = getDictionary(siteConfig.defaultLocale);

export const metadata: Metadata = {
  title: dict.templatesPage.title,
  description: dict.templatesPage.subtitle,
};

export default function TemplatesPage() {
  const templatesById = new Map(discoverTemplates().map((template) => [template.id, template]));
  const templates = getTemplateOrder()
    .map((id) => templatesById.get(id))
    .filter((template) => template !== undefined);
  const pricing = getTemplatePricing();
  return <TemplatesGallery templates={templates} pricing={pricing} />;
}
