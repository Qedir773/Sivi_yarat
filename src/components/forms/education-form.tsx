"use client";

import { Controller, useFieldArray, type Control, type UseFormRegister } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { CVFormValues } from "@/lib/validation/cv-schema";
import { getDictionary } from "@/locales";
import { siteConfig } from "@/config/site";
import { newId } from "@/lib/utils";

const dict = getDictionary(siteConfig.defaultLocale);

export function EducationForm({
  control,
  register,
}: {
  control: Control<CVFormValues>;
  register: UseFormRegister<CVFormValues>;
}) {
  const { builderPage } = dict;
  const { fields, append, remove } = useFieldArray({ control, name: "education" });

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>{builderPage.sections.education}</CardTitle>
        <Button
          type="button"
          size="sm"
          onClick={() =>
            append({
              id: newId(),
              institution: "",
              degree: "",
              field: "",
              startDate: "",
              endDate: "",
              current: false,
              description: "",
            })
          }
        >
          <Plus /> {builderPage.actions.add}
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {fields.map((field, index) => (
          <div key={field.id} className="space-y-3 rounded-lg border p-3">
            <div className="flex justify-end">
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
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label>{builderPage.fields.institution}</Label>
                <Input {...register(`education.${index}.institution`)} />
              </div>
              <div className="space-y-1.5">
                <Label>{builderPage.fields.degree}</Label>
                <Input {...register(`education.${index}.degree`)} />
              </div>
              <div className="space-y-1.5">
                <Label>{builderPage.fields.field}</Label>
                <Input {...register(`education.${index}.field`)} />
              </div>
              <div className="space-y-1.5">
                <Label>{builderPage.fields.startDate}</Label>
                <Input {...register(`education.${index}.startDate`)} />
              </div>
              <div className="space-y-1.5">
                <Label>{builderPage.fields.endDate}</Label>
                <Input {...register(`education.${index}.endDate`)} />
              </div>
            </div>
            <Label className="flex items-center gap-2">
              <Controller
                control={control}
                name={`education.${index}.current`}
                render={({ field: f }) => (
                  <Checkbox checked={f.value} onCheckedChange={f.onChange} />
                )}
              />
              {builderPage.fields.current}
            </Label>
            <div className="space-y-1.5">
              <Label>{builderPage.fields.description}</Label>
              <Textarea rows={2} {...register(`education.${index}.description`)} />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
