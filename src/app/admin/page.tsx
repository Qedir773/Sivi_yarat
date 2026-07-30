import type { Metadata } from "next";
import { getDictionary } from "@/locales";
import { siteConfig } from "@/config/site";
import { discoverTemplates } from "@/lib/templates/discovery";
import { getTemplatePricing } from "@/lib/db/templates";
import { getProPrice } from "@/lib/db/settings";
import { AdminPanel } from "@/components/admin/admin-panel";

const dict = getDictionary(siteConfig.defaultLocale);

export const metadata: Metadata = {
  title: dict.adminPage.title,
  description: dict.adminPage.subtitle,
};

export default function AdminPage() {
  const templates = discoverTemplates();
  const pricing = getTemplatePricing();
  const proPrice = getProPrice();

  return <AdminPanel templates={templates} pricing={pricing} proPrice={proPrice} />;
}
