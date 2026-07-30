import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getDictionary } from "@/locales";
import { siteConfig } from "@/config/site";
import { createTranslator } from "@/lib/i18n";

const t = createTranslator();
const dict = getDictionary(siteConfig.defaultLocale);

export function CtaBanner() {
  const { finalCta } = dict.home;

  return (
    <section className="border-t">
      <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6">
        <h2 className="text-3xl font-semibold tracking-tight">
          {finalCta.title}
        </h2>
        <p className="mt-3 text-muted-foreground">{finalCta.subtitle}</p>
        <div className="mt-8 flex justify-center">
          <Button
            size="lg"
            nativeButton={false}
            render={<Link href="/builder">{t("common.getStarted")}</Link>}
          />
        </div>
      </div>
    </section>
  );
}
