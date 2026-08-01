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

export function HeroV2() {
  const { hero } = dict.home;
  const templateIds = discoverTemplates()
    .filter((template) => template.photo)
    .map((template) => template.id);

  return (
    <section className="relative overflow-hidden">
      {/* Top label band — gold rule beneath */}
      <div className="border-b border-[color:var(--v2-border)]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 text-xs text-[color:var(--v2-muted)] sm:px-6">
          <span className="v2-eyebrow flex items-center gap-2 text-[color:var(--v2-gold)]">
            <span className="v2-gold-dot" />
            MIDNIGHT · BÖLMƏ 01
          </span>
          <span className="v2-eyebrow hidden sm:inline">
            Peşəkar CV · Pulsuz · Gizli
          </span>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl items-end gap-16 px-4 pt-16 pb-24 sm:px-6 lg:grid-cols-12 lg:pt-24 lg:pb-32">
        <div className="lg:col-span-7">
          {/* Eyebrow */}
          <div className="flex items-center gap-3">
            <span className="v2-gold-dot" />
            <span className="v2-eyebrow text-[color:var(--v2-gold)]">
              {hero.eyebrow}
            </span>
          </div>

          {/* 3D Gold headline */}
          <h1
            className="v2-heading text-3d-gold mt-6 text-5xl font-medium leading-[0.95] text-balance sm:text-6xl lg:text-7xl xl:text-[5.5rem]"
            style={{ fontStyle: "italic" }}
          >
            {hero.title}
          </h1>

          {/* Subtitle */}
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-[color:var(--v2-muted)] text-balance sm:text-xl">
            {hero.subtitle}
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Button
              size="lg"
              className="v2-btn-gold v2-shimmer gap-2"
              nativeButton={false}
              render={
                <Link href="/v2/builder">
                  {t("common.getStarted")}
                  <ArrowUpRight className="size-4" />
                </Link>
              }
            />
            <Button
              size="lg"
              className="v2-btn-ghost"
              nativeButton={false}
              render={
                <Link href="/v2/templates">
                  {t("common.browseTemplates")}
                </Link>
              }
            />
          </div>

          {/* Proof strip */}
          <div className="v2-gold-divider mt-12" />
          <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-[color:var(--v2-muted)]">
            <span className="v2-eyebrow flex items-center gap-2 text-[color:var(--v2-gold)]">
              <span className="v2-gold-dot" />
              Sosial sübut
            </span>
            <span>
              <span className="v2-num">15</span> peşəkar şablon
            </span>
            <span aria-hidden className="text-[color:var(--v2-border-strong)]">·</span>
            <span>
              <span className="v2-num">4</span> dil: az, tr, en, ru
            </span>
            <span aria-hidden className="text-[color:var(--v2-border-strong)]">·</span>
            <span>
              Məlumatlar <span className="text-gold-bright">brauzerdə</span> qalır
            </span>
          </div>
        </div>

        {/* Template showcase column */}
        <div className="relative flex justify-center lg:col-span-5">
          <div className="v2-card-hover v2-card relative w-full max-w-md overflow-hidden rounded-xl p-1">
            <HeroTemplateShowcase templateIds={templateIds} />
          </div>

          <div className="mt-4 flex items-center justify-between">
            <span className="v2-eyebrow flex items-center gap-2 text-[color:var(--v2-muted)]">
              <span className="v2-gold-dot" />
              Canlı şablon
            </span>
            <span className="v2-eyebrow inline-flex items-center gap-1.5 text-[color:var(--v2-gold)]">
              <span className="relative flex size-1.5">
                <span
                  className="absolute inline-flex size-full animate-ping rounded-full opacity-75"
                  style={{ background: "var(--v2-gold-bright)" }}
                />
                <span
                  className="relative inline-flex size-1.5 rounded-full"
                  style={{ background: "var(--v2-gold-bright)" }}
                />
              </span>
              Avtomatik
            </span>
          </div>

          {/* Floating testimonial */}
          <div
            className="v2-card v2-card-hover mt-6 hidden p-4 sm:block"
            style={{
              boxShadow:
                "0 0 0 1px color-mix(in oklch, var(--v2-gold) 25%, transparent), 0 18px 48px oklch(0 0 0 / 0.35)",
            }}
          >
            <div className="flex items-start gap-3">
              <span className="v2-gold-dot mt-0.5 shrink-0" />
              <div>
                <p className="v2-heading text-sm italic leading-snug text-[color:var(--v2-foreground)]">
                  "Beş dəqiqəyə hazır CV — işəgötürən dərhal cavab verdi."
                </p>
                <p className="v2-eyebrow mt-2 text-[color:var(--v2-muted)]">
                  — Nigar, Bakı
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
