"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { getDictionary } from "@/locales";
import { siteConfig } from "@/config/site";
import { sampleCV } from "@/lib/mock/sample-cv";
import {
  templateComponents,
  templateCategoryIds,
  type TemplateCategoryId,
  type TemplateComponentMeta,
} from "@/features/templates/registry";

const dict = getDictionary(siteConfig.defaultLocale);

type GalleryTemplate = TemplateComponentMeta & { isPro: boolean };

export function TemplatesGallery({ pricing }: { pricing: Record<string, boolean> }) {
  const { templatesPage } = dict;
  const [activeCategory, setActiveCategory] = useState<TemplateCategoryId | "all">("all");
  const [previewTemplate, setPreviewTemplate] = useState<GalleryTemplate | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const templates = useMemo(
    () => templateComponents.map((tpl) => ({ ...tpl, isPro: pricing[tpl.id] ?? false })),
    [pricing],
  );

  const filtered = useMemo(
    () =>
      activeCategory === "all"
        ? templates
        : templates.filter((tpl) => tpl.category === activeCategory),
    [templates, activeCategory],
  );

  async function handleExportPng() {
    if (!previewRef.current || !previewTemplate) return;
    setIsExporting(true);
    try {
      const html2canvas = (await import("html2canvas")).default;
      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        backgroundColor: "#ffffff",
      });
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = `${previewTemplate.id}.png`;
      link.click();
    } finally {
      setIsExporting(false);
    }
  }

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
        {filtered.map((tpl, index) => {
          const TemplateComponent = tpl.component;
          return (
            <motion.div
              key={tpl.id}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="group overflow-hidden rounded-xl border bg-card transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="relative aspect-[1/1.414] w-full overflow-hidden bg-neutral-100">
                <div className="absolute top-0 left-0 w-[400%] origin-top-left scale-[0.25] transition-transform duration-300 group-hover:scale-[0.255]">
                  <TemplateComponent data={sampleCV} />
                </div>
                <div className="absolute inset-0 flex items-end justify-center gap-2 bg-gradient-to-t from-black/50 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  <Button
                    size="icon-sm"
                    variant="secondary"
                    aria-label={templatesPage.fullPreview}
                    onClick={() => setPreviewTemplate(tpl)}
                  >
                    <Search />
                  </Button>
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
            </motion.div>
          );
        })}
      </div>

      <Dialog
        open={previewTemplate !== null}
        onOpenChange={(open) => !open && setPreviewTemplate(null)}
      >
        <DialogContent className="max-w-xl sm:max-w-xl">
          {previewTemplate && (
            <>
              <DialogHeader>
                <DialogTitle>{templatesPage.categories[previewTemplate.category]}</DialogTitle>
              </DialogHeader>
              <div className="max-h-[65vh] overflow-y-auto rounded-lg border">
                <div ref={previewRef}>
                  <previewTemplate.component data={sampleCV} />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleExportPng} disabled={isExporting}>
                  <Download />
                  {templatesPage.downloadPng}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
