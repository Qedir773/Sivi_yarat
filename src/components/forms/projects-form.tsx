"use client";

import { useFieldArray, type Control, type UseFormRegister } from "react-hook-form";
import { GripVertical, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SortableFieldList, SortableRow } from "@/components/forms/sortable-field-list";
import type { CVFormValues } from "@/lib/validation/cv-schema";
import { getDictionary } from "@/locales";
import { siteConfig } from "@/config/site";
import { newId } from "@/lib/utils";

const dict = getDictionary(siteConfig.defaultLocale);

export function ProjectsForm({
  control,
  register,
}: {
  control: Control<CVFormValues>;
  register: UseFormRegister<CVFormValues>;
}) {
  const { builderPage } = dict;
  const { fields, append, remove, move } = useFieldArray({ control, name: "projects" });

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>{builderPage.sections.projects}</CardTitle>
        <Button
          type="button"
          size="sm"
          onClick={() => append({ id: newId(), name: "", description: "", url: "" })}
        >
          <Plus /> {builderPage.actions.add}
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <SortableFieldList ids={fields.map((field) => field.id)} onReorder={move}>
          {fields.map((field, index) => (
            <SortableRow key={field.id} id={field.id}>
              {({ attributes, listeners }) => (
                <div className="space-y-3 rounded-lg border p-3">
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      className="cursor-grab touch-none text-muted-foreground hover:text-foreground active:cursor-grabbing"
                      aria-label={builderPage.actions.reorder}
                      {...attributes}
                      {...listeners}
                    >
                      <GripVertical className="size-4" />
                    </button>
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
                      <Label>{builderPage.fields.projectName}</Label>
                      <Input {...register(`projects.${index}.name`)} />
                    </div>
                    <div className="space-y-1.5">
                      <Label>{builderPage.fields.url}</Label>
                      <Input {...register(`projects.${index}.url`)} />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label>{builderPage.fields.description}</Label>
                    <Textarea rows={2} {...register(`projects.${index}.description`)} />
                  </div>
                </div>
              )}
            </SortableRow>
          ))}
        </SortableFieldList>
      </CardContent>
    </Card>
  );
}
