"use client";

import type { UseFormRegister } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { CVFormValues } from "@/lib/validation/cv-schema";
import { getDictionary } from "@/locales";
import { siteConfig } from "@/config/site";

const dict = getDictionary(siteConfig.defaultLocale);

export function SummaryForm({ register }: { register: UseFormRegister<CVFormValues> }) {
  const { builderPage } = dict;
  return (
    <Card>
      <CardHeader>
        <CardTitle>{builderPage.sections.summary}</CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea rows={4} placeholder={builderPage.fields.summary} {...register("summary")} />
      </CardContent>
    </Card>
  );
}
