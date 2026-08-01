import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getDictionary } from "@/locales";
import { siteConfig } from "@/config/site";
import { createTranslator } from "@/lib/i18n";

const t = createTranslator();
const dict = getDictionary(siteConfig.defaultLocale);

export function CtaBannerV2() {
  const { finalCta } = dict.home;

  return (
    <section
      className="v2-section-dark relative border-t border-[color:var(--v2-border)]"
    >
      <div className="mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:py-40">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-9">
            <span className="v2-eyebrow flex items-center gap-2 text-[color:var(--v2-gold)]">
              <span className="v2-gold-dot" />
              SON ÇAĞIRIŞ
            </span>
            <h2
              className="v2-heading v2-gold-underline mt-6 text-5xl font-medium leading-[1.02] tracking-tight text-balance sm:text-6xl lg:text-7xl xl:text-[5rem]"
              style={{ fontStyle: "italic" }}
            >
              <span className="text-3d-gold">{finalCta.title}</span>
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[color:var(--v2-muted)]">
              {finalCta.subtitle}
            </p>
          </div>

          <div className="flex flex-col items-start gap-8 lg:col-span-3 lg:items-end lg:text-right">
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
            <div className="space-y-2 text-sm text-[color:var(--v2-muted)]">
              <p className="v2-eyebrow text-[color:var(--v2-gold)]">Reallıq</p>
              <p>Pulsuz · Qeydiyyatsız</p>
              <p>Məlumatlar səninlə qalır</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
