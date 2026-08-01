import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getDictionary } from "@/locales";
import { siteConfig } from "@/config/site";

const dict = getDictionary(siteConfig.defaultLocale);

export function TemplatesTeaser() {
  const { templates } = dict.home;
  const featured = templates.categories.slice(0, 4);
  const rest = templates.categories.slice(4);

  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:py-32">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Header column */}
          <div className="lg:col-span-4">
            <span className="font-mono-label flex items-center gap-2 text-muted-foreground">
              <span className="neon-dot" />
              Bölmə 04 — Şablonlar
            </span>
            <h2 className="font-heading neon-underline mt-4 text-4xl font-medium leading-tight text-balance sm:text-5xl">
              {templates.title}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              {templates.subtitle}
            </p>

            <Button
              variant="outline"
              className="mt-8 gap-2 border-neon/40 hover:border-neon hover:bg-neon/10 hover:text-neon"
              nativeButton={false}
              render={
                <Link href="/templates">
                  {templates.cta}
                  <ArrowRight className="size-4" />
                </Link>
              }
            />
          </div>

          {/* Categories grid */}
          <div className="lg:col-span-8">
            {/* Featured (large) */}
            <div className="grid grid-cols-2 gap-3">
              {featured.map((category, i) => (
                <Link
                  key={category}
                  href="/templates"
                  className={`group relative flex flex-col justify-between overflow-hidden rounded-lg border bg-card p-6 transition-all hover:border-foreground/40 ${
                    i === 0 ? "col-span-2 min-h-[180px]" : "min-h-[140px]"
                  }`}
                >
                  <FileText className="size-5 text-muted-foreground transition-colors group-hover:text-foreground" strokeWidth={1.5} />
                  <div>
                    <span className="font-mono-label text-muted-foreground/70">
                      Kateqoriya
                    </span>
                    <p className="font-heading mt-1 text-2xl font-medium">
                      {category}
                    </p>
                  </div>
                  <ArrowRight className="absolute right-5 bottom-5 size-5 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                </Link>
              ))}
            </div>

            {/* Rest (small pills) */}
            {rest.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {rest.map((category) => (
                  <Link
                    key={category}
                    href="/templates"
                    className="group inline-flex items-center gap-2 rounded-full border bg-background px-4 py-2 text-sm transition-colors hover:border-foreground/40 hover:bg-secondary"
                  >
                    <FileText className="size-3.5 text-muted-foreground" strokeWidth={1.5} />
                    {category}
                    <ArrowRight className="size-3 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-60" />
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