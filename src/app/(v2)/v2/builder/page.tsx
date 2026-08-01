import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { getDictionary } from "@/locales";
import { siteConfig } from "@/config/site";
import { discoverTemplates } from "@/lib/templates/discovery";

const dict = getDictionary(siteConfig.defaultLocale);

export const metadata: Metadata = {
  title: dict.builderPage.title,
  description: dict.builderPage.subtitle,
};

export default async function V2BuilderPage({
  searchParams,
}: {
  searchParams: Promise<{ template?: string; cv?: string }>;
}) {
  const params = await searchParams;
  const templates = discoverTemplates();
  const requested = params.template;
  const isKnownTemplate =
    requested !== undefined && templates.some((t) => t.id === requested);

  const builderHref = isKnownTemplate
    ? `/builder?template=${encodeURIComponent(requested)}${params.cv ? `&cv=${encodeURIComponent(params.cv)}` : ""}`
    : "/builder";

  return (
    <section className="mx-auto max-w-3xl px-4 py-32 sm:px-6">
      <div
        className="v2-card v2-card-hover p-10 text-center"
        style={{
          boxShadow:
            "0 0 0 1px color-mix(in oklch, var(--v2-gold) 25%, transparent), 0 30px 80px oklch(0 0 0 / 0.4)",
        }}
      >
        <div className="v2-eyebrow mx-auto flex items-center justify-center gap-2 text-[color:var(--v2-gold)]">
          <span className="v2-gold-dot" />
          V2 · BUILDER
        </div>
        <h1
          className="v2-heading text-3d-gold mt-4 text-4xl font-medium leading-tight"
          style={{ fontStyle: "italic" }}
        >
          Builder hələ V2-də yoxdur
        </h1>
        <p className="v2-heading mt-4 text-lg italic leading-relaxed text-[color:var(--v2-muted)]">
          V2 indi yalnız marketinq səhifələri üçün nümayiş edilir.
          Builder də V1 ilə eyni qalır — tam funksional, lokal məlumatla.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href={builderHref}
            className="v2-btn-gold v2-shimmer inline-flex items-center gap-2 rounded-md px-5 py-2.5"
          >
            <Sparkles className="size-4" />
            {isKnownTemplate ? `Builder-ə get (${requested})` : "Builder-ə get (V1)"}
          </Link>
          <Link
            href="/v2"
            className="v2-btn-ghost inline-flex items-center gap-2 rounded-md px-5 py-2.5"
          >
            <ArrowLeft className="size-4" />
            V2 Ana səhifə
          </Link>
        </div>
      </div>
    </section>
  );
}
