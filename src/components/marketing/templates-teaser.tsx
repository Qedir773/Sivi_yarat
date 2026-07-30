import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getDictionary } from "@/locales";
import { siteConfig } from "@/config/site";

const dict = getDictionary(siteConfig.defaultLocale);

export function TemplatesTeaser() {
  const { templates } = dict.home;

  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight">
          {templates.title}
        </h2>
        <p className="mt-3 text-muted-foreground">{templates.subtitle}</p>
      </div>

      <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {templates.categories.map((category) => (
          <Link
            key={category}
            href="/templates"
            className="group flex flex-col items-center gap-2 rounded-xl border bg-card p-6 transition-colors hover:border-primary/40 hover:bg-primary/5"
          >
            <FileText className="size-6 text-muted-foreground transition-colors group-hover:text-primary" />
            <span className="text-sm font-medium">{category}</span>
          </Link>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <Button
          variant="outline"
          nativeButton={false}
          render={
            <Link href="/templates">
              {templates.cta}
              <ArrowRight className="size-4" />
            </Link>
          }
        />
      </div>
    </section>
  );
}
