"use client";

import { Controller, useFieldArray, type Control, type UseFormRegister } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { CVFormValues } from "@/lib/validation/cv-schema";
import { getDictionary } from "@/locales";
import { siteConfig } from "@/config/site";
import { newId } from "@/lib/utils";

const dict = getDictionary(siteConfig.defaultLocale);
const LEVELS = [1, 2, 3, 4, 5];

export function SkillsForm({
  control,
  register,
}: {
  control: Control<CVFormValues>;
  register: UseFormRegister<CVFormValues>;
}) {
  const { builderPage } = dict;
  const { fields, append, remove } = useFieldArray({ control, name: "skills" });

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>{builderPage.sections.skills}</CardTitle>
        <Button
          type="button"
          size="sm"
          onClick={() => append({ id: newId(), name: "", level: 3 })}
        >
          <Plus /> {builderPage.actions.add}
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-end gap-2">
            <div className="flex-1 space-y-1.5">
              <Label>{builderPage.fields.skillName}</Label>
              <Input {...register(`skills.${index}.name`)} />
            </div>
            <div className="w-28 space-y-1.5">
              <Label>{builderPage.fields.level}</Label>
              <Controller
                control={control}
                name={`skills.${index}.level`}
                render={({ field: f }) => (
                  <Select
                    value={String(f.value)}
                    onValueChange={(value) => f.onChange(Number(value))}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {LEVELS.map((level) => (
                        <SelectItem key={level} value={String(level)}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
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
        ))}
      </CardContent>
    </Card>
  );
}
