import { ArrowDown } from "lucide-react";
import { getDictionary } from "@/locales";
import { siteConfig } from "@/config/site";

const dict = getDictionary(siteConfig.defaultLocale);

export function HowItWorks() {
  const { howItWorks } = dict.home;

  return (
    <section className="relative border-y bg-foreground text-background">
      {/* Inverted: dark editorial spread */}
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:py-32">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <span className="font-mono-label text-amber">
              Bölmə 03 — Proses
            </span>
            <h2 className="font-heading mt-4 text-4xl font-medium leading-tight text-balance sm:text-5xl">
              {howItWorks.title}
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-background/70">
              {howItWorks.subtitle}
            </p>

            <div className="mt-12 hidden font-mono-label text-background/40 lg:block">
              <span>4 addım · ~5 dəq</span>
            </div>
          </div>

          <ol className="space-y-10 lg:col-span-7 lg:pl-12">
            {howItWorks.steps.map((step, i) => (
              <li key={step.title} className="grid grid-cols-12 gap-6 border-t border-background/15 pt-8">
                {/* Number */}
                <div className="col-span-2">
                  <span className="font-heading block text-4xl font-medium text-amber">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Content */}
                <div className="col-span-10">
                  <h3 className="font-heading text-2xl font-medium leading-snug">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-prose text-sm leading-relaxed text-background/70 sm:text-base">
                    {step.description}
                  </p>
                </div>

                {/* Down arrow connector (except last) */}
                {i < howItWorks.steps.length - 1 && (
                  <div className="col-span-12 -mt-4 ml-2 text-background/25 lg:hidden">
                    <ArrowDown className="size-4" />
                  </div>
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}