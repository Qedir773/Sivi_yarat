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

/**
 * V2 /templates — same V1 component, rendered inside the V2 layout,
 * so V2's design tokens (gold gradient, navy background, italic
 * Playfair headline) apply automatically without rewriting the screen.
 */
export default function V2TemplatesPage() {
  const templatesById = new Map(discoverTemplates().map((template) => [template.id, template]));
  const templates = getTemplateOrder()
    .map((id) => templatesById.get(id))
    .filter((template) => template !== undefined);
  const pricing = getTemplatePricing();
  return <TemplatesGallery templates={templates} pricing={pricing} />;
}
