"use client";

import { useState, useTransition } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
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
  const { adminPage, templatesPage } = dict;
  const [pricingState, setPricingState] = useState(pricing);
  const [orderedTemplates, setOrderedTemplates] = useState(templates);
  const [priceInput, setPriceInput] = useState(proPrice.toString());
  const [priceSaved, setPriceSaved] = useState(false);
  const [, startTransition] = useTransition();

  function handleTogglePro(templateId: string, isPro: boolean) {
    setPricingState((prev) => ({ ...prev, [templateId]: isPro }));
    startTransition(() => {
      updateTemplatePricing(templateId, isPro);
    });
  }

  function handleMove(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= orderedTemplates.length) return;

    const reordered = [...orderedTemplates];
    [reordered[index], reordered[target]] = [reordered[target], reordered[index]];
    setOrderedTemplates(reordered);
    startTransition(() => {
      updateTemplateOrder(reordered.map((template) => template.id));
    });
  }

  function handleSavePrice() {
    const parsed = Number(priceInput);
    if (Number.isNaN(parsed) || parsed < 0) return;
    startTransition(() => {
      updateProPrice(parsed);
      setPriceSaved(true);
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
            <div className="overflow-x-auto">
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
                  {orderedTemplates.map((template, index) => {
                    const isPro = pricingState[template.id] ?? template.premium;
                    return (
                      <tr key={template.id} className="border-b last:border-0">
                        <td className="py-2.5 pr-4">
                          <div className="flex items-center gap-1">
                            <Button
                              type="button"
                              size="icon-sm"
                              variant="ghost"
                              aria-label={adminPage.moveUp}
                              disabled={index === 0}
                              onClick={() => handleMove(index, -1)}
                            >
                              <ArrowUp />
                            </Button>
                            <Button
                              type="button"
                              size="icon-sm"
                              variant="ghost"
                              aria-label={adminPage.moveDown}
                              disabled={index === orderedTemplates.length - 1}
                              onClick={() => handleMove(index, 1)}
                            >
                              <ArrowDown />
                            </Button>
                          </div>
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
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
