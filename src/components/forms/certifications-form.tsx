"use client";

import { useFieldArray, type Control, type UseFormRegister } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { CVFormValues } from "@/lib/validation/cv-schema";
import { getDictionary } from "@/locales";
import { siteConfig } from "@/config/site";
import { newId } from "@/lib/utils";

const dict = getDictionary(siteConfig.defaultLocale);

export function CertificationsForm({
  control,
  register,
}: {
  control: Control<CVFormValues>;
  register: UseFormRegister<CVFormValues>;
}) {
  const { builderPage } = dict;
  const { fields, append, remove } = useFieldArray({ control, name: "certifications" });

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>{builderPage.sections.certifications}</CardTitle>
        <Button
          type="button"
          size="sm"
          onClick={() => append({ id: newId(), name: "", issuer: "", date: "" })}
        >
          <Plus /> {builderPage.actions.add}
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {fields.map((field, index) => (
          <div key={field.id} className="grid gap-2 rounded-lg border p-3 sm:grid-cols-[1fr_1fr_1fr_auto]">
            <div className="space-y-1.5">
              <Label>{builderPage.fields.certName}</Label>
              <Input {...register(`certifications.${index}.name`)} />
            </div>
            <div className="space-y-1.5">
              <Label>{builderPage.fields.issuer}</Label>
              <Input {...register(`certifications.${index}.issuer`)} />
            </div>
            <div className="space-y-1.5">
              <Label>{builderPage.fields.date}</Label>
              <Input {...register(`certifications.${index}.date`)} />
            </div>
            <div className="flex items-end">
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                aria-label={builderPage.actions.remove}
                onClick={() => remove(index)}
              >
                <Trash2 />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
