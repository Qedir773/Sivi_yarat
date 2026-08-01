import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getDictionary } from "@/locales";
import { siteConfig } from "@/config/site";
import { createTranslator } from "@/lib/i18n";

const t = createTranslator();
const dict = getDictionary(siteConfig.defaultLocale);

export function CtaBanner() {
  const { finalCta } = dict.home;

  return (
    <section className="relative border-t bg-foreground text-background paper">
      <div className="mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:py-40">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Massive editorial pull-quote feel */}
          <div className="lg:col-span-9">
            <span className="font-mono-label text-amber">Son çağırış</span>
            <h2 className="font-heading mt-6 text-5xl font-medium leading-[1.02] tracking-tight text-balance sm:text-6xl lg:text-7xl xl:text-[5rem]">
              {finalCta.title}
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-background/70">
              {finalCta.subtitle}
            </p>
          </div>

          {/* Right column: CTA + meta */}
          <div className="flex flex-col items-start gap-8 lg:col-span-3 lg:items-end lg:text-right">
            <Button
              size="lg"
              nativeButton={false}
              render={
                <Link href="/builder" className="gap-2 bg-amber text-amber-foreground hover:bg-amber/90">
                  {t("common.getStarted")}
                  <ArrowUpRight className="size-4" />
                </Link>
              }
            />
            <div className="space-y-2 text-sm text-background/60">
              <p className="font-mono-label text-background/80">Reallıq</p>
              <p>Pulsuz · Qeydiyyatsız</p>
              <p>Məlumatlar səninlə qalır</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}