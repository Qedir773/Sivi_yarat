"use client";

import { useWatch, type Control, type UseFormRegister, type UseFormSetValue } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AiEnhanceButton } from "@/components/editor/ai-enhance-button";
import type { CVFormValues } from "@/lib/validation/cv-schema";
import { getDictionary } from "@/locales";
import { siteConfig } from "@/config/site";

const dict = getDictionary(siteConfig.defaultLocale);

export function SummaryForm({
  control,
  register,
  setValue,
}: {
  control: Control<CVFormValues>;
  register: UseFormRegister<CVFormValues>;
  setValue: UseFormSetValue<CVFormValues>;
}) {
  const { builderPage } = dict;
  const summary = useWatch({ control, name: "summary", defaultValue: "" });

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>{builderPage.sections.summary}</CardTitle>
        <AiEnhanceButton
          currentText={summary ?? ""}
          onApply={(text) => setValue("summary", text, { shouldDirty: true })}
        />
      </CardHeader>
      <CardContent>
        <Textarea rows={4} placeholder={builderPage.fields.summary} {...register("summary")} />
      </CardContent>
    </Card>
  );
}
