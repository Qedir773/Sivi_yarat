import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getDictionary } from "@/locales";
import { siteConfig } from "@/config/site";

const dict = getDictionary(siteConfig.defaultLocale);

export function TemplatesTeaserV2() {
  const { templates } = dict.home;
  const featured = templates.categories.slice(0, 4);
  const rest = templates.categories.slice(4);

  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:py-32">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Header column */}
          <div className="lg:col-span-4">
            <span className="v2-eyebrow flex items-center gap-2 text-[color:var(--v2-gold)]">
              <span className="v2-gold-dot" />
              BÖLMƏ 04 — ŞABLONLAR
            </span>
            <h2
              className="v2-heading v2-gold-underline mt-4 text-4xl font-medium leading-tight text-balance sm:text-5xl"
              style={{ fontStyle: "italic" }}
            >
              <span className="text-3d-gold-soft">{templates.title}</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[color:var(--v2-muted)]">
              {templates.subtitle}
            </p>

            <Button
              variant="outline"
              className="v2-btn-ghost mt-8 gap-2"
              nativeButton={false}
              render={
                <Link href="/v2/templates">
                  {templates.cta}
                  <ArrowRight className="size-4" />
                </Link>
              }
            />
          </div>

          {/* Categories grid */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 gap-3">
              {featured.map((category, i) => (
                <Link
                  key={category}
                  href="/v2/templates"
                  className={`v2-card v2-card-hover v2-shimmer group relative flex flex-col justify-between overflow-hidden p-6 transition-all ${
                    i === 0 ? "col-span-2 min-h-[180px]" : "min-h-[140px]"
                  }`}
                >
                  <FileText
                    className="size-5 text-[color:var(--v2-gold)] transition-colors"
                    strokeWidth={1.5}
                  />
                  <div>
                    <span className="v2-eyebrow text-[color:var(--v2-muted)]">
                      Kateqoriya
                    </span>
                    <p className="v2-heading mt-1 text-2xl font-medium text-[color:var(--v2-foreground)]">
                      {category}
                    </p>
                  </div>
                  <ArrowRight className="absolute right-5 bottom-5 size-5 -translate-x-1 text-[color:var(--v2-gold)] opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                </Link>
              ))}
            </div>

            {rest.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {rest.map((category) => (
                  <Link
                    key={category}
                    href="/v2/templates"
                    className="group inline-flex items-center gap-2 rounded-full border border-[color:var(--v2-border)] bg-transparent px-4 py-2 text-sm text-[color:var(--v2-foreground)] transition-colors hover:border-[color:var(--v2-gold)] hover:bg-[color:var(--v2-gold)]/5"
                  >
                    <FileText
                      className="size-3.5 text-[color:var(--v2-gold)]"
                      strokeWidth={1.5}
                    />
                    {category}
                    <ArrowRight className="size-3 -translate-x-1 text-[color:var(--v2-gold)] opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-60" />
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
