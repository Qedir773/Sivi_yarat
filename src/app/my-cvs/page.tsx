import type { Metadata } from "next";
import { getDictionary } from "@/locales";
import { siteConfig } from "@/config/site";
import { discoverTemplates } from "@/lib/templates/discovery";
import { MyCvsManager } from "@/components/my-cvs/my-cvs-manager";

const dict = getDictionary(siteConfig.defaultLocale);

export const metadata: Metadata = {
  title: dict.myCvsPage.title,
  description: dict.myCvsPage.subtitle,
};

export default function MyCvsPage() {
  const templates = discoverTemplates();
  return <MyCvsManager templates={templates} />;
}
