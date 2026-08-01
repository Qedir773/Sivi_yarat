import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getDictionary } from "@/locales";
import { siteConfig } from "@/config/site";

const dict = getDictionary(siteConfig.defaultLocale);

export function PricingTeaser() {
  const { pricing } = dict.home;
  const plans = [pricing.free, pricing.pro] as const;

  return (
    <section className="relative border-t paper">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:py-32">
        {/* Header — same editorial pattern as other sections */}
        <div className="grid grid-cols-1 gap-8 border-b border-border/60 pb-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <span className="font-mono-label flex items-center gap-2 text-muted-foreground">
              <span className="neon-dot-magenta" />
              Bölmə 05 — Qiymət
            </span>
            <h2 className="font-heading neon-underline mt-4 text-4xl font-medium leading-tight text-balance sm:text-5xl">
              {pricing.title}
            </h2>
          </div>
          <p className="font-heading text-2xl italic leading-snug text-muted-foreground text-balance lg:col-span-6 lg:col-start-7 lg:text-3xl">
            {pricing.subtitle}
          </p>
        </div>

        {/* Plans — side-by-side comparison, no card chrome */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 lg:gap-0">
          {plans.map((plan, i) => {
            const isPro = i === 1;
            return (
              <div
                key={plan.title}
                className={`relative grid grid-cols-12 gap-6 px-2 py-10 lg:px-10 ${
                  i === 0 ? "lg:border-r" : ""
                }`}
              >
                {/* Left rail: title + badge */}
                <div className="col-span-12 lg:col-span-4">
                  <div className="flex items-baseline gap-3">
                    <h3 className="font-heading text-3xl font-medium leading-none sm:text-4xl">
                      {plan.title}
                    </h3>
                    {isPro && (
                      <span className="font-mono-label rounded-sm bg-amber px-2 py-1 text-amber-foreground">
                        Pro
                      </span>
                    )}
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {plan.description}
                  </p>

                  {isPro && (
                    <p className="font-mono-label mt-6 text-muted-foreground">
                      Tezliklə
                    </p>
                  )}
                </div>

                {/* Features column */}
                <ul className="col-span-12 space-y-3 lg:col-span-8">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 border-b border-border/60 pb-3 last:border-b-0"
                    >
                      <Check
                        className={`mt-0.5 size-4 shrink-0 ${isPro ? "text-amber" : "text-foreground"}`}
                        strokeWidth={2}
                      />
                      <span className="text-sm leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="mt-10 flex justify-center">
          <Button
            variant="outline"
            nativeButton={false}
            render={
              <Link href="/pricing" className="gap-2">
                {pricing.cta}
              </Link>
            }
          />
        </div>
      </div>
    </section>
  );
}