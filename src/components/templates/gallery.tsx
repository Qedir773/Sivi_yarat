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
              className="group overflow-hidden rounded-xl border bg-card transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="relative aspect-[1/1.414] w-full overflow-hidden bg-neutral-100">
                <div className="absolute top-0 left-0 w-[400%] origin-top-left scale-[0.25] transition-transform duration-300 group-hover:scale-[0.255]">
                  <TemplateComponent data={sampleCV} />
                </div>
                <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/50 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  <Button
                    size="sm"
                    nativeButton={false}
                    render={
                      <Link href={`/builder?template=${tpl.id}`}>{templatesPage.useTemplate}</Link>
                    }
                  />
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 p-4">
                <p className="font-medium">{templatesPage.categories[tpl.category]}</p>
                <Badge variant={tpl.isPro ? "default" : "secondary"}>
                  {tpl.isPro ? templatesPage.pro : templatesPage.free}
                </Badge>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
