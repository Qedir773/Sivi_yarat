import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getDictionary } from "@/locales";
import { siteConfig } from "@/config/site";

const dict = getDictionary(siteConfig.defaultLocale);

export function PricingTeaserV2() {
  const { pricing } = dict.home;
  const plans = [pricing.free, pricing.pro] as const;

  return (
    <section className="relative border-t border-[color:var(--v2-border)]">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:py-32">
        <div className="grid grid-cols-1 gap-8 border-b border-[color:var(--v2-border)] pb-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <span className="v2-eyebrow flex items-center gap-2 text-[color:var(--v2-gold)]">
              <span className="v2-gold-dot" />
              BÖLMƏ 05 — QİYMƏT
            </span>
            <h2
              className="v2-heading v2-gold-underline mt-4 text-4xl font-medium leading-tight text-balance sm:text-5xl"
              style={{ fontStyle: "italic" }}
            >
              <span className="text-3d-gold-soft">{pricing.title}</span>
            </h2>
          </div>
          <p className="v2-heading text-2xl italic leading-snug text-[color:var(--v2-muted)] text-balance lg:col-span-6 lg:col-start-7 lg:text-3xl">
            {pricing.subtitle}
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 lg:gap-0">
          {plans.map((plan, i) => {
            const isPro = i === 1;
            return (
              <div
                key={plan.title}
                className={`relative grid grid-cols-12 gap-6 px-2 py-10 lg:px-10 ${
                  i === 0
                    ? "lg:border-r border-[color:var(--v2-border)]"
                    : ""
                }`}
              >
                <div className="col-span-12 lg:col-span-4">
                  <div className="flex items-baseline gap-3">
                    <h3
                      className={`v2-heading text-3xl font-medium leading-none sm:text-4xl ${
                        isPro ? "text-3d-gold-soft" : ""
                      }`}
                    >
                      {plan.title}
                    </h3>
                    {isPro && (
                      <span
                        className="v2-eyebrow rounded-sm px-2 py-1"
                        style={{
                          background:
                            "linear-gradient(135deg, var(--v2-gold-bright), var(--v2-gold-deep))",
                          color: "var(--v2-bg-deeper)",
                        }}
                      >
                        Pro
                      </span>
                    )}
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-[color:var(--v2-muted)]">
                    {plan.description}
                  </p>

                  {isPro && (
                    <p className="v2-eyebrow mt-6 text-[color:var(--v2-gold)]">
                      Tezliklə
                    </p>
                  )}
                </div>

                <ul className="col-span-12 space-y-3 lg:col-span-8">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 border-b border-[color:var(--v2-border)] pb-3 last:border-b-0"
                    >
                      <Check
                        className={`mt-0.5 size-4 shrink-0 ${
                          isPro
                            ? "text-[color:var(--v2-gold-bright)]"
                            : "text-[color:var(--v2-foreground)]"
                        }`}
                        strokeWidth={2}
                      />
                      <span className="text-sm leading-snug text-[color:var(--v2-foreground)]">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="mt-10 flex justify-center">
          <Button
            className="v2-btn-ghost"
            nativeButton={false}
            render={
              <Link href="/v2/pricing" className="gap-2">
                {pricing.cta}
              </Link>
            }
          />
        </div>
      </div>
    </section>
  );
}
