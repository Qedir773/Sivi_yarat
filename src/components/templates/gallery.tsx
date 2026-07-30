"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getDictionary } from "@/locales";
import { siteConfig } from "@/config/site";
import { sampleCV } from "@/lib/mock/sample-cv";
import {
  templateRegistry,
  templateCategoryIds,
  type TemplateCategoryId,
} from "@/features/templates/registry";

const dict = getDictionary(siteConfig.defaultLocale);

export function TemplatesGallery() {
  const { templatesPage } = dict;
  const [activeCategory, setActiveCategory] = useState<TemplateCategoryId | "all">("all");

  const filtered = useMemo(
    () =>
      activeCategory === "all"
        ? templateRegistry
        : templateRegistry.filter((tpl) => tpl.category === activeCategory),
    [activeCategory],
  );

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-semibold tracking-tight">{templatesPage.title}</h1>
        <p className="mt-3 text-muted-foreground">{templatesPage.subtitle}</p>
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-2">
        <Button
          size="sm"
          variant={activeCategory === "all" ? "default" : "outline"}
          onClick={() => setActiveCategory("all")}
        >
          {templatesPage.filterAll}
        </Button>
        {templateCategoryIds.map((categoryId) => (
          <Button
            key={categoryId}
            size="sm"
            variant={activeCategory === categoryId ? "default" : "outline"}
            onClick={() => setActiveCategory(categoryId)}
          >
            {templatesPage.categories[categoryId]}
          </Button>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((tpl) => {
          const TemplateComponent = tpl.component;
          return (
            <div
              key={tpl.id}
              className="overflow-hidden rounded-xl border bg-card transition-shadow hover:shadow-md"
            >
              <div className="relative aspect-[1/1.414] w-full overflow-hidden bg-neutral-100">
                <div className="absolute top-0 left-0 w-[400%] origin-top-left scale-[0.25]">
                  <TemplateComponent data={sampleCV} />
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 p-4">
                <div>
                  <p className="font-medium">{templatesPage.categories[tpl.category]}</p>
                  <Badge variant={tpl.isPro ? "default" : "secondary"} className="mt-1">
                    {tpl.isPro ? templatesPage.pro : templatesPage.free}
                  </Badge>
                </div>
                <Button
                  size="sm"
                  render={<Link href={`/builder?template=${tpl.id}`}>{templatesPage.useTemplate}</Link>}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
