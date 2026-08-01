import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getDictionary } from "@/locales";
import { siteConfig } from "@/config/site";
import { createTranslator } from "@/lib/i18n";
import { discoverTemplates } from "@/lib/templates/discovery";
import { HeroTemplateShowcase } from "@/components/marketing/hero-template-showcase";

const t = createTranslator();
const dict = getDictionary(siteConfig.defaultLocale);

export function Hero() {
  const { hero } = dict.home;
  const templateIds = discoverTemplates()
    .filter((template) => template.photo)
    .map((template) => template.id);

  return (
    <section className="relative overflow-hidden paper">
      {/* Editorial issue marker */}
      <div className="border-b">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 text-xs text-muted-foreground sm:px-6">
          <span className="font-mono-label">Bölmə 01 — Giriş</span>
          <span className="hidden font-mono-label sm:inline">Peşəkar CV · Pulsuz · Gizli</span>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl items-end gap-16 px-4 pt-16 pb-24 sm:px-6 lg:grid-cols-12 lg:pt-24 lg:pb-32">
        <div className="lg:col-span-7">
          {/* Eyebrow */}
          <div className="flex items-center gap-3">
            <span className="inline-flex size-1.5 rounded-full bg-amber" />
            <span className="font-mono-label text-muted-foreground">
              {hero.eyebrow}
            </span>
          </div>

          {/* Big serif headline */}
          <h1 className="font-heading mt-6 text-5xl font-medium leading-[0.95] text-balance sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
            {hero.title}
          </h1>

          {/* Subtitle */}
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground text-balance sm:text-xl">
            {hero.subtitle}
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Button
              size="lg"
              nativeButton={false}
              render={
                <Link href="/builder" className="gap-2">
                  {t("common.getStarted")}
                  <ArrowUpRight className="size-4" />
                </Link>
              }
            />
            <Button
              size="lg"
              variant="ghost"
              nativeButton={false}
              render={
                <Link href="/templates" className="text-foreground">
                  {t("common.browseTemplates")}
                </Link>
              }
            />
          </div>

          {/* Inline proof strip */}
          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 border-t pt-6 text-sm text-muted-foreground">
            <span className="font-mono-label text-foreground">Sosial sübut</span>
            <span>
              <strong className="text-foreground">5+</strong> peşəkar şablon
            </span>
            <span aria-hidden className="text-border">·</span>
            <span>
              <strong className="text-foreground">4</strong> dil: az, tr, en, ru
            </span>
            <span aria-hidden className="text-border">·</span>
            <span>
              Məlumatlar <strong className="text-foreground">brauzerdə</strong> qalır
            </span>
          </div>
        </div>

        {/* Template showcase column */}
        <div className="relative lg:col-span-5">
          <div className="absolute -top-3 left-0 right-0 flex items-center justify-between">
            <span className="font-mono-label text-muted-foreground">Canlı şablon</span>
            <span className="font-mono-label inline-flex items-center gap-1.5 text-amber-foreground">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-amber opacity-75" />
                <span className="relative inline-flex size-1.5 rounded-full bg-amber" />
              </span>
              Avtomatik
            </span>
          </div>
          <HeroTemplateShowcase templateIds={templateIds} />

          {/* Floating testimonial/quote */}
          <div className="absolute -bottom-6 -left-4 hidden max-w-[14rem] rounded-lg border bg-card/95 p-4 shadow-lg backdrop-blur sm:block lg:-left-8">
            <p className="font-heading text-sm italic leading-snug">
              "Beş dəqiqəyə hazır CV — işəgötürən dərhal cavab verdi."
            </p>
            <p className="mt-2 font-mono-label text-muted-foreground">
              — Nigar, Bakı
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}