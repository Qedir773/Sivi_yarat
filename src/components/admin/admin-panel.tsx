"use client";

import { useState, useTransition } from "react";
import { GripVertical } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { SortableFieldList, SortableRow } from "@/components/forms/sortable-field-list";
import type { TemplateConfig } from "@/lib/templates/discovery";
import { updateTemplatePricing, updateTemplateOrder, updateProPrice } from "@/app/admin/actions";
import { getDictionary } from "@/locales";
import { siteConfig } from "@/config/site";

const dict = getDictionary(siteConfig.defaultLocale);

interface AdminPanelProps {
  templates: TemplateConfig[];
  pricing: Record<string, boolean>;
  proPrice: number;
}

function categoryLabel(categoryId: string) {
  const labels = dict.templatesPage.categories as Record<string, string>;
  return labels[categoryId] ?? categoryId;
}

export function AdminPanel({ templates, pricing, proPrice }: AdminPanelProps) {
  const { adminPage, templatesPage, builderPage } = dict;
  const [pricingState, setPricingState] = useState(pricing);
  const [orderedTemplates, setOrderedTemplates] = useState(templates);
  const [priceInput, setPriceInput] = useState(proPrice.toString());
  const [priceSaved, setPriceSaved] = useState(false);
  const [templatesSaved, setTemplatesSaved] = useState(false);
  const [pricingSaved, setPricingSaved] = useState(false);
  const [templatesError, setTemplatesError] = useState<string | null>(null);
  const [pricingError, setPricingError] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  function handleTogglePro(templateId: string, isPro: boolean) {
    // Optimistic update — flip locally first, then ask the server to confirm.
    // If the server action throws (e.g. auth fails after token expiry), we
    // rewind so the UI reflects reality instead of a phantom state.
    const previous = pricingState[templateId];
    setPricingState((prev) => ({ ...prev, [templateId]: isPro }));
    setPricingSaved(false);
    setPricingError(null);
    startTransition(async () => {
      try {
        await updateTemplatePricing(templateId, isPro);
        setPricingSaved(true);
      } catch {
        setPricingState((prev) => ({ ...prev, [templateId]: previous }));
        setPricingError(adminPage.saveError);
      }
    });
  }

  function handleReorder(fromIndex: number, toIndex: number) {
    const reordered = [...orderedTemplates];
    const [moved] = reordered.splice(fromIndex, 1);
    reordered.splice(toIndex, 0, moved);
    const previous = orderedTemplates;
    setOrderedTemplates(reordered);
    setTemplatesSaved(false);
    setTemplatesError(null);
    startTransition(async () => {
      try {
        await updateTemplateOrder(reordered.map((template) => template.id));
        setTemplatesSaved(true);
      } catch {
        setOrderedTemplates(previous);
        setTemplatesError(adminPage.saveError);
      }
    });
  }

  function handleSavePrice() {
    const parsed = Number(priceInput);
    if (Number.isNaN(parsed) || parsed < 0) return;
    startTransition(async () => {
      try {
        await updateProPrice(parsed);
        setPriceSaved(true);
      } catch {
        // Server rejected (auth or validation) — leave UI untouched so the
        // user sees their previous valid value still in place.
      }
    });
  }

  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">{adminPage.title}</h1>
        <p className="mt-2 text-muted-foreground">{adminPage.subtitle}</p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>{adminPage.pricingSectionTitle}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap items-end gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="pro-price">{adminPage.proPriceLabel}</Label>
              <Input
                id="pro-price"
                type="number"
                min={0}
                step={0.01}
                className="w-40"
                value={priceInput}
                onChange={(event) => {
                  setPriceInput(event.target.value);
                  setPriceSaved(false);
                }}
              />
            </div>
            <Button type="button" onClick={handleSavePrice}>
              {adminPage.save}
            </Button>
            {priceSaved ? (
              <span className="text-sm text-emerald-600">{adminPage.saved}</span>
            ) : null}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{adminPage.templatesSectionTitle}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-3 flex flex-wrap items-center gap-2 text-sm">
              {templatesSaved ? (
                <span className="text-emerald-600" role="status" aria-live="polite">
                  {adminPage.saved}
                </span>
              ) : null}
              {templatesError ? (
                <span className="text-destructive" role="alert">
                  {templatesError}
                </span>
              ) : null}
              {pricingSaved ? (
                <span className="text-emerald-600" role="status" aria-live="polite">
                  {adminPage.saved}
                </span>
              ) : null}
              {pricingError ? (
                <span className="text-destructive" role="alert">
                  {pricingError}
                </span>
              ) : null}
            </div>
            <div className="overflow-x-auto">
              <SortableFieldList
                ids={orderedTemplates.map((template) => template.id)}
                onReorder={handleReorder}
              >
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left text-muted-foreground">
                      <th className="py-2 pr-4 font-medium">{adminPage.orderColumn}</th>
                      <th className="py-2 pr-4 font-medium">{adminPage.templateName}</th>
                      <th className="py-2 pr-4 font-medium">{adminPage.templateCategory}</th>
                      <th className="py-2 pr-4 font-medium">{adminPage.templateStatus}</th>
                      <th className="py-2 font-medium">Pro</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderedTemplates.map((template) => {
                      const isPro = pricingState[template.id] ?? template.premium;
                      return (
                        <SortableRow
                          key={template.id}
                          id={template.id}
                          as="tr"
                          className="border-b last:border-0"
                        >
                          {({ attributes, listeners }) => (
                            <>
                              <td className="py-2.5 pr-4">
                                <button
                                  type="button"
                                  className="cursor-grab touch-none text-muted-foreground hover:text-foreground active:cursor-grabbing"
                                  aria-label={builderPage.actions.reorder}
                                  {...attributes}
                                  {...listeners}
                                >
                                  <GripVertical className="size-4" />
                                </button>
                              </td>
                              <td className="py-2.5 pr-4">{template.name}</td>
                              <td className="py-2.5 pr-4 text-muted-foreground">
                                {categoryLabel(template.category)}
                              </td>
                              <td className="py-2.5 pr-4">
                                <Badge variant={isPro ? "default" : "secondary"}>
                                  {isPro ? templatesPage.pro : templatesPage.free}
                                </Badge>
                              </td>
                              <td className="py-2.5">
                                <Switch
                                  checked={isPro}
                                  onCheckedChange={(checked) => handleTogglePro(template.id, checked)}
                                />
                              </td>
                            </>
                          )}
                        </SortableRow>
                      );
                    })}
                  </tbody>
                </table>
              </SortableFieldList>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
