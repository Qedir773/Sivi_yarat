import type { Metadata } from "next";
import { getDictionary } from "@/locales";
import { siteConfig } from "@/config/site";
import { CvEditor } from "@/components/editor/cv-editor";

const dict = getDictionary(siteConfig.defaultLocale);

export const metadata: Metadata = {
  title: dict.builderPage.title,
  description: dict.builderPage.subtitle,
};

const DEFAULT_TEMPLATE_ID = "professional-1";

export default async function BuilderPage({
  searchParams,
}: {
  searchParams: Promise<{ template?: string; cv?: string }>;
}) {
  const params = await searchParams;
  const templateId = params.template || DEFAULT_TEMPLATE_ID;

  return <CvEditor templateId={templateId} cvId={params.cv} />;
}
