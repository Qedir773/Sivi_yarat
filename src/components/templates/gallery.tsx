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
import { sampleCV, samplePhotoUrls } from "@/lib/mock/sample-cv";
import { getTemplateComponent } from "@/lib/templates/component-loader";
import type { TemplateConfig } from "@/lib/templates/discovery";

const dict = getDictionary(siteConfig.defaultLocale);

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function categoryLabel(categoryId: string) {
  const labels = dict.templatesPage.categories as Record<string, string>;
  return labels[categoryId] ?? capitalize(categoryId);
}

function cvDataForIndex(index: number) {
  return {
    ...sampleCV,
    personalInfo: {
      ...sampleCV.personalInfo,
      photoUrl: samplePhotoUrls[index % samplePhotoUrls.length],
    },
  };
}

interface GalleryProps {
  templates: TemplateConfig[];
  pricing: Record<string, boolean>;
}

export function TemplatesGallery({ templates, pricing }: GalleryProps) {
  const { templatesPage } = dict;
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [previewTemplate, setPreviewTemplate] = useState<
    { config: TemplateConfig; index: number } | null
  >(null);
  const [isExporting, setIsExporting] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const categories = useMemo(
    () => Array.from(new Set(templates.map((tpl) => tpl.category))).sort(),
    [templates],
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
      const html2canvas = (await import("html2canvas-pro")).default;
      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        backgroundColor: "#ffffff",
      });
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = `${previewTemplate.config.id}.png`;
      link.click();
    } finally {
      setIsExporting(false);
    }
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
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
        {categories.map((categoryId) => (
          <Button
            key={categoryId}
            size="sm"
            variant={activeCategory === categoryId ? "default" : "outline"}
            onClick={() => setActiveCategory(categoryId)}
          >
            {categoryLabel(categoryId)}
          </Button>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-4">
        {filtered.map((tpl, index) => {
          const TemplateComponent = getTemplateComponent(tpl.id);
          const isPro = pricing[tpl.id] ?? tpl.premium;
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
                <div className="absolute top-0 left-0 w-[250%] origin-top-left scale-[0.4] transition-transform duration-300 group-hover:scale-[0.42]">
                  <TemplateComponent data={cvDataForIndex(index)} />
                </div>
                <div className="absolute inset-0 flex items-end justify-center gap-1.5 bg-gradient-to-t from-black/50 via-transparent to-transparent p-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  <Button
                    size="icon-sm"
                    variant="secondary"
                    aria-label={templatesPage.fullPreview}
                    onClick={() => setPreviewTemplate({ config: tpl, index })}
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

              <div className="flex items-center justify-between gap-1.5 p-2.5">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{tpl.name}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {categoryLabel(tpl.category)}
                  </p>
                </div>
                <Badge variant={isPro ? "default" : "secondary"} className="shrink-0">
                  {isPro ? templatesPage.pro : templatesPage.free}
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
                <DialogTitle>{previewTemplate.config.name}</DialogTitle>
              </DialogHeader>
              <div className="max-h-[65vh] overflow-y-auto rounded-lg border">
                <div ref={previewRef}>
                  {(() => {
                    const PreviewComponent = getTemplateComponent(previewTemplate.config.id);
                    return <PreviewComponent data={cvDataForIndex(previewTemplate.index)} />;
                  })()}
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
